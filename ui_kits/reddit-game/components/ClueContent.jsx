// ClueContent.jsx — the body of a clue (screenshot card / tagline / year / etc.)
function ScreenshotClue({ id, n, label, fillHeight }) {
  // When fillHeight is true, the slot expands to fill its parent's height
  // (used inside the constrained PlayBoard middle zone so the screenshot
  // sits above the bottom guess-input border). Otherwise it uses a fixed
  // 16:10 ratio (used in the screen gallery, splash, etc.).
  return (
    <div className="card" style={{ padding: 6, overflow: 'hidden', flex: fillHeight ? '1 1 0' : 'none', minHeight: 0, display: 'flex' }}>
      <div style={{
        position: 'relative', width: '100%',
        ...(fillHeight
          ? { flex: '1 1 0', minHeight: 0 }
          : { paddingTop: '62.5%' /* 16:10 */ }),
        borderRadius: 8, overflow: 'hidden',
      }}>
        <image-slot
          id={`gtg-shot-${id}-${n}`}
          shape="rect"
          placeholder={label || `Drop screenshot ${n} here`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        ></image-slot>
      </div>
    </div>
  );
}

function TextClue({ text, kind }) {
  return (
    <div className="card" style={{ padding: '14px 16px' }}>
      <div style={{ font: '700 11px/1 var(--font-ui)', color: 'var(--ink-on-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{kind}</div>
      <div style={{ font: '700 18px/1.25 var(--font-ui)', color: 'var(--ink-dark)' }}>{text}</div>
    </div>
  );
}

function GuessedPill({ name, correct }) {
  return (
    <div style={{
      display: 'inline-block', background: '#fff',
      padding: '8px 12px', borderRadius: 10,
      border: '2px solid var(--base-secondary)',
      boxShadow: '0 4px 0 var(--base-secondary)',
      font: '700 16px/1 var(--font-ui)',
      color: correct ? 'var(--ink-dark)' : '#b73a3a',
      textDecoration: correct ? 'none' : 'line-through',
    }}>{name}</div>
  );
}

// FitText — one-line display heading that shrinks to fit its width.
// Starts at `max` px (or the CSS var --fit-max when set, e.g. the compact
// typing layout) and scales down to `min`; only below `min` does it
// ellipsis. Re-fits on resize, on text change, and when `fitKey` changes.
function FitText({ children, max = 22, min = 13, fitKey, className = 'dt', style }) {
  const ref = React.useRef(null);
  const [size, setSize] = React.useState(max);
  const [clip, setClip] = React.useState(false);

  const fit = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cssMax = parseFloat(getComputedStyle(el).getPropertyValue('--fit-max'));
    const top = Number.isFinite(cssMax) ? Math.min(cssMax, max) : max;
    el.style.fontSize = top + 'px';
    const avail = el.clientWidth;
    const need = el.scrollWidth;
    let next = top;
    if (need > avail && avail > 0) next = Math.max(min, Math.floor(top * avail / need * 10) / 10);
    el.style.fontSize = next + 'px';
    // Nudge down until it truly fits (stroke/letter-spacing aren't linear).
    while (next > min && el.scrollWidth > el.clientWidth) {
      next = Math.max(min, next - 0.5);
      el.style.fontSize = next + 'px';
    }
    setSize(next);
    setClip(el.scrollWidth > el.clientWidth);
  }, [max, min]);

  React.useLayoutEffect(() => { fit(); }, [fit, children, fitKey]);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(el);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <div ref={ref} className={className} style={{
      ...style,
      fontSize: size,
      whiteSpace: 'nowrap',
      // Lighter stroke + shadow once the heading shrinks, so it stays crisp.
      ...(size < 16 ? { WebkitTextStrokeWidth: '1.5px', textShadow: '0 3px 0 var(--base-secondary)' } : null),
      // Clip only as a last resort; pad so the stroke + drop shadow survive.
      ...(clip ? { overflow: 'hidden', textOverflow: 'ellipsis', paddingBottom: 7, marginBottom: -7 } : null),
    }}>{children}</div>
  );
}

window.FitText = FitText;
window.ScreenshotClue = ScreenshotClue;
window.TextClue = TextClue;
window.GuessedPill = GuessedPill;
