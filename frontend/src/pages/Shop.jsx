import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { LanguageContext } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { ProductSkeleton } from '../components/Skeleton';
import ImageWithFallback from '../components/ImageWithFallback';

const CATEGORIES = [
  { 
    id: 'keychains', 
    name: 'Keychains', 
    name_it: 'Portachiavi',
    subcategories: [
      { id: 'bottle_keychains', name: 'Bottle Keychains', name_it: 'Portachiavi Bottiglia' }
    ]
  },
  { 
    id: 'abayas', 
    name: 'Abayas', 
    name_it: 'Abaya',
    subcategories: [
      { id: 'traditional_abayas', name: 'Traditional Abayas', name_it: 'Abaya Tradizionali' }
    ]
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    name_it: 'Accessori',
    subcategories: [
      { id: 'baby_accessories', name: 'Baby Accessories', name_it: 'Accessori per Bambini' }
    ]
  },
  { 
    id: 'jewelry', 
    name: 'Jewelry', 
    name_it: 'Gioielli',
    subcategories: [
      { id: 'rings', name: 'Rings', name_it: 'Anelli' },
      { id: 'jhumkay', name: 'Jhumkay', name_it: 'Jhumkay' },
      { id: 'bangles', name: 'Bangles', name_it: 'Bracciali' },
      { id: 'bracelets', name: 'Bracelets', name_it: 'Bracciali' },
      { id: 'earrings', name: 'Earrings', name_it: 'Orecchini' },
      { id: 'necklaces', name: 'Necklaces', name_it: 'Collane' }
    ]
  },
  { 
    id: 'beauty_tools', 
    name: 'Beauty Tools', 
    name_it: 'Strumenti di Bellezza',
    subcategories: [
      { id: 'blenders', name: 'Blenders', name_it: 'Blender' },
      { id: 'nail_tools', name: 'Nail Tools', name_it: 'Strumenti per Unghie' }
    ]
  },
  { 
    id: 'hair_accessories', 
    name: 'Hair Accessories', 
    name_it: 'Accessori per Capelli',
    subcategories: [
      { id: 'hair_catchers', name: 'Hair Catchers', name_it: 'Raccoglitori per Capelli' },
      { id: 'ponyties', name: 'Pony Ties', name_it: 'Legacci per Cavalli' },
      { id: 'pearl_accessories', name: 'Pearl Accessories', name_it: 'Accessori di Perle' }
    ]
  },
  { 
    id: 'eye_care', 
    name: 'Eye Care', 
    name_it: 'Cura degli Occhi',
    subcategories: [
      { id: 'eye_masks', name: 'Eye Masks', name_it: 'Maschere per Occhi' },
      { id: 'lash_curlers', name: 'Lash Curlers', name_it: 'Curler per Ciglia' }
    ]
  },
  { 
    id: 'floral', 
    name: 'Floral', 
    name_it: 'Floreali',
    subcategories: [
      { id: 'gajray', name: 'Gajray', name_it: 'Gajray' }
    ]
  },
  { 
    id: 'misc', 
    name: 'Miscellaneous', 
    name_it: 'Varie',
    subcategories: []
  }
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const { showToast } = useToast();
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate a slight delay to show skeleton screens
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Request all products (no limit parameter needed since backend now returns all by default)
        const response = await axios.get(`${api}/products`);
        setProducts(response.data.items || response.data);
        setFilteredProducts(response.data.items || response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
        showToast(language === 'en' ? 'Failed to load products. Please try again later.' : 'Impossibile caricare i prodotti. Riprova più tardi.', 'error');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (selectedSubcategory !== 'all') {
      // Filter by subcategory if specified
      result = result.filter(product => {
        // Map product titles to subcategories
        const title = (product.title_en || product.title || '').toLowerCase();
        
        switch (selectedSubcategory) {
          case 'bottle_keychains':
            return title.includes('bottle') && product.category === 'keychains';
          case 'traditional_abayas':
            return product.category === 'abayas';
          case 'baby_accessories':
            return title.includes('baby') && product.category === 'accessories';
          case 'rings':
            return title.includes('ring') && product.category === 'jewelry';
          case 'jhumkay':
            return title.includes('jhumkay') && product.category === 'jewelry';
          case 'bangles':
            return title.includes('bangles') && product.category === 'jewelry';
          case 'bracelets':
            return title.includes('bracelet') && product.category === 'jewelry';
          case 'earrings':
            return title.includes('earring') && product.category === 'jewelry';
          case 'necklaces':
            return title.includes('necklace') && product.category === 'jewelry';
          case 'blenders':
            return title.includes('blender') && product.category === 'beauty_tools';
          case 'nail_tools':
            return title.includes('nail') && product.category === 'beauty_tools';
          case 'hair_catchers':
            return title.includes('catcher') && product.category === 'hair_accessories';
          case 'ponyties':
            return title.includes('pony') && product.category === 'hair_accessories';
          case 'pearl_accessories':
            return title.includes('pearl') && product.category === 'hair_accessories';
          case 'eye_masks':
            return title.includes('mask') && product.category === 'eye_care';
          case 'lash_curlers':
            return title.includes('curler') && product.category === 'eye_care';
          case 'gajray':
            return title.includes('gajray') && product.category === 'floral';
          default:
            return true;
        }
      });
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        (product.title_en && product.title_en.toLowerCase().includes(term)) || 
        (product.title_it && product.title_it.toLowerCase().includes(term)) ||
        (product.description_en && product.description_en.toLowerCase().includes(term)) ||
        (product.description_it && product.description_it.toLowerCase().includes(term))
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedSubcategory, searchTerm, products]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    showToast(
      language === 'en' ? 
        `"${product.title_en}" added to cart!` : 
        `"${product.title_it || product.title_en}" aggiunto al carrello!`, 
      'success'
    );
  };

  // Get subcategories for the selected category
  const getSubcategories = () => {
    if (selectedCategory === 'all') return [];
    const category = CATEGORIES.find(cat => cat.id === selectedCategory);
    return category ? category.subcategories : [];
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {language === 'it' ? 'I Nostri Prodotti' : 'Our Products'}
      </h1>
      
      {/* Filters Skeleton */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="responsive-form-grid">
          <div className="form-group">
            <div className="skeleton-text mb-2"></div>
            <div className="skeleton rounded-lg h-10"></div>
          </div>
          <div className="form-group">
            <div className="skeleton-text mb-2"></div>
            <div className="skeleton rounded-lg h-10"></div>
          </div>
        </div>
      </div>
      
      {/* Products Grid Skeleton */}
      <div className="responsive-product-grid">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="alert-error">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {language === 'it' ? 'I Nostri Prodotti' : 'Our Products'}
      </h1>
      
      {/* Filters */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="responsive-form-grid">
          {/* Category Filter */}
          <div className="form-group">
            <label className="form-label" htmlFor="category-filter">
              {language === 'it' ? 'Categoria' : 'Category'}
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('all'); // Reset subcategory when category changes
              }}
              className="form-input"
              aria-describedby="category-help"
            >
              <option value="all">
                {language === 'it' ? 'Tutte le Categorie' : 'All Categories'}
              </option>
              {CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {language === 'it' ? category.name_it : category.name}
                </option>
              ))}
            </select>
            <div id="category-help" className="sr-only">
              {language === 'it' ? 'Seleziona una categoria per filtrare i prodotti' : 'Select a category to filter products'}
            </div>
          </div>
          
          {/* Subcategory Filter - only show if a category is selected */}
          {selectedCategory !== 'all' && getSubcategories().length > 0 && (
            <div className="form-group">
              <label className="form-label" htmlFor="subcategory-filter">
                {language === 'it' ? 'Sottocategoria' : 'Subcategory'}
              </label>
              <select
                id="subcategory-filter"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="form-input"
                aria-describedby="subcategory-help"
              >
                <option value="all">
                  {language === 'it' ? 'Tutte le Sottocategorie' : 'All Subcategories'}
                </option>
                {getSubcategories().map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {language === 'it' ? subcategory.name_it : subcategory.name}
                  </option>
                ))}
              </select>
              <div id="subcategory-help" className="sr-only">
                {language === 'it' ? 'Seleziona una sottocategoria per filtrare ulteriormente' : 'Select a subcategory to further filter'}
              </div>
            </div>
          )}
          
          {/* Search */}
          <div className="form-group">
            <label className="form-label" htmlFor="search-input">
              {language === 'it' ? 'Cerca' : 'Search'}
            </label>
            <input
              id="search-input"
              type="text"
              placeholder={language === 'it' ? 'Cerca prodotti...' : 'Search products...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              {language === 'it' ? 'Digita per cercare prodotti' : 'Type to search for products'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {language === 'it' ? 
            `Mostrando ${filteredProducts.length} prodott${filteredProducts.length !== 1 ? 'i' : 'o'}` : 
            `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
        </p>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="alert-warning text-center">
          <p className="text-yellow-600">
            {language === 'it' ? 'Nessun prodotto trovato che corrisponda ai tuoi criteri.' : 'No products found matching your criteria.'}
          </p>
        </div>
      ) : (
        <div className="responsive-product-grid" role="region" aria-label={language === 'it' ? 'Lista dei prodotti' : 'Product list'}>
          {filteredProducts.map(product => (
            <div key={product._id} className="card-hover-effect flex flex-col h-full">
              <Link to={`/product/${product._id}`} className="block">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={language === 'it' && product.title_it ? product.title_it : product.title_en}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="p-4 flex-grow flex flex-col">
                <Link to={`/product/${product._id}`} className="block flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {language === 'it' && product.title_it ? product.title_it : product.title_en}
                  </h3>
                  
                  <div className="mt-2">
                    <span className="text-xl font-bold text-manox-fuchsia">€{product.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-2">
                    <span className="badge-primary">
                      {language === 'it' && product.category_it ? product.category_it : product.category}
                    </span>
                  </div>
                </Link>
                
                <div className="mt-4">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary-glow text-sm py-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-manox-fuchsia focus:ring-opacity-50"
                    aria-label={language === 'it' ? `Aggiungi ${product.title_it || product.title_en} al carrello` : `Add ${product.title_en} to cart`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    {language === 'it' ? 'Aggiungi al Carrello' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}