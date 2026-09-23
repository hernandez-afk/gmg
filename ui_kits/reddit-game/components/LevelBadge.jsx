// LevelBadge.jsx — circular numeral pip. Lifted from Figma component 7:355.
function LevelBadge({ n, state = 'active' }) {
  // state: 'active' | 'done' | 'locked'
  const bg = state === 'locked' ? 'var(--accent-secondary)' : 'var(--accent)';
  const opacity = state === 'locked' ? 0.85 : 1;
  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%',
      background: bg,
      display: 'grid', placeItems: 'center',
      boxShadow: '0 6px 0 var(--base-secondary)',
      flex: 'none',
      opacity,
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 38,
        color: 'var(--text)',
        WebkitTextStroke: '2px var(--base-secondary)',
        paintOrder: 'stroke fill',
        textShadow: '0 3px 0 var(--base-secondary)',
        lineHeight: 1,
        marginTop: -2,
      }}>{state === 'locked' ? '?' : `${n}.`}</span>
    </div>
  );
}

window.LevelBadge = LevelBadge;
