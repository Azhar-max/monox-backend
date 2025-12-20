# MANOX - Premium E-Commerce Platform

## 🎁 Overview

MANOX is a premium e-commerce platform specializing in curated gift boxes and jewelry. Built with modern web technologies, it offers a seamless shopping experience with a focus on aesthetics and functionality.

## 🌟 Key Features

### Customer-Facing Website
- **Responsive Design**: Works beautifully on all devices
- **Multi-Language Support**: English and Italian
- **Shopping Cart**: Intuitive cart management
- **Product Catalog**: Beautifully organized products
- **Contact Form**: Easy customer communication
- **Chat Support**: Integrated customer support
- **Theme Switching**: Light/Dark mode

### Admin Panel
- **Dashboard**: Analytics and statistics
- **Product Management**: Add, edit, delete products
- **Order Management**: Track and manage orders
- **User Management**: Customer overview
- **Settings**: Site configuration
- **Notifications**: System alerts

## 🛠 Technology Stack

### Frontend
- **React.js** with **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for HTTP requests
- **Chart.js** for data visualization

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing

## 📁 Project Structure

```
manox/
├── backend/
│   ├── src/
│   │   ├── models/     # Database models
│   │   ├── routes/     # API routes
│   │   └── middleware/ # Authentication middleware
│   ├── server.js       # Main server file
│   └── package.json    # Backend dependencies
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Page components
    │   ├── context/    # React context providers
    │   └── hooks/      # Custom React hooks
    ├── public/         # Static assets
    └── package.json    # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/manox.git
   cd manox
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Setup**
   - Copy `.env.example` to `.env` in both `backend` and `frontend` directories
   - Update environment variables as needed

### Development

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3002
   - Admin Panel: http://localhost:5173/admin

## 🌐 Multi-Language Support

MANOX supports both English and Italian. Users can toggle between languages using the language switcher in the header.

## 🎨 Theme Support

The platform includes both light and dark themes that can be toggled by the user.

## 🔐 Authentication

- **Customer Access**: Standard user registration/login
- **Admin Access**: Protected admin panel with login at `/admin/login`

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop computers
- Tablets
- Mobile devices

## 📦 Deployment

### Frontend + Backend Deployment

The application can be deployed using various hosting providers for both frontend and backend.

### Deployment Steps

1. **Prepare Backend for Deployment**
   - Update environment variables in `backend/.env.production`
   - Ensure MongoDB connection is configured

2. **Prepare Frontend for Deployment**
   - Update environment variables in `frontend/.env.production`
   - Ensure API URL points to your backend

3. **Deploy Frontend**
   - You can deploy the frontend to various platforms like Vercel, Netlify, or similar services
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy Backend**
   - Deploy the backend to platforms like Render, Railway, or similar services
   - Build command: `npm install`
   - Start command: `npm start`

5. **Final Configuration**
   - Update CORS settings in backend with your frontend URL
   - Verify API connectivity
   - Test all functionality
## 🧪 Testing

- Frontend tests: `cd frontend && npm test`
- Backend tests: `cd backend && npm test`

## 📚 Documentation

- [NETLIFY_DEPLOYMENT_GUIDE.md](NETLIFY_DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [DEPLOYMENT_TRACKER.md](DEPLOYMENT_TRACKER.md) - Deployment progress tracking
- [ADMIN_PANEL_PERFORMANCE_IMPROVEMENTS.md](ADMIN_PANEL_PERFORMANCE_IMPROVEMENTS.md) - Admin panel optimizations
- [ADMIN_PANEL_RESPONSIVE_IMPROVEMENTS.md](ADMIN_PANEL_RESPONSIVE_IMPROVEMENTS.md) - Admin panel responsive design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support, please contact the development team or check the documentation files.