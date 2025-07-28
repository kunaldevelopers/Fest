const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const qs = require("qs");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Instamojo credentials
const INSTAMOJO_API_KEY = process.env.INSTAMOJO_API_KEY;
const INSTAMOJO_AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN;

// Validate environment variables
if (!INSTAMOJO_API_KEY || !INSTAMOJO_AUTH_TOKEN) {
  console.error("❌ Missing Instamojo credentials in .env file");
  console.error("Required: INSTAMOJO_API_KEY, INSTAMOJO_AUTH_TOKEN");
  process.exit(1);
}

console.log("✅ Instamojo credentials loaded successfully");
console.log(
  "API Key:",
  INSTAMOJO_API_KEY ? `${INSTAMOJO_API_KEY.substring(0, 8)}...` : "Not found"
);
console.log(
  "Auth Token:",
  INSTAMOJO_AUTH_TOKEN
    ? `${INSTAMOJO_AUTH_TOKEN.substring(0, 8)}...`
    : "Not found"
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Simple rate limiting for payment requests
const paymentRequestMap = new Map();

// Create payment request API endpoint
app.post("/api/create-payment", async (req, res) => {
  try {
    const {
      amount,
      purpose,
      buyer_name,
      buyer_email,
      buyer_phone,
      redirect_url,
    } = req.body;

    // Simple rate limiting by email/phone
    const userKey = `${buyer_email}-${buyer_phone}`;
    const now = Date.now();
    const lastRequest = paymentRequestMap.get(userKey);

    if (lastRequest && now - lastRequest < 10000) {
      // 10 seconds cooldown
      return res.status(429).json({
        success: false,
        error: "Please wait before making another payment request",
        cooldown: Math.ceil((10000 - (now - lastRequest)) / 1000),
      });
    }

    paymentRequestMap.set(userKey, now);

    console.log("Creating payment request:", {
      amount,
      purpose,
      buyer_name,
      buyer_email,
      buyer_phone,
    });

    // Check for minimum amount (Instamojo minimum is ₹9)
    if (amount < 9) {
      return res.status(400).json({
        success: false,
        error: "Minimum payment amount is ₹9",
        details: `Received amount: ₹${amount}`,
      });
    }

    // For solo payments (₹200), add a small delay to avoid rate limiting
    if (amount === 200) {
      console.log("Solo payment detected, adding small delay...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Prepare data for Instamojo
    const paymentData = {
      purpose: purpose,
      amount: amount,
      buyer_name: buyer_name,
      email: buyer_email,
      phone: buyer_phone,
      redirect_url: redirect_url || `http://localhost:${PORT}`,
      send_email: "True",
      send_sms: "True",
      allow_repeated_payments: false,
    };

    console.log("Sending to Instamojo API:", {
      url: "https://www.instamojo.com/api/1.1/payment-requests/",
      data: paymentData,
      headers: {
        "X-Api-Key": INSTAMOJO_API_KEY ? "***present***" : "***missing***",
        "X-Auth-Token": INSTAMOJO_AUTH_TOKEN
          ? "***present***"
          : "***missing***",
      },
    });

    // Retry mechanism for ECONNRESET errors
    let retryCount = 0;
    const maxRetries = 3;
    let response;

    while (retryCount < maxRetries) {
      try {
        response = await axios.post(
          "https://www.instamojo.com/api/1.1/payment-requests/",
          qs.stringify(paymentData),
          {
            headers: {
              "X-Api-Key": INSTAMOJO_API_KEY,
              "X-Auth-Token": INSTAMOJO_AUTH_TOKEN,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            timeout: 20000, // Increased timeout
            // Add keep-alive settings
            httpsAgent: new (require("https").Agent)({
              keepAlive: true,
              timeout: 60000,
            }),
          }
        );
        break; // Success, exit retry loop
      } catch (error) {
        retryCount++;
        console.log(
          `Attempt ${retryCount} failed:`,
          error.code || error.message
        );

        if (error.code === "ECONNRESET" && retryCount < maxRetries) {
          console.log(`Retrying in ${retryCount * 1000}ms...`);
          await new Promise((resolve) =>
            setTimeout(resolve, retryCount * 1000)
          );
          continue;
        } else {
          throw error; // Re-throw if max retries exceeded or different error
        }
      }
    }

    if (response.data.success) {
      const paymentUrl = response.data.payment_request.longurl;
      return res.json({
        success: true,
        paymentUrl: paymentUrl,
        payment_request_id: response.data.payment_request.id,
      });
    } else {
      console.error("Instamojo API Error:", response.data);
      return res.status(400).json({
        success: false,
        error: "Instamojo API returned an error",
        details: response.data,
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const errorResponseData = error.response ? error.response.data : null;
    const errorMessage = error.message;

    console.error(
      `Caught Error (${errorCode || "N/A"}):`,
      errorResponseData || errorMessage
    );

    // Fallback for specific network errors
    if (
      errorCode === "ECONNRESET" ||
      errorCode === "ENOTFOUND" ||
      errorCode === "ETIMEDOUT"
    ) {
      console.log(
        "Connection error detected, providing fallback payment link."
      );

      // For localhost testing, use a general Instamojo link
      const fallbackURL = "https://www.instamojo.com/@heritagefest2025/";

      return res.json({
        success: true,
        paymentUrl: fallbackURL,
        fallback: true,
        message:
          "Using fallback payment method due to API connectivity issues.",
      });
    } else {
      // Handle other errors
      return res.status(500).json({
        success: false,
        error: "Server error while creating payment",
        details: errorResponseData || errorMessage,
      });
    }
  }
});

// Payment success handling route (for redirects)
app.get("/payment-success", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Success - Heritage Fest 2025</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px; 
                    background: linear-gradient(135deg, #FF6B35, #b6854d);
                    color: white;
                }
                .success-container {
                    background: white;
                    color: #333;
                    padding: 40px;
                    border-radius: 10px;
                    max-width: 500px;
                    margin: 0 auto;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
                .success-icon {
                    font-size: 4rem;
                    color: #28a745;
                    margin-bottom: 20px;
                }
                h1 { color: #28a745; }
                .btn {
                    background: #FF6B35;
                    color: white;
                    padding: 15px 30px;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    display: inline-block;
                    margin-top: 20px;
                    font-size: 1.1rem;
                }
            </style>
        </head>
        <body>
            <div class="success-container">
                <div class="success-icon">🎉</div>
                <h1>Payment Successful!</h1>
                <p>Thank you for registering for Heritage Fest 2025!</p>
                <p>You will receive confirmation details via email and SMS shortly.</p>
                <a href="/" class="btn">Back to Heritage Fest</a>
            </div>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Heritage Fest Server running on http://localhost:${PORT}`);
  console.log(`📱 Your website is available at: http://localhost:${PORT}`);
  console.log(
    `💳 Payment API endpoint: http://localhost:${PORT}/api/create-payment`
  );
  console.log("");
  console.log("🔥 Ready to accept payments with Seamless Checkout!");
  console.log("");
  console.log("📋 Features:");
  console.log("   ✅ Instamojo Seamless Checkout integration");
  console.log("   ✅ Real-time payment success/failure handling");
  console.log("   ✅ Fallback payment link for network issues");
  console.log("   ✅ Registration data storage in localStorage");
  console.log("");
  console.log(
    '💡 Usage: Fill the registration form and click "Pay with Instamojo"'
  );
});
