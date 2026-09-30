// SplashTest.jsx — the in-feed splash (as live today: logo over a blurred
// first clue, answer bar underneath) with an attention treatment on the
// answer box, so players scrolling past can see where to tap.
//
//   attention="glow"   — the box breathes with a soft accent halo
//   attention="motion" — the box gently bobs and nudges every few seconds
//   attention="type"   — a blinking caret types out the prompt, so the box
//                        reads as "you can type here", not just "look here"
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
          {/* Logo floats on every version, as on the live splash. */}
          <div className="sp-logo"><img className="sp-logo-img" src="logo-moby.png" alt="Guess Moby's Game" draggable={false} /></div>
          <div className="card sp-clue">
            <div className="sp-shot" aria-label="Clue 1, blurred screenshot" role="img" />
            <span className="sp-cluepill">Clue 1 of 4</span>
          </div>
        </div>

        <div className={`sp-answer${engaged ? '' : ` is-${attention}`}`}>
          <span className="sp-field">
          <input
            ref={inputRef}
            className="guess sp-input"
            placeholder={attention === 'type' && !engaged ? '' : 'Name the game…'}
            value={value}
            readOnly={touch}
            inputMode={touch ? 'none' : undefined}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => { setEngaged(true); if (touch) onStart && onStart(); }}
            onPointerDown={() => setEngaged(true)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          />
          {attention === 'type' && !engaged && !value && <TypingPrompt />}
          </span>
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

// Typewriter prompt with a blinking caret, drawn over the empty input.
// Long prompts for roomy boxes; short ones when the box is narrow (phones).
const SP_PROMPTS = ['Name the game…', 'Which game is this?', 'Type your guess…'];
const SP_PROMPTS_SHORT = ['Name the game…', 'Which game?', 'Your guess…'];
function TypingPrompt() {
  const ref = React.useRef(null);
  const [narrow, setNarrow] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      // Pick the set whose longest prompt fits the space available.
      const probe = document.createElement('span');
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit';
      probe.textContent = SP_PROMPTS.reduce((a, b) => (b.length > a.length ? b : a)) + '|';
      el.appendChild(probe);
      const fits = probe.offsetWidth <= el.clientWidth;
      el.removeChild(probe);
      setNarrow(!fits);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const prompts = narrow ? SP_PROMPTS_SHORT : SP_PROMPTS;
  const reduced = React.useMemo(() => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  const [text, setText] = React.useState(reduced ? prompts[0] : '');
  React.useEffect(() => {
    if (reduced) return;
    let i = 0, n = 0, dir = 1, t;
    const step = () => {
      const full = prompts[i % prompts.length];
      n += dir;
      setText(full.slice(0, n));
      if (dir > 0 && n >= full.length) { dir = -1; t = setTimeout(step, 1800); return; }
      if (dir < 0 && n <= 0) { dir = 1; i = (i + 1) % prompts.length; t = setTimeout(step, 400); return; }
      t = setTimeout(step, dir > 0 ? 75 : 30);
    };
    t = setTimeout(step, 500);
    return () => clearTimeout(t);
  }, [reduced, narrow]);
  return (
    <span className="sp-typing" aria-hidden="true" ref={ref}>
      <span>{text}</span><span className="sp-caret" />
    </span>
  );
}

window.SplashTest = SplashTest;
