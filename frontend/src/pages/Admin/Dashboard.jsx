import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import StatCard from './components/StatCard';
import Card from './components/Card';
import Button from './components/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Chart data
  const [chartData, setChartData] = useState({
    sales: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales (€)',
          data: [1200, 1900, 1500, 2200, 1800, 2500, 2100, 2800, 2400, 3100, 2700, 3400],
          borderColor: '#EC4899',
          backgroundColor: 'rgba(236, 72, 153, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    orders: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Orders',
          data: [42, 56, 48, 65, 52, 71, 63, 82, 68, 91, 79, 95],
          backgroundColor: '#8B5CF6',
          borderColor: '#8B5CF6',
          borderWidth: 1
        }
      ]
    },
    categories: {
      labels: ['Jewelry', 'Hair Accessories', 'Beauty', 'Clothing'],
      datasets: [
        {
          data: [35, 25, 20, 20],
          backgroundColor: [
            '#EC4899',
            '#8B5CF6',
            '#3B82F6',
            '#10B981'
          ],
          borderColor: [
            '#EC4899',
            '#8B5CF6',
            '#3B82F6',
            '#10B981'
          ],
          borderWidth: 1
        }
      ]
    }
  });
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchDashboardData(token);
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData(token);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [navigate]);
  
  const fetchDashboardData = async (token) => {
    try {
      setLoading(false); // Keep UI responsive during updates
      const response = await axios.get(`${api}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setStats(response.data.stats);
      setRecentOrders(response.data.recentOrders);
      setLastUpdated(new Date());
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        // Only show error if it's the first load
        if (loading) {
          setError('Failed to load dashboard data');
        } else {
          console.warn('Failed to update dashboard data:', err);
        }
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-manox-fuchsia to-manox-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome back! Here's what's happening today.
          </motion.p>
          <motion.p 
            className="text-sm text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Last updated: {lastUpdated.toLocaleTimeString()}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button 
            variant="primary" 
            className="admin-btn admin-btn-primary"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            onClick={() => fetchDashboardData(localStorage.getItem('adminToken'))}
          >
            Refresh Data
          </Button>
        </motion.div>
      </div>
      
      {/* Stats Cards - Responsive grid with enhanced animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <StatCard 
            title="Total Products" 
            value={stats?.products || 0} 
            color="pink"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            trend={12.5}
            trendLabel="from last month"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <StatCard 
            title="Total Orders" 
            value={stats?.orders || 0} 
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
            trend={8.2}
            trendLabel="from last month"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <StatCard 
            title="Total Users" 
            value={stats?.users || 0} 
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
            trend={-3.1}
            trendLabel="from last month"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <StatCard 
            title="Revenue" 
            value={`€${(stats?.revenue || 0).toFixed(2)}`} 
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={15.7}
            trendLabel="from last month"
          />
        </motion.div>
      </div>
      
      {/* Charts and Recent Activity - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Sales Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="admin-card" title="Sales Overview" subtitle="Monthly sales performance" glassEffect>
            <div className="h-64 md:h-80">
              <Line 
                data={chartData.sales} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: '#E5E7EB'
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: '#E5E7EB'
                      }
                    },
                    y: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: '#E5E7EB'
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>
        </motion.div>
        
        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="admin-card" title="Orders by Month" subtitle="Monthly order volume" glassEffect>
            <div className="h-64 md:h-80">
              <Bar 
                data={chartData.orders} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: '#E5E7EB'
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: '#E5E7EB'
                      }
                    },
                    y: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: '#E5E7EB'
                      }
                    }
                  }
                }} 
              />
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Category Distribution Chart and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card className="admin-card" title="Product Categories" subtitle="Distribution by category" glassEffect>
            <div className="h-64 md:h-80 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <Doughnut 
                  data={chartData.categories} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: '#E5E7EB',
                          padding: 15
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Recent Activity with enhanced styling */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="admin-card" title="Recent Orders" subtitle="Latest customer orders" glassEffect>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.slice(0, 5).map((order, index) => (
                  <motion.div 
                    key={order._id} 
                    className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <div>
                      <p className="font-medium text-gray-100">#{order._id.substring(0, 8)}</p>
                      <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-100">€{order.total?.toFixed(2) || '0.00'}</p>
                      <p className="text-sm text-gray-400">{order.items?.length || 0} items</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent orders</p>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 admin-btn"
                onClick={() => navigate('/admin/orders')}
              >
                View All Orders
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Quick Actions - Responsive grid with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card className="admin-card" title="Quick Actions" subtitle="Common administrative tasks">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            <Button 
              variant="secondary" 
              className="flex flex-col items-center justify-center h-20 md:h-24 admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/products/new')}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-xs md:text-sm font-medium">Add Product</span>
            </Button>
            
            <Button 
              variant="secondary" 
              className="flex flex-col items-center justify-center h-20 md:h-24 admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/products')}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs md:text-sm font-medium">Manage Products</span>
            </Button>
            
            <Button 
              variant="secondary" 
              className="flex flex-col items-center justify-center h-20 md:h-24 admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/orders')}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs md:text-sm font-medium">View Orders</span>
            </Button>
            
            <Button 
              variant="secondary" 
              className="flex flex-col items-center justify-center h-20 md:h-24 admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/users')}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-xs md:text-sm font-medium">Manage Users</span>
            </Button>
            
            <Button 
              variant="secondary" 
              className="flex flex-col items-center justify-center h-20 md:h-24 admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/notifications')}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-xs md:text-sm font-medium">Notifications</span>
            </Button>
            
            <Button 
              variant="secondary" 
              className="flex flex-col items-center justify-center h-20 md:h-24 admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/settings')}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs md:text-sm font-medium">Settings</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}