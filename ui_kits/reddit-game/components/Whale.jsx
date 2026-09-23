// Whale.jsx — the whale-trophy sticker mark.
// Uses the painted PNG sticker as base art (gold), and recolors per tier
// via CSS filters so the same artwork serves gold / silver / bronze / event.
//
// PNG is transparent-background, painted in the brand's sticker style
// (chunky white border + blue outer stroke + warm gold cup with whale face).
const WHALE_TROPHY_SRC = 'assets/whale-trophy.png';

const WHALE_TIER_FILTERS = {
  // gold — leave the artwork alone.
  gold:   'none',
  // silver — drop the warmth out, lift the value a touch.
  silver: 'grayscale(1) brightness(1.08) contrast(0.95)',
  // bronze — shift toward red/copper, darken.
  bronze: 'hue-rotate(-22deg) saturate(1.05) brightness(0.82) contrast(1.05)',
  // event (Atari accent yellow) — bump saturation, nudge hue warmer.
  event:  'hue-rotate(6deg) saturate(1.18) brightness(1.02)',
};

function Whale({ tier = 'gold', size = 80, title }) {
  const filter = WHALE_TIER_FILTERS[tier] || 'none';
  return (
    <img
      src={WHALE_TROPHY_SRC}
      alt={title || ''}
      width={size}
      height={size}
      draggable={false}
      style={{
        display: 'block',
        width: size,
        height: size,
        objectFit: 'contain',
        filter,
        // Tiny inset so the white sticker border doesn't kiss the container edge
        // at small sizes.
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}

window.Whale = Whale;
