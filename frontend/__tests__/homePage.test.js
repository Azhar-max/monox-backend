import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home';
import { CartContext } from '../src/context/CartContext';
import { LanguageContext } from '../src/context/LanguageContext';

// Mock the axios module
jest.mock('axios', () => ({
  get: jest.fn()
}));

// Mock context providers
const mockCartContext = {
  state: { items: [] },
  dispatch: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn()
};

const mockLanguageContext = {
  language: 'en',
  toggleLanguage: jest.fn(),
  t: jest.fn()
};

// Mock child components
jest.mock('../src/components/AnimatedPageWrapper', () => {
  return ({ children }) => <div data-testid="animated-wrapper">{children}</div>;
});

jest.mock('../src/components/Hero', () => {
  return () => <div data-testid="hero-component">Hero Component</div>;
});

jest.mock('../src/components/FeatureGrid', () => {
  return () => <div data-testid="feature-grid-component">Feature Grid Component</div>;
});

jest.mock('../src/components/ProductCard', () => {
  return ({ product }) => <div data-testid="product-card">{product.title.en}</div>;
});

describe('Home Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    require('axios').get.mockResolvedValue({ data: { items: [] } });
    
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <LanguageContext.Provider value={mockLanguageContext}>
            <Home />
          </LanguageContext.Provider>
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Look for the loading spinner by its class name instead of role
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  test('displays featured products after loading', async () => {
    const mockProducts = {
      data: {
        items: [
          {
            _id: '1',
            title: { en: 'Test Product 1', it: 'Prodotto di Test 1' },
            images: ['/test-image-1.jpg'],
            price: 10.99
          },
          {
            _id: '2',
            title: { en: 'Test Product 2', it: 'Prodotto di Test 2' },
            images: ['/test-image-2.jpg'],
            price: 15.99
          }
        ]
      }
    };

    require('axios').get.mockResolvedValue(mockProducts);

    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <LanguageContext.Provider value={mockLanguageContext}>
            <Home />
          </LanguageContext.Provider>
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    // Check that loading spinner is no longer visible
    expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    require('axios').get.mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <LanguageContext.Provider value={mockLanguageContext}>
            <Home />
          </LanguageContext.Provider>
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Wait for error handling
    await waitFor(() => {
      // Loading spinner should disappear
      expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
    });
  });
});