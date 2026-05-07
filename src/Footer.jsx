import React from 'react';
import { Icons } from './Icons';
import useIsMobile from './useIsMobile';

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer style={{
      background: 'rgba(245,240,232,0.98)',
      borderTop: '1px solid rgba(180,150,80,0.15)',
      padding: isMobile ? '2rem 1rem 1rem' : '3rem 2.5rem 1.5rem',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? '1.5rem' : '2.5rem',
        marginBottom: isMobile ? '1.5rem' : '2.5rem',
      }}>
        {/* Brand */}
        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: isMobile ? '1.3rem' : '1.6rem', color: '#5a3e00', marginBottom: 6 }}>GLCW</div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 220 }}>Gupta Laser Cutting Works</p>
          <div style={{ display: 'flex', gap: 8, marginTop: '0.75rem' }}>
            {[Icons.Instagram, Icons.Zap, Icons.Mail].map((Icon, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,134,11,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(184,134,11,0.08)'; }}
              ><Icon size={13} color="#7a5200" /></div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7a5200', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Quick Links</div>
          {['New Arrivals', 'Best Sellers', 'Home Decor', 'LED Products', 'Mouse Pads'].map(l => (
            <div key={l} style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.4rem', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l}</div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7a5200', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Contact</div>
          {[
            { Icon: Icons.Phone, text: '+91 98765 43210', sub: 'Direct contact' },
            { Icon: Icons.Instagram, text: '@glcw.in', sub: 'Follow our reels' },
            { Icon: Icons.User, text: 'Seller Profile', sub: 'View catalogue' },
            { Icon: Icons.Mail, text: 'Custom Orders', sub: 'Product options' },
          ].map(c => (
            <div key={c.text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: '0.6rem' }}>
              <c.Icon size={14} color="#7a5200" style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text)', fontWeight: 500 }}>{c.text}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(180,150,80,0.15)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.68rem', color: '#8B6000' }}>© 2025 GLCW · All product links go to official stores</span>
        {!isMobile && <span style={{ fontSize: '0.68rem', color: '#8B6000' }}>No price manipulation · Affiliate links may apply</span>}
      </div>
    </footer>
  );
}
