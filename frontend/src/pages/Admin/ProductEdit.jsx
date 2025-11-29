import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: { en: '', it: '' },
    description: { en: '', it: '' },
    price: '',
    category: '',
    images: [''],
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    if (id) {
      fetchProduct(token, id);
    } else {
      setLoading(false);
    }
  }, [id, navigate]);
  
  const fetchProduct = async (token, productId) => {
    try {
      const response = await axios.get(`${api}/admin/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setProduct({
        ...response.data,
        price: response.data.price?.toString() || '',
        stock: response.data.stock?.toString() || ''
      });
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load product');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleImageChange = (index, value) => {
    const newImages = [...product.images];
    newImages[index] = value;
    setProduct(prev => ({ ...prev, images: newImages }));
  };
  
  const addImageField = () => {
    setProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
  };
  
  const removeImageField = (index) => {
    if (product.images.length > 1) {
      const newImages = [...product.images];
      newImages.splice(index, 1);
      setProduct(prev => ({ ...prev, images: newImages }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      const productData = {
        ...product,
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0
      };
      
      if (id) {
        await axios.put(`${api}/admin/products/${id}`, productData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`${api}/admin/products`, productData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-manox-fuchsia"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-manox-fuchsia">
        {id ? 'Edit Product' : 'Add New Product'}
      </h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={product.title.en}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (€)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={product.isFeatured}
                onChange={handleChange}
                className="rounded border-gray-300 text-manox-fuchsia focus:ring-manox-fuchsia"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Product</span>
            </label>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Descriptions</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                English Title
              </label>
              <input
                type="text"
                name="title_en"
                value={product.title.en}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Italian Title
              </label>
              <input
                type="text"
                name="title_it"
                value={product.title.it}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                English Description
              </label>
              <textarea
                name="description_en"
                value={product.description.en}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Italian Description
              </label>
              <textarea
                name="description_it"
                value={product.description.it}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL {index + 1}
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-manox-fuchsia focus:border-manox-fuchsia"
                  />
                </div>
                {product.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addImageField}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Add Image
            </button>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-manox-fuchsia text-white rounded-md hover:bg-manox-blue"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}