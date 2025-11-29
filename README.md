# MANOX - Premium Gift Box E-commerce Platform

A full-featured e-commerce platform for MANOX, specializing in premium gift boxes, jewelry, and personalized gifts.

## Features

### Website (Customer-Facing)
- **Responsive Design**: Fully responsive layout that works on all devices
- **Multi-language Support**: English and Italian language options
- **Product Catalog**: Browse and search products with categories
- **Shopping Cart**: Add/remove items, adjust quantities
- **Product Details**: Detailed product pages with images and descriptions
- **About Us**: Company information and mission
- **Contact Page**: Contact form with business information
- **Social Media Integration**: Links to Instagram and TikTok
- **Chat Support**: Real-time chat support widget
- **Animations**: Smooth animations and transitions using Framer Motion

### Admin Panel
- **Dashboard**: Overview with statistics and charts
- **Product Management**: Create, edit, and delete products
- **Order Management**: View and manage customer orders
- **User Management**: Manage customer accounts
- **Notifications**: System notifications and alerts
- **Messages**: Customer communication system
- **Settings**: Theme customization and site configuration
- **Security**: Admin authentication and authorization
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests
- Chart.js for data visualization

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

## Development

### Running the Frontend
```bash
cd frontend
npm run dev
```

### Running the Backend
```bash
cd backend
npm start
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:10000/api
```

### Backend (.env)
```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
PORT=10000
```

## Deployment

### Vercel + Render Deployment (Recommended)

For detailed deployment instructions using Vercel for frontend and Render for backend, see [DEPLOYMENT_VERCEL_RENDER.md](DEPLOYMENT_VERCEL_RENDER.md).

### General Deployment Steps

1. **Prepare Production Environment Files**
   - Create `frontend/.env.production` with your backend URL
   - Create `backend/.env.production` with your MongoDB connection string

2. **Deploy Backend to Render**
   - Push code to GitHub
   - Create Render web service
   - Configure environment variables

3. **Deploy Frontend to Vercel**
   - Push code to GitHub
   - Create Vercel project
   - Configure build settings and environment variables

4. **Configure Domain**
   - Point domain to Vercel frontend
   - Update backend CORS settings

## Project Structure

```
manox/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── assets/
│   └── public/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
└── README.md
```

## Customization

### Colors
The primary colors are defined in the Tailwind configuration:
- Primary: #FF0F7B (Fuchsia)
- Secondary: #1E90FF (Blue)

### Themes
The admin panel supports light, dark, and system themes that can be customized in the settings.

## Support

For support, please contact giftboxitaly@gmail.com or open an issue on the repository.

## License

This project is proprietary software developed for MANOX.