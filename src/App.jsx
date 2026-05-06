import React, { useRef } from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import CarouselSection from './Carousel';
import Footer from './Footer';
import AdminPanel from './AdminPanel';
import { ProductProvider, ADMIN_SECRET_PATH } from './ProductContext';

function AmbientOrbs() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '8%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(218,165,50,0.06) 0%, transparent 65%)', animation: 'orb1 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,51,151,0.05) 0%, transparent 65%)', animation: 'orb2 15s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '35%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,60,255,0.06) 0%, transparent 65%)', animation: 'orb1 18s ease-in-out infinite 3s' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(218,165,50,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(218,165,50,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  );
}

function Divider() {
  return <div style={{ margin: '0 2.5rem', height: 1, background: 'linear-gradient(90deg, transparent, rgba(218,165,50,0.15), transparent)' }} />;
}

function StoreFront() {
  const productsRef = useRef();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>
      <AmbientOrbs />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <Hero onExplore={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <Divider />
        <ProductGrid sectionRef={productsRef} />
        <Divider />
        <CarouselSection />
        <Divider />
        <Footer />
      </div>
    </div>
  );
}

// 404 page shown if someone tries /admin or any wrong path
function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#04040a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Instrument Sans, sans-serif' }}>
      <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '6rem', color: 'rgba(218,165,50,0.15)', lineHeight: 1 }}>404</div>
      <div style={{ fontSize: '1rem', color: '#555', marginTop: '1rem' }}>Page not found</div>
      <a href="/" style={{ marginTop: '1.5rem', padding: '0.6rem 1.5rem', borderRadius: 10, background: 'rgba(218,165,50,0.1)', border: '1px solid rgba(218,165,50,0.25)', color: '#daa532', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
        ← Back to Store
      </a>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;
  const isAdmin = path === ADMIN_SECRET_PATH;
  const isHome = path === '/' || path === '';
  
  return (
    <ProductProvider>
      {isHome && <StoreFront />}
      {isAdmin && <AdminPanel />}
      {!isHome && !isAdmin && <NotFound />}
    </ProductProvider>
  );
}
