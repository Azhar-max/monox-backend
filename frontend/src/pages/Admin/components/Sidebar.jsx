import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiShoppingBag, 
  FiBox, 
  FiSettings, 
  FiChevronLeft, 
  FiChevronRight,
  FiUser,
  FiZap,
  FiBell,
  FiUsers,
  FiMessageSquare
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/admin/dashboard'
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: <FiShoppingBag className="w-5 h-5" />,
      path: '/admin/orders'
    },
    {
      id: 'products',
      title: 'Products',
      icon: <FiBox className="w-5 h-5" />,
      path: '/admin/products'
    },
    {
      id: 'users',
      title: 'Users',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/admin/users'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <FiBell className="w-5 h-5" />,
      path: '/admin/notifications'
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: <FiMessageSquare className="w-5 h-5" />,
      path: '/admin/messages'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      path: '/admin/settings'
    }
  ];

  const isActive = (path) => location.pathname === path;
  
  // Memoized toggle function for better performance
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <motion.div 
      className={`bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] text-white h-full flex flex-col shadow-2xl border-r backdrop-blur-lg ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      style={{borderColor: 'var(--border-color)'}}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{borderColor: 'var(--border-color)'}}>
        <div className="flex items-center">
          <motion.div 
            className="bg-gradient-to-r from-manox-fuchsia to-manox-blue p-2 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiZap className="w-8 h-8" />
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.h1 
                className="text-xl font-bold ml-3 bg-gradient-to-r from-manox-fuchsia to-manox-blue bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                MANOX Admin
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu Toggle */}
      <div className="p-3 flex justify-end">
        <motion.button 
          onClick={toggleExpanded}
          className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? (
            <FiChevronLeft className="w-5 h-5" />
          ) : (
            <FiChevronRight className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`admin-sidebar-link transition-all duration-300 rounded-xl ${
                  isActive(item.path)
                    ? 'admin-sidebar-link-active bg-gradient-to-r from-manox-fuchsia/20 to-manox-blue/20 border-l-4 border-manox-fuchsia shadow-lg'
                    : 'admin-sidebar-link-inactive hover:bg-gray-700/30'
                }`}
              >
                <motion.span 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.span>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span 
                      className="ml-4 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t" style={{borderColor: 'var(--border-color)'}}>
        <div className="flex items-center">
          <motion.div 
            className="bg-gradient-to-r from-manox-fuchsia to-manox-blue p-0.5 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gray-800 p-1 rounded-full">
              <FiUser className="w-6 h-6" />
            </div>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                className="ml-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;