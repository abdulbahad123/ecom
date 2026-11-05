/**
 * Storify E-Commerce Frontend Engine
 * Vanilla JavaScript High-Performance Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // Comprehensive Product Catalog Data
  // =========================================================================
  const products = [
    // Top Selling & Featured
    {
      id: 'zeblaze-gtr-3-pro-smartwatch',
      name: 'ZEBLAZE GTR 3 PRO Smartwatch',
      category: 'Smartwatch',
      price: 1600.00,
      oldPrice: null,
      rating: 4.8,
      reviews: 142,
      image: 'assets/images/c9235376-b281-42fe-8441-aa1bc0a41875.png',
      badge: '',
      colors: ['#1e293b', '#e2e8f0', '#fbbf24'],
      tab: 'Featured'
    },
    {
      id: 'ipad-mini-7',
      name: 'iPad mini 7',
      category: 'Laptops',
      price: 700.00,
      oldPrice: null,
      rating: 4.9,
      reviews: 98,
      image: 'assets/images/ChatGPT_Image_Sep_1__2026__11_34_17_AM__2_.webp',
      badge: 'Pre-order',
      colors: ['#475569', '#cbd5e1', '#c084fc'],
      tab: 'Featured'
    },
    {
      id: 'xiaomi-pad-8-pro',
      name: 'Xiaomi Pad 8 Pro',
      category: 'Laptops',
      price: 850.00,
      oldPrice: 900.00,
      rating: 4.7,
      reviews: 64,
      image: 'assets/images/ChatGPT_Image_Aug_31__2026__06_54_05_PM__1_.webp',
      badge: '',
      colors: ['#0f172a', '#3b82f6'],
      tab: 'Featured'
    },
    {
      id: 'galaxy-s25-5g',
      name: 'Galaxy S25 5G',
      category: 'Samsung',
      price: 700.00,
      oldPrice: 900.00,
      rating: 4.9,
      reviews: 210,
      image: 'assets/images/ChatGPT_Image_Aug_31__2026__12_56_47_PM__3_.webp',
      badge: '',
      colors: ['#1e3a8a', '#a7f3d0', '#ffffff'],
      tab: 'Featured'
    },
    {
      id: 'apple-watch-ultra-2-with-ocean-band-gps-cellular',
      name: 'Apple Watch Ultra 2 with Ocean Band GPS + Cellular',
      category: 'Smartwatch',
      price: 1199.00,
      oldPrice: null,
      rating: 5.0,
      reviews: 312,
      image: 'assets/images/ChatGPT_Image_Aug_30__2026__02_08_15_PM__1_.webp',
      badge: '',
      colors: ['#f97316', '#0f172a', '#e2e8f0'],
      tab: 'Featured'
    },
    // Top Collections: iPhones
    {
      id: 'iphone-18-pro-max',
      name: 'iPhone 18 Pro Max',
      category: 'Iphone',
      price: 2200.00,
      oldPrice: null,
      rating: 5.0,
      reviews: 420,
      image: 'assets/images/ChatGPT_Image_Sep_29__2026__06_27_08_PM-1.png',
      badge: '',
      colors: ['#4a044e', '#818cf8', '#000000'],
      tab: 'Collections'
    },
    {
      id: 'iphone-17-pro-max',
      name: 'iPhone 17 Pro Max',
      category: 'Iphone',
      price: 1200.00,
      oldPrice: 1500.00,
      rating: 4.9,
      reviews: 388,
      image: 'assets/images/ChatGPT_Image_Aug_28__2026__03_55_02_PM__3_.webp',
      badge: '',
      colors: ['#ea580c', '#1e3a8a', '#0f172a'],
      tab: 'On Sale'
    },
    {
      id: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max',
      category: 'Iphone',
      price: 1000.00,
      oldPrice: 1200.00,
      rating: 4.8,
      reviews: 512,
      image: 'assets/images/ChatGPT_Image_Aug_28__2026__04_01_47_PM__4_.webp',
      badge: '',
      colors: ['#d97706', '#f8fafc', '#18181b'],
      tab: 'On Sale'
    },
    {
      id: 'iphone-17',
      name: 'iPhone 17',
      category: 'Iphone',
      price: 1000.00,
      oldPrice: null,
      rating: 4.8,
      reviews: 195,
      image: 'assets/images/ChatGPT_Image_Aug_28__2026__04_26_03_PM__1_.webp',
      badge: '',
      colors: ['#0f172a', '#e9d5ff', '#a7f3d0'],
      tab: 'New Arrivals'
    },
    // Top Collections: Apple Watches
    {
      id: 'galaxy-watch9',
      name: 'Galaxy Watch9',
      category: 'Smartwatch',
      price: 400.00,
      oldPrice: null,
      rating: 4.9,
      reviews: 178,
      image: 'assets/images/ChatGPT_Image_Sep_3__2026__06_07_15_PM__2_.webp',
      badge: '',
      colors: ['#000000', '#ffffff', '#38bdf8'],
      tab: 'Collections'
    },
    {
      id: 'huawei-watch-fit-2-active',
      name: 'Huawei Watch Fit 2 Active',
      category: 'Smartwatch',
      price: 140.00,
      oldPrice: null,
      rating: 4.7,
      reviews: 86,
      image: 'assets/images/ChatGPT_Image_Aug_31__2026__01_45_51_PM__3_.webp',
      badge: '',
      colors: ['#0f172a', '#bae6fd', '#cbd5e1'],
      tab: 'Collections'
    },
    {
      id: 'galaxy-watch7',
      name: 'Galaxy Watch7',
      category: 'Smartwatch',
      price: 160.00,
      oldPrice: null,
      rating: 4.8,
      reviews: 94,
      image: 'assets/images/1779021764635-uk1o9w-galaxy-watch7--green-8018.png',
      badge: '',
      colors: ['#15803d', '#cbd5e1', '#fef08a'],
      tab: 'Collections'
    },
    // MacBook Pro Banner
    {
      id: 'macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu',
      name: 'MacBook Pro M5 14-Inch 24GB/1TB',
      category: 'Laptops',
      price: 1999.00,
      oldPrice: 2199.00,
      rating: 5.0,
      reviews: 130,
      image: 'assets/images/OnPaste_20260905-185602.webp',
      badge: '',
      colors: ['#475569', '#cbd5e1'],
      tab: 'Featured'
    },
    // Find your favorite products additions
    {
      id: 'soundpeats-space-anc-headphones',
      name: 'SoundPEATS Space ANC Headphones',
      category: 'TV & Audio',
      price: 790.00,
      oldPrice: null,
      rating: 4.7,
      reviews: 112,
      image: 'assets/images/480ac705-a132-421f-9d48-38b2991c1a5f.png',
      badge: '',
      colors: ['#0f172a', '#f8fafc', '#d4af37'],
      tab: 'Featured'
    },
    {
      id: 'vivo-x300-ultra',
      name: 'VIVO X300 Ultra',
      category: 'Phones',
      price: 1000.00,
      oldPrice: null,
      rating: 4.9,
      reviews: 77,
      image: 'assets/images/73d363b1-b532-413b-a688-fdc0c6923a45.png',
      badge: '',
      colors: ['#1e293b', '#b91c1c', '#f59e0b'],
      tab: 'New Arrivals'
    },
    {
      id: 'realme-15-pro-5g-official',
      name: 'Realme 15 Pro 5G - Official',
      category: 'Phones',
      price: 670.00,
      oldPrice: null,
      rating: 4.6,
      reviews: 95,
      image: 'assets/images/ChatGPT_Image_Sep_29__2026__07_44_23_PM-1.png',
      badge: '',
      colors: ['#047857', '#0f172a'],
      tab: 'Featured'
    },
    {
      id: 'galaxy-s25-ultra-5g',
      name: 'Galaxy S25 Ultra 5G',
      category: 'Samsung',
      price: 1299.00,
      oldPrice: 1499.00,
      rating: 5.0,
      reviews: 340,
      image: 'assets/images/ChatGPT_Image_Aug_29__2026__06_32_27_PM.webp',
      badge: '',
      colors: ['#1e293b', '#38bdf8', '#fbbf24'],
      tab: 'Featured'
    },
    {
      id: 'galaxy-tab-s10-fe',
      name: 'Galaxy Tab S10 FE',
      category: 'Laptops',
      price: 4880.00,
      oldPrice: null,
      rating: 4.8,
      reviews: 53,
      image: 'assets/images/59e17bfe-d47b-45a4-acb7-aacfaa54988d.png',
      badge: '',
      colors: ['#475569', '#bae6fd'],
      tab: 'Featured'
    },
    {
      id: 'samsung-ww90dg6g94lbu4-inverter-front-loading-washing-machine-9kg',
      name: 'Samsung WW90DG6G94LBU4 Washing Machine - 9KG',
      category: 'Appliances',
      price: 6000.00,
      oldPrice: null,
      rating: 4.9,
      reviews: 28,
      image: 'assets/images/1b371e02-42a7-4b38-a090-a57527816f6b.png',
      badge: '',
      colors: ['#18181b'],
      tab: 'Featured'
    },
    {
      id: 'sony-bravia-9-k-85xr90-85-inch-mini-led-4k-google-tv',
      name: 'Sony BRAVIA 9 85-Inch Mini LED 4K Google TV',
      category: 'TV & Audio',
      price: 1299.00,
      oldPrice: null,
      rating: 5.0,
      reviews: 160,
      image: 'assets/images/a97b2646-5dde-4b62-bfdd-09dc84f192ab.png',
      badge: '',
      colors: ['#0f172a'],
      tab: 'Featured'
    },
    {
      id: 'msi-b760m-bomber-wifi-micro-atx-motherboard',
      name: 'MSI B760M BOMBER WiFi Motherboard',
      category: 'Desktop',
      price: 1850.00,
      oldPrice: null,
      rating: 4.8,
      reviews: 44,
      image: 'assets/images/97d5c427-e2e2-4568-b5ae-d012cc9d95e9.png',
      badge: '',
      colors: ['#1e293b'],
      tab: 'Featured'
    },
    {
      id: 'sony-playstation-portal-remote-player-for-ps5-console',
      name: 'Sony PlayStation Portal Remote Player for PS5',
      category: 'Gaming',
      price: 199.00,
      oldPrice: null,
      rating: 4.9,
      reviews: 310,
      image: 'assets/images/64c3ff8d-f423-44ab-bf2f-63e378a2bbd8.png',
      badge: '',
      colors: ['#ffffff', '#0f172a'],
      tab: 'Featured'
    },
    {
      id: 'dji-air-3s-fly-more-combo-with-dji-rc-2-remote-controller',
      name: 'DJI Air 3S Fly More Combo with RC 2',
      category: 'Cameras',
      price: 1660.00,
      oldPrice: null,
      rating: 5.0,
      reviews: 89,
      image: 'assets/images/ChatGPT_Image_Sep_7__2026__09_21_54_PM__1_.webp',
      badge: '',
      colors: ['#64748b'],
      tab: 'Featured'
    },
    {
      id: 'a4tech-bloody-at87-rgb-wired-mechanical-gaming-keyboard',
      name: 'A4TECH Bloody AT87 RGB Gaming Keyboard',
      category: 'Gaming',
      price: 70.00,
      oldPrice: null,
      rating: 4.7,
      reviews: 140,
      image: 'assets/images/ChatGPT_Image_Sep_7__2026__08_43_10_PM__1_.webp',
      badge: '',
      colors: ['#eab308', '#0f172a'],
      tab: 'Featured'
    }
  ];

  // State
  let cart = JSON.parse(localStorage.getItem('storify_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('storify_wishlist') || '[]');

  // Toast System
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  function showToast(message, icon = '✓') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // Cart Management
  const cartBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartTriggerBtns = document.querySelectorAll('[data-cart-trigger]');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartBadgeCountEls = document.querySelectorAll('[data-cart-count]');

  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    cartBadgeCountEls.forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (!cartItemsList) return;
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: #6b7280;">
          <svg style="width: 48px; height: 48px; margin: 0 auto 12px; stroke: #9ca3af;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p style="font-size: 16px; font-weight: 600; color: #111827;">Your cart is empty</p>
          <p style="font-size: 13px; margin-top: 4px;">Explore our categories and find great deals!</p>
        </div>
      `;
      return;
    }

    cartItemsList.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-meta">${item.category}</p>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-qty-ctrl">
            <button class="cart-qty-btn" onclick="window.changeCartQty(${idx}, -1)">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" onclick="window.changeCartQty(${idx}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="window.removeCartItem(${idx})" title="Remove item">
          <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }

  window.addToCart = function(product, qty = 1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    localStorage.setItem('storify_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Added "${product.name}" to cart!`);
    openCart();
  };

  window.changeCartQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('storify_cart', JSON.stringify(cart));
    updateCartUI();
  };

  window.removeCartItem = function(index) {
    if (!cart[index]) return;
    const name = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('storify_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Removed "${name}" from cart`);
  };

  function openCart() {
    if (cartBackdrop && cartDrawer) {
      cartBackdrop.classList.add('active');
      cartDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartBackdrop && cartDrawer) {
      cartBackdrop.classList.remove('active');
      cartDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  cartTriggerBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
  updateCartUI();

  // Wishlist Logic
  const wishlistBadgeEls = document.querySelectorAll('[data-wishlist-count]');

  function updateWishlistUI() {
    wishlistBadgeEls.forEach(el => {
      el.textContent = wishlist.length;
      el.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
    });
  }

  window.toggleWishlist = function(productId, btn) {
    const idx = wishlist.indexOf(productId);
    const prod = products.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'Product';

    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast(`Removed from wishlist: ${prodName}`);
      if (btn) btn.classList.remove('active-wishlist');
    } else {
      wishlist.push(productId);
      showToast(`Added to wishlist: ${prodName}`, '❤️');
      if (btn) btn.classList.add('active-wishlist');
    }
    localStorage.setItem('storify_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
  };
  updateWishlistUI();

  // Hook up wishlist buttons in the page
  document.querySelectorAll('button[aria-label="Add to wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('a') || btn.closest('.group');
      const img = card ? card.querySelector('img') : null;
      const title = img ? img.getAttribute('alt') : 'Product';
      const idSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      window.toggleWishlist(idSlug, btn);
    });
  });

  // Quick View Modal
  const qvBackdrop = document.getElementById('quickViewBackdrop');
  const qvCloseBtn = document.getElementById('qvCloseBtn');
  let currentQvProduct = null;
  let currentQvQty = 1;

  window.openQuickView = function(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) {
      // Find by partial id match
      product = products.find(p => p.id.includes(productId) || productId.includes(p.id));
    }
    if (!product) {
      // fallback generic
      product = {
        id: productId,
        name: productId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        category: 'Electronics',
        price: 999.00,
        oldPrice: null,
        image: 'assets/images/ChatGPT_Image_Sep_29__2026__06_27_08_PM-1.png',
        colors: ['#1e293b', '#e2e8f0']
      };
    }
    currentQvProduct = product;
    currentQvQty = 1;

    document.getElementById('qvImage').src = product.image;
    document.getElementById('qvImage').alt = product.name;
    document.getElementById('qvTitle').textContent = product.name;
    document.getElementById('qvCategory').textContent = product.category;
    document.getElementById('qvPrice').textContent = `$${product.price.toFixed(2)}`;
    
    const oldPriceEl = document.getElementById('qvOldPrice');
    if (product.oldPrice) {
      oldPriceEl.textContent = `$${product.oldPrice.toFixed(2)}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }

    const swatchesContainer = document.getElementById('qvSwatches');
    if (swatchesContainer) {
      swatchesContainer.innerHTML = (product.colors || ['#000', '#fff']).map((c, i) => `
        <div class="qv-swatch-dot ${i === 0 ? 'active' : ''}" style="background-color: ${c};" onclick="this.parentNode.querySelectorAll('.qv-swatch-dot').forEach(el=>el.classList.remove('active')); this.classList.add('active');"></div>
      `).join('');
    }

    document.getElementById('qvQty').textContent = currentQvQty;

    if (qvBackdrop) {
      qvBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.changeQvQty = function(delta) {
    currentQvQty = Math.max(1, currentQvQty + delta);
    document.getElementById('qvQty').textContent = currentQvQty;
  };

  window.addQvToCart = function() {
    if (currentQvProduct) {
      window.addToCart(currentQvProduct, currentQvQty);
      closeQuickView();
    }
  };

  function closeQuickView() {
    if (qvBackdrop) {
      qvBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (qvCloseBtn) qvCloseBtn.addEventListener('click', closeQuickView);
  if (qvBackdrop) qvBackdrop.addEventListener('click', (e) => {
    if (e.target === qvBackdrop) closeQuickView();
  });

  // Search Engine
  const searchInput = document.getElementById('searchInput');
  const searchCategorySelect = document.getElementById('searchCategorySelect');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');

  if (searchInput && searchResultsDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const selectedCat = searchCategorySelect ? searchCategorySelect.value : '';

      if (query.length < 2) {
        searchResultsDropdown.classList.remove('active');
        return;
      }

      const matches = products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        const matchesCat = !selectedCat || selectedCat === 'All Categories' || p.category.toLowerCase() === selectedCat.toLowerCase();
        return matchesQuery && matchesCat;
      });

      if (matches.length > 0) {
        searchResultsDropdown.innerHTML = matches.map(p => `
          <div class="search-result-item" onclick="window.openQuickView('${p.id}')">
            <img src="${p.image}" class="search-result-img" alt="${p.name}">
            <div class="search-result-info">
              <div class="search-result-title">${p.name}</div>
              <div class="search-result-meta">${p.category}</div>
            </div>
            <div class="search-result-price">$${p.price.toFixed(2)}</div>
          </div>
        `).join('');
        searchResultsDropdown.classList.add('active');
      } else {
        searchResultsDropdown.innerHTML = `
          <div style="padding: 16px; text-align: center; color: #64748b; font-size: 13.5px;">
            No products found matching "<strong>${query}</strong>"
          </div>
        `;
        searchResultsDropdown.classList.add('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
        searchResultsDropdown.classList.remove('active');
      }
    });
  }

  // Top Selling Tabs & Carousel Track Controls
  const tabBtns = document.querySelectorAll('[data-selling-tab]');
  const topSellingTrack = document.getElementById('topSellingTrack');
  const sellingScrollLeft = document.getElementById('sellingScrollLeft');
  const sellingScrollRight = document.getElementById('sellingScrollRight');

  if (sellingScrollLeft && topSellingTrack) {
    sellingScrollLeft.addEventListener('click', (e) => {
      e.preventDefault();
      topSellingTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (sellingScrollRight && topSellingTrack) {
    sellingScrollRight.addEventListener('click', (e) => {
      e.preventDefault();
      topSellingTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      if (topSellingTrack) {
        topSellingTrack.scrollTo({ left: 0, behavior: 'smooth' });
        // Subtle smooth fade effect to confirm selection
        topSellingTrack.style.opacity = '0.7';
        setTimeout(() => {
          topSellingTrack.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Find Products Category Filter Chips
  const findFilterBtns = document.querySelectorAll('[data-find-filter]');
  findFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      findFilterBtns.forEach(b => {
        b.classList.remove('bg-foreground', 'text-background');
        b.classList.add('border', 'border-border', 'bg-background');
      });
      btn.classList.add('bg-foreground', 'text-background');
      btn.classList.remove('border', 'border-border', 'bg-background');
      showToast(`Filtered by: ${btn.getAttribute('data-find-filter')}`);
    });
  });

  // Hero Carousel Slider Controller (Xiaomi, Googlebook, ProArt 5K)
  const heroSliderTrack = document.getElementById('heroSliderTrack');
  if (heroSliderTrack) {
    let currentSlide = 0;
    const totalSlides = heroSliderTrack.children.length; // 3 slides

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      heroSliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    let slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);

    heroSliderTrack.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSliderTrack.parentElement.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    heroSliderTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(slideInterval);
    }, { passive: true });

    heroSliderTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        goToSlide(currentSlide + 1);
      } else if (touchEndX - touchStartX > 45) {
        goToSlide(currentSlide - 1);
      }
      slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }, { passive: true });
  }

  // Global 404 Prevention & Smart Link Routing (Task 1)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;

    // Ignore javascript: or full external URLs
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('javascript:')) return;

    // If it's a direct hash link, let native behavior proceed
    if (href.startsWith('#')) return;

    // Prevent default browser navigation to non-existent backend pages (avoids 404)
    e.preventDefault();

    if (href.includes('category=') || href.includes('/categories')) {
      const parts = href.split('category=');
      const catName = parts[1] ? parts[1].split('&')[0].replace(/-/g, ' ') : 'Categories';
      showToast(`Showing items for: ${catName.toUpperCase()}`);
      const targetSec = document.getElementById('findProductsSection') || document.querySelector('[data-find-filter]') || document.getElementById('categoriesRail');
      if (targetSec) targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (href.includes('vendor')) {
      const vendorSec = document.getElementById('vendorsRail') || document.querySelector('section:has(#vendorsRail)');
      if (vendorSec) vendorSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Viewing marketplace vendors');
    } else if (href.includes('collection')) {
      const collectionsSec = document.getElementById('topSellingRail');
      if (collectionsSec) collectionsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Viewing featured collections');
    } else if (href.includes('cart')) {
      const cartDrawer = document.getElementById('cartDrawer');
      const cartBackdrop = document.getElementById('cartDrawerBackdrop');
      if (cartDrawer && cartBackdrop) {
        cartDrawer.classList.add('active');
        cartBackdrop.classList.add('active');
      }
    } else {
      const text = anchor.textContent.trim() || 'Store Page';
      showToast(`Browsing ${text}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Mobile Menu Drawer Toggle
  window.toggleMobileCategoriesDrawer = function() {
    const allCatDropdown = document.getElementById('allCategoriesDropdown');
    const allCatChevron = document.getElementById('allCategoriesNavChevron');
    if (allCatDropdown) {
      const isHidden = allCatDropdown.classList.contains('hidden');
      if (isHidden) {
        allCatDropdown.classList.remove('hidden');
        if (allCatChevron) allCatChevron.style.transform = 'rotate(180deg)';
        allCatDropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        allCatDropdown.classList.add('hidden');
        if (allCatChevron) allCatChevron.style.transform = 'rotate(0deg)';
      }
    } else {
      showToast('Categories: Accessories, Appliances, Cameras, Desktop, Gaming, Laptops, Phones, Smartwatch');
    }
  };

  // Chat Widget
  const chatBtn = document.getElementById('floatingChatBtn');
  const chatWindow = document.getElementById('chatWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatMessages = document.getElementById('chatMessages');

  if (chatBtn && chatWindow) {
    chatBtn.addEventListener('click', () => chatWindow.classList.toggle('active'));
  }
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

  function sendChatMessage(text) {
    if (!text || !text.trim()) return;
    const msg = text.trim();

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = msg;
    chatMessages.appendChild(userBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (chatInput) chatInput.value = '';

    setTimeout(() => {
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      const lower = msg.toLowerCase();
      if (lower.includes('order') || lower.includes('track')) {
        botBubble.innerHTML = 'You can track your order status anytime under <a href="#track" style="color: #2563eb; text-decoration: underline;">Track Order</a> with your Order ID!';
      } else if (lower.includes('ship') || lower.includes('delivery')) {
        botBubble.innerHTML = 'All orders over <strong>$50</strong> qualify for <strong>Free Express Shipping</strong> worldwide! Typical delivery is 2–4 business days.';
      } else if (lower.includes('return') || lower.includes('refund')) {
        botBubble.innerHTML = 'We offer a 30-day hassle-free return and full refund guarantee on all products!';
      } else {
        botBubble.innerHTML = 'Thank you for reaching out! Our support team is online 24/7 to help you with any questions.';
      }
      chatMessages.appendChild(botBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => sendChatMessage(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage(chatInput.value);
    });
  }

  window.sendQuickChat = function(text) {
    sendChatMessage(text);
  };

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Dark Mode Toggle
  const darkModeToggles = document.querySelectorAll('[data-dark-toggle]');
  const isDarkSaved = localStorage.getItem('storify_dark_mode') === 'true';
  if (isDarkSaved) document.documentElement.classList.add('dark');

  darkModeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('storify_dark_mode', isDark);
      showToast(isDark ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
    });
  });

  // Rail Scrolling
  const catRail = document.getElementById('categoriesRail');
  const catPrevBtn = document.getElementById('catPrevBtn');
  const catNextBtn = document.getElementById('catNextBtn');
  if (catRail) {
    if (catNextBtn) catNextBtn.addEventListener('click', () => catRail.scrollBy({ left: 320, behavior: 'smooth' }));
    if (catPrevBtn) catPrevBtn.addEventListener('click', () => catRail.scrollBy({ left: -320, behavior: 'smooth' }));
  }

  const sellingRail = document.getElementById('topSellingRail');
  const sellingPrevBtn = document.getElementById('sellingPrevBtn');
  const sellingNextBtn = document.getElementById('sellingNextBtn');
  if (sellingRail) {
    if (sellingNextBtn) sellingNextBtn.addEventListener('click', () => sellingRail.scrollBy({ left: 360, behavior: 'smooth' }));
    if (sellingPrevBtn) sellingPrevBtn.addEventListener('click', () => sellingRail.scrollBy({ left: -360, behavior: 'smooth' }));
  }

  // Top Vendors Rail Scrolling
  const vendorsRail = document.getElementById('vendorsRail');
  const vendorPrevBtn = document.getElementById('vendorPrevBtn');
  const vendorNextBtn = document.getElementById('vendorNextBtn');
  if (vendorsRail) {
    if (vendorNextBtn) vendorNextBtn.addEventListener('click', () => vendorsRail.scrollBy({ left: 320, behavior: 'smooth' }));
    if (vendorPrevBtn) vendorPrevBtn.addEventListener('click', () => vendorsRail.scrollBy({ left: -320, behavior: 'smooth' }));
  }

  // Top Vendors Favorite Toggle
  document.querySelectorAll('button[aria-label^="Favorite "]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const vendorName = btn.getAttribute('aria-label').replace('Favorite ', '');
      const isFav = btn.getAttribute('aria-pressed') === 'true';
      const newFav = !isFav;
      btn.setAttribute('aria-pressed', String(newFav));
      const icon = btn.querySelector('svg');
      if (icon) {
        if (newFav) {
          icon.classList.add('fill-red-500', 'text-red-500');
          showToast(`Added ${vendorName} to favorite vendors! ❤️`);
        } else {
          icon.classList.remove('fill-red-500', 'text-red-500');
          showToast(`Removed ${vendorName} from favorites`);
        }
      }
    });
  });



  // =========================================================================
  // All Categories Popover & Mega-Flyout Controller (Screenshots 1, 3, 4, 5)
  // =========================================================================
  const allCatWrapper = document.getElementById('allCategoriesWrapper');
  const allCatBtn = document.getElementById('allCategoriesNavBtn');
  const allCatChevron = document.getElementById('allCategoriesNavChevron');
  const allCatDropdown = document.getElementById('allCategoriesDropdown');
  const categoryMegaFlyout = document.getElementById('categoryMegaFlyout');
  const catPopoverItems = document.querySelectorAll('.cat-popover-item');
  const flyoutPanes = document.querySelectorAll('.flyout-pane');

  function openAllCategories() {
    if (allCatDropdown) allCatDropdown.classList.remove('hidden');
    if (allCatChevron) allCatChevron.style.transform = 'rotate(180deg)';
    closeCollections();
  }

  function closeAllCategories() {
    if (allCatDropdown) allCatDropdown.classList.add('hidden');
    if (categoryMegaFlyout) categoryMegaFlyout.classList.add('hidden');
    if (allCatChevron) allCatChevron.style.transform = 'rotate(0deg)';
    catPopoverItems.forEach(item => item.classList.remove('active'));
    flyoutPanes.forEach(pane => pane.classList.add('hidden'));
  }

  if (allCatBtn) {
    allCatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = allCatDropdown && allCatDropdown.classList.contains('hidden');
      if (isHidden) {
        openAllCategories();
      } else {
        closeAllCategories();
      }
    });
  }

  // Hover handlers for flyouts (Desktop, Gaming, Phones)
  catPopoverItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const flyoutType = item.getAttribute('data-flyout');
      catPopoverItems.forEach(i => i.classList.remove('active'));
      flyoutPanes.forEach(p => p.classList.add('hidden'));

      if (flyoutType) {
        item.classList.add('active');
        const targetPane = document.getElementById(`flyout-content-${flyoutType}`);
        if (targetPane && categoryMegaFlyout) {
          categoryMegaFlyout.classList.remove('hidden');
          targetPane.classList.remove('hidden');
        }
      } else {
        if (categoryMegaFlyout) categoryMegaFlyout.classList.add('hidden');
      }
    });
  });

  // =========================================================================
  // Collections Popover Controller (Screenshot 2)
  // =========================================================================
  const collectionsWrapper = document.getElementById('collectionsWrapper');
  const collectionsBtn = document.getElementById('collectionsNavBtn');
  const collectionsChevron = document.getElementById('collectionsNavChevron');
  const collectionsDropdown = document.getElementById('collectionsDropdown');

  function openCollections() {
    if (collectionsDropdown) collectionsDropdown.classList.remove('hidden');
    if (collectionsChevron) collectionsChevron.style.transform = 'rotate(180deg)';
    closeAllCategories();
  }

  function closeCollections() {
    if (collectionsDropdown) collectionsDropdown.classList.add('hidden');
    if (collectionsChevron) collectionsChevron.style.transform = 'rotate(0deg)';
  }

  if (collectionsBtn) {
    collectionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = collectionsDropdown && collectionsDropdown.classList.contains('hidden');
      if (isHidden) {
        openCollections();
      } else {
        closeCollections();
      }
    });
  }

  // Close menus on outside click or Esc key
  document.addEventListener('click', (e) => {
    if (allCatWrapper && !allCatWrapper.contains(e.target)) {
      closeAllCategories();
    }
    if (collectionsWrapper && !collectionsWrapper.contains(e.target)) {
      closeCollections();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllCategories();
      closeCollections();
    }
  });

  // Copy Coupon Code Logic
  window.copyCouponCode = function(code) {
    if (!code) code = 'TECH15';
    function fallbackCopy(text) {
      const tempInput = document.createElement('input');
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        showToast(`Coupon code ${text} copied to clipboard! 🎉`);
      } catch (err) {
        showToast(`Code: ${text}`);
      }
      document.body.removeChild(tempInput);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Coupon code ${code} copied to clipboard! 🎉`);
      }).catch(() => fallbackCopy(code));
    } else {
      fallbackCopy(code);
    }

    const btn = document.getElementById('copyCouponBtn');
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = `<span class="min-w-0 truncate font-bold text-emerald-400">COPIED!</span><span class="flex shrink-0 items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg><span class="font-sans text-xs font-semibold text-emerald-400">Copied</span></span>`;
      setTimeout(() => {
        btn.innerHTML = origHtml;
      }, 2500);
    }
  };
});
