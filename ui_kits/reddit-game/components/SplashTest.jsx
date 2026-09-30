// SplashTest.jsx — the in-feed splash (as live today: logo over a blurred
// first clue, answer bar underneath) with an attention treatment on the
// answer box, so players scrolling past can see where to tap.
//
//   attention="glow"   — the box breathes with a soft accent halo
//   attention="motion" — the box gently bobs and nudges every few seconds
//   attention="none"   — as live today
//
// Both treatments stop once the player focuses the box (their job is done)
// and fall back to a still ring under prefers-reduced-motion.
// Tapping/focusing the box, or submitting a guess, hands off to the Play
// screen via onStart(firstGuess?).

function SplashTest({ attention = 'none', day = 45, date = 'September 30', subreddit = 'mobygames', guessers = 1524, touch = false, onStart }) {
  const [value, setValue] = React.useState('');
  const [engaged, setEngaged] = React.useState(false);
  const inputRef = React.useRef(null);

  const submit = () => {
    const t = value.trim();
    if (t) onStart && onStart(t);
  };

  return (
    <div data-mode="mode-1" className="frame sp-host">
      <div className="sp">
        <div className="sp-top">
          <span className="sp-top-side" />
          <img className="sp-atari" src="atari-logo-white.png" alt="Atari" draggable={false} />
          <span className="sp-top-side sp-top-right">
            <span className="sp-sound" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <span className="sp-guest"><i />Guest</span>
          </span>
        </div>

        <div className="sp-stage">
          <img className="sp-logo" src="logo-moby.png" alt="Guess Moby's Game" draggable={false} />
          <div className="card sp-clue">
            <div className="sp-shot" aria-label="Clue 1, blurred screenshot" role="img" />
            <span className="sp-cluepill">Clue 1 of 4</span>
          </div>
        </div>

        <div className={`sp-answer${engaged ? '' : ` is-${attention}`}`}>
          <input
            ref={inputRef}
            className="guess sp-input"
            placeholder="Name the game…"
            value={value}
            readOnly={touch}
            inputMode={touch ? 'none' : undefined}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => { setEngaged(true); if (touch) onStart && onStart(); }}
            onPointerDown={() => setEngaged(true)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          />
          <button className="btn btn-primary sp-go" onClick={() => (value.trim() ? submit() : touch ? onStart && onStart() : inputRef.current && inputRef.current.focus())}>Guess</button>
        </div>

        <div className="sp-how"><span className="sp-q">?</span>How it works</div>

        <div className="sp-foot">
          <div className="sp-meta">
            <span>{date} · #{day} · r/{subreddit}</span>
            <span className="sp-signin">Sign in to track your streak →</span>
          </div>
          <span className="sp-live"><i />{guessers.toLocaleString()} guessers today</span>
        </div>
      </div>
    </div>
  );
}

window.SplashTest = SplashTest;
