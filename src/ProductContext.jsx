import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection, onSnapshot, addDoc, updateDoc,
  deleteDoc, doc, setDoc, getDoc
} from 'firebase/firestore';
import { db } from './firebase';

const ProductContext = createContext();

// ─── SECURITY CONFIG ─────────────────────────────────────────
const ADMIN_SECRET_PATH = '/yash-admin';
const ADMIN_PASSWORD    = 'yash123';
const MAX_ATTEMPTS      = 5;
const LOCKOUT_MINUTES   = 15;
// ─────────────────────────────────────────────────────────────

export { ADMIN_SECRET_PATH };

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState({ new: [], bestseller: [], handpicked: [] });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('sd_admin') === 'true');

  // ── Listen to Firestore products in real time ──
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), snapshot => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Listen to Firestore carousel in real time ──
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'carousel', 'data'), snap => {
      if (snap.exists()) setCarousel(snap.data());
    });
    return () => unsub();
  }, []);

  // ── Products CRUD ──
  const addProduct = async (product) => {
    await addDoc(collection(db, 'products'), {
      ...product,
      price: Number(product.price),
      old: Number(product.old),
      badges: product.badges || [],
      colors: product.colors || ['#daa532'],
      createdAt: Date.now(),
    });
  };

  const updateProduct = async (id, updated) => {
    await updateDoc(doc(db, 'products', id), {
      ...updated,
      price: Number(updated.price),
      old: Number(updated.old),
    });
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
  };

  // ── Carousel CRUD ──
  const addCarouselItem = async (tab, item) => {
    const newItem = { ...item, id: Date.now(), price: Number(item.price) };
    const updated = { ...carousel, [tab]: [newItem, ...(carousel[tab] || [])] };
    await setDoc(doc(db, 'carousel', 'data'), updated);
  };

  const updateCarouselItem = async (tab, id, updated) => {
    const updatedList = carousel[tab].map(i =>
      i.id === id ? { ...i, ...updated, price: Number(updated.price) } : i
    );
    await setDoc(doc(db, 'carousel', 'data'), { ...carousel, [tab]: updatedList });
  };

  const deleteCarouselItem = async (tab, id) => {
    const updatedList = carousel[tab].filter(i => i.id !== id);
    await setDoc(doc(db, 'carousel', 'data'), { ...carousel, [tab]: updatedList });
  };

  // ── Auth with brute-force protection ──
  const getLockout = () => {
    try { return JSON.parse(localStorage.getItem('sd_lockout') || '{}'); }
    catch { return {}; }
  };
  const saveLockout = (data) => localStorage.setItem('sd_lockout', JSON.stringify(data));

  const getLoginStatus = () => {
    const lockout = getLockout();
    const now = Date.now();
    const isLocked = now < (lockout.lockedUntil || 0);
    return { isLocked, attempts: lockout.attempts || 0, remainingMs: (lockout.lockedUntil || 0) - now };
  };

  const login = (password) => {
    const lockout = getLockout();
    const now = Date.now();
    if (lockout.lockedUntil && now < lockout.lockedUntil) {
      return { success: false, locked: true, remainingMs: lockout.lockedUntil - now };
    }
    if (lockout.lockedUntil && now >= lockout.lockedUntil) saveLockout({ attempts: 0, lockedUntil: 0 });

    if (password === ADMIN_PASSWORD) {
      saveLockout({ attempts: 0, lockedUntil: 0 });
      setIsAdmin(true);
      sessionStorage.setItem('sd_admin', 'true');
      return { success: true };
    } else {
      const attempts = (lockout.attempts || 0) + 1;
      if (attempts >= MAX_ATTEMPTS) {
        const lockedUntil = now + LOCKOUT_MINUTES * 60 * 1000;
        saveLockout({ attempts, lockedUntil });
        return { success: false, locked: true, remainingMs: lockedUntil - now, attempts };
      }
      saveLockout({ attempts, lockedUntil: 0 });
      return { success: false, locked: false, remaining: MAX_ATTEMPTS - attempts, attempts };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sd_admin');
  };

  return (
    <ProductContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      carousel, addCarouselItem, updateCarouselItem, deleteCarouselItem,
      isAdmin, login, logout, getLoginStatus, loading,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() { return useContext(ProductContext); }
