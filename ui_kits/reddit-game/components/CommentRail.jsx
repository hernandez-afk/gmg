// CommentRail.jsx — comments-driven engagement (Reddit-call note)
function CommentRail({ comments }) {
  return (
    <div className="card" style={{ padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 2px 8px' }}>
        <span className="dt" style={{ color: 'var(--ink-dark)', WebkitTextStroke: '0', textShadow: 'none', fontSize: 16 }}>From the thread</span>
        <span style={{ font: '500 11px/1 var(--font-ui)', color: 'var(--ink-on-light)', marginLeft: 'auto' }}>{comments.length} live</span>
      </div>
      {comments.map((c, i) => (
        <div key={i} style={{
          display: 'flex', gap: 10, padding: '8px 0',
          borderTop: i === 0 ? 'none' : '1px dashed rgba(0,91,111,0.16)',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: c.pinned ? 'var(--accent)' : (c.color || '#0079D3'),
            color: '#fff', display: 'grid', placeItems: 'center',
            font: '800 11px/1 var(--font-ui)', flex: 'none',
            border: '1.5px solid var(--base-secondary)',
          }}>{c.user.slice(2, 3).toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 11px/1 var(--font-ui)', color: 'var(--base-secondary)' }}>
              {c.user}{c.pinned && <span style={{ color: 'var(--ink-on-light)', fontWeight: 700 }}> · pinned</span>}
            </div>
            <div style={{ font: '500 13px/1.35 var(--font-ui)', color: 'var(--ink-dark)', marginTop: 2 }}>{c.text}</div>
            <div style={{ font: '600 10px/1 var(--font-ui)', color: 'var(--ink-on-light)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c.ago} · ▲ {c.upvotes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

window.CommentRail = CommentRail;
