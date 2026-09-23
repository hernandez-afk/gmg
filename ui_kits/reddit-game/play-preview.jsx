// play-preview.jsx — phone preview shell for the Play-only build.
// Shows PlayOnly as an inline post in a phone feed, with just the
// controls needed to judge fit: top bar, post height, phone width.
const TOPBARS = [
  { id: 'auto', label: 'Auto' },
  { id: 'full', label: 'Full' },
  { id: 'compact', label: 'Compact' },
  { id: 'minimal', label: 'Minimal' },
];
const BAR_NAMES = { full: 'Full', compact: 'Compact', minimal: 'Minimal' };
const WIDTHS = [320, 360, 375, 390, 414, 430];
const HEIGHTS = [{ h: 420, label: 'Short' }, { h: 512, label: 'Tall' }, { h: 640, label: 'Large' }];

const STORE_KEY = 'moby-play-only';
const loadPrefs = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } };
const savePrefs = (p) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) {} };

function Preview() {
  const saved = React.useMemo(loadPrefs, []);
  const [w, setW] = React.useState(saved.w || 390);
  const [h, setH] = React.useState(saved.h || 512);
  const [bar, setBar] = React.useState(saved.bar || 'auto');
  const [autoShows, setAutoShows] = React.useState(null);
  React.useEffect(() => {
    const on = (e) => setAutoShows(e.detail);
    window.addEventListener('moby-topbar', on);
    return () => window.removeEventListener('moby-topbar', on);
  }, []);
  const [run, setRun] = React.useState(0);
  const [sheet, setSheet] = React.useState(false);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--phone-w', w + 20 + 'px');
    r.setProperty('--embed-h', h + 'px');
    savePrefs({ w, h, bar });
  }, [w, h, bar]);

  return (
    <React.Fragment>
      <button className="ctl-toggle" aria-label="Preview settings" aria-expanded={sheet} onClick={() => setSheet(s => !s)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>
      </button>

      <aside className={`controls${sheet ? ' is-open' : ''}`}>
        <div>
          <h1>Guess Moby’s Game · Play</h1>
          <p className="lede">Tap the guess bubble to type. Tap anywhere else to put the keyboard away.</p>
        </div>

        <div className="ctl">
          <div className="ctl-label">Top bar{bar === 'auto' && autoShows && <b>showing {BAR_NAMES[autoShows]}</b>}</div>
          <div className="seg">
            {TOPBARS.map(t => <button key={t.id} aria-pressed={bar === t.id} onClick={() => setBar(t.id)}>{t.label}</button>)}
          </div>
          {bar === 'auto' && <p className="note">Uses the fullest bar that fits, dropping to Compact then Minimal as soon as any text would be cut off.</p>}
        </div>

        <div className="ctl">
          <div className="ctl-label">Post height <b>{h}px</b></div>
          <input id="post-h" type="range" min="360" max="760" step="4" value={h} onChange={e => setH(+e.target.value)} aria-label="Post height" />
          <div className="seg">
            {HEIGHTS.map(p => <button key={p.h} aria-pressed={h === p.h} onClick={() => setH(p.h)}>{p.label} · {p.h}</button>)}
          </div>
        </div>

        <div className="ctl only-desktop">
          <div className="ctl-label">Phone width <b>{w}px</b></div>
          <div className="seg">
            {WIDTHS.map(v => <button key={v} aria-pressed={w === v} onClick={() => setW(v)}>{v}</button>)}
          </div>
        </div>

        <div className="seg"><button onClick={() => { setRun(r => r + 1); setSheet(false); }}>↺ Restart</button></div>
        <p className="note">Today’s answer is Sonic The Hedgehog 2, if you want to see a win.</p>
      </aside>

      <div className="phone">
        <div className="statusbar"><span>9:41</span><span aria-hidden="true">▂▄▆ ▮</span></div>
        <div className="appbar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          r/retrogaming
        </div>
        <div className="feed">
          <article className="post">
            <div className="post-title">Guess Moby’s Game — Day #142</div>
            <div className="embed">
              <PlayOnly key={run} topBar={bar} />
            </div>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Preview />);
