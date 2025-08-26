// Header loader JavaScript - Injecte le header fixe sur toutes les pages
(function() {
    'use strict';

    // Configuration des traductions et URLs pour chaque langue
    const translations = {
        fr: {
            affichage: { text: "Gestion d'affichage dynamique", href: "/pages/fr/affichage-dynamique.html" },
            reseau: { text: "Réseau Publicitaire", href: "/pages/fr/reseau-affichage.html" },
            carrieres: { text: "Carrières", href: "/pages/fr/carrieres.html" },
            contact: { text: "Contact", href: "/pages/fr/contact.html" },
            login: { text: "Se Connecter", href: "/pages/fr/se-connecter.html" },
            logoHref: "/",
            dropdown: [
                { href: "/pages/fr/blog/industries.html", text: "Industries", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3391fb05-2ac3-43d2-bf23-f77afee5bf75/Xtranumerik+-+Gestion+centralis%C3%A9-+WEB+Accueil.png?format=2500w", alt: "Écran d'affichage dynamique dans une usine industrielle", desc: "Affiche les métriques de production et les alertes de sécurité." },
                { href: "/pages/fr/blog/gyms.html", text: "Gyms", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/db86bc49-10a3-4a73-933c-1e337a73cb5e/Gyms.gif?format=2500w", alt: "Écran d'affichage dynamique dans un centre de fitness", desc: "Présente les horaires de cours et des conseils de fitness." },
                { href: "/pages/fr/blog/restaurants.html", text: "Restaurants", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/1744307786373-EIWSK5KDMV64EXXQ1N4S/Diapositive4.JPG?format=2500w", alt: "Écran d'affichage dynamique montrant un menu dans un restaurant", desc: "Affiche les menus et les offres spéciales." },
                { href: "/pages/fr/blog/concessions-automobile.html", text: "Concessions automobiles", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c13f8573-8e5c-44f8-9d2d-23da5ad3b602/Vachon+Subaru+Gif+WEB.gif?format=2500w", alt: "Écran d'affichage dynamique dans une concession automobile", desc: "Met en avant les promotions et les véhicules en vedette." },
                { href: "/pages/fr/blog/hotels.html", text: "Hôtels", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/100f7c13-c5b8-49d9-adfc-3f15d68ce12c/Hotel.gif?format=2500w", alt: "Écran d'affichage dynamique dans un hall d'hôtel", desc: "Informe sur les services et les événements." },
                { href: "/pages/fr/blog/centre-commercial.html", text: "Centres commerciaux", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/385625e2-7c05-4ed6-81b0-71125d095028/Centre+d%27achat.gif?format=2500w", alt: "Écran d'affichage dynamique dans un centre commercial", desc: "Guide les visiteurs avec des plans et des promotions." },
                { href: "/pages/fr/blog/commerce-de-detail.html", text: "Commerces de détail", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/2b26da1c-9f2d-4059-a561-b0ed6a2a3900/commerce-de-detail.gif?format=2500w", alt: "Écran d'affichage dynamique dans une boutique de détail", desc: "Met en valeur les produits et les promotions." },
                { href: "/pages/fr/blog/pharmacies.html", text: "Pharmacies", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6e66768a-28c2-4ba4-bf79-a5fd6fe58e4d/pharmacy.gif?format=2500w", alt: "Écran d'affichage dynamique près d'un comptoir de pharmacie", desc: "Promeut les produits de santé et les rappels." },
                { href: "/pages/fr/blog/cliniques-dentaires.html", text: "Cliniques dentaires", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/f4c98289-c334-42c4-b944-8fc8c15a0a28/Clinique+dentaire.gif?format=2500w", alt: "Écran d'affichage dynamique dans une salle d'attente de clinique dentaire", desc: "Affiche les services, promotions et conseils d'hygiène." },
                { href: "/pages/fr/blog/salons-de-coiffure.html", text: "Salons de coiffure", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7657204c-6455-4f17-a0c5-b18227d2ea07/Salon+de+coiffure.gif?format=2500w", alt: "Écran d'affichage dynamique dans un salon de coiffure", desc: "Présente les services et les promotions." }
            ]
        },
        en: {
            affichage: { text: "Dynamic Display Management", href: "/pages/en/digital-signage.html" },
            reseau: { text: "Advertising Network", href: "/pages/en/advertising-display-network.html" },
            carrieres: { text: "Careers", href: "/pages/en/careers.html" },
            contact: { text: "Contact", href: "/pages/en/contact.html" },
            login: { text: "Log In", href: "/pages/en/login.html" },
            logoHref: "/pages/en/",
            dropdown: [
                { href: "/pages/en/blog/industry.html", text: "Industries", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3391fb05-2ac3-43d2-bf23-f77afee5bf75/Xtranumerik+-+Gestion+centralis%C3%A9-+WEB+Accueil.png?format=2500w", alt: "Digital signage screen in an industrial factory", desc: "Displays production metrics and safety alerts." },
                { href: "/pages/en/blog/gym.html", text: "Gyms", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/db86bc49-10a3-4a73-933c-1e337a73cb5e/Gyms.gif?format=2500w", alt: "Digital signage screen in a fitness center", desc: "Shows class schedules and fitness tips." },
                { href: "/pages/en/blog/restaurant.html", text: "Restaurants", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/1744307786373-EIWSK5KDMV64EXXQ1N4S/Diapositive4.JPG?format=2500w", alt: "Digital signage screen displaying a menu in a restaurant", desc: "Presents menus and special offers." },
                { href: "/pages/en/blog/car-dealership.html", text: "Car Dealerships", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c13f8573-8e5c-44f8-9d2d-23da5ad3b602/Vachon+Subaru+Gif+WEB.gif?format=2500w", alt: "Digital signage screen in a car dealership", desc: "Highlights promotions and featured vehicles." },
                { href: "/pages/en/blog/hotel.html", text: "Hotels", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/100f7c13-c5b8-49d9-adfc-3f15d68ce12c/Hotel.gif?format=2500w", alt: "Digital signage screen in a hotel lobby", desc: "Informs about services and events." },
                { href: "/pages/en/blog/shopping-center.html", text: "Shopping Centers", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/385625e2-7c05-4ed6-81b0-71125d095028/Centre+d%27achat.gif?format=2500w", alt: "Digital signage screen in a shopping center", desc: "Guides visitors with maps and promotions." },
                { href: "/pages/en/blog/retail.html", text: "Retail", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/2b26da1c-9f2d-4059-a561-b0ed6a2a3900/commerce-de-detail.gif?format=2500w", alt: "Digital signage screen in a retail store", desc: "Showcases products and promotions." },
                { href: "/pages/en/blog/pharmacy.html", text: "Pharmacies", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6e66768a-28c2-4ba4-bf79-a5fd6fe58e4d/pharmacy.gif?format=2500w", alt: "Digital signage screen near a pharmacy counter", desc: "Promotes health products and reminders." },
                { href: "/pages/en/blog/dental-clinic.html", text: "Dental Clinics", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/f4c98289-c334-42c4-b944-8fc8c15a0a28/Clinique+dentaire.gif?format=2500w", alt: "Digital signage screen in a dental clinic waiting room", desc: "Displays services, promotions, and hygiene tips." },
                { href: "/pages/en/blog/hair-salon.html", text: "Hair Salons", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7657204c-6455-4f17-a0c5-b18227d2ea07/Salon+de+coiffure.gif?format=2500w", alt: "Digital signage screen in a hair salon", desc: "Presents services and promotions." }
            ]
        }
    };

    // Déterminer la langue et le slug à partir de l'URL
    function getLangAndSlug() {
        let path = window.location.pathname.toLowerCase();
        let lang, slug;
        if (path.includes('/en/')) {
            lang = 'en';
            slug = path.substring(path.indexOf('/en/') + 4);
        } else if (path.includes('/fr/')) {
            lang = 'fr';
            slug = path.substring(path.indexOf('/fr/') + 4);
        } else {
            lang = 'fr';
            slug = path.substring(1);
        }
        return { lang, slug };
    }

    // Calculer l'URL de la langue opposée
    function getOppositeLangHref() {
        const { lang, slug } = getLangAndSlug();
        const targetLang = lang === 'fr' ? 'en' : 'fr';
        let targetSlug = slug;
        
        // Mapping simple pour les slugs principaux
        const slugMap = {
            '': '',
            'affichage-dynamique': 'digital-signage',
            'reseau-affichage': 'advertising-display-network',
            'carrieres': 'careers',
            'contact': 'contact',
            'se-connecter': 'login'
        };

        if (lang === 'fr' && slugMap[slug]) {
            targetSlug = slugMap[slug];
        } else if (lang === 'en') {
            const reversedMap = Object.fromEntries(Object.entries(slugMap).map(([key, value]) => [value, key]));
            if (reversedMap[slug]) {
                targetSlug = reversedMap[slug];
            }
        }

        let targetPath;
        if (targetSlug === '') {
            targetPath = targetLang === 'en' ? '/pages/en/' : '/';
        } else {
            targetPath = `/pages/${targetLang}/${targetSlug}`;
        }
        return targetPath;
    }

    // Créer le HTML du header
    function createHeaderHTML(lang) {
        const t = translations[lang];
        
        return `
<style>
    /* Reset de base */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    /* Masquer les headers par défaut de Squarespace */
    .sqs-announcement-bar, #header, .header, .header-announcement-bar-wrapper { display: none !important; }
    
    /* Styles du header personnalisé - Design géométrique moderne */
    .custom-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        height: 80px;
        background: linear-gradient(90deg, #190544 0%, #2a0a6e 50%, #190544 100%);
        border-bottom: 3px solid #ffa91a;
        border-radius: 0 0 16px 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 2000;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .custom-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #ffa91a, transparent);
    }
    
    .custom-header:hover {
        box-shadow: 0 12px 40px rgba(255, 169, 26, 0.2);
    }
    
    /* Ajustement du body pour éviter que le contenu soit caché sous le header */
    body {
        padding-top: 80px !important;
    }
    
    /* Section logo */
    .logo {
        display: flex;
        align-items: center;
        height: 100%;
    }
    
    .logo a {
        display: block;
        height: 50px;
        transition: transform 0.3s ease;
    }
    
    .logo img {
        height: 100%;
        width: auto;
        filter: brightness(1.1);
        transition: filter 0.3s ease;
    }
    
    .logo a:hover {
        transform: scale(1.05);
    }
    
    .logo a:hover img {
        filter: brightness(1.3);
    }
    
    /* Boutons de navigation */
    .nav-buttons {
        display: flex;
        gap: 8px;
        position: relative;
        align-items: center;
        height: 100%;
    }
    
    .nav-button {
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 24px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.25px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
        text-transform: uppercase;
        white-space: nowrap;
    }
    
    .nav-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 169, 26, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .nav-button:hover {
        background: rgba(255, 169, 26, 0.15);
        border-color: #ffa91a;
        color: #ffa91a;
        transform: translateY(-2px);
        box-shadow:
            0 4px 12px rgba(255, 169, 26, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .nav-button:hover::before {
        left: 100%;
    }
    
    .nav-button:active {
        transform: translateY(0);
    }
    
    /* Style spécial pour le bouton de connexion */
    .login-button {
        background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
        color: #190544;
        border: 1px solid #ffa91a;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(255, 169, 26, 0.4);
    }
    
    .login-button:hover {
        background: linear-gradient(135deg, #ffb633 0%, #ffa91a 100%);
        color: #190544;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 169, 26, 0.6);
    }
    
    /* Sélecteur de langue */
    .language-switcher {
        margin-left: 16px;
    }
    
    .lang-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        color: #fff;
        font-size: 18px;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
    }
    
    .lang-button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 169, 26, 0.3), transparent);
        transform: translate(-50%, -50%);
        transition: all 0.4s ease;
    }
    
    .lang-button:hover {
        background: rgba(255, 169, 26, 0.15);
        border-color: #ffa91a;
        color: #ffa91a;
        transform: translateY(-2px);
    }
    
    .lang-button:hover::before {
        width: 100px;
        height: 100px;
    }
    
    /* Conteneur du menu déroulant */
    .dropdown-container {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        background: #1a1a1a;
        border: 1px solid rgba(255, 169, 26, 0.3);
        border-radius: 12px;
        box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 169, 26, 0.1);
        padding: 24px;
        z-index: 2001;
        min-width: 920px;
        transform: translateY(-10px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(20px);
    }
    
    .dropdown-container::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 32px;
        width: 16px;
        height: 16px;
        background: #1a1a1a;
        border-left: 1px solid rgba(255, 169, 26, 0.3);
        border-top: 1px solid rgba(255, 169, 26, 0.3);
        border-radius: 2px 0 0 0;
        transform: rotate(45deg);
    }
    
    .dropdown-container.active {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
    
    .dropdown-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;
    }
    
    .dropdown-signage {
        text-decoration: none;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
    }
    
    .dropdown-signage::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 169, 26, 0.1), transparent);
        transition: left 0.5s ease;
    }
    
    .dropdown-signage:hover {
        background: rgba(255, 169, 26, 0.1);
        border-color: rgba(255, 169, 26, 0.5);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(255, 169, 26, 0.2);
    }
    
    .dropdown-signage:hover::before {
        left: 100%;
    }
    
    .dropdown-signage img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        transition: transform 0.4s ease;
        filter: brightness(0.9);
        border-radius: 8px 8px 0 0;
    }
    
    .dropdown-signage:hover img {
        transform: scale(1.05);
        filter: brightness(1.1);
    }
    
    .dropdown-signage h3 {
        font-size: 13px;
        font-weight: 600;
        padding: 12px 12px 8px;
        margin: 0;
        color: #ffffff;
        text-align: center;
        transition: color 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .dropdown-signage:hover h3 {
        color: #ffa91a;
    }
    
    .dropdown-signage p {
        font-size: 11px;
        padding: 0 12px 12px;
        margin: 0;
        color: #cccccc;
        text-align: center;
        line-height: 1.4;
        transition: color 0.3s ease;
    }
    
    .dropdown-signage:hover p {
        color: #ffffff;
    }
    
    /* Menu hamburger */
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        gap: 4px;
        transition: transform 0.3s ease;
        width: 32px;
        height: 32px;
        justify-content: center;
        align-items: center;
    }
    
    .hamburger:hover {
        transform: scale(1.1);
    }
    
    .hamburger span {
        width: 24px;
        height: 2px;
        background: #fff;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        border-radius: 2px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
        transform: translateX(20px);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    /* Responsive mobile */
    @media (max-width: 1200px) {
        .dropdown-grid {
            grid-template-columns: repeat(4, 1fr);
        }
        .dropdown-container {
            min-width: 760px;
        }
    }
    
    @media (max-width: 768px) {
        .custom-header {
            padding: 0 20px;
            height: 70px;
        }
        
        body {
            padding-top: 70px !important;
        }
        
        .logo a {
            height: 40px;
        }
        
        .hamburger {
            display: flex;
        }
        
        .nav-buttons {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: linear-gradient(180deg, #190544 0%, #2a0a6e 100%);
            padding: 20px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            border-top: 1px solid rgba(255, 169, 26, 0.3);
            gap: 12px;
        }
        
        .nav-buttons.active {
            display: flex;
        }
        
        .nav-button {
            height: 52px;
            text-align: center;
            justify-content: center;
            border-radius: 8px;
            font-size: 15px;
        }
        
        .dropdown-container {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            min-width: auto;
            margin: 0 20px;
            transform: translateY(-20px);
        }
        
        .dropdown-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        
        .dropdown-signage img {
            height: 100px;
        }
        
        .language-switcher {
            margin-left: 12px;
            margin-right: 0;
        }
        
        .lang-button {
            width: 44px;
            height: 44px;
        }
    }
    
    @media (max-width: 480px) {
        .dropdown-grid {
            grid-template-columns: 1fr;
        }
        .dropdown-container {
            margin: 0 10px;
        }
    }
</style>

<header class="custom-header">
    <div class="logo">
        <a id="logo-link" href="${t.logoHref}">
            <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7eef8943-d34e-4427-b3cb-2884e8c66666/LOGO+Xtranumerik+fond+mauve+%281920+x+1080+px%29.png?format=2500w" alt="Xtranumerik Logo">
        </a>
    </div>
    <nav class="nav-buttons">
        <a id="link-affichage" href="${t.affichage.href}" class="nav-button">
            ${t.affichage.text}
            <div class="dropdown-container">
                <div class="dropdown-grid">
                    ${t.dropdown.map(item => `
                        <a href="${item.href}" class="dropdown-signage">
                            <img src="${item.img}" alt="${item.alt}">
                            <h3>${item.text}</h3>
                            <p>${item.desc}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        </a>
        <a id="link-reseau" href="${t.reseau.href}" class="nav-button">${t.reseau.text}</a>
        <a id="link-carrieres" href="${t.carrieres.href}" class="nav-button">${t.carrieres.text}</a>
        <a id="link-contact" href="${t.contact.href}" class="nav-button">${t.contact.text}</a>
        <a id="link-login" href="${t.login.href}" class="nav-button login-button">${t.login.text}</a>
    </nav>
    <div class="language-switcher">
        <a id="lang-link" href="${getOppositeLangHref()}" class="lang-button">🌍</a>
    </div>
    <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
</header>
        `;
    }

    // Initialiser le menu hamburger
    function initializeHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const navButtons = document.querySelector('.nav-buttons');

        if (hamburger && navButtons) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navButtons.classList.toggle('active');
            });
        }
    }

    // Initialiser le menu déroulant
    function initializeDropdown() {
        const affichageButton = document.getElementById('link-affichage');
        const dropdownContainer = document.querySelector('.dropdown-container');

        if (affichageButton && dropdownContainer) {
            let clickCount = 0;
            let clickTimer = null;

            affichageButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                clickCount++;

                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        dropdownContainer.classList.toggle('active');
                        clickCount = 0;
                    }, 300);
                } else if (clickCount === 2) {
                    clearTimeout(clickTimer);
                    window.location.href = affichageButton.href;
                    clickCount = 0;
                }
            });

            // Fermer le menu déroulant si on clique ailleurs
            document.addEventListener('click', (e) => {
                if (!affichageButton.contains(e.target) && !dropdownContainer.contains(e.target)) {
                    dropdownContainer.classList.remove('active');
                }
            });

            // Fermer le menu déroulant lorsqu'un lien de vignette est cliqué
            document.querySelectorAll('.dropdown-signage').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdownContainer.classList.remove('active');
                });
            });
        }
    }

    // Fermer le menu hamburger lorsqu'un lien est cliqué
    function initializeNavButtonClicks() {
        const hamburger = document.querySelector('.hamburger');
        const navButtons = document.querySelector('.nav-buttons');
        const affichageButton = document.getElementById('link-affichage');

        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target !== affichageButton && hamburger && navButtons) {
                    hamburger.classList.remove('active');
                    navButtons.classList.remove('active');
                }
            });
        });
    }

    // Charger et injecter le header
    function loadHeader() {
        // Vérifier s'il n'y a pas déjà un header
        if (document.querySelector('.custom-header')) {
            return;
        }

        const { lang } = getLangAndSlug();
        const headerHTML = createHeaderHTML(lang);
        
        // Injecter le header au début du body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Initialiser les fonctionnalités du header
        setTimeout(() => {
            initializeHamburger();
            initializeDropdown();
            initializeNavButtonClicks();
        }, 100);
        
        console.log('Header Xtranumerik chargé avec succès');
    }

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }

})();
