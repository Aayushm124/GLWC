import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from './ProductContext';
import { Icons } from './Icons';

const FILTERS = [
  { label: 'All', key: 'all', Icon: Icons.Grid },
  { label: 'Fashion', key: 'fashion', Icon: Icons.Fashion },
  { label: 'Home', key: 'home', Icon: Icons.Home },
  { label: 'Electronics', key: 'electronics', Icon: Icons.Electronics },
  { label: 'Beauty', key: 'beauty', Icon: Icons.Beauty },
];

export default function ProductGrid({ sectionRef }) {
  const [active, setActive] = useState('all');
  const { products } = useProducts();
  const filtered = active === 'all' ? products : products.filter(p => p.cat === active);

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 1 }}>
      {/* Filter bar */}
      <div style={{
        position: 'sticky', top: 72, zIndex: 200,
        background: 'rgba(4,4,10,0.88)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0.85rem 2.5rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: '0.5rem' }}>
          <Icons.Filter size={13} color="var(--muted)" />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>Filter</span>
        </div>
        {FILTERS.map(({ label, key, Icon }) => {
          const isActive = active === key;
          return (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: '0.35rem 0.9rem', borderRadius: 999, cursor: 'pointer', transition: 'all 0.2s',
              border: `1px solid ${isActive ? 'rgba(218,165,50,0.5)' : 'rgba(255,255,255,0.07)'}`,
              background: isActive ? 'rgba(218,165,50,0.12)' : 'transparent',
              color: isActive ? 'var(--gold)' : 'var(--muted)',
              fontSize: '0.78rem', fontWeight: isActive ? 600 : 400,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon size={13} color={isActive ? 'var(--gold)' : 'var(--muted)'} />
              {label}
            </button>
          );
        })}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Icons.Package size={13} color="var(--muted)" />
          <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{filtered.length} products</span>
        </div>
      </div>

      {/* Section header */}
      <div style={{ padding: '2.5rem 2.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.3rem', color: 'rgba(218,165,50,0.7)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          Featured Products
        </h2>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(218,165,50,0.25), transparent)' }} />
      </div>

      {/* Grid */}
      <div style={{ padding: '0 2.5rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem', perspective: 1200 }}>
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
