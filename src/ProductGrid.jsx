import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from './ProductContext';
import { Icons } from './Icons';
import useIsMobile from './useIsMobile';

const FILTERS = [
  { label: 'All', key: 'all', Icon: Icons.Grid },
  { label: 'Mouse Pads', key: 'mouse', Icon: Icons.Grid },
  { label: 'LED Products', key: 'led', Icon: Icons.Bulb },
  { label: 'Home Decor', key: 'home', Icon: Icons.Home },
];

export default function ProductGrid({ sectionRef }) {
  const [active, setActive] = useState('mouse');
  const { products } = useProducts();
  const isMobile = useIsMobile();
  const filtered = active === 'all' ? products : products.filter(p => p.cat === active);

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1 }}>

      {/* Filter bar */}
      <div style={{
position: 'sticky', top: 62, zIndex: 200,       
background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: isMobile ? '0.5rem 1rem' : '0.85rem 2.5rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        overflowX: isMobile ? 'auto' : 'visible',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        scrollbarWidth: 'none',
      }}>
        <style>{`.filter-bar::-webkit-scrollbar{display:none}`}</style>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: '0.5rem' }}>
            <Icons.Filter size={13} color="var(--muted)" />
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>Filter</span>
          </div>
        )}

        {FILTERS.map(({ label, key, Icon }) => {
          const isActive = active === key;
          return (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: isMobile ? '0.28rem 0.65rem' : '0.35rem 0.9rem',
              borderRadius: 999, cursor: 'pointer', transition: 'all 0.2s',
             border: `1px solid ${isActive ? 'rgba(184,134,11,0.5)' : 'rgba(180,150,80,0.2)'}`,
background: isActive ? 'rgba(184,134,11,0.1)' : 'transparent',
color: isActive ? 'var(--gold)' : 'var(--muted)',
              fontSize: isMobile ? '0.68rem' : '0.78rem',
              fontWeight: isActive ? 600 : 400,
              display: 'flex', alignItems: 'center', gap: 5,
              flexShrink: 0, whiteSpace: 'nowrap',
            }}>
              <Icon size={11} color={isActive ? 'var(--gold)' : 'var(--muted)'} />
              {label}
            </button>
          );
        })}

        {!isMobile && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icons.Package size={13} color="var(--muted)" />
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{filtered.length} products</span>
          </div>
        )}
      </div>

      {/* Section header */}
      <div style={{
        padding: isMobile ? '1.25rem 1rem 0.75rem' : '2.5rem 2.5rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <h2 style={{
          fontFamily: 'Syne', fontWeight: 700,
          fontSize: isMobile ? '1rem' : '1.3rem',
          color: 'rgba(218,165,50,0.7)', letterSpacing: '0.05em', whiteSpace: 'nowrap',
        }}>
          Featured Products
        </h2>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(218,165,50,0.25), transparent)' }} />
      </div>

      {/* Grid */}
      <div style={{
        padding: isMobile ? '0 1rem 2rem' : '0 2.5rem 3rem',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: isMobile ? '0.75rem' : '1.25rem',
      }}>
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
