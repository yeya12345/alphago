// Global state for the application
const appState = {
    loggedIn: false,
    currentScreen: 'Splash', // Initial screen
    selectedRestaurantId: null,
    cartItems: [],
    restaurants: [], // Will be initialized with data
    recentSearches: ['Pizza', 'Sushi', 'Paella'],
    categories: [
        'Italiana', 'Asiática', 'Mediterránea', 'Americana', 'Vegetariana', 'Postres', 'Bebidas'
    ]
};

// Simulated restaurant data
const restaurantsData = [
    {
        id: 'rest1',
        name: 'La Cocina de Elena',
        image: 'https://placehold.co/600x400/FF5733/FFFFFF?text=La+Cocina+de+Elena',
        rating: 4.8,
        deliveryTime: '25-35 min',
        deliveryFee: '2.50€',
        isFeatured: true,
        promotions: '15% de descuento en tu primer pedido',
        menu: [
            {
                category: 'Platos Principales',
                items: [
                    { id: 'dish1', name: 'Paella Valenciana', description: 'Arroz con mariscos y pollo.', price: 15.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Paella+Valenciana' },
                    { id: 'dish2', name: 'Fideuá de Gandía', description: 'Fideos con mariscos y alioli.', price: 14.50, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Fideua+de+Gandia' },
                    { id: 'dish3', name: 'Arroz a Banda', description: 'Arroz caldoso con pescado.', price: 13.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Arroz+a+Banda' },
                ],
            },
            {
                category: 'Entrantes',
                items: [
                    { id: 'dish4', name: 'Patatas Bravas', description: 'Patatas con salsa picante.', price: 6.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Patatas+Bravas' },
                    { id: 'dish5', name: 'Calamares a la Romana', description: 'Anillas de calamar rebozadas.', price: 9.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Calamares+a+la+Romana' },
                ],
            },
            {
                category: 'Postres',
                items: [
                    { id: 'dish6', name: 'Tarta de Queso', description: 'Tarta casera con mermelada de frutos rojos.', price: 5.50, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Tarta+de+Queso' },
                    { id: 'dish7', name: 'Flan de Huevo', description: 'Flan casero con caramelo.', price: 4.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Flan+de+Huevo' },
                ],
            },
        ],
    },
    {
        id: 'rest2',
        name: 'Pizzería Napolitana',
        image: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Pizzeria+Napolitana',
        rating: 4.5,
        deliveryTime: '30-40 min',
        deliveryFee: '3.00€',
        isFeatured: false,
        promotions: 'Pizza familiar por 15€',
        menu: [
            {
                category: 'Pizzas',
                items: [
                    { id: 'dish8', name: 'Pizza Margherita', description: 'Tomate, mozzarella, albahaca.', price: 10.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Pizza+Margherita' },
                    { id: 'dish9', name: 'Pizza Prosciutto', description: 'Tomate, mozzarella, jamón.', price: 12.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Pizza+Prosciutto' },
                ],
            },
        ],
    },
    {
        id: 'rest3',
        name: 'Sushi Zen',
        image: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Sushi+Zen',
        rating: 4.9,
        deliveryTime: '35-45 min',
        deliveryFee: '4.00€',
        isFeatured: true,
        promotions: null,
        menu: [
            {
                category: 'Nigiri',
                items: [
                    { id: 'dish10', name: 'Nigiri Salmón', description: 'Arroz y salmón fresco.', price: 3.50, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Nigiri+Salmon' },
                ],
            },
        ],
    },
    {
        id: 'rest4',
        name: 'Hamburguesería Clásica',
        image: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Hamburgueseria+Clasica',
        rating: 4.2,
        deliveryTime: '20-30 min',
        deliveryFee: '2.00€',
        isFeatured: false,
        promotions: 'Menú completo por 10€',
        menu: [
            {
                category: 'Hamburguesas',
                items: [
                    { id: 'dish11', name: 'Hamburguesa Clásica', description: 'Carne, lechuga, tomate, queso.', price: 9.00, image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Hamburguesa+Clasica' },
                ],
            },
        ],
    },
];

// Initialize restaurants with isFavorite property
appState.restaurants = restaurantsData.map(r => ({ ...r, isFavorite: false }));

// Helper function to create SVG icons
const createIcon = (name, size = 24, color = 'currentColor', className = '') => {
    const icons = {
        Home: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>`,
        Search: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>`,
        ShoppingCart: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>`,
        User: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>`,
        MapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
            <circle cx="12" cy="9" r="3"></circle>
        </svg>`,
        Star: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>`,
        ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>`,
        Plus: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>`,
        Minus: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>`,
        X: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`,
        Bike: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <path d="M1 14l4 2 2-2 3 2 4-2 2 2 3-2 3 2V6l-3-2-3 2-2-2-4 2-3-2-2 2-4-2z"></path>
            <circle cx="6" cy="18" r="2"></circle>
            <circle cx="18" cy="18" r="2"></circle>
            <path d="M10 14h4"></path>
            <path d="M12 14v-4"></path>
        </svg>`,
        Clock: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`,
        Package: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">
            <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.52a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.11-1.79V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.79 0z"></path>
            <polyline points="2.32 6.16 12 11 21.68 6.16"></polyline>
            <line x1="12" y1="22.78" x2="12" y2="11"></line>
            <line x1="7" y1="18.33" x2="7" y2="13.5"></line>
            <line x1="17" y1="18.33" x2="17" y2="13.5"></line>
        </svg>`,
    };
    const span = document.createElement('span'); // Use span to hold SVG
    span.innerHTML = icons[name] || '';
    return span.firstChild; // Return the SVG element
};

// Function to update the main content area
const updateUI = () => {
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = ''; // Clear previous content

    let contentDiv = document.createElement('div');
    contentDiv.className = 'max-w-md mx-auto bg-white shadow-lg min-h-screen relative'; // Re-apply main container styling
    appRoot.appendChild(contentDiv);

    if (!appState.loggedIn) {
        renderSplashScreen(contentDiv);
    } else {
        switch (appState.currentScreen) {
            case 'Home':
                renderHomeScreen(contentDiv);
                break;
            case 'Buscar':
                renderSearchScreen(contentDiv);
                break;
            case 'Pedidos':
                renderOrdersScreen(contentDiv);
                break;
            case 'Cuenta':
                renderAccountScreen(contentDiv);
                break;
            case 'Detalle Restaurante':
                renderRestaurantDetailScreen(contentDiv);
                break;
            case 'Mi Pedido':
                renderMyOrderScreen(contentDiv);
                break;
            default:
                contentDiv.innerHTML = `
                    <div class="p-4 text-center text-red-500">
                        Pantalla no encontrada.
                        <button id="backToHomeBtn" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Volver a Inicio
                        </button>
                    </div>
                `;
                document.getElementById('backToHomeBtn').addEventListener('click', () => {
                    appState.currentScreen = 'Home';
                    updateUI();
                });
                break;
        }
        renderTabBar(appRoot); // Render tab bar after screen content
    }
};

// --- Screen Rendering Functions ---

// Splash/Login Screen
const renderSplashScreen = (container) => {
    let showLogin = true; // Internal state for this screen

    const splashDiv = document.createElement('div');
    splashDiv.className = 'min-h-screen flex flex-col items-center justify-center bg-white p-4';
    splashDiv.innerHTML = `
        <h1 class="text-6xl font-extrabold text-green-600 mb-8 animate-bounce">AlphaGo</h1>
        <p class="text-xl text-gray-700 mb-12 text-center">Tu comida favorita, entregada.</p>

        <div class="w-full max-w-md bg-gray-50 p-8 rounded-2xl shadow-xl">
            <div class="flex justify-center mb-6">
                <button id="loginTabBtn" class="px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${showLogin ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700'}">
                    Iniciar Sesión
                </button>
                <button id="registerTabBtn" class="px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${!showLogin ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700'} ml-4">
                    Registrarse
                </button>
            </div>

            <form id="authForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="tu@email.com"
                        required
                    />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="********"
                        required
                    />
                </div>
                <button
                    type="submit"
                    id="authSubmitBtn"
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    ${showLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
            </form>
        </div>
    `;
    container.appendChild(splashDiv);

    const loginTabBtn = document.getElementById('loginTabBtn');
    const registerTabBtn = document.getElementById('registerTabBtn');
    const authForm = document.getElementById('authForm');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const updateAuthUI = () => {
        loginTabBtn.className = `px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${showLogin ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`;
        registerTabBtn.className = `px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${!showLogin ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700'} ml-4`;
        authSubmitBtn.textContent = showLogin ? 'Iniciar Sesión' : 'Registrarse';
    };

    loginTabBtn.addEventListener('click', () => {
        showLogin = true;
        updateAuthUI();
    });

    registerTabBtn.addEventListener('click', () => {
        showLogin = false;
        updateAuthUI();
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (emailInput.value && passwordInput.value) {
            appState.loggedIn = true;
            appState.currentScreen = 'Home';
            updateUI();
        } else {
            // Replaced alert() with console.error as per instructions
            console.error('Por favor, introduce email y contraseña.');
            // In a real app, you'd show a custom modal or inline error message
        }
    });
};


// Home Screen
const renderHomeScreen = (container) => {
    const homeDiv = document.createElement('div');
    homeDiv.className = 'p-4 pb-20 bg-white min-h-screen';

    // Header
    homeDiv.innerHTML += `
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center text-gray-700">
                ${createIcon('MapPin', 20, 'text-green-600').outerHTML}
                <span class="font-semibold text-lg">Valencia</span>
                ${createIcon('ChevronRight', 20, 'text-gray-500').outerHTML}
            </div>
            <button class="p-2 rounded-full bg-gray-100">
                ${createIcon('User', 20).outerHTML}
            </button>
        </div>
    `;

    // Featured Restaurants (Horizontal Scroll)
    homeDiv.innerHTML += `<h2 class="text-2xl font-bold mb-4 text-gray-800">Destacados</h2>`;
    const featuredSection = document.createElement('div');
    featuredSection.className = 'flex overflow-x-auto space-x-4 pb-4 scrollbar-hide';
    appState.restaurants.filter(r => r.isFeatured).forEach(restaurant => {
        const restCard = document.createElement('div');
        restCard.className = 'flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105';
        restCard.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="w-full h-32 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/FF5733/FFFFFF?text=Restaurante';"/>
            <div class="p-3">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-semibold text-lg text-gray-900">${restaurant.name}</h3>
                    <button class="favorite-btn p-1 rounded-full bg-white shadow-sm -mt-2" data-id="${restaurant.id}">
                        ${createIcon('Star', 20, restaurant.isFavorite ? '#FFD700' : '#E0E0E0').outerHTML}
                    </button>
                </div>
                <div class="flex items-center text-sm text-gray-600 mb-2">
                    ${createIcon('Star', 16, '#FFD700').outerHTML}
                    <span>${restaurant.rating}</span>
                    <span class="mx-2">•</span>
                    <span>${restaurant.deliveryTime}</span>
                </div>
                ${restaurant.promotions ? `<p class="text-sm text-red-600 font-medium">${restaurant.promotions}</p>` : ''}
            </div>
        `;
        restCard.addEventListener('click', () => {
            appState.selectedRestaurantId = restaurant.id;
            appState.currentScreen = 'Detalle Restaurante';
            updateUI();
        });
        restCard.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
        });
        featuredSection.appendChild(restCard);
    });
    homeDiv.appendChild(featuredSection);

    // All Restaurants (Vertical List)
    homeDiv.innerHTML += `<h2 class="text-2xl font-bold my-4 text-gray-800">Todos los Restaurantes</h2>`;
    const allRestaurantsSection = document.createElement('div');
    allRestaurantsSection.className = 'space-y-4';
    appState.restaurants.filter(r => !r.isFeatured).forEach(restaurant => {
        const restCard = document.createElement('div');
        restCard.className = 'flex bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105';
        restCard.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="w-32 h-32 object-cover rounded-l-xl" onerror="this.onerror=null;this.src='https://placehold.co/600x400/FF5733/FFFFFF?text=Restaurante';"/>
            <div class="p-4 flex-1">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-semibold text-lg text-gray-900">${restaurant.name}</h3>
                    <button class="favorite-btn p-1 rounded-full bg-white shadow-sm" data-id="${restaurant.id}">
                        ${createIcon('Star', 20, restaurant.isFavorite ? '#FFD700' : '#E0E0E0').outerHTML}
                    </button>
                </div>
                <div class="flex items-center text-sm text-gray-600 mb-2">
                    ${createIcon('Star', 16, '#FFD700').outerHTML}
                    <span>${restaurant.rating}</span>
                    <span class="mx-2">•</span>
                    <span>${restaurant.deliveryTime}</span>
                </div>
                ${restaurant.promotions ? `<p class="text-sm text-red-600 font-medium">${restaurant.promotions}</p>` : ''}
            </div>
        `;
        restCard.addEventListener('click', () => {
            appState.selectedRestaurantId = restaurant.id;
            appState.currentScreen = 'Detalle Restaurante';
            updateUI();
        });
        restCard.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
        });
        allRestaurantsSection.appendChild(restCard);
    });
    homeDiv.appendChild(allRestaurantsSection);

    container.appendChild(homeDiv);
};

// Search Screen
const renderSearchScreen = (container) => {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'p-4 pb-20 bg-white min-h-screen';
    searchDiv.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Buscar</h2>
        <div class="relative mb-6">
            <input type="text" id="searchTermInput" placeholder="Buscar restaurantes o platos..."
                   class="w-full p-3 pl-10 pr-4 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
            ${createIcon('Search', 20, 'text-gray-400', 'absolute left-3 top-1/2 -translate-y-1/2').outerHTML}
        </div>
        <div id="searchResultsContainer"></div>
        <div id="recentSearchesContainer">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Búsquedas Recientes</h3>
            <div id="recentSearchesButtons" class="flex flex-wrap gap-2 mb-8"></div>
        </div>
        <div id="categoriesContainer">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Categorías de Comida</h3>
            <div id="categoryButtons" class="grid grid-cols-2 gap-4"></div>
        </div>
    `;
    container.appendChild(searchDiv);

    const searchTermInput = document.getElementById('searchTermInput');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const recentSearchesButtons = document.getElementById('recentSearchesButtons');
    const categoryButtons = document.getElementById('categoryButtons');

    const updateSearchResults = () => {
        const searchTerm = searchTermInput.value.toLowerCase();
        searchResultsContainer.innerHTML = ''; // Clear previous results

        if (searchTerm.length > 0) {
            const filtered = appState.restaurants.filter(
                (rest) =>
                    rest.name.toLowerCase().includes(searchTerm) ||
                    rest.menu.some((cat) =>
                        cat.items.some((item) => item.name.toLowerCase().includes(searchTerm))
                    )
            );

            const resultsHeader = document.createElement('h3');
            resultsHeader.className = 'text-xl font-semibold mb-4 text-gray-800';
            resultsHeader.textContent = 'Resultados de búsqueda';
            searchResultsContainer.appendChild(resultsHeader);

            if (filtered.length > 0) {
                const resultsDiv = document.createElement('div');
                resultsDiv.className = 'space-y-4';
                filtered.forEach(restaurant => {
                    const restCard = document.createElement('div');
                    restCard.className = 'flex bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105';
                    restCard.innerHTML = `
                        <img src="${restaurant.image}" alt="${restaurant.name}" class="w-24 h-24 object-cover rounded-l-xl" onerror="this.onerror=null;this.src='https://placehold.co/600x400/FF5733/FFFFFF?text=Restaurante';"/>
                        <div class="p-3 flex-1">
                            <h3 class="font-semibold text-lg text-gray-900">${restaurant.name}</h3>
                            <div class="flex items-center text-sm text-gray-600">
                                ${createIcon('Star', 16, '#FFD700').outerHTML}
                                <span>${restaurant.rating}</span>
                                <span class="mx-2">•</span>
                                <span>${restaurant.deliveryTime}</span>
                            </div>
                        </div>
                    `;
                    restCard.addEventListener('click', () => {
                        appState.selectedRestaurantId = restaurant.id;
                        appState.currentScreen = 'Detalle Restaurante';
                        updateUI();
                    });
                    resultsDiv.appendChild(restCard);
                });
                searchResultsContainer.appendChild(resultsDiv);
            } else {
                searchResultsContainer.innerHTML += `<p class="text-gray-500 text-center mt-8">No se encontraron resultados.</p>`;
            }
            document.getElementById('recentSearchesContainer').style.display = 'none';
            document.getElementById('categoriesContainer').style.display = 'none';
        } else {
            document.getElementById('recentSearchesContainer').style.display = 'block';
            document.getElementById('categoriesContainer').style.display = 'block';
            renderRecentSearches();
            renderCategories();
        }
    };

    const renderRecentSearches = () => {
        recentSearchesButtons.innerHTML = '';
        appState.recentSearches.forEach((query, index) => {
            const button = document.createElement('button');
            button.className = 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm transition-colors duration-200 hover:bg-gray-200';
            button.textContent = query;
            button.addEventListener('click', () => {
                searchTermInput.value = query;
                updateSearchResults();
            });
            recentSearchesButtons.appendChild(button);
        });
    };

    const renderCategories = () => {
        categoryButtons.innerHTML = '';
        appState.categories.forEach((category, index) => {
            const button = document.createElement('button');
            button.className = 'flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md aspect-square transition-transform duration-200 hover:scale-105';
            button.innerHTML = `
                <img src="https://placehold.co/80x80/FF5733/FFFFFF?text=${category.split(' ')[0]}" alt="${category}" class="w-16 h-16 mb-2 rounded-lg" />
                <span class="font-medium text-gray-800 text-center">${category}</span>
            `;
            button.addEventListener('click', () => {
                searchTermInput.value = category;
                updateSearchResults();
            });
            categoryButtons.appendChild(button);
        });
    };

    searchTermInput.addEventListener('input', updateSearchResults);
    renderRecentSearches();
    renderCategories(); // Initial render of categories
};

// Restaurant Detail Screen
const renderRestaurantDetailScreen = (container) => {
    const restaurant = appState.restaurants.find(r => r.id === appState.selectedRestaurantId);

    if (!restaurant) {
        container.innerHTML = `
            <div class="p-4 text-center text-gray-600">
                Restaurante no encontrado.
                <button id="backToHomeBtn" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
                    Volver a Inicio
                </button>
            </div>
        `;
        document.getElementById('backToHomeBtn').addEventListener('click', () => {
            appState.currentScreen = 'Home';
            updateUI();
        });
        return;
    }

    const detailDiv = document.createElement('div');
    detailDiv.className = 'pb-20 bg-white min-h-screen';

    // Header Image
    detailDiv.innerHTML = `
        <div class="relative h-64 w-full overflow-hidden">
            <img src="${restaurant.image}" alt="${restaurant.name}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/800x400/FF5733/FFFFFF?text=Restaurante';"/>
            <button id="closeRestaurantDetailBtn" class="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md">
                ${createIcon('X', 24).outerHTML}
            </button>
        </div>
        <div class="p-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">${restaurant.name}</h1>
            <div class="flex items-center text-gray-600 text-base mb-4">
                ${createIcon('Star', 18, '#FFD700').outerHTML}
                <span>${restaurant.rating}</span>
                <span class="mx-2">•</span>
                <span>${restaurant.deliveryTime}</span>
                <span class="mx-2">•</span>
                <span>${restaurant.deliveryFee} de envío</span>
            </div>
        </div>
        <div id="categories-nav" class="bg-white border-b border-gray-200 z-40 transition-all duration-300">
            <div id="categoryButtonsContainer" class="flex overflow-x-auto space-x-4 px-4 py-3 scrollbar-hide"></div>
        </div>
        <div id="menuListContainer" class="p-4 space-y-6"></div>
    `;
    container.appendChild(detailDiv);

    document.getElementById('closeRestaurantDetailBtn').addEventListener('click', () => {
        appState.currentScreen = 'Home';
        updateUI();
    });

    const categoryButtonsContainer = document.getElementById('categoryButtonsContainer');
    const menuListContainer = document.getElementById('menuListContainer');
    let activeCategory = restaurant.menu[0]?.category || '';

    const renderCategories = () => {
        categoryButtonsContainer.innerHTML = '';
        restaurant.menu.forEach(category => {
            const button = document.createElement('button');
            button.className = `flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === category.category
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`;
            button.textContent = category.category;
            button.addEventListener('click', () => {
                activeCategory = category.category;
                renderCategories(); // Re-render categories to update active state
                // Scroll to the category section
                const targetElement = document.getElementById(`category-${category.category.replace(/\s/g, '-')}`);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - (document.getElementById('categories-nav').offsetHeight + 10), // Adjust for sticky header
                        behavior: 'smooth'
                    });
                }
            });
            categoryButtonsContainer.appendChild(button);
        });
    };

    const renderMenuList = () => {
        menuListContainer.innerHTML = '';
        restaurant.menu.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.id = `category-${category.category.replace(/\s/g, '-')}`;
            categoryDiv.innerHTML = `
                <h2 class="text-2xl font-bold text-gray-800 mb-4">${category.category}</h2>
                <div class="space-y-4" id="dishes-${category.category.replace(/\s/g, '-')}-container"></div>
            `;
            menuListContainer.appendChild(categoryDiv);

            const dishesContainer = document.getElementById(`dishes-${category.category.replace(/\s/g, '-')}-container`);
            category.items.forEach(dish => {
                const dishCard = document.createElement('div');
                dishCard.className = 'flex items-center bg-white rounded-xl shadow-sm overflow-hidden p-3';
                const currentQuantity = appState.cartItems.filter(item => item.id === dish.id).length;
                dishCard.innerHTML = `
                    <img src="${dish.image}" alt="${dish.name}" class="w-24 h-24 object-cover rounded-lg mr-4" onerror="this.onerror=null;this.src='https://placehold.co/400x300/FF5733/FFFFFF?text=Plato';"/>
                    <div class="flex-1">
                        <h3 class="font-semibold text-lg text-gray-900">${dish.name}</h3>
                        <p class="text-sm text-gray-600 mb-2">${dish.description}</p>
                        <p class="font-bold text-lg text-gray-800">${dish.price.toFixed(2)}€</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        ${currentQuantity > 0 ? `
                            <button class="minus-btn p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200" data-dish-id="${dish.id}">
                                ${createIcon('Minus', 20).outerHTML}
                            </button>
                            <span class="font-semibold text-lg">${currentQuantity}</span>
                        ` : ''}
                        <button class="plus-btn p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200" data-dish-id="${dish.id}">
                            ${createIcon('Plus', 20).outerHTML}
                        </button>
                    </div>
                `;
                dishesContainer.appendChild(dishCard);

                // Add event listeners for plus/minus buttons
                const plusBtn = dishCard.querySelector('.plus-btn');
                if (plusBtn) {
                    plusBtn.addEventListener('click', () => {
                        addToCart(dish, 1);
                        renderMenuList(); // Re-render to update quantities
                    });
                }
                const minusBtn = dishCard.querySelector('.minus-btn');
                if (minusBtn) {
                    minusBtn.addEventListener('click', () => {
                        addToCart(dish, -1);
                        renderMenuList(); // Re-render to update quantities
                    });
                }
            });
        });
    };

    // Sticky header logic
    let isSticky = false;
    const categoriesNav = document.getElementById('categories-nav');
    const handleScroll = () => {
        if (categoriesNav) {
            const rect = categoriesNav.getBoundingClientRect();
            const newSticky = rect.top <= 0;
            if (newSticky !== isSticky) {
                isSticky = newSticky;
                if (isSticky) {
                    categoriesNav.classList.add('sticky', 'top-0', 'shadow-md');
                } else {
                    categoriesNav.classList.remove('sticky', 'top-0', 'shadow-md');
                }
            }
        }
    };
    window.addEventListener('scroll', handleScroll);

    renderCategories();
    renderMenuList();
    renderFloatingCart(container); // Render floating cart for this screen
};

// My Order (Cart) Screen
const renderMyOrderScreen = (container) => {
    const myOrderDiv = document.createElement('div');
    myOrderDiv.className = 'p-4 pb-20 bg-white min-h-screen';
    myOrderDiv.innerHTML = `<h1 class="text-3xl font-bold text-gray-900 mb-6">Mi Pedido</h1>`;
    container.appendChild(myOrderDiv);

    const subtotal = appState.cartItems.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 3.00; // Example delivery fee
    const total = subtotal + deliveryFee;

    if (appState.cartItems.length === 0) {
        myOrderDiv.innerHTML += `
            <div class="text-center py-10">
                <p class="text-gray-600 text-lg mb-4">Tu carrito está vacío.</p>
                <button id="exploreRestaurantsBtn" class="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-colors duration-200">
                    Explorar Restaurantes
                </button>
            </div>
        `;
        document.getElementById('exploreRestaurantsBtn').addEventListener('click', () => {
            appState.currentScreen = 'Home';
            updateUI();
        });
    } else {
        // List of Cart Items
        const uniqueCartItems = Array.from(new Set(appState.cartItems.map(item => item.id)))
            .map(id => appState.cartItems.find(item => item.id === id));

        const cartItemsList = document.createElement('div');
        cartItemsList.className = 'space-y-4 mb-6';
        uniqueCartItems.forEach(item => {
            const itemCount = appState.cartItems.filter(cartItem => cartItem.id === item.id).length;
            const itemCard = document.createElement('div');
            itemCard.className = 'flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm';
            itemCard.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4" onerror="this.onerror=null;this.src='https://placehold.co/400x300/FF5733/FFFFFF?text=Plato';"/>
                    <div>
                        <h3 class="font-semibold text-lg text-gray-900">${item.name}</h3>
                        <p class="text-sm text-gray-600">${item.price.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="minus-btn p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200" data-dish-id="${item.id}">
                        ${createIcon('Minus', 18).outerHTML}
                    </button>
                    <span class="font-semibold text-base">${itemCount}</span>
                    <button class="plus-btn p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200" data-dish-id="${item.id}">
                        ${createIcon('Plus', 18).outerHTML}
                    </button>
                </div>
            `;
            cartItemsList.appendChild(itemCard);

            // Add event listeners for plus/minus buttons
            itemCard.querySelector('.plus-btn').addEventListener('click', () => {
                addToCart(item, 1);
                updateUI(); // Re-render the screen to update quantities
            });
            itemCard.querySelector('.minus-btn').addEventListener('click', () => {
                addToCart(item, -1);
                updateUI(); // Re-render the screen to update quantities
            });
        });
        myOrderDiv.appendChild(cartItemsList);

        // Order Notes
        const orderNotesDiv = document.createElement('div');
        orderNotesDiv.className = 'mb-6';
        orderNotesDiv.innerHTML = `
            <label for="orderNotes" class="block text-gray-700 font-semibold mb-2">
                Notas para el restaurante:
            </label>
            <textarea
                id="orderNotes"
                class="w-full p-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Ej. Sin cebolla, extra picante..."
            >${appState.orderNotes || ''}</textarea>
        `;
        myOrderDiv.appendChild(orderNotesDiv);
        document.getElementById('orderNotes').addEventListener('input', (e) => {
            appState.orderNotes = e.target.value;
        });

        // Order Summary
        myOrderDiv.innerHTML += `
            <div class="bg-gray-50 p-5 rounded-xl shadow-sm mb-6">
                <div class="flex justify-between items-center text-gray-700 mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}€</span>
                </div>
                <div class="flex justify-between items-center text-gray-700 mb-4">
                    <span>Tarifa de envío</span>
                    <span>${deliveryFee.toFixed(2)}€</span>
                </div>
                <div class="border-t border-gray-200 pt-4 flex justify-between items-center text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}€</span>
                </div>
            </div>
            <button id="payButton" class="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-700 transition-colors duration-200">
                Pagar ${total.toFixed(2)}€
            </button>
        `;
        document.getElementById('payButton').addEventListener('click', () => {
            appState.currentScreen = 'Pedidos';
            updateUI();
        });
    }
};

// Orders Screen
const renderOrdersScreen = (container) => {
    const ordersDiv = document.createElement('div');
    ordersDiv.className = 'p-4 pb-20 bg-white min-h-screen';
    ordersDiv.innerHTML = `<h1 class="text-3xl font-bold text-gray-900 mb-6">Mis Pedidos</h1>`;
    container.appendChild(ordersDiv);

    let activeTab = appState.activeOrderTab || 'En Curso'; // 'En Curso' or 'Historial'
    let deliveryProgress = appState.deliveryProgress || 0; // 0-100%
    let progressInterval = null;

    const getDeliveryStatus = (progress) => {
        if (progress < 30) return 'Preparando pedido';
        if (progress < 70) return 'Repartidor en camino';
        if (progress < 100) return 'Cerca de tu ubicación';
        return 'Entregado';
    };

    const currentOrder = {
        id: 'ORD12345',
        restaurant: 'La Cocina de Elena',
        items: ['Paella Valenciana', 'Patatas Bravas'],
        total: 23.50,
        eta: '10 min',
        deliveryStatus: getDeliveryStatus(deliveryProgress),
        driverLocation: { lat: 39.47, lng: -0.37 }, // Simulated coordinates for Valencia
    };

    const pastOrders = [
        {
            id: 'ORD0001',
            restaurant: 'Pizzería Napolitana',
            date: '2024-07-15',
            total: 18.00,
            items: ['Pizza Margherita', 'Coca-Cola'],
        },
        {
            id: 'ORD0002',
            restaurant: 'Sushi Zen',
            date: '2024-07-10',
            total: 35.50,
            items: ['Nigiri Salmón (x4)', 'Maki Aguacate (x2)'],
        },
    ];

    const renderTabContent = () => {
        const tabContentContainer = document.getElementById('tabContentContainer');
        tabContentContainer.innerHTML = ''; // Clear previous content

        if (activeTab === 'En Curso') {
            const currentOrderDiv = document.createElement('div');
            currentOrderDiv.innerHTML = `
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Pedido Actual (${currentOrder.id})</h2>
                <div class="bg-white rounded-xl shadow-md p-5">
                    <div class="flex items-center mb-4">
                        ${createIcon('Bike', 28, 'text-green-600', 'mr-3').outerHTML}
                        <div>
                            <p class="font-semibold text-lg text-gray-900">${getDeliveryStatus(deliveryProgress)}</p>
                            <p class="text-sm text-gray-600">Llega en ${currentOrder.eta}</p>
                        </div>
                    </div>
                    <div class="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                        <img src="https://placehold.co/400x200/E0E0E0/666666?text=Mapa+de+seguimiento+(${currentOrder.driverLocation.lat},${currentOrder.driverLocation.lng})" alt="Mapa de seguimiento" class="w-full h-full object-cover" />
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-green-500 rounded-full text-white shadow-lg">
                            ${createIcon('Bike', 24).outerHTML}
                        </div>
                        <div class="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-700 text-sm">
                            Tu ubicación
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div id="deliveryProgressBar" class="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" style="width: ${deliveryProgress}%"></div>
                    </div>
                    <div class="text-gray-700 text-sm mb-2">
                        <span class="font-semibold">Restaurante:</span> ${currentOrder.restaurant}
                    </div>
                    <div class="text-gray-700 text-sm mb-2">
                        <span class="font-semibold">Artículos:</span> ${currentOrder.items.join(', ')}
                    </div>
                    <div class="text-gray-700 text-sm">
                        <span class="font-semibold">Total:</span> ${currentOrder.total.toFixed(2)}€
                    </div>
                </div>
            `;
            tabContentContainer.appendChild(currentOrderDiv);

            // Start progress simulation
            if (progressInterval) clearInterval(progressInterval); // Clear any existing interval
            progressInterval = setInterval(() => {
                deliveryProgress += 1; // Simulate progress
                if (deliveryProgress > 100) {
                    deliveryProgress = 100;
                    clearInterval(progressInterval);
                }
                const progressBar = document.getElementById('deliveryProgressBar');
                if (progressBar) {
                    progressBar.style.width = `${deliveryProgress}%`;
                    // Update status text
                    const statusText = currentOrderDiv.querySelector('.font-semibold.text-lg');
                    if(statusText) statusText.textContent = getDeliveryStatus(deliveryProgress);
                }
            }, 200);
        } else {
            if (progressInterval) clearInterval(progressInterval); // Clear interval if switching tabs
            const historyDiv = document.createElement('div');
            historyDiv.innerHTML = `<h2 class="text-xl font-semibold mb-4 text-gray-800">Historial de Pedidos</h2>`;
            const historyList = document.createElement('div');
            historyList.className = 'space-y-4';
            pastOrders.forEach(order => {
                historyList.innerHTML += `
                    <div class="bg-white rounded-xl shadow-md p-5">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-semibold text-lg text-gray-900">Pedido ${order.id}</h3>
                            <span class="text-sm text-gray-500">${order.date}</span>
                        </div>
                        <p class="text-gray-700 mb-1">
                            <span class="font-semibold">Restaurante:</span> ${order.restaurant}
                        </p>
                        <p class="text-gray-700 mb-1">
                            <span class="font-semibold">Artículos:</span> ${order.items.join(', ')}
                        </p>
                        <p class="font-bold text-lg text-gray-900">Total: ${order.total.toFixed(2)}€</p>
                    </div>
                `;
            });
            historyDiv.appendChild(historyList);
            tabContentContainer.appendChild(historyDiv);
        }
        appState.activeOrderTab = activeTab; // Save active tab to state
        appState.deliveryProgress = deliveryProgress; // Save progress to state
    };

    ordersDiv.innerHTML += `
        <div class="flex bg-gray-100 rounded-full p-1 mb-6">
            <button id="currentOrdersTab" class="flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${activeTab === 'En Curso' ? 'bg-green-500 text-white shadow-md' : 'text-gray-700'}">
                En Curso
            </button>
            <button id="pastOrdersTab" class="flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${activeTab === 'Historial' ? 'bg-green-500 text-white shadow-md' : 'text-gray-700'}">
                Historial
            </button>
        </div>
        <div id="tabContentContainer"></div>
    `;

    document.getElementById('currentOrdersTab').addEventListener('click', () => {
        activeTab = 'En Curso';
        document.getElementById('currentOrdersTab').classList.add('bg-green-500', 'text-white', 'shadow-md');
        document.getElementById('currentOrdersTab').classList.remove('bg-gray-200', 'text-gray-700');
        document.getElementById('pastOrdersTab').classList.remove('bg-green-500', 'text-white', 'shadow-md');
        document.getElementById('pastOrdersTab').classList.add('bg-gray-200', 'text-gray-700');
        renderTabContent();
    });

    document.getElementById('pastOrdersTab').addEventListener('click', () => {
        activeTab = 'Historial';
        document.getElementById('pastOrdersTab').classList.add('bg-green-500', 'text-white', 'shadow-md');
        document.getElementById('pastOrdersTab').classList.remove('bg-gray-200', 'text-gray-700');
        document.getElementById('currentOrdersTab').classList.remove('bg-green-500', 'text-white', 'shadow-md');
        document.getElementById('currentOrdersTab').classList.add('bg-gray-200', 'text-gray-700');
        renderTabContent();
    });

    renderTabContent(); // Initial render of tab content
};


// Account Screen
const renderAccountScreen = (container) => {
    const accountDiv = document.createElement('div');
    accountDiv.className = 'p-4 pb-20 bg-white min-h-screen';
    accountDiv.innerHTML = `<h1 class="text-3xl font-bold text-gray-900 mb-6">Mi Cuenta</h1>`;
    container.appendChild(accountDiv);

    // User Info
    accountDiv.innerHTML += `
        <div class="bg-white rounded-xl shadow-md p-5 mb-6 text-center">
            <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                ${createIcon('User', 48, 'text-gray-500').outerHTML}
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Juan Pérez</h2>
            <p class="text-gray-600">juan.perez@example.com</p>
            <button class="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200">
                Editar Perfil
            </button>
        </div>
    `;

    // Delivery Addresses
    const addresses = appState.addresses || [
        { id: 'addr1', name: 'Casa', address: 'Calle Falsa 123, Valencia' },
        { id: 'addr2', name: 'Trabajo', address: 'Avenida Siempre Viva 45, Valencia' },
    ];
    let showAddAddressForm = false; // Internal state for this section

    const renderAddressesSection = () => {
        const addressesContainer = document.getElementById('addressesContainer');
        if (!addressesContainer) return; // Ensure container exists

        addressesContainer.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Mis Direcciones</h2>
            <div class="space-y-3 mb-4" id="addressList"></div>
            <div id="addAddressFormContainer"></div>
        `;
        const addressList = document.getElementById('addressList');
        addresses.forEach(addr => {
            const addrDiv = document.createElement('div');
            addrDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
            addrDiv.innerHTML = `
                <div>
                    <p class="font-medium text-gray-800">${addr.name}</p>
                    <p class="text-sm text-gray-600">${addr.address}</p>
                </div>
                ${createIcon('ChevronRight', 20, 'text-gray-500').outerHTML}
            `;
            addressList.appendChild(addrDiv);
        });

        const addAddressFormContainer = document.getElementById('addAddressFormContainer');
        if (!showAddAddressForm) {
            addAddressFormContainer.innerHTML = `
                <button id="addAddressBtn" class="w-full py-3 bg-green-50 text-green-600 border border-green-200 rounded-xl font-semibold hover:bg-green-100 transition-colors duration-200">
                    Añadir Nueva Dirección
                </button>
            `;
            document.getElementById('addAddressBtn').addEventListener('click', () => {
                showAddAddressForm = true;
                renderAddressesSection();
            });
        } else {
            addAddressFormContainer.innerHTML = `
                <div class="mt-4 p-4 bg-gray-50 rounded-xl">
                    <input type="text" id="newAddressName" placeholder="Nombre (ej. Casa de Mamá)"
                           class="w-full p-3 mb-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <input type="text" id="newAddressDetail" placeholder="Dirección completa"
                           class="w-full p-3 mb-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <div class="flex space-x-2">
                        <button id="saveAddressBtn" class="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors duration-200">
                            Guardar Dirección
                        </button>
                        <button id="cancelAddAddressBtn" class="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-200">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
            document.getElementById('saveAddressBtn').addEventListener('click', () => {
                const newAddressName = document.getElementById('newAddressName').value;
                const newAddressDetail = document.getElementById('newAddressDetail').value;
                if (newAddressName && newAddressDetail) {
                    addresses.push({ id: `addr${Date.now()}`, name: newAddressName, address: newAddressDetail });
                    appState.addresses = addresses; // Update global state
                    showAddAddressForm = false;
                    renderAddressesSection();
                }
            });
            document.getElementById('cancelAddAddressBtn').addEventListener('click', () => {
                showAddAddressForm = false;
                renderAddressesSection();
            });
        }
    };

    const addressesSectionDiv = document.createElement('div');
    addressesSectionDiv.className = 'bg-white rounded-xl shadow-md p-5 mb-6';
    addressesSectionDiv.id = 'addressesContainer';
    accountDiv.appendChild(addressesSectionDiv);
    renderAddressesSection(); // Initial render of addresses section

    // Other Options
    accountDiv.innerHTML += `
        <div class="bg-white rounded-xl shadow-md p-5">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Opciones</h2>
            <div class="space-y-3">
                <button class="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <span class="font-medium text-gray-800">Mis Favoritos</span>
                    ${createIcon('ChevronRight', 20, 'text-gray-500').outerHTML}
                </button>
                <button class="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <span class="font-medium text-gray-800">Ayuda y Soporte</span>
                    ${createIcon('ChevronRight', 20, 'text-gray-500').outerHTML}
                </button>
                <button class="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <span class="font-medium text-gray-800">Configuración</span>
                    ${createIcon('ChevronRight', 20, 'text-gray-500').outerHTML}
                </button>
                <button id="logoutBtn" class="w-full py-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors duration-200">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    `;
    document.getElementById('logoutBtn').addEventListener('click', () => {
        appState.loggedIn = false;
        appState.currentScreen = 'Splash';
        updateUI();
    });
};


// --- Shared Components / Logic ---

// Tab Bar
const renderTabBar = (container) => {
    const tabBarDiv = document.createElement('div');
    tabBarDiv.className = 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 z-50 rounded-t-xl';

    const tabs = [
        { name: 'Home', icon: 'Home' },
        { name: 'Buscar', icon: 'Search' },
        { name: 'Pedidos', icon: 'Package' },
        { name: 'Cuenta', icon: 'User' },
    ];

    tabs.forEach(tab => {
        const button = document.createElement('button');
        button.className = `flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
            appState.currentScreen === tab.name ? 'text-green-600' : 'text-gray-500'
        }`;
        button.innerHTML = `
            <div class="relative">
                ${createIcon(tab.icon, 24).outerHTML}
                ${tab.name === 'Pedidos' && appState.cartItems.length > 0 ? `
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        ${appState.cartItems.length}
                    </span>
                ` : ''}
            </div>
            <span class="text-xs mt-1 font-medium">${tab.name}</span>
        `;
        button.addEventListener('click', () => {
            appState.currentScreen = tab.name;
            updateUI();
        });
        tabBarDiv.appendChild(button);
    });

    container.appendChild(tabBarDiv);
};

// Floating Cart Button (for Restaurant Detail Screen)
const renderFloatingCart = (container) => {
    if (appState.cartItems.length > 0) {
        const floatingCartBtn = document.createElement('div');
        floatingCartBtn.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md bg-green-600 text-white p-4 rounded-xl shadow-lg flex justify-between items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] z-50';
        floatingCartBtn.innerHTML = `
            <span class="font-bold text-lg">${appState.cartItems.length} artículos</span>
            <span class="font-bold text-lg">Ver Cesta • ${appState.cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}€</span>
        `;
        floatingCartBtn.addEventListener('click', () => {
            appState.currentScreen = 'Mi Pedido';
            updateUI();
        });
        container.appendChild(floatingCartBtn);
    }
};

// Function to add/remove items from cart
const addToCart = (dish, quantityChange) => {
    if (quantityChange > 0) {
        for (let i = 0; i < quantityChange; i++) {
            appState.cartItems.push(dish);
        }
    } else if (quantityChange < 0) {
        const indexToRemove = appState.cartItems.lastIndexOf(dish);
        if (indexToRemove > -1) {
            appState.cartItems.splice(indexToRemove, 1);
        }
    }
};

// Function to toggle restaurant favorite status
const toggleFavorite = (restaurantId) => {
    appState.restaurants = appState.restaurants.map(rest =>
        rest.id === restaurantId ? { ...rest, isFavorite: !rest.isFavorite } : rest
    );
    updateUI(); // Re-render to reflect favorite status change
};


// Initial render when the DOM is fully loaded
window.onload = () => {
    updateUI();
};
