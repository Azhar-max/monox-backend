import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logoImg from '../assets/products/misc/logo.jpg'

export default function Header(){
  const { state } = useCart();
  const count = state.items.reduce((s,i)=> s + i.qty, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartTotal = state.items.reduce((s,i)=> s + (i.price * i.qty), 0).toFixed(2);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to='/' className="flex items-center gap-2">
            <img 
              src={logoImg} 
              alt="MANOX Logo" 
              className="w-20 h-20 object-cover rounded-lg shadow-md hover:shadow-lg transition"
            />
            <div>
              <h1 className="font-bold text-xl text-manox-fuchsia">MANOX</h1>
              <p className="text-xs text-gray-600">Gifts that surprise</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to='/' className="text-gray-700 hover:text-manox-fuchsia transition">Home</Link>
            <Link to='/shop' className="text-gray-700 hover:text-manox-fuchsia transition">Shop</Link>
            <a href="#contact" className="text-gray-700 hover:text-manox-fuchsia transition">Contact</a>
          </nav>
          
          {/* Cart Link */}
          <Link to='/cart' className="relative">
            <button className="px-4 py-2 bg-gradient-to-r from-manox-fuchsia to-manox-blue text-white rounded-full hover:shadow-lg transition">
              🛒 Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <Link to='/' className="block py-2 text-gray-700 hover:text-manox-fuchsia">Home</Link>
            <Link to='/shop' className="block py-2 text-gray-700 hover:text-manox-fuchsia">Shop</Link>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-manox-fuchsia">Contact</a>
          </div>
        )}
      </div>
    </header>
  )
}
