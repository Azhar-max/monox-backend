import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchOrder(token, id);
  }, [id, navigate]);
  
  const fetchOrder = async (token, orderId) => {
    try {
      const response = await axios.get(`${api}/admin/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setOrder(response.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load order');
      }
    } finally {
      setLoading(false);
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
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 bg-manox-fuchsia text-white rounded hover:bg-manox-blue"
        >
          Back to Orders
        </button>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">Order not found</p>
        <button 
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 bg-manox-fuchsia text-white rounded hover:bg-manox-blue"
        >
          Back to Orders
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-manox-fuchsia">Order Details</h1>
        <button
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to Orders
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Order ID:</span> #{order._id.substring(0, 8)}</p>
              <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
              <p><span className="font-medium">Total:</span> €{order.total?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {order.customer?.name || 'N/A'}</p>
              <p><span className="font-medium">Email:</span> {order.customer?.email || 'N/A'}</p>
              <p><span className="font-medium">Phone:</span> {order.customer?.phone || 'N/A'}</p>
              <p><span className="font-medium">Address:</span> {order.customer?.address || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Items</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{item.price?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                  Total
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  €{order.total?.toFixed(2) || '0.00'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}