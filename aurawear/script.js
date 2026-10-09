/* ===================================================
   AuraWear - Simple Vanilla JavaScript (College Project)
   Features:
   - Dynamic product & category rendering
   - Filter by categories
   - Instant live search
   - Add to Cart, Quantity adjustment & Cart total
   - Quick-view product modal
   - Contact/Newsletter interaction
   =================================================== */

// 1. Categories Data
const categories = [
  {
    id: 'dresses',
    name: 'Summer Dresses',
    count: '24 items',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tops',
    name: 'Tops & Blouses',
    count: '30 items',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ethnic',
    name: 'Kurtis & Ethnic',
    count: '18 items',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bottoms',
    name: 'Jeans & Trousers',
    count: '14 items',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'
  }
];

// 2. Product Items Data
const products = [
  {
    id: 1,
    name: "Floral Summer Maxi Dress",
    category: "dresses",
    categoryLabel: "Dresses",
    price: 1899,
    oldPrice: 2999,
    discount: "37% OFF",
    rating: "4.8 (124 reviews)",
    badge: "Bestseller",
    description: "Whimsical pastel floral maxi dress crafted with lightweight, breathable viscose with delicate flutter sleeves.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Elegant Satin Cowl Neck Top",
    category: "tops",
    categoryLabel: "Tops & Tees",
    price: 1199,
    oldPrice: 1799,
    discount: "33% OFF",
    rating: "4.6 (89 reviews)",
    badge: "Trending",
    description: "Luxurious silk-satin drape top with a flattering cowl neckline. Perfect for casual evenings or dinners.",
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "High-Rise Wide-Leg Denim Jeans",
    category: "bottoms",
    categoryLabel: "Jeans & Pants",
    price: 2199,
    oldPrice: 3299,
    discount: "33% OFF",
    rating: "4.9 (210 reviews)",
    badge: "Must Have",
    description: "Classic vintage wash comfort-stretch cotton denim with relaxed wide legs for effortless comfort.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Pure Cotton Hand-Block Print Kurti",
    category: "ethnic",
    categoryLabel: "Ethnic & Kurtis",
    price: 1249,
    oldPrice: 1999,
    discount: "38% OFF",
    rating: "4.7 (95 reviews)",
    badge: "New Arrival",
    description: "Authentic hand-block printed straight kurti with three-quarter sleeves and soft breathable fabric.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Linen Blend Vacation Co-ord Set",
    category: "coord",
    categoryLabel: "Co-ord Sets",
    price: 2499,
    oldPrice: 3999,
    discount: "38% OFF",
    rating: "4.8 (73 reviews)",
    badge: "Hot Deal",
    description: "Two-piece matching resort co-ord set with relaxed button-down top and comfortable shorts.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Ribbed Knit Seamless Crop Top",
    category: "tops",
    categoryLabel: "Tops & Tees",
    price: 699,
    oldPrice: 1199,
    discount: "42% OFF",
    rating: "4.5 (140 reviews)",
    badge: "Popular",
    description: "Buttery-soft ribbed texture crop top with contoured stretch fit for all-day styling.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Pleated Ombre Satin Midi Skirt",
    category: "bottoms",
    categoryLabel: "Jeans & Pants",
    price: 1599,
    oldPrice: 2299,
    discount: "30% OFF",
    rating: "4.6 (62 reviews)",
    badge: "Trending",
    description: "High-waisted accordion pleated midi skirt featuring a subtle gradient tone and elastic waistband.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Embroidered Silk Festive Kurta Set",
    category: "ethnic",
    categoryLabel: "Ethnic & Kurtis",
    price: 3299,
    oldPrice: 4999,
    discount: "34% OFF",
    rating: "4.9 (184 reviews)",
    badge: "Festive",
    description: "Rich Chanderi silk straight kurta adorned with zari embroidery, matching palazzo and chiffon dupatta.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
  }
];

// Shopping Cart state
let cart = [];
let currentCategory = 'all';

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts(products);
  loadCartFromStorage();
});

// Render Category Cards
function renderCategories() {
  const container = document.getElementById("categoriesGrid");
  container.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="filterByCategoryDirect('${cat.id}')">
      <img src="${cat.image}" alt="${cat.name}">
      <div class="category-info">
        <h3>${cat.name}</h3>
        <span>${cat.count}</span>
      </div>
    </div>
  `).join("");
}

// Render Products Grid
function renderProducts(items) {
  const container = document.getElementById("productsGrid");
  
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">No matching clothes found. Try another search or filter!</div>`;
    return;
  }

  container.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-image-box" onclick="openModal(${p.id})">
        <img src="${p.image}" alt="${p.name}">
        ${p.badge ? `<span class="tag-badge">${p.badge}</span>` : ''}
        <span class="discount-badge">${p.discount}</span>
      </div>
      <div class="product-details">
        <span class="product-category-name">${p.categoryLabel}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">Rating: ${p.rating}</div>
        <div class="product-pricing">
          <span class="current-price">₹${p.price}</span>
          <span class="old-price">₹${p.oldPrice}</span>
        </div>
        <div class="card-actions">
          <button class="add-cart-btn" onclick="addToCart(${p.id})">Add to Bag</button>
          <button class="view-btn" onclick="openModal(${p.id})">Quick View</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Filter products by category buttons
function setCategoryFilter(catId, btnElement) {
  currentCategory = catId;
  
  // Highlight active button
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  filterProducts();
}

function filterByCategoryDirect(catId) {
  const targetBtn = Array.from(document.querySelectorAll(".filter-btn"))
    .find(btn => btn.getAttribute("onclick")?.includes(catId));
  
  setCategoryFilter(catId, targetBtn);
  document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}

// Search and Category Combined Filter
function filterProducts() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase().trim();

  let filtered = products.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                          item.categoryLabel.toLowerCase().includes(searchQuery) ||
                          item.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  renderProducts(filtered);
}

// Cart Drawer open/close
function toggleCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  drawer.classList.toggle("open");
  overlay.classList.toggle("open");
}

// Add Item To Cart
function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  saveCartToStorage();

  // Open cart drawer so user sees item added
  const drawer = document.getElementById("cartDrawer");
  if (!drawer.classList.contains("open")) {
    toggleCart();
  }
}

// Change Quantity
function updateQty(productId, change) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  updateCartUI();
  saveCartToStorage();
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartUI();
  saveCartToStorage();
}

// Update Cart Visuals
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.getElementById("cartCount").innerText = totalCount;
  document.getElementById("cartDrawerCount").innerText = totalCount;
  document.getElementById("cartTotal").innerText = `₹${totalPrice}`;

  const cartContainer = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-state">
        <p style="font-weight: 600; font-size: 1.1rem;">Your bag is empty</p>
        <p style="font-size: 0.85rem; margin-top: 5px;">Add outfits to your bag to see them here.</p>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span><b>${item.qty}</b></span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="delete-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Storage Helpers (So cart doesn't disappear on refresh)
function saveCartToStorage() {
  try {
    localStorage.setItem("aurawear_cart", JSON.stringify(cart));
  } catch(e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("aurawear_cart");
    if (saved) {
      cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch(e) {}
}

// Checkout simulation
function checkout() {
  if (cart.length === 0) {
    alert("Please add items to your cart before checkout!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  alert(`Thank you for placing your order at AuraWear!\n\nOrder Value: ₹${total}\nPayment Method: Cash on Delivery / UPI\n\nYour order has been placed successfully.`);
  cart = [];
  updateCartUI();
  saveCartToStorage();
  toggleCart();
}

// Newsletter form handle
function handleSubscribe(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  alert(`Thank you! ${email} has been subscribed for coupon codes.`);
  document.getElementById("emailInput").value = "";
}

// Modal View
function openModal(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById("productModal");
  const modalDetails = document.getElementById("modalDetails");

  modalDetails.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div class="modal-details">
      <span class="product-category-name">${item.categoryLabel}</span>
      <h2 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 8px;">${item.name}</h2>
      <div style="color: #666; font-size: 0.9rem; margin-bottom: 12px;">Rating: ${item.rating}</div>
      <div class="product-pricing" style="margin-bottom: 16px;">
        <span class="current-price" style="font-size: 1.5rem;">₹${item.price}</span>
        <span class="old-price" style="font-size: 1.1rem;">₹${item.oldPrice}</span>
        <span style="color: #2e7d32; font-weight: bold; font-size: 0.9rem;">${item.discount}</span>
      </div>
      <p style="color: #555; font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">${item.description}</p>
      
      <div style="margin-bottom: 20px;">
        <label style="display:block; font-weight: 600; font-size: 0.85rem; margin-bottom: 6px;">Select Size:</label>
        <div style="display: flex; gap: 8px;">
          <span style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.85rem; cursor: pointer;">S</span>
          <span style="padding: 6px 12px; border: 1px solid var(--primary); background: var(--primary-light); color: var(--primary); font-weight:bold; border-radius: 4px; font-size: 0.85rem; cursor: pointer;">M</span>
          <span style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.85rem; cursor: pointer;">L</span>
          <span style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.85rem; cursor: pointer;">XL</span>
        </div>
      </div>

      <button class="btn btn-primary" onclick="addToCart(${item.id}); closeModalDirect();" style="margin-top: auto;">
        Add to Shopping Bag
      </button>
    </div>
  `;

  modal.classList.add("open");
}

function closeModal(event) {
  if (event.target.id === "productModal") {
    closeModalDirect();
  }
}

function closeModalDirect() {
  document.getElementById("productModal").classList.remove("open");
}
