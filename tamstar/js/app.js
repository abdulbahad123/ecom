/**
 * TAMSTAR Industrial B2B Platform - Interactive Engine
 */

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
      border-left: 4px solid ${type === 'success' ? '#f97316' : '#2563eb'};
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
        image: 'assets/images/prod-gloves.svg'
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

  window.addToCartAndOpen = function(prodKey, qty = 1) {
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
    window.openCartSidebar();
    showToast(`Added to Order: ${prod ? prod.title : 'Part'}`);
  };

  window.addToCart = function(productName, price) {
    // Legacy mapper to addToCartAndOpen
    window.openCartSidebar();
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
      image: 'assets/images/safety-helmet.svg',
      sku: 'PPE-HLM-6019'
    },
    'gloves': {
      brand: 'FALCONLINE',
      title: 'Cut-Resistant Heavy Industrial Gloves, Level A4 EN388',
      price: 'SAR 42.50',
      stock: '5,600 in stock · Dammam Central',
      image: 'assets/images/prod-gloves.svg',
      sku: 'PPE-GLV-A402'
    },
    'bearing': {
      brand: 'NORDBRIDGE BEARINGS',
      title: 'Deep Groove Precision Ball Bearing 6205-2RS C3',
      price: 'SAR 120.00',
      stock: '2,400 in stock · Jubail Industrial Hub',
      image: 'assets/images/bearing.svg',
      sku: 'BRG-6205-2RS'
    },
    'valve': {
      brand: 'DURAVALVE',
      title: 'Gate Valve 4" Class 150 Flanged Cast Steel WCB API 600',
      price: 'SAR 1,595.00',
      stock: '42 in stock · Jubail Yard',
      image: 'assets/images/gate-valve.svg',
      sku: 'VLV-GT-4150'
    },
    'mcb': {
      brand: 'ARCWELL ELECTRIC',
      title: 'Miniature Circuit Breaker 32 A, 1P 10kA Type C',
      price: 'SAR 32.20',
      stock: '2,100 in stock · Dammam Electrical Depot',
      image: 'assets/images/prod-mcb.svg',
      sku: 'ELC-BRK-032A'
    },
    'drill': {
      brand: 'TORQMASTER',
      title: 'Cordless Impact Drill 18 V Kit with Dual 5.0Ah Batteries',
      price: 'SAR 828.00',
      stock: '160 in stock · Khobar Tool Center',
      image: 'assets/images/prod-drill.svg',
      sku: 'TLS-DRI-18V'
    },
    'hose': {
      brand: 'HYDRAPEX FLUID POWER',
      title: 'Hydraulic Hose SAE 100R2AT 1/2" Two-Wire Braid 4000 PSI',
      price: 'SAR 48.30',
      stock: '1,800 in stock · Jubail Fluid Yard',
      image: 'assets/images/prod-hose.svg',
      sku: 'HYD-HSE-R2-08'
    },
    'studs': {
      brand: 'SAHM FASTENERS',
      title: 'Stud Bolt Set ASTM A193 B7, M20 × 150 with 2 Heavy Hex Nuts (25 pcs)',
      price: 'SAR 241.50',
      stock: '640 in stock · Dammam Port Warehouse',
      image: 'assets/images/prod-studs.svg',
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

  // 5. Floating Demo Mode Contract Tier Switcher
  const demoBadge = document.getElementById('floatingDemoBadge');
  let currentTier = 'Guest';

  if (demoBadge) {
    demoBadge.addEventListener('click', () => {
      const tiers = [
        { name: 'Guest', discount: '0%' },
        { name: 'Aramco Contractor', discount: '15%' },
        { name: 'SABIC Approved', discount: '20%' },
        { name: 'SEC Registered', discount: '12%' }
      ];
      
      const nextIdx = (tiers.findIndex(t => t.name === currentTier) + 1) % tiers.length;
      currentTier = tiers[nextIdx].name;
      
      demoBadge.innerHTML = `<span class="demo-avatar-circle">${currentTier.charAt(0)}</span><span class="demo-dot"></span><span id="demoModeText">DEMO: ${currentTier}</span><svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6" stroke-width="2.5"/></svg>`;
      
      showToast(`Contract Pricing switched to: ${currentTier} (${tiers[nextIdx].discount} discount applied)`, 'info');
    });
  }

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
      image: 'assets/images/bearing.svg',
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
      image: 'assets/images/gate-valve.svg',
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
      image: 'assets/images/prod-mcb.svg',
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
      image: 'assets/images/prod-drill.svg',
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
      image: 'assets/images/prod-hose.svg',
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
      image: 'assets/images/prod-studs.svg',
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
      image: 'assets/images/safety-helmet.svg',
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
      image: 'assets/images/prod-gloves.svg',
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
      image: 'assets/images/centrifugal-pump.svg',
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
    { id: 'helmet', cat: 'safety', brand: 'IRONCREST SAFETY', title: 'Vented Safety Helmet, 6-Point Ratchet', sku: 'PPE-HLM-001', price: 85.00, stock: '1850 in stock', image: 'assets/images/safety-helmet.svg', bestSeller: true, localContent: true },
    { id: 'gloves', cat: 'safety', brand: 'FALCONLINE', title: 'Cut-Resistant Gloves, Level A4', sku: 'PPE-GLV-3104', price: 28.91, stock: '5600 in stock', image: 'assets/images/prod-gloves.svg', bestSeller: true, localContent: false },
    { id: 'hard-hat', cat: 'safety', brand: 'IRONCREST SAFETY', title: 'Full-Brim Hard Hat, High-Visibility', sku: 'PPE-HLM-6022', price: 112.00, stock: '940 in stock', image: 'assets/images/safety-helmet.svg', bestSeller: false, localContent: true },
    
    // Bearings & Power Transmission
    { id: 'bearing', cat: 'bearings', brand: 'NORDBRIDGE BEARINGS', title: 'Deep Groove Ball Bearing 6205-2RS', sku: 'BRG-6205-2RS', price: 21.28, stock: '2400 in stock', image: 'assets/images/bearing.svg', bestSeller: true, localContent: false },
    { id: 'bearing-6310', cat: 'bearings', brand: 'NORDBRIDGE BEARINGS', title: 'Deep Groove Ball Bearing 6310-ZZ', sku: 'BRG-6310-ZZ', price: 48.50, stock: '180 in stock', image: 'assets/images/bearing.svg', bestSeller: false, localContent: false },
    { id: 'bearing-roller', cat: 'bearings', brand: 'NORDBRIDGE BEARINGS', title: 'Spherical Roller Bearing 22220 EK', sku: 'BRG-SRB-22220', price: 680.00, stock: '95 in stock', image: 'assets/images/bearing.svg', bestSeller: false, localContent: false },

    // Valves & Fittings
    { id: 'valve', cat: 'valves', brand: 'DURAVALVE', title: 'Gate Valve 4" Class 150, Flanged', sku: 'VLV-GT-4150', price: 1595.00, stock: '64 in stock', image: 'assets/images/gate-valve.svg', bestSeller: true, localContent: true },

    // Electrical & Cables
    { id: 'mcb', cat: 'electrical', brand: 'ARCWELL ELECTRIC', title: 'Miniature Circuit Breaker 32 A, 1P', sku: 'ELC-BRK-032A', price: 32.20, stock: '2100 in stock', image: 'assets/images/prod-mcb.svg', bestSeller: true, localContent: false },

    // Power Tools
    { id: 'drill', cat: 'tools', brand: 'TORQMASTER', title: 'Cordless Impact Drill 18 V Kit', sku: 'TLS-DRI-18V', price: 828.00, stock: '160 in stock', image: 'assets/images/prod-drill.svg', bestSeller: true, localContent: false },

    // Hydraulics & Pneumatics
    { id: 'hose', cat: 'hydraulics', brand: 'HYDRAPEX FLUID POWER', title: 'Hydraulic Hose SAE 100R2AT 1/2"', sku: 'HYD-HSE-R2-08', price: 48.30, stock: '1800 in stock', image: 'assets/images/prod-hose.svg', bestSeller: false, localContent: false },

    // Fasteners
    { id: 'studs', cat: 'fasteners', brand: 'SAHM FASTENERS', title: 'Stud Bolt Set ASTM A193 B7, M20 × 150', sku: 'FST-STB-B7M20', price: 241.50, stock: '640 in stock', image: 'assets/images/prod-studs.svg', bestSeller: false, localContent: true },

    // Pumps
    { id: 'pump', cat: 'pumps', brand: 'HYDRAPEX PUMPS', title: 'Centrifugal Slurry Pump & Motor', sku: 'PMP-SLR-3000', price: 4850.00, stock: '28 in stock', image: 'assets/images/centrifugal-pump.svg', bestSeller: true, localContent: false },
    { id: 'pump-end', cat: 'pumps', brand: 'HYDRAPEX PUMPS', title: 'End-Suction Centrifugal Pump 7.5 kW', sku: 'PMP-CNT-075', price: 7750.00, stock: '12 left', image: 'assets/images/centrifugal-pump.svg', bestSeller: false, localContent: false },

    // Lubricants
    { id: 'oil', cat: 'lubricants', brand: 'PETROLON', title: 'Industrial Gear Oil ISO VG 320, 208 L', sku: 'LUB-GR320-208L', price: 3120.00, stock: '45 in stock', image: 'assets/images/cat-lubricants.svg', bestSeller: true, localContent: false },

    // Filtration
    { id: 'filter', cat: 'filtration', brand: 'FILTREX PRO', title: 'Hydraulic Return Filter Element 10 μm', sku: 'FLT-HYD-010U', price: 145.00, stock: '320 in stock', image: 'assets/images/cat-filtration.svg', bestSeller: true, localContent: false }
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
  };

  // ==========================================================================
  // Auth Modal System (Image 5: Sign in to TAMSTAR / Account Popup)
  // ==========================================================================
  window.currentUser = null;

  window.initAuthModal = function() {
    if (document.getElementById('authModalOverlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'auth-modal-overlay';
    overlay.id = 'authModalOverlay';
    overlay.onclick = function(e) {
      if (e.target === overlay) window.closeAuthModal();
    };

    overlay.innerHTML = `
      <div class="auth-modal-card" id="authModalCard">
        <button type="button" class="auth-modal-close-btn" onclick="window.closeAuthModal()" aria-label="Close dialog">
          <svg style="width: 20px; height: 20px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="auth-modal-top">
          <img src="assets/images/tamstar-logo.svg" alt="TAMSTAR" class="auth-logo">
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

        <!-- Pane 1: Sign in (Image 5) -->
        <div class="auth-tab-pane active" id="authPaneSignIn">
          <h2 class="auth-title">Sign in to TAMSTAR</h2>
          <p class="auth-subtitle">Company accounts are created by the TAMSTAR team. Check your invitation email to activate yours.</p>

          <div class="auth-demo-box">
            <div class="auth-demo-title">One-click demo sign-in</div>
            <div class="auth-demo-subtitle">Explore each role without credentials.</div>

            <div class="auth-demo-roles">
              <div class="auth-role-card" onclick="window.signInAsDemoUser('Sara Al-Dossary', 'Buyer · SAR 5,000 / order', 'sara.aldossary@gulfpetrochem.sa', 'SD', '#1d4ed8')">
                <div class="auth-avatar" style="background-color: #1d4ed8;">SD</div>
                <div class="auth-role-info">
                  <div class="auth-role-name">Sara Al-Dossary</div>
                  <div class="auth-role-sub">Buyer · SAR 5,000 / order</div>
                </div>
                <span class="auth-role-arrow">&rarr;</span>
              </div>

              <div class="auth-role-card" onclick="window.signInAsDemoUser('Ahmed Al-Ghamdi', 'Company Admin · Gulf Petrochem', 'ahmed.alghamdi@gulfpetrochem.sa', 'AG', '#c2410c')">
                <div class="auth-avatar" style="background-color: #c2410c;">AG</div>
                <div class="auth-role-info">
                  <div class="auth-role-name">Ahmed Al-Ghamdi</div>
                  <div class="auth-role-sub">Company Admin · Gulf Petrochem</div>
                </div>
                <span class="auth-role-arrow">&rarr;</span>
              </div>

              <div class="auth-role-card" onclick="window.signInAsDemoUser('Lina Al-Mansour', 'TAMSTAR Admin', 'lina.almansour@tamstar.com', 'LM', '#0f172a')">
                <div class="auth-avatar" style="background-color: #0f172a;">LM</div>
                <div class="auth-role-info">
                  <div class="auth-role-name">Lina Al-Mansour</div>
                  <div class="auth-role-sub">TAMSTAR Admin</div>
                </div>
                <span class="auth-role-arrow">&rarr;</span>
              </div>
            </div>
          </div>

          <div class="auth-divider">
            <span>OR</span>
          </div>

          <form class="auth-form" onsubmit="event.preventDefault(); window.handleAuthSubmit();">
            <div class="auth-field-group">
              <label class="auth-label" for="authEmailInput">Work email</label>
              <input type="email" id="authEmailInput" class="auth-input" value="sara.aldossary@gulfpetrochem.sa" placeholder="name@company.com" required>
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

        <!-- Pane 2: Request Access (Sign up) -->
        <div class="auth-tab-pane" id="authPaneSignUp">
          <h2 class="auth-title">Request Company Account</h2>
          <p class="auth-subtitle">Join verified Saudi industrial enterprises procuring via TAMSTAR B2B contracts.</p>

          <form class="auth-form" onsubmit="event.preventDefault(); window.handleSignUpSubmit();">
            <div class="auth-field-group">
              <label class="auth-label" for="signupCompanyName">Company Legal Name</label>
              <input type="text" id="signupCompanyName" class="auth-input" placeholder="e.g. Saudi Aramco Subcontractor Ltd." required>
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

  window.signInAsDemoUser = function(name, role, email, initials, avatarBg) {
    window.currentUser = { name, role, email, initials, avatarBg };
    updateUserAuthUI();
    window.closeAuthModal();
    showToast(`Welcome back, ${name} (${role})`, 'success');
  };

  window.handleAuthSubmit = function() {
    const email = document.getElementById('authEmailInput') ? document.getElementById('authEmailInput').value : 'user@company.sa';
    window.currentUser = {
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      role: 'Enterprise Buyer',
      email: email,
      initials: 'EB',
      avatarBg: '#ea580c'
    };
    updateUserAuthUI();
    window.closeAuthModal();
    showToast(`Welcome back! Signed in with ${email}`, 'success');
  };

  window.handleSignUpSubmit = function() {
    const company = document.getElementById('signupCompanyName') ? document.getElementById('signupCompanyName').value : 'Company';
    window.closeAuthModal();
    showToast(`Requisition received for ${company}! Verification email sent.`, 'success');
  };

  function updateUserAuthUI() {
    if (!window.currentUser) return;
    document.querySelectorAll('.signin-btn').forEach(btn => {
      btn.innerHTML = `
        <span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; background:${window.currentUser.avatarBg}; color:#fff; font-size:10px; font-weight:800; margin-right:4px;">${window.currentUser.initials}</span>
        <span>${window.currentUser.name.split(' ')[0]}</span>
      `;
      btn.onclick = () => {
        showToast(`Signed in: ${window.currentUser.name} (${window.currentUser.role})`, 'info');
      };
    });
  }

  // Robust Initializer runner
  window.initProductDetailPage = initProductDetailPage;
  window.initCatalogPage = initCatalogPage;

  function runInitializers() {
    if (window.initCartSidebar) window.initCartSidebar();
    if (window.initProductDetailPage) window.initProductDetailPage();
    if (window.initCatalogPage) window.initCatalogPage();
    if (window.initAuthModal) window.initAuthModal();
  }

  runInitializers();
});
