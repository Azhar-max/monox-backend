import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function reducer(state, action){
  switch(action.type){
    case 'hydrate': return action.payload;
    case 'add': {
      const existing = state.items.find(i=>i.productId===action.item.productId);
      let items;
      if (existing) items = state.items.map(i=> i.productId===action.item.productId ? { ...i, qty: i.qty + action.item.qty } : i);
      else items = [...state.items, action.item];
      return { ...state, items };
    }
    case 'remove': return { ...state, items: state.items.filter(i=> i.productId !== action.productId) };
    case 'clear': return { ...state, items: [] };
    case 'updateQty': return { ...state, items: state.items.map(i=> i.productId===action.productId ? { ...i, qty: action.qty } : i) };
    default: return state;
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('manox_cart');
      if (raw) dispatch({ type: 'hydrate', payload: JSON.parse(raw) });
    }catch(e){}
  },[])

  useEffect(()=>{
    localStorage.setItem('manox_cart', JSON.stringify(state));
  },[state])

  const addItem = (item) => dispatch({ type: 'add', item });
  const removeItem = (productId) => dispatch({ type: 'remove', productId });
  const clear = () => dispatch({ type: 'clear' });
  const updateQty = (productId, qty) => dispatch({ type: 'updateQty', productId, qty });

  return <CartContext.Provider value={{ state, addItem, removeItem, clear, updateQty }}>{children}</CartContext.Provider>
}

export function useCart(){
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

// Export the context itself for direct imports
export { CartContext }

export default CartContext