// ThemedWeekRibbon.jsx — push hook (Andreas #5)
function ThemedWeekRibbon({ name = 'Atari Week', day = 4, of = 7 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px',
      background: 'var(--accent)',
      borderBottom: '2px solid var(--base-secondary)',
      color: 'var(--text)',
    }}>
      <div className="dt dt-sm" style={{ fontSize: 22 }}>{name}</div>
      <div style={{ font: '700 12px/1 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)' }}>
        Day {day} of {of}
      </div>
      <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
        {Array.from({length: of}).map((_, i) => (
          <div key={i} style={{
            width: 11, height: 11, borderRadius: 3,
            background: i < day ? 'var(--text)' : 'rgba(255,255,255,0.30)',
            border: '1.5px solid var(--base-secondary)',
          }}/>
        ))}
      </div>
    </div>
  );
}

window.ThemedWeekRibbon = ThemedWeekRibbon;
