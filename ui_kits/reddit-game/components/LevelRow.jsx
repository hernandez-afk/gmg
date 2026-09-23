// LevelRow.jsx — one clue row: badge + title + (optional) guess pill / content
function LevelRow({ n, title, state, children, onReveal }) {
  // state: 'active' (current), 'locked' (future), 'done' (past)
  const titleColor = state === 'locked' ? 'rgba(255,255,255,0.55)' : 'var(--text)';
  return (
    <div className={state === 'active' ? '' : ''} style={{
      display: 'flex', alignItems: 'flex-start', gap: 14, padding: '6px 0',
    }}>
      <LevelBadge n={n} state={state} />
      <div style={{ flex: 1, paddingTop: 6, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: state === 'active' ? 28 : 22,
          color: titleColor,
          WebkitTextStroke: state === 'locked' ? '0' : '2px var(--base-secondary)',
          paintOrder: 'stroke fill',
          textShadow: state === 'locked' ? 'none' : '0 4px 0 var(--base-secondary)',
          lineHeight: 1.05,
          marginBottom: state === 'active' ? 10 : 6,
        }}>
          {state === 'locked' ? '?' : title}
        </div>
        {state !== 'locked' && children}
        {state === 'done' && onReveal && (
          <div style={{ marginTop: 6 }}>
            <button className="btn-ghost" onClick={onReveal}>review clue</button>
          </div>
        )}
      </div>
    </div>
  );
}

window.LevelRow = LevelRow;
