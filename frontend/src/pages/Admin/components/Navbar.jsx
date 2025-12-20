import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiSearch, FiMenu, FiUser, FiSettings, FiHelpCircle, FiLogOut, FiCheck, FiTrash2 } from 'react-icons/fi';

const Navbar = ({ onMenuToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const notificationsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const notifications = [
    { id: 1, title: 'New Order #12345', message: 'A new order has been placed', time: '2 minutes ago', unread: true },
    { id: 2, title: 'Product Updated', message: 'Product "Luxury Gift Box" has been updated', time: '1 hour ago', unread: true },
    { id: 3, title: 'New User Registered', message: 'A new customer has registered', time: '3 hours ago', unread: false },
    { id: 4, title: 'Payment Received', message: 'Payment for order #12340 has been processed', time: '5 hours ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read and close dropdown
    setIsNotificationsOpen(false);
    // Navigate to relevant page based on notification type
    if (notification.title.includes('Order')) {
      navigate('/admin/orders');
    } else if (notification.title.includes('Product')) {
      navigate('/admin/products');
    } else if (notification.title.includes('User')) {
      navigate('/admin/users');
    }
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    console.log('Marking all notifications as read');
    // In a real app, this would make an API call
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    console.log('Deleting all notifications');
    // In a real app, this would make an API call
  };

  // Handle profile menu clicks
  const handleProfileMenuClick = (action) => {
    setIsProfileOpen(false);
    switch (action) {
      case 'profile':
        // Navigate to profile page
        break;
      case 'settings':
        navigate('/admin/settings');
        break;
      case 'help':
        // Open help center
        break;
      case 'signout':
        // Clear token and redirect to login
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        break;
      default:
        break;
    }
  };

  return (
    <motion.nav 
      className="bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-primary)] backdrop-blur-lg border-b h-16 flex items-center justify-between px-4 md:px-6 shadow-lg" style={{backgroundColor: 'var(--bg-secondary)', opacity: 0.8, borderColor: 'var(--border-color)', borderWidth: '0 0 1px 0'}}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Left Section */}
      <div className="flex items-center">
        <motion.button 
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-gray-700/50 mr-3 md:mr-6 transition-colors focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
          aria-label="Toggle sidebar"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
        >
          <FiMenu className="w-6 h-6 text-gray-300" />
        </motion.button>
        
        {/* Search Bar - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block relative">
          <motion.input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all text-gray-200 placeholder-gray-500"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <FiSearch className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Search - Visible only on mobile */}
        <motion.button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
        >
          <FiSearch className="w-5 h-5 text-gray-300" />
        </motion.button>

        {/* Notifications */}
        <div className="relative" ref={notificationsDropdownRef}>
          <motion.button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-gray-700/50 relative transition-colors focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
          >
            <FiBell className="w-6 h-6 text-gray-300" />
            {unreadCount > 0 && (
              <motion.span 
                className="absolute top-0 right-0 bg-gradient-to-r from-manox-fuchsia to-manox-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                aria-label={`${unreadCount} unread notifications`}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-80 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-xl shadow-2xl border z-50 md:w-96 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:right-auto sm:w-96 notification-dropdown backdrop-blur-lg" style={{borderColor: 'var(--border-color)', opacity: 0.5}}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-100">Notifications</h3>
                  <div className="flex space-x-2">
                    <motion.button 
                      key="mark-all"
                      onClick={markAllNotificationsAsRead}
                      className="text-xs bg-gray-700/50 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded transition-colors flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Mark all notifications as read"
                      type="button"
                    >
                      <FiCheck className="w-3 h-3 mr-1" /> Mark all
                    </motion.button>
                    <motion.button 
                      key="clear-all"
                      onClick={deleteAllNotifications}
                      className="text-xs bg-red-900/50 hover:bg-red-900 text-red-300 px-2 py-1 rounded transition-colors flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Clear all notifications"
                      type="button"
                    >
                      <FiTrash2 className="w-3 h-3 mr-1" /> Clear
                    </motion.button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto md:max-h-96">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <motion.div 
                        key={`notification-${notification.id}`} 
                        className={`p-4 border-b border-gray-700/30 hover:bg-gray-700/30 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-gray-800/50' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleNotificationClick(notification);
                          }
                        }}
                      >
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-100 text-sm md:text-base">{notification.title}</p>
                          {notification.unread && (
                            <motion.span 
                              className="h-2 w-2 bg-manox-fuchsia rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            ></motion.span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1 md:text-sm">{notification.time}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-3 text-center border-t border-gray-700/50">
                  <motion.button 
                    key="view-all"
                    className="text-manox-fuchsia text-sm font-medium hover:text-manox-blue transition-colors"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/admin/notifications');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View all notifications"
                    type="button"
                  >
                    View All Notifications
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileDropdownRef}>
          <motion.button 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
            aria-label="User profile"
            aria-expanded={isProfileOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
          >
            <div className="bg-gradient-to-r from-manox-fuchsia to-manox-blue p-0.5 rounded-full">
              <div className="bg-gray-800 p-0.5 rounded-full">
                <div className="bg-gray-700 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                  <FiUser className="text-gray-400" />
                </div>
              </div>
            </div>
            <span className="hidden md:block font-medium text-gray-300">Admin</span>
            <svg className="hidden md:block w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-xl shadow-2xl border z-50 backdrop-blur-lg" style={{borderColor: 'var(--border-color)', opacity: 0.5}}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="p-4 border-b border-gray-700/50">
                  <p className="font-medium text-gray-100">Admin User</p>
                  <p className="text-sm text-gray-400">admin@manox.com</p>
                </div>
                <div className="py-1">
                  <motion.button 
                    key="profile"
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center"
                    onClick={() => handleProfileMenuClick('profile')}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <FiUser className="w-4 h-4 mr-2" /> Profile
                  </motion.button>
                  <motion.button 
                    key="settings"
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center"
                    onClick={() => handleProfileMenuClick('settings')}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <FiSettings className="w-4 h-4 mr-2" /> Settings
                  </motion.button>
                  <motion.button 
                    key="help"
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center"
                    onClick={() => handleProfileMenuClick('help')}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <FiHelpCircle className="w-4 h-4 mr-2" /> Help Center
                  </motion.button>
                </div>
                <div className="border-t border-gray-700/50">
                  <motion.button 
                    key="signout"
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors flex items-center"
                    onClick={() => handleProfileMenuClick('signout')}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <FiLogOut className="w-4 h-4 mr-2" /> Sign Out
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;