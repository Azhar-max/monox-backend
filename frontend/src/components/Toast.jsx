import React from 'react';

const Toast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 
                 type === 'error' ? 'bg-red-500' : 
                 type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center`}>
        <span className="mr-4">{message}</span>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;