import React, { createContext, useState, useContext } from 'react';
import { MENU_DATA } from '../data/menuData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      ...MENU_DATA[0],
      qty: 2,
      note: 'Sedikit es',
      selectedTopping: 'Ketan Hitam',
    },
    {
      ...MENU_DATA[1],
      qty: 1,
      note: 'Gula dipisah',
      selectedTopping: 'Nangka Segar',
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'INV-20261026-001',
      date: '26 Okt 2026, 14:30 WITA',
      items: [
        { name: 'Cendol Durian', qty: 2, price: 18000 },
        { name: 'Cendol Original', qty: 1, price: 10000 },
      ],
      total: 46000,
      status: 'SEDANG_DIKIRIM',
      statusText: 'Sedang Dikirim oleh Kurir Gus Ryan',
      zone: 'Kota Denpasar',
      address: 'Jl. Hayam Wuruk No. 45, Denpasar',
      paymentMethod: 'QRIS',
    },
    {
      id: 'INV-20261020-008',
      date: '20 Okt 2026, 11:15 WITA',
      items: [
        { name: 'Cendol Campur', qty: 3, price: 15000 },
      ],
      total: 45000,
      status: 'SELESAI',
      statusText: 'Pesanan Telah Diterima',
      zone: 'Kab. Badung',
      address: 'Jl. Sunset Road No. 88, Kuta',
      paymentMethod: 'Transfer Bank (BCA)',
    },
  ]);

  const addToCart = (product, qty = 1, note = '', selectedTopping = '') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [...prevCart, { ...product, qty, note, selectedTopping }];
      }
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);
    clearCart();
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        orders,
        addOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

