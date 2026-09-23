/* @ds-bundle: {"format":3,"namespace":"AtariAgreementsDesignSystem_99e888","components":[],"sourceHashes":{"assets/icons.js":"2d2110e45511","ui_kits/dashboard/Detail.jsx":"da31b399d61b","ui_kits/dashboard/Icons.jsx":"3a91f6c8e739","ui_kits/dashboard/Library.jsx":"54a585b5fe58","ui_kits/dashboard/Shell.jsx":"9ec6cc535d2d","ui_kits/dashboard/Sidebar.jsx":"f9cf2149c995","ui_kits/dashboard/app.jsx":"84b12ebf2a22","ui_kits/dashboard/data.js":"3b6029389b07"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AtariAgreementsDesignSystem_99e888 = window.AtariAgreementsDesignSystem_99e888 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/icons.js
try { (() => {
/* ============================================================
   Atari Agreements — icon set (inline SVG, currentColor)
   Single-weight line glyphs in the Atari Agreements style.
   Recolor via CSS `color` (renders in any of the 3 brand
   status colors: #2B2B2B black, #6B6257 brown, #FEFEF9 white).
   Usage (vanilla):  el.innerHTML = atariIcon('folder', 20)
   Usage (string):   `<span class="ai-ic">${atariIcon('key',18)}</span>`
   ============================================================ */
(function (root) {
  var P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12.5 19 4.5"/><path d="M16 7.5l2.5 2.5"/><path d="M14.5 9l2.5 2.5"/>',
    inbox: '<path d="M4 13l2.5-7h11L20 13"/><path d="M4 13v5h16v-5"/><path d="M4 13h4l1.5 2.5h5L16 13h4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>',
    ai: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/><path d="M19 4l.8 2.2L22 7l-2.2.8L19 10l-.8-2.2L16 7l2.2-.8z"/>',
    upload: '<path d="M12 16V5"/><path d="m7.5 9.5 4.5-4.5 4.5 4.5"/><path d="M5 16v3h14v-3"/>',
    folder: '<path d="M3 7.5C3 6.7 3.7 6 4.5 6h4l2 2.5h7c.8 0 1.5.7 1.5 1.5v7.5c0 .8-.7 1.5-1.5 1.5h-13C3.7 19 3 18.3 3 17.5z"/>',
    addfolder: '<path d="M3 7.5C3 6.7 3.7 6 4.5 6h4l2 2.5h7c.8 0 1.5.7 1.5 1.5v7.5c0 .8-.7 1.5-1.5 1.5h-13C3.7 19 3 18.3 3 17.5z"/><path d="M12 11v5M9.5 13.5h5"/>',
    download: '<path d="M12 4v10"/><path d="m7.5 10 4.5 4 4.5-4"/><path d="M5 18h14"/>',
    upload2: '<path d="M12 16V6"/><path d="m7.5 10 4.5-4 4.5 4"/><path d="M5 18h14"/>',
    share: '<circle cx="17" cy="6" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.3 10.7 6.4-3.4M8.3 13.3l6.4 3.4"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19v-1a5.5 5.5 0 0 1 11 0v1"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.1"/><path d="M17 13a5.5 5.5 0 0 1 3.5 5v1"/>',
    carrot: '<path d="m6 9 6 6 6-6"/>',
    chevright: '<path d="m9.5 6 6 6-6 6"/>',
    trash: '<path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M7 7l1 12h8l1-12"/><path d="M10.5 10.5v5M13.5 10.5v5"/>',
    edit: '<path d="M15.5 5.5 18.5 8.5 9 18l-3.5.7L6 15z"/><path d="m14 7 3 3"/>',
    edithistory: '<path d="M4 12a8 8 0 1 1 2.3 5.6"/><path d="M4 12v-4M4 12h4"/><path d="M12 8.5V12l2.5 2"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.5l3.5 2"/>',
    dates: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 9.5h16"/><path d="M8 3.5v4M16 3.5v4"/>',
    document: '<path d="M6.5 3.5h7L18 8v12.5H6.5z"/><path d="M13 3.5V8h5"/><path d="M9 12.5h6M9 15.5h6"/>',
    text: '<path d="M5 6h14"/><path d="M5 10h14"/><path d="M5 14h10"/><path d="M5 18h7"/>',
    status: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.3 2.3 4.7-4.7"/>',
    actionitems: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m4 5.5 1.3 1.3 2.2-2.6M4 11.5l1.3 1.3 2.2-2.6M4 17.5l1.3 1.3 2.2-2.6"/>',
    pin: '<path d="M12 3.5 9 6.5l1 5-4 3 .5.5h11l.5-.5-4-3 1-5z"/><path d="M12 15v5.5"/>',
    tag: '<path d="M4 11.5V5h6.5L20 14.5 14.5 20z"/><circle cx="8" cy="9" r="1.4" fill="currentColor" stroke="none"/>',
    legal: '<path d="M12 4v16M7 20h10"/><path d="M5 8h14"/><path d="m5 8 2.5-3M5 8 2.5 12.5h5z"/><path d="m19 8-2.5-3M19 8l-2.5 4.5h5z"/>',
    finance: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10"/><path d="M14.5 9.2c-.6-.8-1.6-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-1.9-.4-2.5-1.2"/>',
    counterparty: '<path d="M4 20V9l5-3 5 3v11"/><path d="M14 20V11l6 3.5V20"/><path d="M7 11h0M7 14h0M7 17h0" stroke-width="2"/>',
    business: '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 20v-3h4v3"/>',
    technical: '<path d="M9 7 4 12l5 5M15 7l5 5-5 5"/>',
    save: '<path d="M5 5h11l3 3v11H5z"/><path d="M8 5v5h7V5"/><rect x="9" y="13" width="6" height="6"/>',
    relocate: '<path d="M4 12h13"/><path d="m12 7 5 5-5 5"/><path d="M20 5v14"/>',
    syncdocs: '<path d="M5 9a7 7 0 0 1 12-3l2 2"/><path d="M19 5v4h-4"/><path d="M19 15a7 7 0 0 1-12 3l-2-2"/><path d="M5 19v-4h4"/>',
    logout: '<path d="M14 5H6v14h8"/><path d="M11 12h9"/><path d="m16 8 4 4-4 4"/>',
    minimize: '<path d="M5 12h14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    more: '<circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.8"/>',
    bell: '<path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 5 2 6 2 6H4.5s2-1 2-6z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    filter: '<path d="M4 6h16l-6 7v5l-4 2v-7z"/>'
  };
  function atariIcon(name, size, extra) {
    var p = P[name] || P.info;
    size = size || 20;
    extra = extra || '';
    return '<svg class="ai-svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' + extra + '>' + p + '</svg>';
  }
  root.atariIcon = atariIcon;
  root.ATARI_ICON_NAMES = Object.keys(P);
})(typeof window !== 'undefined' ? window : this);
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons.js", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Detail.jsx
try { (() => {
/* Detail — agreement detail: document reader + inspector panel */
function Accordion({
  c,
  open,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'acc' + (open ? ' open' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "acc-h",
    onClick: onToggle
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key",
    size: 18,
    className: "lead ai-svg",
    style: {
      color: 'var(--accent-neutral)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, c.t), /*#__PURE__*/React.createElement(Icon, {
    name: "carrot",
    size: 16,
    className: "chev"
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "acc-b"
  }, c.body, c.meta && /*#__PURE__*/React.createElement("div", {
    className: "mono"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12
  }), c.meta)));
}
function Crumbs({
  folder
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder",
    size: 15
  }), folder.map((f, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevright",
    size: 12
  })), /*#__PURE__*/React.createElement("span", null, f))));
}
function Detail({
  a,
  onBack
}) {
  const [view, setView] = React.useState('Document');
  const [open, setOpen] = React.useState(0);
  const views = [{
    id: 'Agreement',
    icon: 'key'
  }, {
    id: 'File',
    icon: 'folder'
  }, {
    id: 'Document',
    icon: 'document'
  }, {
    id: 'Text',
    icon: 'text'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head solo",
    style: {
      paddingBottom: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "pill framed",
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevright",
    size: 16,
    style: {
      transform: 'rotate(180deg)'
    }
  }), " Library"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ttl",
    style: {
      fontSize: 22,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, a.name)), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "pill framed"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: 17
  }), " Share"), /*#__PURE__*/React.createElement("button", {
    className: "pill primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 17
  }), " Export")), /*#__PURE__*/React.createElement("div", {
    className: "detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "docbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewtog"
  }, views.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    className: view === v.id ? 'on' : '',
    onClick: () => setView(v.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: v.icon,
    size: 14
  }), v.id))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    style: {
      width: 36,
      height: 36
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    style: {
      width: 36,
      height: 36
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "docpage scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "paper"
  }, /*#__PURE__*/React.createElement("h1", null, a.name), /*#__PURE__*/React.createElement("div", {
    className: "docmeta"
  }, a.type, " Agreement \xB7 ", a.counterparty, " \xB7 Effective 2026"), /*#__PURE__*/React.createElement("p", null, "This ", a.type, " Agreement (the \u201CAgreement\u201D) is entered into by and between ", /*#__PURE__*/React.createElement("b", null, "Atari, Inc."), " (\u201CLicensor\u201D) and ", /*#__PURE__*/React.createElement("b", null, a.counterparty), " (\u201CLicensee\u201D), effective as of the date of last signature below."), /*#__PURE__*/React.createElement("h2", null, "1. Grant of License"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, a.summary), " Such license is subject to the restrictions and obligations set forth in the remainder of this Agreement."), /*#__PURE__*/React.createElement("h2", null, "2. Consideration"), /*#__PURE__*/React.createElement("p", null, "In consideration of the rights granted herein, Licensee shall pay Licensor the amounts set out in ", /*#__PURE__*/React.createElement("b", null, "Schedule A"), ", with a total contract value of ", /*#__PURE__*/React.createElement("b", null, a.value), "."), /*#__PURE__*/React.createElement("h2", null, "3. Term"), /*#__PURE__*/React.createElement("p", null, "Unless earlier terminated, this Agreement shall remain in effect through its renewal date of ", /*#__PURE__*/React.createElement("b", null, a.renews), ", subject to the auto-renewal provisions herein.")))), /*#__PURE__*/React.createElement("aside", {
    className: "inspect"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ihead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.status
  }), a.ai && /*#__PURE__*/React.createElement("span", {
    className: "badge ai"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI Processed"))), /*#__PURE__*/React.createElement("div", {
    className: "ibody scroll"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ilabel"
  }, "Details"), /*#__PURE__*/React.createElement("div", {
    className: "kv"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "counterparty",
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Counterparty"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, a.counterparty)), /*#__PURE__*/React.createElement("div", {
    className: "kv"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "finance",
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Value"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, a.value)), /*#__PURE__*/React.createElement("div", {
    className: "kv"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dates",
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Renews"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, a.renews)), /*#__PURE__*/React.createElement("div", {
    className: "kv"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Type"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, a.type))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ilabel"
  }, "Shared with"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(AvatarStack, {
    parties: a.parties,
    extra: a.extra,
    size: 32
  }), /*#__PURE__*/React.createElement("button", {
    className: "pill framed",
    style: {
      padding: '6px 12px',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Invite"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ilabel"
  }, "File location"), /*#__PURE__*/React.createElement(Crumbs, {
    folder: a.folder
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ilabel"
  }, "Key clauses"), window.CLAUSES.map((c, i) => /*#__PURE__*/React.createElement(Accordion, {
    key: i,
    c: c,
    open: open === i,
    onToggle: () => setOpen(open === i ? -1 : i)
  })))))));
}
window.Detail = Detail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Detail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Icons.jsx
try { (() => {
/* Icon — inline-SVG icon (currentColor) for the dashboard kit.
   Relies on window.atariIcon from ../../assets/icons.js */
function Icon({
  name,
  size = 20,
  sw,
  style,
  className
}) {
  const svg = window.atariIcon(name, size, sw ? `stroke-width="${sw}"` : '');
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: 'inline-flex',
      flex: 'none',
      lineHeight: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svg
    }
  });
}
function Avatar({
  initial,
  size = 30,
  style
}) {
  const bg = window.AVATAR_COLORS && window.AVATAR_COLORS[initial] || window.AVATAR_COLORS && window.AVATAR_COLORS.default || '#4A2C24';
  return /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: size,
      height: size,
      background: bg,
      fontSize: size * 0.42,
      ...style
    }
  }, initial);
}
function AvatarStack({
  parties = [],
  extra = 0,
  size = 30
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "avstack"
  }, parties.map((p, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: i,
    initial: p,
    size: size
  })), extra > 0 && /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: size,
      height: size,
      background: 'var(--surface-base-3)',
      color: 'var(--text-secondary)',
      fontSize: size * 0.36,
      border: '2px solid var(--background)',
      marginLeft: -9
    }
  }, "+", extra));
}
function StatusBadge({
  status
}) {
  const map = {
    active: {
      c: 'active',
      t: 'Active'
    },
    pending: {
      c: 'pending',
      t: 'Pending'
    },
    expired: {
      c: 'expired',
      t: 'Expired'
    },
    draft: {
      c: 'draft',
      t: 'Draft'
    }
  };
  const s = map[status] || map.draft;
  return /*#__PURE__*/React.createElement("span", {
    className: 'badge ' + s.c
  }, s.c !== 'draft' && /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'currentColor'
    }
  }), s.t);
}
window.Icon = Icon;
window.Avatar = Avatar;
window.AvatarStack = AvatarStack;
window.StatusBadge = StatusBadge;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Library.jsx
try { (() => {
/* Library — agreement list / table view */
function Library({
  onOpen,
  sidebar
}) {
  const [filter, setFilter] = React.useState('All');
  const [selected, setSelected] = React.useState({});
  const filters = ['All', 'Active', 'Pending', 'Expired', 'AI Processed'];
  const rows = window.AGREEMENTS.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'AI Processed') return a.ai;
    return a.status === filter.toLowerCase();
  });
  const toggle = (id, e) => {
    e.stopPropagation();
    setSelected(s => ({
      ...s,
      [id]: !s[id]
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ttl"
  }, sidebar === 'All Agreements' ? 'Agreement Library' : sidebar), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, rows.length, " agreements \xB7 synced from Google Drive 2026")), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "pill framed"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 17
  }), " Sort"), /*#__PURE__*/React.createElement("button", {
    className: "pill primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 17
  }), " New Agreement")), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    className: 'chip' + (filter === f ? ' on' : ''),
    onClick: () => setFilter(f)
  }, f === 'AI Processed' && /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }), f))), /*#__PURE__*/React.createElement("div", {
    className: "tablewrap scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "thead"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "Agreement"), /*#__PURE__*/React.createElement("span", null, "Counterparty"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Value"), /*#__PURE__*/React.createElement("span", null, "Renews"), /*#__PURE__*/React.createElement("span", null)), rows.map(a => /*#__PURE__*/React.createElement("div", {
    className: "trow",
    key: a.id,
    onClick: () => onOpen(a)
  }, /*#__PURE__*/React.createElement("span", {
    className: 'checkbox' + (selected[a.id] ? ' on' : ''),
    onClick: e => toggle(a.id, e)
  }, selected[a.id] && /*#__PURE__*/React.createElement(Icon, {
    name: "status",
    size: 13,
    sw: 2.4
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "docicon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, a.name), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, a.type, a.ai && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 12
  }), " AI summary")))), /*#__PURE__*/React.createElement("span", {
    className: "cell-txt",
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, a.counterparty), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.status
  })), /*#__PURE__*/React.createElement("span", {
    className: "cell-txt"
  }, a.value), /*#__PURE__*/React.createElement("span", {
    className: "cell-mut"
  }, a.renews), /*#__PURE__*/React.createElement("button", {
    className: "rowmore",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 18
  }))))));
}
window.Library = Library;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Library.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Shell.jsx
try { (() => {
/* Shell — top header bar: brand, nav, AI search, actions */
function Shell({
  nav,
  setNav,
  onAsk,
  onUpload,
  searchFocus,
  setSearchFocus,
  query,
  setQuery
}) {
  const items = ['Home', 'Agreements', 'Alerts', 'Action Items'];
  return /*#__PURE__*/React.createElement("header", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/atari-logo-red.png",
    alt: "Atari"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wm"
  }, "Agreements")), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it,
    className: nav === it ? 'active' : '',
    onClick: () => setNav(it)
  }, it))), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: 'aisearch' + (searchFocus ? ' focus' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 20
  })), /*#__PURE__*/React.createElement("input", {
    value: query,
    placeholder: "Do you have any questions? I can help.",
    onFocus: () => setSearchFocus(true),
    onChange: e => setQuery(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && query.trim()) onAsk(query);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 19
  }))), /*#__PURE__*/React.createElement("div", {
    className: "headact"
  }, /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    title: "Alerts"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 21
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  })), /*#__PURE__*/React.createElement("button", {
    className: "avatar",
    style: {
      width: 38,
      height: 38,
      background: 'var(--atari-red)',
      fontSize: 15
    },
    title: "Account"
  }, "U"), /*#__PURE__*/React.createElement("button", {
    className: "upload",
    title: "Upload agreement",
    onClick: onUpload
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 20
  }))));
}
window.Shell = Shell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
/* Sidebar — left navigation rail */
function Sidebar({
  active,
  setActive
}) {
  const main = [{
    id: 'All Agreements',
    icon: 'key',
    count: 8
  }, {
    id: 'Shared with me',
    icon: 'people',
    count: 12
  }, {
    id: 'Action Items',
    icon: 'actionitems',
    count: 3
  }, {
    id: 'Recently Viewed',
    icon: 'clock',
    count: null
  }];
  const folders = [{
    id: 'End-User Licenses',
    icon: 'folder'
  }, {
    id: 'Technology',
    icon: 'folder'
  }, {
    id: 'Legal',
    icon: 'folder'
  }, {
    id: 'Vendors',
    icon: 'folder'
  }, {
    id: 'Merchandising',
    icon: 'folder'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar scroll"
  }, main.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: 'side-item' + (active === m.id ? ' active' : ''),
    onClick: () => setActive(m.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: 19
  }), /*#__PURE__*/React.createElement("span", null, m.id), m.count != null && /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, m.count))), /*#__PURE__*/React.createElement("div", {
    className: "side-h"
  }, "Folders"), folders.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    className: 'side-item' + (active === f.id ? ' active' : ''),
    onClick: () => setActive(f.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 19
  }), /*#__PURE__*/React.createElement("span", null, f.id))), /*#__PURE__*/React.createElement("div", {
    className: "side-h"
  }, "Sync"), /*#__PURE__*/React.createElement("div", {
    className: "side-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "syncdocs",
    size: 19
  }), /*#__PURE__*/React.createElement("span", null, "Google Drive"), /*#__PURE__*/React.createElement("span", {
    className: "count",
    style: {
      color: 'var(--positive-hover)'
    }
  }, "\u25CF")));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/app.jsx
try { (() => {
/* App — top-level state: screen routing, AI search panel, upload modal, toast */
function App() {
  const [nav, setNav] = React.useState('Agreements');
  const [sidebar, setSidebar] = React.useState('All Agreements');
  const [open, setOpen] = React.useState(null); // open agreement (detail)
  const [searchFocus, setSearchFocus] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [aiPanel, setAiPanel] = React.useState(null); // {q}
  const [upload, setUpload] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };
  const ask = q => {
    setAiPanel({
      q
    });
  };
  const closeAi = () => {
    setAiPanel(null);
    setSearchFocus(false);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Shell, {
    nav: nav,
    setNav: setNav,
    onAsk: ask,
    onUpload: () => setUpload(true),
    searchFocus: searchFocus,
    setSearchFocus: setSearchFocus,
    query: query,
    setQuery: setQuery
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: sidebar,
    setActive: s => {
      setSidebar(s);
      setOpen(null);
    }
  }), open ? /*#__PURE__*/React.createElement(Detail, {
    a: open,
    onBack: () => setOpen(null)
  }) : /*#__PURE__*/React.createElement(Library, {
    sidebar: sidebar,
    onOpen: a => setOpen(a)
  })), aiPanel && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "scrim",
    onClick: closeAi
  }), /*#__PURE__*/React.createElement("div", {
    className: "aipanel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aihdr"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 16
  }), " Atari AI \xB7 answering your question"), /*#__PURE__*/React.createElement("div", {
    className: "aians"
  }, aiPanel.q.toLowerCase().includes('nintendo') || aiPanel.q.toLowerCase().includes('expire') ? /*#__PURE__*/React.createElement("span", null, "The ", /*#__PURE__*/React.createElement("b", null, "Nintendo Switch Title Distribution License"), " renews on ", /*#__PURE__*/React.createElement("b", null, "Jan 14, 2026"), ". It is currently ", /*#__PURE__*/React.createElement("b", null, "Active"), " with auto-renewal enabled, so it will not lapse unless 90 days written notice is given.") : /*#__PURE__*/React.createElement("span", null, "I found ", /*#__PURE__*/React.createElement("b", null, window.AGREEMENTS.length, " agreements"), " related to \u201C", aiPanel.q || 'your query', "\u201D. The most relevant are listed below \u2014 open one to see the AI summary and key clauses.")), /*#__PURE__*/React.createElement("div", {
    className: "src"
  }, window.AGREEMENTS.slice(0, 3).map(a => /*#__PURE__*/React.createElement("div", {
    className: "aisrc",
    key: a.id,
    onClick: () => {
      setOpen(a);
      closeAi();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "docicon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 11,
      color: 'var(--text-secondary)'
    }
  }, a.counterparty, " \xB7 ", a.renews)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevright",
    size: 15,
    style: {
      color: 'var(--text-secondary)'
    }
  })))))), upload && /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scrim",
    onClick: () => setUpload(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal",
    style: {
      position: 'relative',
      zIndex: 41
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "Upload agreement")), /*#__PURE__*/React.createElement("div", {
    className: "mb"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)',
      marginBottom: 14,
      fontFamily: 'var(--font-ui)'
    }
  }, "Atari AI will read the document and extract clauses, dates and counterparties automatically."), /*#__PURE__*/React.createElement("div", {
    className: "dropzone"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 28
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-primary)',
      fontSize: 14
    }
  }, "Drag a PDF here, or browse"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12
    }
  }, "or connect a folder from Google Drive"))), /*#__PURE__*/React.createElement("div", {
    className: "mf"
  }, /*#__PURE__*/React.createElement("button", {
    className: "pill framed",
    onClick: () => setUpload(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "pill primary",
    onClick: () => {
      setUpload(false);
      showToast('Agreement uploaded · AI processing started');
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 16
  }), " Upload & analyze")))), toast && /*#__PURE__*/React.createElement("div", {
    className: "toast"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "status",
    size: 18
  }), " ", toast));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/data.js
try { (() => {
/* Sample data for the Atari Agreements dashboard UI kit (fake) */
window.AGREEMENTS = [{
  id: 'a1',
  name: 'Nintendo Switch Title Distribution License',
  type: 'Distribution',
  icon: 'document',
  counterparty: 'Nintendo Co., Ltd.',
  status: 'active',
  ai: true,
  value: '$2.4M',
  renews: 'Jan 14, 2026',
  parties: ['A', 'J', 'M'],
  extra: 4,
  folder: ['Documents from Google Drive 2026', 'End-User Licenses'],
  summary: 'Worldwide, non-exclusive license to distribute up to three Atari catalog titles on the Nintendo eShop through the Term.'
}, {
  id: 'a2',
  name: 'Unreal Engine Technology License — Atari Reboot',
  type: 'Technology',
  icon: 'technical',
  counterparty: 'Epic Games, Inc.',
  status: 'active',
  ai: true,
  value: '$880K',
  renews: 'Mar 2, 2027',
  parties: ['P', 'J'],
  extra: 2,
  folder: ['Documents from Google Drive 2026', 'Technology'],
  summary: 'Royalty-bearing engine license for use of Unreal Engine 5 across two in-development Atari titles.'
}, {
  id: 'a3',
  name: 'Master Services Agreement — Cloud Hosting',
  type: 'Services',
  icon: 'business',
  counterparty: 'Amazon Web Services',
  status: 'pending',
  ai: false,
  value: '$310K / yr',
  renews: '—',
  parties: ['M'],
  extra: 0,
  folder: ['Documents from Google Drive 2026', 'Vendors'],
  summary: 'Managed cloud infrastructure and CDN services supporting Atari online multiplayer backends.'
}, {
  id: 'a4',
  name: 'Trademark Coexistence Agreement',
  type: 'Legal',
  icon: 'legal',
  counterparty: 'Infogrames Entertainment',
  status: 'expired',
  ai: true,
  value: '—',
  renews: 'Lapsed',
  parties: ['A', 'J'],
  extra: 1,
  folder: ['Documents from Google Drive 2026', 'Legal'],
  summary: 'Defines the boundaries of trademark use for the Atari mark across overlapping European territories.'
}, {
  id: 'a5',
  name: 'Music Synchronization License — Arcade OST',
  type: 'Licensing',
  icon: 'document',
  counterparty: 'Sony Music Publishing',
  status: 'active',
  ai: false,
  value: '$54K',
  renews: 'Sep 30, 2026',
  parties: ['J', 'M'],
  extra: 0,
  folder: ['Documents from Google Drive 2026', 'End-User Licenses', 'Memorandums'],
  summary: 'Synchronization rights to four compositions for use in the remastered arcade soundtrack collection.'
}, {
  id: 'a6',
  name: 'Non-Disclosure Agreement — Hardware Partner',
  type: 'Legal',
  icon: 'legal',
  counterparty: 'Confidential',
  status: 'draft',
  ai: false,
  value: '—',
  renews: 'Draft',
  parties: ['P'],
  extra: 0,
  folder: ['Documents from Google Drive 2026', 'Legal'],
  summary: 'Mutual NDA covering exploratory discussions for a next-generation Atari hardware collaboration.'
}, {
  id: 'a7',
  name: 'Co-Publishing & Revenue Share Agreement',
  type: 'Distribution',
  icon: 'finance',
  counterparty: 'Bandai Namco',
  status: 'active',
  ai: true,
  value: '$1.1M',
  renews: 'Dec 1, 2026',
  parties: ['A', 'M', 'J'],
  extra: 3,
  folder: ['Documents from Google Drive 2026', 'End-User Licenses'],
  summary: 'Joint co-publishing arrangement with a 60/40 net revenue split for the Asian market release.'
}, {
  id: 'a8',
  name: 'Brand Merchandising License — Apparel',
  type: 'Licensing',
  icon: 'tag',
  counterparty: 'Hot Topic, Inc.',
  status: 'pending',
  ai: false,
  value: '$220K',
  renews: '—',
  parties: ['M'],
  extra: 1,
  folder: ['Documents from Google Drive 2026', 'Merchandising'],
  summary: 'Non-exclusive merchandising license to produce Atari-branded apparel for North American retail.'
}];
window.AVATAR_COLORS = {
  A: '#597958',
  J: '#3A4A6A',
  M: '#892C1B',
  P: '#6929C4',
  L: '#C1A063',
  default: '#4A2C24'
};
window.CLAUSES = [{
  t: 'Grant of License',
  body: 'Licensor grants to Licensee a non-exclusive, worldwide, non-transferable license to distribute the Licensed Titles through the authorized channels for the duration of the Term.',
  meta: 'RENEWS · JAN 2026'
}, {
  t: 'Royalties & Payment',
  body: 'Licensee shall pay Licensor a royalty equal to fifteen percent (15%) of Net Receipts, payable quarterly within thirty (30) days of each calendar quarter close.',
  meta: 'REVIEWED BY · LEGAL'
}, {
  t: 'Term & Termination',
  body: 'This Agreement commences on the Effective Date and continues for an initial term of three (3) years, renewing automatically unless either party provides ninety (90) days written notice.',
  meta: 'AUTO-RENEW · ENABLED'
}, {
  t: 'Confidentiality',
  body: 'Each party agrees to hold the other party\u2019s Confidential Information in strict confidence and not to disclose it to any third party without prior written consent.',
  meta: ''
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/data.js", error: String((e && e.message) || e) }); }

})();
