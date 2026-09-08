import { CATEGORIES, FORMATS, PORTIONS, PRESETS } from '../data/nutrition.js';

const ITEMS = new Map();
for (const cat of CATEGORIES) for (const it of cat.items) ITEMS.set(it.id, { ...it, cat: cat.id });

const MODE = new Map(CATEGORIES.map((c) => [c.id, c.mode]));
const FMT = new Map(FORMATS.map((f) => [f.id, f]));
const PORT = new Map(PORTIONS.map((p) => [p.id, p.mult]));
const KEYS = ['cal', 'p', 'c', 'f', 'fib', 'na', 'sug', 'sat'];

export const state = {
  format: 'bowl',
  single: { protein: null, rice: null, beans: null },
  multi: { salsa: new Set(), toppings: new Set(), sides: new Set() },
  portions: new Map(),
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function selectedIds() {
  const out = [];
  for (const cat of CATEGORIES) {
    if (MODE.get(cat.id) === 'single') {
      if (state.single[cat.id]) out.push(state.single[cat.id]);
    } else {
      for (const id of state.multi[cat.id]) out.push(id);
    }
  }
  return out;
}

function round(key, n) {
  if (key === 'cal' || key === 'na') return Math.round(n);
  return Math.round(n * 10) / 10;
}

export function totals() {
  const fmt = FMT.get(state.format);
  const scale = fmt.scale || 1;
  const t = Object.fromEntries(KEYS.map((k) => [k, 0]));
  const lines = [];

  if (fmt.base) {
    for (const k of KEYS) t[k] += fmt.base[k];
    lines.push({ name: fmt.base.name, cal: fmt.base.cal, fixed: true });
  }

  for (const id of selectedIds()) {
    const it = ITEMS.get(id);
    if (!it || it.cal === 0) {
      if (it && it.cal === 0) lines.push({ name: it.name, cal: 0, fixed: true });
      continue;
    }
    const pid = state.portions.get(id) || 'normal';
    const mult = PORT.get(pid) * scale;
    for (const k of KEYS) t[k] += it[k] * mult;
    lines.push({
      name: it.name,
      portion: pid === 'normal' ? '' : PORTIONS.find((p) => p.id === pid).label,
      cal: Math.round(it.cal * mult),
    });
  }

  for (const k of KEYS) t[k] = round(k, t[k]);
  return { t, lines, scale };
}

function contextLine(t, count) {
  if (!count) return 'Pick a protein and a base to start.';
  const pct = Math.round((t.cal / 2000) * 100);
  const perCal = t.cal > 0 ? (t.p / t.cal) * 100 : 0;
  const bits = [`About ${pct}% of a 2,000-calorie day`];
  if (t.p >= 5) bits.push(`${perCal.toFixed(1)} g protein per 100 calories`);
  if (t.na >= 2300) bits.push('over a full day of sodium');
  else if (t.na >= 1500) bits.push('most of a day of sodium');
  return bits.join(' · ') + '.';
}

function render() {
  const { t, lines } = totals();
  const count = lines.filter((l) => l.cal > 0).length;

  if (!CACHE) buildCache();
  for (const k of KEYS) {
    const el = CACHE.metrics[k];
    if (el) el.textContent = k === 'na' || k === 'cal' ? t[k].toLocaleString('en-US') : String(t[k]);
  }
  const naDv = Math.round((t.na / 2300) * 100);
  const fibDv = Math.round((t.fib / 28) * 100);
  $('#t-na-dv').textContent = String(naDv);
  $('#t-fib-dv').textContent = String(fibDv);
  $('#dv-bar-na').style.width = Math.min(100, naDv) + '%';
  $('#dv-bar-fib').style.width = Math.min(100, fibDv) + '%';
  $('#cal-context').textContent = contextLine(t, count);

  // macro mix as a share of calories (4/4/9 kcal per gram)
  const kcal = { p: t.p * 4, c: t.c * 4, f: t.f * 9 };
  const kTotal = kcal.p + kcal.c + kcal.f;
  for (const k of ['p', 'c', 'f']) {
    const share = kTotal > 0 ? (kcal[k] / kTotal) * 100 : 0;
    $('#seg-' + k).style.width = share + '%';
    $('#pct-' + k).textContent = String(Math.round(share));
  }

  const chip = $('#head-chip');
  if (chip) {
    chip.dataset.cal = String(t.cal);
    $('#head-chip-cal').textContent = t.cal.toLocaleString('en-US');
    syncChip();
  }

  const list = $('#build-list');
  if (!lines.length) {
    list.innerHTML = '<li class="build-empty">Nothing selected yet.</li>';
  } else {
    list.innerHTML = lines
      .map((l) => {
        const name = l.portion ? `${l.name} <em>(${l.portion})</em>` : l.name;
        return `<li><span>${name}</span><span class="bl-cal">${l.cal} cal</span></li>`;
      })
      .join('');
  }

  const mb = CACHE.mobile;
  if (mb.cal) {
    mb.cal.textContent = t.cal.toLocaleString('en-US');
    mb.p.textContent = String(t.p);
    mb.c.textContent = String(t.c);
    mb.f.textContent = String(t.f);
    mb.na.textContent = t.na.toLocaleString('en-US');
  }

  syncButtons();
}

// The header chip appears only once a meal is started AND the results panel
// has scrolled out of view, so it never competes with the panel itself.
// Measured directly rather than with an IntersectionObserver: the observer
// only reports on change, so any event that perturbs viewport metrics can
// leave the chip stuck in a stale state.
function panelOnScreen() {
  const panel = $('.results-inner');
  if (!panel) return true;
  const r = panel.getBoundingClientRect();
  const headerH = 52;
  return r.bottom > headerH + 8 && r.top < window.innerHeight;
}

function syncChip() {
  const chip = $('#head-chip');
  if (!chip) return;
  chip.hidden = panelOnScreen() || Number(chip.dataset.cal || 0) <= 0;
}

// DOM references are collected once. Re-querying the whole builder on every
// keystroke was the dominant cost in the interaction path.
let CACHE = null;
function buildCache() {
  CACHE = {
    formats: $$('.fmt'),
    note: $('#format-note'),
    cats: $$('.cat').map((fs) => ({
      id: fs.dataset.cat,
      single: MODE.get(fs.dataset.cat) === 'single',
      items: $$('.item', fs).map((wrap) => {
        const btn = $('.pick', wrap);
        const portions = $('.portions', wrap);
        return {
          id: btn.dataset.id,
          btn,
          portions,
          portionBtns: portions ? $$('.portion', portions) : [],
          checked: null,
          hidden: null,
          portion: null,
        };
      }),
    })),
    metrics: Object.fromEntries(KEYS.map((k) => [k, document.getElementById('t-' + k)])),
    mobile: {
      cal: document.getElementById('m-cal'),
      p: document.getElementById('m-p'),
      c: document.getElementById('m-c'),
      f: document.getElementById('m-f'),
      na: document.getElementById('m-na'),
    },
  };
}

function syncButtons() {
  if (!CACHE) buildCache();

  for (const b of CACHE.formats) {
    const on = b.dataset.format === state.format;
    b.setAttribute('aria-checked', String(on));
    b.tabIndex = on ? 0 : -1;
  }
  CACHE.note.textContent = FMT.get(state.format).blurb;

  const active = new Set(selectedIds());
  for (const cat of CACHE.cats) {
    let firstFocusable = null;
    for (const it of cat.items) {
      const on = active.has(it.id);
      // Only touch the DOM when the value actually changed.
      if (it.checked !== on) {
        it.btn.setAttribute('aria-checked', String(on));
        it.checked = on;
      }
      if (cat.single) {
        if (on) firstFocusable = it.btn;
        it.btn.tabIndex = -1;
      }
      if (it.portions) {
        if (it.hidden !== !on) {
          it.portions.hidden = !on;
          it.hidden = !on;
        }
        const pid = state.portions.get(it.id) || 'normal';
        if (it.portion !== pid) {
          for (const pb of it.portionBtns) {
            pb.setAttribute('aria-pressed', String(pb.dataset.portion === pid));
          }
          it.portion = pid;
        }
      }
    }
    if (cat.single) {
      (firstFocusable || cat.items[0].btn).tabIndex = 0;
    }
  }
}

function toggle(catId, id) {
  if (MODE.get(catId) === 'single') {
    state.single[catId] = state.single[catId] === id ? null : id;
  } else {
    const set = state.multi[catId];
    if (set.has(id)) set.delete(id);
    else set.add(id);
  }
}

export function applyPreset(preset) {
  state.format = 'bowl';
  state.single = { protein: null, rice: null, beans: null };
  state.multi = { salsa: new Set(), toppings: new Set(), sides: new Set() };
  state.portions = new Map();
  for (const [cat, val] of Object.entries(preset.picks)) {
    if (Array.isArray(val)) state.multi[cat] = new Set(val);
    else state.single[cat] = val;
  }
  if (preset.portions) for (const [id, p] of Object.entries(preset.portions)) state.portions.set(id, p);
}

export function encode() {
  const parts = [state.format];
  for (const id of selectedIds()) {
    const p = state.portions.get(id) || 'normal';
    parts.push(p === 'normal' ? id : `${id}!${p}`);
  }
  return parts.join('_');
}

export function decode(str) {
  const parts = str.split('_').filter(Boolean);
  if (!parts.length) return false;
  const fmt = parts.shift();
  if (!FMT.has(fmt)) return false;
  state.format = fmt;
  state.single = { protein: null, rice: null, beans: null };
  state.multi = { salsa: new Set(), toppings: new Set(), sides: new Set() };
  state.portions = new Map();
  for (const raw of parts) {
    const [id, portion] = raw.split('!');
    const it = ITEMS.get(id);
    if (!it) continue;
    if (MODE.get(it.cat) === 'single') state.single[it.cat] = id;
    else state.multi[it.cat].add(id);
    if (portion && PORT.has(portion)) state.portions.set(id, portion);
  }
  return true;
}

function summaryText() {
  const { t, lines } = totals();
  const fmt = FMT.get(state.format);
  const body = lines.length ? lines.map((l) => `- ${l.name}${l.portion ? ` (${l.portion})` : ''}`).join('\n') : '- nothing selected';
  return [
    `Chipotle ${fmt.label} — ${t.cal.toLocaleString('en-US')} calories`,
    body,
    '',
    `Protein ${t.p} g · Carbs ${t.c} g · Fat ${t.f} g · Fiber ${t.fib} g`,
    `Sodium ${t.na.toLocaleString('en-US')} mg · Sugar ${t.sug} g · Saturated fat ${t.sat} g`,
    '',
    'Estimated with the Chipotle nutrition calculator at https://chipotlemacros.com/',
  ].join('\n');
}

async function copyText(text, msg) {
  const status = $('#action-status');
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = msg;
  } catch {
    status.textContent = 'Copying was blocked by your browser. Select the totals and copy manually.';
  }
  setTimeout(() => { status.textContent = ''; }, 4000);
}

function arrowNav(group, current, key) {
  const btns = $$('[role="radio"], [role="checkbox"]', group);
  const i = btns.indexOf(current);
  if (i < 0) return;
  const fwd = key === 'ArrowRight' || key === 'ArrowDown';
  const next = btns[(i + (fwd ? 1 : btns.length - 1)) % btns.length];
  next.tabIndex = 0;
  next.focus();
}

export function initCalculator() {
  const root = $('#calculator');
  if (!root) return;

  root.addEventListener('click', (e) => {
    const fmtBtn = e.target.closest('.fmt');
    if (fmtBtn) { state.format = fmtBtn.dataset.format; render(); return; }

    const presetBtn = e.target.closest('.preset');
    if (presetBtn) {
      const preset = PRESETS.find((p) => p.id === presetBtn.dataset.preset);
      if (preset) { applyPreset(preset); render(); }
      return;
    }

    const portionBtn = e.target.closest('.portion');
    if (portionBtn) {
      const id = $('.pick', portionBtn.closest('.item')).dataset.id;
      state.portions.set(id, portionBtn.dataset.portion);
      render();
      return;
    }

    const pick = e.target.closest('.pick');
    if (pick) { toggle(pick.closest('.cat').dataset.cat, pick.dataset.id); render(); }
  });

  root.addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    const group = e.target.closest('[role="radiogroup"], [role="group"]');
    if (!group || !e.target.closest('.pick, .fmt')) return;
    e.preventDefault();
    arrowNav(group, e.target.closest('.pick, .fmt'), e.key);
  });

  $('#reset').addEventListener('click', () => {
    state.format = 'bowl';
    state.single = { protein: null, rice: null, beans: null };
    state.multi = { salsa: new Set(), toppings: new Set(), sides: new Set() };
    state.portions = new Map();
    history.replaceState(null, '', location.pathname);
    render();
  });

  $('#copy-results').addEventListener('click', () => copyText(summaryText(), 'Results copied to your clipboard.'));

  $('#share-meal').addEventListener('click', () => {
    const url = `${location.origin}${location.pathname}?meal=${encodeURIComponent(encode())}`;
    history.replaceState(null, '', url);
    if (navigator.share) {
      navigator.share({ title: 'My Chipotle order', text: summaryText().split('\n')[0], url }).catch(() => copyText(url, 'Link copied.'));
    } else {
      copyText(url, 'Shareable link copied to your clipboard.');
    }
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; syncChip(); });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  const meal = new URLSearchParams(location.search).get('meal');
  if (meal) decode(meal);
  $('#mobile-bar').setAttribute('aria-hidden', 'false');
  render();
}
