import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useProducts } from './ProductContext';

const CARD_WIDTH = 185;
const CARD_GAP = 14;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_INTERVAL = 2800;

function CarouselCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_WIDTH, flexShrink: 0, borderRadius: 16, overflow: 'hidden',
        background: 'linear-gradient(160deg, rgba(22,20,32,0.97), rgba(12,10,18,0.99))',
        border: `1px solid ${hovered ? 'rgba(218,165,50,0.4)' : 'rgba(255,255,255,0.06)'}`,
        transform: `translateY(${hovered ? -8 : 0}px) scale(${hovered ? 1.03 : 1})`,
        boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.6), 0 0 24px rgba(218,165,50,0.12)' : '0 4px 16px rgba(0,0,0,0.3)',
        transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
        cursor: 'pointer', userSelect: 'none',
      }}
    >
      <div style={{
        height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(218,165,50,0.05), rgba(130,60,200,0.05))',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        overflow: 'hidden', position: 'relative',
        filter: !item.image && hovered ? 'drop-shadow(0 10px 20px rgba(218,165,50,0.35))' : 'none',
        transition: 'filter 0.3s',
      }}>
        {item.image
          ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${hovered ? 1.07 : 1})`, transition: 'transform 0.4s' }} />
          : <span style={{ fontSize: '3.4rem' }}>{item.emoji || '📦'}</span>
        }
      </div>
      <div style={{ padding: '0.7rem 0.85rem' }}>
        <div style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </div>
        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: 'var(--gold)', marginBottom: 9 }}>
          ₹{item.price}
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <a href={item.meesho} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ flex: 1, padding: '5px 0', borderRadius: 8, textAlign: 'center', background: 'linear-gradient(135deg, #f43397, #c0126f)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, textDecoration: 'none' }}>
            Meesho
          </a>
          <a href={item.amazon} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ flex: 1, padding: '5px 0', borderRadius: 8, textAlign: 'center', background: 'linear-gradient(135deg, #ff9900, #e07b00)', color: '#000', fontSize: '0.65rem', fontWeight: 700, textDecoration: 'none' }}>
            Amazon
          </a>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { key: 'new', label: 'New Arrivals' },
  { key: 'bestseller', label: 'Best Sellers' },
  { key: 'handpicked', label: 'Hand-Picked' },
];

export default function CarouselSection() {
  const { carousel } = useProducts();
  const [activeTab, setActiveTab] = useState('new');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef();
  const autoRef = useRef();

  const items = carousel[activeTab] || [];
  const looped = [...items, ...items, ...items];
  const START = items.length;

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex >= items.length * 2) { setIsTransitioning(false); setCurrentIndex(items.length); }
    else if (currentIndex < items.length) { setIsTransitioning(false); setCurrentIndex(items.length * 2 - 1); }
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (!isTransitioning) { const t = setTimeout(() => setIsTransitioning(true), 20); return () => clearTimeout(t); }
  }, [isTransitioning]);

  useEffect(() => { setIsTransitioning(false); setCurrentIndex(START); setDragOffset(0); }, [activeTab, START]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!isPaused) { setIsTransitioning(true); setCurrentIndex(i => i + 1); }
    }, AUTO_INTERVAL);
  }, [isPaused]);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto, activeTab]);

  const goTo = (dir) => { setIsTransitioning(true); setCurrentIndex(i => i + dir); startAuto(); };

  const onDragStart = (clientX) => { setIsDragging(true); setDragStartX(clientX); setDragOffset(0); setIsPaused(true); };
  const onDragMove = (clientX) => { if (!isDragging) return; setDragOffset(clientX - dragStartX); };
  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false); setIsPaused(false);
    if (dragOffset < -60) goTo(1); else if (dragOffset > 60) goTo(-1);
    setDragOffset(0);
  };

  const translateX = -(currentIndex * CARD_STEP) + dragOffset;
  const dotIndex = (currentIndex - START + items.length * 10) % items.length;

  if (items.length === 0) return null;

  return (
    <section style={{ padding: '1rem 0 4rem', position: 'relative', zIndex: 1 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem', padding: '0 2.5rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.3rem', color: 'rgba(218,165,50,0.7)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>More Picks</h2>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(218,165,50,0.25), transparent)' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', padding: '0 2.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              padding: '0.35rem 1rem', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
              border: `1px solid ${activeTab === t.key ? 'rgba(218,165,50,0.45)' : 'rgba(255,255,255,0.07)'}`,
              background: activeTab === t.key ? 'rgba(218,165,50,0.1)' : 'transparent',
              color: activeTab === t.key ? 'var(--gold)' : 'var(--muted)',
              fontSize: '0.76rem', fontWeight: activeTab === t.key ? 600 : 400,
            }}>{t.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[{ dir: -1, label: '←' }, { dir: 1, label: '→' }].map(({ dir, label }) => (
            <button key={label} onClick={() => goTo(dir)} style={{
              width: 36, height: 36, borderRadius: '50%', background: 'rgba(218,165,50,0.08)',
              border: '1px solid rgba(218,165,50,0.22)', color: 'var(--gold)', fontSize: '1rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(218,165,50,0.2)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(218,165,50,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >{label}</button>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 10, background: 'linear-gradient(90deg, var(--bg), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 10, background: 'linear-gradient(270deg, var(--bg), transparent)', pointerEvents: 'none' }} />
        <div style={{ overflow: 'hidden', padding: '0.5rem 2.5rem 1rem', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseMove={e => onDragMove(e.clientX)}
          onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
          onTouchEnd={onDragEnd}
        >
          <div ref={trackRef} onTransitionEnd={handleTransitionEnd} style={{
            display: 'flex', gap: CARD_GAP,
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning && !isDragging ? 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            willChange: 'transform',
          }}>
            {looped.map((item, i) => <CarouselCard key={`${activeTab}-${i}`} item={item} />)}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '0.5rem' }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => { setIsTransitioning(true); setCurrentIndex(START + i); startAuto(); }} style={{
            width: dotIndex === i ? 22 : 7, height: 7, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: dotIndex === i ? 'var(--gold)' : 'rgba(218,165,50,0.2)', transition: 'all 0.35s ease', padding: 0,
          }} />
        ))}
      </div>
    </section>
  );
}
