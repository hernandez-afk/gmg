// IntroSheet.jsx — first-run popup explaining the loop
function IntroSheet({ onDismiss }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(0,91,111,0.55)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 50,
    }}>
      <div className="card stick-in" style={{
        width: 'calc(100% - 24px)', maxWidth: 380,
        background: '#fff',
        padding: '20px 22px 22px',
        margin: '0 12px 24px',
        borderRadius: 18,
        boxShadow: '0 10px 0 var(--base-secondary)',
      }}>
        <div className="dt dt-md" style={{ color: 'var(--ink-dark)', WebkitTextStroke: '0', textShadow: 'none', fontSize: 26 }}>
          How it works
        </div>
        <ol style={{ paddingLeft: 18, marginTop: 12, marginBottom: 6 }}>
          <li style={{ marginBottom: 8 }}><strong>Five clues</strong> reveal one at a time. Start with the hardest screenshot.</li>
          <li style={{ marginBottom: 8 }}>Guess any time. Wrong answers cost a clue.</li>
          <li style={{ marginBottom: 8 }}>Solve from <strong>screenshot 1</strong> for the <strong>Pixel Perfect</strong> badge.</li>
          <li>Paste your solve in the pinned comment to settle the score.</li>
        </ol>
        <button className="btn btn-primary" onClick={onDismiss} style={{ width: '100%', marginTop: 16 }}>
          Let's go
        </button>
      </div>
    </div>
  );
}

window.IntroSheet = IntroSheet;
