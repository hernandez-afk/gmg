// Badges.jsx — badge tier definitions + earned-badges logic
const BADGES = [
  { id: 'pixel-perfect', name: 'Pixel Perfect', tier: 'gold',   blurb: 'Solved from screenshot 1', icon: '✦' },
  { id: 'sharpshooter',  name: 'Sharpshooter',  tier: 'silver', blurb: 'Solved in 2',              icon: '◆' },
  { id: 'one-and-done',  name: 'Got There',     tier: 'bronze', blurb: 'Solved in 3',              icon: '●' },
  { id: 'streak-5',      name: '5-Day Streak',  tier: 'gold',   blurb: 'Solved 5 days running',    icon: '↯' },
  { id: 'tribe-troll',   name: 'Tribe Troll',   tier: 'silver', blurb: 'Guessed Castlevania (you weren\'t alone)', icon: '☠' },
  { id: 'first-blood',   name: 'First Blood',   tier: 'gold',   blurb: 'Top-3 solver of the day',  icon: '⚑' },
];

const TIER_COLORS = {
  gold:   { fill: '#f5c429', stroke: '#7a5a07' },
  silver: { fill: '#d8dcdf', stroke: '#5a6a72' },
  bronze: { fill: '#d18a4b', stroke: '#5a3010' },
  event:  { fill: 'var(--accent)', stroke: 'var(--base-secondary)' },
};

function badgesEarnedFor({ totalAttempts, pixelPerfect, themedWeekActive, wrongGuesses }) {
  const out = [];
  if (pixelPerfect) out.push('pixel-perfect');
  else if (totalAttempts === 2) out.push('sharpshooter');
  else if (totalAttempts === 3) out.push('one-and-done');
  if ((wrongGuesses || []).some(w => /castlevania/i.test(w))) out.push('tribe-troll');
  // 'streak-5' / 'first-blood' are server-determined; not derived locally
  return out;
}

function BadgeChip({ badge, size = 'md', faded }) {
  const colors = TIER_COLORS[badge.tier] || TIER_COLORS.bronze;
  const isLg = size === 'lg';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: isLg ? 12 : 8,
      padding: isLg ? '10px 14px' : '6px 10px',
      borderRadius: 9999, background: '#fff',
      border: '2px solid var(--base-secondary)',
      boxShadow: isLg ? '0 4px 0 var(--base-secondary)' : '0 3px 0 var(--base-secondary)',
      opacity: faded ? 0.55 : 1,
      filter: faded ? 'grayscale(0.6)' : 'none',
    }}>
      <div style={{
        width: isLg ? 36 : 24, height: isLg ? 36 : 24,
        borderRadius: '50%', background: colors.fill,
        border: '2px solid ' + colors.stroke,
        display: 'grid', placeItems: 'center',
        color: colors.stroke,
        font: `800 ${isLg ? 16 : 12}px/1 var(--font-ui)`,
        flexShrink: 0,
      }}>{badge.icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ font: `800 ${isLg ? 14 : 12}px/1.1 var(--font-ui)`, color: 'var(--ink-dark)' }}>{badge.name}</span>
        {isLg && <span style={{ font: '500 11px/1.2 var(--font-ui)', color: 'var(--ink-on-light)' }}>{badge.blurb}</span>}
      </div>
    </div>
  );
}

window.BADGES = BADGES;
window.TIER_COLORS = TIER_COLORS;
window.badgesEarnedFor = badgesEarnedFor;
window.BadgeChip = BadgeChip;
