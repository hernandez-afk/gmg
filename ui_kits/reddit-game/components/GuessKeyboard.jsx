// GuessKeyboard.jsx — phone-only guess input for the Play screens.
//
// Collapsed: the familiar guess bubble + Guess button (same look as the
// inline input). Tapping the bubble slides an in-game keyboard up from the
// bottom of the embed — we draw our own keys instead of summoning the
// native OS keyboard, because inside the Reddit app the native keyboard
// covers most of a small inline post. Tapping anywhere outside the dock
// (or submitting a guess) folds it back down to the bubble.
//
// Everything is styled from the theme tokens (see .kb-* in kit.css), so the
// keyboard reskins with each [data-mode] and sizes itself from the embed's
// dimensions via container-query units on .kb-host.

const KB_LAYOUTS = {
  abc: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['{pad}', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '{pad}'],
    ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{back}'],
    ['{mode}', '{space}', '{enter}'],
  ],
  sym: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['-', '/', ':', ';', '(', ')', '&', '@', '"'],
    ['{padw}', '.', ',', '?', '!', '\'', '#', '+', '{back}'],
    ['{mode}', '{space}', '{enter}'],
  ],
};

// Same normalisation the inline input uses for its already-guessed guard.
const kbNorm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function GuessKeyboard({
  disabled, onGuess, priorMisses = [],
  initialOpen = false, initialValue = '',
  banner = null,   // e.g. the "last guess" warning, pinned above the bubble
  onOpenChange,    // lets the board compact itself while the keyboard is up
}) {
  const [value, setValue] = React.useState(initialValue);
  const [open, setOpen] = React.useState(initialOpen && !disabled);
  const [layout, setLayout] = React.useState('abc');
  const [shift, setShift] = React.useState(initialValue === '');
  const [down, setDown] = React.useState(null);
  const [nudge, setNudge] = React.useState(false);
  const dockRef = React.useRef(null);
  const repeatRef = React.useRef(null);

  const trimmed = value.trim();
  const dup = trimmed
    ? priorMisses.find(m => kbNorm(m.guess) === kbNorm(trimmed))
    : null;

  // Suggestions: catalogue matches, with anything already guessed flagged
  // (and listed even if it isn't in the catalogue).
  const suggestions = React.useMemo(() => {
    const v = trimmed.toLowerCase();
    const missed = new Map(priorMisses.map(m => [kbNorm(m.guess), m]));
    if (!v) return priorMisses.map(m => ({ name: m.guess, miss: m }));
    const pool = [...priorMisses.map(m => m.guess), ...(window.GAME_LIST || [])];
    const seen = new Set();
    const out = [];
    for (const name of pool) {
      const k = kbNorm(name);
      if (seen.has(k) || !name.toLowerCase().includes(v)) continue;
      seen.add(k);
      out.push({ name, miss: missed.get(k) || null });
    }
    return out.slice(0, 6);
  }, [trimmed, priorMisses]);

  const close = React.useCallback(() => { setOpen(false); setDown(null); }, []);

  // Click-away: any press outside the dock minimises back to the bubble.
  // Capture phase + no preventDefault, so the tap still reaches its target.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [open, close]);

  React.useEffect(() => { if (disabled) close(); }, [disabled, close]);
  React.useEffect(() => { onOpenChange && onOpenChange(open); }, [open]);
  React.useEffect(() => () => clearInterval(repeatRef.current), []);

  const insert = (ch) => {
    const c = shift ? ch.toUpperCase() : ch;
    setValue(v => v + c);
    if (shift) setShift(false);
  };
  const backspace = () => setValue(v => {
    const next = v.slice(0, -1);
    if (next === '') setShift(true);
    return next;
  });
  const submit = () => {
    if (!trimmed) return;
    if (dup) {
      setNudge(true);
      setTimeout(() => setNudge(false), 380);
      return;
    }
    onGuess && onGuess(trimmed);
    setValue('');
    setShift(true);
    setLayout('abc');
    close();
  };
  const pick = (s) => {
    if (s.miss) {
      setValue(s.name);
      setNudge(true);
      setTimeout(() => setNudge(false), 380);
      return;
    }
    setValue(s.name);
    setShift(false);
  };

  // Hardware keyboard support while open (desktop previews, BT keyboards).
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') { close(); e.preventDefault(); return; }
      if (e.key === 'Enter') { submit(); e.preventDefault(); return; }
      if (e.key === 'Backspace') { backspace(); e.preventDefault(); return; }
      if (e.key.length === 1) { setValue(v => v + e.key); setShift(false); e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const press = (k, e) => {
    e.preventDefault();
    setDown(k);
    if (k === '{back}') {
      backspace();
      clearInterval(repeatRef.current);
      const started = Date.now();
      repeatRef.current = setInterval(() => {
        if (Date.now() - started > 380) backspace();
      }, 70);
      return;
    }
    if (k === '{shift}') { setShift(s => !s); return; }
    if (k === '{mode}') { setLayout(l => (l === 'abc' ? 'sym' : 'abc')); return; }
    if (k === '{space}') { if (value && !value.endsWith(' ')) setValue(v => v + ' '); return; }
    if (k === '{enter}') { submit(); return; }
    insert(k);
  };
  const release = () => { setDown(null); clearInterval(repeatRef.current); };

  const renderKey = (k, i) => {
    if (k === '{pad}' || k === '{padw}') {
      return <span key={`pad${i}`} className={`kb-pad${k === '{padw}' ? ' kb-pad--wide' : ''}`} aria-hidden="true" />;
    }
    const special = k.startsWith('{');
    const cls = ['kb-key'];
    let label = shift && !special ? k.toUpperCase() : k;
    let aria = label;
    if (k === '{shift}') { cls.push('kb-key--mod'); if (shift) cls.push('is-on'); label = <KbIcon name="shift" />; aria = 'Shift'; }
    if (k === '{back}') { cls.push('kb-key--mod'); label = <KbIcon name="back" />; aria = 'Delete'; }
    if (k === '{mode}') { cls.push('kb-key--mod', 'kb-key--wide'); label = layout === 'abc' ? '123' : 'ABC'; aria = layout === 'abc' ? 'Numbers and symbols' : 'Letters'; }
    if (k === '{space}') { cls.push('kb-key--space'); label = 'space'; aria = 'Space'; }
    if (k === '{enter}') { cls.push('kb-key--go', 'kb-key--wide'); label = 'Guess'; aria = 'Submit guess'; }
    const isDisabled = k === '{enter}' && (!trimmed || !!dup);
    if (down === k) cls.push('is-down');
    return (
      <button
        key={k + i}
        type="button"
        className={cls.join(' ')}
        aria-label={aria}
        disabled={isDisabled}
        onPointerDown={(e) => press(k, e)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onContextMenu={(e) => e.preventDefault()}
      >{label}</button>
    );
  };

  return (
    <div ref={dockRef} className={`kb-dock${open ? ' is-open' : ''}`}>
      {banner && <div className="kb-banner">{banner}</div>}
      {/* Bubble row — always visible; it's the whole dock when collapsed. */}
      <div className="kb-bar">
        <div
          role="textbox"
          aria-label="Your guess"
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          className={`kb-field${open ? ' is-open' : ''}${dup ? ' is-dup' : ''}${nudge ? ' is-nudge' : ''}${disabled ? ' is-disabled' : ''}`}
          onPointerDown={(e) => { if (!disabled) { e.preventDefault(); setOpen(true); } }}
          onKeyDown={(e) => { if (!open && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setOpen(true); } }}
        >
          {value
            ? <span className="kb-text"><span>{value}</span></span>
            : !open && <span className="kb-ph">Type your guess…</span>}
          {open && <span className="kb-caret" aria-hidden="true" />}
          {open && !value && <span className="kb-ph">Type your guess…</span>}
          {open && value && (
            <button type="button" className="kb-clear" aria-label="Clear"
                    onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setValue(''); setShift(true); }}>
              <KbIcon name="clear" />
            </button>
          )}
        </div>
        {!open && (
          <button className="btn btn-primary kb-guess" disabled={disabled || !trimmed || !!dup}
                  onClick={submit}>
            Guess
          </button>
        )}
      </div>

      {/* Keyboard tray — animates open/closed by height. */}
      <div className="kb-tray-wrap" aria-hidden={!open}>
        <div className="kb-tray">
          <div className="kb-suggest" role="listbox" aria-label="Suggestions">
            {dup ? (
              <span role="alert" className="kb-dup">
                <span aria-hidden="true">↺</span> Already guessed at clue {dup.level ?? '?'}
              </span>
            ) : suggestions.length === 0 ? (
              <span className="kb-hint">
                {trimmed ? 'No matches — you can still guess it' : 'Start typing a game title'}
              </span>
            ) : null}
            {!dup && !trimmed && suggestions.length > 0 && (
              <span className="kb-hint kb-hint--lead">Guessed:</span>
            )}
            {!dup && suggestions.map(s => (
              <button
                key={s.name}
                type="button"
                role="option"
                aria-selected={false}
                className={`kb-chip${s.miss ? ' is-miss' : ''}`}
                onPointerDown={(e) => { e.preventDefault(); pick(s); }}
              >
                <span className="kb-chip-name">{s.name}</span>
                {s.miss && <span className="kb-chip-tag">guessed</span>}
              </button>
            ))}
          </div>
          <div className="kb-keys" data-layout={layout}>
            {KB_LAYOUTS[layout].map((row, r) => (
              <div className="kb-row" key={r}>{row.map(renderKey)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KbIcon({ name }) {
  const common = {
    width: '1.15em', height: '1.15em', viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (name === 'shift') return (
    <svg {...common}><path d="M12 4 4 12h4.5v7h7v-7H20z" /></svg>
  );
  if (name === 'back') return (
    <svg {...common}><path d="M9 5h11v14H9l-6-7z" /><path d="m12 9 5 6m0-6-5 6" /></svg>
  );
  return (
    <svg {...common} width="0.95em" height="0.95em"><path d="m6 6 12 12M18 6 6 18" /></svg>
  );
}

window.GuessKeyboard = GuessKeyboard;
