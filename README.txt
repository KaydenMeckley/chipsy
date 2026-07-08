CHIPSY BAKERY WEBSITE
=====================

HOW TO OPEN IT
--------------
Double-click "index.html" (it opens the About page). Use the tabs at the
top to move between pages. Everything works from your computer with no
setup — cart, orders, reviews, and analytics are saved in your browser.

THE PAGES
---------
- index.html .......... entry point (redirects to About)
- about.html .......... About Us  (fill in your company info)
- menu.html ........... Order page: pick quantities + Purchase button
- checkout.html ....... Pay, choose delivery/pick up, "back to menu" keeps cart
- descriptions.html ... Every item's description + ingredients + allergens
- reviews.html ........ Customers can read and leave reviews
- analytics.html ...... PRIVATE: views, time viewed per page, and orders

WHAT TO FILL IN
---------------
1. MENU ITEMS  ->  open "data.js" and fill in each item
   (name, price, description, ingredients, allergens, dietary labels).
   Both the Order page and the Descriptions page read from this one file.

2. ABOUT US    ->  open "about.html" and replace the dashed "Fill this in"
   boxes with your own text.

3. PAYMENT     ->  the checkout payment fields are placeholders. Connect a
   real payment provider (Square, Stripe, PayPal…) before taking real money.

4. ANALYTICS PASSCODE  ->  open "analytics.html", find PASSCODE near the
   bottom (default: chipsy123) and change it.

ACCOUNTS, REWARD POINTS & VERIFIED REVIEWS
------------------------------------------
- account.html lets customers sign up / log in with their email.
- They get 50 bonus points for signing up, plus 1 point per $1 spent.
  (Rewards: every 100 points = $5 off — redeeming at checkout is a
  "coming soon" placeholder you can turn on later.)
- When a logged-in customer orders, points are added and the order is
  saved to their account.
- Reviews from an email that has ordered show a green "Verified Purchase"
  badge. Logged-in customers can also REPLY to any review (great for you,
  the owner, to respond to feedback — just log in with your own account).
- Like the rest of the site, accounts live in the browser for testing.
  Passwords are NOT securely stored — move accounts to a real backend
  before launching publicly.

ALLERGY / DIETARY LABELS
------------------------
Each item shows red "Contains ___" tags for allergens and green tags for
dietary options (vegan, gluten-free, etc.). Set these per item in data.js.

NOTE
----
Data is stored per-browser (localStorage), which is perfect for testing.
To sell online for real and share data across devices, you'll later need
web hosting plus a payment provider — ask and I can help with that.
