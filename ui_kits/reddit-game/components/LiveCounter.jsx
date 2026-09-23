// LiveCounter.jsx — "N players guessing right now" social proof
function LiveCounter({ count = 4812 }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#fff', border: '2px solid var(--base-secondary)',
      borderRadius: 9999, padding: '4px 12px',
      font: '700 12px/1 var(--font-ui)', color: 'var(--ink-dark)',
      boxShadow: '0 3px 0 var(--base-secondary)',
    }}>
      <span className="live-dot"></span>
      {count.toLocaleString()} guessing now
    </span>
  );
}

window.LiveCounter = LiveCounter;
