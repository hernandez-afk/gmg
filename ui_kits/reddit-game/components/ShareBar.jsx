// ShareBar.jsx — pre-fills the comment, parents under pinned app comment (Andreas #1).
// Styled to match the rest of the game: WHITE card on the base, dark-blue
// border + solid offset shadow (same as SolveCard / BadgesAndLeaderboardCard).
// The headline strip uses the accent yellow with a Fugaz One title to echo
// the splash / themed-week banner. The preview text sits in a subtle
// dark-blue-tinted inset.
function ShareBar({ commentText, question, subreddit = 'retrogaming', onPosted, compact }) {
  const [copied, setCopied] = React.useState(false);
  const [posted, setPosted] = React.useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(commentText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const post = () => {
    setPosted(true);
    onPosted && onPosted();
  };

  if (compact) {
    return (
      <div className="card" style={{
        padding: 0, overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="dt dt-sm" style={{
          fontSize: 16,
          padding: '8px 14px',
          background: 'var(--accent)',
          borderRight: '2px solid var(--base-secondary)',
          textShadow: '0 2px 0 var(--base-secondary)',
        }}>Share</div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 6, padding: 6 }}>
          <button className="btn" onClick={copy} style={{ fontSize: 12, padding: '7px 11px' }}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
          <button className="btn btn-primary" onClick={post} disabled={posted}
            style={{ fontSize: 12, padding: '7px 11px' }}>
            {posted ? 'Posted ✓' : 'Post →'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header strip — accent yellow band matching the rest of the game */}
      <div style={{
        background: 'var(--accent)',
        borderBottom: '2px solid var(--base-secondary)',
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div className="dt dt-sm" style={{ fontSize: 18, color: 'var(--base-secondary)', WebkitTextStroke: '0', textShadow: 'none' }}>Sell it in one line</div>
        <span style={{
          marginLeft: 'auto',
          font: '700 9px/1 var(--font-ui)',
          color: 'var(--base-secondary)',
          textShadow: 'none',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          opacity: 0.9,
        }}>
          posts to r/{subreddit}
        </span>
      </div>

      {/* Body — an open, game-relevant question rendered as the post title */}
      <div style={{
        background: '#fff',
        padding: 10,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{
          background: 'rgba(0,91,111,0.06)',
          border: '1.5px dashed rgba(0,91,111,0.25)',
          borderRadius: 8,
          padding: '9px 12px',
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <span style={{
            font: '700 9px/1 var(--font-ui)', color: 'var(--ink-on-light)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>Your tagline</span>
          <div style={{
            font: '600 15px/1.4 var(--font-ui)',
            color: 'var(--ink-dark)',
            textWrap: 'pretty',
          }}>
            {question}
          </div>
        </div>

        <button className="btn btn-primary" onClick={post} disabled={posted}
          style={{ width: '100%', fontSize: 14, padding: '11px 12px' }}>
          {posted ? 'Posted ✓' : `Post to r/${subreddit} →`}
        </button>

        {/* Attribution credit — replaces the old MobyGames click-off. */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          paddingTop: 6,
          font: '700 10px/1 var(--font-ui)', color: 'var(--ink-on-light)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          Powered by MobyGames + Atari
        </div>
      </div>
    </div>
  );
}

window.ShareBar = ShareBar;
