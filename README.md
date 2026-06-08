<div align="center">
  <h1>🚀 EquityFlow</h1>
  <p>A comprehensive, full-stack trading and investment platform, inspired by Zerodha.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material UI" />
  </p>
</div>

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 About the Project
EquityFlow is an end-to-end trading platform designed to manage real-time holdings, positions, and orders. The project is strategically split into three decoupled services to assure scalability, high performance, and ease of development.

## ✨ Features
- **Interactive Dashboard**: Track your holdings, positions, and daily gains with dynamic, real-time visual charts powered by Chart.js.
- **Secure Authentication**: Robust user authentication and session management flow using Passport.js.
- **Order Management**: Execute buy & sell operations seamlessly with MongoDB.
- **Landing Page**: A conversion-optimized, professional front-facing website describing the platform's brokerage services.

## 💻 Tech Stack

### Backend Server
- **Runtime & Framework**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: Passport.js (Local Strategy, passport-local-mongoose)
- **APIs**: RESTful architecture, CORS, Dotenv for environment variables

### Interactive Dashboard
- **Framework**: React 18, React Router DOM
- **Styling**: Material UI (MUI), Emotion
- **Visualizations**: Chart.js, react-chartjs-2
- **Networking**: Axios

### Landing Page Frontend
- **Framework**: React 18
- **Structure**: Component-driven architecture spanning Home, About, Pricing, Products, and Support.

## 📂 Project Structure
```text
EquityFlow/
├── backend/        # Express API serving orders, holdings, and auth
├── dashboard/      # React SPA for authenticated users (portfolios, charts)
└── frontend/       # React SPA for the landing website (marketing, signup)
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster URI)

### Installation & Setup

1. **Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory specifying your configuration:
   ```env
   PORT=3002
   MONGO_URL=your_mongodb_connection_string_here
   ```
   ```bash
   npm start
   ```

2. **Dashboard**:
   ```bash
   cd dashboard
   npm install
   npm start
   ```

3. **Frontend (Landing Page)**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📈 Usage
- Visit `http://localhost:3001` (or your assigned port) to view the **Frontend Landing Page**.
- Visit `http://localhost:3000` to access the **Trading Dashboard**.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
