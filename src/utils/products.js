const PRODUCT_SECTION_TOKENS = new Set(['productcategories', 'products', 'productslist']);

const normalizeSectionToken = (value = '') =>
  String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');

export const PRODUCT_CATEGORIES = [
  'Used Japanese Car Engines',
  'Used Japanese Truck Engines',
  'Used Cabin',
  'Used Half Cuts',
  'Used Transmissions',
  'Used Spare Parts',
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
    title: 'Toyota 1NZ-FE Engine',
    slug: 'toyota-1nz-fe-engine',
    category: 'Used Japanese Car Engines',
    image: '/images/products/engine.jpg',
    description: 'Reliable 1.5L petrol engine widely used in Toyota Vios and Yaris.',
    content:
      'The Toyota 1NZ-FE is a 1.5-liter inline-four petrol engine renowned for its durability and fuel efficiency. It powers popular models including the Toyota Vios and Yaris.\n\nEach engine is compression-tested, leak-checked, and inspected by our trained technicians prior to shipment. We stock both low-mileage and fully rebuilt units to suit different budgets.\n\nSpecifications:\n- Displacement: 1.5L (1497cc)\n- Fuel: Petrol\n- Transmission: Automatic/Manual compatible\n- Condition: Used, inspected & tested',
  },
  {
    title: 'Honda L15A Engine',
    slug: 'honda-l15a-engine',
    category: 'Used Japanese Car Engines',
    image: '/images/products/engine.jpg',
    description: 'Efficient 1.5L VTEC engine for Honda City, Jazz, and Fit.',
    content:
      'The Honda L15A is a 1.5-liter SOHC VTEC engine celebrated for its smooth power delivery and outstanding fuel economy. It is a direct fit for the Honda City, Jazz, and Fit.\n\nWe source these engines from Japan and perform full quality inspections including compression, oil pressure, and leak tests before dispatch.\n\nSpecifications:\n- Displacement: 1.5L\n- Fuel: Petrol (VTEC)\n- Condition: Used, inspected & tested',
  },
  {
    title: 'Isuzu 4HK1 Truck Engine',
    slug: 'isuzu-4hk1-truck-engine',
    category: 'Used Japanese Truck Engines',
    image: '/images/products/truck-engine.jpg',
    description: 'Heavy-duty 5.2L diesel engine for Isuzu trucks and commercial vehicles.',
    content:
      'The Isuzu 4HK1 is a 5.2-liter turbocharged diesel engine built for commercial and heavy-duty applications. It delivers reliable torque and long service life for fleet operators.\n\nEach unit is dyno-tested and comes with a limited warranty. We carry both standard and intercooler variants.\n\nSpecifications:\n- Displacement: 5.2L\n- Fuel: Diesel\n- Application: Isuzu trucks & commercial vehicles\n- Condition: Used, tested',
  },
  {
    title: 'Hino J08E Truck Engine',
    slug: 'hino-j08e-truck-engine',
    category: 'Used Japanese Truck Engines',
    image: '/images/products/truck-engine.jpg',
    description: 'Proven 7.7L diesel engine powering Hino trucks across Malaysia.',
    content:
      'The Hino J08E is a 7.7-liter diesel engine known for its exceptional reliability and fuel efficiency in Hino medium-duty trucks.\n\nWe inspect and prepare each engine for quick installation, reducing downtime for your fleet.\n\nSpecifications:\n- Displacement: 7.7L\n- Fuel: Diesel\n- Application: Hino medium-duty trucks\n- Condition: Used, tested',
  },
  {
    title: 'Toyota Hilux Cabin',
    slug: 'toyota-hilux-cabin',
    category: 'Used Cabin',
    image: '/images/products/cabin.jpg',
    description: 'Complete cabin assembly for Toyota Hilux with panels and interior.',
    content:
      'This is a complete Toyota Hilux cabin assembly including dashboard, seats, door panels, and wiring harness. Ideal for accident repairs and restorations.\n\nAll cabins are stored in covered warehouses and inspected for rust and structural integrity before sale.\n\nIncludes:\n- Dashboard & instrument cluster\n- Seats & door panels\n- Steering column\n- Wiring harness',
  },
  {
    title: 'Isuzu D-Max Cabin',
    slug: 'isuzu-d-max-cabin',
    category: 'Used Cabin',
    image: '/images/products/cabin.jpg',
    description: 'Complete Isuzu D-Max cabin with all interior components.',
    content:
      'Complete Isuzu D-Max cabin assembly featuring original panels, seats, and electrical components. Perfect for restoration projects.\n\nOur cabins are carefully dismantled and stored to prevent damage and weathering.\n\nIncludes:\n- Full body panels\n- Complete interior\n- Electrical system',
  },
  {
    title: 'Toyota Vios Half Cut',
    slug: 'toyota-vios-half-cut',
    category: 'Used Half Cuts',
    image: '/images/products/halfcut.jpg',
    description: 'Front half cut with engine, transmission, and suspension.',
    content:
      'Toyota Vios front half cut containing the complete engine, transmission, suspension, brakes, and wiring harness — everything you need for an engine conversion.\n\nEach half cut is compression-tested and includes a start-up video upon request.\n\nIncludes:\n- Engine & transmission\n- Suspension & brakes\n- ECU & wiring harness\n- Dashboard',
  },
  {
    title: 'Honda Civic FD Half Cut',
    slug: 'honda-civic-fd-half-cut',
    category: 'Used Half Cuts',
    image: '/images/products/halfcut.jpg',
    description: 'Complete front cut for Honda Civic FD with engine and drivetrain.',
    content:
      'Honda Civic FD front half cut featuring the complete R18 engine, automatic transmission, and all supporting components.\n\nIdeal for K-swap and restoration enthusiasts.\n\nIncludes:\n- R18 engine\n- Automatic transmission\n- Front suspension\n- Wiring & ECU',
  },
  {
    title: 'Toyota Aisin Automatic Transmission',
    slug: 'toyota-aisin-automatic-transmission',
    category: 'Used Transmissions',
    image: '/images/products/transmission.jpg',
    description: 'Smooth-shifting 4-speed automatic transmission for Toyota models.',
    content:
      'Genuine Toyota Aisin 4-speed automatic transmission, tested for smooth shifting and leak-free operation.\n\nEach transmission is dyno-tested and flushed before dispatch.\n\nCompatibility:\n- Toyota Vios, Altis, and Camry\n- Condition: Used, tested',
  },
  {
    title: 'Honda CVT Transmission',
    slug: 'honda-cvt-transmission',
    category: 'Used Transmissions',
    image: '/images/products/transmission.jpg',
    description: 'Fuel-efficient CVT transmission for Honda City and Jazz.',
    content:
      'Honda continuously variable transmission (CVT) offering smooth acceleration and excellent fuel economy.\n\nTested for belt wear and fluid condition before sale.\n\nCompatibility:\n- Honda City, Jazz, and Fit\n- Condition: Used, tested',
  },
  {
    title: 'Alternator (Various Models)',
    slug: 'alternator-various-models',
    category: 'Used Spare Parts',
    image: '/images/products/spareparts.jpg',
    description: 'High-output alternators for popular Japanese car and truck models.',
    content:
      'Wide selection of used alternators for Japanese vehicles. Each unit is bench-tested to ensure proper charging output.\n\nAvailable for:\n- Toyota, Honda, Nissan, Mitsubishi\n- Isuzu, Hino (trucks)\n- Condition: Used, tested',
  },
  {
    title: 'Starter Motor (Various Models)',
    slug: 'starter-motor-various-models',
    category: 'Used Spare Parts',
    image: '/images/products/spareparts.jpg',
    description: 'Reliable starter motors for Japanese petrol and diesel engines.',
    content:
      'Quality used starter motors for Japanese petrol and diesel vehicles. Bench-tested for reliable cold starts.\n\nAvailable for:\n- Toyota, Honda, Nissan\n- Isuzu, Hino (trucks)\n- Condition: Used, tested',
  },
];

export const extractProductsFromSections = (sections = []) => {
  if (!Array.isArray(sections)) return DEFAULT_PRODUCTS;

  for (const section of sections) {
    const key = normalizeSectionToken(section.sectionKey);
    const type = normalizeSectionToken(section.sectionType);
    if (!PRODUCT_SECTION_TOKENS.has(key) && !PRODUCT_SECTION_TOKENS.has(type)) continue;

    const raw = section.content?.content?.products;
    if (!Array.isArray(raw) || raw.length === 0) continue;

    return raw.map((item, index) => {
      if (typeof item === 'string') {
        const fallback = DEFAULT_PRODUCTS[index % DEFAULT_PRODUCTS.length];
        return {
          ...fallback,
          title: item,
          slug: slugifyProductTitle(item) || fallback.slug,
          content: fallback.content || '',
        };
      }
      const fallback = DEFAULT_PRODUCTS[index % DEFAULT_PRODUCTS.length];
      const resolvedTitle = item.title || fallback.title;
      const sanitizedItemSlug = slugifyProductTitle(item.slug || '');
      return {
        title: resolvedTitle,
        slug: sanitizedItemSlug || slugifyProductTitle(resolvedTitle) || fallback.slug,
        category: item.category || fallback.category || '',
        image: item.image || fallback.image,
        description: item.description || '',
        content: item.content || fallback.content || '',
      };
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
