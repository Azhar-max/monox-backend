import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const Hero = () => {
  const { language } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
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
    <motion.section 
      className="relative overflow-hidden bg-gradient-to-br from-manox-fuchsia to-manox-blue text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white opacity-10 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            {language === 'en' ? 'Discover Unique Gifts' : 'Scopri Regali Unici'}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            variants={itemVariants}
          >
            {language === 'en' 
              ? 'Handcrafted gifts for every occasion. Personalized and beautiful.' 
              : 'Regali fatti a mano per ogni occasione. Personalizzati e belli.'}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Link 
                to="/shop" 
                className="btn-primary px-8 py-4 text-lg font-semibold text-center block"
              >
                {language === 'en' ? 'Shop Now' : 'Acquista Ora'}
              </Link>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Link 
                to="/about" 
                className="bg-white text-manox-fuchsia px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-center block"
              >
                {language === 'en' ? 'Learn More' : 'Scopri di Più'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;