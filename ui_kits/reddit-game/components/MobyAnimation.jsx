// MobyAnimation.jsx — faithful port of Figma "Moby Animation" (node 30:1061)
// from github.com/hernandez-afk/Figma-Motion-Animation.
// Structure preserved 1:1: static ellipse → animated whale group (14 SVG
// parts) → animated wire → static text on top. The repo used motion/react;
// here each animated property runs as its own CSS keyframe on a nested
// wrapper so the whale keeps Figma's independent per-axis timing.
const MOBY_DIR = 'moby/';
const WHALE_PARTS = [
  { src: 'whale-1.svg',  inset: '5.53% 4.76% 6.23% 17.08%',   bleed: '-4.3% -6.56%' },
  { src: 'whale-2.svg',  inset: '59.31% 6.07% 6.23% 21.04%' },
  { src: 'whale-3.svg',  inset: '67.24% 29.47% 15.83% 53.95%' },
  { src: 'whale-4.svg',  inset: '40.06% 42.02% 59.47% 56.25%' },
  { src: 'whale-5.svg',  inset: '39.84% 40.89% 59.86% 57.88%' },
  { src: 'whale-6.svg',  inset: '17.42% 28.7% 65.12% 47.63%' },
  { src: 'whale-7.svg',  inset: '19.77% 31.89% 67.47% 50.82%' },
  { src: 'whale-8.svg',  inset: '22.74% 35.93% 70.46% 54.85%' },
  { src: 'whale-9.svg',  inset: '23.84% 41.26% 74.21% 56.1%' },
  { src: 'whale-10.svg', inset: '7.28% 48.61% 87.78% 32.66%' },
  { src: 'whale-11.svg', inset: '8.34% 67.27% 82.95% 23.24%' },
  { src: 'whale-12.svg', inset: '51.86% 58.58% 36.03% 17.04%', bleed: '-15.68% -29.58% -15.68% -10.51%' },
  { src: 'whale-13.svg', inset: '59.54% 64.85% 36.36% 17.06%' },
  { src: 'whale-14.svg', inset: '63.44% 55.97% 34.53% 37.98%' },
];

function fill(extra) {
  return Object.assign({ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }, extra || {});
}

function MobyAnimation({ scale = 1 }) {
  const W = 271, H = 194;
  return (
    <div style={{ position: 'relative', width: W * scale, height: H * scale }} role="img" aria-label="Guess Moby's Game">
      <div style={{ position: 'absolute', top: 0, left: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>

        {/* Layer 1 — static background ellipse */}
        <div style={{ position: 'absolute', top: '42.78%', right: '56.46%', bottom: '47.42%', left: '9.59%' }}>
          <img alt="" src={MOBY_DIR + 'ellipse.svg'} style={fill()} draggable={false} />
        </div>

        {/* Layer 2 — animated whale group (translateX ▸ translateY ▸ rotate) */}
        <div className="moby-whale-x" style={{ position: 'absolute', left: '56.83%', right: 0, top: 15, aspectRatio: '462 / 626', overflow: 'hidden' }}>
          <div className="moby-whale-y" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div className="moby-whale-rot" style={{ position: 'relative', width: '100%', height: '100%' }}>
              {WHALE_PARTS.map((p, i) => (
                <div key={i} style={{ position: 'absolute', inset: p.inset }}>
                  {p.bleed ? (
                    <div style={{ position: 'absolute', inset: p.bleed }}>
                      <img alt="" src={MOBY_DIR + p.src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} draggable={false} />
                    </div>
                  ) : (
                    <img alt="" src={MOBY_DIR + p.src} style={fill()} draggable={false} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 3 — animated decorative wire */}
        <div className="moby-wire" style={{ position: 'absolute', top: '33.41%', right: '28.34%', bottom: '43.67%', left: '37.83%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: 'none', width: 89.4, height: 20.7, transform: 'rotate(15.93deg)' }}>
            <div style={{ position: 'absolute', inset: '-4.83% -1.12%' }}>
              <img alt="" src={MOBY_DIR + 'wire.svg'} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} draggable={false} />
            </div>
          </div>
        </div>

        {/* Layer 4 — static text (on top). Brand display treatment: white/yellow
            fill, dark-teal 2-color stroke + hard offset shadow (per the design
            system's defining trick), so it reads as the branded wordmark. */}
        <div style={{ position: 'absolute', top: '4.64%', right: '16.97%', bottom: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: "'Baloo Bhai 2', 'Baloo Bhai', sans-serif", color: '#fff', letterSpacing: '-0.64px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', WebkitTextStroke: '3px var(--base-secondary)', paintOrder: 'stroke fill', textShadow: '0 5px 0 var(--base-secondary)' }}>
          <p style={{ margin: 0, fontSize: 64, lineHeight: '30px', letterSpacing: '-1.28px', fontWeight: 800 }}>Guess</p>
          <p style={{ margin: 0, fontSize: 42, letterSpacing: '-0.84px', fontWeight: 800, lineHeight: '30px' }}><span>{`  `}</span>Moby's</p>
          <p style={{ margin: 0, fontSize: 42, lineHeight: '30px' }}>&#8203;</p>
          <p style={{ margin: 0, fontSize: 64, lineHeight: '30px', letterSpacing: '-1.28px', color: '#ffae17', fontWeight: 800 }}>{`   `}</p>
        </div>
        <div style={{ position: 'absolute', top: '59.28%', right: '27.68%', bottom: '25.26%', left: '11.81%', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: "'Baloo Bhai 2', 'Baloo Bhai', sans-serif", color: '#ffae17', letterSpacing: '-1.28px', whiteSpace: 'nowrap', fontWeight: 800, WebkitTextStroke: '3px var(--base-secondary)', paintOrder: 'stroke fill', textShadow: '0 5px 0 var(--base-secondary)' }}>
          <p style={{ margin: 0, lineHeight: '30px', fontSize: 64 }}>Game</p>
        </div>

      </div>
    </div>
  );
}

window.MobyAnimation = MobyAnimation;

// MobyWhale — just the animated whale group (14 SVG parts on the 3 nested
// timing wrappers), sized to a box. Used as an overlay on top of the static
// logo-moby.png wordmark so only the whale moves while the branded text
// stays pixel-perfect.
function MobyWhale({ width = 92 }) {
  const h = width * 626 / 462;
  return (
    <div style={{ width, height: h, position: 'relative', overflow: 'visible' }}>
      <div className="moby-whale-x" style={{ position: 'absolute', inset: 0 }}>
        <div className="moby-whale-y" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div className="moby-whale-rot" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {WHALE_PARTS.map((p, i) => (
              <div key={i} style={{ position: 'absolute', inset: p.inset }}>
                {p.bleed ? (
                  <div style={{ position: 'absolute', inset: p.bleed }}>
                    <img alt="" src={MOBY_DIR + p.src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} draggable={false} />
                  </div>
                ) : (
                  <img alt="" src={MOBY_DIR + p.src} style={fill()} draggable={false} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.MobyWhale = MobyWhale;
