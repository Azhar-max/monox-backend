import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Button from './components/Button';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchOrders(token, currentPage);
  }, [currentPage, navigate]);
  
  const fetchOrders = async (token, page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/admin/orders?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setOrders(response.data.orders);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load orders');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Function to update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`${api}/admin/orders/${orderId}/status`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status } : order
        )
      );
      
      // Show success feedback
      const statusLabels = {
        'Processing': 'accepted',
        'Cancelled': 'rejected'
      };
      
      alert(`Order ${statusLabels[status] || status.toLowerCase()} successfully!`);
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status');
    }
  };
  
  // Function to delete an order
  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      const response = await axios.delete(`${api}/admin/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Remove order from local state
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      alert('Order deleted successfully!');
    } catch (err) {
      console.error('Failed to delete order:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete order. Please try again.';
      alert(`Error: ${errorMessage}`);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-manox-fuchsia"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-800/50 rounded-lg p-6 text-center backdrop-blur-sm">
        <p className="text-red-200 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gradient-to-r from-manox-fuchsia to-manox-blue text-white rounded hover:shadow-lg transition-all"
        >
          Refresh
        </button>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-manox-fuchsia to-manox-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Orders
          </motion.h1>
          <motion.p 
            className="text-gray-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Manage customer orders
          </motion.p>
        </div>
        <motion.div
          className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button variant="secondary" className="admin-btn admin-btn-secondary">
            Export
          </Button>
          <Button variant="primary" className="admin-btn admin-btn-primary">
            Create Order
          </Button>
        </motion.div>
      </div>
      
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="admin-card" noPadding>
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Order Status</label>
                <select className="w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent text-gray-200">
                  <option className="bg-gray-800">All Statuses</option>
                  <option className="bg-gray-800">Pending</option>
                  <option className="bg-gray-800">Processing</option>
                  <option className="bg-gray-800">Shipped</option>
                  <option className="bg-gray-800">Delivered</option>
                  <option className="bg-gray-800">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent text-gray-200">
                  <option className="bg-gray-800">Last 7 Days</option>
                  <option className="bg-gray-800">Last 30 Days</option>
                  <option className="bg-gray-800">Last 90 Days</option>
                  <option className="bg-gray-800">This Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent text-gray-200 placeholder-gray-500"
                />
              </div>
              
              <div className="flex items-end">
                <Button variant="primary" className="w-full admin-btn admin-btn-primary">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="admin-card" title="Order List" subtitle="All customer orders">
          <div className="overflow-x-auto">
            <table className="admin-table min-w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Items</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-gray-700/50">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      className="hover:bg-gray-700/30"
                    >
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-200 font-mono">
                        #{order._id.substring(0, 8)}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-200">{order.customer?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-400">{order.customer?.email || ''}</div>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-200">
                        {order.items?.length || 0} items
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-200 font-medium">
                        €{order.total?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/50' :
                          order.status === 'Processing' ? 'bg-blue-900/50 text-blue-300 border border-blue-800/50' :
                          order.status === 'Shipped' ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-800/50' :
                          order.status === 'Delivered' ? 'bg-green-900/50 text-green-300 border border-green-800/50' :
                          order.status === 'Cancelled' ? 'bg-red-900/50 text-red-300 border border-red-800/50' :
                          'bg-gray-700 text-gray-300 border border-gray-600'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-200">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2">
                          {order.status === 'Pending' && (
                            <>
                              <Button 
                                variant="success" 
                                size="sm"
                                className="admin-btn admin-btn-success"
                                onClick={() => updateOrderStatus(order._id, 'Processing')}
                              >
                                Accept
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                className="admin-btn admin-btn-danger"
                                onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="admin-btn admin-btn-secondary"
                            onClick={() => navigate(`/admin/orders/${order._id}`)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            className="admin-btn admin-btn-danger"
                            onClick={() => deleteOrder(order._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 md:px-6 md:py-4 text-center text-sm text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="secondary"
            className="admin-btn admin-btn-secondary w-full sm:w-auto"
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="secondary"
            className="admin-btn admin-btn-secondary w-full sm:w-auto"
          >
            Next
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}