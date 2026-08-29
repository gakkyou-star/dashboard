const SVG_ATTR = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  grid: `<svg ${SVG_ATTR}><rect x="3" y="3" width="8" height="8" rx="1.6"/><rect x="13" y="3" width="8" height="8" rx="1.6"/><rect x="3" y="13" width="8" height="8" rx="1.6"/><rect x="13" y="13" width="8" height="8" rx="1.6"/></svg>`,
  cap: `<svg ${SVG_ATTR}><path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg>`,
  sprout: `<svg ${SVG_ATTR}><path d="M12 20v-9"/><path d="M12 11C8 11 5 8 5 4c4 0 7 3 7 7z"/><path d="M12 11c3.5 0 6.5-2.5 6.5-6-3.5 0-6.5 2.5-6.5 6z"/></svg>`,
  wallet: `<svg ${SVG_ATTR}><rect x="2.5" y="6" width="19" height="13" rx="2.2"/><path d="M2.5 10.5h19"/><circle cx="16.5" cy="14.3" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  home: `<svg ${SVG_ATTR}><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
  book: `<svg ${SVG_ATTR}><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>`,
  globe: `<svg ${SVG_ATTR}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z"/></svg>`,
  link: `<svg ${SVG_ATTR}><path d="M10.5 13.5a4 4 0 0 0 5.66 0l2-2a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M13.5 10.5a4 4 0 0 0-5.66 0l-2 2a4 4 0 1 0 5.66 5.66l1-1"/></svg>`,
  users: `<svg ${SVG_ATTR}><circle cx="9" cy="8" r="3.2"/><path d="M2.8 20c0-3.4 2.8-6.2 6.2-6.2s6.2 2.8 6.2 6.2"/><circle cx="17" cy="9.5" r="2.4"/><path d="M15 14.8c2.6.5 4.6 2.7 4.6 5.2"/></svg>`,
  backpack: `<svg ${SVG_ATTR}><path d="M7.5 21V10.5a4.5 4.5 0 0 1 9 0V21"/><rect x="6.5" y="12" width="11" height="9" rx="1.8"/><path d="M9.5 3.5h5v3h-5z"/><path d="M10 16h4"/></svg>`,
  plane: `<svg ${SVG_ATTR}><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`,
  leaf: `<svg ${SVG_ATTR}><path d="M12 22c6-2 9-7 9-13a9 9 0 0 0-9-4 9 9 0 0 0-9 4c0 6 3 11 9 13z"/><path d="M12 22V9"/></svg>`,
  laptop: `<svg ${SVG_ATTR}><rect x="4" y="4.5" width="16" height="10" rx="1.5"/><path d="M2 19h20"/></svg>`,
  bus: `<svg ${SVG_ATTR}><rect x="3" y="5" width="18" height="11" rx="2.2"/><path d="M3 11h18"/><circle cx="7.5" cy="19" r="1.4" fill="currentColor" stroke="none"/><circle cx="16.5" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>`,
  mapPin: `<svg ${SVG_ATTR}><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>`,
  grad: `<svg ${SVG_ATTR}><path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"/></svg>`,
};

function applyStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((elmt) => {
    const svg = ICONS[elmt.dataset.icon];
    if (svg) elmt.innerHTML = svg;
  });
}

const COLOR = {
  overview: "#3b82c4",
  activity: "#56a05c",
  career: "#3ea8a8",
  careerDeep: "#2d7a7a",
  finance: "#e0a83e",
  dorm: "#cf5142",
  sky: "#4fa3d1",
  neutral: "#83868f",
  track: "#40434a",
  good: "#56a05c",
  warn: "#cf5142",
  text: "#f5f6f7",
  textSub: "#c7c9cf",
  gridLine: "rgba(255,255,255,0.09)",
};

// 濃くはっきり区別できる配色（暗い背景でも視認しやすい高彩度カラー）
const QUALITATIVE_PALETTE = [COLOR.career, COLOR.overview, COLOR.activity, COLOR.finance, COLOR.dorm, "#9163b6", "#8a6d3b", COLOR.sky];
const DORM_PALETTE = [COLOR.overview, COLOR.dorm, COLOR.finance];
const OVERVIEW_PALETTE = [COLOR.overview, COLOR.career, COLOR.finance, COLOR.dorm];

Chart.defaults.font.size = 13;
Chart.defaults.font.family = "'Poppins','Hiragino Sans','Yu Gothic','Noto Sans JP',sans-serif";
Chart.defaults.color = COLOR.textSub;
Chart.defaults.borderColor = COLOR.gridLine;
// 凡例・目盛りの文字色を明示的にデフォルト指定（環境差での黒文字化を防止）
Chart.defaults.plugins.legend.labels.color = COLOR.textSub;
Chart.defaults.plugins.tooltip.titleColor = COLOR.text;
Chart.defaults.plugins.tooltip.bodyColor = COLOR.textSub;
Chart.defaults.plugins.tooltip.backgroundColor = "#303338";

function fmtPct(v) {
  return v === null || v === undefined ? "-" : `${v}%`;
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

// 円グラフのスライスに割合(%)を直接描画するプラグイン。
// options.plugins.sliceLabels.enabled をtrueにしたチャートでのみ有効。
const sliceLabelsPlugin = {
  id: "sliceLabels",
  afterDatasetsDraw(chart) {
    const opts = chart.options.plugins && chart.options.plugins.sliceLabels;
    if (!opts || !opts.enabled) return;
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((a, b) => a + b, 0);
    if (!total) return;
    ctx.save();
    meta.data.forEach((arc, i) => {
      const value = dataset.data[i];
      if (!value) return;
      const pct = (value / total) * 100;
      if (pct < 6) return; // 小さすぎるスライスは重なるため省略（凡例で確認可能）
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const radius = (arc.innerRadius + arc.outerRadius) / 2;
      const x = arc.x + Math.cos(angle) * radius;
      const y = arc.y + Math.sin(angle) * radius;
      ctx.fillStyle = "#0b0c1c";
      ctx.font = "700 13px 'Poppins', 'Hiragino Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${Math.round(pct)}%`, x, y);
    });
    ctx.restore();
  },
};
Chart.register(sliceLabelsPlugin);

// 積み上げ棒グラフの特定年度に、制度加盟などの分岐点を示す縦線とラベルを描画するプラグイン。
// options.plugins.yearMarker.enabled をtrueにしたチャートでのみ有効。
const yearMarkerPlugin = {
  id: "yearMarker",
  afterDraw(chart) {
    const opts = chart.options.plugins && chart.options.plugins.yearMarker;
    if (!opts || !opts.enabled || opts.index === undefined || opts.index < 0) return;
    const { ctx, chartArea, scales } = chart;
    const x = scales.x.getPixelForValue(opts.index);
    // ラベルはプロット領域の外（layout.padding.topで確保した余白）に描画し、
    // 背の高い棒グラフと重ならないようにする。
    const labelY = Math.max(4, chartArea.top - 18);
    ctx.save();
    ctx.strokeStyle = COLOR.finance;
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top - 10);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = COLOR.finance;
    ctx.font = "700 11px 'Poppins', 'Hiragino Sans', sans-serif";
    ctx.textBaseline = "top";
    const textWidth = ctx.measureText(opts.label).width;
    if (x + 6 + textWidth > chartArea.right) {
      ctx.textAlign = "right";
      ctx.fillText(opts.label, x - 6, labelY);
    } else {
      ctx.textAlign = "left";
      ctx.fillText(opts.label, x + 6, labelY);
    }
    ctx.restore();
  },
};
Chart.register(yearMarkerPlugin);

// 凡例に「件数（割合%）」を併記するための共通ラベル生成。
function legendWithValues(unit = "人") {
  return (chart) => {
    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((a, b) => a + b, 0);
    return chart.data.labels.map((label, i) => {
      const value = dataset.data[i];
      const pct = total ? Math.round((value / total) * 100) : 0;
      return {
        text: `${label}  ${value}${unit}（${pct}%）`,
        fillStyle: dataset.backgroundColor[i],
        strokeStyle: dataset.backgroundColor[i],
        fontColor: COLOR.textSub,
        color: COLOR.textSub,
        hidden: false,
        index: i,
      };
    });
  };
}

function darkTooltip(extra = {}) {
  return {
    backgroundColor: "#303338",
    titleColor: COLOR.text,
    bodyColor: COLOR.textSub,
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    padding: 10,
    ...extra,
  };
}

/* ---------------- ファネル風ランキングバー ---------------- */
function renderFunnelList(containerId, items, color, opts = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  if (!items.length) return;
  const max = Math.max(...items.map((i) => i.count));
  const unit = opts.unit || "";
  items.forEach((item) => {
    const row = el("div", "funnel-row");
    row.appendChild(el("div", "funnel-label", item.label));
    const barRow = el("div", "funnel-bar-row");
    const track = el("div", "funnel-track");
    const fill = el("div", "funnel-fill");
    fill.style.setProperty("--bar-color", color);
    const pct = max > 0 ? Math.max((item.count / max) * 100, 6) : 6;
    fill.style.width = `${pct}%`;
    track.appendChild(fill);
    barRow.appendChild(track);
    barRow.appendChild(el("div", "funnel-value", `${item.count}${unit}`));
    row.appendChild(barRow);
    container.appendChild(row);
  });
}

/* ---------------- サマリーカード ---------------- */
function renderStatCards(containerId, cards) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";
  cards.forEach((c) => {
    const card = el("div", "summary-card");
    const icon = el("div", "icon");
    icon.innerHTML = ICONS[c.icon];
    icon.style.setProperty("--accent-bg", c.accentBg);
    icon.style.color = c.accent;
    card.appendChild(icon);
    const val = el("div", "value");
    val.textContent = c.value ?? "-";
    if (c.unit) val.appendChild(el("small", null, c.unit));
    card.appendChild(val);
    card.appendChild(el("div", "label", c.label));
    grid.appendChild(card);
  });
}

function renderSummaryCards(data) {
  const cards = [];

  const enrollment = data.school_overview.enrollment;
  if (enrollment.ready) {
    cards.push({ icon: "users", accent: "var(--c-overview)", accentBg: "var(--c-overview-bg)", value: enrollment.total, unit: "人", label: "在籍生徒数（全学年）" });
  }
  const eiken = data.career_and_learning.eiken;
  if (eiken.ready) {
    const rate = eiken.total_students ? Math.round((eiken.holders / eiken.total_students) * 1000) / 10 : null;
    cards.push({ icon: "book", accent: "var(--c-career)", accentBg: "var(--c-career-bg)", value: rate, unit: "%", label: "英検取得率" });
  }
  const dorm = data.dormitory.summary;
  if (dorm.ready) {
    cards.push({ icon: "home", accent: "var(--c-dorm)", accentBg: "var(--c-dorm-bg)", value: dorm.total, unit: "人", label: "入寮者数" });
  }

  renderStatCards("summary-grid", cards);
}

/* ---------------- 学校概況 ---------------- */
function renderEnrollment(d) {
  document.getElementById("enrollment-updated").textContent = d.source_updated ? `データ更新日: ${d.source_updated}` : "";
  if (!d.ready) return;
  new Chart(document.getElementById("chart-enrollment"), {
    type: "doughnut",
    data: { labels: d.by_grade.map((g) => g.label), datasets: [{ data: d.by_grade.map((g) => g.count), backgroundColor: OVERVIEW_PALETTE, borderColor: "#25272c", borderWidth: 2 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "62%",
      plugins: { legend: { position: "bottom", labels: { color: COLOR.textSub } }, tooltip: darkTooltip({ callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}人` } }) },
    },
  });
}

function renderOriginTrend(d) {
  if (!d.ready) return;
  const labels = d.years.map((y) => `${y.year}`);
  const categories = ["町内", "管内", "道内", "道外"];
  const colors = { "町内": OVERVIEW_PALETTE[0], "管内": OVERVIEW_PALETTE[1], "道内": OVERVIEW_PALETTE[2], "道外": OVERVIEW_PALETTE[3] };
  const stackDatasets = categories.map((cat) => ({
    type: "bar",
    label: cat,
    data: d.years.map((y) => (y.breakdown.find((b) => b.label === cat) || {}).count || 0),
    backgroundColor: colors[cat],
    borderRadius: 3,
    stack: "origin",
  }));
  const totalLine = {
    type: "line",
    label: "総数",
    data: d.years.map((y) => y.total),
    borderColor: COLOR.text,
    backgroundColor: COLOR.text,
    borderWidth: 2,
    pointRadius: 2,
    tension: 0.3,
    stack: "total-line",
  };
  const outsideLine = {
    type: "line",
    label: "町外",
    data: d.years.map((y) => y.total - ((y.breakdown.find((b) => b.label === "町内") || {}).count || 0)),
    borderColor: COLOR.neutral,
    backgroundColor: COLOR.neutral,
    borderWidth: 2,
    borderDash: [5, 3],
    pointRadius: 2,
    tension: 0.3,
    stack: "outside-line",
  };

  const markerIndex = labels.indexOf("2023");

  new Chart(document.getElementById("chart-origin-trend"), {
    type: "bar",
    data: { labels, datasets: [...stackDatasets, totalLine, outsideLine] },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 22 } },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: COLOR.textSub, maxRotation: 0, autoSkip: true, maxTicksLimit: 14 } },
        y: { stacked: true, beginAtZero: true, max: 80, grid: { color: COLOR.gridLine }, ticks: { color: COLOR.textSub } },
      },
      plugins: {
        legend: { position: "bottom", labels: { color: COLOR.textSub } },
        tooltip: darkTooltip(),
        yearMarker: { enabled: markerIndex >= 0, index: markerIndex, label: "2023年度〜 地域みらい留学制度加盟" },
      },
    },
  });
}

function renderLocalRateTrend(d) {
  if (!d.ready) return;
  const withRate = d.series.filter((s) => s.local_rate !== null);
  if (!withRate.length) return;
  new Chart(document.getElementById("chart-local-rate-trend"), {
    type: "line",
    data: {
      labels: withRate.map((s) => s.year),
      datasets: [{
        label: "連携型中学校からの進学率",
        data: withRate.map((s) => s.local_rate),
        borderColor: COLOR.overview,
        backgroundColor: "rgba(59,130,196,0.18)",
        borderWidth: 2.5,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 5,
        fill: true,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: darkTooltip({ callbacks: { label: (ctx) => `${ctx.raw}%` } }) },
      scales: {
        x: { grid: { display: false }, ticks: { color: COLOR.textSub, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 } },
        y: { beginAtZero: true, max: 100, grid: { color: COLOR.gridLine }, ticks: { color: COLOR.textSub, callback: (v) => `${v}%` } },
      },
    },
  });
  const latest = withRate[withRate.length - 1];
  document.getElementById("local-rate-caption").textContent = `${latest.year}年度: ${latest.local_rate}%（入学者${latest.count}人）`;
}

function renderEnrollmentOrigin(d) {
  const sub = document.getElementById("enrollment-origin-sub");
  if (!d.ready) {
    if (sub) sub.textContent = "データ準備中";
    return;
  }
  if (sub) sub.textContent = `現1〜3年生（入学年度: ${d.years.join("・")}）の入学時内訳`;
  new Chart(document.getElementById("chart-enrollment-origin"), {
    type: "doughnut",
    data: { labels: d.breakdown.map((b) => b.label), datasets: [{ data: d.breakdown.map((b) => b.count), backgroundColor: OVERVIEW_PALETTE, borderColor: "#25272c", borderWidth: 2 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "58%",
      plugins: {
        legend: { position: "bottom", labels: { color: COLOR.textSub, generateLabels: legendWithValues("人") } },
        tooltip: darkTooltip({ callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}人` } }),
        sliceLabels: { enabled: true },
      },
    },
  });
}

function renderReason(d) {
  document.getElementById("reason-updated").textContent = d.source_updated ? `回答者数: ${d.respondents}人（${d.source_updated}時点）` : "";
  if (!d.ready) return;
  const items = d.top_reason.slice(0, 5).map((r) => ({ label: r.label, count: d.respondents ? Math.round((r.count / d.respondents) * 1000) / 10 : 0 }));
  renderFunnelList("list-reason", items, COLOR.overview, { unit: "%" });
}

function renderSupport(d) {
  if (!d.ready) return;
  const items = d.attractive_support.slice(0, 5).map((r) => ({ label: r.label, count: d.respondents ? Math.round((r.count / d.respondents) * 1000) / 10 : 0 }));
  renderFunnelList("list-support", items, COLOR.finance, { unit: "%" });
}

/* ---------------- 教育活動 ---------------- */
function renderInquiry(d) {
  if (!d.ready) {
    const wrap = document.getElementById("chart-inquiry").closest(".card").querySelector(".chart-wrap");
    wrap.outerHTML = `<p class="pending-note">${d.note || "データ準備中"}</p>`;
    return;
  }
  const labels = d.scores.map((s) => s.label.replace("探究性に関わる", ""));
  new Chart(document.getElementById("chart-inquiry"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "鹿追高校", data: d.scores.map((s) => s.school_latest), backgroundColor: COLOR.activity, borderRadius: 4 },
        { label: "全国平均", data: d.scores.map((s) => s.national_latest), backgroundColor: COLOR.track, borderRadius: 4 },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: COLOR.textSub } }, tooltip: darkTooltip() },
      scales: {
        x: { beginAtZero: true, max: 100, grid: { color: COLOR.gridLine }, ticks: { color: COLOR.textSub }, title: { display: true, text: "肯定的回答率(%)", color: COLOR.textSub } },
        y: { grid: { display: false }, ticks: { color: COLOR.textSub } },
      },
    },
  });
}

function setStatus(elId, obj) {
  const target = document.getElementById(elId);
  if (!target) return;
  target.textContent = obj.ready ? "データあり" : `📋 ${obj.note || "データ準備中"}`;
}

/* ---------------- 進路 ---------------- */
function renderCareer(d) {
  document.getElementById("career-year").textContent = d.latest_year ?? "-";
  if (!d.ready) return;

  new Chart(document.getElementById("chart-career-donut"), {
    type: "doughnut",
    data: {
      labels: d.breakdown.map((b) => b.label),
      datasets: [{ data: d.breakdown.map((b) => b.count), backgroundColor: QUALITATIVE_PALETTE, borderColor: "#25272c", borderWidth: 2 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "58%",
      plugins: {
        legend: { position: "right", labels: { color: COLOR.textSub, boxWidth: 12, generateLabels: legendWithValues("人") } },
        tooltip: darkTooltip({ callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}人` } }),
        sliceLabels: { enabled: true },
      },
    },
  });

  // カテゴリはドーナツグラフと同じ6区分・同じ配色（QUALITATIVE_PALETTEの先頭6色）を使う。
  new Chart(document.getElementById("chart-career-trend"), {
    type: "line",
    data: {
      labels: d.category_trend.years,
      datasets: d.category_trend.categories.map((c, i) => ({
        label: c.label,
        data: c.data,
        borderColor: QUALITATIVE_PALETTE[i],
        backgroundColor: QUALITATIVE_PALETTE[i],
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 5,
      })),
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { color: COLOR.textSub, boxWidth: 12 } },
        tooltip: darkTooltip({ callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}人` } }),
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: COLOR.textSub } },
        y: { beginAtZero: true, grid: { color: COLOR.gridLine }, ticks: { color: COLOR.textSub } },
      },
    },
  });
}

function renderEiken(d) {
  document.getElementById("eiken-updated").textContent = d.source_updated ? `データ更新日: ${d.source_updated}` : "";
  if (!d.ready) return;
  const rate = d.total_students ? Math.round((d.holders / d.total_students) * 1000) / 10 : null;
  document.getElementById("eiken-rate").textContent = fmtPct(rate);
  document.getElementById("eiken-caption").textContent = `在籍${d.total_students}人中 ${d.holders}人が取得`;
  renderFunnelList("list-eiken", d.grade_breakdown.map((g) => ({ label: g.label + "級", count: g.count })), COLOR.career, { unit: "人" });
}


/* ---------------- 経済支援 ---------------- */
function fmtSen(n) {
  return `${n.toLocaleString("ja-JP")}千円`;
}

function fmtSenDiff(n) {
  return `${n >= 0 ? "+" : ""}${n.toLocaleString("ja-JP")}千円`;
}

function renderFinanceStats(d) {
  renderStatCards("finance-stat-row", [
    { icon: "wallet", accent: "var(--c-finance)", accentBg: "var(--c-finance-bg)", value: d.total_r8.toLocaleString("ja-JP"), unit: "千円", label: `事業費総額（${d.fiscal_year_current}予算）` },
    {
      icon: "book", accent: d.total_diff >= 0 ? "var(--c-career)" : "var(--c-dorm)", accentBg: d.total_diff >= 0 ? "var(--c-career-bg)" : "var(--c-dorm-bg)",
      value: `${d.total_diff >= 0 ? "+" : ""}${d.total_diff.toLocaleString("ja-JP")}`, unit: "千円", label: `前年度（${d.fiscal_year_prior}）比`,
    },
    { icon: "users", accent: "var(--c-overview)", accentBg: "var(--c-overview-bg)", value: d.general_fund_ratio_percent, unit: "%", label: "一般財源比率" },
  ]);
}

function renderFinanceFundBar(d) {
  const bar = document.getElementById("finance-fund-bar");
  if (!bar) return;
  bar.innerHTML = "";
  const grantPct = Math.round((d.grant_total / d.total_r8) * 1000) / 10;
  const generalPct = Math.round((d.general_fund / d.total_r8) * 1000) / 10;

  const track = el("div", "finance-fund-track");
  const grantFill = el("div", "finance-fund-fill grant");
  grantFill.style.width = `${grantPct}%`;
  const generalFill = el("div", "finance-fund-fill general");
  generalFill.style.width = `${generalPct}%`;
  track.appendChild(grantFill);
  track.appendChild(generalFill);
  bar.appendChild(track);

  const legend = el("div", "finance-fund-legend");
  const grantItem = el("div", "finance-fund-legend-item");
  grantItem.appendChild(el("span", "finance-fund-dot grant"));
  grantItem.appendChild(document.createTextNode(`交付金等（国・道・地方債・特別交付税等） ${fmtSen(d.grant_total)}（${grantPct}%）`));
  const generalItem = el("div", "finance-fund-legend-item");
  generalItem.appendChild(el("span", "finance-fund-dot general"));
  generalItem.appendChild(document.createTextNode(`一般財源 ${fmtSen(d.general_fund)}（${generalPct}%）`));
  legend.appendChild(grantItem);
  legend.appendChild(generalItem);
  bar.appendChild(legend);
}

function renderFinanceCategoryChart(d) {
  new Chart(document.getElementById("chart-finance-category"), {
    type: "doughnut",
    data: {
      labels: d.categories.map((c) => c.label),
      datasets: [{ data: d.categories.map((c) => c.r8), backgroundColor: QUALITATIVE_PALETTE, borderColor: "#25272c", borderWidth: 2 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "58%",
      plugins: {
        legend: { position: "bottom", labels: { color: COLOR.textSub, generateLabels: legendWithValues("千円") } },
        tooltip: darkTooltip({ callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw.toLocaleString("ja-JP")}千円` } }),
        sliceLabels: { enabled: true },
      },
    },
  });
}

function renderFinanceProjectList(d) {
  const container = document.getElementById("finance-project-list");
  if (!container) return;
  container.innerHTML = "";
  d.categories.forEach((cat) => {
    const block = el("div", "finance-category-block");
    const head = el("div", "finance-category-head");
    head.appendChild(el("h4", null, cat.label));
    head.appendChild(el("span", `finance-category-diff ${cat.diff >= 0 ? "positive" : "negative"}`, `R8: ${fmtSen(cat.r8)}（${fmtSenDiff(cat.diff)}）`));
    block.appendChild(head);

    const maxR8 = Math.max(1, ...cat.projects.map((p) => p.r8));
    cat.projects.forEach((p) => {
      const row = el("div", "finance-project-row");
      row.appendChild(el("div", "finance-project-label", p.label));
      const track = el("div", "finance-project-track");
      const fill = el("div", "finance-project-fill");
      fill.style.width = `${(p.r8 / maxR8) * 100}%`;
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("div", "finance-project-value", fmtSen(p.r8)));
      row.appendChild(el("div", `finance-project-diff ${p.diff > 0 ? "positive" : p.diff < 0 ? "negative" : ""}`, fmtSenDiff(p.diff)));
      block.appendChild(row);
    });
    container.appendChild(block);
  });
}

function renderFinance(d) {
  document.getElementById("finance-updated").textContent = d.ready && d.source_updated ? `データ更新日: ${d.source_updated}（単位: ${d.unit}）` : (d.note || "データ準備中");
  if (!d.ready) return;
  renderFinanceStats(d);
  renderFinanceFundBar(d);
  renderFinanceCategoryChart(d);
  renderFinanceProjectList(d);
}

/* ---------------- 入寮者情報 ---------------- */
function renderDormStats(d) {
  const capacityTotal = d.by_facility.reduce((sum, f) => sum + (f.capacity_total || 0), 0);
  const occRate = capacityTotal ? Math.round((d.total / capacityTotal) * 1000) / 10 : null;
  const prefCount = d.by_prefecture.filter((p) => p.count > 0).length;
  renderStatCards("dorm-stat-row", [
    { icon: "home", accent: "var(--c-dorm)", accentBg: "var(--c-dorm-bg)", value: d.total, unit: "人", label: "総入寮者数" },
    { icon: "users", accent: "var(--c-overview)", accentBg: "var(--c-overview-bg)", value: occRate, unit: occRate !== null ? "%" : "", label: "全体在寮率（対定員）" },
    { icon: "mapPin", accent: "var(--c-career)", accentBg: "var(--c-career-bg)", value: prefCount, unit: "都道府県", label: "出身都道府県の広がり" },
  ]);
}

// 施設ごとに「定員に対する在寮率ゲージ」「学年×性別の内訳バー」
// 「1人=1ドットのピクトグラム」を組み合わせ、数表だけに頼らず一目で状況がわかるようにする。
function renderDormFacilityList(byFacility) {
  const container = document.getElementById("dorm-facility-list");
  if (!container) return;
  container.innerHTML = "";

  byFacility.forEach((f, idx) => {
    const card = el("div", "dorm-facility-card");
    const top = el("div", "dorm-facility-top");

    const occRate = f.capacity_total ? Math.round((f.count / f.capacity_total) * 100) : null;
    const gaugeWrap = el("div", "dorm-gauge-wrap");
    const canvas = document.createElement("canvas");
    const canvasId = `chart-dorm-occ-${idx}`;
    canvas.id = canvasId;
    gaugeWrap.appendChild(canvas);
    const center = el("div", "dorm-gauge-center");
    center.appendChild(el("span", "dorm-gauge-value", occRate !== null ? `${occRate}` : "-"));
    if (occRate !== null) center.appendChild(el("span", "dorm-gauge-unit", "%"));
    gaugeWrap.appendChild(center);
    top.appendChild(gaugeWrap);

    const info = el("div", "dorm-facility-info");
    const capText = f.capacity_total
      ? (f.capacity_male ? `定員${f.capacity_total}名（男${f.capacity_male}・女${f.capacity_female}）` : `定員${f.capacity_total}名`)
      : "定員情報なし";
    info.appendChild(el("h4", null, f.name));
    info.appendChild(el("p", "dorm-facility-occ", `在寮 ${f.count}人（男${f.male}・女${f.female}） ／ ${capText}`));

    const bars = el("div", "dorm-grade-bars");
    const gradeMax = Math.max(1, ...f.male_by_grade.map((g, i) => g.count + f.female_by_grade[i].count));
    f.male_by_grade.forEach((mg, i) => {
      const fg = f.female_by_grade[i];
      const row = el("div", "dorm-grade-bar-row");
      row.appendChild(el("span", "dorm-grade-bar-label", mg.grade));
      const track = el("div", "dorm-grade-bar-track");
      if (mg.count) {
        const fill = el("div", "dorm-grade-bar-fill male");
        fill.style.width = `${(mg.count / gradeMax) * 100}%`;
        track.appendChild(fill);
      }
      if (fg.count) {
        const fill = el("div", "dorm-grade-bar-fill female");
        fill.style.width = `${(fg.count / gradeMax) * 100}%`;
        track.appendChild(fill);
      }
      row.appendChild(track);
      row.appendChild(el("span", "dorm-grade-bar-value", `${mg.count + fg.count}`));
      bars.appendChild(row);
    });
    info.appendChild(bars);
    top.appendChild(info);
    card.appendChild(top);

    const picto = el("div", "dorm-pictogram");
    f.male_by_grade.forEach((mg, i) => {
      const fg = f.female_by_grade[i];
      if (mg.count + fg.count === 0) return;
      const group = el("div", "dorm-pictogram-group");
      group.appendChild(el("span", "dorm-pictogram-group-label", mg.grade));
      const row = el("div", "dorm-pictogram-row");
      for (let n = 0; n < mg.count; n++) {
        const dot = el("span", "dorm-dot male");
        dot.title = `男・${mg.grade}`;
        row.appendChild(dot);
      }
      for (let n = 0; n < fg.count; n++) {
        const dot = el("span", "dorm-dot female");
        dot.title = `女・${mg.grade}`;
        row.appendChild(dot);
      }
      group.appendChild(row);
      picto.appendChild(group);
    });
    card.appendChild(picto);

    container.appendChild(card);

    if (occRate !== null) {
      new Chart(document.getElementById(canvasId), {
        type: "doughnut",
        data: { datasets: [{ data: [Math.min(occRate, 100), Math.max(0, 100 - occRate)], backgroundColor: [COLOR.dorm, COLOR.track], borderWidth: 0 }] },
        options: {
          responsive: true, maintainAspectRatio: false, cutout: "76%", rotation: -90, circumference: 360,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        },
      });
    }
  });
}

// 都道府県×学年×性別マトリックスを、色の濃淡だけに頼るヒートマップ表ではなく
// 「都道府県カード」のグリッドとして描画する。各カードは学年別ミニバー（男女内訳つき）を持ち、
// バーの長さで人数を直感的に比較できる（長さの知覚は色の濃淡の知覚より正確に読み取れるため）。
function renderDormMatrix(byFacility, gradeOrder) {
  const container = document.getElementById("dorm-matrix-wrap");
  if (!container) return;
  container.innerHTML = "";
  const medals = ["🥇", "🥈", "🥉"];

  byFacility.forEach((f) => {
    const rows = f.prefecture_matrix.filter((r) => r.total > 0).sort((a, b) => b.total - a.total);
    if (!rows.length) return;
    const maxCount = Math.max(1, ...rows.flatMap((r) => gradeOrder.flatMap((g) => [r.counts[g].male, r.counts[g].female])));

    const block = el("div", "dorm-matrix-block");
    const head = el("div", "dorm-matrix-block-head");
    head.appendChild(el("h4", null, f.name));
    head.appendChild(el("span", "dorm-matrix-block-total", `在寮${f.count}人・${rows.length}都道府県`));
    block.appendChild(head);

    const grid = el("div", "dorm-matrix-pref-grid");
    rows.forEach((r, i) => {
      const card = el("div", `dorm-matrix-pref-card${i === 0 ? " top" : ""}`);
      const cardHead = el("div", "dorm-matrix-pref-head");
      const name = el("span", "dorm-matrix-pref-name");
      if (i < medals.length) name.appendChild(el("span", "pref-rank", medals[i]));
      name.appendChild(document.createTextNode(r.prefecture));
      cardHead.appendChild(name);
      cardHead.appendChild(el("span", "dorm-matrix-pref-total", `${r.total}人`));
      card.appendChild(cardHead);

      const bars = el("div", "dorm-grade-bars");
      gradeOrder.forEach((g) => {
        const { male, female } = r.counts[g];
        const row = el("div", "dorm-grade-bar-row");
        row.appendChild(el("span", "dorm-grade-bar-label", g));
        const track = el("div", "dorm-grade-bar-track");
        if (male) {
          const fill = el("div", "dorm-grade-bar-fill male");
          fill.style.width = `${(male / maxCount) * 100}%`;
          track.appendChild(fill);
        }
        if (female) {
          const fill = el("div", "dorm-grade-bar-fill female");
          fill.style.width = `${(female / maxCount) * 100}%`;
          track.appendChild(fill);
        }
        row.appendChild(track);
        row.appendChild(el("span", "dorm-grade-bar-value", male + female ? `${male + female}` : ""));
        bars.appendChild(row);
      });
      card.appendChild(bars);
      grid.appendChild(card);
    });
    block.appendChild(grid);
    container.appendChild(block);
  });

  const legend = el("div", "dorm-matrix-legend");
  legend.appendChild(el("span", "dorm-dot male"));
  legend.appendChild(document.createTextNode("男"));
  legend.appendChild(el("span", "dorm-dot female"));
  legend.appendChild(document.createTextNode("女 ｜ バーの長さ＝人数（同一施設内で最大値を100%として比較）"));
  container.appendChild(legend);
}

function renderDormPrefList(byPrefecture) {
  const prefList = document.getElementById("pref-list");
  prefList.innerHTML = "";
  const medals = ["🥇", "🥈", "🥉"];
  const max = Math.max(1, ...byPrefecture.map((p) => p.count));
  byPrefecture.forEach((p, i) => {
    const row = el("div", "pref-row");
    const label = el("div", "pref-label");
    if (i < 3) label.appendChild(el("span", "pref-rank", medals[i]));
    label.appendChild(document.createTextNode(p.prefecture));
    row.appendChild(label);
    const track = el("div", "bar-track");
    if (p.male) {
      const fill = el("div", "bar-fill male");
      fill.style.width = `${(p.male / max) * 100}%`;
      track.appendChild(fill);
    }
    if (p.female) {
      const fill = el("div", "bar-fill female");
      fill.style.width = `${(p.female / max) * 100}%`;
      track.appendChild(fill);
    }
    row.appendChild(track);
    row.appendChild(el("div", "count", `${p.count}（男${p.male}・女${p.female}）`));
    prefList.appendChild(row);
  });
}

function renderDormitory(d) {
  document.getElementById("dorm-updated").textContent = d.source_updated ? `データ更新日: ${d.source_updated}` : "";
  if (!d.ready) return;

  renderDormStats(d);

  new Chart(document.getElementById("chart-dorm-facility"), {
    type: "bar",
    data: {
      labels: d.by_facility.map((f) => f.name),
      datasets: [
        { label: "男", data: d.by_facility.map((f) => f.male), backgroundColor: DORM_PALETTE[0], borderRadius: 4 },
        { label: "女", data: d.by_facility.map((f) => f.female), backgroundColor: DORM_PALETTE[1], borderRadius: 4 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: COLOR.textSub } },
        y: { stacked: true, beginAtZero: true, grid: { color: COLOR.gridLine }, ticks: { color: COLOR.textSub } },
      },
      plugins: { legend: { position: "bottom", labels: { color: COLOR.textSub } }, tooltip: darkTooltip() },
    },
  });

  new Chart(document.getElementById("chart-dorm-grade"), {
    type: "doughnut",
    data: { labels: d.by_grade.map((g) => g.grade), datasets: [{ data: d.by_grade.map((g) => g.count), backgroundColor: DORM_PALETTE, borderColor: "#25272c", borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: "62%", plugins: { legend: { position: "bottom", labels: { color: COLOR.textSub } }, tooltip: darkTooltip() } },
  });

  renderDormFacilityList(d.by_facility);
  renderDormMatrix(d.by_facility, d.grade_order);
  renderDormPrefList(d.by_prefecture);
}

/* ---------------- ナビゲーション（スクロールスパイ） ---------------- */
function setupNav() {
  const sections = Array.from(document.querySelectorAll("section.category"));
  const railLinks = Array.from(document.querySelectorAll(".rail-icon"));

  const setActive = (id) => {
    railLinks.forEach((a) => a.classList.toggle("active", a.dataset.target === id));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

async function main() {
  applyStaticIcons();

  // output/dashboard_data.js が window.DASHBOARD_DATA を定義する。
  // file:// で直接開いた場合（fetch はCORSで使えない）にも対応するため、
  // JSONをfetchするのではなく埋め込み済みのグローバル変数を参照する。
  const data = window.DASHBOARD_DATA;

  document.getElementById("generated-at").textContent = `データ集計日時: ${data.generated_at}`;

  renderSummaryCards(data);

  renderEnrollment(data.school_overview.enrollment);
  renderEnrollmentOrigin(data.school_overview.current_enrollment_origin);
  renderOriginTrend(data.school_overview.origin_region);
  renderLocalRateTrend(data.school_overview.admission_trend);
  renderReason(data.school_overview.admission_reason);
  renderSupport(data.school_overview.admission_reason);

  renderInquiry(data.education_activities.inquiry_learning);
  setStatus("status-international", data.education_activities.international_exchange);
  setStatus("status-secondary", data.education_activities.secondary_collaboration);
  setStatus("status-community", data.education_activities.community_collaboration);
  renderEiken(data.career_and_learning.eiken);
  document.getElementById("status-mock").textContent = `📋 ${data.career_and_learning.mock_exam.note || "データ準備中"}`;

  renderCareer(data.career_and_learning.career_outcome);

  renderFinance(data.financial_support);

  renderDormitory(data.dormitory.summary);

  setupNav();
}

main();
