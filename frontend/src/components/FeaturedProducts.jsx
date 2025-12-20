import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

function ProductCard({ product, onAddToCart, language, t }) {
  // Get text based on language
  const getText = (item) => {
    if (language === 'it' && item.title_it) return item.title_it;
    return item.title_en || item.title;
  };
  
  const getDescription = (item) => {
    if (language === 'it' && item.description_it) return item.description_it;
    return item.description_en || item.description;
  };
  
  return (
    <div className="card-hover-effect bg-white rounded-lg shadow-md overflow-hidden product-card">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.images && product.images[0] ? 
          <img src={product.images[0]} alt={getText(product)} className="max-h-full w-full object-cover" /> : 
          <span className="text-gray-400">{t('imageUnavailable')}</span>
        }
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 animate-slideInFromLeft">{getText(product)}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 animate-slideInFromLeft delay-75">{getDescription(product)}</p>
        <div className="flex items-center justify-between">
          <div className="font-bold text-manox-fuchsia animate-slideInFromLeft delay-100">€{product.price.toFixed(2)}</div>
          <button 
            className="px-3 py-1 rounded bg-manox-fuchsia text-white text-sm hover:bg-manox-blue transition duration-300 btn-primary-glow"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${api}/products?featured=true&limit=10`)
      .then(r => {
        // Filter out flowers and gift-box categories from featured products
        const filteredProducts = (r.data.items || []).filter(p => 
          p.category !== 'flowers' && p.category !== 'gift-box'
        );
        setProducts(filteredProducts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [api]);

  const handleAddToCart = (product) => {
    addItem({ 
      productId: product._id, 
      title: language === 'it' && product.title_it ? product.title_it : (product.title_en || product.title),
      price: product.price, 
      qty: 1,
      image: product.images && product.images[0] ? product.images[0] : null
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!products.length) return null;

  return (
    <section className="mb-16 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-manox-fuchsia animate-slideInFromLeft">
        {language === 'it' ? 'Prodotti in Evidenza' : 'Featured Products'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product._id} 
            onClick={() => navigate(`/product/${product._id}`)}
            className="cursor-pointer card-hover-effect animate-fadeIn delay-100"
          >
            <ProductCard 
              product={product} 
              language={language}
              t={t}
              onAddToCart={handleAddToCart} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}