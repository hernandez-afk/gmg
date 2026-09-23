// FailScreen.jsx — terminal "You Tried!" state.
// Shown after the player runs out of guesses (6 wrong attempts).
//
// Mirrors the SOLVE screen vocabulary so it still works as a shareable
// artifact:
//   • Reveal card (the answer, with a cover-art slot).
//   • Today's most-common wrong guesses — Andreas's directive #3, framed
//     as social proof: "you weren't alone".
//   • ShareBar — same component the solve screen uses, with a fail-flavored
//     pre-filled comment ("Stumped by #142…"). MobyGames soft-CTA lives
//     inside ShareBar already, so no extra promo block needed.
function FailScreen({
  game,
  user,
  subreddit,
  day,
  attempts = [],
  earnedBadgeIds = [],
  topWrongGuesses,
  rank = 12,
  totalSolvers = 1842,
  onLeaderboard,
}) {
  const totalMisses = attempts.filter(a => a.kind === 'miss').length;
  const ANSWER_DISPLAY = game || 'Sonic The Hedgehog 2';

  const wrongGuesses = topWrongGuesses || [
    { name: 'Castlevania',       pct: 12 },
    { name: "Ghouls 'n Ghosts",  pct: 8  },
    { name: 'Strider',           pct: 5  },
    { name: 'Shinobi III',       pct: 3  },
  ];

  // Pre-filled share comment — fail-flavored, follows the same one-line-flex
  // shape as the solve comment but admits defeat (tribal currency: even
  // not solving it is share-worthy if you frame it as "this one beat me").
  const commentText =
    `Stumped by #${day} after ${totalMisses} guesses — turned out to be ${ANSWER_DISPLAY}.\n` +
    `Top wrong guess on r/${subreddit}: ${wrongGuesses[0].name} (${wrongGuesses[0].pct}%) — at least I wasn't alone.\n` +
    `(via Guess The Game)`;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: 'var(--base)',
      display: 'flex', flexDirection: 'column',
      padding: '10px 14px 12px', gap: 6,
      overflow: 'hidden',
    }}>
      {/* Eyebrow */}
      <span className="eyebrow" style={{ color: 'var(--text)', opacity: 0.85, flex: 'none' }}>
        Out of guesses · #{day} · r/{subreddit}
      </span>

      {/* Hero */}
      <div style={{
        textAlign: 'center', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 2, flex: 'none',
      }}>
        <div className="dt" style={{ fontSize: 28, lineHeight: 1 }}>You Tried!</div>
        <div style={{
          font: '600 12px/1.3 var(--font-ui)', color: 'var(--text)',
          textShadow: '0 1px 0 var(--base-secondary)',
        }}>
          Tomorrow's puzzle drops in a few hours — come back for redemption.
        </div>
      </div>

      {/* Answer + guess-path card — built in the SolveCard vocabulary so the
          "You Tried!" state reads as the same shareable artifact: title,
          the run of × guesses, and the identity/rank footer. */}
      <div className="card stick-in" style={{
        background: '#fff', padding: '11px 13px', borderRadius: 14,
        boxShadow: '0 6px 0 var(--base-secondary)',
        position: 'relative', overflow: 'hidden', flex: 'none',
      }}>
        <div style={{ position: 'relative' }}>
          <span className="eyebrow" style={{ color: 'var(--ink-on-light)' }}>Today's answer · #{day} · r/{subreddit}</span>
          <div className="dt dt-md" style={{ color: 'var(--ink-dark)', WebkitTextStroke: '0', textShadow: 'none', fontSize: 20, marginTop: 5 }}>
            {ANSWER_DISPLAY}
          </div>
          <div style={{ marginTop: 5, font: '700 13px/1.3 var(--font-ui)', color: 'var(--ink-dark)' }}>
            Out of guesses after <span style={{ color: '#b73a3a', fontWeight: 800 }}>{totalMisses}</span> tries — you weren't alone.
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
            {attempts.slice(0, 6).map((a, i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: 6,
                display: 'grid', placeItems: 'center',
                border: '2px solid #b73a3a', background: '#fff', color: '#b73a3a',
                font: '800 13px/1 var(--font-ui)',
              }}>×</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, paddingTop: 9, borderTop: '1.5px dashed rgba(0,91,111,0.2)' }}>
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
                    border: '2px solid var(--base-secondary)', borderRadius: 9999,
                    padding: '2px 8px', font: '800 11px/1 var(--font-ui)',
                    WebkitTextStroke: '0.5px var(--base-secondary)', paintOrder: 'stroke fill',
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

      {/* Badges + leaderboard rail — same trophy component the solve screen
          uses. You can still earn a medal on a loss (e.g. tribe badges), and
          the leaderboard is reachable from the same row. */}
      <FailActionsCard earnedBadgeIds={earnedBadgeIds} onLeaderboard={onLeaderboard} />


      {/* Start the discussion — reuses ShareBar as a discussion-post starter
          (MobyGames soft-CTA is already inside it). */}
      <div style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ShareBar
          subreddit={subreddit}
          question={`In one line, make someone want to give ${ANSWER_DISPLAY} a try.`}
        />
      </div>
    </div>
  );
}

// Badges + leaderboard rail — mirrors the solve screen's BadgesAndActionsCard.
// Even on a loss you can hold a medal (tribe badges, streak, etc.), and the
// leaderboard trophy button lives in the same row.
function FailActionsCard({ earnedBadgeIds = [], onLeaderboard }) {
  const earned = earnedBadgeIds.map(id => BADGES.find(b => b.id === id)).filter(Boolean);
  return (
    <div className="card" style={{
      flex: 'none', padding: '8px 10px',
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 180px', minWidth: 0 }}>
        <div style={{
          font: '700 9px/1 var(--font-ui)', color: 'var(--ink-on-light)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {earned.length ? 'You earned' : 'No medal today'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {earned.length > 0 ? earned.map(b => <BadgeChip key={b.id} badge={b} size="md" />) : (
            <span style={{ font: '500 11px/1.3 var(--font-ui)', color: 'var(--ink-on-light)' }}>
              Come back tomorrow for redemption.
            </span>
          )}
        </div>
      </div>
      <button className="btn btn-primary" onClick={onLeaderboard} style={{
        fontSize: 13, padding: '9px 12px', flex: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3h12v4a6 6 0 0 1-12 0V3z"/>
          <path d="M6 5H3.5v1.5A2.5 2.5 0 0 0 6 9"/>
          <path d="M18 5h2.5v1.5A2.5 2.5 0 0 1 18 9"/>
          <path d="M10 13h4v3.5h-4z"/>
          <path d="M7 21h10v-2H7z"/>
        </svg>
        Leaderboard
      </button>
    </div>
  );
}

window.FailScreen = FailScreen;