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
});



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
      image: 'assets/images/cat-bearings.svg',
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
      image: 'assets/images/cat-valves.svg',
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
      image: 'assets/images/cat-safety.svg',
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
    const title = document.getElementById('pdpTitle') ? document.getElementById('pdpTitle').textContent : 'Product';
    const price = document.getElementById('pdpPriceVal') ? ('SAR ' + document.getElementById('pdpPriceVal').textContent) : 'SAR 0.00';
    for (let i = 0; i < currentPdpQty; i++) {
      window.addToCart(title, price);
    }
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

  // Initialize on load
  initProductDetailPage();
