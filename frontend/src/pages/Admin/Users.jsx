import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Button from './components/Button';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchUsers(token, currentPage);
  }, [currentPage, navigate]);
  
  const fetchUsers = async (token, page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/admin/users?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${api}/admin/users/${userId}`, 
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update user in state
      setUsers(prev => prev.map(user => 
        user._id === userId ? response.data : user
      ));
    } catch (err) {
      alert('Failed to update user role');
    }
  };
  
  // Add delete user function
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${api}/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Remove user from state
      setUsers(prev => prev.filter(user => user._id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Delete user error:', err);
      alert('Failed to delete user: ' + (err.response?.data?.message || err.message || 'Unknown error'));
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
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-manox-fuchsia text-white rounded hover:bg-manox-blue"
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="admin-btn admin-btn-secondary">
            Export
          </Button>
          <Button variant="primary" className="admin-btn admin-btn-primary">
            Add User
          </Button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <Card className="admin-card" noPadding>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:border-transparent">
                <option>All Roles</option>
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button variant="primary" className="w-full admin-btn admin-btn-primary">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Users Table */}
      <Card className="admin-card" title="User List" subtitle="All registered users">
        <div className="overflow-x-auto">
          <table className="admin-table min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map(user => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="mr-1 md:mr-2 admin-btn"
                        onClick={() => alert('Edit functionality would be implemented here')}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        className="admin-btn admin-btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-3 md:px-6 md:py-4 text-center text-sm text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="secondary"
            className="admin-btn admin-btn-secondary w-full sm:w-auto"
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-700">
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
        </div>
      )}
    </motion.div>
  );
}