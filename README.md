
# Paytm Clone - A Digital Wallet Application

A full-stack digital wallet application inspired by Paytm, built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to create accounts, log in, view their balance, and send money to other users.

## 🚀 Key Features & Concepts

### 🔐 Authentication & Security
- JWT-based authentication with secure token storage
- Protected routes using React Router
- Password hashing using bcrypt
- Input validation using Zod schema validation

### 💰 Core Functionality
- Real-time balance updates
- Secure peer-to-peer money transfers
- Transaction history with timestamps
- User account management

### 🎨 Frontend
- Built with React.js and Vite
- Responsive design using Tailwind CSS
- State management with React Context API
- Form handling with controlled components
- Client-side routing with React Router
- Axios for API communication

### ⚙️ Backend
- RESTful API with Express.js
- MongoDB with Mongoose for data modeling
- Middleware for authentication and error handling
- Environment-based configuration
- CORS enabled for secure cross-origin requests

### 🛡️ Security Measures
- Environment variables for sensitive data
- Input sanitization
- Rate limiting on authentication endpoints
- Secure HTTP headers

## 🛠 Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Vite as build tool

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- CORS enabled for cross-origin requests
- Zod for input validation

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd paytm
```

### 2. Set up the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 3. Set up the Frontend
```bash
cd ../frontend
npm install
```

### 4. Start the Development Servers

In the backend directory:
```bash
npm start
```

In a new terminal, from the frontend directory:
```bash
npm run dev
```

The application should now be running on `http://localhost:5173`

## 📁 Project Structure

```
paytm/
├── backend/               # Backend server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── index.js          # Entry point
│   └── package.json
│
├── frontend/             # Frontend React application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
└── README.md
```

## 🔒 Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Port for the backend server (default: 3000)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as a learning project
- Inspired by Paytm's digital wallet functionality
