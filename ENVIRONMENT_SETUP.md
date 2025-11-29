# 🛠️ MANOX Development Environment Setup

This guide will help you set up your local development environment for the MANOX e-commerce platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (version 4.4 or higher)
- **Git**
- **Code Editor** (VS Code, WebStorm, etc.)

## 🖥️ System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 2GB free space
- **Internet Connection**: Required for initial setup and dependency installation

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd manox_updated
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# MongoDB connection (default: local MongoDB)
MONGO_URI=mongodb://127.0.0.1:27017/manox

# JWT secret for authentication
JWT_SECRET=manox_development_secret

# Frontend URL for CORS (development)
FRONTEND_URL=http://localhost:5173

# Server port (default: 3001)
PORT=3001
```

#### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS/Linux
mongod

# On Windows, start MongoDB service or run:
# "C:\Program Files\MongoDB\Server\[version]\bin\mongod.exe" --dbpath="C:\data\db"
```

#### Seed the Database
```bash
node seed.js
```

#### Run Backend Development Server
```bash
npm run dev
# or
npm start
```

Backend will be available at: `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

#### Environment Configuration
Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:3001/api
```

#### Run Frontend Development Server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 🧪 Testing the Setup

1. Open your browser and navigate to `http://localhost:5173`
2. You should see the MANOX homepage
3. Navigate to the Shop page to see products
4. Try adding items to the cart
5. Proceed to checkout and place an order

### API Testing
You can test the backend API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Get products
curl http://localhost:3001/api/products

# Get a specific product
curl http://localhost:3001/api/products/[product-id]
```

## 📁 Project Structure

```
manox_updated/
├── backend/
│   ├── src/
│   │   ├── models/           # Database models
│   │   ├── routes/           # API endpoints
│   │   └── middleware/       # Authentication middleware
│   ├── seed.js               # Database seeder
│   ├── server.js             # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context providers
│   │   ├── assets/           # Images and static assets
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Public assets
│   ├── index.html            # HTML template
│   └── package.json
```

## 🔧 Development Commands

### Backend
```bash
cd backend

# Start development server with auto-restart
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Run tests (if available)
npm test
```

### Frontend
```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm run analyze
```

## 🐛 Common Issues and Solutions

### 1. Port Already in Use
If you get an "EADDRINUSE" error:
- Change the PORT in `.env` file
- Or kill the process using the port:
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 [PID]
```

### 2. MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- Verify MongoDB version compatibility

### 3. Missing Environment Variables
- Ensure all required `.env` files are created
- Check that variable names match exactly

### 4. Dependency Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Development Workflow

1. **Create a feature branch**
```bash
git checkout -b feature/new-feature
```

2. **Make changes**
- Edit files in `frontend/src` or `backend/src`
- Changes will auto-reload in development mode

3. **Test changes**
- Check functionality in browser
- Verify API endpoints with curl or Postman

4. **Commit changes**
```bash
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use different secrets for development and production
- Keep dependencies updated
- Review code for security vulnerabilities

## 📞 Support

For development environment issues:
- Check the project README
- Review error messages carefully
- Search for similar issues in documentation
- Contact the development team

## 🎉 You're Ready!

Your development environment is now set up and ready for MANOX e-commerce development. Happy coding!