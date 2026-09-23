// Leaderboard.jsx — top performers + badge showcase
const LEADERBOARD = [
  { rank: 1, user: 'pixel_archivist',  solveCount: 142, fastestClue: 1, streak: 23, badges: ['pixel-perfect', 'streak-5', 'first-blood'], avatarColor: '#7193FF' },
  { rank: 2, user: 'crt_sommelier',    solveCount: 139, fastestClue: 1, streak: 14, badges: ['pixel-perfect', 'first-blood'],              avatarColor: '#FF8717' },
  { rank: 3, user: 'megadrive_dad',    solveCount: 138, fastestClue: 2, streak: 9,  badges: ['sharpshooter', 'streak-5', 'first-blood'],   avatarColor: '#0079D3' },
  { rank: 4, user: 'cart_blower',      solveCount: 132, fastestClue: 2, streak: 5,  badges: ['sharpshooter', 'streak-5'],                  avatarColor: '#1f8f3b' },
  { rank: 5, user: 'pal_region_only',  solveCount: 128, fastestClue: 2, streak: 2,  badges: ['sharpshooter', 'tribe-troll'],               avatarColor: '#b73a3a' },
  { rank: 6, user: 'rgb_modder',       solveCount: 121, fastestClue: 3, streak: 4,  badges: ['one-and-done'],                avatarColor: '#7193FF' },
  { rank: 7, user: 'gen_gamer',        solveCount: 117, fastestClue: 3, streak: 1,  badges: ['one-and-done'],                              avatarColor: '#FF4500' },
  { rank: 8, user: 'cassette_kid',     solveCount: 110, fastestClue: 3, streak: 0,  badges: ['one-and-done', 'tribe-troll'],               avatarColor: '#0079D3' },
];

function Leaderboard({ onBack, currentUser }) {
  const [tab, setTab] = React.useState('global'); // 'global' | 'sub' | 'wrong' | 'badges'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: 'var(--base)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px 8px' }}>
        <button className="btn" onClick={onBack} style={{ padding: '8px 12px', fontSize: 13 }}>← Back</button>
        <div className="dt dt-md" style={{ fontSize: 28, marginLeft: 'auto' }}>Leaderboard</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '6px 18px 0' }}>
        {[
          { id: 'global', label: 'r/retrogaming' },
          { id: 'sub',    label: 'This week' },
          { id: 'wrong',  label: 'Wrong guesses' },
          { id: 'badges', label: 'Badges' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            border: '2px solid var(--base-secondary)',
            background: tab === t.id ? 'var(--accent)' : '#fff',
            color: tab === t.id ? 'var(--text)' : 'var(--ink-dark)',
            WebkitTextStroke: tab === t.id ? '1px var(--base-secondary)' : '0',
            paintOrder: 'stroke fill',
            font: '800 11px/1 var(--font-ui)',
            padding: '8px 10px', borderRadius: '10px 10px 0 0',
            boxShadow: tab === t.id ? 'none' : 'inset 0 -2px 0 var(--base-secondary)',
            cursor: 'pointer', flex: 1,
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 14px 24px', flex: 1 }}>
        {tab === 'badges' ? (
          <BadgesCatalog earnedIds={['sharpshooter', 'streak-5']} />
        ) : tab === 'wrong' ? (
          <WrongGuessesPanel items={[
            { name: 'Castlevania', pct: 12 },
            { name: "Ghouls 'n Ghosts", pct: 8 },
            { name: 'Strider', pct: 5 },
            { name: 'Shinobi III', pct: 3 },
          ]} subreddit="retrogaming" />
        ) : (
          <LeaderboardTable rows={LEADERBOARD} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}

function LeaderboardTable({ rows, currentUser }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '34px 1fr 56px 56px',
        gap: 8, padding: '10px 14px',
        background: 'rgba(0,91,111,0.08)',
        font: '700 10px/1 var(--font-ui)', color: 'var(--ink-on-light)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        <span>#</span><span>Redditor</span><span style={{ textAlign: 'right' }}>Solves</span><span style={{ textAlign: 'right' }}>Streak</span>
      </div>
      {rows.map(r => {
        const me = r.user === currentUser;
        return (
          <div key={r.rank} style={{
            display: 'grid', gridTemplateColumns: '34px 1fr 56px 56px',
            gap: 8, padding: '10px 14px',
            alignItems: 'center',
            background: me ? 'rgba(255,174,23,0.18)' : '#fff',
            borderTop: '1px dashed rgba(0,91,111,0.14)',
          }}>
            <span style={{ font: '800 14px/1 var(--font-ui)', color: r.rank <= 3 ? 'var(--accent-secondary)' : 'var(--ink-on-light)' }}>
              {r.rank}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', background: r.avatarColor,
                border: '1.5px solid var(--base-secondary)', flex: 'none',
              }}/>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ font: '800 13px/1.1 var(--font-ui)', color: 'var(--ink-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  u/{r.user}{me && <span style={{ color: 'var(--ink-on-light)', fontWeight: 700 }}> · you</span>}
                </div>
                <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
                  {r.badges.slice(0, 4).map(bid => {
                    const b = BADGES.find(x => x.id === bid);
                    if (!b) return null;
                    const tc = TIER_COLORS[b.tier];
                    return (
                      <div key={bid} title={b.name} style={{
                        width: 14, height: 14, borderRadius: '50%',
                        background: tc.fill, border: '1px solid ' + tc.stroke,
                        display: 'grid', placeItems: 'center',
                        font: '800 8px/1 var(--font-ui)', color: tc.stroke,
                      }}>{b.icon}</div>
                    );
                  })}
                </div>
              </div>
            </div>
            <span style={{ font: '800 13px/1 var(--font-ui)', color: 'var(--ink-dark)', textAlign: 'right' }}>
              {r.solveCount}
            </span>
            <span style={{ font: '700 12px/1 var(--font-ui)', color: 'var(--ink-on-light)', textAlign: 'right', display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M12 2c-.5 2.5-1.7 4-3 5.5-1.5 1.7-3 3.4-3 6 0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.5-1.6-3.9-2.8-5C14 7.4 13 6.2 13 4c-1.5 1-2.2 2.7-2.2 4.5C9.8 7 10.5 4.5 12 2z"/>
              </svg>
              {r.streak}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BadgesCatalog({ earnedIds = [] }) {
  return (
    <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr', paddingTop: 8 }}>
      {BADGES.map(b => (
        <BadgeChip key={b.id} badge={b} size="lg" faded={!earnedIds.includes(b.id)} />
      ))}
    </div>
  );
}

window.Leaderboard = Leaderboard;
window.LEADERBOARD = LEADERBOARD;
