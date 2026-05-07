import React, { useState, useRef, useEffect } from 'react';
import { Icons, ProductImagePlaceholder } from './Icons';

const BADGE_COLORS = {
  NEW: { bg: '#22c55e', color: '#fff' },
  HOT: { bg: '#ef4444', color: '#fff' },
  SALE: { bg: '#daa532', color: '#000' },
};

export default function ProductCard({ product, index, isMobile = false }) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const cardRef = useRef();

  const disc = Math.round((1 - product.price / product.old) * 100);

  // Scroll fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('visible');
          observer.disconnect();
        }
      },
    { threshold: 0.1, rootMargin: '0px 0px -40% 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fade-in-card"
      style={{}}
    >
      <div style={{
        transform: `translateY(${hovered ? '-6px' : '0'})`,
        transition: 'transform 0.3s ease',
        borderRadius: isMobile ? 14 : 20,
        background: 'linear-gradient(160deg, #ffffff 0%, #faf7f2 100%)',        border: `1px solid ${hovered ? 'rgba(218,165,50,0.4)' : 'rgba(255,255,255,0.06)'}`,
        border: `1px solid ${hovered ? 'rgba(184,134,11,0.4)' : 'rgba(180,150,80,0.15)'}`,
        overflow: 'hidden',
boxShadow: hovered
  ? '0 20px 40px rgba(180,150,80,0.2), 0 0 20px rgba(184,134,11,0.1)'
  : '0 4px 16px rgba(180,150,80,0.1)',       position: 'relative',
      }}>

        {/* Image area */}
        <div
          style={{
         position: 'relative', overflow: 'hidden',
aspectRatio: '1 / 1',
width: '100%',
            background: 'linear-gradient(135deg, rgba(218,165,50,0.04), rgba(130,60,200,0.04))',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
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
    width: '100%', height: '100%', objectFit: 'contain',
    position: 'absolute', top: 0, left: 0,
    opacity: activeImg === i ? 1 : 0,
    transition: 'opacity 0.3s ease',
    background: '#fff',
  }} />
))}
                {images.length > 1 && (
                  <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, zIndex: 3 }}>
                    {images.map((_, i) => (
                      <div key={i} style={{
                        width: activeImg === i ? 14 : 5, height: 3, borderRadius: 999,
                        background: activeImg === i ? '#fff' : 'rgba(255,255,255,0.4)',
                        transition: 'all 0.3s ease',
                      }} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <ProductImagePlaceholder category={product.cat} size={isMobile ? 48 : 72} />
            );
          })()}

          {/* Badges */}
          <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4, zIndex: 2, flexWrap: 'wrap', maxWidth: '70%' }}>
            {product.badges.map(b => (
              <span key={b} style={{
                padding: isMobile ? '1px 5px' : '2px 8px',
                borderRadius: 6,
                fontSize: isMobile ? '0.5rem' : '0.6rem',
                fontWeight: 700, letterSpacing: '0.06em',
                background: BADGE_COLORS[b]?.bg, color: BADGE_COLORS[b]?.color,
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                {b === 'NEW' && <Icons.Sparkle size={7} color="#fff" />}
                {b === 'HOT' && <Icons.Zap size={7} color="#fff" />}
                {b === 'SALE' && <Icons.Tag size={7} color="#000" />}
                {b} {disc > 0 ? `${disc}% off` : ''}
              </span>
            ))}
          </div>

          {/* Wishlist */}
          <button onClick={(e) => { e.stopPropagation(); setWished(!wished); }} style={{
            position: 'absolute', top: 8, right: 8,
            width: isMobile ? 28 : 36, height: isMobile ? 28 : 36,
            borderRadius: '50%', zIndex: 2,
            background: 'rgba(4,4,10,0.7)', border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'transform 0.2s',
          }}>
            <Icons.Heart size={isMobile ? 12 : 16} color={wished ? '#ef4444' : '#888'} filled={wished} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: isMobile ? '0.6rem 0.7rem' : '1.1rem 1.2rem' }}>
          <div style={{
            fontSize: isMobile ? '0.55rem' : '0.6rem',
            letterSpacing: '0.15em', color: 'rgba(218,165,50,0.5)',
            textTransform: 'uppercase', marginBottom: 4, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {product.cat === 'fashion' && <Icons.Fashion size={9} color="rgba(218,165,50,0.5)" />}
            {product.cat === 'electronics' && <Icons.Electronics size={9} color="rgba(218,165,50,0.5)" />}
            {product.cat === 'home' && <Icons.Home size={9} color="rgba(218,165,50,0.5)" />}
            {product.cat === 'beauty' && <Icons.Beauty size={9} color="rgba(218,165,50,0.5)" />}
            {product.cat}
          </div>

          <div style={{
            fontFamily: 'Syne', fontWeight: 700,
            fontSize: isMobile ? '0.78rem' : '1rem',
            color: 'var(--text)', marginBottom: isMobile ? 2 : 4, lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{product.name}</div>

          {!isMobile && (
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
              {product.desc}
            </div>
          )}

          {/* Price */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: isMobile ? 4 : 8,
            marginBottom: isMobile ? '0.5rem' : '0.9rem',
            marginTop: isMobile ? '0.25rem' : 0,
          }}>
            <span style={{
              fontFamily: 'Syne', fontWeight: 700,
              fontSize: isMobile ? '1rem' : '1.35rem',
              color: 'var(--gold)',
            }}>₹{product.price}</span>
            <span style={{
              fontSize: isMobile ? '0.65rem' : '0.8rem',
              color: 'var(--muted)', textDecoration: 'line-through',
            }}>₹{product.old}</span>
          </div>

          {/* Buy buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `${product.meesho ? '1fr' : ''} ${product.amazon ? '1fr' : ''}`.trim(),
            gap: isMobile ? 5 : 7,
          }}>
            {product.meesho && (
              <a href={product.meesho} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: isMobile ? 3 : 6,
                padding: isMobile ? '0.4rem 0' : '0.6rem 0',
                borderRadius: isMobile ? 8 : 10, textDecoration: 'none',
                background: 'linear-gradient(135deg, #f43397, #c0126f)', color: '#fff',
                fontSize: isMobile ? '0.62rem' : '0.73rem',
                fontWeight: 700, letterSpacing: '0.02em',
                boxShadow: hovered ? '0 4px 16px rgba(244,51,151,0.35)' : 'none',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icons.ShoppingBag size={isMobile ? 10 : 14} color="#fff" /> Normal
              </a>
            )}
            {product.amazon && (
              <a href={product.amazon} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: isMobile ? 3 : 6,
                padding: isMobile ? '0.4rem 0' : '0.6rem 0',
                borderRadius: isMobile ? 8 : 10, textDecoration: 'none',
                background: 'linear-gradient(135deg, #48ff00, #2de000)', color: '#000',
                fontSize: isMobile ? '0.62rem' : '0.73rem',
                fontWeight: 700, letterSpacing: '0.02em',
                boxShadow: hovered ? '0 4px 16px rgba(72,255,0,0.25)' : 'none',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icons.Bolt size={isMobile ? 10 : 14} color="#000" /> Express
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
