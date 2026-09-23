// play-preview.jsx — preview shell for the Play-only build.
// Shows PlayOnly inside a generic Reddit-style feed, either on a computer
// (browser window: left nav, post, community sidebar) or in the phone app,
// with numbered labels explaining each part of the game.

const VIEWS = [
  { id: 'computer', label: 'Computer' },
  { id: 'phone', label: 'Phone' },
];
const TOPBARS = [
  { id: 'auto', label: 'Auto' },
  { id: 'full', label: 'Full' },
  { id: 'compact', label: 'Compact' },
  { id: 'minimal', label: 'Minimal' },
];
const BAR_NAMES = { full: 'Full', compact: 'Compact', minimal: 'Minimal' };
const WIDTHS = [320, 360, 375, 390, 414, 430];
const HEIGHTS = [{ h: 420, label: 'Short' }, { h: 512, label: 'Tall' }, { h: 640, label: 'Large' }];

// What's what. `sel` finds the part inside the game; `only` limits it to a view.
const PARTS = [
  { n: 1, sel: '.kb-topchrome', title: 'Top bar',
    d: 'Day number, subreddit and the five clue buttons. Tap a revealed clue to look back at it. Switches between Full, Compact and Minimal to fit.' },
  { n: 2, sel: '.kb-middle', title: 'Clue',
    d: 'The clue for this round: screenshots first, then year, tagline and letters. The title always stays on one line.' },
  { n: 3, sel: '.kb-bar, input.guess', title: 'Guess box',
    d: 'Where the player types. Suggestions appear as they type, and a repeat of an earlier wrong guess is flagged instead of counted.' },
  { n: 4, sel: '.kb-dock.is-open .kb-tray', title: 'In-game keyboard', only: 'phone',
    d: 'Phones only. Opens when the guess box is tapped and folds away when the player taps anywhere else.' },
];

const STORE_KEY = 'moby-play-preview';
const loadPrefs = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } };
const savePrefs = (p) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) {} };

// Numbered pins over the game, placed from the live layout (it changes as
// the keyboard opens, the top bar switches, etc.).
function Labels({ embedRef, hot }) {
  const [spots, setSpots] = React.useState([]);
  React.useEffect(() => {
    let last = '';
    const measure = () => {
      const host = embedRef.current;
      if (!host) return;
      const box = host.getBoundingClientRect();
      const scale = box.width / host.offsetWidth || 1;
      const out = [];
      for (const p of PARTS) {
        const el = host.querySelector(p.sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.height < 2 || r.width < 2) continue;
        out.push({
          n: p.n,
          x: (r.left - box.left) / scale, y: (r.top - box.top) / scale,
          w: r.width / scale, h: r.height / scale,
        });
      }
      const key = JSON.stringify(out.map(o => [o.n, Math.round(o.x), Math.round(o.y), Math.round(o.w), Math.round(o.h)]));
      if (key !== last) { last = key; setSpots(out); }
    };
    measure();
    const id = setInterval(measure, 200);
    return () => clearInterval(id);
  }, [embedRef]);

  return (
    <div className="labels" aria-hidden="true">
      {spots.filter(s => s.n === hot).map(s => (
        <div key={`h${s.n}`} className="hot" style={{ left: s.x - 2, top: s.y - 2, width: s.w + 4, height: s.h + 4 }} />
      ))}
      {spots.map(s => (
        <span key={s.n} className="pin" style={{ left: s.x, top: s.y + Math.min(s.h / 2, 22) }}>{s.n}</span>
      ))}
    </div>
  );
}

function Game({ view, bar, run, labels, hot }) {
  const ref = React.useRef(null);
  return (
    <div className="embed" ref={ref}>
      {/* The preview stands in for the device, so it fixes the input style;
          the real game picks it automatically (keyboard="auto"). */}
      <PlayOnly key={`${run}-${view}`} topBar={bar} keyboard={view === 'phone' ? 'custom' : 'native'} />
      {labels && <Labels embedRef={ref} hot={hot} />}
    </div>
  );
}

function PhoneView(props) {
  return (
    <div className="phone">
      <div className="statusbar"><span>9:41</span><span aria-hidden="true">▂▄▆ ▮</span></div>
      <div className="appbar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        <span className="sub-icon"><img src="moby-mark.png" alt="" /></span>
        r/retrogaming
      </div>
      <div className="feed">
        <article className="post">
          <div className="post-head"><b>r/retrogaming</b> · 3h</div>
          <div className="post-title">Guess Moby’s Game — Day #142</div>
          <Game {...props} />
          <div className="actions">
            <span className="pill">▲ 2.4k ▼</span>
            <span className="pill">318 comments</span>
            <span className="pill">Share</span>
          </div>
        </article>
        <article className="post" aria-hidden="true">
          <div className="post-head"><b>r/retrogaming</b> · 5h</div>
          <div className="ghost" style={{ width: '70%' }} />
          <div className="ghost-img" />
        </article>
      </div>
      <div className="tabbar" aria-hidden="true"><span /><span /><span /><span /><span /></div>
    </div>
  );
}

// Fixed-size desktop mock, scaled down to whatever room the stage has.
function ComputerView(props) {
  const fitRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useLayoutEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / 1180));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="desk-fit" ref={fitRef} style={{ height: 800 * scale }}>
      <div className="desk-scale" style={{ transform: `scale(${scale})` }}>
        <div className="browser">
          <div className="chrome" aria-hidden="true">
            <div className="dots"><i /><i /><i /></div>
            <div className="url">r/retrogaming</div>
          </div>
          <div className="site-head" aria-hidden="true">
            <span className="site-mark" />
            <div className="search">Search r/retrogaming</div>
            <span className="avatar" />
          </div>
          <div className="site-body">
            <nav className="nav" aria-hidden="true">
              <a><i />Home</a>
              <a><i />Popular</a>
              <a><i />Explore</a>
              <h4>Communities</h4>
              <a className="on"><i style={{ background: 'var(--light-moby-blue)' }} />r/retrogaming</a>
              <a><i />r/gamecollecting</a>
              <a><i />r/crtgaming</a>
              <a><i />r/SEGAGENESIS</a>
            </nav>
            <div className="desk-main">
              <article className="desk-post">
                <div className="post-head"><span className="sub-icon"><img src="moby-mark.png" alt="" /></span><b>r/retrogaming</b> · 3h</div>
                <div className="post-title">Guess Moby’s Game — Day #142</div>
                <Game {...props} />
                <div className="actions">
                  <span className="pill">▲ 2.4k ▼</span>
                  <span className="pill">318 comments</span>
                  <span className="pill">Share</span>
                </div>
              </article>
              <aside className="side" aria-hidden="true">
                <div className="side-card">
                  <h3>r/retrogaming</h3>
                  <p>Old games, old hardware, and the stories behind them.</p>
                  <div className="stats">
                    <div><b>1.2M</b><span>members</span></div>
                    <div><b>4.8k</b><span>online</span></div>
                  </div>
                </div>
                <div className="side-card">
                  <h3>Daily game</h3>
                  <div className="rule">Guess Moby’s Game · a new game every day</div>
                  <div className="rule">Five clues, six guesses</div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Preview() {
  const saved = React.useMemo(loadPrefs, []);
  const [view, setView] = React.useState(saved.view || 'computer');
  const [w, setW] = React.useState(saved.w || 390);
  const [h, setH] = React.useState(saved.h || 512);
  const [bar, setBar] = React.useState(saved.bar || 'auto');
  const [labels, setLabels] = React.useState(saved.labels !== false);
  const [hot, setHot] = React.useState(null);
  const [run, setRun] = React.useState(0);
  const [sheet, setSheet] = React.useState(false);
  const [autoShows, setAutoShows] = React.useState(null);

  React.useEffect(() => {
    const on = (e) => setAutoShows(e.detail);
    window.addEventListener('moby-topbar', on);
    return () => window.removeEventListener('moby-topbar', on);
  }, []);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--phone-w', w + 20 + 'px');
    r.setProperty('--embed-h', h + 'px');
    savePrefs({ view, w, h, bar, labels });
  }, [view, w, h, bar, labels]);

  const props = { view, bar, run, labels, hot };

  return (
    <React.Fragment>
      <button className="ctl-toggle" aria-label="Preview settings" aria-expanded={sheet} onClick={() => setSheet(s => !s)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>
      </button>

      <aside className={`controls${sheet ? ' is-open' : ''}`}>
        <div>
          <h1>Guess Moby’s Game · Play</h1>
          <p className="lede">The daily game as a post in the feed. Switch between computer and phone to see how it sits in each.</p>
        </div>

        <div className="ctl">
          <div className="ctl-label">Device</div>
          <div className="seg big">
            {VIEWS.map(v => <button key={v.id} aria-pressed={view === v.id} onClick={() => setView(v.id)}>{v.label}</button>)}
          </div>
          <p className="note">{view === 'phone'
            ? 'Phones get the in-game keyboard.'
            : 'Computers type with their own keyboard in a normal text box.'}</p>
        </div>

        <div className="ctl">
          <div className="ctl-label">What’s what
            <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center', textTransform: 'none', letterSpacing: 0, fontWeight: 600, cursor: 'pointer' }}>
              <input id="show-labels" type="checkbox" checked={labels} onChange={e => setLabels(e.target.checked)} /> Show labels
            </label>
          </div>
          <ol className="key">
            {PARTS.map(p => {
              const off = p.only && p.only !== view;
              return (
                <li key={p.n} tabIndex={0}
                    className={`${hot === p.n ? 'is-hot' : ''}${off ? ' is-off' : ''}`}
                    onMouseEnter={() => setHot(p.n)} onMouseLeave={() => setHot(null)}
                    onFocus={() => setHot(p.n)} onBlur={() => setHot(null)}>
                  <span className="pin">{p.n}</span>
                  <span><b>{p.title}{p.n === 1 && bar === 'auto' && autoShows ? ` · ${BAR_NAMES[autoShows]}` : ''}</b><span className="d">{p.d}</span></span>
                </li>
              );
            })}
          </ol>
          <p className="note">Hover an item to outline it on the game. {view === 'phone' ? 'Tap the guess box to see the keyboard (4).' : ''}</p>
        </div>

        <div className="ctl">
          <div className="ctl-label">Top bar</div>
          <div className="seg">
            {TOPBARS.map(t => <button key={t.id} aria-pressed={bar === t.id} onClick={() => setBar(t.id)}>{t.label}</button>)}
          </div>
        </div>

        <div className="ctl">
          <div className="ctl-label">Post height <b>{h}px</b></div>
          <input id="post-h" type="range" min="360" max="760" step="4" value={h} onChange={e => setH(+e.target.value)} aria-label="Post height" />
          <div className="seg">
            {HEIGHTS.map(p => <button key={p.h} aria-pressed={h === p.h} onClick={() => setH(p.h)}>{p.label} · {p.h}</button>)}
          </div>
        </div>

        {view === 'phone' && (
          <div className="ctl only-desktop">
            <div className="ctl-label">Phone width <b>{w}px</b></div>
            <div className="seg">
              {WIDTHS.map(v => <button key={v} aria-pressed={w === v} onClick={() => setW(v)}>{v}</button>)}
            </div>
          </div>
        )}

        <div className="seg"><button onClick={() => { setRun(r => r + 1); setSheet(false); }}>↺ Restart</button></div>
        <p className="note">Today’s answer is Sonic The Hedgehog 2, if you want to see a win.</p>
      </aside>

      <main className="stage">
        {view === 'phone' ? <PhoneView {...props} /> : <ComputerView {...props} />}
        <p className="stage-cap">
          {view === 'phone'
            ? 'Phone app: the game fills the post’s width; the app sets its height.'
            : 'Computer: the game sits in the post column between the community list and the sidebar.'}
          {' '}The feed around it is a generic mock-up.
        </p>
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Preview />);
