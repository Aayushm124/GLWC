import React, { useState, useRef } from 'react';
import { Icons, ProductImagePlaceholder } from './Icons';

const BADGE_COLORS = {
  NEW: { bg: '#22c55e', color: '#fff' },
  HOT: { bg: '#ef4444', color: '#fff' },
  SALE: { bg: '#daa532', color: '#000' },
};

export default function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);

  const [activeColor, setActiveColor] = useState(0);
  const cardRef = useRef();
  const [activeImg, setActiveImg] = useState(0);

  const disc = Math.round((1 - product.price / product.old) * 100);

  
  return (
<div ref={cardRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}      style={{ perspective: 1000, animation: `fadeUp 0.6s ease ${index * 0.08}s both` }}>
      <div style={{
       transform: `translateY(${hovered ? '-6px' : '0'})`,
        transition: 'transform 0.3s ease',
        borderRadius: 20,
        background: 'linear-gradient(160deg, rgba(22,20,32,0.97) 0%, rgba(12,10,18,0.99) 100%)',
        border: `1px solid ${hovered ? 'rgba(218,165,50,0.4)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? '0 32px 64px rgba(0,0,0,0.6), 0 0 40px rgba(218,165,50,0.1), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
        overflow: 'hidden', transition: hovered ? 'border 0.1s, box-shadow 0.1s' : 'all 0.5s ease', position: 'relative',
      }}>
      
        
{/* Image area */}
        <div
          style={{ height: 200, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(218,165,50,0.04), rgba(130,60,200,0.04))', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          onMouseMove={(e) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const images = [product.image, product.image2, product.image3].filter(Boolean);
            if (images.length > 1) {
              const idx = Math.floor(x * images.length);
              setActiveImg(Math.min(idx, images.length - 1));
            }
          }}
          onMouseLeave={() => setActiveImg(0)}
        >
          {(() => {
            const images = [product.image, product.image2, product.image3].filter(Boolean);
            return images.length > 0 ? (
              <>
                {images.map((img, i) => (
                  <img key={i} src={img} alt={product.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    position: 'absolute', top: 0, left: 0,
                    opacity: activeImg === i ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }} />
                ))}
                {/* Zone indicators at bottom */}
                {images.length > 1 && (
                  <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, zIndex: 3 }}>
                    {images.map((_, i) => (
                      <div key={i} style={{
                        width: activeImg === i ? 16 : 6, height: 4, borderRadius: 999,
                        background: activeImg === i ? '#fff' : 'rgba(255,255,255,0.4)',
                        transition: 'all 0.3s ease',
                      }} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <ProductImagePlaceholder category={product.cat} size={72} />
            );
          })()}

          {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 5, zIndex: 2 }}>
            {product.badges.map(b => (
              <span key={b} style={{ padding: '2px 8px', borderRadius: 6, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', background: BADGE_COLORS[b]?.bg, color: BADGE_COLORS[b]?.color, display: 'flex', alignItems: 'center', gap: 3 }}>
                {b === 'NEW' && <Icons.Sparkle size={9} color="#fff" />}
                {b === 'HOT' && <Icons.Zap size={9} color="#fff" />}
                {b === 'SALE' && <Icons.Tag size={9} color="#000" />}
                {b} {disc > 0 ? `${disc}% off` : ''}
              </span>
            ))}
          </div>

          {/* Wishlist */}
          <button onClick={(e) => { e.stopPropagation(); setWished(!wished); }} style={{
            position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: '50%', zIndex: 2,
            background: 'rgba(4,4,10,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'transform 0.2s, background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Icons.Heart size={16} color={wished ? '#ef4444' : '#888'} filled={wished} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.1rem 1.2rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(218,165,50,0.5)', textTransform: 'uppercase', marginBottom: 5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            {product.cat === 'fashion' && <Icons.Fashion size={11} color="rgba(218,165,50,0.5)" />}
            {product.cat === 'electronics' && <Icons.Electronics size={11} color="rgba(218,165,50,0.5)" />}
            {product.cat === 'home' && <Icons.Home size={11} color="rgba(218,165,50,0.5)" />}
            {product.cat === 'beauty' && <Icons.Beauty size={11} color="rgba(218,165,50,0.5)" />}
            {product.cat}
          </div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{product.desc}</div>

         {/*Colors*/}
          {/* <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem', alignItems: 'center' }}>
            {product.colors && product.colors.map((c, i) => (
              <div key={i} onClick={() => setActiveColor(i)} style={{
                width: 16, height: 16, borderRadius: '50%', background: c, cursor: 'pointer',
                border: activeColor === i ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.12)',
                transition: 'border 0.2s, transform 0.2s', transform: activeColor === i ? 'scale(1.2)' : 'scale(1)',
              }} />
            ))}
          </div> */}

          {/* Price */}
       {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: '0.9rem' }}>
            <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.35rem', color: 'var(--gold)' }}>₹{product.price}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'line-through' }}>₹{product.old}</span>
          </div>
          
    {/* Buy buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: `${product.meesho ? '1fr' : ''} ${product.amazon ? '1fr' : ''}`.trim(), gap: 7 }}>
            {product.meesho && (
              <a href={product.meesho} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '0.6rem 0', borderRadius: 10, textDecoration: 'none',
                background: 'linear-gradient(135deg, #f43397, #c0126f)', color: '#fff',
                fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.04em',
                boxShadow: hovered ? '0 4px 16px rgba(244,51,151,0.35)' : 'none',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icons.ShoppingBag size={14} color="#fff" /> Normal
              </a>
            )}
            {product.amazon && (
              <a href={product.amazon} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '0.6rem 0', borderRadius: 10, textDecoration: 'none',
                background: 'linear-gradient(135deg, #48ff00, #2de000)', color: '#000',
                fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.04em',
                boxShadow: hovered ? '0 4px 16px rgba(255,153,0,0.35)' : 'none',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icons.Bolt size={14} color="#000" /> Express
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
