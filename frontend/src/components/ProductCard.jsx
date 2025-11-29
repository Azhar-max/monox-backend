import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

const ProductCard = ({ product, onAddToCart, index }) => {
  const { language } = useContext(LanguageContext);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="h-48 overflow-hidden">
          <motion.div variants={imageVariants}>
            <ImageWithFallback
              src={product.images[0]}
              alt={language === 'en' ? product.title.en : product.title.it}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${product._id}`} className="block flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {language === 'en' ? product.title.en : product.title.it}
          </h3>
          
          <div className="mt-2">
            <span className="text-xl font-bold text-manox-fuchsia">€{product.price.toFixed(2)}</span>
          </div>
        </Link>
        
        <div className="mt-4">
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onAddToCart(product)}
            className="w-full btn-primary text-sm py-2 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {language === 'en' ? 'Add to Cart' : 'Aggiungi al Carrello'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;