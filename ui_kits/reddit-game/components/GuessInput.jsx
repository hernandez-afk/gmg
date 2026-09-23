// GuessInput.jsx — bottom guess bar with suggestions + reveal button
const GAME_LIST = [
  'Sonic the Hedgehog 2', 'Castlevania: Bloodlines', 'Streets of Rage 2',
  'Ghouls \'n Ghosts', 'Strider', 'Shinobi III', 'Gunstar Heroes',
  'Vectorman', 'Earthworm Jim', 'Comix Zone', 'Rocket Knight Adventures',
  'Toejam & Earl', 'Phantasy Star IV', 'Shining Force II', 'Beyond Oasis',
  'Aladdin', 'The Lion King', 'Disney\'s Goof Troop', 'Mickey Mania',
];

function GuessInput({ disabled, onGuess, onReveal, cluesUsed, cluesTotal }) {
  const [value, setValue] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const suggestions = React.useMemo(() => {
    if (!value.trim()) return [];
    const v = value.trim().toLowerCase();
    return GAME_LIST.filter(g => g.toLowerCase().includes(v)).slice(0, 4);
  }, [value]);

  const submit = (text) => {
    const t = (text ?? value).trim();
    if (!t) return;
    onGuess && onGuess(t);
    setValue('');
  };

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: 'var(--base)',
      borderTop: '2px solid var(--base-secondary)',
      padding: '12px 14px 16px',
    }}>
      {focus && suggestions.length > 0 && (
        <div className="card" style={{ padding: 6, marginBottom: 8, maxHeight: 180, overflow: 'auto' }}>
          {suggestions.map(s => (
            <div key={s}
                 onMouseDown={(e) => { e.preventDefault(); submit(s); }}
                 style={{
                   padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                   font: '600 15px/1 var(--font-ui)', color: 'var(--ink-dark)',
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,91,111,0.06)'}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              {s}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
        <input
          className="guess"
          placeholder="Type your guess…"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 120)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary" disabled={disabled} onClick={() => submit()} style={{ minWidth: 80 }}>
          Guess
        </button>
      </div>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ font: '600 12px/1 var(--font-ui)', color: 'var(--text)', opacity: 0.85 }}>
          {cluesUsed} / {cluesTotal} clues used
        </span>
      </div>
    </div>
  );
}

window.GuessInput = GuessInput;
window.GAME_LIST = GAME_LIST;
