# 🎭 Heritage Fest 2025

<div align="center">

![Heritage Fest Banner](https://img.shields.io/badge/Heritage%20Fest-2025-orange?style=for-the-badge&logo=calendar&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A Cultural Celebration Platform by Hare Krishna Movement, Bhilai**

_Celebrating culture and devotion through Dance, Music, Art, Literature and Theatre competitions_

[🚀 Live Demo](https://hkmraipur.org/heritage-fest) • [📖 Documentation](#installation) • [🎯 Features](#features) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Support](#contact--support)

---

## 🌟 Overview

Heritage Fest 2025 is a comprehensive web application designed for the **ISKCON (International Society for Krishna Consciousness)** Hare Krishna Movement in Bhilai to organize and manage cultural competitions. This is an **official ISKCON project** that provides seamless event registration, secure payment processing through Instamojo, and an intuitive user experience for participants.

**🌐 Live Application**: [https://hkmraipur.org/heritage-fest](https://hkmraipur.org/heritage-fest)

### 🎯 Mission

To create a digital platform that celebrates Indian heritage through various cultural competitions while providing a smooth registration and payment experience for ISKCON's cultural events.

---

## 🏛️ Official ISKCON Project

<div align="center">

![ISKCON](https://img.shields.io/badge/ISKCON-Official%20Project-saffron?style=for-the-badge&logo=temple&logoColor=white)
![Live Status](https://img.shields.io/badge/Status-Live%20Production-success?style=for-the-badge&logo=check&logoColor=white)

**🌐 Live Application**: [https://hkmraipur.org/heritage-fest](https://hkmraipur.org/heritage-fest)

</div>

This Heritage Fest platform is an **official project commissioned by ISKCON** (International Society for Krishna Consciousness) to digitalize their cultural competition management. The project was initiated and supervised by **Team Director Neha Mahto** to enhance the participant experience for ISKCON's heritage celebration events.

### 🎯 Project Scope

- **Organization**: ISKCON Hare Krishna Movement, Bhilai
- **Platform Type**: Official Cultural Event Management System
- **Target Audience**: Devotees and cultural enthusiasts
- **Geographic Reach**: Bhilai and surrounding regions

---

## ✨ Features

### 🎪 Event Management

- **Multi-Category Competitions**: Dance, Music, Art, Literature, and Theatre
- **Flexible Registration**: Solo and Group participation options
- **Age-Appropriate Categories**: Competitions designed for different age groups
- **Real-time Availability**: Live updates on registration status

### 💳 Payment Integration

- **Secure Payments**: Instamojo Seamless Checkout integration
- **Multiple Payment Methods**: UPI, Cards, Net Banking, Wallets
- **Instant Confirmations**: Real-time payment success/failure handling
- **Fallback Support**: Alternative payment links for network issues

### 🔒 Security & Reliability

- **Environment Variables**: Secure API key management
- **Rate Limiting**: Protection against spam requests
- **Error Handling**: Comprehensive error recovery mechanisms
- **Data Validation**: Input sanitization and validation

### 📱 User Experience

- **Responsive Design**: Mobile-first approach
- **Interactive UI**: Smooth animations and transitions
- **Local Storage**: Registration data persistence
- **Accessibility**: Screen reader friendly design

---

## 🛠 Tech Stack

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)

### Payment Gateway

![Instamojo](https://img.shields.io/badge/Instamojo-FF6B35?style=flat-square&logo=payments&logoColor=white)

### Tools & Libraries

- **Axios**: HTTP client for API requests
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **qs**: Query string parsing
- **Nodemon**: Development server auto-restart

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Instamojo account with API credentials

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/kunaldevelopers/Fest.git
   cd Fest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your Instamojo credentials:

   ```env
   INSTAMOJO_API_KEY=your_api_key_here
   INSTAMOJO_AUTH_TOKEN=your_auth_token_here
   ```

4. **Start the application**

   ```bash
   # Production mode
   npm start

   # Development mode (with auto-restart)
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

---

## ⚙️ Configuration

### Environment Variables

| Variable               | Description               | Required |
| ---------------------- | ------------------------- | -------- |
| `INSTAMOJO_API_KEY`    | Your Instamojo API Key    | ✅       |
| `INSTAMOJO_AUTH_TOKEN` | Your Instamojo Auth Token | ✅       |

### Payment Configuration

- **Solo Registration**: ₹200
- **Group Registration**: ₹300
- **Minimum Amount**: ₹9 (Instamojo requirement)
- **Timeout**: 20 seconds per request
- **Retry Attempts**: 3 (for connection errors)

---

## 📖 Usage

### For Participants

1. **Browse Events**: View available competitions in different categories
2. **Select Category**: Choose from Dance, Music, Art, Literature, or Theatre
3. **Choose Type**: Select Solo or Group participation
4. **Fill Details**: Complete the registration form
5. **Make Payment**: Secure payment through Instamojo
6. **Confirmation**: Receive confirmation via email

### For Administrators

- Monitor registrations through server logs
- Access payment details through Instamojo dashboard
- Manage participant data stored in localStorage

---

## 🔌 API Documentation

### Endpoints

#### Create Payment Request

```http
POST /api/create-payment
```

**Request Body:**

```json
{
  "purpose": "Heritage Fest 2025 - bharatnatyam (solo)",
  "amount": 200,
  "buyer_name": "John Doe",
  "buyer_email": "john@example.com",
  "buyer_phone": "9876543210",
  "redirect_url": "http://localhost:3000"
}
```

**Response:**

```json
{
  "success": true,
  "paymentUrl": "https://www.instamojo.com/...",
  "payment_request_id": "abc123"
}
```

### Error Handling

- **Rate Limiting**: 429 status for rapid requests
- **Validation Errors**: 400 status for invalid data
- **Server Errors**: 500 status with detailed error messages
- **Network Issues**: Automatic retry with fallback options

---

## 📁 Project Structure

```
Fest/
├── 📄 index.html              # Main application file
├── 🖥️ server.js              # Express.js backend server
├── 📦 package.json           # Node.js dependencies
├── 🔒 .env                   # Environment variables (not in repo)
├── 📋 .env.example           # Environment template
├── 🚫 .gitignore            # Git ignore rules
├── 📖 README.md             # Project documentation
└── 📁 node_modules/         # Dependencies (auto-generated)
```

---

## 🖼️ Screenshots

### Homepage

_Beautiful landing page showcasing Heritage Fest 2025_

### Event Categories

_Comprehensive list of cultural competitions_

### Registration Form

_User-friendly registration with validation_

### Payment Integration

_Secure Instamojo payment checkout_

---

## 🤝 Contributing

We welcome contributions to make Heritage Fest even better!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Areas for Contribution

- 🎨 UI/UX improvements
- 🔧 Performance optimizations
- 🐛 Bug fixes and testing
- 📚 Documentation enhancements
- 🌐 Accessibility improvements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

<div align="center">

### 👨‍💻 Developer: **Kunal Kumar Pandit**

[![Email](https://img.shields.io/badge/Email-kunalkprnc@gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kunalkprnc@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+91%209471376362-green?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/919471376362)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kunal%20Kumar%20Pandit-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kunalkumarpandit/)
[![Website](https://img.shields.io/badge/Website-www.cyberkunal.com-orange?style=for-the-badge&logo=firefox&logoColor=white)](https://www.cyberkunal.com)
[![GitHub](https://img.shields.io/badge/GitHub-@kunaldevelopers-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kunaldevelopers)

**Project Repository**: [https://github.com/kunaldevelopers/Fest](https://github.com/kunaldevelopers/Fest)

</div>

### 🎭 About Heritage Fest

Heritage Fest is an **official ISKCON project** organized by the **Hare Krishna Movement, Bhilai** to promote and celebrate Indian cultural heritage through various competitive events. This project was commissioned through our Team Director **Neha Mahto**.

**🌐 Live Application**: [https://hkmraipur.org/heritage-fest](https://hkmraipur.org/heritage-fest)

#### 👩‍💼 Project Leadership

- **Team Director**: [Neha Mahto](https://www.linkedin.com/in/neha-mahto-454172245/)
- **Developer**: [Kunal Kumar Pandit](https://www.linkedin.com/in/kunalkumarpandit/)
- **Organization**: ISKCON (International Society for Krishna Consciousness)

### 💬 Get Help

- 📧 **Email Support**: [kunalkprnc@gmail.com](mailto:kunalkprnc@gmail.com)
- 💬 **WhatsApp**: [+91 9471376362](https://wa.me/919471376362)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/kunaldevelopers/Fest/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/kunaldevelopers/Fest/discussions)

---

<div align="center">

**Made with ❤️ for preserving and celebrating Indian heritage**

⭐ Star this repository if you found it helpful!

</div>
