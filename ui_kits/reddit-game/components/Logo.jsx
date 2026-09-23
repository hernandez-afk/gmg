// Logo.jsx — "Guess Moby's Game" whale wordmark (raster asset).
// Horizontal lockup (556×388 source). Sized by width per `size` token;
// height follows the natural aspect ratio.
function Logo({ size = 'md' }) {
  const widths = { xl: 244, lg: 196, md: 150, sm: 74 };
  const w = widths[size] || widths.md;
  return (
    <img
      src="logo-moby.png"
      alt="Guess Moby's Game"
      width={w}
      style={{ display: 'block', width: w, height: 'auto', userSelect: 'none', WebkitUserDrag: 'none' }}
      draggable={false}
    />
  );
}

window.Logo = Logo;
