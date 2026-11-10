/**
 * TAMSTAR CONSTRUCT - Industrial & Construction Equipment Platform Engine
 * 100% Pure PNG visual architecture, zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Toast Notification System
  // ==========================================================================
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastBox');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastBox';
      container.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 100000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
        max-width: 90vw;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background-color: #0f172a;
      color: #ffffff;
      padding: 12px 18px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 700;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      border-left: 4px solid ${type === 'success' ? '#f59e0b' : '#38bdf8'};
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: auto;
      transform: translateX(40px);
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    toast.innerHTML = `<span style="color:${type === 'success' ? '#f59e0b' : '#38bdf8'}">${type === 'success' ? '✓' : 'ℹ'}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateX(40px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }
  window.showToast = showToast;

  // ==========================================================================
  // 2. Full Industrial Catalog Registry (Search, Quick View & Showcase)
  // ==========================================================================
  const allProducts = [
    { id: 'h1', sku: 'TAM-CH-850', category: 'demolition', title: 'Corded Chipping Hammer – Orange & Black with Auxiliary Handle', price: 77.00, specs: '850W · SDS-Max · 360° Aux Grip · 12J Impact', image: 'assets/images/demo-hammer-1.png' },
    { id: 'h2', sku: 'TAM-DH-1500', category: 'demolition', title: 'Demolition Hammer – Orange & Silver with Rear Loop Handle', price: 99.00, specs: '1500W · 25J Impact · Anti-Vibration D-Loop', image: 'assets/images/demo-hammer-2.png' },
    { id: 'h3', sku: 'TAM-DH-1800B', category: 'demolition', title: 'Demolition Hammer – Blue & Silver with Auxiliary Handle', price: 104.00, specs: '1800W · Dual-Handle Magnesium Gear Case', image: 'assets/images/demo-hammer-3.png' },
    { id: 'h4', sku: 'TAM-DH-2200X', category: 'demolition', title: 'Corded Demolition Hammer – Orange & Silver Heavy Breaker', price: 142.00, specs: '2200W · 30mm Hex Chuck · Concrete Chisel Included', image: 'assets/images/demo-hammer-4.png' },
    { id: 'h5', sku: 'TAM-RD-20V', category: 'drilling', title: 'Brushless Cordless Hammer Drill 20V Max 5.0Ah Kit', price: 185.00, specs: '120 Nm Torque · 2x 5.0Ah Batteries · Depth Rod', image: 'assets/images/cat-drill.png' },
    { id: 'h6', sku: 'TAM-PB-30K', category: 'demolition', title: 'Heavy Industrial Paving Breaker Jackhammer – Yellow 45J', price: 210.00, specs: '2400W · 45 Joules Impact Energy · 1,900 BPM', image: 'assets/images/cat-demolition.png' },
    { id: 'h7', sku: 'TAM-AG-230', category: 'grinding', title: 'Industrial Heavy Angle Grinder 230mm (9") Steel Edition', price: 125.00, specs: '2600W · 8,500 RPM · Swivel Deadman Trigger', image: 'assets/images/cat-grinder.png' },
    { id: 'h8', sku: 'TAM-GEN-150', category: 'generators', title: 'Silent Soundproof Diesel Generator 150 kVA Trailer', price: 3400.00, specs: '150 kVA · Twin-Axle Site Trailer · ATS Control', image: 'assets/images/cat-generator.png' },
    { id: 'c1', sku: 'TAM-WLD-400', category: 'welding', title: 'Auto-Darkening Carbon Helmet & MIG Welding Torch Kit', price: 168.00, specs: 'DIN 4/9-13 Solar Auto-Dark · 400A Euro Torch', image: 'assets/images/cat-welding.png' },
    { id: 'c2', sku: 'TAM-CMX-350', category: 'concrete', title: 'Portable Drum Concrete Mixer 350L Heavy Site Edition', price: 890.00, specs: '350L Drum · Cast Iron Ring Gear · Pneumatic Tires', image: 'assets/images/cat-concrete.png' },
    { id: 'c3', sku: 'TAM-EXC-35T', category: 'earthmoving', title: 'Compact Crawler Hydraulic Excavator 3.5 Ton Series', price: 18500.00, specs: 'Zero Tail Swing · 3.5 Ton · Stage V Diesel', image: 'assets/images/cat-earthmoving.png' },
    { id: 'c4', sku: 'TAM-PPE-PRO', category: 'safety', title: 'Site PPE Kit – Vented Hard Hat, Ear Muffs, Goggles & Gloves', price: 64.00, specs: 'EN 397 Helmet · A5 Cut-Resistant Gloves · 32dB NRR', image: 'assets/images/cat-safety.png' }
  ];
  window.allProducts = allProducts;

  // ==========================================================================
  // 3. Top Hero Banner Slider (Image 1 Auto-Slide + Touch + Pager)
  // ==========================================================================
  let currentHeroSlide = 0;
  const heroSlides = document.querySelectorAll('.hero-slide');
  const totalHeroSlides = heroSlides.length;
  let heroTimer = null;

  window.goToHeroSlide = function(index) {
    if (totalHeroSlides === 0) return;
    if (index < 0) index = totalHeroSlides - 1;
    if (index >= totalHeroSlides) index = 0;

    currentHeroSlide = index;

    heroSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    const pagerFill = document.getElementById('heroCenterProgress');
    const pagerNum = document.getElementById('heroCenterNum');
    if (pagerFill) {
      const pct = (100 / totalHeroSlides) * index;
      pagerFill.style.width = (100 / totalHeroSlides) + '%';
      pagerFill.style.left = pct + '%';
    }
    if (pagerNum) {
      pagerNum.textContent = '0' + (index + 1);
    }
  };

  window.nextHeroSlide = function() {
    window.goToHeroSlide(currentHeroSlide + 1);
  };

  window.prevHeroSlide = function() {
    window.goToHeroSlide(currentHeroSlide - 1);
  };

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroTimer = setInterval(window.nextHeroSlide, 5500);
  }

  function stopHeroAutoplay() {
    if (heroTimer) clearInterval(heroTimer);
  }

  const heroViewport = document.getElementById('heroSliderViewport');
  if (heroViewport) {
    heroViewport.addEventListener('mouseenter', stopHeroAutoplay);
    heroViewport.addEventListener('mouseleave', startHeroAutoplay);

    // Touch swipe for mobile hero
    let touchStartX = 0;
    heroViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopHeroAutoplay();
    }, { passive: true });
    heroViewport.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) window.nextHeroSlide();
        else window.prevHeroSlide();
      }
      startHeroAutoplay();
    }, { passive: true });
  }
  startHeroAutoplay();

  // ==========================================================================
  // 4. Category Carousel Navigation & Interaction (Image 3)
  // ==========================================================================
  const catTrack = document.getElementById('circularCatTrack');
  window.scrollCatCarousel = function(direction) {
    if (!catTrack) return;
    const step = window.innerWidth <= 768 ? 240 : 420;
    catTrack.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  window.selectCategory = function(catKey, catName, cardEl) {
    document.querySelectorAll('.circle-cat-card').forEach(c => c.classList.remove('active'));
    if (cardEl) cardEl.classList.add('active');

    // Close mega menu or mobile drawer if open
    const megaMenu = document.getElementById('categoriesMegaMenu');
    if (megaMenu) megaMenu.classList.remove('active');

    showToast(`Browsing ${catName}`);

    // If matching series exists in Section 5, automatically highlight it and scroll neatly
    const seriesMap = {
      'drilling': 'drilling',
      'demolition': 'demolition',
      'grinding': 'grinding',
      'welding': 'grinding',
      'concrete': 'construction',
      'earthmoving': 'construction',
      'generators': 'construction',
      'safety': 'construction'
    };

    const targetSeries = seriesMap[catKey];
    if (catKey === 'demolition') {
      document.getElementById('demolitionSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (targetSeries) {
      const tabBtn = document.querySelector(`.showcase-tab-btn[data-series="${targetSeries}"]`);
      window.switchShowcaseSeries(targetSeries, tabBtn);
      document.getElementById('showcaseSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ==========================================================================
  // 5. 4th Section: "BUILT TO BREAK THROUGH" Pagination (Image 4)
  // ==========================================================================
  let currentDemoPage = 1;
  const demoPage1Ids = ['h1', 'h2', 'h3', 'h4'];
  const demoPage2Ids = ['h5', 'h6', 'h7', 'h8'];

  window.setDemoPage = function(pageNum) {
    currentDemoPage = pageNum;
    const pageNumEl = document.getElementById('demoCurrentPageNum');
    const pagerFill = document.getElementById('demoPagerBarFill');
    const cardsContainer = document.getElementById('demoCardsGrid');

    if (pageNumEl) pageNumEl.textContent = '0' + pageNum;
    if (pagerFill) pagerFill.style.left = pageNum === 1 ? '0%' : '50%';

    if (cardsContainer) {
      const idList = pageNum === 1 ? demoPage1Ids : demoPage2Ids;
      const items = idList.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

      cardsContainer.innerHTML = items.map(p => `
        <div class="product-card-clean">
          <div class="product-thumb-box" onclick="window.openQuickView('${p.id}')">
            <img src="${p.image}" alt="${p.title}">
            <button type="button"
              class="product-cart-float-btn"
              onclick="event.stopPropagation(); window.addToCart('${p.id}')"
              aria-label="Add ${p.title} to cart">
              <svg style="width: 17px; height: 17px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </button>
          </div>
          <div class="product-info-wrap">
            <h4 class="product-title-text" onclick="window.openQuickView('${p.id}')">${p.title}</h4>
            <div class="product-price-val">$${p.price.toFixed(2)}</div>
          </div>
        </div>
      `).join('');
    }
  };

  window.nextDemoPage = function() {
    window.setDemoPage(currentDemoPage === 1 ? 2 : 1);
  };

  window.prevDemoPage = function() {
    window.setDemoPage(currentDemoPage === 2 ? 1 : 2);
  };

  // ==========================================================================
  // 6. 5th Section: Interactive Image Showcase Tabs (Image 5)
  //    Clicking 01 / 02 / 03 / 04 swaps the high-res PNG image, headline & shelf
  // ==========================================================================
  const showcaseSeriesData = {
    'drilling': {
      eyebrow: 'SERIES 01 · DRILLING & FASTENING',
      heading: 'POWER AND ACCURACY IN EVERY TURN',
      desc: 'Delivers consistent power and precision for efficient drilling through reinforced concrete, structural steel, and heavy timber.',
      img: 'assets/images/hero-drill.png',
      align: 'right',
      ctaAction: "window.openQuickView('h5')",
      ctaText: 'SHOP NOW',
      specs: [
        { val: '120 Nm', lbl: 'Max Torque' },
        { val: '2,800 RPM', lbl: 'Peak Speed' },
        { val: 'Brushless', lbl: 'EC Motor' }
      ],
      productIds: ['h5', 'h1', 'h3', 'h7']
    },
    'demolition': {
      eyebrow: 'SERIES 02 · DEMOLITION POWER',
      heading: 'UNSTOPPABLE DEMOLITION FORCE',
      desc: 'Forged for relentless concrete breaking and foundation trenching with anti-vibration isolation delivering up to 45 Joules per blow.',
      img: 'assets/images/hero-demolition.png',
      align: 'left',
      ctaAction: "window.openQuickView('h6')",
      ctaText: 'SHOP BREAKERS',
      specs: [
        { val: '45 Joules', lbl: 'Impact Force' },
        { val: '1,900 BPM', lbl: 'Blow Rate' },
        { val: 'AVT Grip', lbl: 'Low Vibe' }
      ],
      productIds: ['h6', 'h2', 'h3', 'h4']
    },
    'grinding': {
      eyebrow: 'SERIES 03 · GRIND WITH PRECISION',
      heading: 'PRECISION STEEL FABRICATION',
      desc: 'High-RPM brushless angle grinders and heavy arc welding gear engineered for non-stop cutting, beveling, and structural weld dressing.',
      img: 'assets/images/hero-grinder.png',
      align: 'right',
      ctaAction: "window.openQuickView('h7')",
      ctaText: 'SHOP GRINDERS',
      specs: [
        { val: '2,600W', lbl: 'Continuous Duty' },
        { val: '8,500 RPM', lbl: 'Disc Speed' },
        { val: '230 mm', lbl: 'Cutting Wheel' }
      ],
      productIds: ['h7', 'c1', 'h1', 'c4']
    },
    'construction': {
      eyebrow: 'SERIES 04 · CONSTRUCTION TOOLS & FLEET',
      heading: 'BUILT FOR HEAVY SITE ENDURANCE',
      desc: 'Complete jobsite machinery spanning towable diesel concrete mixers, silent power generators, hydraulic excavators, and certified PPE.',
      img: 'assets/images/hero-construction.png',
      align: 'left',
      ctaAction: "window.openQuickView('c3')",
      ctaText: 'EXPLORE FLEET',
      specs: [
        { val: '150 kVA', lbl: 'Site Power' },
        { val: '3.5 Ton', lbl: 'Hydraulic Class' },
        { val: 'Nationwide', lbl: 'Jobsite Delivery' }
      ],
      productIds: ['c3', 'c2', 'h8', 'c4']
    }
  };

  window.switchShowcaseSeries = function(seriesKey, btn) {
    document.querySelectorAll('.showcase-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
    } else {
      const fallbackBtn = document.querySelector(`.showcase-tab-btn[data-series="${seriesKey}"]`);
      if (fallbackBtn) fallbackBtn.classList.add('active');
    }

    const data = showcaseSeriesData[seriesKey];
    if (!data) return;

    const bgImg = document.getElementById('sec5BgImg');
    const overlay = document.getElementById('sec5Overlay');
    const copyCol = document.getElementById('sec5CopyCol');
    const eyebrowEl = document.getElementById('sec5Eyebrow');
    const headingEl = document.getElementById('sec5Heading');
    const descEl = document.getElementById('sec5Desc');
    const ctaBtn = document.getElementById('sec5CtaBtn');
    const specsEl = document.getElementById('sec5SpecsCluster');
    const shelfNameEl = document.getElementById('sec5ShelfSeriesName');
    const shelfGridEl = document.getElementById('sec5ProductsGrid');

    // Crossfade PNG swap
    if (bgImg) {
      bgImg.style.opacity = '0.35';
      setTimeout(() => {
        bgImg.src = data.img;
        bgImg.alt = data.heading;
        bgImg.style.opacity = '1';
      }, 150);
    }

    if (overlay) {
      overlay.classList.toggle('align-left', data.align === 'left');
    }
    if (copyCol) {
      copyCol.classList.toggle('align-left', data.align === 'left');
    }

    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (headingEl) headingEl.textContent = data.heading;
    if (descEl) descEl.textContent = data.desc;
    if (ctaBtn) {
      ctaBtn.textContent = data.ctaText;
      ctaBtn.setAttribute('onclick', data.ctaAction);
    }

    if (specsEl) {
      specsEl.innerHTML = data.specs.map(s => `
        <div class="showcase-spec-chip">
          <div class="showcase-spec-val">${s.val}</div>
          <div class="showcase-spec-lbl">${s.lbl}</div>
        </div>
      `).join('');
    }

    if (shelfNameEl) {
      const shortName = data.eyebrow.split('·')[1]?.trim() || seriesKey;
      shelfNameEl.textContent = shortName;
    }

    if (shelfGridEl) {
      const items = data.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
      shelfGridEl.innerHTML = items.map(item => `
        <div class="series-dark-card">
          <div class="series-card-img-wrap" onclick="window.openQuickView('${item.id}')">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <h5 class="series-card-title">${item.title}</h5>
          <div class="series-card-sub">${item.specs}</div>
          <div class="series-card-bottom">
            <span class="series-card-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <button type="button" class="series-add-btn" onclick="window.addToCart('${item.id}')">+ Add</button>
          </div>
        </div>
      `).join('');
    }
  };

  // ==========================================================================
  // 7. Shopping Cart State & Slide-Out Sidebar
  // ==========================================================================
  window.cartState = {
    items: [
      { id: 'h1', title: 'Corded Chipping Hammer – Orange & Black with Auxiliary Handle', price: 77.00, qty: 1, image: 'assets/images/demo-hammer-1.png' },
      { id: 'h3', title: 'Demolition Hammer – Blue & Silver with Auxiliary Handle', price: 104.00, qty: 1, image: 'assets/images/demo-hammer-3.png' }
    ]
  };

  window.openCart = function() {
    window.renderCart();
    document.getElementById('cartOverlay')?.classList.add('active');
    document.getElementById('cartSidebar')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCart = function() {
    document.getElementById('cartOverlay')?.classList.remove('active');
    document.getElementById('cartSidebar')?.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.renderCart = function() {
    const list = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotalVal');
    const vatEl = document.getElementById('cartVatVal');
    const totalEl = document.getElementById('cartTotalVal');
    const badgeEl = document.getElementById('headerCartBadge');

    let totalQty = 0;
    let subtotal = 0;

    window.cartState.items.forEach(i => {
      totalQty += i.qty;
      subtotal += i.price * i.qty;
    });

    if (badgeEl) badgeEl.textContent = totalQty;

    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
    if (vatEl) vatEl.textContent = '$' + vat.toFixed(2);
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

    if (list) {
      if (window.cartState.items.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:44px 12px; color:#94a3b8; font-weight:600;">Your equipment order list is empty.</div>`;
        return;
      }

      list.innerHTML = window.cartState.items.map(item => `
        <div style="display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid #f1f5f9;">
          <img src="${item.image}" alt="${item.title}" style="width:56px; height:56px; object-fit:contain; border-radius:8px; background:#faf9f5; padding:4px; border:1px solid #e2e8f0;">
          <div style="flex:1; min-width:0;">
            <h5 style="font-size:13px; font-weight:700; color:#0f172a; margin-bottom:4px; line-height:1.3; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.title}</h5>
            <div style="font-size:13px; font-weight:800; color:#d97706;">$${item.price.toFixed(2)}</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px; border:1px solid #e2e8f0; border-radius:8px; padding:3px 7px; background:#f8fafc;">
            <button type="button" style="border:none; background:transparent; font-weight:900; padding:0 4px;" onclick="window.updateCartQty('${item.id}', -1)">&minus;</button>
            <span style="font-size:12.5px; font-weight:800; min-width:16px; text-align:center;">${item.qty}</span>
            <button type="button" style="border:none; background:transparent; font-weight:900; padding:0 4px;" onclick="window.updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join('');
    }
  };

  window.addToCart = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = window.cartState.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      window.cartState.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.image
      });
    }

    showToast(`Added: ${product.title.split('–')[0].trim()}`);
    window.openCart();
  };

  window.updateCartQty = function(id, delta) {
    const item = window.cartState.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      window.cartState.items = window.cartState.items.filter(i => i.id !== id);
    }
    window.renderCart();
  };

  window.submitDemoCheckout = function() {
    if (window.cartState.items.length === 0) {
      showToast('Add equipment items before submitting order.', 'info');
      return;
    }
    window.closeCart();
    showToast('Purchase Order #PO-88412 submitted to dispatch desk!');
    window.cartState.items = [];
    window.renderCart();
  };

  // ==========================================================================
  // 8. Header Controls, Mega Menu, Search, Mobile Drawer & Modals
  // ==========================================================================
  window.toggleMegaMenu = function(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('categoriesMegaMenu');
    if (menu) menu.classList.toggle('active');
  };

  document.addEventListener('click', (e) => {
    const menu = document.getElementById('categoriesMegaMenu');
    const btn = document.getElementById('allCatBtn');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('active');
    }

    const searchDrop = document.getElementById('searchResultsDropdown');
    const searchWrap = document.getElementById('desktopSearchWrapper');
    if (searchDrop && searchWrap && !searchWrap.contains(e.target)) {
      searchDrop.classList.remove('active');
    }
  });

  window.toggleMobileSearch = function() {
    const bar = document.getElementById('mobileSearchBar');
    if (bar) {
      bar.classList.toggle('active');
      if (bar.classList.contains('active')) {
        document.getElementById('mobileSearchInput')?.focus();
      }
    }
  };

  window.handleSearchInput = function(query) {
    const dropdown = document.getElementById('searchResultsDropdown');
    const q = (query || '').trim().toLowerCase();
    if (!dropdown) return;

    if (q.length < 2) {
      dropdown.classList.remove('active');
      return;
    }

    const matches = allProducts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding:14px; text-align:center; color:#64748b; font-size:13px;">No equipment found matching "${query}". Try "hammer", "drill", or "grinder".</div>`;
    } else {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-result-row" onclick="window.openQuickView('${m.id}'); document.getElementById('searchResultsDropdown').classList.remove('active');">
          <img src="${m.image}" alt="${m.title}">
          <div style="flex:1; min-width:0;">
            <div style="font-size:13px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.title}</div>
            <div style="font-size:11.5px; color:#64748b;">SKU: ${m.sku} · ${m.specs}</div>
          </div>
          <div style="font-size:13px; font-weight:800; color:#d97706;">$${m.price.toFixed(2)}</div>
        </div>
      `).join('');
    }
    dropdown.classList.add('active');
  };

  // Ctrl+K Search Focus
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const input = document.getElementById('desktopSearchInput');
      if (input) input.focus();
    }
  });

  window.toggleMobileDrawer = function() {
    document.getElementById('mobileDrawer')?.classList.toggle('active');
    document.getElementById('drawerOverlay')?.classList.toggle('active');
  };

  window.closeAllModals = function() {
    document.getElementById('modalBackdrop')?.classList.remove('active');
    document.querySelectorAll('.center-modal').forEach(m => m.classList.remove('active'));
  };

  window.openModal = function(modalId) {
    window.closeAllModals();
    document.getElementById('modalBackdrop')?.classList.add('active');
    document.getElementById(modalId)?.classList.add('active');
  };

  window.openQuickView = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const body = document.getElementById('quickViewBody');
    if (body) {
      body.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr; gap:16px;">
          <div style="background:#faf9f5; border-radius:12px; padding:20px; display:grid; place-items:center; height:220px; border:1px solid #e2e8f0;">
            <img src="${product.image}" alt="${product.title}" style="max-height:185px; object-fit:contain;">
          </div>
          <div>
            <div style="font-size:11.5px; font-weight:800; color:#d97706; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:4px;">SKU: ${product.sku} · IN STOCK FOR IMMEDIATE DISPATCH</div>
            <h3 style="font-size:18px; font-weight:800; color:#0f172a; line-height:1.35; margin-bottom:8px;">${product.title}</h3>
            <p style="font-size:13.5px; color:#64748b; margin-bottom:14px;">${product.specs}</p>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:12px; border-top:1px solid #e2e8f0;">
              <div style="font-size:22px; font-weight:900; color:#0f172a;">$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <button type="button" class="hero-shop-btn" style="padding:11px 22px;" onclick="window.closeAllModals(); window.addToCart('${product.id}')">Add to Order</button>
            </div>
          </div>
        </div>
      `;
    }
    window.openModal('quickViewModal');
  };

  let isArabic = false;
  window.toggleLanguage = function() {
    isArabic = !isArabic;
    const label = document.getElementById('langBtnText');
    if (label) label.textContent = isArabic ? 'English' : 'العربية';
    showToast(isArabic ? 'Arabic industrial catalog mode enabled' : 'English catalog mode active', 'info');
  };

  window.submitQuickOrder = function(e) {
    e.preventDefault();
    const sku = document.getElementById('quickSkuInput')?.value?.trim() || 'TAM-DH-1500';
    const match = allProducts.find(p => p.sku.toLowerCase() === sku.toLowerCase()) || allProducts[1];
    window.closeAllModals();
    window.addToCart(match.id);
  };

  window.submitRfqForm = function(e) {
    e.preventDefault();
    window.closeAllModals();
    showToast('RFQ sent! Project sourcing team will reply within 2 hours.');
  };

  window.submitAuthForm = function(e) {
    e.preventDefault();
    window.closeAllModals();
    showToast('Signed in to TAMSTAR CONSTRUCT Trade Account');
  };

  // Back to Top Button
  const topBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (topBtn) {
      topBtn.style.display = window.scrollY > 360 ? 'grid' : 'none';
    }
  });

  window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize Default Page State
  window.renderCart();
  window.setDemoPage(1);
  window.switchShowcaseSeries('drilling', document.querySelector('.showcase-tab-btn[data-series="drilling"]'));
});
