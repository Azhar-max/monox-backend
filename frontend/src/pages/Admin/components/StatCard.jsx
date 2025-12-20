import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
    green: 'bg-green-900/50 text-green-300 border border-green-800/50',
    purple: 'bg-purple-900/50 text-purple-300 border border-purple-800/50',
    pink: 'bg-pink-900/50 text-pink-300 border border-pink-800/50',
    yellow: 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/50',
    red: 'bg-red-900/50 text-red-300 border border-red-800/50'
  };

  const bgColorClasses = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    pink: 'from-pink-600 to-pink-700',
    yellow: 'from-yellow-600 to-yellow-700',
    red: 'from-red-600 to-red-700'
  };

  return (
    <Card className="h-full" hoverEffect={true} glassEffect={true}>
      <div className="flex justify-between items-start">
        <div>
          <p className="dashboard-stat-title">{title}</p>
          <h3 className="dashboard-stat-value">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trend > 0 ? 'bg-green-900/50 text-green-300 border border-green-800/50' : 'bg-red-900/50 text-red-300 border border-red-800/50'
              }`}>
                {trend > 0 ? (
                  <svg className="-ml-0.5 mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="-ml-0.5 mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {Math.abs(trend)}%
              </span>
              <span className="ml-2 text-xs text-gray-400">{trendLabel}</span>
            </div>
          )}
        </div>
        <motion.div 
          className={`p-3 rounded-xl bg-gradient-to-r ${bgColorClasses[color]}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="text-white">
            {icon}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default StatCard;