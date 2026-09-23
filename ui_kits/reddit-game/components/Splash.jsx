// Splash.jsx — branded entry screen.
// Devvit guideline §6.1: don't require login to play. Logged-out users get
// an obvious "Play" button + a single, low-key "Sign in to track progress"
// link. Logged-in users get the personalized welcome.
function Splash({ user, loggedIn = true, points = 12480, onStart }) {
  const [muted, setMuted] = React.useState(false);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: 'var(--base)',
    }}>
      {/* Top-right utility cluster: volume toggle + signed-in identity. */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 5, display: 'flex', alignItems: 'center', gap: 8 }}>
        <VolumeButton muted={muted} onToggle={() => setMuted(m => !m)} />
        {loggedIn ? (
          <div style={{
            background: 'rgba(0,91,111,0.34)', border: '2px solid var(--base-secondary)',
            borderRadius: 9999, padding: '4px 12px 4px 4px',
            boxShadow: '0 3px 0 var(--base-secondary)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <Snoo size={24} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ font: '800 12px/1.1 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)' }}>u/{user}</span>
              <span style={{ font: '700 10px/1.1 var(--font-ui)', color: 'var(--accent)', letterSpacing: '0.02em' }}>{points.toLocaleString()} pts</span>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(0,91,111,0.34)', border: '2px solid var(--base-secondary)',
            borderRadius: 9999, padding: '5px 12px',
            boxShadow: '0 3px 0 var(--base-secondary)',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text)', opacity: 0.8 }}></span>
            <span style={{ font: '700 11px/1 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guest</span>
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', gap: 22 }}>
        {/* Atari brand lockup sits above the game wordmark (matches the
            Figma splash distribution). */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img src="atari-logo-white.png" alt="Atari" style={{ display: 'block', width: 'var(--atari-logo-w, 61px)', height: 'auto' }} draggable={false} />
          <MobyHero />
        </div>
        <div style={{ textAlign: 'center', font: '600 16px/1.4 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)', maxWidth: 280 }}>
          Guess the daily game before the clues give it away.
        </div>

        {loggedIn ? (
          // Personalized welcome moved to the top-right cluster; keep the
          // hero column focused on the wordmark + primary CTA.
          null
        ) : (
          // Logged-out: NO login wall. Just a soft "playing as guest" pill.
          <div style={{
            background: 'rgba(0,91,111,0.30)', border: '2px solid var(--base-secondary)',
            borderRadius: 9999, padding: '6px 14px',
            boxShadow: '0 4px 0 var(--base-secondary)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--text)', opacity: 0.8,
            }}></span>
            <span style={{ font: '700 12px/1 var(--font-ui)', color: 'var(--text)', textShadow: '0 1px 0 var(--base-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Playing as guest
            </span>
          </div>
        )}

        <button className="btn btn-primary" onClick={onStart} style={{ fontSize: 18, padding: '16px 28px' }}>
          Play today's game →
        </button>

        <div style={{ font: '500 12px/1.4 var(--font-ui)', color: 'var(--text)', opacity: 0.75, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} · #142 · r/retrogaming</span>
          <LiveCounter count={4812} />
          {!loggedIn && (
            <a href="#" style={{
              font: '700 11px/1 var(--font-ui)', color: 'var(--text)',
              textDecoration: 'underline', textUnderlineOffset: 3,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              opacity: 0.95, marginTop: 4,
            }}>
              Sign in to track your progress →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// VolumeButton — round icon toggle matching the kit's stroked-button style.
function VolumeButton({ muted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? 'Unmute' : 'Mute'}
      aria-pressed={muted}
      style={{
        width: 34, height: 34, flex: 'none', borderRadius: '50%', padding: 0,
        background: 'rgba(0,91,111,0.34)', border: '2px solid var(--base-secondary)',
        boxShadow: '0 3px 0 var(--base-secondary)',
        display: 'grid', placeItems: 'center', cursor: 'pointer',
      }}>
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="var(--text)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="var(--text)" stroke="var(--text)" />
        {muted ? (
          <path d="M17 9l5 5M22 9l-5 5" />
        ) : (
          <React.Fragment>
            <path d="M16.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 6a8.5 8.5 0 0 1 0 12" />
          </React.Fragment>
        )}
      </svg>
    </button>
  );
}

// MobyHero — static brand wordmark (logo-moby.png) with the animated whale
// overlaid on top of the logo's own whale. Only the whale moves; the text
// stays pixel-perfect. Whale bbox in the logo art: left 65.1%, top 12.4%,
// 32.6% × 71.4%. The overlay is sized a touch larger than that box so the
// ±8px / ±5° bob always covers the static whale underneath (no doubling).
function MobyHero() {
  // Sized entirely from --moby-logo-w so the Tweak reflows it live. Children
  // use % so the whale overlay stays registered at any size.
  return (
    <div style={{ position: 'relative', width: 'var(--moby-logo-w, 252px)', aspectRatio: '556 / 388' }} role="img" aria-label="Guess Moby's Game">
      <img src="mobygametitle-mrnlfu1i-9d4h.png" alt="" aria-hidden="true" draggable={false}
        style={{ display: 'block', width: '100%', height: '100%', userSelect: 'none' }} />
      <img src="vectorized-moby-mrnlgnhm-w8j9.png" alt="" aria-hidden="true" draggable={false}
        className="moby-float"
        style={{ position: 'absolute', left: '41.27%', top: '8.53%', width: 'var(--whale-w, 40%)', height: 'auto', userSelect: 'none' }} />
    </div>
  );
}

window.MobyHero = MobyHero;

window.Splash = Splash;

// AnimatedMobyLogo — ports Figma "Moby Animation" (node 30:1061): the
// wordmark stays still, only the whale bobs/rotates on the 2s loop. Our
// logo art bakes text + whale into one PNG, so we register two clipped
// copies of the SAME image (pixel-perfect alignment) — a static left
// layer (text) and an animated right layer (whale) — with ~14px overlap
// so the small bob never opens a seam in the shared teal blob.
function AnimatedMobyLogo({ width = 244 }) {
  const h = width * 388 / 556;
  const base = { position: 'absolute', top: 0, left: 0, width, height: h, display: 'block', userSelect: 'none', WebkitUserDrag: 'none' };
  return (
    <div style={{ position: 'relative', width, height: h }} role="img" aria-label="Guess Moby's Game">
      {/* Static: text + blob, whale clipped away (show left 67.6%) */}
      <img src="logo-moby.png" alt="" aria-hidden="true" draggable={false}
        style={{ ...base, clipPath: 'inset(0 32.4% 0 0)' }} />
      {/* Animated: whale only, text clipped away (show right, from 65.1%) */}
      <img src="logo-moby.png" alt="" aria-hidden="true" draggable={false}
        className="moby-float"
        style={{ ...base, clipPath: 'inset(0 0 0 65.1%)' }} />
    </div>
  );
}

window.AnimatedMobyLogo = AnimatedMobyLogo;