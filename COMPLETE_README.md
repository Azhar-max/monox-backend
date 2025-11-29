# 🎁 MANOX — Gifts that surprise, moments that last

**MANOX** is a full-stack, modern e‑commerce platform built for the art of giving. This scaffold combines a responsive React + Vite frontend with a robust Express + MongoDB backend to create an unforgettable shopping experience.

**Slogan:** _"Gifts that surprise, moments that last"_

---

## 🌟 Features

✅ **Modern, Responsive UI** — Mobile-first design with Tailwind CSS gradient overlays and smooth animations
✅ **39+ Real Products** — Seeded with actual jewelry, accessories, beauty tools, and more from your asset folder
✅ **Category Filtering** — Browse by jewelry, hair accessories, beauty tools, eye care, and keychains
✅ **Product Detail Pages** — Full image, descriptions, pricing, and quantity selector
✅ **Shopping Cart** — Persistent localStorage cart with add/remove/update functionality
✅ **Professional Checkout** — Coupon support (code: `SAVE10`), tax & shipping calculations
✅ **Order Management** — RESTful API to create and track orders
✅ **Beautiful Header & Footer** — Brand-aware navigation with cart badge and social links
✅ **Hero Section** — Engaging landing page with brand values and call-to-action

---

## 🎨 What We Offer

- **Personalized Gift Boxes** — Elegant packages that enclose unique surprises
- **Flower Bouquets** — Fresh (Reggio Emilia delivery) or high-quality artificial flowers
- **Jewelry Bouquets** — Refined designs combining beauty and preciousness
- **Beauty & Accessories** — Curated collections including jhumkas, bangles, dream catchers, and more
- **Eye Care & Tools** — Premium silk masks, lash curlers, and beauty essentials

---

## 💎 Our Values

🎁 **Originality & Design** — Every composition is unique, studied in colors, materials, and emotion
🌿 **Quality Materials** — Carefully selected items from reliable, trusted suppliers
✨ **Personalization** — Tailor-made solutions that reflect the giver's wishes and personality
🍫 **Attention to Detail** — Every creation designed to surprise and create unforgettable moments

---

## 🎨 Brand Colors

- **Fuchsia (Primary):** `#FF0F7B`
- **Blue (Accent):** `#1E90FF`
- **Background:** Light gray (`#f1f1f1`)

---

## 📱 Tech Stack

### Frontend
- **React 18** — UI library
- **Vite 6** — Fast bundler
- **Tailwind CSS** — Utility-first styling
- **React Router v6** — Client-side routing
- **Axios** — HTTP client

### Backend
- **Express.js** — REST API framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JWT & bcryptjs** — Authentication & password hashing
- **CORS** — Cross-origin resource sharing

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB >= 4.4 (local or cloud instance)
- npm or yarn

### 1. Clone & Navigate

```bash
cd manox_updated
```

### 2. Backend Setup

```powershell
cd backend
npm install

# Optional: Create .env file
# MONGO_URI=mongodb://127.0.0.1:27017/manox
# JWT_SECRET=your_secret_key
# FRONTEND_URL=http://localhost:5173

# Seed the database with 39+ products
node seed.js

# Start the server
node server.js
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

```powershell
cd frontend
npm install

# Start Vite dev server
npm run dev
# Frontend opens at http://localhost:5173
```

### 4. Open in Browser

Navigate to **http://localhost:5173** and start shopping!

---

## 📂 Project Structure

```
manox_updated/
├── backend/
│   ├── src/
│   │   ├── models/           # Product, User, Order schemas
│   │   └── routes/           # API endpoints
│   ├── seed.js               # Database seeder (39 products)
│   ├── server.js             # Express server entry
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # Home, Shop, Product, Cart
│   │   ├── components/       # Header, Footer
│   │   ├── context/          # CartContext (Redux-like state)
│   │   ├── App.jsx           # Main app
│   │   └── main.jsx          # Entry point
│   ├── public/assets/        # Product images (SVG)
│   ├── index.html
│   ├── tailwind.config.cjs   # Tailwind theme
│   ├── postcss.config.cjs    # PostCSS config
│   └── package.json
│
└── README.md
```

---

## 🛒 API Endpoints

### Products
- `GET /api/products` — List all products (paginated)
- `GET /api/products?category=jewelry` — Filter by category
- `GET /api/products/:id` — Get product details

### Authentication
- `POST /api/auth/register` — Create new user
- `POST /api/auth/login` — User login

### Orders
- `POST /api/orders` — Create an order
- `GET /api/orders` — List orders

---

## 🎯 Usage

1. **Browse Products** — Visit `/shop` to see 39+ items organized by category
2. **View Details** — Click any product to see full description, price, and stock
3. **Add to Cart** — Use the "Add to Cart" button; cart persists in localStorage
4. **Checkout** — Review your cart, apply coupon code `SAVE10` for 10% off, enter email and proceed
5. **Place Order** — Confirm purchase; order is saved to the database

---

## 🎁 Coupon Code

**Code:** `SAVE10`
**Discount:** 10% off your total order
**Usage:** Enter in the cart checkout form

---

## 📞 Contact & Social

- **Email:** [giftboxitaly@gmail.com](mailto:giftboxitaly@gmail.com)
- **Instagram:** [@manox._b](https://instagram.com/manox._b)
- **TikTok:** [@MANOX](https://tiktok.com/@MANOX)

---

## 🚀 Production Deployment

### Frontend
```bash
npm run build    # Create optimized production build
npm run preview  # Preview production build locally
```

### Backend
- Set `NODE_ENV=production`
- Use a cloud MongoDB (Atlas, Azure Cosmos, etc.)
- Deploy to Heroku, Railway, Vercel, AWS, or similar
- Update `FRONTEND_URL` to your production domain

---

## 🔒 Security Notes

- **JWT Expiration:** Tokens expire after 1 hour (configurable)
- **Password Hashing:** bcryptjs with salt rounds = 12
- **CORS:** Configured to accept frontend requests
- **Input Validation:** Add stricter validation for production

---

## 📈 Future Enhancements

- ✨ Payment gateway integration (Stripe / PayPal)
- 🏃 Admin dashboard for product management
- 📧 Email notifications for orders
- 🔐 Enhanced user authentication & profiles
- 📊 Analytics & sales dashboard
- 🌍 Multi-language support
- 🚚 Shipping integrations

---

## 📝 License

MANOX © 2025. All rights reserved. Built with ❤️ for the art of giving.

---

**Happy Gifting! 🎉**
