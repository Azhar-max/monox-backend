import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

// Translation dictionary
const translations = {
  en: {
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    imageUnavailable: 'Image unavailable',
    category: 'Category',
    quantity: 'Quantity',
    availability: 'Availability',
    inStock: 'in stock',
    outOfStock: 'Out of stock',
    sku: 'SKU',
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    browseProducts: 'Browse Products',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    customerInformation: 'Customer Information',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    deliveryAddress: 'Delivery Address',
    proceedToCheckout: 'Proceed to Checkout',
    processing: 'Processing...',
    orderPlaced: 'Order Placed!',
    continueShopping: 'Continue Shopping',
    noProducts: 'No products found'
  },
  it: {
    addToCart: 'Aggiungi al Carrello',
    buyNow: 'Acquista Ora',
    imageUnavailable: 'Immagine non disponibile',
    category: 'Categoria',
    quantity: 'Quantità',
    availability: 'Disponibilità',
    inStock: 'disponibili',
    outOfStock: 'Esaurito',
    sku: 'Codice',
    yourCart: 'Il Tuo Carrello',
    cartEmpty: 'Il tuo carrello è vuoto',
    browseProducts: 'Sfoglia Prodotti',
    orderSummary: 'Riepilogo Ordine',
    subtotal: 'Subtotale',
    shipping: 'Spedizione',
    total: 'Totale',
    customerInformation: 'Informazioni Cliente',
    fullName: 'Nome Completo',
    emailAddress: 'Indirizzo Email',
    phoneNumber: 'Numero di Telefono',
    deliveryAddress: 'Indirizzo di Consegna',
    proceedToCheckout: 'Procedi al Pagamento',
    processing: 'Elaborazione...',
    orderPlaced: 'Ordine Effettuato!',
    continueShopping: 'Continua lo Shopping',
    noProducts: 'Nessun prodotto trovato'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('it') // Default to Italian

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('manox_language') || 'it'
      setLanguage(savedLanguage)
    } catch (e) {
      setLanguage('it')
    }
  }, [])

  const toggleLanguage = () => {
    try {
      const newLanguage = language === 'it' ? 'en' : 'it'
      setLanguage(newLanguage)
      localStorage.setItem('manox_language', newLanguage)
    } catch (e) {
      // If localStorage fails, just update state
      const newLanguage = language === 'it' ? 'en' : 'it'
      setLanguage(newLanguage)
    }
  }

  // Translation function
  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Export the context itself for direct imports
export { LanguageContext }

export default LanguageContext