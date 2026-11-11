/**
 * TAMSTAR - Heavy Construction & Industrial Storefront Engine
 * 100% Pure PNG photography, Saudi Riyal (SAR) pricing, Index + PDP
 */

document.addEventListener('DOMContentLoaded', () => {

  function formatPrice(val) {
    return 'SAR ' + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  window.formatPrice = formatPrice;

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
  // 2. Complete Industrial Equipment Catalog
  // ==========================================================================
  const allProducts = [
    // Task 3 Featured Listing Products (p1 - p8)
    {
      id: 'p1',
      sku: 'IF-IW-900',
      brand: 'TAMSTAR',
      category: 'power',
      categoryLabel: 'Power & Fastening',
      badge: 'Best seller',
      badgeSecondary: 'Pro Series',
      stock: 184,
      rating: 4.9,
      reviews: 142,
      title: '20V Max Brushless 1/2" High-Torque Impact Wrench Kit',
      price: 935.00,
      specs: '950 Nm Breakaway · 3-Speed EC Motor · 5.0Ah Battery',
      image: 'assets/images/pro-impact-wrench.png',
      description: 'Built for structural bolting, anchor setting, and heavy steel erection. Features a brushless EC motor delivering 950 Nm of breakaway torque, 3-mode drive control, and integrated LED work-ring illumination.',
      highlights: [
        '950 Nm maximum loosening torque with friction-ring 1/2" anvil',
        'Includes 20V 5.0Ah lithium-ion pack and rapid charger',
        'Cast-aluminum gear housing built for harsh jobsite drops',
        'Variable speed trigger with precision bolt-stop mode'
      ],
      specTable: [
        ['Power Source', '20V Max Lithium-Ion'],
        ['Max Torque', '950 Nm Breakaway / 720 Nm Fastening'],
        ['Drive Size', '1/2" Square Hog Ring'],
        ['No-Load Speed', '0–1,900 RPM (3-Mode)'],
        ['Weight', '2.4 kg (with battery)'],
        ['Warranty', '3-Year Tamstar Coverage']
      ]
    },
    {
      id: 'p2',
      sku: 'LT-RL-360',
      brand: 'LASERTECH',
      category: 'laser',
      categoryLabel: 'Laser & Survey',
      badge: 'Top Rated',
      badgeSecondary: 'Calibrated',
      stock: 62,
      rating: 4.9,
      reviews: 89,
      title: '360° Green Beam Self-Leveling Rotary Laser Level',
      price: 1460.00,
      specs: '600m Range · ±1.5mm Accuracy · IP66 Jobsite Sealed',
      image: 'assets/images/pro-laser-level.png',
      description: 'High-visibility green diode rotary laser engineered for grading, foundation layout, ceiling leveling, and exterior concrete pours. Dual-slope manual mode and shock-resistant overmolded housing.',
      highlights: [
        '4x brighter green beam visible in bright daylight conditions',
        'Electronic self-leveling within ±5° with tilt alert shutoff',
        'IP66 dust and heavy rain resistance for outdoor excavation',
        'Selectable 100 / 300 / 600 RPM scan rotation speeds'
      ],
      specTable: [
        ['Laser Class', 'Class 2 Green Beam (515nm)'],
        ['Working Range', 'Up to 600m with Detector'],
        ['Leveling Accuracy', '±1.5 mm at 30m'],
        ['Protection Rating', 'IP66 Waterproof & Dustproof'],
        ['Battery Runtime', '24 Hours Continuous'],
        ['Warranty', '3-Year Calibration & Tool Warranty']
      ]
    },
    {
      id: 'p3',
      sku: 'VA-TIG-250',
      brand: 'VOLTARC',
      category: 'welding',
      categoryLabel: 'Welding & Cutting',
      badge: 'Best seller',
      badgeSecondary: '2-Yr Warranty',
      stock: 48,
      rating: 4.8,
      reviews: 116,
      title: '250A Digital IGBT Inverter Arc & TIG Welder',
      price: 1685.00,
      specs: '20–250A Output · Dual-Voltage 110/240V · Copper Leads',
      image: 'assets/images/pro-inverter-welder.png',
      description: 'Compact IGBT inverter welder delivering smooth arc stability for structural steel Stick (MMA) and Lift/HF TIG welding. Features digital amperage readout, anti-stick, hot start, and arc-force tuning.',
      highlights: [
        'True 250-amp industrial duty cycle with thermal overload protection',
        'Hot Start & Arc Force dial prevents electrode sticking on thick plate',
        'Includes heavy copper electrode holder and ground clamp cables',
        'Lightweight steel carry handle for easy scaffold portability'
      ],
      specTable: [
        ['Output Current', '20 – 250 Amps DC'],
        ['Input Voltage', '110V / 240V Auto-Sensing'],
        ['Duty Cycle', '60% @ 250A'],
        ['Processes', 'Stick (MMA) & TIG'],
        ['Cooling', 'High-Flow Twin Axial Fan'],
        ['Weight', '8.2 kg']
      ]
    },
    {
      id: 'p4',
      sku: 'IF-TS-10S',
      brand: 'TAMSTAR',
      category: 'power',
      categoryLabel: 'Power & Saws',
      badge: 'Best seller',
      badgeSecondary: 'Site Ready',
      stock: 34,
      rating: 4.9,
      reviews: 94,
      title: '10" Jobsite Table Saw with Folding Roll-Cage Stand',
      price: 2135.00,
      specs: '15A Motor · 32.5" Rip Capacity · Rack & Pinion Fence',
      image: 'assets/images/pro-table-saw.png',
      description: 'Engineered for framing crews and finish carpenters needing full-sheet rip accuracy in a mobile roll-cage frame. Features a telescoping rack-and-pinion fence and rugged 8-inch treaded transport wheels.',
      highlights: [
        '32-1/2" maximum rip capacity cuts full 4x8 plywood sheets cleanly',
        'Tool-free folding rolling stand deploys in under 15 seconds',
        '15-amp high-torque motor spins 4,800 RPM through dense hardwood',
        'Integrated dust port and modular blade guard assembly'
      ],
      specTable: [
        ['Blade Diameter', '10 in (254 mm) 24T Carbide'],
        ['Motor Power', '15 Amp / 1,800W'],
        ['Rip Capacity', '32.5" Right / 22" Left'],
        ['Bevel Range', '-2° to 47° Micro-Adjust'],
        ['No-Load Speed', '4,800 RPM'],
        ['Stand Included', 'Heavy Tubular Folding Cart']
      ]
    },
    {
      id: 'p5',
      sku: 'AP-AC-60G',
      brand: 'AIRPRO',
      category: 'welding',
      categoryLabel: 'Air & Pneumatics',
      badge: 'Contractor Pick',
      badgeSecondary: 'Oil-Free',
      stock: 112,
      rating: 4.7,
      reviews: 73,
      title: '6-Gallon Oil-Free Portable Jobsite Air Compressor',
      price: 670.00,
      specs: '150 PSI Max · Dual Brass Couplers · Steel Roll Cage',
      image: 'assets/images/pro-air-compressor.png',
      description: 'High-recovery oil-free pancake compressor protected inside a heavy tubular steel roll cage. Twin industrial brass couplers power framing nailers and finish guns simultaneously without pressure drop.',
      highlights: [
        '150 PSI max tank pressure powers multiple pneumatic nailers',
        'Oil-free pump requires zero lubrication and starts smoothly in cold weather',
        'Full tubular steel frame protects gauges from jobsite impacts',
        'Dual universal 1/4" brass quick couplers and high-flow regulator'
      ],
      specTable: [
        ['Tank Volume', '6 Gallon Pancake Steel'],
        ['Max Pressure', '150 PSI'],
        ['Air Delivery', '2.8 SCFM @ 90 PSI'],
        ['Couplers', '2x Solid Brass Quick-Connect'],
        ['Noise Level', '78 dBA Low-Vibration'],
        ['Weight', '14.5 kg']
      ]
    },
    {
      id: 'p6',
      sku: 'VA-WLD-400',
      brand: 'VOLTARC',
      category: 'welding',
      categoryLabel: 'Welding & PPE',
      badge: 'Pro Rated',
      badgeSecondary: 'DIN 4/9-13',
      stock: 96,
      rating: 4.8,
      reviews: 64,
      title: 'Auto-Darkening Carbon Helmet & 400A MIG Torch Kit',
      price: 630.00,
      specs: 'True-Color Solar Lens · 4 Arc Sensors · Euro MIG Torch',
      image: 'assets/images/cat-welding.png',
      description: 'Complete welder productivity kit pairing an ultra-lightweight carbon shell auto-darkening helmet (1/1/1/1 optical clarity) with a heavy-duty 400-amp ergonomic MIG welding gun.',
      highlights: [
        '0.04ms switching speed protects eyes against high-amp arc flash',
        '4 independent arc sensors eliminate blind spots in tight pipe joints',
        'External shade & grind mode controls usable with welding gloves',
        '400A Euro-connect swan-neck MIG torch with flexible rubber cable'
      ],
      specTable: [
        ['Optical Clarity', '1/1/1/1 True-Color Filter'],
        ['Shade Range', 'DIN 4 Light / DIN 9–13 Dark'],
        ['Torch Rating', '400A CO2 / 350A Mixed Gas'],
        ['Power Supply', 'Solar + Replaceable CR2450'],
        ['Shell Material', 'High-Impact Carbon Composite'],
        ['Standard', 'ANSI Z87.1 & EN 379']
      ]
    },
    {
      id: 'p7',
      sku: 'IS-PPE-PRO',
      brand: 'IRONSHIELD',
      category: 'laser',
      categoryLabel: 'Safety & PPE',
      badge: 'Best seller',
      badgeSecondary: 'OSHA Compliant',
      stock: 340,
      rating: 4.9,
      reviews: 215,
      title: 'Complete Jobsite PPE Kit — Vented Hard Hat, Muffs & A5 Gloves',
      price: 255.00,
      specs: 'EN 397 Helmet · 32dB Hearing Protection · ANSI A5 Cut Gloves',
      image: 'assets/images/cat-safety.png',
      description: 'All-in-one jobsite protection bundle built for steel crews, demolition operators, and civil contractors. Combines a 6-point ratchet vented safety helmet, snap-on 32dB ear muffs, anti-fog goggles, and ANSI A5 impact gloves.',
      highlights: [
        '6-point suspension ratchet adjusts comfortably with one hand',
        '32dB NRR clip-on ear defenders shield against breaker noise',
        'Anti-scratch wrap-around polycarbonate splash & dust goggles',
        'ANSI Cut Level A5 nitrile-coated impact gloves'
      ],
      specTable: [
        ['Helmet Standard', 'ANSI/ISEA Z89.1 & EN 397'],
        ['Hearing Rating', '32 dB NRR Integrated Muffs'],
        ['Glove Rating', 'ANSI Cut A5 / Impact TPR'],
        ['Eyewear', 'Anti-Fog Indirect Vent Z87+'],
        ['Sizes Included', 'Universal Ratchet / Large Gloves'],
        ['Kit Weight', '1.15 kg Complete Bundle']
      ]
    },
    {
      id: 'p8',
      sku: 'VM-GEN-150',
      brand: 'VOLTMAX',
      category: 'power',
      categoryLabel: 'Site Power',
      badge: 'Heavy Duty',
      badgeSecondary: 'ATS Ready',
      stock: 14,
      rating: 4.9,
      reviews: 41,
      title: '150 kVA Silent Soundproof Diesel Site Generator Trailer',
      price: 12950.00,
      specs: '150 kVA Prime · Twin-Axle Road Trailer · Digital ATS Panel',
      image: 'assets/images/cat-generator.png',
      description: 'Acoustically attenuated industrial diesel generator mounted on a DOT-ready twin-axle site trailer. Delivers clean three-phase power for cranes, concrete pumps, and temporary site offices.',
      highlights: [
        'Soundproof powder-coated canopy operates at low 68 dBA @ 7m',
        'Digital microprocessor controller with auto-transfer switch (ATS) port',
        '24-hour integrated base fuel tank with lockable filler cap',
        'Heavy twin-axle trailer with stabilizer jacks and pintle hitch'
      ],
      specTable: [
        ['Prime Output', '150 kVA / 120 kW 3-Phase'],
        ['Voltage Options', '400/230V · 50/60Hz Switchable'],
        ['Fuel Capacity', '380L Continuous Base Tank'],
        ['Noise Rating', '68 dBA Acoustic Enclosure'],
        ['Chassis', 'Twin-Axle Towable Site Trailer'],
        ['Warranty', '3-Year Commercial Engine Warranty']
      ]
    },

    // Demolition & Showcase Series Products (h1 - h8, c1 - c3)
    {
      id: 'h1',
      sku: 'IF-CH-850',
      brand: 'TAMSTAR',
      category: 'demolition',
      categoryLabel: 'Demolition & Breakers',
      badge: 'Best seller',
      stock: 145,
      rating: 4.8,
      reviews: 108,
      title: 'Corded Chipping Hammer – Orange & Black with Auxiliary Handle',
      price: 289.00,
      specs: '850W · SDS-Max · 360° Aux Grip · 12J Impact',
      image: 'assets/images/demo-hammer-1.png',
      description: 'Lightweight high-speed chipping hammer tailored for wall channeling, tile removal, and horizontal masonry prep with a 360-degree rotating side grip.',
      highlights: [
        '12 Joules impact energy in a compact 5.1 kg chassis',
        '12-position chisel lock angle for overhead and corner work',
        'Dust-sealed SDS-Max chuck accepts standard masonry bits',
        'Rubberized D-grip reduces operator wrist fatigue'
      ],
      specTable: [
        ['Input Power', '850W Corded 120V/230V'],
        ['Impact Energy', '12 Joules'],
        ['Chuck Type', 'SDS-Max Quick Lock'],
        ['Blows Per Min', '2,900 BPM'],
        ['Weight', '5.1 kg'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'h2',
      sku: 'IF-DH-1500',
      brand: 'TAMSTAR',
      category: 'demolition',
      categoryLabel: 'Demolition & Breakers',
      badge: 'Top Rated',
      stock: 82,
      rating: 4.9,
      reviews: 154,
      title: 'Demolition Hammer – Orange & Silver with Rear Loop Handle',
      price: 375.00,
      specs: '1500W · 25J Impact · Anti-Vibration D-Loop',
      image: 'assets/images/demo-hammer-2.png',
      description: 'Vertical inline concrete breaker built for trenching, slab opening, and rebar exposure with a die-cast magnesium crankcase and shock-absorbing rear D-loop.',
      highlights: [
        '25 Joules single-blow force cracks poured slabs rapidly',
        'Die-cast aluminum gear housing dissipates heat during long runs',
        'Includes heavy bull-point and flat concrete chisels',
        'Spring-isolated rear handle cuts vibration by 40%'
      ],
      specTable: [
        ['Input Power', '1,500W Heavy Duty'],
        ['Impact Energy', '25 Joules'],
        ['Chuck Type', '30mm Hex Breaker'],
        ['Blows Per Min', '1,950 BPM'],
        ['Weight', '10.8 kg'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'h3',
      sku: 'IF-DH-1800B',
      brand: 'TITANBREAK',
      category: 'demolition',
      categoryLabel: 'Demolition & Breakers',
      badge: 'Pro Series',
      stock: 67,
      rating: 4.8,
      reviews: 79,
      title: 'Demolition Hammer – Blue & Silver with Auxiliary Handle',
      price: 390.00,
      specs: '1800W · Dual-Handle Magnesium Gear Case',
      image: 'assets/images/demo-hammer-3.png',
      description: 'Industrial 1800W breaker combining balanced downward weight with twin anti-slip handles for asphalt cutting and structural foundation demolition.',
      highlights: [
        '1800W copper-wound armature resists overload burnouts',
        'Dual ergonomic grips maximize control on vertical plunges',
        'Hardened steel piston striker for extended service intervals',
        'Oil-sight window for instant maintenance checks'
      ],
      specTable: [
        ['Input Power', '1,800W Copper Armature'],
        ['Impact Energy', '32 Joules'],
        ['Chuck Type', '30mm Industrial Hex'],
        ['Blows Per Min', '1,850 BPM'],
        ['Weight', '12.4 kg'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'h4',
      sku: 'IF-DH-2200X',
      brand: 'TAMSTAR',
      category: 'demolition',
      categoryLabel: 'Demolition & Breakers',
      badge: 'Best seller',
      stock: 54,
      rating: 4.9,
      reviews: 192,
      title: 'Corded Demolition Hammer – Orange & Silver Heavy Breaker',
      price: 535.00,
      specs: '2200W · 30mm Hex Chuck · Concrete Chisel Included',
      image: 'assets/images/demo-hammer-4.png',
      description: 'Flagship heavy demolition breaker built for continuous civil slab destruction, bridge deck stripping, and deep utility trench excavation.',
      highlights: [
        '2200W high-output motor generates relentless breaking force',
        'Lock-on power trigger for fatigue-free vertical breaking',
        'Heavy-duty wheeled blow-mold case included',
        'Quick-change hex collar holds chisels securely under load'
      ],
      specTable: [
        ['Input Power', '2,200W Max Duty'],
        ['Impact Energy', '42 Joules'],
        ['Chuck Type', '30mm Hex Quick-Lock'],
        ['Blows Per Min', '1,750 BPM'],
        ['Weight', '14.5 kg'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'h5',
      sku: 'IF-RD-20V',
      brand: 'TAMSTAR',
      category: 'power',
      categoryLabel: 'Drills & Fasteners',
      badge: 'Best seller',
      stock: 210,
      rating: 4.9,
      reviews: 165,
      title: 'Brushless Cordless Hammer Drill 20V Max 5.0Ah Kit',
      price: 695.00,
      specs: '120 Nm Torque · 2x 5.0Ah Batteries · Depth Rod',
      image: 'assets/images/cat-drill.png',
      description: 'Compact brushless SDS-Plus rotary hammer drill engineered for anchor drilling in cured concrete, steel framing, and heavy timber fasteners.',
      highlights: [
        '120 Nm drilling torque with active kickback safety clutch',
        '3-mode selector: Drill, Hammer Drill, and Light Chisel',
        'Includes 2x 20V 5.0Ah packs and quick-adjust depth rod',
        'Built-in LED spot illuminates dark formwork cavities'
      ],
      specTable: [
        ['Voltage', '20V Max Brushless'],
        ['Max Torque', '120 Nm'],
        ['Speed Range', '0–2,800 RPM'],
        ['Chuck', '1/2" Metal Ratcheting + SDS'],
        ['Batteries', '2x 5.0Ah Li-Ion'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'h6',
      sku: 'TB-PB-30K',
      brand: 'TITANBREAK',
      category: 'demolition',
      categoryLabel: 'Demolition & Breakers',
      badge: 'Heavy Duty',
      stock: 39,
      rating: 4.9,
      reviews: 84,
      title: 'Heavy Industrial Paving Breaker Jackhammer – Yellow 45J',
      price: 790.00,
      specs: '2400W · 45 Joules Impact Energy · 1,900 BPM',
      image: 'assets/images/cat-demolition.png',
      description: 'Extreme-duty road and foundation breaker delivering 45 Joules of blow force with Active Vibration Control (AVT) rubberized grips.',
      highlights: [
        '45 Joules peak impact smashes reinforced concrete effortlessly',
        'Full AVT suspension chassis minimizes hand-arm vibration',
        '3.5m heavy-gauge rubber jobsite cord',
        'Supplied with point, flat, and asphalt spade chisels'
      ],
      specTable: [
        ['Power Input', '2,400W Industrial'],
        ['Impact Energy', '45 Joules'],
        ['Blow Rate', '1,900 BPM'],
        ['Vibration Tech', 'Active AVT Dual Grip'],
        ['Weight', '16.2 kg'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'h7',
      sku: 'SC-AG-230',
      brand: 'STEELCUT',
      category: 'power',
      categoryLabel: 'Grinders & Cutters',
      badge: 'Best seller',
      stock: 132,
      rating: 4.8,
      reviews: 129,
      title: 'Industrial Heavy Angle Grinder 230mm (9") Steel Edition',
      price: 470.00,
      specs: '2600W · 8,500 RPM · Swivel Deadman Trigger',
      image: 'assets/images/cat-grinder.png',
      description: 'High-wattage 9-inch steel fabrication grinder featuring spiral bevel gears, soft-start electronics, and a rotating rear paddle handle.',
      highlights: [
        '2600W armored motor coils deflect grinding sparks and steel grit',
        'Soft-start ramp prevents torque kickback on startup',
        'Tool-free rotating wheel guard locks into 12 positions',
        '3-position vibration-damped side handle'
      ],
      specTable: [
        ['Disc Diameter', '230 mm (9 inch)'],
        ['Motor Power', '2,600W'],
        ['No-Load Speed', '8,500 RPM'],
        ['Spindle Thread', 'M14 / 5/8"-11'],
        ['Weight', '5.3 kg'],
        ['Warranty', '3-Year Pro Warranty']
      ]
    },
    {
      id: 'c2',
      sku: 'MF-CMX-350',
      brand: 'MIXFORCE',
      category: 'power',
      categoryLabel: 'Concrete Mixers',
      badge: 'Site Ready',
      stock: 22,
      rating: 4.8,
      reviews: 57,
      title: 'Portable Drum Concrete Mixer 350L Heavy Site Edition',
      price: 3340.00,
      specs: '350L Drum · Cast Iron Ring Gear · Pneumatic Tires',
      image: 'assets/images/cat-concrete.png',
      description: 'Heavy-gauge steel 350-liter concrete and mortar drum mixer powered by a sealed 2.0 HP electric motor with oversized handwheels and pneumatic transport tires.',
      highlights: [
        'Thick 350L steel mixing drum handles full concrete batches',
        'Cast-iron segmented ring gear built for long-term site abuse',
        'Dual tilt handwheels with positive foot-brake locking latch',
        'Towbar eye & puncture-resistant pneumatic wheels'
      ],
      specTable: [
        ['Drum Volume', '350 Liters (240L Mix Output)'],
        ['Drive Motor', '2.0 HP Sealed Electric'],
        ['Drum Speed', '28 RPM'],
        ['Ring Gear', 'Heavy Cast Iron'],
        ['Tires', '14" Heavy Pneumatic'],
        ['Warranty', '2-Year Structural Warranty']
      ]
    },
    {
      id: 'c3',
      sku: 'TF-EXC-35T',
      brand: 'TERRAFORGE',
      category: 'power',
      categoryLabel: 'Heavy Earthmoving',
      badge: 'Fleet Machine',
      stock: 6,
      rating: 5.0,
      reviews: 19,
      title: 'Compact Crawler Hydraulic Excavator 3.5 Ton Series',
      price: 69500.00,
      specs: 'Zero Tail Swing · 3.5 Ton · Stage V Diesel',
      image: 'assets/images/cat-earthmoving.png',
      description: 'Zero-tail-swing 3.5-ton mini excavator engineered for urban trenching, utility lines, and tight residential foundations with responsive pilot hydraulics.',
      highlights: [
        'Zero tail swing rotates safely alongside walls and trenches',
        'Auxiliary hydraulic lines pre-plumbed for augers and breakers',
        'Rubber crawler tracks protect paved jobsite surfaces',
        'ROPS/TOPS certified operator station with suspension seat'
      ],
      specTable: [
        ['Operating Weight', '3,520 kg (3.5 Ton)'],
        ['Engine', '24.8 HP Stage V Diesel'],
        ['Max Dig Depth', '3.15 Meters'],
        ['Bucket Capacity', '0.12 m³ Heavy Trench'],
        ['Swing Design', 'Zero Tail Swing'],
        ['Warranty', '3-Year Powertrain Coverage']
      ]
    }
  ];
  window.allProducts = allProducts;

  // Map IDs cleanly for backwards links
  function getProductById(id) {
    return allProducts.find(p => p.id === id) || allProducts[0];
  }
  window.getProductById = getProductById;

  // ==========================================================================
  // 3. Persistent Shopping Cart Engine
  // ==========================================================================
  const CART_KEY = 'tamstar_construction_cart_v2';

  function loadCartItems() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [
      { id: 'p1', title: '20V Max Brushless 1/2" High-Torque Impact Wrench Kit', price: 935.00, qty: 1, image: 'assets/images/pro-impact-wrench.png' },
      { id: 'h1', title: 'Corded Chipping Hammer – Orange & Black with Auxiliary Handle', price: 289.00, qty: 1, image: 'assets/images/demo-hammer-1.png' }
    ];
  }

  function saveCartItems() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(window.cartState.items));
    } catch {}
  }

  window.cartState = {
    items: loadCartItems()
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

    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (vatEl) vatEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);

    if (list) {
      if (window.cartState.items.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:44px 12px; color:#94a3b8; font-weight:600;">Your equipment cart is empty.</div>`;
        return;
      }

      list.innerHTML = window.cartState.items.map(item => `
        <div style="display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid #f1f5f9;">
          <a href="product.html?id=${item.id}" style="flex-shrink:0;">
            <img src="${item.image}" alt="${item.title}" style="width:56px; height:56px; object-fit:contain; border-radius:8px; background:#f8fafc; padding:4px; border:1px solid #e2e8f0;">
          </a>
          <div style="flex:1; min-width:0;">
            <a href="product.html?id=${item.id}" style="display:block; font-size:13px; font-weight:700; color:#0f172a; margin-bottom:4px; line-height:1.3; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.title}</a>
            <div style="font-size:13px; font-weight:800; color:#d97706;">${formatPrice(item.price)}</div>
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

  window.addToCart = function(productId, qtyToAdd = 1) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const qty = Math.max(1, parseInt(qtyToAdd, 10) || 1);
    const existing = window.cartState.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      window.cartState.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        qty,
        image: product.image
      });
    }

    saveCartItems();
    showToast(`Added ${qty > 1 ? qty + '× ' : ''}${product.title.split('–')[0].trim()}`);
    window.openCart();
  };

  window.updateCartQty = function(id, delta) {
    const item = window.cartState.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      window.cartState.items = window.cartState.items.filter(i => i.id !== id);
    }
    saveCartItems();
    window.renderCart();
  };

  window.submitDemoCheckout = function() {
    if (window.cartState.items.length === 0) {
      showToast('Add equipment items before checking out.', 'info');
      return;
    }
    window.closeCart();
    showToast('Order #IF-88412 confirmed for same-day warehouse dispatch!');
    window.cartState.items = [];
    saveCartItems();
    window.renderCart();
  };

  // ==========================================================================
  // 4. Hero Banner Slider
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
    heroSlides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));

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

  window.nextHeroSlide = function() { window.goToHeroSlide(currentHeroSlide + 1); };
  window.prevHeroSlide = function() { window.goToHeroSlide(currentHeroSlide - 1); };

  function startHeroAutoplay() {
    stopHeroAutoplay();
    if (totalHeroSlides > 0) {
      heroTimer = setInterval(window.nextHeroSlide, 5500);
    }
  }

  function stopHeroAutoplay() {
    if (heroTimer) clearInterval(heroTimer);
  }

  const heroViewport = document.getElementById('heroSliderViewport');
  if (heroViewport) {
    heroViewport.addEventListener('mouseenter', stopHeroAutoplay);
    heroViewport.addEventListener('mouseleave', startHeroAutoplay);

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
    startHeroAutoplay();
  }

  // ==========================================================================
  // 5. Shop By Category Auto-Sliding Circular Carousel (Task 1)
  // ==========================================================================
  const catTrack = document.getElementById('circularCatTrack');
  const catWrap = document.getElementById('catCarouselWrapper');
  let catAutoTimer = null;

  function stepCategoryCarousel(direction = 1) {
    if (!catTrack) return;
    const maxScroll = catTrack.scrollWidth - catTrack.clientWidth;
    if (maxScroll <= 4) return;

    const cardWidth = (catTrack.querySelector('.circle-cat-card')?.offsetWidth || 140) + (window.innerWidth <= 768 ? 14 : 26);

    if (direction > 0) {
      if (catTrack.scrollLeft >= maxScroll - 8) {
        catTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        catTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    } else {
      if (catTrack.scrollLeft <= 8) {
        catTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        catTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  }

  window.scrollCatCarousel = function(direction) {
    stepCategoryCarousel(direction);
    startCatAutoplay();
  };

  function startCatAutoplay() {
    stopCatAutoplay();
    if (catTrack) {
      catAutoTimer = setInterval(() => stepCategoryCarousel(1), 2200);
    }
  }

  function stopCatAutoplay() {
    if (catAutoTimer) clearInterval(catAutoTimer);
  }

  if (catWrap && catTrack) {
    catWrap.addEventListener('mouseenter', stopCatAutoplay);
    catWrap.addEventListener('mouseleave', startCatAutoplay);
    catTrack.addEventListener('touchstart', stopCatAutoplay, { passive: true });
    catTrack.addEventListener('touchend', () => setTimeout(startCatAutoplay, 2000), { passive: true });
    startCatAutoplay();
  }

  window.selectCategory = function(catKey, catName, cardEl) {
    document.querySelectorAll('.circle-cat-card').forEach(c => c.classList.remove('active'));
    if (cardEl) cardEl.classList.add('active');

    const megaMenu = document.getElementById('categoriesMegaMenu');
    if (megaMenu) megaMenu.classList.remove('active');

    showToast(`Browsing ${catName}`);

    const seriesMap = {
      'drilling': 'drilling',
      'demolition': 'demolition',
      'grinding': 'grinding',
      'earthmoving': 'construction',
      'generators': 'construction'
    };

    const targetSeries = seriesMap[catKey];
    if (catKey === 'demolition') {
      document.getElementById('demolitionSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (targetSeries) {
      const tabBtn = document.querySelector(`.showcase-tab-btn[data-series="${targetSeries}"]`);
      window.switchShowcaseSeries(targetSeries, tabBtn);
      document.getElementById('showcaseSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ==========================================================================
  // 6. Section 4: "BUILT TO BREAK THROUGH" (Clickable -> product.html)
  // ==========================================================================
  let currentDemoPage = 1;
  const demoPage1Ids = ['h1', 'h2', 'h3', 'h4'];
  const demoPage2Ids = ['h5', 'h6', 'h7', 'p8'];

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
        <article class="product-card-clean" onclick="window.location.href='product.html?id=${p.id}'">
          <div class="product-thumb-box">
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
            <a href="product.html?id=${p.id}" class="product-title-text" onclick="event.stopPropagation()">${p.title}</a>
            <div class="product-price-val">${formatPrice(p.price)}</div>
          </div>
        </article>
      `).join('');
    }
  };

  window.nextDemoPage = function() { window.setDemoPage(currentDemoPage === 1 ? 2 : 1); };
  window.prevDemoPage = function() { window.setDemoPage(currentDemoPage === 2 ? 1 : 2); };

  // ==========================================================================
  // 7. Section 5: Interactive Showcase Tabs (Reference Image 3 Format)
  // ==========================================================================
  const showcaseSeriesData = {
    'drilling': {
      heading: 'POWER AND ACCURACY IN EVERY TURN',
      desc: 'Delivers consistent power and precision for efficient drilling.',
      img: 'assets/images/hero-drill.png',
      align: 'right',
      ctaHref: 'product.html?id=h5',
      ctaText: 'SHOP NOW'
    },
    'demolition': {
      heading: 'UNSTOPPABLE DEMOLITION FORCE',
      desc: 'Engineered for reinforced concrete breaking with 45-Joule anti-vibration impact.',
      img: 'assets/images/hero-demolition.png',
      align: 'left',
      ctaHref: 'product.html?id=h6',
      ctaText: 'SHOP BREAKERS'
    },
    'grinding': {
      heading: 'POWERFUL GRINDING. PERFECT RESULTS',
      desc: 'Tackle tough materials with reliable power, smooth control, and precision for every grind and finish.',
      img: 'assets/images/hero-grinder.png',
      align: 'right',
      ctaHref: 'product.html?id=h7',
      ctaText: 'SHOP NOW'
    },
    'construction': {
      heading: 'BUILT FOR HEAVY SITE ENDURANCE',
      desc: 'Jobsite mixers, silent generators, and compact hydraulic earthmoving machinery.',
      img: 'assets/images/hero-construction.png',
      align: 'left',
      ctaHref: 'product.html?id=c3',
      ctaText: 'EXPLORE FLEET'
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
    const headingEl = document.getElementById('sec5Heading');
    const descEl = document.getElementById('sec5Desc');
    const ctaBtn = document.getElementById('sec5CtaBtn');

    if (bgImg) {
      bgImg.style.opacity = '0.55';
      setTimeout(() => {
        bgImg.src = data.img;
        bgImg.alt = data.heading;
        bgImg.style.opacity = '1';
      }, 140);
    }

    if (overlay) overlay.classList.toggle('align-left', data.align === 'left');
    if (copyCol) copyCol.classList.toggle('align-left', data.align === 'left');

    if (headingEl) headingEl.textContent = data.heading;
    if (descEl) descEl.textContent = data.desc;
    if (ctaBtn) {
      ctaBtn.textContent = data.ctaText;
      ctaBtn.setAttribute('href', data.ctaHref);
    }
  };

  // ==========================================================================
  // 8. Task 3: Featured Product Listing Grid & Shared Card Renderer
  // ==========================================================================
  const featuredCatalogIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];

  function renderSampleStyleCard(p) {
    return `
      <article class="catalog-sample-card" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="catalog-card-media">
          <div class="catalog-badges-stack">
            ${p.badge ? `<span class="badge-amber-pill">${p.badge}</span>` : ''}
            ${p.badgeSecondary ? `<span class="badge-green-pill">${p.badgeSecondary}</span>` : ''}
          </div>
          <img src="${p.image}" alt="${p.title}">
        </div>
        <div class="catalog-card-body">
          <div class="catalog-card-brand">${p.brand}</div>
          <a href="product.html?id=${p.id}" class="catalog-card-title" onclick="event.stopPropagation()">${p.title}</a>
          <div class="catalog-card-sku">${p.sku}</div>
          <div class="catalog-card-stock"><span class="stock-dot"></span> ${p.stock} in stock</div>
          <div class="catalog-card-footer">
            <span class="catalog-card-price">${formatPrice(p.price)}</span>
            <button type="button"
              class="catalog-plus-btn"
              onclick="event.stopPropagation(); window.addToCart('${p.id}')"
              aria-label="Add ${p.title} to cart">+</button>
          </div>
        </div>
      </article>
    `;
  }

  window.filterCatalog = function(filterKey, btnEl) {
    if (btnEl) {
      document.querySelectorAll('#catalogFilterPills .filter-pill').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }

    const grid = document.getElementById('catalogProductsGrid');
    if (!grid) return;

    let items = featuredCatalogIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
    if (filterKey && filterKey !== 'all') {
      items = items.filter(p => p.category === filterKey);
    }
    grid.innerHTML = items.map(renderSampleStyleCard).join('');
  };

  // ==========================================================================
  // 9. Product Detail Page (product.html) Renderer
  // ==========================================================================
  function initProductDetailPage() {
    const pdpContainer = document.getElementById('pdpContainer');
    if (!pdpContainer) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'p1';
    const product = getProductById(id);

    document.title = `${product.title} | TAMSTAR`;
    const bcCat = document.getElementById('pdpBreadcrumbCat');
    const bcTitle = document.getElementById('pdpBreadcrumbTitle');
    if (bcCat) bcCat.textContent = product.categoryLabel || 'Equipment';
    if (bcTitle) bcTitle.textContent = product.title;

    pdpContainer.innerHTML = `
      <div class="pdp-gallery-col">
        <div class="pdp-stage-box">
          <div class="catalog-badges-stack">
            ${product.badge ? `<span class="badge-amber-pill">${product.badge}</span>` : ''}
            ${product.badgeSecondary ? `<span class="badge-green-pill">${product.badgeSecondary}</span>` : ''}
          </div>
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="pdp-trust-row">
          <div class="pdp-trust-pill"><span>⚡</span> Same-Day Dispatch</div>
          <div class="pdp-trust-pill"><span>🛡️</span> 3-Year Pro Warranty</div>
          <div class="pdp-trust-pill"><span>↩️</span> 30-Day Returns</div>
        </div>
      </div>

      <div class="pdp-info-col">
        <div class="pdp-brand-row">
          <span class="pdp-brand-tag">${product.brand}</span>
          <span class="pdp-sku-tag">SKU: ${product.sku}</span>
        </div>

        <h1 class="pdp-title">${product.title}</h1>

        <div class="pdp-rating-row">
          <span class="pdp-stars">★★★★★</span>
          <span class="pdp-rating-score">${product.rating}</span>
          <span class="pdp-reviews-count">(${product.reviews} verified contractor reviews)</span>
          <span class="pdp-stock-pill"><span class="stock-dot"></span> ${product.stock} in stock</span>
        </div>

        <div class="pdp-price-card">
          <div class="pdp-price-main">${formatPrice(product.price)}</div>
          <div class="pdp-shipping-note">Free express jobsite shipping on orders over SAR 500 · Ships within 24 hours</div>
        </div>

        <p class="pdp-desc">${product.description}</p>

        <ul class="pdp-highlights-list">
          ${(product.highlights || []).map(h => `<li><span class="highlight-check">✓</span><span>${h}</span></li>`).join('')}
        </ul>

        <div class="pdp-purchase-row">
          <div class="pdp-qty-stepper">
            <button type="button" onclick="window.changePdpQty(-1)" aria-label="Decrease quantity">&minus;</button>
            <input type="number" id="pdpQtyInput" value="1" min="1" max="99" aria-label="Quantity">
            <button type="button" onclick="window.changePdpQty(1)" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="pdp-add-btn" onclick="window.addToCart('${product.id}', document.getElementById('pdpQtyInput').value)">
            Add to Cart
          </button>
          <button type="button" class="pdp-buy-btn" onclick="window.addToCart('${product.id}', document.getElementById('pdpQtyInput').value)">
            Buy Now
          </button>
        </div>
      </div>
    `;

    const specsSection = document.getElementById('pdpSpecsSection');
    if (specsSection && product.specTable) {
      specsSection.innerHTML = `
        <div class="pdp-specs-card">
          <h2 class="pdp-specs-heading">Technical Specifications</h2>
          <div class="pdp-specs-table">
            ${product.specTable.map(([label, val]) => `
              <div class="pdp-spec-row">
                <div class="pdp-spec-label">${label}</div>
                <div class="pdp-spec-val">${val}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const relatedGrid = document.getElementById('pdpRelatedGrid');
    if (relatedGrid) {
      const related = allProducts.filter(p => p.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = related.map(renderSampleStyleCard).join('');
    }
  }

  window.changePdpQty = function(delta) {
    const input = document.getElementById('pdpQtyInput');
    if (!input) return;
    const next = Math.max(1, Math.min(99, (parseInt(input.value, 10) || 1) + delta));
    input.value = next;
  };

  // ==========================================================================
  // 10. Header Controls, Mega Menu, Search, Mobile Drawer & Modals
  // ==========================================================================
  window.toggleMegaMenu = function(e) {
    if (e) e.stopPropagation();
    document.getElementById('categoriesMegaMenu')?.classList.toggle('active');
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
    const desktopDropdown = document.getElementById('searchResultsDropdown');
    const mobileDropdown = document.getElementById('mobileSearchResults');
    const q = (query || '').trim().toLowerCase();

    if (q.length < 2) {
      if (desktopDropdown) desktopDropdown.classList.remove('active');
      if (mobileDropdown) mobileDropdown.innerHTML = '';
      return;
    }

    const matches = allProducts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q)
    ).slice(0, 5);

    const html = matches.length === 0
      ? `<div style="padding:14px; text-align:center; color:#64748b; font-size:13px;">No equipment found matching "${query}". Try "impact", "laser", or "hammer".</div>`
      : matches.map(m => `
          <a href="product.html?id=${m.id}" class="search-result-row">
            <img src="${m.image}" alt="${m.title}">
            <div style="flex:1; min-width:0;">
              <div style="font-size:13px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.title}</div>
              <div style="font-size:11.5px; color:#64748b;">${m.brand} · SKU: ${m.sku}</div>
            </div>
            <div style="font-size:13px; font-weight:800; color:#d97706;">${formatPrice(m.price)}</div>
          </a>
        `).join('');

    if (desktopDropdown) {
      desktopDropdown.innerHTML = html;
      desktopDropdown.classList.add('active');
    }
    if (mobileDropdown) {
      mobileDropdown.innerHTML = `<div class="mobile-search-results-card">${html}</div>`;
    }
  };

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      document.getElementById('desktopSearchInput')?.focus();
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

  window.submitQuickOrder = function(e) {
    e.preventDefault();
    const sku = document.getElementById('quickSkuInput')?.value?.trim() || 'IF-IW-900';
    const match = allProducts.find(p => p.sku.toLowerCase() === sku.toLowerCase()) || allProducts[0];
    window.closeAllModals();
    window.addToCart(match.id);
  };

  window.submitAuthForm = function(e) {
    e.preventDefault();
    window.closeAllModals();
    showToast('Signed in to TAMSTAR Account');
  };

  window.submitProClubForm = function(e) {
    e.preventDefault();
    const emailEl = document.getElementById('proClubEmail');
    if (emailEl) emailEl.value = '';
    showToast('Welcome to TAMSTAR Pro Club! Check your email for your 10% code.');
  };

  const topBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (topBtn) {
      topBtn.style.display = window.scrollY > 360 ? 'grid' : 'none';
    }
  });

  window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize Pages
  window.renderCart();
  if (document.getElementById('demoCardsGrid')) {
    window.setDemoPage(1);
  }
  if (document.getElementById('sec5Heading')) {
    window.switchShowcaseSeries('drilling', document.querySelector('.showcase-tab-btn[data-series="drilling"]'));
  }
  if (document.getElementById('catalogProductsGrid')) {
    window.filterCatalog('all');
  }
  initProductDetailPage();
});
