import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-manox-fuchsia to-manox-blue"></div>
              <h3 className="font-bold text-white text-lg">MANOX</h3>
            </div>
            <p className="text-sm text-gray-400">The art of the unforgettable gift. Gifts that surprise, moments that last.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to='/' className="text-gray-400 hover:text-manox-fuchsia transition">Home</Link></li>
              <li><Link to='/shop' className="text-gray-400 hover:text-manox-fuchsia transition">Shop</Link></li>
              <li><Link to='/cart' className="text-gray-400 hover:text-manox-fuchsia transition">Cart</Link></li>
              <li><a href="#about" className="text-gray-400 hover:text-manox-fuchsia transition">About Us</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-400 hover:text-manox-fuchsia transition">Jewelry</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-manox-fuchsia transition">Accessories</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-manox-fuchsia transition">Beauty Tools</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-manox-fuchsia transition">Floral</a></li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:giftboxitaly@gmail.com" className="text-gray-400 hover:text-manox-fuchsia transition">giftboxitaly@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="https://instagram.com/manox._b" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-manox-fuchsia transition">@manox._b</a>
              </li>
              <li className="flex items-center gap-2">
                <span>🎵</span>
                <a href="https://tiktok.com/@MANOX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-manox-fuchsia transition">@MANOX</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 MANOX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-manox-fuchsia transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-manox-fuchsia transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-manox-fuchsia transition">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
