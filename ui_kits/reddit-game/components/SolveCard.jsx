// SolveCard.jsx — THE share artifact (Andreas #1). Screenshottable, comment-pasteable.
// `rank` (+ totalSolvers) renders inline next to the user name in the footer
// so we don't need a separate big rank-banner card below.
function SolveCard({ user, game, subreddit, day, attempts, percentile, pixelPerfect, rank, totalSolvers = 1842 }) {
  return (
    <div className="card stick-in" style={{
      background: '#fff', padding: 14, borderRadius: 14,
      boxShadow: '0 6px 0 var(--base-secondary)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="eyebrow" style={{ color: 'var(--ink-on-light)' }}>Today's solve · #{day} · r/{subreddit}</span>
        </div>

        <div className="dt dt-md" style={{ color: 'var(--ink-dark)', WebkitTextStroke: '0', textShadow: 'none', fontSize: 22, marginTop: 6 }}>
          {game}
        </div>

        <div style={{ marginTop: 6, font: '700 14px/1.3 var(--font-ui)', color: 'var(--ink-dark)' }}>
          Solved in <span style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>{attempts.filter(a => a.kind !== 'unused').length}</span> — beat <span style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>{percentile}%</span> of r/{subreddit}.
        </div>

        <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
          {attempts.map((a, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: 6,
              display: 'grid', placeItems: 'center',
              border: '2px solid var(--base-secondary)',
              background: a.kind === 'solve' ? '#1f8f3b'
                       : a.kind === 'miss'  ? '#fff'
                       :                      '#ececec',
              color: a.kind === 'solve' ? '#fff'
                  :  a.kind === 'miss'  ? '#b73a3a'
                  :                      '#aaa',
              borderColor: a.kind === 'miss' ? '#b73a3a' : 'var(--base-secondary)',
              font: '800 13px/1 var(--font-ui)',
            }}>
              {a.kind === 'solve' ? '✓' : a.kind === 'miss' ? '×' : i + 1}
            </div>
          ))}
        </div>

        {pixelPerfect && (
          <div style={{
            marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--accent)', color: 'var(--text)',
            padding: '5px 11px', borderRadius: 9999,
            border: '2px solid var(--base-secondary)',
            boxShadow: '0 3px 0 var(--base-secondary)',
            WebkitTextStroke: '1px var(--base-secondary)',
            paintOrder: 'stroke fill',
            font: '800 12px/1 var(--font-ui)',
          }}>
            ✦ Pixel Perfect — solved from screenshot 1
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, paddingTop: 10, borderTop: '1.5px dashed rgba(0,91,111,0.2)' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FF4500', border: '2px solid var(--base-secondary)', display: 'grid', placeItems: 'center', boxShadow: '0 3px 0 var(--base-secondary)' }}>
            <Snoo size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ font: '800 13px/1.1 var(--font-ui)', color: 'var(--ink-dark)' }}>u/{user}</span>
              {typeof rank === 'number' && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'var(--accent)', color: 'var(--text)',
                  border: '2px solid var(--base-secondary)',
                  borderRadius: 9999,
                  padding: '2px 8px',
                  font: '800 11px/1 var(--font-ui)',
                  WebkitTextStroke: '0.5px var(--base-secondary)',
                  paintOrder: 'stroke fill',
                  boxShadow: '0 2px 0 var(--base-secondary)',
                }}>#{rank}</span>
              )}
            </div>
            <div style={{ font: '500 11px/1.2 var(--font-ui)', color: 'var(--ink-on-light)', marginTop: 2 }}>
              {typeof rank === 'number' ? `Rank ${rank} of ${totalSolvers.toLocaleString()}` : 'via Guess The Game'}
            </div>
          </div>
          <Logo size="sm" />
        </div>
      </div>
    </div>
  );
}

window.SolveCard = SolveCard;
