// DifficultyMeter.jsx — per-subreddit difficulty indicator (Andreas #4).
// Segmented chunks instead of a gradient bar — keeps the chunky brand
// look and avoids the soft gradient that feels out of place.
function DifficultyMeter({ level = 2 }) {
  // 0 friendly, 1 standard, 2 hardcore — mapped to filled-segment count
  const labels = ['Friendly', 'Standard', 'Hardcore'];
  const lbl = labels[level] || 'Standard';
  const filled = [2, 4, 5][level]; // out of 5
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#fff', border: '2px solid var(--base-secondary)',
      borderRadius: 9999, padding: '4px 10px 4px 6px',
      boxShadow: '0 3px 0 var(--base-secondary)',
    }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 9, height: 11, borderRadius: 2,
            border: '1.5px solid var(--base-secondary)',
            background: i < filled ? 'var(--accent)' : '#fff',
          }} />
        ))}
      </div>
      <span style={{ font: '800 11px/1 var(--font-ui)', color: 'var(--ink-dark)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{lbl}</span>
    </div>
  );
}

window.DifficultyMeter = DifficultyMeter;
