// TopBar.jsx — meta row during play.
//   • Logo + Day # + r/subreddit on the left
//   • Compact clue-level progress on the RIGHT (Audrey's feedback:
//     relocate level progress to the top-right to reclaim vertical
//     space). Each pip is tappable to peek that clue; a pip where the
//     player already guessed wrong is ringed red ("failed level").
function TopBar({ subreddit, day, points = 12480, user, loggedIn = true, clues, revealed, shownIdx, attempts = [], onPickClue, variant = 'full' }) {
  const missLevels = new Set(
    attempts.filter(a => a.kind === 'miss' && a.level != null).map(a => a.level)
  );
  if (variant === 'compact' || variant === 'minimal') {
    const Bar = variant === 'compact' ? TopBarCompact : TopBarMinimal;
    return <Bar {...{ subreddit, day, clues, revealed, shownIdx, missLevels, onPickClue }} />;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
      <Logo size="sm" />
      {/* Meta column truncates instead of wrapping on narrow phone embeds. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: '0 1 auto', overflow: 'hidden' }}>
        <span style={{
          font: '700 11px/1 var(--font-ui)',
          color: 'var(--text)',
          textShadow: '0 1px 0 var(--base-secondary)',
          opacity: 0.95,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3,
        }}>
          #{day} · r/{subreddit}
        </span>
        {loggedIn && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', minWidth: 0, overflow: 'hidden', lineHeight: 1.3 }}>
            <span style={{ flex: 'none', display: 'inline-flex' }}><Snoo size={14} /></span>
            <span style={{ font: '800 10px/1.3 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)' }}>u/{user}</span>
            <span style={{ font: '700 10px/1 var(--font-ui)', color: 'var(--accent)' }}>· {points.toLocaleString()} pts</span>
          </span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }} />
      {clues && (
        <LevelProgress
          clues={clues}
          revealed={revealed}
          shownIdx={shownIdx}
          missLevels={missLevels}
          onPickClue={onPickClue}
        />
      )}
    </div>
  );
}

// Compact clue-level pips, parked top-right. Filled = revealed, ringed
// red = wrong guess made at that clue, accent = currently shown.
function LevelProgress({ clues, revealed, shownIdx, missLevels, onPickClue }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flex: 'none' }}>
      <span style={{
        font: '700 8px/1 var(--font-ui)', color: 'var(--text)',
        textTransform: 'uppercase', letterSpacing: '0.09em', opacity: 0.8,
      }}>
        Clues
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {clues.map((c, i) => {
          const n = i + 1;
          const locked = n > revealed;
          const shown = i === shownIdx;
          const missed = missLevels.has(n);
          return (
            <button
              key={n}
              disabled={locked}
              onClick={() => !locked && onPickClue(i)}
              title={locked ? `Clue ${n} · locked`
                    : missed ? `Clue ${n} · you guessed wrong here — tap to review`
                    : `Clue ${n}: ${c.label}`}
              style={{
                width: 22, height: 22, borderRadius: '50%', padding: 0,
                border: `2px solid ${missed ? '#e0503a' : 'var(--base-secondary)'}`,
                background: shown ? 'var(--accent)' : locked ? 'rgba(0,0,0,0.22)' : '#fff',
                color: shown ? 'var(--text)' : locked ? 'var(--text)' : 'var(--ink-dark)',
                font: '800 10px/1 var(--font-ui)',
                display: 'grid', placeItems: 'center',
                cursor: locked ? 'not-allowed' : 'pointer',
                boxShadow: shown ? '0 2px 0 var(--base-secondary)' : 'none',
                opacity: locked ? 0.7 : 1,
                WebkitTextStroke: shown ? '0.5px var(--base-secondary)' : '0',
                paintOrder: 'stroke fill',
              }}>
              {locked ? '?' : n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- Phone variants ------------------------------------------------
// The full bar stacks logo + two meta lines + labelled pips, which gets
// cramped in a ~350px Reddit-app post. These trade the user/points line
// (already on the splash) for room.

// Compact — one row: small wordmark · day/subreddit · pips.
function TopBarCompact({ subreddit, day, clues, revealed, shownIdx, missLevels, onPickClue }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px' }}>
      <img src="logo-moby.png" alt="Guess Moby's Game" draggable={false}
           style={{ display: 'block', width: 54, height: 'auto', flex: 'none', userSelect: 'none' }} />
      <span style={{
        flex: '1 1 auto', minWidth: 0,
        font: '700 11px/1 var(--font-ui)', color: 'var(--text)',
        textShadow: '0 1px 0 var(--base-secondary)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3,
      }}>
        #{day} · r/{subreddit}
      </span>
      {clues && (
        <div style={{ display: 'flex', gap: 4, flex: 'none' }}>
          {clues.map((c, i) => (
            <CluePip key={i} i={i} clue={c} size={22}
                     locked={i + 1 > revealed} shown={i === shownIdx} missed={missLevels.has(i + 1)}
                     onPickClue={onPickClue} />
          ))}
        </div>
      )}
    </div>
  );
}

// Minimal — whale mark + a full-width segmented clue track. The track is
// the progress readout and the peek control in one.
function TopBarMinimal({ day, clues, revealed, shownIdx, missLevels, onPickClue }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px' }}>
      <img src="vectorized-moby-mrnlgnhm-w8j9.png" alt="Guess Moby's Game" draggable={false}
           style={{ display: 'block', width: 26, height: 'auto', flex: 'none', userSelect: 'none' }} />
      <span style={{
        flex: 'none', font: '800 10px/1 var(--font-ui)', color: 'var(--text)',
        textShadow: '0 1px 0 var(--base-secondary)', letterSpacing: '0.04em',
      }}>#{day}</span>
      {clues && (
        <div style={{ display: 'flex', gap: 4, flex: '1 1 auto', minWidth: 0 }}>
          {clues.map((c, i) => {
            const n = i + 1;
            const locked = n > revealed;
            const shown = i === shownIdx;
            const missed = missLevels.has(n);
            return (
              <button key={n} disabled={locked} onClick={() => !locked && onPickClue(i)}
                title={locked ? `Clue ${n} · locked` : missed ? `Clue ${n} · wrong guess here — tap to review` : `Clue ${n}: ${c.label}`}
                style={{
                  flex: '1 1 0', minWidth: 0, height: 22, padding: 0,
                  borderRadius: 6,
                  border: `2px solid ${missed ? '#e0503a' : 'var(--base-secondary)'}`,
                  background: shown ? 'var(--accent)' : locked ? 'rgba(0,0,0,0.22)' : '#fff',
                  color: shown ? 'var(--base-secondary)' : locked ? 'var(--text)' : 'var(--ink-dark)',
                  boxShadow: shown ? '0 2px 0 var(--base-secondary)' : 'none',
                  opacity: locked ? 0.7 : 1,
                  font: '800 10px/1 var(--font-ui)',
                  cursor: locked ? 'not-allowed' : 'pointer',
                }}>
                {locked ? '?' : n}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CluePip({ i, clue, size, locked, shown, missed, onPickClue }) {
  const n = i + 1;
  return (
    <button disabled={locked} onClick={() => !locked && onPickClue(i)}
      title={locked ? `Clue ${n} · locked` : missed ? `Clue ${n} · wrong guess here — tap to review` : `Clue ${n}: ${clue.label}`}
      style={{
        width: size, height: size, borderRadius: '50%', padding: 0,
        border: `2px solid ${missed ? '#e0503a' : 'var(--base-secondary)'}`,
        background: shown ? 'var(--accent)' : locked ? 'rgba(0,0,0,0.22)' : '#fff',
        color: shown ? 'var(--text)' : locked ? 'var(--text)' : 'var(--ink-dark)',
        font: '800 10px/1 var(--font-ui)',
        display: 'grid', placeItems: 'center',
        cursor: locked ? 'not-allowed' : 'pointer',
        boxShadow: shown ? '0 2px 0 var(--base-secondary)' : 'none',
        opacity: locked ? 0.7 : 1,
        WebkitTextStroke: shown ? '0.5px var(--base-secondary)' : '0',
        paintOrder: 'stroke fill',
      }}>
      {locked ? '?' : n}
    </button>
  );
}

window.TopBar = TopBar;
