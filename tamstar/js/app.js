/**
 * TAMSTAR Industrial B2B Platform - Interactive Engine
 */

(function() {
  try {
    const savedTheme = localStorage.getItem('tamstar_theme_v1') || 'orange_ice';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'orange_ice');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification System
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background-color: #0f1c2e;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      border-left: 4px solid ${type === 'success' ? 'var(--theme-primary, #f97316)' : '#2563eb'};
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: auto;
      transform: translateX(30px);
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateX(30px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }
  window.showToast = showToast;

  // 2. Global Keyboard Shortcut for Search (Ctrl + K / Cmd + K)
  const searchInput = document.getElementById('headerSearchInput');
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  // 3. Cart State & Checkout Sidebar Manager (Image 5)
  window.cartState = {
    items: [
      {
        id: 'gloves',
        title: 'Cut-Resistant Gloves, Level A4',
        sku: 'PPE-GLV-3104',
        unitPrice: 28.91,
        qty: 3,
        image: 'assets/product_transparent/Grey and Black Grip Work Gloves.png'
      }
    ]
  };

  // Inject Checkout / Cart Sidebar HTML into body if not present
  window.initCartSidebar = function() {
    if (document.getElementById('cartSidebar')) return;

    const overlay = document.createElement('div');
    overlay.className = 'checkout-sidebar-overlay';
    overlay.id = 'cartSidebarOverlay';
    overlay.onclick = window.closeCartSidebar;
    document.body.appendChild(overlay);

    const sidebar = document.createElement('aside');
    sidebar.className = 'checkout-sidebar';
    sidebar.id = 'cartSidebar';
    sidebar.setAttribute('aria-label', 'Cart Sidebar');
    sidebar.innerHTML = `
      <div class="cart-sidebar-header">
        <h3 class="cart-sidebar-title">Cart (<span id="cartSidebarCount">0</span>)</h3>
        <button type="button" class="cart-sidebar-close-btn" onclick="window.closeCartSidebar()" aria-label="Close cart">
          <svg style="width: 20px; height: 20px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="cart-sidebar-body" id="cartSidebarItems">
        <!-- Rendered dynamically -->
      </div>

      <div class="cart-sidebar-footer" id="cartSidebarFooter">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <span id="cartSubtotal">SAR 0.00</span>
        </div>
        <div class="cart-summary-row">
          <span>VAT (15%)</span>
          <span id="cartVat">SAR 0.00</span>
        </div>
        <div class="cart-summary-row">
          <span>Delivery</span>
          <span class="cart-delivery-free">Free</span>
        </div>
        <div class="cart-summary-total-row">
          <span>Total</span>
          <span id="cartTotal">SAR 0.00</span>
        </div>
        <button type="button" class="cart-checkout-btn" onclick="window.proceedToCheckout()">
          <svg style="width: 16px; height: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span>Proceed to checkout</span>
          <span>&rarr;</span>
        </button>
        <a href="categories.html" class="cart-view-catalog-link" onclick="window.closeCartSidebar()">View full catalog</a>
        <div class="cart-payment-badges">
          <span class="pay-badge pay-mada">mada</span>
          <span class="pay-badge pay-visa">VISA</span>
          <span class="pay-badge pay-mc">MC</span>
          <span class="pay-badge pay-apple">Pay</span>
        </div>
      </div>
    `;
    document.body.appendChild(sidebar);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.closeCartSidebar();
    });

    // Re-render items
    window.renderCartSidebar();
  };

  window.openCartSidebar = function() {
    window.initCartSidebar();
    window.renderCartSidebar();
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartSidebarOverlay');
    if (sidebar && overlay) {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCartSidebar = function() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartSidebarOverlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.renderCartSidebar = function() {
    const container = document.getElementById('cartSidebarItems');
    const countEl = document.getElementById('cartSidebarCount');
    const badgeEl = document.getElementById('cartBadge');
    const subtotalEl = document.getElementById('cartSubtotal');
    const vatEl = document.getElementById('cartVat');
    const totalEl = document.getElementById('cartTotal');
    const footerEl = document.getElementById('cartSidebarFooter');

    const totalCount = window.cartState.items.reduce((sum, item) => sum + item.qty, 0);
    if (countEl) countEl.textContent = totalCount;
    if (badgeEl) {
      badgeEl.textContent = totalCount;
      badgeEl.style.transform = 'scale(1.25)';
      setTimeout(() => { badgeEl.style.transform = 'scale(1)'; }, 200);
    }

    if (!container) return;

    if (window.cartState.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Your cart is empty</div>
          <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Add industrial parts from the catalog or in-stock products.</p>
          <a href="categories.html" class="all-categories-btn" style="text-decoration: none; display: inline-flex;" onclick="window.closeCartSidebar()">Browse categories</a>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';

    let subtotal = 0;
    container.innerHTML = window.cartState.items.map(item => {
      const itemTotal = item.unitPrice * item.qty;
      subtotal += itemTotal;
      return `
        <div class="cart-item-card">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-top">
              <h4 class="cart-item-title">${item.title}</h4>
              <button type="button" class="cart-item-remove-btn" onclick="window.removeFromCart('${item.id}')" aria-label="Remove item">
                <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
            <div class="cart-item-sku">${item.sku || 'IND-PART'}</div>
            <div class="cart-item-bottom">
              <div class="cart-item-stepper">
                <button type="button" class="cart-step-btn" onclick="window.updateCartQty('${item.id}', -1)" aria-label="Decrease quantity">&minus;</button>
                <span class="cart-step-qty">${item.qty}</span>
                <button type="button" class="cart-step-btn" onclick="window.updateCartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-price-block">
                <div class="cart-item-total-price">SAR ${itemTotal.toFixed(2)}</div>
                <div class="cart-item-unit-price">SAR ${item.unitPrice.toFixed(2)}/Unit</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    if (subtotalEl) subtotalEl.textContent = `SAR ${subtotal.toFixed(2)}`;
    if (vatEl) vatEl.textContent = `SAR ${vat.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `SAR ${total.toFixed(2)}`;
  };

  // Add to Cart flying particle animation and badge impact
  window.triggerAddToCartAnimation = function(sourceEl, imgUrl) {
    if (sourceEl) {
      sourceEl.classList.remove('btn-cart-pop');
      void sourceEl.offsetWidth;
      sourceEl.classList.add('btn-cart-pop');
      setTimeout(() => sourceEl.classList.remove('btn-cart-pop'), 600);
    }

    const cartBtn = document.getElementById('cartBadge')?.closest('button') || document.querySelector('.cart-icon-btn') || document.getElementById('cartBadge');
    if (!cartBtn) return;

    const cartRect = cartBtn.getBoundingClientRect();
    const targetX = cartRect.left + cartRect.width / 2;
    const targetY = cartRect.top + cartRect.height / 2;

    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;
    if (sourceEl) {
      const srcRect = sourceEl.getBoundingClientRect();
      startX = srcRect.left + srcRect.width / 2;
      startY = srcRect.top + srcRect.height / 2;
    } else if (typeof window.event !== 'undefined' && window.event && window.event.clientX) {
      startX = window.event.clientX;
      startY = window.event.clientY;
    }

    const flyer = document.createElement('div');
    flyer.className = 'tamstar-cart-flyer';
    if (imgUrl) {
      flyer.innerHTML = `<img src="${imgUrl}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else {
      flyer.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:20px;height:20px;color:var(--theme-primary, #f97316);">
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
      `;
    }

    flyer.style.left = `${startX}px`;
    flyer.style.top = `${startY}px`;
    flyer.style.transform = 'translate(-50%, -50%) scale(1)';
    document.body.appendChild(flyer);

    const duration = 520;
    const startTime = performance.now();
    const peakY = Math.min(startY, targetY) - 55;

    function animateFlyer(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      const easeX = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const currentX = startX + (targetX - startX) * easeX;

      const t = progress;
      const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * peakY + t * t * targetY;

      const scale = 1.05 - progress * 0.7;
      const opacity = progress > 0.88 ? (1 - progress) / 0.12 : 1;

      flyer.style.left = `${currentX}px`;
      flyer.style.top = `${currentY}px`;
      flyer.style.transform = `translate(-50%, -50%) scale(${scale})`;
      flyer.style.opacity = `${opacity}`;

      if (progress < 1) {
        requestAnimationFrame(animateFlyer);
      } else {
        if (flyer.parentNode) flyer.parentNode.removeChild(flyer);

        cartBtn.classList.remove('cart-impact-active');
        void cartBtn.offsetWidth;
        cartBtn.classList.add('cart-impact-active');
        setTimeout(() => cartBtn.classList.remove('cart-impact-active'), 800);

        const badge = document.getElementById('cartBadge');
        if (badge) {
          badge.classList.remove('badge-pop-active');
          void badge.offsetWidth;
          badge.classList.add('badge-pop-active');
          setTimeout(() => badge.classList.remove('badge-pop-active'), 800);
        }
      }
    }

    requestAnimationFrame(animateFlyer);
  };

  window.addToCartAndOpen = function(prodKey, qty = 1, triggerBtn = null) {
    const prod = fullProductsDb[prodKey] || productsDatabase[prodKey];
    if (prod) {
      const existing = window.cartState.items.find(i => i.id === prodKey);
      const unitP = parseFloat(String(prod.price).replace(/[^0-9.]/g, '')) || 28.91;
      if (existing) {
        existing.qty += qty;
      } else {
        window.cartState.items.push({
          id: prodKey,
          title: prod.title,
          sku: prod.sku || 'PPE-GLV-3104',
          unitPrice: unitP,
          qty: qty,
          image: prod.image
        });
      }
    }

    const btn = triggerBtn || (typeof window.event !== 'undefined' && window.event ? (window.event.currentTarget || window.event.target)?.closest('button, .product-add-cart-btn, .btn-primary-hero, .product-card') : null);
    const card = btn ? btn.closest('.product-card, .pdp-grid, .modal-grid') : null;
    const cardImg = card ? card.querySelector('img') : null;
    const imgUrl = (prod && prod.image) || (cardImg ? cardImg.src : null);

    window.triggerAddToCartAnimation(btn, imgUrl);

    setTimeout(() => {
      window.openCartSidebar();
    }, 460);

    showToast(`Added to Order: ${prod ? prod.title : 'Part'}`);
  };

  window.addToCart = function(productName, price, triggerBtn = null) {
    const btn = triggerBtn || (typeof window.event !== 'undefined' && window.event ? (window.event.currentTarget || window.event.target)?.closest('button, .product-add-cart-btn, .btn-primary-hero, .product-card') : null);
    window.triggerAddToCartAnimation(btn, null);

    setTimeout(() => {
      window.openCartSidebar();
    }, 460);

    showToast(`Added to Order: ${productName} (${price})`);
  };

  window.updateCartQty = function(prodKey, delta) {
    const item = window.cartState.items.find(i => i.id === prodKey);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        window.cartState.items = window.cartState.items.filter(i => i.id !== prodKey);
      }
      window.renderCartSidebar();
    }
  };

  window.removeFromCart = function(prodKey) {
    window.cartState.items = window.cartState.items.filter(i => i.id !== prodKey);
    window.renderCartSidebar();
  };

  window.proceedToCheckout = function() {
    window.closeCartSidebar();
    showToast('Odoo SO/2026/00041 created! Synced with Eastern Province central warehouse.', 'success');
  };

  // 4. Quick View Modal
  const modalBackdrop = document.getElementById('quickViewModal');
  const modalImage = document.getElementById('modalProductImage');
  const modalBrand = document.getElementById('modalProductBrand');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalPrice = document.getElementById('modalProductPrice');
  const modalStock = document.getElementById('modalProductStock');
  const modalClose = document.getElementById('modalCloseBtn');

  const productsDatabase = {
    'helmet': {
      brand: 'IRONCREST SAFETY',
      title: 'Safety Helmet, 6-Point Ratchet Suspension ANSI Z89.1',
      price: 'SAR 85.00',
      stock: '1,850 in stock · Dammam & Jubail',
      image: 'assets/product_transparent/White Safety Hard Hat with Suspension.png',
      sku: 'PPE-HLM-6019'
    },
    'gloves': {
      brand: 'FALCONLINE',
      title: 'Cut-Resistant Heavy Industrial Gloves, Level A4 EN388',
      price: 'SAR 42.50',
      stock: '5,600 in stock · Dammam Central',
      image: 'assets/product_transparent/Grey and Black Grip Work Gloves.png',
      sku: 'PPE-GLV-A402'
    },
    'bearing': {
      brand: 'NORDBRIDGE BEARINGS',
      title: 'Deep Groove Precision Ball Bearing 6205-2RS C3',
      price: 'SAR 120.00',
      stock: '2,400 in stock · Jubail Industrial Hub',
      image: 'assets/product_transparent/Polished Silver Ball Bearing Ring.png',
      sku: 'BRG-6205-2RS'
    },
    'valve': {
      brand: 'DURAVALVE',
      title: 'Gate Valve 4" Class 150 Flanged Cast Steel WCB API 600',
      price: 'SAR 1,595.00',
      stock: '42 in stock · Jubail Yard',
      image: 'assets/product_transparent/Industrial Gate Valve on Transparent Background.png',
      sku: 'VLV-GT-4150'
    },
    'mcb': {
      brand: 'ARCWELL ELECTRIC',
      title: 'Miniature Circuit Breaker 32 A, 1P 10kA Type C',
      price: 'SAR 32.20',
      stock: '2,100 in stock · Dammam Electrical Depot',
      image: 'assets/product_transparent/Off-White DIN Rail Circuit Breaker with Orange Toggle.png',
      sku: 'ELC-BRK-032A'
    },
    'drill': {
      brand: 'TORQMASTER',
      title: 'Cordless Impact Drill 18 V Kit with Dual 5.0Ah Batteries',
      price: 'SAR 828.00',
      stock: '160 in stock · Khobar Tool Center',
      image: 'assets/product_transparent/Rugged Orange-Accented Cordless Drill.png',
      sku: 'TLS-DRI-18V'
    },
    'hose': {
      brand: 'HYDRAPEX FLUID POWER',
      title: 'Hydraulic Hose SAE 100R2AT 1/2" Two-Wire Braid 4000 PSI',
      price: 'SAR 48.30',
      stock: '1,800 in stock · Jubail Fluid Yard',
      image: 'assets/product_transparent/Coiled Industrial Hydraulic Hose.png',
      sku: 'HYD-HSE-R2-08'
    },
    'studs': {
      brand: 'SAHM FASTENERS',
      title: 'Stud Bolt Set ASTM A193 B7, M20 × 150 with 2 Heavy Hex Nuts (25 pcs)',
      price: 'SAR 241.50',
      stock: '640 in stock · Dammam Port Warehouse',
      image: 'assets/product_transparent/Five Identical Threaded Studs with Nuts.png',
      sku: 'FST-STB-B7M20'
    }
  };

  window.openQuickView = function(productId) {
    window.location.href = 'product.html?id=' + encodeURIComponent(productId);
  };

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // 5. Floating Demo Mode Widget (initialized via initDemoPersonaWidget)

  // 6. Scroll To Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Request a Quote Action
  
  // Mobile Bottom Navigation active state handler
  window.setActiveMobileNav = function(el) {
    document.querySelectorAll('.mobile-nav-item').forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
  };

  // Mobile Search trigger
  window.triggerSearchModal = function() {
    const input = document.getElementById('headerSearchInput');
    if (input) {
      const query = prompt('Search 19,000+ parts by name, SKU or brand:', '');
      if (query && query.trim() !== '') {
        showToast('Searching for: ' + query.trim(), 'info');
      }
    }
  };

  window.requestQuote = function(categoryName = 'General') {
    showToast(`Quote requisition initiated for: ${categoryName}. Quote ID #QT-${Math.floor(1000 + Math.random() * 9000)} generated.`, 'info');
  };



  // --------------------------------------------------------------------------
  // Product Detail Page (PDP) Dynamic Data Loader (Images 2, 3, 4, 5)
  // --------------------------------------------------------------------------
  const fullProductsDb = {
    'bearing': {
      brand: 'NORDBRIDGE BEARINGS',
      title: 'Deep Groove Ball Bearing 6205-2RS',
      sku: 'BRG-6205-2RS',
      mfg: 'Nordbridge Bearings',
      odoo: '4135',
      cat: 'Bearings & Power Transmission',
      catHash: '#cat-bearings',
      shortDesc: 'Double rubber-sealed bearing for electric motors and conveyors.',
      longDesc: 'Double rubber-sealed bearing for electric motors and conveyors. Precision-ground and factory-greased for long service life in high-temperature environments.',
      price: '21.28',
      stock: '2400 in stock · Ships within 48 h',
      image: 'assets/product_transparent/Polished Silver Ball Bearing Ring.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 21.28', save: '—', active: true },
        { qty: '10+', unit: 'SAR 20.72', save: '-2.6%' },
        { qty: '50+', unit: 'SAR 19.80', save: '-7.0%' },
        { qty: '100+', unit: 'SAR 18.50', save: '-13.0%' }
      ],
      specs: [
        { label: 'Manufacturer', val: 'Nordbridge Bearings' },
        { label: 'Bore', val: '25 mm' },
        { label: 'Size', val: '25 x 52 x 15 mm' },
        { label: 'Seal', val: '2RS rubber' },
        { label: 'Material', val: 'Chrome steel' }
      ],
      doc1: { name: 'BRG-6205-2RS-datasheet.pdf', size: 'PDF · 655 KB' },
      doc2: { name: 'BRG-6205-2RS-certificate.pdf', size: 'PDF · 265 KB' }
    },
    'valve': {
      brand: 'DURAVALVE',
      title: 'Gate Valve 4" Class 150, Flanged',
      sku: 'VLV-GT-150-04',
      mfg: 'Duravalve Industrial',
      odoo: '4092',
      cat: 'Valves & Fittings',
      catHash: '#cat-valves',
      shortDesc: 'Flanged cast steel gate valve ANSI 150# with outside screw & yoke (OS&Y).',
      longDesc: 'Engineered for refinery and petrochemical utility service. Rising stem design with Stellite hard-faced trim for bidirectional tight shut-off.',
      price: '1,595.00',
      stock: '42 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Industrial Gate Valve on Transparent Background.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 1,595.00', save: '—', active: true },
        { qty: '5+', unit: 'SAR 1,520.00', save: '-4.7%' },
        { qty: '10+', unit: 'SAR 1,440.00', save: '-9.7%' },
        { qty: '25+', unit: 'SAR 1,350.00', save: '-15.3%' }
      ],
      specs: [
        { label: 'Body Material', val: 'ASTM A216 WCB' },
        { label: 'Nominal Size', val: '4 Inch (DN100)' },
        { label: 'Pressure Rating', val: 'Class 150 (PN20)' },
        { label: 'End Connection', val: 'ASME B16.5 RF' },
        { label: 'Trim', val: 'API 600 Trim 8' }
      ],
      doc1: { name: 'VLV-GT-150-datasheet.pdf', size: 'PDF · 1.2 MB' },
      doc2: { name: 'VLV-GT-150-mill-cert.pdf', size: 'PDF · 410 KB' }
    },
    'mcb': {
      brand: 'ARCWELL ELECTRIC',
      title: 'Miniature Circuit Breaker 32 A, 1P',
      sku: 'ELC-BRK-032A',
      mfg: 'Arcwell Electric',
      odoo: '4188',
      cat: 'Electrical & Cables',
      catHash: '#cat-electrical',
      shortDesc: '1-pole thermal-magnetic miniature circuit breaker 10kA breaking capacity.',
      longDesc: 'DIN-rail mounted MCB for industrial distribution boards, providing overload and short-circuit protection in heavy commercial installations.',
      price: '32.20',
      stock: '2100 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Off-White DIN Rail Circuit Breaker with Orange Toggle.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 32.20', save: '—', active: true },
        { qty: '20+', unit: 'SAR 30.50', save: '-5.2%' },
        { qty: '100+', unit: 'SAR 28.20', save: '-12.4%' },
        { qty: '500+', unit: 'SAR 25.50', save: '-20.8%' }
      ],
      specs: [
        { label: 'Rated Current', val: '32 Amps' },
        { label: 'Poles', val: '1 Pole (1P)' },
        { label: 'Tripping Curve', val: 'C-Curve' },
        { label: 'Breaking Capacity', val: '10 kA (IEC 60898)' },
        { label: 'Mounting', val: 'Standard 35mm DIN Rail' }
      ],
      doc1: { name: 'ELC-BRK-032A-datasheet.pdf', size: 'PDF · 420 KB' },
      doc2: { name: 'ELC-BRK-032A-cert.pdf', size: 'PDF · 180 KB' }
    },
    'drill': {
      brand: 'TORQMASTER',
      title: 'Cordless Impact Drill 18 V Kit',
      sku: 'TLS-DRI-18V',
      mfg: 'Torqmaster Tools',
      odoo: '4220',
      cat: 'Power Tools',
      catHash: '#cat-tools',
      shortDesc: 'Brushless heavy-duty cordless impact drill kit with 2x 5.0Ah lithium batteries.',
      longDesc: 'Delivers up to 135 Nm of torque for heavy industrial drilling and fastening in masonry, steel, and hardwood. Includes rapid charger and IP65 carrying case.',
      price: '828.00',
      stock: '160 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Rugged Orange-Accented Cordless Drill.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 828.00', save: '—', active: true },
        { qty: '5+', unit: 'SAR 790.00', save: '-4.5%' },
        { qty: '10+', unit: 'SAR 745.00', save: '-10.0%' },
        { qty: '20+', unit: 'SAR 699.00', save: '-15.5%' }
      ],
      specs: [
        { label: 'Voltage', val: '18V Li-Ion Brushless' },
        { label: 'Max Torque', val: '135 Nm' },
        { label: 'Chuck Size', val: '13 mm Keyless Metal' },
        { label: 'Battery Included', val: '2x 5.0Ah 18V Batteries' },
        { label: 'Weight', val: '2.1 kg (with battery)' }
      ],
      doc1: { name: 'TLS-DRI-18V-manual.pdf', size: 'PDF · 2.4 MB' },
      doc2: { name: 'TLS-DRI-18V-ce-cert.pdf', size: 'PDF · 195 KB' }
    },
    'hose': {
      brand: 'HYDRAPEX FLUID POWER',
      title: 'Hydraulic Hose SAE 100R2AT 1/2"',
      sku: 'HYD-HSE-R2-08',
      mfg: 'Hydrapex Fluid Power',
      odoo: '4170',
      cat: 'Hydraulics',
      catHash: '#cat-hydraulics',
      shortDesc: 'High-pressure two-wire braid hydraulic hose with oil-resistant synthetic cover.',
      longDesc: 'Designed for petroleum-base hydraulic fluids within a temperature range of -40°C to +100°C. Working pressure up to 275 bar (4000 psi).',
      price: '48.30',
      stock: '1800 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Coiled Industrial Hydraulic Hose.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 48.30', save: '—', active: true },
        { qty: '20+', unit: 'SAR 45.00', save: '-6.8%' },
        { qty: '50+', unit: 'SAR 41.50', save: '-14.0%' },
        { qty: '100+', unit: 'SAR 38.00', save: '-21.3%' }
      ],
      specs: [
        { label: 'Standard', val: 'SAE 100R2AT / EN 853 2SN' },
        { label: 'Inside Diameter', val: '1/2" (12.7 mm)' },
        { label: 'Working Pressure', val: '275 Bar (4,000 PSI)' },
        { label: 'Burst Pressure', val: '1,100 Bar' },
        { label: 'Reinforcement', val: 'Two high-tensile steel wire braids' }
      ],
      doc1: { name: 'HYD-HSE-R2-spec.pdf', size: 'PDF · 540 KB' },
      doc2: { name: 'HYD-HSE-R2-burst-test.pdf', size: 'PDF · 310 KB' }
    },
    'studs': {
      brand: 'SAHM FASTENERS',
      title: 'Stud Bolt Set ASTM A193 B7, M20 × 150 (25 pcs)',
      sku: 'FST-STB-B7M20',
      mfg: 'Sahm Fasteners KSA',
      odoo: '4205',
      cat: 'Fasteners',
      catHash: '#cat-fasteners',
      shortDesc: 'Alloy steel stud bolts with 2 heavy hex nuts ASTM A194 2H per bolt.',
      longDesc: 'Heat-treated chromium-molybdenum steel for high pressure and high temperature flange joint connections in oil and gas pipelines.',
      price: '241.50',
      stock: '640 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Five Identical Threaded Studs with Nuts.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 241.50', save: '—', active: true },
        { qty: '5+', unit: 'SAR 230.00', save: '-4.7%' },
        { qty: '15+', unit: 'SAR 215.00', save: '-11.0%' },
        { qty: '50+', unit: 'SAR 198.00', save: '-18.0%' }
      ],
      specs: [
        { label: 'Material Grade', val: 'ASTM A193 Grade B7' },
        { label: 'Nuts', val: '2x ASTM A194 Grade 2H Heavy Hex' },
        { label: 'Thread Size', val: 'M20 x 2.5 mm Pitch' },
        { label: 'Total Length', val: '150 mm' },
        { label: 'Finish', val: 'Black Oxide / Light Oil' }
      ],
      doc1: { name: 'FST-STB-B7-datasheet.pdf', size: 'PDF · 380 KB' },
      doc2: { name: 'FST-STB-B7-mill-test.pdf', size: 'PDF · 290 KB' }
    },
    'helmet': {
      brand: 'IRONCREST SAFETY',
      title: 'Safety Helmet, 6-Point Ratchet Suspension ANSI Z89.1',
      sku: 'PPE-HLM-001',
      mfg: 'Ironcrest Safety',
      odoo: '4011',
      cat: 'Safety & PPE',
      catHash: '#cat-safety',
      shortDesc: 'Type 1 Class E industrial hard hat with adjustable wheel ratchet suspension.',
      longDesc: 'High-density polyethylene shell rated for electrical hazards up to 20,000 volts. Moisture-wicking brow pad for Eastern Province desert heat.',
      price: '85.00',
      stock: '1,850 in stock · Ships within 24 h',
      image: 'assets/product_transparent/White Safety Hard Hat with Suspension.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 85.00', save: '—', active: true },
        { qty: '20+', unit: 'SAR 79.00', save: '-7.0%' },
        { qty: '100+', unit: 'SAR 72.00', save: '-15.3%' },
        { qty: '500+', unit: 'SAR 64.00', save: '-24.7%' }
      ],
      specs: [
        { label: 'Standard', val: 'ANSI/ISEA Z89.1-2014 Type 1 Class E' },
        { label: 'Suspension', val: '6-Point Rapid-Dial Ratchet' },
        { label: 'Electrical Rating', val: '20,000 Volts (Dielectric)' },
        { label: 'Shell Material', val: 'UV-Stabilized HDPE' },
        { label: 'Color', val: 'Signal White / Blue Badge' }
      ],
      doc1: { name: 'PPE-HLM-001-datasheet.pdf', size: 'PDF · 490 KB' },
      doc2: { name: 'PPE-HLM-001-cert.pdf', size: 'PDF · 210 KB' }
    },
    'gloves': {
      brand: 'FALCONLINE',
      title: 'Cut-Resistant Gloves, Level A4 (Pack of 12 Pairs)',
      sku: 'PPE-GLV-004',
      mfg: 'Falconline Safety',
      odoo: '4019',
      cat: 'Safety & PPE',
      catHash: '#cat-safety',
      shortDesc: '13-gauge HPPE cut-resistant work gloves with micro-foam nitrile palm coating.',
      longDesc: 'ANSI Cut Level A4 rated gloves offering superior dexterity and grip in dry, wet, and slightly oily metal fabrication operations.',
      price: '42.50',
      stock: '5,600 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Grey and Black Grip Work Gloves.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 42.50', save: '—', active: true },
        { qty: '10+', unit: 'SAR 39.00', save: '-8.2%' },
        { qty: '50+', unit: 'SAR 35.50', save: '-16.5%' },
        { qty: '200+', unit: 'SAR 31.00', save: '-27.0%' }
      ],
      specs: [
        { label: 'Cut Rating', val: 'ANSI/ISEA 105-2016 Level A4' },
        { label: 'Gauge', val: '13-Gauge Seamless HPPE Shell' },
        { label: 'Coating', val: 'Micro-Foam Nitrile Palm Dip' },
        { label: 'Packaging', val: '12 Pairs per Pack' },
        { label: 'Washability', val: 'Machine washable at 40°C' }
      ],
      doc1: { name: 'PPE-GLV-004-datasheet.pdf', size: 'PDF · 350 KB' },
      doc2: { name: 'PPE-GLV-004-en388-cert.pdf', size: 'PDF · 190 KB' }
    },
    'pump': {
      brand: 'FLUIDMAX SYSTEMS',
      title: 'Centrifugal Slurry Pump with Electric Motor 15 kW',
      sku: 'PMP-SLR-15KW',
      mfg: 'Fluidmax Industrial',
      odoo: '4078',
      cat: 'Pumps',
      catHash: '#cat-pumps',
      shortDesc: 'Heavy-duty industrial centrifugal slurry pump coupled with high-efficiency 15 kW motor.',
      longDesc: 'Engineered for continuous handling of highly abrasive, high density slurries in mining, chemical processing and effluent transfer applications.',
      price: '3,850.00',
      stock: '18 in stock · Ships within 24 h',
      image: 'assets/product_transparent/Industrial Centrifugal Pump Assembly.png',
      volumePricing: [
        { qty: '● 1+', unit: 'SAR 3,850.00', save: '—', active: true },
        { qty: '3+', unit: 'SAR 3,680.00', save: '-4.4%' },
        { qty: '5+', unit: 'SAR 3,490.00', save: '-9.3%' },
        { qty: '10+', unit: 'SAR 3,250.00', save: '-15.5%' }
      ],
      specs: [
        { label: 'Flow Rate', val: '120 m³/h' },
        { label: 'Head', val: '45 meters' },
        { label: 'Motor Power', val: '15 kW (20 HP) 3-Phase 380V' },
        { label: 'Impeller Material', val: 'High Chrome Alloy (27% Cr)' },
        { label: 'Casing', val: 'Ductile Iron' }
      ],
      doc1: { name: 'PMP-SLR-15KW-datasheet.pdf', size: 'PDF · 1.8 MB' },
      doc2: { name: 'PMP-SLR-15KW-pump-curve.pdf', size: 'PDF · 620 KB' }
    }
  };

  function initProductDetailPage() {
    if (!document.getElementById('pdpTitle')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const prodKey = urlParams.get('id') || 'bearing';
    const prod = fullProductsDb[prodKey] || fullProductsDb['bearing'];

    document.title = `${prod.title} | TAMSTAR Industrial Procurement KSA`;

    const pdpBreadcrumbCat = document.getElementById('pdpBreadcrumbCat');
    const pdpBreadcrumbCurrent = document.getElementById('pdpBreadcrumbCurrent');
    const pdpMainImage = document.getElementById('pdpMainImage');
    const pdpBrand = document.getElementById('pdpBrand');
    const pdpTitle = document.getElementById('pdpTitle');
    const pdpMobileTitle = document.getElementById('pdpMobileTitle');
    const pdpSku = document.getElementById('pdpSku');
    const pdpMfg = document.getElementById('pdpMfg');
    const pdpOdoo = document.getElementById('pdpOdoo');
    const pdpShortDesc = document.getElementById('pdpShortDesc');
    const pdpStock = document.getElementById('pdpStock');
    const pdpPriceVal = document.getElementById('pdpPriceVal');
    const pdpLongDesc = document.getElementById('pdpLongDesc');
    const pdpSpecsTable = document.getElementById('pdpSpecsTable');
    const pdpDoc1Name = document.getElementById('pdpDoc1Name');
    const pdpDoc1Meta = document.getElementById('pdpDoc1Meta');
    const pdpDoc2Name = document.getElementById('pdpDoc2Name');
    const pdpDoc2Meta = document.getElementById('pdpDoc2Meta');
    const pdpVolumeTableBody = document.getElementById('pdpVolumeTableBody');

    if (pdpBreadcrumbCat) {
      pdpBreadcrumbCat.textContent = prod.cat;
      pdpBreadcrumbCat.href = 'index.html' + prod.catHash;
    }
    if (pdpBreadcrumbCurrent) pdpBreadcrumbCurrent.textContent = prod.title;

    if (pdpMainImage) {
      pdpMainImage.src = prod.image;
      pdpMainImage.alt = prod.title;
    }

    for (let i = 0; i < 4; i++) {
      const thumb = document.getElementById('pdpThumbImg' + i);
      if (thumb) thumb.src = prod.image;
    }

    if (pdpBrand) pdpBrand.textContent = prod.brand;
    if (pdpTitle) pdpTitle.textContent = prod.title;
    if (pdpMobileTitle) pdpMobileTitle.textContent = prod.title;
    if (pdpSku) pdpSku.textContent = prod.sku;
    if (pdpMfg) pdpMfg.textContent = prod.mfg;
    if (pdpOdoo) pdpOdoo.textContent = prod.odoo;
    if (pdpShortDesc) pdpShortDesc.textContent = prod.shortDesc;
    if (pdpStock) pdpStock.textContent = prod.stock;
    if (pdpPriceVal) pdpPriceVal.textContent = prod.price;
    if (pdpLongDesc) pdpLongDesc.textContent = prod.longDesc;

    if (pdpVolumeTableBody && prod.volumePricing) {
      pdpVolumeTableBody.innerHTML = prod.volumePricing.map((vp, idx) => `
        <tr class="${vp.active ? 'active-volume-row' : ''}">
          <td>${vp.active ? '<span class="vol-active-dot">●</span> ' : ''}${vp.qty}</td>
          <td>${vp.unit}</td>
          <td class="${vp.save !== '—' ? 'vol-save-col' : ''}">${vp.save}</td>
        </tr>
      `).join('');
    }

    if (pdpSpecsTable && prod.specs) {
      pdpSpecsTable.innerHTML = prod.specs.map(s => `
        <tr><td>${s.label}</td><td>${s.val}</td></tr>
      `).join('');
    }

    if (pdpDoc1Name && prod.doc1) {
      pdpDoc1Name.textContent = prod.doc1.name;
      pdpDoc1Meta.textContent = prod.doc1.size;
    }
    if (pdpDoc2Name && prod.doc2) {
      pdpDoc2Name.textContent = prod.doc2.name;
      pdpDoc2Meta.textContent = prod.doc2.size;
    }
  }

  // Gallery thumbnail click handler
  window.selectPdpThumb = function(index, el) {
    document.querySelectorAll('.pdp-thumb-box').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
  };

  // Stepper logic
  let currentPdpQty = 1;
  window.stepPdpQty = function(delta) {
    currentPdpQty = Math.max(1, currentPdpQty + delta);
    const el = document.getElementById('pdpQtyVal');
    if (el) el.textContent = currentPdpQty;
  };

  // Add to order from PDP
  window.addCurrentPdpToCart = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const prodKey = urlParams.get('id') || 'bearing';
    window.addToCartAndOpen(prodKey, currentPdpQty || 1);
  };

  // Tab switcher (Image 3 & 5)
  window.switchPdpTab = function(tabKey, el) {
    document.querySelectorAll('.pdp-tab-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pdp-tab-pane').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');

    if (tabKey === 'specs') {
      const pane = document.getElementById('tabPaneSpecs');
      if (pane) pane.classList.add('active');
    } else if (tabKey === 'docs') {
      const pane = document.getElementById('tabPaneDocs');
      if (pane) pane.classList.add('active');
    } else if (tabKey === 'shipping') {
      const pane = document.getElementById('tabPaneShipping');
      if (pane) pane.classList.add('active');
    }
  };

  // 5. Catalog Database for Categories Page (Images 2, 3, 4)
  const catalogProducts = [
    // Safety & PPE
    { id: 'helmet', cat: 'safety', brand: 'IRONCREST SAFETY', title: 'Vented Safety Helmet, 6-Point Ratchet', sku: 'PPE-HLM-001', price: 85.00, stock: '1850 in stock', image: 'assets/product_transparent/White Safety Hard Hat with Suspension.png', bestSeller: true, localContent: true },
    { id: 'gloves', cat: 'safety', brand: 'FALCONLINE', title: 'Cut-Resistant Gloves, Level A4', sku: 'PPE-GLV-3104', price: 28.91, stock: '5600 in stock', image: 'assets/product_transparent/Grey and Black Grip Work Gloves.png', bestSeller: true, localContent: false },
    { id: 'hard-hat', cat: 'safety', brand: 'IRONCREST SAFETY', title: 'Full-Brim Hard Hat, High-Visibility', sku: 'PPE-HLM-6022', price: 112.00, stock: '940 in stock', image: 'assets/product_transparent/White Safety Hard Hat with Suspension.png', bestSeller: false, localContent: true },
    
    // Bearings & Power Transmission
    { id: 'bearing', cat: 'bearings', brand: 'NORDBRIDGE BEARINGS', title: 'Deep Groove Ball Bearing 6205-2RS', sku: 'BRG-6205-2RS', price: 21.28, stock: '2400 in stock', image: 'assets/product_transparent/Polished Silver Ball Bearing Ring.png', bestSeller: true, localContent: false },
    { id: 'bearing-6310', cat: 'bearings', brand: 'NORDBRIDGE BEARINGS', title: 'Deep Groove Ball Bearing 6310-ZZ', sku: 'BRG-6310-ZZ', price: 48.50, stock: '180 in stock', image: 'assets/product_transparent/Polished Silver Ball Bearing Ring.png', bestSeller: false, localContent: false },
    { id: 'bearing-roller', cat: 'bearings', brand: 'NORDBRIDGE BEARINGS', title: 'Spherical Roller Bearing 22220 EK', sku: 'BRG-SRB-22220', price: 680.00, stock: '95 in stock', image: 'assets/product_transparent/Polished Silver Ball Bearing Ring.png', bestSeller: false, localContent: false },

    // Valves & Fittings
    { id: 'valve', cat: 'valves', brand: 'DURAVALVE', title: 'Gate Valve 4" Class 150, Flanged', sku: 'VLV-GT-4150', price: 1595.00, stock: '64 in stock', image: 'assets/product_transparent/Industrial Gate Valve on Transparent Background.png', bestSeller: true, localContent: true },

    // Electrical & Cables
    { id: 'mcb', cat: 'electrical', brand: 'ARCWELL ELECTRIC', title: 'Miniature Circuit Breaker 32 A, 1P', sku: 'ELC-BRK-032A', price: 32.20, stock: '2100 in stock', image: 'assets/product_transparent/Off-White DIN Rail Circuit Breaker with Orange Toggle.png', bestSeller: true, localContent: false },

    // Power Tools
    { id: 'drill', cat: 'tools', brand: 'TORQMASTER', title: 'Cordless Impact Drill 18 V Kit', sku: 'TLS-DRI-18V', price: 828.00, stock: '160 in stock', image: 'assets/product_transparent/Rugged Orange-Accented Cordless Drill.png', bestSeller: true, localContent: false },

    // Hydraulics & Pneumatics
    { id: 'hose', cat: 'hydraulics', brand: 'HYDRAPEX FLUID POWER', title: 'Hydraulic Hose SAE 100R2AT 1/2"', sku: 'HYD-HSE-R2-08', price: 48.30, stock: '1800 in stock', image: 'assets/product_transparent/Coiled Industrial Hydraulic Hose.png', bestSeller: false, localContent: false },

    // Fasteners
    { id: 'studs', cat: 'fasteners', brand: 'SAHM FASTENERS', title: 'Stud Bolt Set ASTM A193 B7, M20 × 150', sku: 'FST-STB-B7M20', price: 241.50, stock: '640 in stock', image: 'assets/product_transparent/Five Identical Threaded Studs with Nuts.png', bestSeller: false, localContent: true },

    // Pumps
    { id: 'pump', cat: 'pumps', brand: 'HYDRAPEX PUMPS', title: 'Centrifugal Slurry Pump & Motor', sku: 'PMP-SLR-3000', price: 4850.00, stock: '28 in stock', image: 'assets/product_transparent/Industrial Centrifugal Pump Assembly.png', bestSeller: true, localContent: false },
    { id: 'pump-end', cat: 'pumps', brand: 'HYDRAPEX PUMPS', title: 'End-Suction Centrifugal Pump 7.5 kW', sku: 'PMP-CNT-075', price: 7750.00, stock: '12 left', image: 'assets/product_transparent/Industrial Centrifugal Pump Assembly.png', bestSeller: false, localContent: false },

    // Lubricants
    { id: 'oil', cat: 'lubricants', brand: 'PETROLON', title: 'Industrial Gear Oil ISO VG 320, 208 L', sku: 'LUB-GR320-208L', price: 3120.00, stock: '45 in stock', image: 'assets/product_transparent/Weathered Steel Drum with Dual Bungs.png', bestSeller: true, localContent: false },

    // Filtration
    { id: 'filter', cat: 'filtration', brand: 'FILTREX PRO', title: 'Hydraulic Return Filter Element 10 μm', sku: 'FLT-HYD-010U', price: 145.00, stock: '320 in stock', image: 'assets/product_transparent/Industrial Honeycomb Mesh Filter Cartridge.png', bestSeller: true, localContent: false }
  ];

  window.initCatalogPage = function() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || 'all';

    const catItem = document.querySelector(`.category-filter-item[data-cat="${catParam}"]`);
    if (catItem) {
      document.querySelectorAll('.category-filter-item').forEach(i => i.classList.remove('active'));
      catItem.classList.add('active');
    }

    const catNames = {
      'all': 'All products',
      'safety': 'Safety & PPE',
      'bearings': 'Bearings & Power Transmission',
      'valves': 'Valves & Fittings',
      'electrical': 'Electrical & Cables',
      'tools': 'Power Tools',
      'pumps': 'Pumps',
      'hydraulics': 'Hydraulics & Pneumatics',
      'fasteners': 'Fasteners',
      'lubricants': 'Lubricants',
      'filtration': 'Filtration'
    };

    const heroTitle = document.getElementById('catalogHeroTitle');
    const breadcrumb = document.getElementById('catalogBreadcrumbCurrent');
    if (heroTitle && catNames[catParam]) heroTitle.textContent = catNames[catParam];
    if (breadcrumb && catNames[catParam]) breadcrumb.textContent = catNames[catParam];

    window.renderCatalogProducts(catParam);
  };

  window.filterCatalogCategory = function(catKey, el) {
    document.querySelectorAll('.category-filter-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');

    const heroTitle = document.getElementById('catalogHeroTitle');
    const breadcrumb = document.getElementById('catalogBreadcrumbCurrent');

    const catNames = {
      'all': 'All products',
      'safety': 'Safety & PPE',
      'bearings': 'Bearings & Power Transmission',
      'valves': 'Valves & Fittings',
      'electrical': 'Electrical & Cables',
      'tools': 'Power Tools',
      'pumps': 'Pumps',
      'hydraulics': 'Hydraulics & Pneumatics',
      'fasteners': 'Fasteners',
      'lubricants': 'Lubricants',
      'filtration': 'Filtration'
    };

    if (heroTitle) heroTitle.textContent = catNames[catKey] || 'All products';
    if (breadcrumb) breadcrumb.textContent = catNames[catKey] || 'All categories';

    window.renderCatalogProducts(catKey);
  };

  window.renderCatalogProducts = function(catKey) {
    const grid = document.getElementById('catalogGrid');
    const countLabel = document.getElementById('catalogCountLabel');
    if (!grid) return;

    const filtered = catKey === 'all' 
      ? catalogProducts 
      : catalogProducts.filter(p => p.cat === catKey);

    if (countLabel) countLabel.textContent = `${filtered.length} products`;

    grid.innerHTML = filtered.map(p => `
      <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-card-top">
          ${p.bestSeller ? '<span class="badge-best-seller">Best seller</span>' : ''}
          ${p.localContent ? '<span class="badge-local-content"><svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg><span>Local content</span></span>' : ''}
        </div>

        <div class="product-image-container">
          <img src="${p.image}" alt="${p.title}">
          <button type="button" class="product-quick-view-btn" onclick="event.stopPropagation(); window.location.href='product.html?id=${p.id}'">
            <svg style="width: 15px; height: 15px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <span>Quick view</span>
          </button>
        </div>

        <div class="product-details">
          <div class="product-brand">${p.brand}</div>
          <h3 class="product-title">${p.title}</h3>
          <div style="font-size: 11px; color: #94a3b8; font-family: monospace; margin-bottom: 4px;">${p.sku}</div>
          <div class="product-stock-tag">
            <span class="stock-indicator-dot"></span>
            <span>${p.stock}</span>
          </div>
          <div class="product-footer-row">
            <div class="product-price-block">
              <span class="product-price-sar"><span style="font-size: 13px; font-weight: 700; color: #64748b;">SAR </span>${p.price.toFixed(2)}</span>
            </div>
            <button type="button" class="product-add-cart-btn" onclick="event.stopPropagation(); window.addToCartAndOpen('${p.id}')" aria-label="Add to Order">
              <svg style="width: 16px; height: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
    setTimeout(() => { if (window.initScrollReveal) window.initScrollReveal(); }, 50);
  };

  // ==========================================================================
  // Demo Persona, Theme System & Account Portal System (Task 1 & Task 2)
  // ==========================================================================
  const DEMO_STORAGE_KEY = 'tamstar_demo_state_v2';
  const THEME_STORAGE_KEY = 'tamstar_theme_v1';

  const THEMES = [
    { id: 'orange_ice', name: 'Orange Ice', color: '#f97316' },
    { id: 'blue', name: 'Blue', color: '#2563eb' },
    { id: 'red', name: 'Red', color: '#dc2626' },
    { id: 'dark_blue', name: 'Dark Blue', color: '#1e3a8a' }
  ];

  window.getCurrentTheme = function() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'orange_ice';
    } catch (e) {
      return 'orange_ice';
    }
  };

  window.setThemeColor = function(themeId, silent = false) {
    const found = THEMES.find(t => t.id === themeId) || THEMES[0];
    try {
      localStorage.setItem(THEME_STORAGE_KEY, found.id);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', found.id);
    renderThemePickerSwatches();
    if (!silent) {
      showToast(`Theme switched to ${found.name}`, 'info');
    }
  };

  const DEMO_PERSONAS = [
    {
      id: 'guest',
      name: 'Guest',
      firstName: 'Guest',
      initials: 'G',
      avatarBg: '#64748b',
      role: 'Public visitor',
      shortRole: 'Public visitor',
      tagline: 'List prices, browsing, RFQ',
      company: '',
      email: '',
      perOrderLimit: 0,
      monthlyLimit: 0,
      monthlyUsed: 0,
      isAuthenticated: false
    },
    {
      id: 'company_admin',
      name: 'Ahmed Al-Ghamdi',
      firstName: 'Ahmed',
      initials: 'AG',
      avatarBg: '#c2410c',
      role: 'Company Admin · Gulf Petrochem',
      shortRole: 'Company Admin',
      tagline: 'Team, limits, company pricing',
      company: 'Gulf Petrochem Co.',
      email: 'ahmed.alghamdi@gulfpetrochem.sa',
      perOrderLimit: 25000,
      monthlyLimit: 100000,
      monthlyUsed: 48650,
      isAuthenticated: true
    },
    {
      id: 'buyer',
      name: 'Sara Al-Dossary',
      firstName: 'Sara',
      initials: 'SD',
      avatarBg: '#024282',
      role: 'Buyer · SAR 5,000 / order',
      shortRole: 'Buyer',
      tagline: 'Contract prices, limits at checkout',
      company: 'Gulf Petrochem Co.',
      email: 'sara.aldossary@gulfpetrochem.sa',
      perOrderLimit: 5000,
      monthlyLimit: 20000,
      monthlyUsed: 14250,
      isAuthenticated: true
    },
    {
      id: 'tamstar_admin',
      name: 'Lina Al-Mansour',
      firstName: 'Lina',
      initials: 'LM',
      avatarBg: '#0f172a',
      role: 'TAMSTAR Admin',
      shortRole: 'TAMSTAR Admin',
      tagline: 'Pricing rules, RFQ inbox, Odoo sync',
      company: 'TAMSTAR Industrial Supply',
      email: 'lina.almansour@tamstar.com',
      perOrderLimit: 0,
      monthlyLimit: 250000,
      monthlyUsed: 112400,
      isAuthenticated: true
    }
  ];

  function getDefaultDemoData() {
    return {
      activePersonaId: 'buyer',
      orders: [
        {
          id: 'TS-100242',
          date: 'Nov 11, 2026',
          dateSort: '2026-11-11',
          placedBy: 'Sara Al-Dossary',
          itemsCount: 200,
          status: 'Processing',
          statusKey: 'processing',
          odooSo: 'SO/2026/00041',
          total: 5471.70,
          site: 'Jubail Industrial City — Gate 4 Warehouse',
          summary: 'Cut-Resistant Gloves A4 (150 pairs), Safety Helmets (50 pcs)'
        },
        {
          id: 'TS-100239',
          date: 'Nov 7, 2026',
          dateSort: '2026-11-07',
          placedBy: 'Sara Al-Dossary',
          itemsCount: 42,
          status: 'Delivered',
          statusKey: 'delivered',
          odooSo: 'SO/2026/00038',
          total: 1589.53,
          site: 'Dammam 2nd Industrial City — Maintenance Bay B',
          summary: 'Deep Groove Ball Bearings 6205-2RS (40 pcs), Gate Valve 4" (2 pcs)'
        },
        {
          id: 'TS-100235',
          date: 'Oct 30, 2026',
          dateSort: '2026-10-30',
          placedBy: 'Sara Al-Dossary',
          itemsCount: 5,
          status: 'Delivered',
          statusKey: 'delivered',
          odooSo: 'SO/2026/00034',
          total: 3908.85,
          site: 'Jubail Industrial City — Gate 4 Warehouse',
          summary: 'Cordless Impact Drill 18V Kit (4 kits), 32A MCB Breakers (1 box)'
        },
        {
          id: 'TS-100232',
          date: 'Oct 20, 2026',
          dateSort: '2026-10-20',
          placedBy: 'Sara Al-Dossary',
          itemsCount: 84,
          status: 'Delivered',
          statusKey: 'delivered',
          odooSo: 'SO/2026/00031',
          total: 7532.04,
          site: 'Jubail Industrial City — Gate 4 Warehouse',
          summary: 'ASTM A193 B7 Stud Bolt Sets (30 sets), Hydraulic Hose SAE 100R2AT (54 m)'
        },
        {
          id: 'TS-100228',
          date: 'Oct 14, 2026',
          dateSort: '2026-10-14',
          placedBy: 'Ahmed Al-Ghamdi',
          itemsCount: 16,
          status: 'Shipped',
          statusKey: 'shipped',
          odooSo: 'SO/2026/00027',
          total: 12480.00,
          site: 'Yanbu Royal Commission — Utility Plant',
          summary: 'API 600 Cast Steel Gate Valves 4" Class 150 (8 pcs), Flange Kits (8 sets)'
        },
        {
          id: 'TS-100221',
          date: 'Oct 3, 2026',
          dateSort: '2026-10-03',
          placedBy: 'Ahmed Al-Ghamdi',
          itemsCount: 60,
          status: 'Confirmed',
          statusKey: 'confirmed',
          odooSo: 'SO/2026/00019',
          total: 6840.25,
          site: 'Dammam 2nd Industrial City — Maintenance Bay B',
          summary: 'Explosion-Proof Junction Boxes (20 pcs), Armored Power Cable Reels (40)'
        }
      ],
      rfqs: [
        {
          id: 'RFQ-2026-0186',
          title: 'Mechanical seal for API 610 OH2 pump',
          date: 'Nov 10, 2026',
          items: 12,
          status: 'Submitted',
          statusKey: 'submitted',
          owner: 'Sara Al-Dossary',
          estimate: 'Pending quote'
        },
        {
          id: 'RFQ-2026-0184',
          title: 'Spiral wound gaskets, assorted (shutdown kit)',
          date: 'Nov 8, 2026',
          items: 140,
          status: 'Sourcing',
          statusKey: 'sourcing',
          owner: 'Sara Al-Dossary',
          estimate: 'SAR 8,920.00'
        },
        {
          id: 'RFQ-2026-0182',
          title: 'Explosion-proof LED floodlight 150 W',
          date: 'Nov 4, 2026',
          items: 24,
          status: 'Sent to customer',
          statusKey: 'sent_to_customer',
          owner: 'Ahmed Al-Ghamdi',
          estimate: 'SAR 16,440.00'
        },
        {
          id: 'RFQ-2026-0181',
          title: 'Variable frequency drive 75 kW',
          date: 'Nov 1, 2026',
          items: 2,
          status: 'Sent to customer',
          statusKey: 'sent_to_customer',
          owner: 'Sara Al-Dossary',
          estimate: 'SAR 34,200.00'
        },
        {
          id: 'RFQ-2026-0178',
          title: 'Scaffolding tube & fittings',
          date: 'Oct 29, 2026',
          items: 320,
          status: 'Under review',
          statusKey: 'under_review',
          owner: 'Sara Al-Dossary',
          estimate: 'SAR 21,150.00',
          hasAttachment: true
        }
      ],
      addresses: [
        {
          id: 'addr-1',
          label: 'Jubail Plant — Main Warehouse',
          line1: 'Plot 14, Road 112, Jubail Industrial City',
          city: 'Industrial Area 2 · Jubail 35718',
          contact: 'Site contact: Hassan Al-Qahtani · +966 13 340 2210',
          isDefault: true
        },
        {
          id: 'addr-2',
          label: 'Dammam Head Office',
          line1: 'King Saud Street, Tower B, Floor 9',
          city: 'Al Faisaliyah · Dammam 32272',
          contact: 'Site contact: Ahmed Al-Ghamdi · +966 13 812 4400',
          isDefault: false
        }
      ],
      team: [
        { name: 'Ahmed Al-Ghamdi', email: 'ahmed.alghamdi@gulfpetrochem.sa', role: 'Company Admin', limit: 'SAR 25,000 / order', spend: 'SAR 19,320.25', status: 'Active' },
        { name: 'Sara Al-Dossary', email: 'sara.aldossary@gulfpetrochem.sa', role: 'Buyer', limit: 'SAR 5,000 / order', spend: 'SAR 14,250.00', status: 'Active' },
        { name: 'Khalid Al-Zahrani', email: 'khalid.alzahrani@gulfpetrochem.sa', role: 'Buyer', limit: 'SAR 10,000 / order', spend: 'SAR 9,840.00', status: 'Active' },
        { name: 'Reem Al-Shammari', email: 'reem.alshammari@gulfpetrochem.sa', role: 'Procurement Analyst', limit: 'SAR 3,000 / order', spend: 'SAR 5,239.75', status: 'Active' }
      ],
      notifications: [
        { id: 'n1', title: 'Odoo SO/2026/00041 (TS-100242) is now Processing', time: '18 mins ago' },
        { id: 'n2', title: 'Quote ready for RFQ-2026-0182 (LED Floodlight 150 W)', time: '2 hours ago' },
        { id: 'n3', title: 'Contract pricing tier Q4 synced from Odoo ERP', time: 'Yesterday' }
      ]
    };
  }

  function loadDemoState() {
    try {
      const raw = localStorage.getItem(DEMO_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.activePersonaId) {
          return Object.assign(getDefaultDemoData(), parsed);
        }
      }
    } catch (e) {
      // Ignore localStorage parse errors
    }
    return getDefaultDemoData();
  }

  function saveDemoState() {
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(window.tamstarDemoState));
    } catch (e) {
      // Ignore storage quota issues
    }
  }

  window.tamstarDemoState = loadDemoState();

  window.getActivePersona = function() {
    const id = window.tamstarDemoState.activePersonaId || 'guest';
    return DEMO_PERSONAS.find(p => p.id === id) || DEMO_PERSONAS[0];
  };

  window.currentUser = null;

  function syncCurrentUserFromPersona() {
    const persona = window.getActivePersona();
    window.currentUser = persona.isAuthenticated ? persona : null;
  }
  syncCurrentUserFromPersona();

  // Select persona from Demo Mode Popup or Sign-In Modal
  window.selectDemoPersona = function(personaId, silent = false) {
    const persona = DEMO_PERSONAS.find(p => p.id === personaId) || DEMO_PERSONAS[0];
    window.tamstarDemoState.activePersonaId = persona.id;
    saveDemoState();
    syncCurrentUserFromPersona();

    renderDemoPersonaWidget();
    updateUserAuthUI();
    syncRfqContactFields();
    if (window.renderAccountPortal) window.renderAccountPortal();

    const popup = document.getElementById('personaPopup');
    const pill = document.getElementById('floatingDemoBadge');
    if (popup) popup.classList.remove('open');
    if (pill) pill.classList.remove('open');

    if (!silent) {
      if (persona.isAuthenticated) {
        showToast(`Switched to ${persona.name} (${persona.shortRole})`, 'success');
      } else {
        showToast('Switched to Guest view (public list pricing)', 'info');
      }
    }
  };

  window.resetDemoData = function() {
    window.tamstarDemoState = getDefaultDemoData();
    saveDemoState();
    syncCurrentUserFromPersona();
    window.setThemeColor('orange_ice', true);

    if (window.cartState) {
      window.cartState.items = [
        {
          id: 'gloves',
          title: 'Cut-Resistant Gloves, Level A4',
          sku: 'PPE-GLV-3104',
          unitPrice: 28.91,
          qty: 3,
          image: 'assets/product_transparent/Grey and Black Grip Work Gloves.png'
        }
      ];
      if (window.renderCartSidebar) window.renderCartSidebar();
    }

    renderDemoPersonaWidget();
    updateUserAuthUI();
    syncRfqContactFields();
    if (window.renderAccountPortal) window.renderAccountPortal();

    const popup = document.getElementById('personaPopup');
    const pill = document.getElementById('floatingDemoBadge');
    if (popup) popup.classList.remove('open');
    if (pill) pill.classList.remove('open');

    showToast('Demo data reset to defaults', 'info');
  };

  function renderThemePickerSwatches() {
    const swatchesEl = document.getElementById('personaThemeSwatches');
    const labelEl = document.getElementById('activeThemeLabel');
    if (!swatchesEl) return;

    const currentTheme = window.getCurrentTheme();
    const activeTheme = THEMES.find(t => t.id === currentTheme) || THEMES[0];
    if (labelEl) labelEl.textContent = activeTheme.name;

    swatchesEl.innerHTML = THEMES.map(t => {
      const selected = t.id === activeTheme.id;
      return `
        <button type="button" class="theme-swatch-btn ${selected ? 'active' : ''}"
          role="radio" aria-checked="${selected}"
          onclick="window.setThemeColor('${t.id}')"
          title="${t.name}">
          <span class="theme-swatch-circle" style="background-color: ${t.color};">
            <svg class="theme-swatch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
          <span class="theme-swatch-name">${t.name}</span>
        </button>
      `;
    }).join('');
  }

  function renderDemoPersonaWidget() {
    const pill = document.getElementById('floatingDemoBadge');
    const popup = document.getElementById('personaPopup');
    if (!pill || !popup) return;

    const active = window.getActivePersona();
    pill.innerHTML = `
      <span class="demo-pill-avatar" style="background-color: ${active.isAuthenticated ? active.avatarBg : '#334155'};">${active.initials}</span>
      <span class="demo-pill-meta">
        <span class="demo-pill-kicker"><span class="demo-dot"></span>DEMO MODE</span>
        <span class="demo-pill-name">${active.name}</span>
      </span>
      <svg class="demo-pill-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    `;

    const listEl = popup.querySelector('#personaList');
    if (listEl) {
      listEl.innerHTML = DEMO_PERSONAS.map(p => `
        <button type="button" class="persona-item ${p.id === active.id ? 'active' : ''}" onclick="window.selectDemoPersona('${p.id}')">
          <span class="persona-avatar" style="background-color: ${p.avatarBg};">${p.initials}</span>
          <span class="persona-info">
            <span class="persona-name" style="display:block;">${p.name}</span>
            <span class="persona-role" style="display:block;">${p.role}</span>
            <span class="persona-cap" style="display:block;">${p.tagline}</span>
          </span>
          <span class="persona-check" aria-hidden="true">
            <svg style="width:13px;height:13px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        </button>
      `).join('');
    }

    renderThemePickerSwatches();
  }

  window.initDemoPersonaWidget = function() {
    if (!document.getElementById('floatingDemoBadge')) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.id = 'floatingDemoBadge';
      pill.className = 'floating-demo-badge';
      pill.setAttribute('aria-label', 'Demo mode persona switcher');
      pill.onclick = function(e) {
        e.stopPropagation();
        const popup = document.getElementById('personaPopup');
        if (!popup) return;
        const willOpen = !popup.classList.contains('open');
        popup.classList.toggle('open', willOpen);
        pill.classList.toggle('open', willOpen);
      };
      document.body.appendChild(pill);
    }

    if (!document.getElementById('personaPopup')) {
      const popup = document.createElement('div');
      popup.id = 'personaPopup';
      popup.className = 'persona-popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-label', 'Switch persona');
      popup.onclick = function(e) { e.stopPropagation(); };
      popup.innerHTML = `
        <div class="persona-popup-header">
          <div class="persona-popup-title-row">
            <svg class="persona-popup-sparkle" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zm7 12l.9 2.6L22.5 17.5 19.9 18.4 19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z"/>
            </svg>
            <span>Switch persona</span>
          </div>
          <div class="persona-popup-subtitle">See the platform through each user's eyes.</div>
        </div>
        <div class="persona-list" id="personaList"></div>
        <div class="persona-theme-picker">
          <div class="persona-theme-head">
            <span class="persona-theme-title">Pick theme colour</span>
            <span class="persona-theme-active-tag" id="activeThemeLabel">Orange Ice</span>
          </div>
          <div class="persona-theme-swatches" id="personaThemeSwatches" role="radiogroup" aria-label="Pick theme colour"></div>
        </div>
        <div class="persona-popup-footer">
          <button type="button" class="persona-reset-btn" onclick="window.resetDemoData()">
            <svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            <span>Reset demo data</span>
          </button>
        </div>
      `;
      document.body.appendChild(popup);
    }

    renderDemoPersonaWidget();
  };

  // Close popups & dropdowns on outside click or Escape
  document.addEventListener('click', () => {
    const popup = document.getElementById('personaPopup');
    const pill = document.getElementById('floatingDemoBadge');
    if (popup) popup.classList.remove('open');
    if (pill) pill.classList.remove('open');

    document.querySelectorAll('.user-dropdown-menu.open, .header-notif-dropdown.open').forEach(el => {
      el.classList.remove('open');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const popup = document.getElementById('personaPopup');
      const pill = document.getElementById('floatingDemoBadge');
      if (popup) popup.classList.remove('open');
      if (pill) pill.classList.remove('open');
      document.querySelectorAll('.user-dropdown-menu.open, .header-notif-dropdown.open').forEach(el => {
        el.classList.remove('open');
      });
    }
  });

  // ==========================================================================
  // Auth Modal System (Sign in to TAMSTAR / Request Company Account)
  // ==========================================================================
  window.initAuthModal = function() {
    if (document.getElementById('authModalOverlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'auth-modal-overlay';
    overlay.id = 'authModalOverlay';
    overlay.onclick = function(e) {
      if (e.target === overlay) window.closeAuthModal();
    };

    const signInPersonas = DEMO_PERSONAS.filter(p => p.isAuthenticated);

    overlay.innerHTML = `
      <div class="auth-modal-card" id="authModalCard">
        <button type="button" class="auth-modal-close-btn" onclick="window.closeAuthModal()" aria-label="Close dialog">
          <svg style="width: 20px; height: 20px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="auth-modal-top">
          <img src="assets/logo.png" alt="TAMSTAR" class="auth-logo">
          <button type="button" class="auth-lang-btn" onclick="window.showToast('Language toggle: Arabic / English', 'info')">
            <svg style="width: 14px; height: 14px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            <span>العربية</span>
          </button>
        </div>

        <div class="auth-tab-nav">
          <button type="button" class="auth-tab-btn active" id="authTabSignInBtn" onclick="window.switchAuthTab('signin')">Sign in</button>
          <button type="button" class="auth-tab-btn" id="authTabSignUpBtn" onclick="window.switchAuthTab('signup')">Request access</button>
        </div>

        <div class="auth-tab-pane active" id="authPaneSignIn">
          <h2 class="auth-title">Sign in to TAMSTAR</h2>
          <p class="auth-subtitle">Company accounts are created by the TAMSTAR team. Check your invitation email to activate yours.</p>

          <div class="auth-demo-box">
            <div class="auth-demo-title">One-click demo sign-in</div>
            <div class="auth-demo-subtitle">Explore each role without credentials.</div>

            <div class="auth-demo-roles">
              ${signInPersonas.map(p => `
                <div class="auth-role-card" onclick="window.signInAsPersona('${p.id}')">
                  <div class="auth-avatar" style="background-color: ${p.avatarBg};">${p.initials}</div>
                  <div class="auth-role-info">
                    <div class="auth-role-name">${p.name}</div>
                    <div class="auth-role-sub">${p.role}</div>
                  </div>
                  <span class="auth-role-arrow">&rarr;</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="auth-divider">
            <span>OR</span>
          </div>

          <form class="auth-form" onsubmit="event.preventDefault(); window.handleAuthSubmit();">
            <div class="auth-field-group">
              <label class="auth-label" for="authEmailInput">Work email</label>
              <input type="email" id="authEmailInput" class="auth-input" value="nadia.alharbi@jubailpetro.sa" placeholder="name@company.com" required>
            </div>

            <div class="auth-field-group">
              <div class="auth-label-row">
                <label class="auth-label" for="authPasswordInput">Password</label>
                <a href="javascript:void(0)" class="auth-forgot-link" onclick="window.showToast('Password reset link sent to work email', 'info')">Forgot password?</a>
              </div>
              <input type="password" id="authPasswordInput" class="auth-input" value="••••••••" placeholder="Enter password" required>
            </div>

            <button type="submit" class="auth-submit-btn">
              <span>Sign in</span>
              <span>&rarr;</span>
            </button>
          </form>
        </div>

        <div class="auth-tab-pane" id="authPaneSignUp">
          <h2 class="auth-title">Request Company Account</h2>
          <p class="auth-subtitle">Join verified Saudi industrial enterprises procuring via TAMSTAR B2B contracts.</p>

          <form class="auth-form" onsubmit="event.preventDefault(); window.handleSignUpSubmit();">
            <div class="auth-field-group">
              <label class="auth-label" for="signupCompanyName">Company Legal Name</label>
              <input type="text" id="signupCompanyName" class="auth-input" placeholder="e.g. Al-Jubail Petrochem Co." required>
            </div>

            <div class="auth-field-row">
              <div class="auth-field-group">
                <label class="auth-label" for="signupCR">Commercial Reg. (CR)</label>
                <input type="text" id="signupCR" class="auth-input" placeholder="10-digit CR Number" required>
              </div>
              <div class="auth-field-group">
                <label class="auth-label" for="signupVAT">VAT / Tax ID</label>
                <input type="text" id="signupVAT" class="auth-input" placeholder="15-digit Tax ID" required>
              </div>
            </div>

            <div class="auth-field-group">
              <label class="auth-label" for="signupContactName">Contact Full Name</label>
              <input type="text" id="signupContactName" class="auth-input" placeholder="Procurement officer name" required>
            </div>

            <div class="auth-field-row">
              <div class="auth-field-group">
                <label class="auth-label" for="signupWorkEmail">Work Email</label>
                <input type="email" id="signupWorkEmail" class="auth-input" placeholder="procurement@company.sa" required>
              </div>
              <div class="auth-field-group">
                <label class="auth-label" for="signupPhone">Phone (+966)</label>
                <input type="tel" id="signupPhone" class="auth-input" placeholder="05x xxx xxxx" required>
              </div>
            </div>

            <button type="submit" class="auth-submit-btn auth-submit-btn-orange">
              <span>Submit Company Requisition</span>
              <span>&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
  };

  window.openAuthModal = function(tab = 'signin') {
    window.initAuthModal();
    window.switchAuthTab(tab);
    const overlay = document.getElementById('authModalOverlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAuthModal = function() {
    const overlay = document.getElementById('authModalOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.switchAuthTab = function(tab) {
    const signInBtn = document.getElementById('authTabSignInBtn');
    const signUpBtn = document.getElementById('authTabSignUpBtn');
    const signInPane = document.getElementById('authPaneSignIn');
    const signUpPane = document.getElementById('authPaneSignUp');

    if (tab === 'signup') {
      if (signInBtn) signInBtn.classList.remove('active');
      if (signUpBtn) signUpBtn.classList.add('active');
      if (signInPane) signInPane.classList.remove('active');
      if (signUpPane) signUpPane.classList.add('active');
    } else {
      if (signUpBtn) signUpBtn.classList.remove('active');
      if (signInBtn) signInBtn.classList.add('active');
      if (signUpPane) signUpPane.classList.remove('active');
      if (signInPane) signInPane.classList.add('active');
    }
  };

  window.signInAsPersona = function(personaId) {
    window.selectDemoPersona(personaId);
    window.closeAuthModal();
  };

  window.handleAuthSubmit = function() {
    const email = (document.getElementById('authEmailInput') ? document.getElementById('authEmailInput').value : '').trim().toLowerCase();
    const matched = DEMO_PERSONAS.find(p => p.email && p.email.toLowerCase() === email);
    window.selectDemoPersona(matched ? matched.id : 'buyer');
    window.closeAuthModal();
  };

  window.handleSignUpSubmit = function() {
    const company = document.getElementById('signupCompanyName') ? document.getElementById('signupCompanyName').value : 'Company';
    window.closeAuthModal();
    showToast(`Requisition received for ${company}! Verification email sent.`, 'success');
  };

  window.signOutUser = function() {
    window.selectDemoPersona('guest', true);
    showToast('Signed out to Guest mode', 'info');
  };

  // ==========================================================================
  // Header User Chip, Notification Bell & User Dropdown (Reference Image 2)
  // ==========================================================================
  function updateUserAuthUI() {
    const persona = window.getActivePersona();
    const actionsEl = document.querySelector('.header-actions');
    if (!actionsEl) return;

    // Clean previous dynamic user/notif wrappers
    actionsEl.querySelectorAll('.header-notif-wrap, .header-user-wrap').forEach(el => el.remove());

    const signInBtn = actionsEl.querySelector('.signin-btn');
    const cartBtn = actionsEl.querySelector('.cart-icon-btn');

    if (!persona.isAuthenticated) {
      if (signInBtn) {
        signInBtn.style.display = '';
        signInBtn.onclick = () => window.openAuthModal('signin');
      }
    } else {
      if (signInBtn) signInBtn.style.display = 'none';

      const notifs = window.tamstarDemoState.notifications || [];
      const notifWrap = document.createElement('div');
      notifWrap.className = 'header-notif-wrap';
      notifWrap.innerHTML = `
        <button type="button" class="header-notif-btn" aria-label="Notifications">
          <svg style="width:19px;height:19px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span class="header-notif-badge">${notifs.length}</span>
        </button>
        <div class="header-notif-dropdown">
          <div class="notif-dropdown-head">
            <span>Notifications</span>
            <span style="font-size:11px; color:#64748b; font-weight:600;">${notifs.length} unread</span>
          </div>
          <div class="notif-dropdown-list">
            ${notifs.map(n => `
              <div class="notif-dropdown-item" onclick="window.location.href='account.html?tab=orders'">
                <span class="notif-dot"></span>
                <div>
                  <div class="notif-title">${n.title}</div>
                  <div class="notif-time">${n.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const notifBtn = notifWrap.querySelector('.header-notif-btn');
      const notifDrop = notifWrap.querySelector('.header-notif-dropdown');
      notifBtn.onclick = function(e) {
        e.stopPropagation();
        document.querySelectorAll('.user-dropdown-menu.open').forEach(el => el.classList.remove('open'));
        notifDrop.classList.toggle('open');
      };
      notifDrop.onclick = function(e) { e.stopPropagation(); };

      const showTeamItem = persona.id === 'company_admin' || persona.id === 'tamstar_admin';
      const userWrap = document.createElement('div');
      userWrap.className = 'header-user-wrap';
      userWrap.innerHTML = `
        <button type="button" class="header-user-btn" aria-haspopup="true" aria-expanded="false">
          <span class="header-user-avatar" style="background-color:${persona.avatarBg};">${persona.initials}</span>
          <span class="header-user-text">
            <span class="header-user-name">${persona.name}</span>
            <span class="header-user-role">${persona.shortRole}</span>
          </span>
        </button>

        <div class="user-dropdown-menu" role="menu">
          <div class="user-dropdown-header">
            <div class="user-dropdown-name">${persona.name}</div>
            <div class="user-dropdown-email">${persona.email}</div>
            <a href="account.html?tab=company" class="user-dropdown-company">${persona.company}</a>
          </div>
          <div class="user-dropdown-divider"></div>
          <a href="account.html?tab=dashboard" class="user-dropdown-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>My account</span>
          </a>
          <a href="account.html?tab=orders" class="user-dropdown-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>Orders</span>
          </a>
          <a href="account.html?tab=rfqs" class="user-dropdown-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>RFQs</span>
          </a>
          ${showTeamItem ? `
            <a href="account.html?tab=team" class="user-dropdown-item" role="menuitem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Team</span>
            </a>
          ` : ''}
          <a href="account.html?tab=company" class="user-dropdown-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/>
            </svg>
            <span>Company</span>
          </a>
          <div class="user-dropdown-divider"></div>
          <button type="button" class="user-dropdown-item user-dropdown-signout" role="menuitem" onclick="window.signOutUser()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Sign out</span>
          </button>
        </div>
      `;

      const userBtn = userWrap.querySelector('.header-user-btn');
      const userDrop = userWrap.querySelector('.user-dropdown-menu');
      userBtn.onclick = function(e) {
        e.stopPropagation();
        document.querySelectorAll('.header-notif-dropdown.open').forEach(el => el.classList.remove('open'));
        const isOpen = userDrop.classList.toggle('open');
        userBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };
      userDrop.onclick = function(e) { e.stopPropagation(); };

      if (cartBtn) {
        actionsEl.insertBefore(notifWrap, cartBtn);
        actionsEl.insertBefore(userWrap, cartBtn);
      } else {
        actionsEl.appendChild(notifWrap);
        actionsEl.appendChild(userWrap);
      }
    }

    // Update mobile bottom navigation Account item
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item').forEach(link => {
      const label = link.querySelector('span');
      if (label && label.textContent.trim() === 'Account') {
        if (persona.isAuthenticated) {
          link.href = 'account.html';
          link.onclick = null;
        } else {
          link.href = '#';
          link.onclick = function() {
            window.openAuthModal('signin');
            window.setActiveMobileNav(this);
            return false;
          };
        }
      }
    });
  }

  function syncRfqContactFields() {
    const persona = window.getActivePersona();
    if (!persona.isAuthenticated) return;
    const comp = document.getElementById('rfqCompName');
    const person = document.getElementById('rfqContactPerson');
    const email = document.getElementById('rfqWorkEmail');
    if (comp && persona.company) comp.value = persona.company;
    if (person) person.value = persona.name;
    if (email && persona.email) email.value = persona.email;
  }

  // ==========================================================================
  // Account Portal Page Renderer (account.html — Reference Images 3, 4, 5)
  // ==========================================================================
  const accountUiState = {
    activeTab: 'dashboard',
    orderStatusFilter: 'all',
    orderSortField: 'dateSort',
    orderSortDir: 'desc',
    rfqStatusFilter: 'all'
  };

  function formatSar(num) {
    return 'SAR ' + Number(num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatCompactSar(num) {
    const val = Number(num || 0);
    if (val >= 1000) return 'SAR ' + (val / 1000).toFixed(1) + 'K';
    return 'SAR ' + val.toFixed(0);
  }

  window.switchAccountTab = function(tab) {
    accountUiState.activeTab = tab;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // Ignore history API errors on file://
    }
    window.renderAccountPortal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.setOrderFilter = function(statusKey) {
    accountUiState.orderStatusFilter = statusKey;
    window.renderAccountPortal();
  };

  window.sortAccountOrders = function(field) {
    if (accountUiState.orderSortField === field) {
      accountUiState.orderSortDir = accountUiState.orderSortDir === 'asc' ? 'desc' : 'asc';
    } else {
      accountUiState.orderSortField = field;
      accountUiState.orderSortDir = field === 'total' || field === 'dateSort' ? 'desc' : 'asc';
    }
    window.renderAccountPortal();
  };

  window.openOrderDetailModal = function(orderId) {
    const order = (window.tamstarDemoState.orders || []).find(o => o.id === orderId);
    if (!order) return;

    let overlay = document.getElementById('orderDetailOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'orderDetailOverlay';
      overlay.className = 'order-detail-overlay';
      overlay.onclick = function(e) {
        if (e.target === overlay) overlay.classList.remove('active');
      };
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="order-detail-card">
        <button type="button" class="auth-modal-close-btn" onclick="document.getElementById('orderDetailOverlay').classList.remove('active')" aria-label="Close">
          <svg style="width:18px;height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <h3 style="font-size:20px;font-weight:900;color:#0f172a;">${order.id}</h3>
          <span class="status-pill status-${order.statusKey}">${order.status}</span>
        </div>
        <div style="font-size:13px;color:#64748b;margin-bottom:18px;">
          Odoo Sales Order: <span class="odoo-so-code" style="color:#0f172a;font-weight:700;">${order.odooSo}</span> &middot; Placed ${order.date}
        </div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin-bottom:16px;display:flex;flex-direction:column;gap:8px;font-size:13px;">
          <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">Placed by</span><strong style="color:#0f172a;">${order.placedBy}</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">Delivery site</span><strong style="color:#0f172a;text-align:right;">${order.site}</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">Items</span><strong style="color:#0f172a;">${order.itemsCount} units</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">ZATCA e-Invoice</span><strong style="color:#15803d;">Cleared (Phase 2)</strong></div>
        </div>
        <div style="margin-bottom:18px;">
          <div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:6px;">Line summary</div>
          <div style="font-size:13.5px;color:#334155;line-height:1.5;">${order.summary}</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f1f5f9;padding-top:14px;">
          <div>
            <div style="font-size:11.5px;color:#64748b;">Order Total (incl. 15% VAT)</div>
            <div style="font-size:19px;font-weight:900;color:#0f172a;">${formatSar(order.total)}</div>
          </div>
          <button type="button" class="btn-primary-hero" style="height:40px;padding:0 18px;font-size:13px;" onclick="window.addToCartAndOpen('helmet', 2); document.getElementById('orderDetailOverlay').classList.remove('active');">
            Reorder items
          </button>
        </div>
      </div>
    `;
    overlay.classList.add('active');
  };

  window.setDefaultDemoAddress = function(addrId) {
    window.tamstarDemoState.addresses.forEach(a => {
      a.isDefault = a.id === addrId;
    });
    saveDemoState();
    window.renderAccountPortal();
    showToast('Default delivery site updated', 'success');
  };

  window.renderAccountPortal = function() {
    const root = document.getElementById('accountPortalRoot');
    if (!root) return;

    const persona = window.getActivePersona();
    if (!persona.isAuthenticated) {
      root.innerHTML = `
        <div class="account-guest-card">
          <div style="width:54px;height:54px;border-radius:50%;background:#fff7ed;color:#c2410c;display:grid;place-items:center;margin:0 auto 14px;">
            <svg style="width:26px;height:26px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h1 style="font-size:24px;font-weight:900;color:#0f172a;">Sign in to view your B2B account</h1>
          <p style="font-size:14px;color:#64748b;margin-top:8px;">Choose a demo persona below or use the Demo Mode switcher at the bottom-left corner.</p>
          <div class="account-guest-actions">
            ${DEMO_PERSONAS.filter(p => p.isAuthenticated).map(p => `
              <button type="button" class="account-guest-persona-btn" onclick="window.selectDemoPersona('${p.id}')">
                <span class="persona-avatar" style="background-color:${p.avatarBg};">${p.initials}</span>
                <span style="font-size:13px;font-weight:800;color:#0f172a;">${p.name}</span>
                <span style="font-size:11.5px;color:#64748b;">${p.shortRole}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
      return;
    }

    const showTeam = persona.id === 'company_admin' || persona.id === 'tamstar_admin';
    if (accountUiState.activeTab === 'team' && !showTeam) {
      accountUiState.activeTab = 'dashboard';
    }

    const allOrders = window.tamstarDemoState.orders || [];
    const orders = persona.id === 'buyer'
      ? allOrders.filter(o => o.placedBy === persona.name || o.placedBy === 'Sara Al-Dossary')
      : allOrders;
    const rfqs = window.tamstarDemoState.rfqs || [];

    const novOrders = orders.filter(o => o.date.includes('Nov'));
    const novSpend = persona.id === 'buyer' ? persona.monthlyUsed : novOrders.reduce((s, o) => s + o.total, 0);
    const inTransitCount = orders.filter(o => o.statusKey === 'processing' || o.statusKey === 'shipped').length;

    const pctRaw = persona.monthlyLimit > 0 ? Math.min(100, (persona.monthlyUsed / persona.monthlyLimit) * 100) : 0;
    const pctText = pctRaw.toFixed(1) + '%';
    const remaining = Math.max(0, persona.monthlyLimit - persona.monthlyUsed);
    const radius = 68;
    const circumference = 2 * Math.PI * radius;
    const arcDeg = 240;
    const trackLen = circumference * (arcDeg / 360);
    const gapLen = circumference - trackLen;
    const fillLen = trackLen * (pctRaw / 100);
    const fillGap = circumference - fillLen;

    let mainHtml = '';

    if (accountUiState.activeTab === 'dashboard') {
      mainHtml = `
        <div class="account-main-head">
          <div>
            <h1 class="account-page-title">Welcome back, ${persona.firstName}</h1>
            <p class="account-page-subtitle">${persona.company}</p>
          </div>
        </div>

        <div class="account-kpi-grid">
          <div class="account-kpi-card">
            <div class="account-kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <div class="account-kpi-value">${novOrders.length}</div>
            <div class="account-kpi-label">Orders this month</div>
          </div>

          <div class="account-kpi-card">
            <div class="account-kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div class="account-kpi-value">${formatCompactSar(novSpend)}</div>
            <div class="account-kpi-label">Spend this month</div>
          </div>

          <div class="account-kpi-card">
            <div class="account-kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div class="account-kpi-value">${rfqs.length}</div>
            <div class="account-kpi-label">Open RFQs</div>
          </div>

          <div class="account-kpi-card">
            <div class="account-kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div class="account-kpi-value">${inTransitCount}</div>
            <div class="account-kpi-label">In transit</div>
          </div>
        </div>

        <div class="account-dashboard-grid">
          <div class="account-panel-card limit-card-inner">
            <div class="account-panel-header" style="width:100%;margin-bottom:4px;">
              <h2 class="account-panel-title">Monthly purchase limit</h2>
            </div>

            <div class="limit-donut-wrap">
              <svg class="limit-donut-svg" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="${radius}" fill="none" stroke="#e2e8f0" stroke-width="12" stroke-linecap="round"
                  stroke-dasharray="${trackLen.toFixed(2)} ${gapLen.toFixed(2)}"
                  transform="rotate(150 90 90)"></circle>
                <circle cx="90" cy="90" r="${radius}" fill="none" stroke="var(--theme-gauge, #ea580c)" stroke-width="12" stroke-linecap="round"
                  stroke-dasharray="${fillLen.toFixed(2)} ${fillGap.toFixed(2)}"
                  transform="rotate(150 90 90)"></circle>
              </svg>
              <div class="limit-donut-center">
                <div class="limit-donut-pct">${pctText}</div>
                <div class="limit-donut-rem">${formatCompactSar(remaining)} remaining</div>
              </div>
            </div>

            <div class="limit-usage-line">${formatSar(persona.monthlyUsed)} of ${formatSar(persona.monthlyLimit)} used</div>
            <div class="limit-per-order">${persona.perOrderLimit > 0 ? 'Per-order limit: ' + formatSar(persona.perOrderLimit) : 'Per-order limit: Unlimited'}</div>

            <div class="limit-quick-actions">
              <a href="categories.html" class="limit-quick-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <span>All categories</span>
              </a>
              <button type="button" class="limit-quick-btn" onclick="window.showToast('Upload your Excel / CSV BOM list for Instant Quoting', 'info')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>Quick order</span>
              </button>
              <a href="rfq.html" class="limit-quick-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>Request a quote</span>
              </a>
            </div>
          </div>

          <div class="account-dashboard-right">
            <div class="account-panel-card">
              <div class="account-panel-header">
                <h2 class="account-panel-title">Recent orders</h2>
                <button type="button" class="account-view-all" onclick="window.switchAccountTab('orders')">View all &rarr;</button>
              </div>
              <div class="recent-list">
                ${orders.slice(0, 4).map(o => `
                  <div class="recent-row" onclick="window.openOrderDetailModal('${o.id}')">
                    <div class="recent-row-left">
                      <span class="recent-row-id">${o.id}</span>
                    </div>
                    <div class="recent-row-right">
                      <span class="status-pill status-${o.statusKey}">${o.status}</span>
                      <span class="recent-row-amount">${formatSar(o.total)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="account-panel-card">
              <div class="account-panel-header">
                <h2 class="account-panel-title">Open RFQs</h2>
                <button type="button" class="account-view-all" onclick="window.switchAccountTab('rfqs')">View all &rarr;</button>
              </div>
              <div class="recent-list">
                ${rfqs.slice(0, 4).map(r => `
                  <div class="recent-row" onclick="window.switchAccountTab('rfqs')">
                    <div class="recent-row-left">
                      <span class="recent-row-id">${r.id}</span>
                      <span class="recent-row-sub">${r.title}</span>
                    </div>
                    <div class="recent-row-right">
                      <span class="status-pill status-${r.statusKey}">${r.status}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (accountUiState.activeTab === 'orders') {
      const statuses = [
        { key: 'all', label: 'All statuses' },
        { key: 'confirmed', label: 'Confirmed' },
        { key: 'processing', label: 'Processing' },
        { key: 'shipped', label: 'Shipped' },
        { key: 'delivered', label: 'Delivered' },
        { key: 'cancelled', label: 'Cancelled' }
      ];

      let filtered = accountUiState.orderStatusFilter === 'all'
        ? orders.slice()
        : orders.filter(o => o.statusKey === accountUiState.orderStatusFilter);

      const sf = accountUiState.orderSortField;
      const sd = accountUiState.orderSortDir === 'asc' ? 1 : -1;
      filtered.sort((a, b) => {
        if (sf === 'total') return (a.total - b.total) * sd;
        return String(a[sf] || '').localeCompare(String(b[sf] || '')) * sd;
      });

      mainHtml = `
        <div class="account-main-head">
          <div>
            <h1 class="account-page-title">Orders</h1>
            <p class="account-page-subtitle">Every order with its Odoo sales order and live status.</p>
          </div>
        </div>

        <div class="orders-filter-bar">
          ${statuses.map(s => `
            <button type="button" class="orders-filter-pill ${accountUiState.orderStatusFilter === s.key ? 'active' : ''}" onclick="window.setOrderFilter('${s.key}')">
              ${s.label}
            </button>
          `).join('')}
        </div>

        <div class="account-table-card">
          <div class="account-table-scroll">
            <table class="account-table">
              <thead>
                <tr>
                  <th class="sortable" onclick="window.sortAccountOrders('id')">Order &#x2195;</th>
                  <th class="sortable" onclick="window.sortAccountOrders('dateSort')">Date &#x2195;</th>
                  <th>Placed by</th>
                  <th>Items</th>
                  <th class="sortable" onclick="window.sortAccountOrders('status')">Status &#x2195;</th>
                  <th>Odoo SO</th>
                  <th class="sortable text-right" onclick="window.sortAccountOrders('total')">Total &#x2195;</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.length === 0 ? `
                  <tr><td colspan="7" style="text-align:center;padding:34px;color:#64748b;">No orders matching this status filter.</td></tr>
                ` : filtered.map(o => `
                  <tr onclick="window.openOrderDetailModal('${o.id}')">
                    <td><strong style="color:#0f172a;">${o.id}</strong></td>
                    <td>${o.date}</td>
                    <td>${o.placedBy}</td>
                    <td>${o.itemsCount}</td>
                    <td><span class="status-pill status-${o.statusKey}">${o.status}</span></td>
                    <td><span class="odoo-so-code">${o.odooSo}</span></td>
                    <td class="text-right order-total-cell">${formatSar(o.total)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (accountUiState.activeTab === 'rfqs') {
      mainHtml = `
        <div class="account-main-head rfq-main-head">
          <div>
            <h1 class="account-page-title">Requests for quotation</h1>
            <p class="account-page-subtitle">Track sourcing progress and respond to quotations.</p>
          </div>
          <a href="rfq.html" class="rfq-new-btn">+ New RFQ</a>
        </div>

        <div class="account-table-card">
          <div class="account-table-scroll">
            <table class="account-table">
              <thead>
                <tr>
                  <th class="sortable">RFQ &#x2195;</th>
                  <th class="sortable">Product &#x2195;</th>
                  <th class="sortable">Date &#x2195;</th>
                  <th>Owner</th>
                  <th>Lines</th>
                  <th class="sortable">Status &#x2195;</th>
                  <th class="text-right sortable">Quoted Total &#x2195;</th>
                </tr>
              </thead>
              <tbody>
                ${rfqs.map(r => `
                  <tr onclick="window.showToast('${r.id}: ${r.status} (${r.estimate})', 'info')">
                    <td><strong style="color:#0f172a;">${r.id}</strong></td>
                    <td>
                      <span class="rfq-product-cell">
                        ${r.title}
                        ${r.hasAttachment ? '<span class="rfq-attach-badge" title="1 attachment"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>1</span>' : ''}
                      </span>
                    </td>
                    <td>${r.date}</td>
                    <td>${r.owner}</td>
                    <td>${r.items}</td>
                    <td><span class="status-pill status-${r.statusKey}">${r.status}</span></td>
                    <td class="text-right order-total-cell">${r.estimate}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (accountUiState.activeTab === 'team') {
      const team = window.tamstarDemoState.team || [];
      mainHtml = `
        <div class="account-main-head">
          <div>
            <h1 class="account-page-title">Team &amp; Approval Limits</h1>
            <p class="account-page-subtitle">Manage buyers, per-order caps, and monthly procurement budgets for ${persona.company}.</p>
          </div>
          <button type="button" class="btn-primary-hero" style="height:40px;padding:0 18px;font-size:13px;" onclick="window.showToast('Invitation modal ready — new buyers receive an Odoo activation email', 'info')">+ Invite buyer</button>
        </div>

        <div class="account-table-card">
          <div class="account-table-scroll">
            <table class="account-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Work Email</th>
                  <th>Role</th>
                  <th>Order Limit</th>
                  <th>Monthly Spend</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${team.map(m => `
                  <tr>
                    <td><strong style="color:#0f172a;">${m.name}</strong></td>
                    <td>${m.email}</td>
                    <td>${m.role}</td>
                    <td>${m.limit}</td>
                    <td class="order-total-cell">${m.spend}</td>
                    <td><span class="status-pill status-delivered">${m.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (accountUiState.activeTab === 'company') {
      const addrs = window.tamstarDemoState.addresses || [];
      mainHtml = `
        <h1 class="company-profile-page-title">Company profile</h1>

        <div class="company-hero-card">
          <div class="company-hero-head">
            <div class="company-hero-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/>
              </svg>
            </div>
            <div>
              <div class="company-hero-name">${persona.company}</div>
              <span class="company-status-badge">Active</span>
            </div>
          </div>

          <div class="company-specs-grid">
            <div class="company-spec-box">
              <div class="company-spec-label">Legal name</div>
              <div class="company-spec-val">${persona.company}</div>
            </div>
            <div class="company-spec-box">
              <div class="company-spec-label">Commercial registration</div>
              <div class="company-spec-val">2055012345</div>
            </div>
            <div class="company-spec-box">
              <div class="company-spec-label">VAT number</div>
              <div class="company-spec-val">310123456700003</div>
            </div>
            <div class="company-spec-box">
              <div class="company-spec-label">Industry</div>
              <div class="company-spec-val">Petrochemicals</div>
            </div>
            <div class="company-spec-box">
              <div class="company-spec-label">City</div>
              <div class="company-spec-val">Jubail</div>
            </div>
          </div>
        </div>

        <div class="delivery-section-head">
          <h2 class="delivery-section-title">Delivery addresses</h2>
          <button type="button" class="btn-add-address" onclick="window.showToast('Add new delivery site dialog', 'info')">
            <svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            <span>Add address</span>
          </button>
        </div>

        <div class="delivery-cards-grid">
          ${addrs.map(a => `
            <div class="delivery-card ${a.isDefault ? 'default' : ''}">
              <div class="delivery-card-head">
                <div class="delivery-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>${a.label}</span>
                </div>
                ${a.isDefault ? '<span class="delivery-card-badge">Default</span>' : ''}
              </div>
              <div class="delivery-card-address">
                <div>${a.line1 || a.label}</div>
                <div>${a.city}</div>
              </div>
              <div class="delivery-card-contact">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>${a.contact}</span>
              </div>
              ${!a.isDefault ? `
                <button type="button" class="account-view-all" style="margin-top:8px;align-self:flex-start;" onclick="window.setDefaultDemoAddress('${a.id}')">Set as default</button>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
      { id: 'orders', label: 'Orders', icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>' },
      { id: 'rfqs', label: 'RFQs', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' }
    ];
    if (showTeam) {
      navItems.push({ id: 'team', label: 'Team', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' });
    }
    navItems.push({ id: 'company', label: 'Company & addresses', icon: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/>' });

    root.innerHTML = `
      <div class="account-layout">
        <aside class="account-sidebar">
          <div class="account-sidebar-card">
            <div class="account-sidebar-avatar" style="background-color:${persona.avatarBg};">${persona.initials}</div>
            <div class="account-sidebar-meta">
              <div class="account-sidebar-name">${persona.name}</div>
              <div class="account-sidebar-role">${persona.shortRole}</div>
              <div class="account-sidebar-company">${persona.company}</div>
            </div>
          </div>

          <nav class="account-nav-list" aria-label="Account sections">
            ${navItems.map(item => `
              <button type="button" class="account-nav-item ${accountUiState.activeTab === item.id ? 'active' : ''}" onclick="window.switchAccountTab('${item.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
                <span>${item.label}</span>
              </button>
            `).join('')}
          </nav>
        </aside>

        <div class="account-content-main">
          ${mainHtml}
        </div>
      </div>
    `;
    setTimeout(() => { if (window.initScrollReveal) window.initScrollReveal(); }, 50);
  };

  window.initAccountPage = function() {
    if (!document.getElementById('accountPortalRoot')) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['dashboard', 'orders', 'rfqs', 'company', 'team'].includes(tab)) {
        accountUiState.activeTab = tab;
      }
    } catch (e) {
      // Ignore query parse error
    }
    window.renderAccountPortal();
  };

  // Scroll Reveal & Section Animations
  window.initScrollReveal = function() {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.tamstar-scroll-reveal').forEach(el => el.classList.add('revealed'));
      return;
    }

    const selector = `
      .stats-bar-section,
      .categories-section,
      .in-stock-section,
      .sourcing-desk-section,
      .how-it-works-section,
      .industries-section,
      .audit-strip-section,
      .recently-viewed-section,
      .category-card,
      .product-card,
      .step-card,
      .industry-card,
      .audit-strip-card,
      .sourcing-desk-card,
      .account-panel-card,
      .account-kpi-card,
      .pdp-grid,
      .rfq-form-card
    `;

    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    const windowH = window.innerHeight;

    elements.forEach(el => {
      if (el.dataset.scrollObserved === 'true') return;
      el.dataset.scrollObserved = 'true';

      const rect = el.getBoundingClientRect();
      if (rect.top < windowH - 40) {
        el.classList.add('tamstar-scroll-reveal', 'revealed');
      } else {
        el.classList.add('tamstar-scroll-reveal');
        if (el.parentElement) {
          const isGridChild = el.classList.contains('category-card') ||
                              el.classList.contains('product-card') ||
                              el.classList.contains('step-card') ||
                              el.classList.contains('industry-card') ||
                              el.classList.contains('account-kpi-card');
          if (isGridChild) {
            const idx = Array.from(el.parentElement.children).indexOf(el);
            if (idx >= 0) {
              el.style.transitionDelay = `${(idx % 6) * 0.07}s`;
            }
          }
        }
        observer.observe(el);
      }
    });
  };

  // Robust Initializer runner
  window.initProductDetailPage = initProductDetailPage;
  window.initCatalogPage = initCatalogPage;

  function runInitializers() {
    if (window.initCartSidebar) window.initCartSidebar();
    if (window.initProductDetailPage) window.initProductDetailPage();
    if (window.initCatalogPage) window.initCatalogPage();
    if (window.initAuthModal) window.initAuthModal();
    if (window.initDemoPersonaWidget) window.initDemoPersonaWidget();
    updateUserAuthUI();
    syncRfqContactFields();
    if (window.initAccountPage) window.initAccountPage();
    if (window.initScrollReveal) window.initScrollReveal();
  }

  runInitializers();
});
