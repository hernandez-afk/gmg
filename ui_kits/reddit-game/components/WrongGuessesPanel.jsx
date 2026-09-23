// WrongGuessesPanel.jsx — Andreas #3. Surface tribe-signaling wrong answers post-solve.
// `compact` mode is used next to the leaderboard card on the solve screen.
function WrongGuessesPanel({ items, compact, subreddit }) {
  if (compact) {
    return (
      <div className="card" style={{
        padding: '10px 12px',
        display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0,
      }}>
        <div style={{
          font: '700 10px/1 var(--font-ui)', color: 'var(--ink-on-light)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          Top wrong guesses{subreddit ? ` · r/${subreddit}` : ''}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.slice(0, 4).map(it => (
            <div key={it.name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              font: '600 12px/1 var(--font-ui)', color: 'var(--ink-dark)',
            }}>
              <span style={{
                flex: 1, minWidth: 0,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{it.name}</span>
              <span style={{
                font: '800 12px/1 var(--font-ui)',
                color: '#b73a3a',
                flex: 'none',
              }}>{it.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="card" style={{ padding: '14px 16px' }}>
      <div className="dt" style={{ color: 'var(--ink-dark)', WebkitTextStroke: '0', textShadow: 'none', fontSize: 18, lineHeight: 1.1 }}>
        Wrong, but loud about it
      </div>
      <div style={{ font: '500 12px/1.3 var(--font-ui)', color: 'var(--ink-on-light)', marginTop: 4, marginBottom: 10 }}>
        Today's top wrong guesses on r/{subreddit || 'retrogaming'}
      </div>
      {items.map((it, i) => (
        <div key={it.name} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
          borderTop: i === 0 ? 'none' : '1px dashed rgba(0,91,111,0.18)',
        }}>
          <div style={{ flex: 1, font: '700 14px/1 var(--font-ui)', color: 'var(--ink-dark)' }}>{it.name}</div>
          <div style={{ width: 86, height: 7, borderRadius: 4, background: 'rgba(0,91,111,0.12)', overflow: 'hidden' }}>
            <div style={{ width: `${it.pct * 4.2}%`, height: '100%', background: '#b73a3a' }}/>
          </div>
          <div style={{ width: 32, textAlign: 'right', font: '700 13px/1 var(--font-ui)', color: 'var(--ink-on-light)' }}>{it.pct}%</div>
        </div>
      ))}
    </div>
  );
}

window.WrongGuessesPanel = WrongGuessesPanel;
