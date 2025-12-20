import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { LanguageContext } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import { ProductDetailSkeleton } from '../components/Skeleton';
import ImageWithFallback from '../components/ImageWithFallback';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulate a slight delay to show skeleton screens
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await axios.get(`${api}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
        showToast(language === 'en' ? 'Failed to load product. Please try again later.' : 'Impossibile caricare il prodotto. Riprova più tardi.', 'error');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      showToast(
        language === 'en' ? 
          `"${product.title_en}" added to cart!` : 
          `"${product.title_it || product.title_en}" aggiunto al carrello!`, 
        'success'
      );
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="skeleton rounded-lg h-10 w-32"></div>
      </div>
      <ProductDetailSkeleton />
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="alert-error">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-8">
      <div className="alert-warning">
        <p className="text-yellow-600">
          {language === 'en' ? 'Product not found' : 'Prodotto non trovato'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-manox-fuchsia hover:text-manox-blue transition duration-300 focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
        aria-label={language === 'it' ? 'Torna ai prodotti' : 'Back to products'}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        {language === 'it' ? 'Torna ai prodotti' : 'Back to products'}
      </button>

      <div className="responsive-product-detail">
        {/* Product Images */}
        <div className="flex flex-col">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={language === 'it' && product.title_it ? product.title_it : product.title_en}
              className="product-detail-image"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="responsive-image-gallery">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-manox-fuchsia' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedImage(index);
                    }
                  }}
                  aria-label={language === 'it' ? 
                    `Visualizza immagine ${index + 1} di ${product.images.length}` : 
                    `View image ${index + 1} of ${product.images.length}`
                  }
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${language === 'it' && product.title_it ? product.title_it : product.title_en} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'it' && product.title_it ? product.title_it : product.title_en}
          </h1>
          
          <div className="mb-6">
            <span className="text-2xl font-bold text-manox-fuchsia">€{product.price.toFixed(2)}</span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'it' ? 'Descrizione' : 'Description'}
            </h3>
            <p className="text-gray-600">
              {language === 'it' && product.description_it ? product.description_it : product.description_en}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'it' ? 'Categoria' : 'Category'}
            </h3>
            <span className="badge-primary">
              {language === 'it' && product.category_it ? product.category_it : product.category}
            </span>
          </div>
          
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-2" htmlFor="quantity-input">
              {language === 'it' ? 'Quantità' : 'Quantity'}
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
                aria-label={language === 'it' ? 'Diminuisci quantità' : 'Decrease quantity'}
              >
                -
              </button>
              <input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-gray-100 px-4 py-2 w-16 text-center focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
                aria-label={language === 'it' ? 'Quantità' : 'Quantity'}
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
                aria-label={language === 'it' ? 'Aumenta quantità' : 'Increase quantity'}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 btn-primary-glow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
              aria-label={language === 'it' ? `Aggiungi ${product.title_it || product.title_en} al carrello` : `Add ${product.title_en} to cart`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {language === 'it' ? 'Aggiungi al Carrello' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="flex-1 btn-secondary flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
              aria-label={language === 'it' ? 'Visualizza carrello' : 'View cart'}
            >
              {language === 'it' ? 'Visualizza Carrello' : 'View Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}