const PRODUCT_SECTION_TOKENS = new Set(['productcategories', 'products', 'productslist']);

const normalizeSectionToken = (value = '') =>
  String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');

export const PRODUCT_CATEGORIES = [
  'Used Korean Car Engines',
  'Used Korean Truck Engines',
  'Used Korean Whole Truck',
  'Used Korean Machineries',
  'Used Korean Half Cuts',
  'Used Korean Transmission',
  'Used Korean Auto Parts',
];

export const slugifyProductTitle = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const DEFAULT_PRODUCTS = [
  {
    title: 'Hyundai G4FC Engine',
    slug: 'hyundai-g4fc-engine',
    category: 'Used Korean Car Engines',
    image: '/images/products/engine.jpg',
    description: 'Reliable 1.6L petrol engine widely used in Hyundai Elantra and i30.',
    content:
      'The Hyundai G4FC is a 1.6-liter inline-four petrol engine renowned for its durability and fuel efficiency. It powers popular Hyundai models including the Elantra and i30.\n\nEach engine is compression-tested, leak-checked, and inspected by our trained technicians prior to shipment. We stock both low-mileage and fully rebuilt units.\n\nSpecifications:\n- Displacement: 1.6L\n- Fuel: Petrol\n- Condition: Used, inspected & tested',
  },
  {
    title: 'Kia G4FA Engine',
    slug: 'kia-g4fa-engine',
    category: 'Used Korean Car Engines',
    image: '/images/products/engine.jpg',
    description: 'Efficient 1.4L petrol engine for Kia Rio and Hyundai Accent.',
    content:
      'The Kia G4FA is a 1.4-liter petrol engine celebrated for its smooth power delivery and outstanding fuel economy. It is a direct fit for the Kia Rio and Hyundai Accent.\n\nWe source these engines from Korea and perform full quality inspections including compression, oil pressure, and leak tests before dispatch.\n\nSpecifications:\n- Displacement: 1.4L\n- Fuel: Petrol\n- Condition: Used, inspected & tested',
  },
  {
    title: 'Hyundai Truck Engine',
    slug: 'hyundai-truck-engine',
    category: 'Used Korean Truck Engines',
    image: '/images/products/truck-engine.jpg',
    description: 'Heavy-duty diesel engine for Hyundai trucks and commercial vehicles.',
    content:
      'A heavy-duty turbocharged diesel engine built for Hyundai commercial trucks. It delivers reliable torque and long service life for fleet operators.\n\nEach unit is dyno-tested and comes with a limited warranty.\n\nSpecifications:\n- Fuel: Diesel\n- Application: Hyundai trucks & commercial vehicles\n- Condition: Used, tested',
  },
  {
    title: 'Daewoo Truck Engine',
    slug: 'daewoo-truck-engine',
    category: 'Used Korean Truck Engines',
    image: '/images/products/truck-engine.jpg',
    description: 'Proven diesel engine powering Daewoo trucks across the region.',
    content:
      'A reliable diesel engine known for its exceptional durability and fuel efficiency in Daewoo medium-duty trucks.\n\nWe inspect and prepare each engine for quick installation, reducing downtime for your fleet.\n\nSpecifications:\n- Fuel: Diesel\n- Application: Daewoo medium-duty trucks\n- Condition: Used, tested',
  },
  {
    title: 'Hyundai Truck Cabin',
    slug: 'hyundai-truck-cabin',
    category: 'Used Korean Whole Truck',
    image: '/images/products/cabin.jpg',
    description: 'Complete cabin assembly for Hyundai trucks with panels and interior.',
    content:
      'This is a complete Hyundai truck cabin assembly including dashboard, seats, door panels, and wiring harness. Ideal for accident repairs and restorations.\n\nAll cabins are stored in covered warehouses and inspected for rust and structural integrity before sale.\n\nIncludes:\n- Dashboard & instrument cluster\n- Seats & door panels\n- Steering column\n- Wiring harness',
  },
  {
    title: 'Kia Bongo Whole Truck',
    slug: 'kia-bongo-whole-truck',
    category: 'Used Korean Whole Truck',
    image: '/images/products/cabin.jpg',
    description: 'Complete Kia Bongo whole truck with all interior and body components.',
    content:
      'Complete Kia Bongo whole truck featuring original body panels, seats, and electrical components. Perfect for restoration projects.\n\nOur vehicles are carefully dismantled and stored to prevent damage and weathering.\n\nIncludes:\n- Full body panels\n- Complete interior\n- Electrical system',
  },
  {
    title: 'Hyundai Half Cut',
    slug: 'hyundai-half-cut',
    category: 'Used Korean Half Cuts',
    image: '/images/products/halfcut.jpg',
    description: 'Front half cut with engine, transmission, and suspension.',
    content:
      'Hyundai front half cut containing the complete engine, transmission, suspension, brakes, and wiring harness — everything you need for an engine conversion.\n\nEach half cut is compression-tested and includes a start-up video upon request.\n\nIncludes:\n- Engine & transmission\n- Suspension & brakes\n- ECU & wiring harness\n- Dashboard',
  },
  {
    title: 'Kia Half Cut',
    slug: 'kia-half-cut',
    category: 'Used Korean Half Cuts',
    image: '/images/products/halfcut.jpg',
    description: 'Complete front cut for Kia models with engine and drivetrain.',
    content:
      'Kia front half cut featuring the complete engine, automatic transmission, and all supporting components.\n\nIdeal for engine swaps and restoration enthusiasts.\n\nIncludes:\n- Engine\n- Automatic transmission\n- Front suspension\n- Wiring & ECU',
  },
  {
    title: 'Hyundai Automatic Transmission',
    slug: 'hyundai-automatic-transmission',
    category: 'Used Korean Transmission',
    image: '/images/products/transmission.jpg',
    description: 'Smooth-shifting automatic transmission for Hyundai models.',
    content:
      'Genuine Hyundai automatic transmission, tested for smooth shifting and leak-free operation.\n\nEach transmission is dyno-tested and flushed before dispatch.\n\nCompatibility:\n- Hyundai Elantra, Sonata, and Tucson\n- Condition: Used, tested',
  },
  {
    title: 'Kia CVT Transmission',
    slug: 'kia-cvt-transmission',
    category: 'Used Korean Transmission',
    image: '/images/products/transmission.jpg',
    description: 'Fuel-efficient CVT transmission for Kia and Hyundai models.',
    content:
      'Kia continuously variable transmission (CVT) offering smooth acceleration and excellent fuel economy.\n\nTested for belt wear and fluid condition before sale.\n\nCompatibility:\n- Kia Rio, Cerato, and Hyundai Accent\n- Condition: Used, tested',
  },
  {
    title: 'Alternator (Various Models)',
    slug: 'alternator-various-models',
    category: 'Used Korean Auto Parts',
    image: '/images/products/spareparts.jpg',
    description: 'High-output alternators for popular Korean car and truck models.',
    content:
      'Wide selection of used alternators for Korean vehicles. Each unit is bench-tested to ensure proper charging output.\n\nAvailable for:\n- Hyundai, Kia, Daewoo, SsangYong\n- Hyundai, Daewoo (trucks)\n- Condition: Used, tested',
  },
  {
    title: 'Starter Motor (Various Models)',
    slug: 'starter-motor-various-models',
    category: 'Used Korean Auto Parts',
    image: '/images/products/spareparts.jpg',
    description: 'Reliable starter motors for Korean petrol and diesel engines.',
    content:
      'Quality used starter motors for Korean petrol and diesel vehicles. Bench-tested for reliable cold starts.\n\nAvailable for:\n- Hyundai, Kia, Daewoo\n- Hyundai, Daewoo (trucks)\n- Condition: Used, tested',
  },
];

export const extractProductsFromSections = (sections = []) => {
  if (!Array.isArray(sections)) return DEFAULT_PRODUCTS;

  for (const section of sections) {
    const key = normalizeSectionToken(section.sectionKey);
    const type = normalizeSectionToken(section.sectionType);
    if (!PRODUCT_SECTION_TOKENS.has(key) && !PRODUCT_SECTION_TOKENS.has(type)) continue;

    const content = section.content?.content || {};
    const plainRaw = Array.isArray(content.products) ? content.products : null;
    const enRaw = content.en && Array.isArray(content.en.products) ? content.en.products : null;
    const esRaw = content.es && Array.isArray(content.es.products) ? content.es.products : null;

    const raw = plainRaw || enRaw || esRaw;
    if (!raw || raw.length === 0) continue;

    return raw.map((item, index) => {
      const fallback = DEFAULT_PRODUCTS[index % DEFAULT_PRODUCTS.length];
      const enItem = enRaw ? enRaw[index] : null;
      const esItem = esRaw ? esRaw[index] : null;

      const toObject = (value) => (typeof value === 'string' ? { title: value } : value || {});
      const itemObj = toObject(item);
      const enObj = enItem ? toObject(enItem) : null;
      const esObj = esItem ? toObject(esItem) : null;

      // The slug is a canonical, language-independent identifier. It is always
      // derived from the English title (or an explicit slug) so URLs stay the
      // same across languages; only the display text is localized.
      const canonicalTitle = (enObj && enObj.title) || itemObj.title || fallback.title;
      const resolvedTitle = itemObj.title || canonicalTitle || fallback.title;

      const slug =
        slugifyProductTitle(itemObj.slug || '') ||
        (enObj && slugifyProductTitle(enObj.slug || '')) ||
        slugifyProductTitle(canonicalTitle) ||
        fallback.slug;

      const product = {
        title: resolvedTitle,
        slug,
        category: itemObj.category || (enObj && enObj.category) || fallback.category || '',
        image: itemObj.image || (enObj && enObj.image) || fallback.image,
        description: itemObj.description || (enObj && enObj.description) || '',
        content: itemObj.content || (enObj && enObj.content) || fallback.content || '',
      };

      product.localized = {
        en: {
          title: (enObj && enObj.title) || canonicalTitle,
          category: (enObj && enObj.category) || product.category,
          image: (enObj && enObj.image) || product.image,
          description: (enObj && enObj.description) || product.description,
          content: (enObj && enObj.content) || product.content,
        },
        es: esObj
          ? {
              title: esObj.title || canonicalTitle,
              category: esObj.category || product.category,
              image: esObj.image || product.image,
              description: esObj.description || product.description,
              content: esObj.content || product.content,
            }
          : null,
      };

      return product;
    });
  }

  return DEFAULT_PRODUCTS;
};

export const findProductBySlug = (sections = [], slug = '') => {
  const products = extractProductsFromSections(sections);
  return products.find((p) => p.slug === slug) || null;
};

export const resolveProductHref = (product) => {
  if (product.link && product.link !== '#' && product.link !== '/products') {
    return product.link;
  }
  const slug = slugifyProductTitle(product.slug || '') || slugifyProductTitle(product.title) || 'product';
  return `/products/${slug}`;
};

export const localizeProduct = (product = {}, locale = 'en') => {
  if (!product || typeof product !== 'object' || locale === 'en') return product;
  const variant = product.localized && product.localized[locale];
  if (!variant) return product;
  return { ...product, ...variant };
};

export const resolveLocalizedProducts = (content = {}, locale = 'en') => {
  const canonicalSource = content?.en || content?.es || content || {};
  const displaySource = (locale && content && content[locale]) || canonicalSource;

  const canonicalProducts = Array.isArray(canonicalSource?.products)
    ? canonicalSource.products
    : [];
  const displayProducts = Array.isArray(displaySource?.products)
    ? displaySource.products
    : canonicalProducts;

  return displayProducts.map((item, index) => {
    const canonicalItem = canonicalProducts[index] || {};
    const canonicalTitle =
      typeof canonicalItem === 'string' ? canonicalItem : canonicalItem?.title;

    const slug =
      (item && typeof item === 'object' && item.slug) ||
      (canonicalItem && typeof canonicalItem === 'object' && canonicalItem.slug) ||
      slugifyProductTitle(canonicalTitle || '') ||
      slugifyProductTitle(typeof item === 'string' ? item : item?.title || '');

    if (typeof item === 'string') return { title: item, slug };
    return { ...item, slug: slug || '' };
  });
};
