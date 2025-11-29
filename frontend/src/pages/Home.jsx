import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { LanguageContext } from '../context/LanguageContext';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${api}/products?limit=8`);
        // Fix: Use response.data.items instead of response.data
        setFeaturedProducts(response.data.items || response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load featured products', err);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <AnimatedPageWrapper>
      <div>
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Products */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Featured Products' : 'Prodotti in Evidenza'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {language === 'en' 
                ? 'Discover our most popular gifts and accessories' 
                : 'Scopri i nostri regali e accessori più popolari'}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-manox-fuchsia"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a 
              href="/shop" 
              className="btn-primary px-8 py-3 text-lg font-semibold inline-block"
            >
              {language === 'en' ? 'View All Products' : 'Visualizza Tutti i Prodotti'}
            </a>
          </div>
        </div>

        {/* Features Section */}
        <FeatureGrid />
      </div>
    </AnimatedPageWrapper>
  );
}
