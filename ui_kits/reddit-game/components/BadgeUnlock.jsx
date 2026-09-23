// BadgeUnlock.jsx — full-screen-ish modal celebrating a freshly-earned badge
function BadgeUnlock({ badge, attempts, totalAttempts, onContinue, onLeaderboard }) {
  const colors = TIER_COLORS[badge.tier] || TIER_COLORS.bronze;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: 'var(--base)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, gap: 16,
    }}>
      <span className="eyebrow">Badge unlocked</span>

      {/* Big trophy sticker — the PNG already carries the sticker border/shadow */}
      <div className="stick-in" style={{
        position: 'relative', width: 196, height: 196,
        display: 'grid', placeItems: 'center',
      }}>
        <Whale tier={badge.tier} size={196} title={badge.name} />
        {/* Tier ribbon banner over the cup */}
        <div style={{
          position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
          background: '#fff', border: '2px solid var(--base-secondary)', borderRadius: 6,
          padding: '3px 12px', font: '800 11px/1 var(--font-ui)', color: 'var(--ink-dark)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          boxShadow: '0 3px 0 var(--base-secondary)',
        }}>
          {badge.tier === 'gold' ? '★ Gold' : badge.tier === 'silver' ? '◆ Silver' : badge.tier === 'bronze' ? '● Bronze' : '✦ Event'}
        </div>
      </div>

      <div className="dt dt-lg" style={{ fontSize: 36, textAlign: 'center' }}>{badge.name}</div>
      <div style={{ font: '600 14px/1.4 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)', textAlign: 'center', maxWidth: 280 }}>
        {badge.blurb}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        {(attempts || []).map((a, i) => (
          <div key={i} style={{
            width: 26, height: 26, borderRadius: 6, border: '2px solid var(--base-secondary)',
            background: a.kind === 'solve' ? '#1f8f3b' : a.kind === 'miss' ? '#fff' : '#ececec',
            color: a.kind === 'solve' ? '#fff' : a.kind === 'miss' ? '#b73a3a' : '#aaa',
            borderColor: a.kind === 'miss' ? '#b73a3a' : 'var(--base-secondary)',
            display: 'grid', placeItems: 'center', font: '800 12px/1 var(--font-ui)',
          }}>{a.kind === 'solve' ? '✓' : a.kind === 'miss' ? '×' : i + 1}</div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 6, width: '100%', maxWidth: 320 }}>
        <button className="btn" onClick={onLeaderboard} style={{ flex: 1, fontSize: 13 }}>
          See leaderboard
        </button>
        <button className="btn btn-primary" onClick={onContinue} style={{ flex: 1.2, fontSize: 14 }}>
          Show my solve →
        </button>
      </div>

      {/* Soft secondary CTA — smaller per design-system "View on MobyGames" demotion rule. */}
      <div style={{
        marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          font: '600 11px/1.3 var(--font-ui)',
          color: 'var(--text)',
          textShadow: '0 1px 0 var(--base-secondary)',
          opacity: 0.85,
          letterSpacing: '0.01em',
        }}>
          Want to learn more about the game?
        </div>
        <a
          href="https://www.mobygames.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px',
            background: '#fff',
            border: '1.5px solid var(--base-secondary)',
            borderRadius: 9999,
            font: '700 11px/1 var(--font-ui)',
            color: 'var(--ink-dark)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            boxShadow: '0 2px 0 var(--base-secondary)',
          }}
        >
          View on MobyGames <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

window.BadgeUnlock = BadgeUnlock;
