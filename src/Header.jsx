import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import logo from './logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 300,
      background: scrolled ? 'rgba(4,4,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(218,165,50,0.12)' : '1px solid transparent',
      padding: '1rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s ease',
    }}>

      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <img src={logo} alt="GLCW Logo" style={{
          width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontFamily: 'Syne', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1.1,
            background: 'linear-gradient(120deg, #daa532 0%, #f0c060 50%, #daa532 100%)',
            backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}>GLCW</span>
          <span style={{
            fontSize: '0.55rem', letterSpacing: '0.12em',
            color: 'rgba(218,165,50,0.5)', textTransform: 'uppercase',
            lineHeight: 1, marginTop: 3, whiteSpace: 'nowrap',
          }}>
            Gupta Laser Cutting Works
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {['Catalogue', 'Deals', 'Contact'].map(n => (
          <span key={n} style={{ fontSize: '0.82rem', color: 'var(--muted)', cursor: 'pointer', fontWeight: 500, letterSpacing: '0.05em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{n}</span>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icons.Live size={14} color="#22c55e" />
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Live deals</span>
        </div>
      </nav>
    </header>
  );
}