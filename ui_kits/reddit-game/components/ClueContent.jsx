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

window.ScreenshotClue = ScreenshotClue;
window.TextClue = TextClue;
window.GuessedPill = GuessedPill;
