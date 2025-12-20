import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Button from './components/Button';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order #12345', message: 'A new order has been placed', time: '2 minutes ago', unread: true, type: 'order' },
    { id: 2, title: 'Product Updated', message: 'Product "Luxury Gift Box" has been updated', time: '1 hour ago', unread: true, type: 'product' },
    { id: 3, title: 'New User Registered', message: 'A new customer has registered', time: '3 hours ago', unread: false, type: 'user' },
    { id: 4, title: 'Payment Received', message: 'Payment for order #12340 has been processed', time: '5 hours ago', unread: false, type: 'payment' }
  ]);
  
  const [messages, setMessages] = useState([
    { id: 1, customer: 'John Smith', subject: 'Order Inquiry', message: 'I have a question about my recent order #12345', time: '10 minutes ago', unread: true },
    { id: 2, customer: 'Sarah Johnson', subject: 'Product Question', message: 'Can you provide more details about the premium gift box?', time: '1 hour ago', unread: true },
    { id: 3, customer: 'Michael Brown', subject: 'Shipping Delay', message: 'My order seems to be delayed. Can you provide an update?', time: '3 hours ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;
  const unreadMessages = messages.filter(m => m.unread).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const markMessageAsRead = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, unread: false } : message
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, unread: false })));
  };

  const markAllMessagesAsRead = () => {
    setMessages(messages.map(message => ({ ...message, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  const deleteAllMessages = () => {
    setMessages([]);
  };

  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <motion.div 
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-manox-fuchsia to-manox-blue bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Notifications & Messages
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Manage all your system notifications and customer messages
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              variant="primary"
              className="admin-btn admin-btn-primary"
              onClick={activeTab === 'notifications' ? markAllAsRead : markAllMessagesAsRead}
              disabled={activeTab === 'notifications' ? unreadCount === 0 : unreadMessages === 0}
            >
              Mark all as read
            </Button>
            <Button
              variant="danger"
              className="admin-btn admin-btn-danger"
              onClick={activeTab === 'notifications' ? deleteAll : deleteAllMessages}
              disabled={activeTab === 'notifications' ? notifications.length === 0 : messages.length === 0}
            >
              Delete all
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Tabs */}
      <motion.div
        className="border-b border-gray-700/50 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <nav className="flex space-x-8">
          <motion.button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-manox-fuchsia text-manox-fuchsia'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
            }`}
            whileHover={{ y: -2 }}
          >
            Notifications
            {unreadCount > 0 && (
              <motion.span 
                className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-manox-fuchsia rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-manox-fuchsia text-manox-fuchsia'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
            }`}
            whileHover={{ y: -2 }}
          >
            Customer Messages
            {unreadMessages > 0 && (
              <motion.span 
                className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-manox-fuchsia rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {unreadMessages}
              </motion.span>
            )}
          </motion.button>
        </nav>
      </motion.div>
      
      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="admin-card" title="System Notifications" subtitle="All system-generated alerts and updates">
            {notifications.length > 0 ? (
              <ul className="divide-y divide-gray-700/50">
                {notifications.map((notification, index) => (
                  <motion.li 
                    key={notification.id} 
                    className={`p-5 transition-colors ${
                      notification.unread ? 'bg-gray-800/50' : 'hover:bg-gray-700/30'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className={`text-sm font-medium ${notification.unread ? 'text-gray-100' : 'text-gray-300'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{notification.message}</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {notification.unread && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="admin-btn admin-btn-secondary"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            size="sm"
                            className="admin-btn admin-btn-danger"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            Delete
                          </Button>
                          {notification.type === 'order' && (
                            <Button
                              variant="primary"
                              size="sm"
                              className="admin-btn admin-btn-primary"
                              onClick={() => window.location.href = '/admin/orders'}
                            >
                              View Order
                            </Button>
                          )}
                        </div>
                      </div>
                      {notification.unread && (
                        <motion.div 
                          className="ml-4 flex-shrink-0 self-start"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span className="h-2 w-2 bg-manox-fuchsia rounded-full"></span>
                        </motion.div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </motion.div>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
              </div>
            )}
          </Card>
        </motion.div>
      )}
      
      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="admin-card" title="Customer Messages" subtitle="Messages from customers and support inquiries">
            {messages.length > 0 ? (
              <ul className="divide-y divide-gray-700/50">
                {messages.map((message, index) => (
                  <motion.li 
                    key={message.id} 
                    className={`p-5 transition-colors ${
                      message.unread ? 'bg-gray-800/50' : 'hover:bg-gray-700/30'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className={`text-sm font-medium ${message.unread ? 'text-gray-100' : 'text-gray-300'}`}>
                            {message.customer}
                          </h3>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-200">{message.subject}</p>
                        <p className="mt-1 text-sm text-gray-400">{message.message}</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {message.unread && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="admin-btn admin-btn-secondary"
                              onClick={() => markMessageAsRead(message.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                          <Button
                            variant="primary"
                            size="sm"
                            className="admin-btn admin-btn-primary"
                            onClick={() => alert(`Replying to ${message.customer}`)}
                          >
                            Reply
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="admin-btn admin-btn-danger"
                            onClick={() => deleteMessage(message.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      {message.unread && (
                        <motion.div 
                          className="ml-4 flex-shrink-0 self-start"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span className="h-2 w-2 bg-manox-fuchsia rounded-full"></span>
                        </motion.div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </motion.div>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No messages</h3>
                <p className="mt-1 text-sm text-gray-500">No customer messages at this time.</p>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Notifications;