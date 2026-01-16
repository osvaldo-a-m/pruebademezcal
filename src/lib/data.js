// Static data structure for Mezcal León de Guerrero
// This will be replaced with WordPress API calls in production

export const products = [
    {
        id: 1,
        slug: 'espadin-clasico',
        name: 'Espadín Clásico',
        category: 'Espadín',
        description: 'A bold, earthy expression of wild agave. Handcrafted using ancient methods, this mezcal delivers notes of smoke, citrus, and minerals.',
        price: 85.00,
        discountPrice: null,
        abv: '45% ABV',
        volume: '750ml',
        image: '/images/products/espadin-clasico.jpg',
        badge: 'Top Rated',
        inStock: true,
        stockCount: 24,
        tastingNotes: {
            nose: 'Tropical Fruit, Damp Earth',
            palate: 'Rose Petals, Smoked Cedar',
            finish: 'Sweet, Long & Warm'
        },
        productionDetails: {
            masterDistiller: 'Don Leoncio',
            agave: 'Espadín (Agave angustifolia)',
            region: 'Santa María del Cerro, Oaxaca',
            process: 'Traditional earthen pit roasting, tahona crushed, wild fermentation, copper pot distillation'
        },
        gallery: [
            '/images/products/espadin-clasico.jpg',
            '/images/products/espadin-clasico-2.jpg',
            '/images/products/espadin-clasico-3.jpg'
        ]
    },
    {
        id: 2,
        slug: 'tobala-silvestre',
        name: 'Tobalá Silvestre',
        category: 'Tobalá',
        description: 'A rare, wild agave varietal harvested from high altitudes. Known for its earthy, floral complexity and sweet, fruity nose. Distinctly elegant.',
        price: 185.00,
        discountPrice: 165.00,
        abv: '48% ABV',
        volume: '750ml',
        image: '/images/products/tobala-silvestre.jpg',
        badge: 'Best Seller',
        inStock: true,
        stockCount: 12,
        tastingNotes: {
            nose: 'Tropical Fruit, Honey',
            palate: 'Floral Notes, Citrus Zest',
            finish: 'Smooth, Lingering Sweetness'
        },
        productionDetails: {
            masterDistiller: 'Don Leoncio',
            agave: 'Tobalá (Agave potatorum)',
            region: 'High altitude forests, Oaxaca',
            process: 'Wild harvested, earthen pit roasted, hand crushed, wild fermentation, copper pot distillation'
        },
        gallery: [
            '/images/products/tobala-silvestre.jpg',
            '/images/products/tobala-silvestre-2.jpg'
        ]
    },
    {
        id: 3,
        slug: 'tepeztate-anejo',
        name: 'Tepeztate Añejo',
        category: 'Tepeztate',
        description: 'An ancient, wild agave varietal. Mineral-rich with notes of green peppers, herbs, and a distinctive earthy character. Limited production.',
        price: 195.00,
        discountPrice: null,
        abv: '47% ABV',
        volume: '750ml',
        image: '/images/products/tepeztate-anejo.jpg',
        badge: 'Limited',
        inStock: true,
        stockCount: 6,
        tastingNotes: {
            nose: 'Herbs, Green Pepper',
            palate: 'Mineral, Earthy Spice',
            finish: 'Complex, Dry Finish'
        },
        productionDetails: {
            masterDistiller: 'Don Leoncio',
            agave: 'Tepeztate (Agave marmorata)',
            region: 'Wild mountain slopes, Oaxaca',
            process: 'Wild harvested (25+ years), traditional roasting, tahona crushed, wild fermentation'
        },
        gallery: [
            '/images/products/tepeztate-anejo.jpg'
        ]
    },
    {
        id: 4,
        slug: 'ensamble-especial',
        name: 'Ensamble Especial',
        category: 'Ensamble',
        description: 'A masterful blend of Espadín, Tobalá, and Cuishe. Balanced complexity with layers of smoke, fruit, and spice. Our signature expression.',
        price: 120.00,
        discountPrice: null,
        abv: '46% ABV',
        volume: '750ml',
        image: '/images/products/ensamble-especial.jpg',
        badge: 'New',
        inStock: true,
        stockCount: 18,
        tastingNotes: {
            nose: 'Smoke, Tropical Fruit',
            palate: 'Balanced Complexity, Spice',
            finish: 'Long, Harmonious'
        },
        productionDetails: {
            masterDistiller: 'Don Leoncio',
            agave: 'Espadín, Tobalá, Cuishe blend',
            region: 'Santa María del Cerro, Oaxaca',
            process: 'Traditional methods, blended post-distillation for perfect harmony'
        },
        gallery: [
            '/images/products/ensamble-especial.jpg'
        ]
    },
    {
        id: 5,
        slug: 'madre-dulce',
        name: 'Madre Dulce',
        category: 'Espadín',
        description: 'An approachable, slightly sweet mezcal. Perfect for newcomers to the spirit. Notes of vanilla, caramel, and gentle smoke.',
        price: 70.00,
        discountPrice: 60.00,
        abv: '42% ABV',
        volume: '750ml',
        image: '/images/products/madre-dulce.jpg',
        badge: null,
        inStock: true,
        stockCount: 30,
        tastingNotes: {
            nose: 'Vanilla, Caramel',
            palate: 'Gentle Smoke, Sweet Agave',
            finish: 'Smooth, Approachable'
        },
        productionDetails: {
            masterDistiller: 'Don Leoncio',
            agave: 'Espadín (Agave angustifolia)',
            region: 'Santa María del Cerro, Oaxaca',
            process: 'Traditional roasting, shorter fermentation for sweeter profile'
        },
        gallery: [
            '/images/products/madre-dulce.jpg'
        ]
    },
    {
        id: 6,
        slug: 'jabali-premium',
        name: 'Jabalí Premium',
        category: 'Jabalí',
        description: 'The rarest of the rare. Agave Jabalí is notoriously difficult to distill. Rich, oily texture with intense flavors of tropical fruit and herbs.',
        price: 250.00,
        discountPrice: null,
        abv: '49% ABV',
        volume: '750ml',
        image: '/images/products/jabali-premium.jpg',
        badge: 'Limited',
        inStock: false,
        stockCount: 0,
        tastingNotes: {
            nose: 'Intense Tropical Fruit',
            palate: 'Oily, Herbal, Complex',
            finish: 'Bold, Unforgettable'
        },
        productionDetails: {
            masterDistiller: 'Don Leoncio',
            agave: 'Jabalí (Agave convallis)',
            region: 'Remote highlands, Oaxaca',
            process: 'Extremely difficult distillation, wild harvested, limited batches'
        },
        gallery: [
            '/images/products/jabali-premium.jpg'
        ]
    }
];

export const stockists = [
    {
        id: 1,
        name: 'Mezcalería Las Flores',
        type: 'bar',
        address: '403 W 44th St, New York, NY',
        city: 'New York',
        state: 'NY',
        zipCode: '10036',
        phone: '(212) 555-7890',
        hours: 'Open till 2 AM',
        coordinates: { lat: 40.7589, lng: -73.9896 }
    },
    {
        id: 2,
        name: 'The Agave Library',
        type: 'retail',
        address: '1284 Lexington Ave, New York, NY',
        city: 'New York',
        state: 'NY',
        zipCode: '10028',
        phone: '(212) 555-4321',
        hours: 'Closes 10 PM',
        coordinates: { lat: 40.7829, lng: -73.9547 }
    },
    {
        id: 3,
        name: 'Casa de Montecristo',
        type: 'bar',
        address: '224 Mulberry St, New York, NY',
        city: 'New York',
        state: 'NY',
        zipCode: '10012',
        phone: '(212) 555-9876',
        hours: 'Closed',
        coordinates: { lat: 40.7223, lng: -73.9958 }
    },
    {
        id: 4,
        name: 'Astor Wines & Spirits',
        type: 'retail',
        address: '399 Lafayette St, New York, NY',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        phone: '(212) 555-6543',
        hours: 'Open till 9 PM',
        coordinates: { lat: 40.7295, lng: -73.9918 }
    }
];

export const siteConfig = {
    name: 'León de Guerrero',
    tagline: 'Spirit of the Warrior',
    description: 'Authentic artisanal Mezcal from the heart of Oaxaca. Dedicated to tradition and sustainability.',
    email: 'hola@leondeguerrero.com',
    phone: '+52 951 123 4567',
    address: 'León de Guerrero Spirits, Oaxaca de Juárez, Mexico',
    social: {
        instagram: 'https://instagram.com/leondeguerrero',
        linkedin: 'https://linkedin.com/company/leondeguerrero',
        facebook: 'https://facebook.com/leondeguerrero'
    },
    navigation: [
        { name: 'Our Mezcal', href: '/shop' },
        { name: 'Our Story', href: '/story' },
        { name: 'Shop', href: '/shop' },
        { name: 'Stockists', href: '/stockists' },
        { name: 'Contact', href: '/stockists#contact' }
    ]
};

export const categories = [
    { id: 'all', name: 'All Mezcal', slug: 'all' },
    { id: 'espadin', name: 'Espadín', slug: 'espadin' },
    { id: 'tobala', name: 'Tobalá', slug: 'tobala' },
    { id: 'ensamble', name: 'Ensamble', slug: 'ensamble' },
    { id: 'tepeztate', name: 'Tepeztate', slug: 'tepeztate' },
    { id: 'jabali', name: 'Jabalí', slug: 'jabali' }
];
