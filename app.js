/* =====================================================================
   CHIPSY BAKERY — SHARED APP LOGIC
   Cart, analytics tracking, and navigation. Data is stored in the
   browser (localStorage), so no server is required to test the site.
   ===================================================================== */

/* ---------- small storage helpers ---------- */
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch (e) { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

/* ============================ CART ============================ */
const CART_KEY = "chipsy_cart";

function getCart() { return load(CART_KEY, {}); }          // { itemId: qty }
function setCart(cart) { save(CART_KEY, cart); updateCartBadge(); }

function addToCart(itemId, qty) {
  qty = parseInt(qty, 10) || 0;
  const cart = getCart();
  if (qty <= 0) { delete cart[itemId]; }
  else { cart[itemId] = qty; }
  setCart(cart);
}

function cartItemCount() {
  return Object.values(getCart()).reduce((a, b) => a + b, 0);
}

function cartDetailed() {
  const cart = getCart();
  const lines = [];
  (typeof MENU_ITEMS !== "undefined" ? MENU_ITEMS : []).forEach(item => {
    const qty = cart[item.id];
    if (qty > 0) {
      lines.push({ item, qty, lineTotal: qty * (item.price || 0) });
    }
  });
  return lines;
}

function cartTotal() {
  return cartDetailed().reduce((sum, l) => sum + l.lineTotal, 0);
}

function clearCart() { setCart({}); }

function updateCartBadge() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const n = cartItemCount();
  badges.forEach(b => {
    b.textContent = n;
    b.style.display = n > 0 ? "inline-block" : "none";
  });
}

function money(n) { return "$" + (Number(n) || 0).toFixed(2); }

/* ========================= ANALYTICS ========================= */
const ANALYTICS_KEY = "chipsy_analytics";

function getAnalytics() {
  return load(ANALYTICS_KEY, { views: {}, uniqueIps: {}, timeMs: {}, orders: [] });
}

/* Look up the visitor's public IP (browsers can't read it directly, so we
   ask a free public service). Cached per session so we only call it once. */
async function getVisitorIp() {
  let ip = sessionStorage.getItem("chipsy_ip");
  if (ip) return ip;
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip || null;
    if (ip) sessionStorage.setItem("chipsy_ip", ip);
    return ip;
  } catch (e) {
    return null; // offline or blocked — fall back gracefully
  }
}

async function trackPageView() {
  const page = document.body.getAttribute("data-page");
  if (!page) return;

  // total raw visits (kept for reference)
  let a = getAnalytics();
  a.views[page] = (a.views[page] || 0) + 1;
  save(ANALYTICS_KEY, a);

  // unique views: count each IP only once per page
  const ip = await getVisitorIp();
  if (ip) {
    a = getAnalytics();
    a.uniqueIps = a.uniqueIps || {};
    a.uniqueIps[page] = a.uniqueIps[page] || [];
    if (!a.uniqueIps[page].includes(ip)) {
      a.uniqueIps[page].push(ip);
      save(ANALYTICS_KEY, a);
    }
  }

  // accumulate time spent on this page
  let start = performance.now();
  let accounted = false;
  function commit() {
    if (accounted) return;
    accounted = true;
    const spent = performance.now() - start;
    const cur = getAnalytics();
    cur.timeMs[page] = (cur.timeMs[page] || 0) + spent;
    save(ANALYTICS_KEY, cur);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") { commit(); }
    else { start = performance.now(); accounted = false; }
  });
  window.addEventListener("pagehide", commit);
  window.addEventListener("beforeunload", commit);
}

function recordOrder(order) {
  const a = getAnalytics();
  a.orders.push(order);
  save(ANALYTICS_KEY, a);
}

/* ========================= TOAST ========================= */
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ========================= INIT ========================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  trackPageView();
});
