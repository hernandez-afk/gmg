# Moby Animation Assets

All vector assets exported from Figma for the "Guess Moby's Game" animation.

## Files

### Background
- `ellipse.png` – Background circle/ellipse (static)

### Whale Character (14 layers)
- `whale-1.png` through `whale-14.png` – Individual vector parts of the whale character
  - These layers compose the complete whale illustration
  - All whale parts should animate together with the same motion/transform

### Decorative Element
- `wire.png` – Decorative wire/line element (animated separately)

## Layer Positions & Animations

### Whale Character (animate as group)
- **Duration**: 2 seconds, infinite loop
- **Animations**:
  - Rotate: [0, -5, 4, -3, 0]° at times [0, 0.175, 0.425, 0.675, 1]
  - X: [0, 4, -3, 2, 0]px at times [0, 0.2, 0.45, 0.7, 1]
  - Y: [0, -8, 2, -5, 0]px at times [0, 0.25, 0.5, 0.75, 1]
  - Easing: easeInOut

### Wire Line (animate separately)
- **Duration**: 2 seconds, infinite loop
- **Animations**:
  - Height: [25.277, 21.907, 24.086, 24.086]px
  - Width: [90.406, 85.364, 84.951, 84.951]px
  - Rotate: [15.933, 12.933, 17.933, 14.433, 15.933]°
  - X & Y: Complex easing with cubic-bezier([0.35, 0, 0.65, 1])

## CSS Implementation Notes

- Use `@keyframes` for each animation property
- Set `animation-iteration-count: infinite`
- Use `animation-timing-function` for easing curves
- Position each whale layer absolutely within a container
- Synchronize all animations to 2-second timeline
