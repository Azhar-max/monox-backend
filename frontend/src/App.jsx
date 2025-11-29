import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import About from './pages/About'
// Admin pages
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminProducts from './pages/Admin/Products'
import ProductEdit from './pages/Admin/ProductEdit'
import AdminOrders from './pages/Admin/Orders'
import OrderDetails from './pages/Admin/OrderDetails'
import AdminUsers from './pages/Admin/Users'
import Settings from './pages/Admin/Settings'
import Notifications from './pages/Admin/Notifications'
import Messages from './pages/Admin/Messages'
import AdminLayout from './pages/Admin/components/AdminLayout'
import { CartProvider, useCart } from './context/CartContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

import ChatSupport from './components/ChatSupport'

// Animated Route component for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/product/:id' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        
        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='products/new' element={<ProductEdit />} />
          <Route path='products/:id' element={<ProductEdit />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='orders/:id' element={<OrderDetails />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='settings' element={<Settings />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='messages' element={<Messages />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function Header(){
  const { state } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const count = state.items.reduce((s,i)=> s + i.qty, 0);
  
  const navItems = {
    home: { en: 'Home', it: 'Home' },
    shop: { en: 'Shop', it: 'Negozio' },
    about: { en: 'About', it: 'Chi Siamo' },
    contact: { en: 'Contact', it: 'Contatti' },
    cart: { en: 'Cart', it: 'Carrello' }
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to='/' className="font-bold text-2xl text-manox-fuchsia flex items-center">
            <img src="/logo.jpg" alt="MANOX Logo" className="h-10 mr-3" />
            <span className="animate-pulse-subtle">MANOX</span>
          </Link>
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link to='/' className="text-gray-700 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft">{navItems.home[language]}</Link>
              <Link to='/shop' className="text-gray-700 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-75">{navItems.shop[language]}</Link>
              <Link to='/about' className="text-gray-700 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-100">{navItems.about[language]}</Link>
              <Link to='/contact' className="text-gray-700 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-150">{navItems.contact[language]}</Link>
              <Link to='/cart' className="flex items-center px-4 py-2 bg-manox-fuchsia text-white rounded-full hover:bg-manox-blue transition duration-300 animate-slideInFromLeft delay-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {navItems.cart[language]} {count > 0 && <span className="ml-1 bg-white text-manox-fuchsia rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse-subtle">{count}</span>}
              </Link>
            </nav>
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300 animate-slideInFromLeft delay-300"
            >
              {language === 'it' ? 'EN' : 'IT'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer(){
  const { language, t } = useLanguage();
  
  const footerText = {
    tagline: { 
      en: 'The art of the unforgettable gift. Gifts that surprise, moments that last.', 
      it: 'L\'arte del regalo indimenticabile. Regali che sorprendono, momenti che durano.' 
    },
    mission: { 
      en: 'Born from a passion for the art of giving and from the desire to transform every special occasion into a unique memory.', 
      it: 'Nata dalla passione per l\'arte del dono e dal desiderio di trasformare ogni occasione speciale in un ricordo unico.' 
    },
    quickLinks: { en: 'Quick Links', it: 'Link Veloci' },
    home: { en: 'Home', it: 'Home' },
    shop: { en: 'Shop', it: 'Negozio' },
    about: { en: 'About', it: 'Chi Siamo' },
    contact: { en: 'Contact', it: 'Contatti' },
    connect: { en: 'Connect With Us', it: 'Seguici' },
    email: { en: 'Email', it: 'Email' }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo.jpg" alt="MANOX Logo" className="h-12 mr-3" />
              <h3 className="text-2xl font-bold text-manox-fuchsia animate-pulse-subtle">MANOX</h3>
            </div>
            <p className="text-gray-300 mb-4 animate-fadeIn">
              {footerText.tagline[language]}
            </p>
            <p className="text-gray-300 animate-fadeIn delay-100">
              {footerText.mission[language]}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 animate-slideInFromLeft">{footerText.quickLinks[language]}</h4>
            <ul className="space-y-2">
              <li><Link to='/' className="text-gray-300 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-75">{footerText.home[language]}</Link></li>
              <li><Link to='/shop' className="text-gray-300 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-100">{footerText.shop[language]}</Link></li>
              <li><Link to='/about' className="text-gray-300 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-150">{footerText.about[language]}</Link></li>
              <li><Link to='/contact' className="text-gray-300 hover:text-manox-fuchsia transition duration-300 animate-slideInFromLeft delay-200">{footerText.contact[language]}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 animate-slideInFromLeft">{footerText.connect[language]}</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com/manox._b" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-manox-fuchsia transition duration-300 animate-bounce">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://tiktok.com/@MANOX" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-manox-fuchsia transition duration-300 animate-bounce delay-100">
                <span className="sr-only">TikTok</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-300 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              giftboxitaly@gmail.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="animate-fadeIn">© {new Date().getFullYear()} MANOX — {footerText.tagline[language]}</p>
        </div>
      </div>
    </footer>
  )
}

// Wrapper component to provide context to Header and Footer
function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
      <Footer />
      <ChatSupport />
    </div>
  );
}

export default function App(){
  return (
    <LanguageProvider>
      <CartProvider>
        <AppLayout>
          <AnimatedRoutes />
        </AppLayout>
      </CartProvider>
    </LanguageProvider>
  )
}