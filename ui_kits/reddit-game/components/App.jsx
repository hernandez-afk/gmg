// App.jsx — state machine for the demo.
// Phases: splash → intro → play → (unlock?) → solve → leaderboard
const ANSWER = 'sonic the hedgehog 2';
const ANSWER_DISPLAY = 'Sonic The Hedgehog 2';

const CLUES = [
  { kind: 'screenshot', label: 'A frame from the game' },
  { kind: 'screenshot', label: 'Another, more recognizable' },
  { kind: 'year',       label: 'Year', text: '1992 · Sega Mega Drive' },
  { kind: 'tagline',    label: 'Tagline', text: '"Sonic and Tails team up to stop Dr. Robotnik\'s flying fortress."' },
  { kind: 'letter',     label: 'First letter & length', text: 'S _ _ _ _   T _ _   H _ _ _ _ _ _ _   2' },
];

function normalize(s) { return s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim(); }
function isCorrect(g) {
  const n = normalize(g);
  return n === 'sonic the hedgehog 2' || n === 'sonic 2';
}

function App({
  mode = 'mode-1', frameStyle,
  user = 'megadrive_dad', subreddit = 'retrogaming', day = 142,
  initialPhase = 'splash', initialRevealed = 1, initialAttempts = [], initialLastWrong = null,
  loggedIn = true,
  // 'native' = inline text input (desktop / wide embed).
  // 'custom' = phone build: in-game pop-up keyboard (GuessKeyboard.jsx).
  keyboard = 'native', initialKeyboardOpen = false, initialDraft = '',
  topBar = 'full',   // 'full' | 'compact' | 'minimal' (phone variants in TopBar.jsx)
}) {
  const [phase, setPhase] = React.useState(initialPhase);
  const [revealed, setRevealed] = React.useState(initialRevealed);
  const [attempts, setAttempts] = React.useState(initialAttempts);
  const [shake, setShake] = React.useState(false);
  const [lastWrong, setLastWrong] = React.useState(initialLastWrong);

  const cluesTotal = CLUES.length;
  const wrongGuesses = attempts.filter(a => a.kind === 'miss').map(a => a.guess);
  const solvedIdx = attempts.findIndex(a => a.kind === 'solve');
  const pixelPerfect = solvedIdx === 0;
  const totalAttempts = attempts.filter(a => a.kind !== 'unused').length;
  const earnedBadgeIds = badgesEarnedFor({ totalAttempts, pixelPerfect, wrongGuesses });
  const heroBadge = earnedBadgeIds.length ? BADGES.find(b => b.id === earnedBadgeIds[0]) : null;

  const start = () => setPhase('intro');
  const beginPlay = () => setPhase('play');

  const handleGuess = (text) => {
    if (isCorrect(text)) {
      setAttempts(a => [...a, { kind: 'solve', guess: text }]);
      // Branch: if there's a hero badge to celebrate, do that first.
      setTimeout(() => {
        const _attempts = [...attempts, { kind: 'solve', guess: text }];
        const _total = _attempts.filter(a => a.kind !== 'unused').length;
        const _pp = _attempts.findIndex(a => a.kind === 'solve') === 0;
        const _ids = badgesEarnedFor({ totalAttempts: _total, pixelPerfect: _pp, wrongGuesses: _attempts.filter(a => a.kind === 'miss').map(a => a.guess) });
        setPhase(_ids.length ? 'unlock' : 'solve');
      }, 320);
    } else {
      const nextAttempts = [...attempts, { kind: 'miss', guess: text, level: revealed }];
      setAttempts(nextAttempts);
      setLastWrong(text);
      setShake(true);
      setTimeout(() => setShake(false), 420);
      setRevealed(r => Math.min(cluesTotal, r + 1));
      // Out of guesses → route to the "You tried!" terminal state.
      // 6 misses == player exhausted every clue without solving.
      const missCount = nextAttempts.filter(a => a.kind === 'miss').length;
      if (missCount >= 6) {
        setTimeout(() => setPhase('fail'), 500);
      }
    }
  };

  const handleReveal = () => setRevealed(r => Math.min(cluesTotal, r + 1));

  return (
    <div data-mode={mode} className="frame" style={frameStyle}>
      {phase === 'splash' && (
        <Splash
          user={user}
          loggedIn={loggedIn}
          subreddit={subreddit}
          day={day}
          onStart={start}
        />
      )}

      {(phase === 'intro' || phase === 'play') && (
        <PlayBoard
          user={user}
          loggedIn={loggedIn}
          subreddit={subreddit}
          day={day}
          revealed={revealed}
          attempts={attempts}
          lastWrong={lastWrong}
          shake={shake}
          onGuess={handleGuess}
          onReveal={handleReveal}
          keyboard={keyboard}
          initialKeyboardOpen={initialKeyboardOpen}
          initialDraft={initialDraft}
          topBar={topBar}
        />
      )}
      {phase === 'intro' && <IntroSheet onDismiss={beginPlay} />}

      {phase === 'unlock' && heroBadge && (
        <BadgeUnlock
          badge={heroBadge}
          attempts={padAttempts(attempts, 5)}
          totalAttempts={totalAttempts}
          onContinue={() => setPhase('solve')}
          onLeaderboard={() => setPhase('leaderboard')}
        />
      )}

      {phase === 'solve' && (
        <SolveBoard
          user={user}
          subreddit={subreddit}
          day={day}
          attempts={attempts}
          pixelPerfect={pixelPerfect}
          earnedBadgeIds={earnedBadgeIds}
          onLeaderboard={() => setPhase('leaderboard')}
          loggedIn={loggedIn}
        />
      )}

      {phase === 'leaderboard' && (
        <Leaderboard
          currentUser={user}
          onBack={() => setPhase('solve')}
        />
      )}

      {phase === 'fail' && (
        <FailScreen
          game={ANSWER_DISPLAY}
          user={user}
          subreddit={subreddit}
          day={day}
          attempts={attempts}
          earnedBadgeIds={earnedBadgeIds}
          onLeaderboard={() => setPhase('leaderboard')}
          onContinue={() => setPhase('solve')}
        />
      )}
    </div>
  );
}

function padAttempts(arr, n) {
  const out = arr.slice(0, n).map(a => ({ kind: a.kind }));
  while (out.length < n) out.push({ kind: 'unused' });
  return out;
}

// ---- PlayBoard --------------------------------------------------
// Pinned-chrome layout:
//   • Top:    ThemedWeek + TopBar + ProgressBar (clue chips + wrong guesses)
//             — these never move; their position is fixed regardless of
//             game state.
//   • Middle: the active clue card. This is the ONLY thing that changes
//             location/content as the game advances.
//   • Bottom: guess input bar (also pinned).
function PlayBoard({ user, loggedIn = true, subreddit, day, revealed, attempts, lastWrong, shake, onGuess, onReveal,
                     keyboard = 'native', initialKeyboardOpen = false, initialDraft = '', topBar = 'full' }) {
  const customKb = keyboard === 'custom';
  const [typing, setTyping] = React.useState(customKb && initialKeyboardOpen);
  const [peek, setPeek] = React.useState(null); // index of clue to preview, or null
  const shownIdx = peek != null ? peek : revealed - 1;
  const activeClue = CLUES[shownIdx];
  const missCount = attempts.filter(a => a.kind === 'miss').length;
  // Wrong guesses live per-level now (not a constant on-screen row). Map
  // each clue level → the guess made there so peeking a "failed level"
  // surfaces it on demand (feedback: don't keep wrong guesses on screen).
  const missByLevel = {};
  attempts.forEach(a => { if (a.kind === 'miss' && a.level != null) missByLevel[a.level] = a.guess; });
  // 6 misses ends the game; warn the player when only 1 guess remains.
  const lastGuessWarning = missCount === 5;
  const warningEl = (
    <div role="alert" style={{
      marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 12px',
      background: '#b73a3a',
      border: '2px solid var(--base-secondary)',
      borderRadius: 9999,
      boxShadow: '0 3px 0 var(--base-secondary)',
      font: '800 12px/1.1 var(--font-ui)',
      color: 'var(--text)',
      textShadow: '0 1px 0 var(--base-secondary)',
    }}>
      <span style={{
        display: 'inline-grid', placeItems: 'center',
        width: 20, height: 20, borderRadius: '50%',
        background: 'var(--accent)', color: 'var(--ink-dark)',
        font: '900 12px/1 var(--font-ui)',
        border: '2px solid var(--base-secondary)',
        flex: 'none',
      }}>!</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        Last guess — choose wisely!
      </span>
      <span style={{
        padding: '3px 8px', borderRadius: 9999,
        background: 'rgba(0,0,0,0.18)',
        border: '1.5px solid var(--base-secondary)',
        font: '800 10px/1 var(--font-ui)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        flex: 'none',
      }}>
        1 left
      </span>
    </div>
  );

  return (
    <div className={[shake ? 'shake' : '', customKb ? 'kb-host' : '', typing ? 'is-typing' : ''].join(' ').trim()} style={{
      display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0,
    }}>
      {/* ─── Pinned top chrome ─── TopBar now carries the clue-level
          pips (relocated top-right per feedback), so the old full-width
          progress band is gone → more room for the clue itself. */}
      <div className="kb-topchrome" style={{
        flex: 'none',
        borderBottom: '2px solid var(--base-secondary)',
        background: 'rgba(0, 91, 111, 0.18)',
      }}>
        <TopBar
          subreddit={subreddit}
          day={day}
          user={user}
          loggedIn={loggedIn}
          clues={CLUES}
          revealed={revealed}
          shownIdx={shownIdx}
          attempts={attempts}
          onPickClue={(i) => setPeek(i === revealed - 1 ? null : i)}
          variant={topBar}
        />
      </div>

      {/* ─── Middle: the only thing that animates between states ──── */}
      <div className="kb-middle" style={{
        padding: customKb ? '12px 16px 14px' : '14px 16px 18px',
        flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        // Phone: the keyboard squeezes this zone, so clip rather than overlap.
        overflow: customKb ? 'hidden' : undefined,
      }}>
        <ActiveClueCard
          n={shownIdx + 1}
          clue={activeClue}
          isPeek={peek != null}
          wrongGuess={missByLevel[shownIdx + 1] || null}
          onClosePeek={() => setPeek(null)}
        />
      </div>

      {/* ─── Pinned bottom: guess input ────────────────────────────── */}
      {customKb ? (
        <GuessKeyboard
          disabled={peek != null}
          onGuess={onGuess}
          priorMisses={attempts.filter(a => a.kind === 'miss')}
          initialOpen={initialKeyboardOpen}
          initialValue={initialDraft}
          banner={lastGuessWarning ? warningEl : null}
          onOpenChange={setTyping}
        />
      ) : (
        <div style={{
          background: 'var(--base)',
          borderTop: '2px solid var(--base-secondary)',
          padding: '10px 16px 12px',
          boxShadow: '0 -6px 0 0 var(--base-secondary)',
          flex: 'none',
        }}>
          {lastGuessWarning && warningEl}
          <GuessInputInline
            disabled={peek != null}
            onGuess={onGuess}
            onReveal={onReveal}
            cluesUsed={revealed}
            cluesTotal={CLUES.length}
            priorMisses={attempts.filter(a => a.kind === 'miss')}
          />
        </div>
      )}
    </div>
  );
}

// ---- ProgressBar: pinned strip of clue chips + wrong-guess chips ---
function ProgressBar({ revealed, activeShownIdx, attempts, onPickClue }) {
  const misses = attempts.filter(a => a.kind === 'miss');
  return (
    <div style={{
      borderBottom: '2px solid var(--base-secondary)',
      background: 'rgba(0, 91, 111, 0.18)',
      padding: '8px 16px 10px',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* Clue chip row */}
      <div style={{
        display: 'flex', gap: 6, alignItems: 'center',
        overflowX: 'auto', overflowY: 'visible',
        // Bottom padding gives the chips' solid offset shadow room to breathe
        // so it doesn't read as clipped by the wrong-guess row below.
        paddingBottom: 4,
      }}>
        {CLUES.map((clue, i) => {
          const n = i + 1;
          const isLocked = n > revealed;
          const isShown  = i === activeShownIdx;
          return (
            <button
              key={n}
              onClick={() => !isLocked && onPickClue(i)}
              disabled={isLocked}
              title={isLocked ? `Clue ${n} · locked` : `Clue ${n}: ${clue.label}`}
              style={{
                flex: 'none',
                border: '2px solid var(--base-secondary)',
                borderRadius: 9999,
                padding: isShown ? '4px 9px 4px 4px' : '4px',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                background: isShown ? 'var(--accent)' : (isLocked ? 'rgba(0,0,0,0.22)' : '#fff'),
                color: isShown ? 'var(--text)' : (isLocked ? 'var(--text)' : 'var(--ink-dark)'),
                opacity: isLocked ? 0.75 : 1,
                boxShadow: '0 2px 0 var(--base-secondary)',
                font: '800 11px/1 var(--font-ui)',
                WebkitTextStroke: isShown ? '0.5px var(--base-secondary)' : '0',
                paintOrder: 'stroke fill',
              }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: isShown ? '#fff' : (isLocked ? 'transparent' : 'var(--accent-secondary)'),
                color: isShown ? 'var(--ink-on-light)' : 'var(--text)',
                display: 'grid', placeItems: 'center',
                font: '800 11px/1 var(--font-ui)',
                border: isLocked ? '1.5px dashed var(--text)' : 'none',
              }}>{isLocked ? '?' : n}</span>
              {/* Show label only for the active clue; collapsed chips for the rest
                  keep the row from running out of width on narrow embeds. */}
              {isShown && (
                <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {clue.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Wrong-guess chip row — always rendered for layout stability */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', minHeight: 22, flexWrap: 'wrap' }}>
        <span style={{ font: '700 10px/1 var(--font-ui)', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
          Wrong guesses
        </span>
        {misses.length === 0 ? (
          <span style={{ font: '500 11px/1 var(--font-ui)', color: 'var(--text)', opacity: 0.6 }}>
            none yet
          </span>
        ) : (
          misses.map((m, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '3px 8px', borderRadius: 9999,
              border: '2px solid #b73a3a',
              background: 'rgba(255,255,255,0.94)', color: '#b73a3a',
              font: '700 11px/1 var(--font-ui)',
              textDecoration: 'line-through',
            }}>{m.guess}</span>
          ))
        )}
      </div>
    </div>
  );
}

// ---- ActiveClueCard: the focal clue --------------------------------
// Lays out as a flex column that fills its parent (the constrained
// middle zone in PlayBoard). The header is flex:none; the body
// (screenshot / text) flexes to fill the rest, ensuring the image
// always sits above the bottom border line.
function ActiveClueCard({ n, clue, isPeek, wrongGuess, onClosePeek }) {
  if (!clue) return null;
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 0', minHeight: 0 }}>
      <div className="kb-cluehead" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--accent)', border: '2px solid var(--base-secondary)',
          display: 'grid', placeItems: 'center',
          font: '800 14px/1 var(--font-ui)', color: 'var(--text)',
          WebkitTextStroke: '1px var(--base-secondary)', paintOrder: 'stroke fill',
          boxShadow: '0 3px 0 var(--base-secondary)',
        }}>{n}</div>
        <div className="dt" style={{ fontSize: 22, lineHeight: 1, flex: 1, minWidth: 0 }}>{clue.label}</div>
        {isPeek && (
          <button onClick={onClosePeek} style={{
            border: '2px solid var(--base-secondary)', background: '#fff',
            borderRadius: 9999, padding: '4px 10px', cursor: 'pointer',
            font: '700 11px/1 var(--font-ui)', color: 'var(--ink-dark)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            boxShadow: '0 3px 0 var(--base-secondary)',
          }}>← Back to live</button>
        )}
      </div>
      {clue.kind === 'screenshot'
        ? <ScreenshotClue id="sonic2" n={n} label={`Screenshot ${n} · drop image here`} fillHeight />
        : <TextClue text={clue.text} kind={clue.label} />}
    </div>
  );
}

// (Old ClueStrip and PreviousGuessesInline removed — their logic now
//  lives inside ProgressBar at the top of the frame for a stable layout.)

// ---- GuessInputInline: bottom guess bar without absolute positioning -
function GuessInputInline({ disabled, onGuess, onReveal, cluesUsed, cluesTotal, priorMisses = [] }) {
  const [value, setValue] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const [dupMsg, setDupMsg] = React.useState(null);
  const suggestions = React.useMemo(() => {
    if (!value.trim()) return [];
    const v = value.trim().toLowerCase();
    return GAME_LIST.filter(g => g.toLowerCase().includes(v)).slice(0, 4);
  }, [value]);

  const submit = (text) => {
    const t = (text ?? value).trim();
    if (!t) return;
    // Already-guessed guard — tell the player which clue-level they used it
    // on instead of silently burning another guess (feedback directive).
    const norm = t.toLowerCase().replace(/[^a-z0-9]/g, '');
    const dup = priorMisses.find(m => m.guess.toLowerCase().replace(/[^a-z0-9]/g, '') === norm);
    if (dup) {
      setDupMsg(`Already guessed in level ${dup.level ?? '?'}`);
      return;
    }
    onGuess && onGuess(t);
    setValue('');
    setDupMsg(null);
  };

  return (
    <div style={{ marginTop: 12, position: 'relative' }}>
      {focus && suggestions.length > 0 && (
        <div className="card" style={{
          position: 'absolute', left: 0, right: 0, bottom: '100%', marginBottom: 8,
          padding: 6, maxHeight: 180, overflow: 'auto', zIndex: 5,
        }}>
          {suggestions.map(s => (
            <div key={s}
                 onMouseDown={(e) => { e.preventDefault(); submit(s); }}
                 style={{
                   padding: '9px 11px', borderRadius: 7, cursor: 'pointer',
                   font: '600 14px/1 var(--font-ui)', color: 'var(--ink-dark)',
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,91,111,0.06)'}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              {s}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <input
          className="guess"
          placeholder="Type your guess…"
          value={value}
          disabled={disabled}
          onChange={(e) => { setValue(e.target.value); if (dupMsg) setDupMsg(null); }}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 120)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          style={{ flex: 1, padding: '12px 14px', fontSize: 16 }}
        />
        <button className="btn btn-primary" disabled={disabled} onClick={() => submit()} style={{ minWidth: 70, fontSize: 15, padding: '12px 16px' }}>
          Guess
        </button>
      </div>
      {dupMsg && (
        <div role="alert" style={{
          marginTop: 8, padding: '6px 11px', borderRadius: 9999,
          background: 'rgba(224,80,58,0.12)', border: '2px solid #e0503a',
          font: '700 12px/1 var(--font-ui)', color: '#b73a3a',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span aria-hidden="true">↺</span> {dupMsg}
        </div>
      )}
    </div>
  );
}

// ---- SolveBoard -------------------------------------------------
// Fixed-height layout (Devvit guideline §3.1 & §9: "scrolling within
// inline webviews is prohibited"). Nothing scrolls — everything sized
// to fit a 540×600 interactive-post embed.
function SolveBoard({ user, subreddit, day, attempts, pixelPerfect, earnedBadgeIds, onLeaderboard, loggedIn = true }) {
  const path = padAttempts(attempts, 5);
  const totalAttempts = attempts.filter(a => a.kind !== 'unused').length;
  const percentile = pixelPerfect ? 98 : totalAttempts <= 2 ? 87 : totalAttempts <= 3 ? 62 : 34;
  const displayUser = loggedIn ? user : 'anon';
  const commentText =
    `${pixelPerfect ? '✦ Pixel Perfect — ' : ''}Solved in ${totalAttempts} — beat ${percentile}% of r/${subreddit}.\n` +
    `Today's #${day} · ${ANSWER_DISPLAY}\n` +
    `(via Guess The Game)`;

  const [showWrong, setShowWrong] = React.useState(false);
  const wrongGuesses = [];  // moved to Leaderboard "Wrong guesses" tab

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, position: 'relative' }}>
      <div style={{
        padding: '14px 16px 14px',
        display: 'flex', flexDirection: 'column', gap: 10,
        flex: '1 1 auto', minHeight: 0,
      }}>
        <SolveCard
          user={displayUser}
          game={ANSWER_DISPLAY}
          subreddit={subreddit}
          day={day}
          attempts={path}
          percentile={percentile}
          pixelPerfect={pixelPerfect}
          rank={loggedIn ? (pixelPerfect ? 1 : totalAttempts <= 2 ? 3 : 12) : null}
        />

        {loggedIn ? (
          // Slim rail: badges left, leaderboard CTA right
          <BadgesAndActionsCard
            earnedBadgeIds={earnedBadgeIds || []}
            onLeaderboard={onLeaderboard}
          />
        ) : (
          // Logged-out: slim rail with sign-in CTA
          <LoggedOutActionsCard
            subreddit={subreddit}
          />
        )}

        {/* Share your solve — given the most room (feedback: declutter the
            solve screen and let the share card breathe). */}
        <div style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <ShareBar
            subreddit={subreddit}
            question={`In one line, make someone want to give ${ANSWER_DISPLAY} a try.`}
          />
        </div>
      </div>
    </div>
  );
}

// Slim rail: earned badges on the left, leaderboard CTA on the right.
// (Wrong guesses moved to the Leaderboard's "Wrong guesses" tab.)
function BadgesAndActionsCard({ earnedBadgeIds, onLeaderboard }) {
  const earned = earnedBadgeIds.map(id => BADGES.find(b => b.id === id)).filter(Boolean);
  return (
    <div className="card" style={{
      padding: '8px 10px',
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 200px', minWidth: 0 }}>
        <div style={{
          font: '700 9px/1 var(--font-ui)', color: 'var(--ink-on-light)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {earned.length ? 'You earned' : 'No badges'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {earned.length > 0 ? earned.map(b => <BadgeChip key={b.id} badge={b} size="md" />) : (
            <span style={{ font: '500 11px/1.3 var(--font-ui)', color: 'var(--ink-on-light)' }}>
              Solve faster tomorrow.
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

function LoggedOutActionsCard({ subreddit }) {
  return (
    <div className="card" style={{
      padding: '8px 10px',
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
    }}>
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <div style={{ font: '800 12px/1.15 var(--font-ui)', color: 'var(--ink-dark)' }}>
          Sign in to save your progress
        </div>
        <div style={{ font: '500 11px/1.25 var(--font-ui)', color: 'var(--ink-on-light)' }}>
          Track badges · r/{subreddit} leaderboard
        </div>
      </div>
      <button className="btn btn-primary" style={{ fontSize: 13, padding: '9px 12px' }}>
        Sign in →
      </button>
    </div>
  );
}

// (WrongGuessesSheet removed — the data now lives in the Leaderboard
//  "Wrong guesses" tab instead of a solve-screen popover.)

// Slim combined block — badges (left) + wrong-guesses (right) + leaderboard CTA.
// No more big yellow rank header (rank moved into SolveCard).
function BadgesAndLeaderboardCard({ earnedBadgeIds, onLeaderboard, wrongGuesses = [], subreddit }) {
  const earned = earnedBadgeIds.map(id => BADGES.find(b => b.id === id)).filter(Boolean);
  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Two-column body: badges left, wrong guesses right.
          Both render as chip clouds in the same visual vocabulary. */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        background: '#fff',
      }}>
        {/* Badges */}
        <div style={{
          padding: '8px 10px',
          borderRight: '1.5px dashed rgba(0,91,111,0.18)',
          display: 'flex', flexDirection: 'column', gap: 5,
        }}>
          <div style={{
            font: '700 9px/1 var(--font-ui)', color: 'var(--ink-on-light)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {earned.length ? 'You earned' : 'No badges'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignContent: 'flex-start' }}>
            {earned.length > 0 ? earned.map(b => <BadgeChip key={b.id} badge={b} size="md" />) : (
              <span style={{ font: '500 11px/1.3 var(--font-ui)', color: 'var(--ink-on-light)' }}>
                Solve faster tomorrow.
              </span>
            )}
          </div>
        </div>
        {/* Wrong guesses — as red strikethrough chips, matching the badge chip
            vocabulary on the left so the two columns read as one piece. */}
        <div style={{
          padding: '8px 10px',
          display: 'flex', flexDirection: 'column', gap: 5,
        }}>
          <div style={{
            font: '700 9px/1 var(--font-ui)', color: 'var(--ink-on-light)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Today's wrong guesses
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignContent: 'flex-start' }}>
            {wrongGuesses.slice(0, 4).map(w => (
              <span key={w.name} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 8px 4px 4px',
                borderRadius: 9999,
                background: '#fff',
                border: '2px solid var(--base-secondary)',
                boxShadow: '0 2px 0 var(--base-secondary)',
                font: '800 11px/1 var(--font-ui)', color: 'var(--ink-dark)',
              }}>
                <span style={{
                  display: 'inline-grid', placeItems: 'center',
                  minWidth: 22, height: 16, padding: '0 5px',
                  borderRadius: 9999,
                  background: '#b73a3a', color: '#fff',
                  font: '800 10px/1 var(--font-ui)',
                }}>{w.pct}%</span>
                <span style={{
                  textDecoration: 'line-through',
                  textDecorationColor: '#b73a3a',
                  textDecorationThickness: '1.5px',
                  maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{w.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — uses the standard primary button style instead of the
          brown accent-secondary bar, so it reads as an action and
          stays consistent with every other CTA in the kit. */}
      <div style={{
        padding: 10,
        background: '#fff',
        borderTop: '1.5px dashed rgba(0,91,111,0.18)',
      }}>
        <button className="btn btn-primary" onClick={onLeaderboard} style={{
          width: '100%', fontSize: 13, padding: '10px 12px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--base-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3h12v4a6 6 0 0 1-12 0V3z"/>
            <path d="M6 5H3.5v1.5A2.5 2.5 0 0 0 6 9"/>
            <path d="M18 5h2.5v1.5A2.5 2.5 0 0 1 18 9"/>
            <path d="M10 13h4v3.5h-4z"/>
            <path d="M7 21h10v-2H7z"/>
          </svg>
          View full leaderboard
        </button>
      </div>
    </div>
  );
}

window.App = App;
