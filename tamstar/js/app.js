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

  // 3. Cart Counter & Add To Cart Functionality
  let cartCount = 0;
  const cartBadge = document.getElementById('cartBadge');

  window.addToCart = function(productName, price) {
    cartCount++;
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.transform = 'scale(1.3)';
      setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
    }
    showToast(`Added to Order: ${productName} (${price})`);
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
      image: 'assets/images/cat-safety.svg',
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
      image: 'assets/images/cat-bearings.svg',
      sku: 'BRG-6205-2RS'
    },
    'valve': {
      brand: 'DURAVALVE',
      title: 'Gate Valve 4" Class 150 Flanged Cast Steel WCB API 600',
      price: 'SAR 1,595.00',
      stock: '42 in stock · Jubail Yard',
      image: 'assets/images/cat-valves.svg',
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
    const item = productsDatabase[productId];
    if (!item || !modalBackdrop) return;

    if (modalImage) modalImage.src = item.image;
    if (modalBrand) modalBrand.textContent = item.brand;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalPrice) modalPrice.textContent = item.price;
    if (modalStock) modalStock.textContent = item.stock;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
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
      
      demoBadge.innerHTML = `<span class="demo-dot"></span><span>DEMO: ${currentTier}</span><svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6" stroke-width="2.5"/></svg>`;
      
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
  window.requestQuote = function(categoryName = 'General') {
    showToast(`Quote requisition initiated for: ${categoryName}. Quote ID #QT-${Math.floor(1000 + Math.random() * 9000)} generated.`, 'info');
  };
});

