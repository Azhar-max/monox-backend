import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 300 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const showTooltip = () => {
    const newTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimer(newTimer);
  };

  const hideTooltip = () => {
    clearTimeout(timer);
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 -mt-1 border-t border-l border-gray-800 bg-gray-800 w-2 h-2 rotate-45',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-b border-r border-gray-800 bg-gray-800 w-2 h-2 rotate-45',
    left: 'left-full top-1/2 transform -translate-y-1/2 -ml-1 border-t border-l border-gray-800 bg-gray-800 w-2 h-2 rotate-45',
    right: 'right-full top-1/2 transform -translate-y-1/2 -mr-1 border-b border-r border-gray-800 bg-gray-800 w-2 h-2 rotate-45'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <motion.div
          className="absolute z-50 whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`relative ${positionClasses[position]}`}>
            <div className="bg-gray-800 text-white text-xs font-medium py-1 px-2 rounded">
              {content}
              <div className={`absolute ${arrowClasses[position]}`}></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;