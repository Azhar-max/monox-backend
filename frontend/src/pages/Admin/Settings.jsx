import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Button from './components/Button';
import { useTheme } from '../../hooks/useTheme';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const { theme, updateTheme } = useTheme();
  
  const tabs = [
    { id: 'general', name: 'General' },
    { id: 'theme', name: 'Theme' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'security', name: 'Security' }
  ];
  
  const [formData, setFormData] = useState({
    siteName: 'MANOX Admin',
    siteDescription: 'Premium gift box service',
    email: 'admin@manox.com',
    timezone: 'Europe/Rome',
    theme: theme,
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Memoized input change handler for better performance
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('notifications.')) {
      const notificationType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  }, []);
  
  // Memoized form submission handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Show success feedback
    alert('Settings saved successfully!');
  }, [formData]);
  
  // Memoized theme change handler
  const handleThemeChange = useCallback((theme) => {
    setFormData(prev => ({ ...prev, theme }));
  }, []);
  
  // Sync theme with formData when it changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, theme }));
  }, [theme]);
  
  // Memoized notification save handler
  const handleSaveNotifications = useCallback(() => {
    console.log('Notifications saved:', formData.notifications);
    alert('Notification preferences saved successfully!');
  }, [formData.notifications]);
  
  // Memoized theme save handler
  const handleSaveTheme = useCallback(() => {
    console.log('Theme saved:', formData.theme);
    // Update theme using the shared hook
    updateTheme(formData.theme);
    alert('Theme saved successfully!');
  }, [formData.theme, updateTheme]);
  
  // Memoized password update handler
  const handleUpdatePassword = useCallback((e) => {
    e.preventDefault();
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // In a real app, this would make an API call
    console.log('Password update requested');
    alert('Password updated successfully!');
    
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  }, [formData]);
  
  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-manox-fuchsia to-manox-blue bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Settings
        </motion.h1>
        <motion.p 
          className="text-gray-400 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Manage your application settings
        </motion.p>
      </div>
      
      {/* Tabs */}
      <motion.div
        className="border-b border-gray-700/50 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <nav className="flex overflow-x-auto pb-2 -mb-px">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-4 md:py-4 md:px-1 border-b-2 font-medium text-sm md:text-base transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'border-manox-fuchsia text-manox-fuchsia'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              whileHover={{ y: -2 }}
            >
              {tab.name}
            </motion.button>
          ))}
        </nav>
      </motion.div>
      
      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="admin-card" title="General Settings" subtitle="Configure your site information">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                  >
                    <option className="bg-gray-800" value="Europe/Rome">Europe/Rome</option>
                    <option className="bg-gray-800" value="America/New_York">America/New_York</option>
                    <option className="bg-gray-800" value="Asia/Tokyo">Asia/Tokyo</option>
                    <option className="bg-gray-800" value="Europe/London">Europe/London</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Site Description
                  </label>
                  <textarea
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="admin-btn admin-btn-primary transition-all duration-300"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
      
      {/* Theme Settings */}
      {activeTab === 'theme' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="admin-card" title="Theme Settings" subtitle="Customize the appearance of your admin panel">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium form-label mb-3">
                  Color Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      formData.theme === 'light' ? 'border-manox-fuchsia ring-2 ring-manox-fuchsia ring-opacity-50' : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => handleThemeChange('light')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-full mb-1"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                    </div>
                    <p className="text-center font-medium text-gray-800">Light</p>
                  </motion.div>
                  
                  <motion.div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      formData.theme === 'dark' ? 'border-manox-fuchsia ring-2 ring-manox-fuchsia ring-opacity-50' : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => handleThemeChange('dark')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3">
                      <div className="h-3 bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-full mb-1"></div>
                      <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                    </div>
                    <p className="text-center font-medium text-gray-200">Dark</p>
                  </motion.div>
                  
                  <motion.div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      formData.theme === 'auto' ? 'border-manox-fuchsia ring-2 ring-manox-fuchsia ring-opacity-50' : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => handleThemeChange('auto')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-gradient-to-b from-white to-gray-100 border border-gray-200 rounded-lg p-4 mb-3">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-full mb-1"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                    </div>
                    <p className="text-center font-medium text-gray-800">System</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="primary"
                  className="admin-btn admin-btn-primary transition-all duration-300"
                  onClick={handleSaveTheme}
                >
                  Save Theme
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="admin-card" title="Notification Settings" subtitle="Configure how you receive alerts">
            <div className="space-y-6">
              <motion.div 
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg transition-all duration-300 hover:bg-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div>
                  <h3 className="text-sm font-medium" style={{color: 'var(--text-primary)'}}>Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications.email"
                    checked={formData.notifications.email}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-manox-fuchsia/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-manox-fuchsia"></div>
                </label>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg transition-all duration-300 hover:bg-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div>
                  <h3 className="text-sm font-medium" style={{color: 'var(--text-primary)'}}>Push Notifications</h3>
                  <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications.push"
                    checked={formData.notifications.push}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-manox-fuchsia/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-manox-fuchsia"></div>
                </label>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg transition-all duration-300 hover:bg-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div>
                  <h3 className="text-sm font-medium" style={{color: 'var(--text-primary)'}}>SMS Notifications</h3>
                  <p className="text-sm text-gray-400">Receive text messages for important alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications.sms"
                    checked={formData.notifications.sms}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-manox-fuchsia/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-manox-fuchsia"></div>
                </label>
              </motion.div>
              
              <div className="flex justify-end">
                <Button 
                  variant="primary"
                  className="admin-btn admin-btn-primary transition-all duration-300"
                  onClick={handleSaveNotifications}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      {/* Security Settings */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="admin-card" title="Security Settings" subtitle="Manage your account security">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4" style={{color: 'var(--text-primary)'}}>Two-Factor Authentication</h3>
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg transition-all duration-300 hover:bg-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div>
                    <p className="font-medium" style={{color: 'var(--text-primary)'}}>Enable 2FA</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-manox-fuchsia/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-manox-fuchsia"></div>
                  </label>
                </motion.div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4" style={{color: 'var(--text-primary)'}}>Password</h3>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium form-label mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium form-label mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium form-label mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent transition-all duration-300 form-input"
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      variant="primary" 
                      className="admin-btn admin-btn-primary transition-all duration-300"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}