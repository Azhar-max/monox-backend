import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  actions,
  className = '',
  noPadding = false,
  hoverEffect = true,
  glassEffect = false
}) => {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden ${
        glassEffect 
          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 shadow-xl' 
          : 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg border border-gray-700/50'
      } ${
        hoverEffect ? 'hover:shadow-2xl transition-all duration-300' : ''
      } ${className}`}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
    >
      {(title || subtitle || actions) && (
        <div className={`px-6 py-4 ${glassEffect ? 'border-b border-gray-700/50' : 'border-b border-gray-700/50'}`}>
          <div className="flex justify-between items-start">
            <div>
              {title && (
                <h3 className={`dashboard-card-title ${glassEffect ? 'text-gray-100' : 'text-gray-100'}`}>{title}</h3>
              )}
              {subtitle && (
                <p className={`dashboard-card-subtitle ${glassEffect ? 'text-gray-400' : 'text-gray-400'}`}>{subtitle}</p>
              )}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;