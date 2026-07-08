/* =====================================================================
   CHIPSY BAKERY — MENU DATA
   ---------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD / CHANGE MENU ITEMS.
   Everything (the order page AND the descriptions page) reads from here.

   Copy one of the blocks below and fill it in. Keep the commas.

   Fields:
     id          : a unique short code, no spaces (e.g. "choc-chip")
     name        : the item name shown to customers
     price       : the price as a number, e.g. 3.50  (no dollar sign)
     image       : path to a photo. Put photos in the "images" folder next
                   to these files, then write e.g. "images/cookie.jpg".
                   Leave as "" to show a placeholder box instead.
     description : a sentence or two about the item
     ingredients : what's in it (shown on the Descriptions page)
     allergens   : things it CONTAINS. Choose from:
                   "gluten", "dairy", "eggs", "nuts", "peanuts",
                   "soy", "sesame", "wheat"
     dietary     : positive labels. Choose from:
                   "vegetarian", "vegan", "gluten-free", "dairy-free",
                   "nut-free", "egg-free"
     available   : true (show it) or false (hide it temporarily)
   ===================================================================== */

const MENU_ITEMS = [

  /* -------- EXAMPLE ITEM (delete or edit me) -------- */
  {
    id: "item-1",
    name: "Chocolate Chip Cookie",
    price: 3.00,
    image: "",                // <-- e.g. "images/cookie.jpg" (or leave "")
    description: "Warm, gooey, and loaded with rich chocolate chips.",
    ingredients: "Flour, butter, brown sugar, cane sugar, eggs, chocolate chips, vanilla, baking soda, salt.",
    allergens: ["gluten", "dairy", "eggs", "soy"],
    dietary: ["vegetarian"],
    available: true
  },

  {
    id: "item-2",
    name: "Blueberry Muffin",
    price: 3.50,
    image: "",
    description: "Fluffy muffin bursting with fresh blueberries.",
    ingredients: "Flour, sugar, butter, eggs, milk, blueberries, baking powder, vanilla, salt.",
    allergens: ["gluten", "dairy", "eggs"],
    dietary: ["vegetarian"],
    available: true
  },

  {
    id: "item-3",
    name: "Cinnamon Roll",
    price: 4.25,
    image: "",
    description: "Soft, swirled roll topped with cream cheese frosting.",
    ingredients: "Flour, butter, sugar, eggs, milk, yeast, cinnamon, cream cheese, powdered sugar.",
    allergens: ["gluten", "dairy", "eggs"],
    dietary: ["vegetarian"],
    available: true
  },

  {
    id: "item-4",
    name: "Vegan Banana Bread",
    price: 3.75,
    image: "",
    description: "Moist banana bread made with no eggs or dairy.",
    ingredients: "Flour, ripe bananas, cane sugar, vegetable oil, plant milk, baking soda, cinnamon, salt.",
    allergens: ["gluten"],
    dietary: ["vegan", "dairy-free", "egg-free"],
    available: true
  },

  {
    id: "item-5",
    name: "Gluten-Free Brownie",
    price: 4.00,
    image: "",
    description: "Fudgy, decadent brownie made without gluten.",
    ingredients: "Gluten-free flour blend, butter, sugar, eggs, cocoa, chocolate, vanilla, salt.",
    allergens: ["dairy", "eggs"],
    dietary: ["gluten-free", "vegetarian"],
    available: true
  },

  {
    id: "item-6",
    name: "Almond Croissant",
    price: 4.50,
    image: "",
    description: "Flaky, buttery croissant filled with almond cream.",
    ingredients: "Flour, butter, almonds, sugar, eggs, milk, yeast, salt.",
    allergens: ["gluten", "dairy", "eggs", "nuts"],
    dietary: ["vegetarian"],
    available: true
  },

  /* -------- Copy the block above to add more items -------- */

];

/* How many of each item a customer can order in the dropdown */
const MAX_QUANTITY = 12;
