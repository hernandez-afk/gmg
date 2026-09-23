// PlayOnly.jsx — the phone build: just the Play screen.
// No splash, intro, badges, solve/share, leaderboard or fail screens —
// only the clue board and guess keyboard, plus a small end card so a
// round can finish and start over. Reuses PlayBoard / CLUES / isCorrect
// from App.jsx.
function PlayOnly({ topBar = 'compact', subreddit = 'retrogaming', day = 142 }) {
  const [revealed, setRevealed] = React.useState(1);
  const [attempts, setAttempts] = React.useState([]);
  const [shake, setShake] = React.useState(false);
  const [result, setResult] = React.useState(null); // null | 'solved' | 'out'
  const [round, setRound] = React.useState(0);

  const handleGuess = (text) => {
    if (isCorrect(text)) {
      setAttempts(a => [...a, { kind: 'solve', guess: text }]);
      setTimeout(() => setResult('solved'), 300);
      return;
    }
    const next = [...attempts, { kind: 'miss', guess: text, level: revealed }];
    setAttempts(next);
    setShake(true);
    setTimeout(() => setShake(false), 420);
    setRevealed(r => Math.min(CLUES.length, r + 1));
    if (next.filter(a => a.kind === 'miss').length >= 6) setTimeout(() => setResult('out'), 500);
  };

  const restart = () => {
    setRevealed(1); setAttempts([]); setResult(null); setRound(r => r + 1);
  };

  const tries = attempts.length;

  return (
    <div data-mode="mode-1" className="frame">
      <PlayBoard
        key={round}
        user="megadrive_dad"
        subreddit={subreddit}
        day={day}
        revealed={revealed}
        attempts={attempts}
        shake={shake}
        onGuess={handleGuess}
        onReveal={() => {}}
        keyboard="custom"
        topBar={topBar}
      />
      {result && (
        <div className="play-end">
          <div className="card stick-in play-end-card">
            <div className="dt" style={{ fontSize: 26, color: 'var(--ink-dark)', WebkitTextStroke: 0, textShadow: 'none' }}>
              {result === 'solved' ? 'You got it!' : 'Out of guesses'}
            </div>
            <p className="play-end-copy">
              {result === 'solved'
                ? <>It was <strong>{ANSWER_DISPLAY}</strong> — solved in {tries} {tries === 1 ? 'guess' : 'guesses'}.</>
                : <>It was <strong>{ANSWER_DISPLAY}</strong>.</>}
            </p>
            <button className="btn btn-primary" onClick={restart} style={{ width: '100%' }}>Play again</button>
          </div>
        </div>
      )}
    </div>
  );
}

window.PlayOnly = PlayOnly;
