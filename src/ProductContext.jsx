import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CAROUSEL } from './data';

const ProductContext = createContext();

//  SECURITY CONFIG 
// Change these two values before deploying!
const ADMIN_SECRET_PATH = '/yash-admin';   // Secret URL — change this to something only I know
const ADMIN_PASSWORD    = 'yash123'; // Strong password — change this too
const MAX_ATTEMPTS      = 5;                  // Lock after this many wrong attempts
const LOCKOUT_MINUTES   = 15;                 // Lock duration in minutes
// ------------------

export { ADMIN_SECRET_PATH };

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try { const s = localStorage.getItem('sd_products'); return s ? JSON.parse(s) : PRODUCTS; }
    catch { return PRODUCTS; }
  });

  const [carousel, setCarousel] = useState(() => {
    try { const s = localStorage.getItem('sd_carousel'); return s ? JSON.parse(s) : CAROUSEL; }
    catch { return CAROUSEL; }
  });

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('sd_admin') === 'true');

  // Brute-force lockout state (stored in localStorage so it persists across tabs)
  const getLockout = () => {
    try { return JSON.parse(localStorage.getItem('sd_lockout') || '{}'); }
    catch { return {}; }
  };
  const saveLockout = (data) => localStorage.setItem('sd_lockout', JSON.stringify(data));

  useEffect(() => { localStorage.setItem('sd_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('sd_carousel', JSON.stringify(carousel)); }, [carousel]);

  // Products CRUD
const addProduct = (product) => {
    setProducts(prev => [{ ...product, id: Date.now(), price: Number(product.price), old: Number(product.old), badges: product.badges || [], colors: product.colors || ['#daa532'], image2: product.image2 || '', image3: product.image3 || '' }, ...prev]);
  };
  const updateProduct = (id, updated) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated, price: Number(updated.price), old: Number(updated.old) } : p));
  };
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  // Carousel CRUD
  const addCarouselItem = (tab, item) => {
    setCarousel(prev => ({ ...prev, [tab]: [{ ...item, id: Date.now(), price: Number(item.price) }, ...(prev[tab] || [])] }));
  };
  const updateCarouselItem = (tab, id, updated) => {
    setCarousel(prev => ({ ...prev, [tab]: prev[tab].map(i => i.id === id ? { ...i, ...updated, price: Number(updated.price) } : i) }));
  };
  const deleteCarouselItem = (tab, id) => {
    setCarousel(prev => ({ ...prev, [tab]: prev[tab].filter(i => i.id !== id) }));
  };

  // ── Auth with brute-force protection ──
  const getLoginStatus = () => {
    const lockout = getLockout();
    const now = Date.now();
    const lockedUntil = lockout.lockedUntil || 0;
    const isLocked = now < lockedUntil;
    const attempts = lockout.attempts || 0;
    const remainingMs = lockedUntil - now;
    return { isLocked, attempts, remainingMs };
  };

  const login = (password) => {
    const lockout = getLockout();
    const now = Date.now();

    // Check if currently locked out
    if (lockout.lockedUntil && now < lockout.lockedUntil) {
      return { success: false, locked: true, remainingMs: lockout.lockedUntil - now };
    }

    // Reset attempts if lockout has expired
    if (lockout.lockedUntil && now >= lockout.lockedUntil) {
      saveLockout({ attempts: 0, lockedUntil: 0 });
    }

    if (password === ADMIN_PASSWORD) {
      // Correct — clear lockout, set admin session
      saveLockout({ attempts: 0, lockedUntil: 0 });
      setIsAdmin(true);
      sessionStorage.setItem('sd_admin', 'true');
      // Store login timestamp for session expiry tracking
      sessionStorage.setItem('sd_login_time', Date.now().toString());
      return { success: true };
    } else {
      // Wrong password — increment attempts
      const attempts = (lockout.attempts || 0) + 1;
      const remaining = MAX_ATTEMPTS - attempts;
      if (attempts >= MAX_ATTEMPTS) {
        const lockedUntil = now + LOCKOUT_MINUTES * 60 * 1000;
        saveLockout({ attempts, lockedUntil });
        return { success: false, locked: true, remainingMs: lockedUntil - now, attempts };
      }
      saveLockout({ attempts, lockedUntil: 0 });
      return { success: false, locked: false, remaining, attempts };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sd_admin');
    sessionStorage.removeItem('sd_login_time');
  };

  return (
    <ProductContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      carousel, addCarouselItem, updateCarouselItem, deleteCarouselItem,
      isAdmin, login, logout, getLoginStatus,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() { return useContext(ProductContext); }
