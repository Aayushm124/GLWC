import React from 'react';
import { Icons } from './Icons';

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(4,4,10,0.98)', borderTop: '1px solid rgba(218,165,50,0.1)', padding: '3rem 2.5rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.6rem', background: 'linear-gradient(120deg, #daa532, #f0c060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>GLCW</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 220 }}>Gupta laser cutting works</p>
          <div style={{ display: 'flex', gap: 10, marginTop: '1rem' }}>
            {[Icons.Instagram, Icons.Zap, Icons.Mail].map((Icon, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(218,165,50,0.08)', border: '1px solid rgba(218,165,50,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(218,165,50,0.18)'; e.currentTarget.style.borderColor = 'rgba(218,165,50,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(218,165,50,0.08)'; e.currentTarget.style.borderColor = 'rgba(218,165,50,0.15)'; }}
              ><Icon size={15} color="rgba(218,165,50,0.6)" /></div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(218,165,50,0.45)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.9rem' }}>Quick Links</div>
          {['New Arrivals', 'Best Sellers', 'Fashion', 'Electronics', 'Home & Living', 'Beauty'].map(l => (
            <div key={l} style={{ fontSize: '0.83rem', color: 'var(--muted)', marginBottom: '0.45rem', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l}</div>
          ))}
        </div>

        {/* Platforms */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(218,165,50,0.45)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.9rem' }}>Shop On</div>
          {[
            { label: 'Meesho', color: '#f43397', desc: 'Budget-friendly finds' },
            { label: 'Amazon India', color: '#ff9900', desc: 'Fast delivery, trusted' },
          ].map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0.8rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
              <Icons.ShoppingBag size={18} color={p.color} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: p.color }}>{p.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(218,165,50,0.45)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.9rem' }}>Contact</div>
          {[
            { Icon: Icons.Phone, text: '+91 98765 43210', sub: 'For direct contact' },
            { Icon: Icons.Instagram, text: '@shopdirect.in', sub: 'Follow our reels' },
            { Icon: Icons.User, text: 'Seller Profile', sub: 'View full catalogue' },
            { Icon: Icons.Mail, text: 'Custom Orders', sub: 'Product options' },
          ].map(c => (
            <div key={c.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: '0.7rem' }}>
              <c.Icon size={16} color="rgba(218,165,50,0.5)" style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{c.text}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.7rem', color: '#333' }}>© 2025 ShopDirect · All product links go to official stores</span>
        <span style={{ fontSize: '0.7rem', color: '#333' }}>No price manipulation · Affiliate links may apply</span>
      </div>
    </footer>
  );
}
