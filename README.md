# GharKaKhana

Homemade Food Marketplace is a MERN stack web application that connects home-based cooks with customers seeking authentic homemade meals. The platform enables food discovery, secure ordering, cart management, and seamless payment processing.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## 🎯 Project Overview

GharKaKhana is a full-stack e-commerce platform built with the MERN (MongoDB, Express, React, Node.js) stack. It provides a marketplace for home-based food entrepreneurs to sell authentic homemade meals to customers in their locality.

## 🛠 Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS / Material-UI (specify your choice)
- State Management: Redux / Context API (specify your choice)
- HTTP Client: Axios

**Backend:**
- Node.js + Express
- MongoDB (Database)
- JWT for Authentication
- Payment Integration (Stripe/Razorpay - specify)

**Tools:**
- Git & GitHub for version control
- Docker (optional)

## 📁 Project Structure

```
GharKaKhana/
├── backend/
│   ├── config/
│   │   ├── db.js                 # Database connection
│   │   └── env.js                # Environment configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── dishController.js     # Dish/Menu management
│   │   ├── orderController.js    # Order processing
│   │   └── userController.js     # User management
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Dish.js               # Dish/Menu schema
│   │   ├── Order.js              # Order schema
│   │   ├── Review.js             # Review schema (if applicable)
│   │   └── Payment.js            # Payment schema
│   ├── routes/
│   │   ├── auth.routes.js        # Authentication endpoints
│   │   ├── dish.routes.js        # Dish endpoints
│   │   ├── order.routes.js       # Order endpoints
│   │   ├── user.routes.js        # User endpoints
│   │   └── payment.routes.js     # Payment endpoints
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── errorHandler.js       # Global error handling
│   │   └── validation.js         # Request validation
│   ├── utils/
│   │   ├── logger.js             # Logging utility
│   │   ├── validators.js         # Data validators
│   │   └── helpers.js            # Helper functions
│   ├── server.js                 # Express server entry point
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Dependencies
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── images/               # Static images/assets
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Reusable components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Card.jsx
│   │   │   ├── pages/            # Page components
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── DishList.jsx
│   │   │   │   ├── DishDetail.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   └── Profile.jsx
│   │   │   └── auth/             # Auth-related components
│   │   │       ├── PrivateRoute.jsx
│   │   │       └── AuthContext.jsx
│   ├── src/hooks/
│   │   ├── useAuth.js            # Custom auth hook
│   │   ├── useFetch.js           # Custom fetch hook
│   │   └── useCart.js            # Custom cart hook
│   ├── src/services/
│   │   ├── api.js                # Axios instance configuration
│   │   ├── authService.js        # Auth API calls
│   │   ├── dishService.js        # Dish API calls
│   │   ├── orderService.js       # Order API calls
│   │   └── paymentService.js     # Payment API calls
│   ├── src/context/
│   │   ├── AuthContext.jsx       # Authentication context
│   │   ├── CartContext.jsx       # Cart state management
│   │   └── UserContext.jsx       # User state management
│   ├── src/styles/
│   │   ├── index.css
│   │   ├── tailwind.css          # If using Tailwind
│   │   └── variables.css         # CSS variables
│   ├── src/utils/
│   │   ├── localStorage.js       # LocalStorage helpers
│   │   ├── validators.js         # Form validators
│   │   └── formatters.js         # Data formatters
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # React entry point
│   ├── .env.example              # Environment variables template
│   ├── vite.config.js            # Vite configuration
│   ├── package.json              # Dependencies
│   └── package-lock.json
│
├── scripts/
│   ├── seed.js                   # Database seeding script
│   ├── init-db.js                # Database initialization
│   └── debug.js                  # Debug utilities
│
├── .env.example                  # Root env template
├── .gitignore                    # Git ignore rules
├── docker-compose.yml            # Docker configuration (if applicable)
└── README.md                     # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gharkhakhana
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## ✨ Features

- **User Authentication**: Secure login/register with JWT
- **Browse Dishes**: Discover dishes from various home-based cooks
- **Shopping Cart**: Add/remove items and manage quantities
- **Secure Checkout**: Process orders with payment integration
- **Order History**: Track past orders and order status
- **User Profile**: Manage personal information and preferences
- **Ratings & Reviews**: Leave feedback on dishes
- **Search & Filter**: Find dishes by cuisine, price, rating
- **Real-time Notifications**: Order status updates

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Dishes
- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/:id` - Get dish details
- `POST /api/dishes` - Create new dish (seller only)
- `PUT /api/dishes/:id` - Update dish
- `DELETE /api/dishes/:id` - Delete dish

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or support, reach out to: [your-email@example.com]

---

**Happy Coding! 🎉**
