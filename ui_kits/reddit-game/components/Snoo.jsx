// Snoo.jsx — Reddit-mascot stand-in. Flag for production: source from Reddit Brand Kit.
function Snoo({ size = 36, username }) {
  const inner = (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="36" r="22" fill="#fff" stroke="var(--base-secondary)" strokeWidth="2.5"/>
      <circle cx="32" cy="10" r="3.2" fill="#fff" stroke="var(--base-secondary)" strokeWidth="2"/>
      <line x1="32" y1="13" x2="32" y2="22" stroke="var(--base-secondary)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="11" cy="36" r="5" fill="#fff" stroke="var(--base-secondary)" strokeWidth="2.5"/>
      <circle cx="53" cy="36" r="5" fill="#fff" stroke="var(--base-secondary)" strokeWidth="2.5"/>
      <ellipse cx="24" cy="34" rx="3.2" ry="3.6" fill="var(--base-secondary)"/>
      <ellipse cx="40" cy="34" rx="3.2" ry="3.6" fill="var(--base-secondary)"/>
      <circle cx="22.5" cy="33" r="1" fill="#fff"/>
      <circle cx="38.5" cy="33" r="1" fill="#fff"/>
      <path d="M22 44 Q32 50 42 44" stroke="var(--base-secondary)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (!username) return inner;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size + 6, height: size + 6, borderRadius: '50%',
        background: '#FF4500', border: '2px solid var(--base-secondary)',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 4px 0 var(--base-secondary)',
      }}>
        {inner}
      </div>
      <span style={{ font: '700 14px/1 var(--font-ui)', color: 'var(--text)', textShadow: '0 2px 0 var(--base-secondary)' }}>
        u/{username}
      </span>
    </div>
  );
}

window.Snoo = Snoo;
