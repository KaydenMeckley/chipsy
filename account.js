/* =====================================================================
   CHIPSY BAKERY — ACCOUNTS & REWARD POINTS
   Simple email-based accounts stored in the browser (localStorage).
   NOTE: This is for demo/testing. It is NOT secure real authentication —
   passwords are stored in the browser. For a live site you'd move this to
   a real backend (see notes in README). Requires app.js (load/save).
   ===================================================================== */

const ACCOUNTS_KEY = "chipsy_accounts";
const SESSION_KEY  = "chipsy_session";

const WELCOME_BONUS   = 50;   // points given for signing up
const POINTS_PER_DOLLAR = 1;  // points earned per $1 spent

function getAccounts() { return load(ACCOUNTS_KEY, {}); }
function saveAccounts(a) { save(ACCOUNTS_KEY, a); }

function currentUserEmail() { return load(SESSION_KEY, null); }
function currentUser() {
  const email = currentUserEmail();
  if (!email) return null;
  return getAccounts()[email] || null;
}
function isLoggedIn() { return !!currentUser(); }

function signUp(name, email, password) {
  name = (name || "").trim();
  email = (email || "").trim().toLowerCase();
  if (!name || !email || !password) return { ok: false, msg: "Please fill in every field." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, msg: "Please enter a valid email." };
  const accounts = getAccounts();
  if (accounts[email]) return { ok: false, msg: "An account with this email already exists — try logging in." };
  accounts[email] = {
    name, email, password,
    points: WELCOME_BONUS,
    orders: [],
    joined: new Date().toISOString()
  };
  saveAccounts(accounts);
  save(SESSION_KEY, email);
  return { ok: true, msg: `Welcome, ${name}! You earned ${WELCOME_BONUS} bonus points.` };
}

function logIn(email, password) {
  email = (email || "").trim().toLowerCase();
  const acc = getAccounts()[email];
  if (!acc || acc.password !== password) return { ok: false, msg: "Incorrect email or password." };
  save(SESSION_KEY, email);
  return { ok: true, msg: `Welcome back, ${acc.name}!` };
}

function logOut() { localStorage.removeItem(SESSION_KEY); }

/* Award points + attach the order to the logged-in account. Returns points earned. */
function addPointsForOrder(order) {
  const email = currentUserEmail();
  if (!email) return 0;
  const accounts = getAccounts();
  const acc = accounts[email];
  if (!acc) return 0;
  const earned = Math.round((order.total || 0) * POINTS_PER_DOLLAR);
  acc.points = (acc.points || 0) + earned;
  acc.orders = acc.orders || [];
  acc.orders.push({ ...order, pointsEarned: earned });
  saveAccounts(accounts);
  return earned;
}

/* Has this email ever placed an order? Checks accounts AND the global order log.
   Used to mark reviews as "Verified Purchase". */
function hasPurchased(email) {
  email = (email || "").trim().toLowerCase();
  if (!email) return false;
  const acc = getAccounts()[email];
  if (acc && acc.orders && acc.orders.length) return true;
  const analytics = load("chipsy_analytics", { orders: [] });
  return (analytics.orders || []).some(o => (o.email || "").trim().toLowerCase() === email);
}
