import React, { createContext, useContext, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';

const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.toast];
    case 'REMOVE_TOAST':
      return state.filter(toast => toast.id !== action.id);
    case 'REMOVE_ALL_TOASTS':
      return [];
    default:
      return state;
  }
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = (toast) => {
    const id = toastId++;
    const newToast = { ...toast, id };
    dispatch({ type: 'ADD_TOAST', toast: newToast });
    
    // Auto dismiss after duration
    if (toast.duration !== false) {
      const duration = toast.duration || 5000;
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', id });
      }, duration);
    }
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  };

  const removeAllToasts = () => {
    dispatch({ type: 'REMOVE_ALL_TOASTS' });
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <AnimatePresence>
            {toasts.map(toast => (
              <Toast
                key={toast.id}
                id={toast.id}
                title={toast.title}
                description={toast.description}
                type={toast.type}
                onDismiss={removeToast}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};