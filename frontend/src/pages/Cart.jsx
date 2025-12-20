import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Cart() {
  const { state, removeItem, updateQty, clear } = useCart();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const api = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = state.items.reduce((s,i)=> s + (i.price * i.qty), 0);
  const shipping = total > 0 ? 5.99 : 0;
  const grandTotal = total + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function checkout(){
    if (!customerInfo.name || !customerInfo.email) {
      alert(t('fullName') + ' ' + t('emailAddress'));
      return;
    }
    
    setLoading(true);
    try{
      const payload = { 
        customer: customerInfo, 
        items: state.items, 
        total: grandTotal,
        shipping
      };
      await axios.post(`${api}/orders`, payload);
      setOrderPlaced(true);
      clear();
    }catch(e){
      alert(language === 'it' ? 'Ordine fallito. Riprova.' : 'Order failed. Please try again.');
      console.error(e);
    }finally{ 
      setLoading(false); 
    }
  }

  if (orderPlaced) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4 text-manox-fuchsia">{t('orderPlaced')}</h2>
        <p className="text-gray-700 mb-6">
          {language === 'it' 
            ? `Grazie per il tuo ordine, ${customerInfo.name}. Un'email di conferma è stata inviata a ${customerInfo.email}.` 
            : `Thank you for your order, ${customerInfo.name}. A confirmation email has been sent to ${customerInfo.email}.`}
        </p>
        <button 
          onClick={() => {
            setOrderPlaced(false);
            setCustomerInfo({ name: '', email: '', phone: '', address: '' });
          }}
          className="px-6 py-3 bg-manox-fuchsia text-white font-semibold rounded-lg hover:bg-manox-blue transition duration-300"
        >
          {t('continueShopping')}
        </button>
      </div>
    );
  }

  if (!state.items.length) return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-manox-fuchsia">{t('yourCart')}</h2>
      <p className="text-gray-500 mb-6">{t('cartEmpty')}</p>
      <button 
        onClick={() => navigate('/shop')}
        className="px-6 py-3 bg-manox-fuchsia text-white font-semibold rounded-lg hover:bg-manox-blue transition duration-300"
      >
        {t('browseProducts')}
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-manox-fuchsia">{t('yourCart')}</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {state.items.map(item => (
                <div key={item.productId} className="flex items-center border-b border-gray-200 pb-4">
                  <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4">
                    {/* Display product image if available */}
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
                    ) : (
                      <span className="text-gray-400 text-sm">{t('imageUnavailable')}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-manox-fuchsia font-bold">€{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.qty}</span>
                      <button 
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="font-semibold w-20 text-right">
                      €{(item.price * item.qty).toFixed(2)}
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button 
                onClick={clear}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
              >
                {language === 'it' ? 'Svuota Carrello' : 'Clear Cart'}
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">{t('orderSummary')}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping')}</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-300">
                  <span>{t('total')}</span>
                  <span className="text-manox-fuchsia">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{t('customerInformation')}</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder={t('fullName')}
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t('emailAddress')}
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('phoneNumber')}
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                  />
                  <textarea
                    name="address"
                    placeholder={t('deliveryAddress')}
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                  ></textarea>
                </div>
              </div>
              
              <button 
                onClick={checkout}
                disabled={loading}
                className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-manox-fuchsia hover:bg-manox-blue'
                }`}
              >
                {loading ? t('processing') : t('proceedToCheckout')}
              </button>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>{language === 'it' 
                  ? 'Effettuando l\'ordine, accetti i termini e le condizioni di MANOX.' 
                  : 'By placing your order, you agree to MANOX\'s terms and conditions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}