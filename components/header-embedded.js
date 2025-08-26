// Header component loader - Embedded version
(function() {
    'use strict';

    // HTML du header intégré directement
    const headerHTML = `
<style>
    /* Base reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }

    /* Hide default Squarespace header */
    .sqs-announcement-bar, #header, .header, .header-announcement-bar-wrapper { display: none !important; }

    /* Custom header styles - Modern geometric design */
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

    /* Logo section */
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

    /* Navigation buttons */
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

    /* Login button special styling */
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

    /* Language switcher */
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

    /* Dropdown container */
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

    /* Hamburger menu */
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

    /* Mobile responsive */
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

    /* Ensure body has proper top margin to account for fixed header */
    body {
        margin-top: 80px;
    }

    @media (max-width: 768px) {
        body {
            margin-top: 70px;
        }
    }
</style>

<header class="custom-header">
    <div class="logo">
        <a id="logo-link" href="/">
            <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7eef8943-d34e-4427-b3cb-2884e8c66666/LOGO+Xtranumerik+fond+mauve+%281920+x+1080+px%29.png?format=2500w" alt="Xtranumerik Logo">
        </a>
    </div>
    <nav class="nav-buttons">
        <a id="link-affichage" href="#" class="nav-button">
            Gestion d'affichage dynamique
            <div class="dropdown-container">
                <div class="dropdown-grid">
                    <a href="/pages/fr/industries.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3391fb05-2ac3-43d2-bf23-f77afee5bf75/Xtranumerik+-+Gestion+centralis%C3%A9-+WEB+Accueil.png?format=2500w" alt="Écran d'affichage dynamique dans une usine industrielle">
                        <h3>Industries</h3>
                        <p>Affiche les métriques de production et les alertes de sécurité.</p>
                    </a>
                    <a href="/pages/fr/gyms.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/db86bc49-10a3-4a73-933c-1e337a73cb5e/Gyms.gif?format=2500w" alt="Écran d'affichage dynamique dans un centre de fitness">
                        <h3>Gyms</h3>
                        <p>Présente les horaires de cours et des conseils de fitness.</p>
                    </a>
                    <a href="/pages/fr/restaurants.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/1744307786373-EIWSK5KDMV64EXXQ1N4S/Diapositive4.JPG?format=2500w" alt="Écran d'affichage dynamique montrant un menu dans un restaurant">
                        <h3>Restaurants</h3>
                        <p>Affiche les menus et les offres spéciales.</p>
                    </a>
                    <a href="/pages/fr/concessions-auto.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c13f8573-8e5c-44f8-9d2d-23da5ad3b602/Vachon+Subaru+Gif+WEB.gif?format=2500w" alt="Écran d'affichage dynamique dans une concession automobile">
                        <h3>Concessions automobiles</h3>
                        <p>Met en avant les promotions et les véhicules en vedette.</p>
                    </a>
                    <a href="/pages/fr/hotels.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/100f7c13-c5b8-49d9-adfc-3f15d68ce12c/Hotel.gif?format=2500w" alt="Écran d'affichage dynamique dans un hall d'hôtel">
                        <h3>Hôtels</h3>
                        <p>Informe sur les services et les événements.</p>
                    </a>
                    <a href="/pages/fr/centres-commerciaux.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/385625e2-7c05-4ed6-81b0-71125d095028/Centre+d%27achat.gif?format=2500w" alt="Écran d'affichage dynamique dans un centre commercial">
                        <h3>Centres commerciaux</h3>
                        <p>Guide les visiteurs avec des plans et des promotions.</p>
                    </a>
                    <a href="/pages/fr/commerce-detail.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/2b26da1c-9f2d-4059-a561-b0ed6a2a3900/commerce-de-detail.gif?format=2500w" alt="Écran d'affichage dynamique dans une boutique de détail">
                        <h3>Commerces de détail</h3>
                        <p>Met en valeur les produits et les promotions.</p>
                    </a>
                    <a href="/pages/fr/pharmacies.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6e66768a-28c2-4ba4-bf79-a5fd6fe58e4d/pharmacy.gif?format=2500w" alt="Écran d'affichage dynamique près d'un comptoir de pharmacie">
                        <h3>Pharmacies</h3>
                        <p>Promeut les produits de santé et les rappels.</p>
                    </a>
                    <a href="/pages/fr/cliniques-dentaires.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/f4c98289-c334-42c4-b944-8fc8c15a0a28/Clinique+dentaire.gif?format=2500w" alt="Écran d'affichage dynamique dans une salle d'attente de clinique dentaire">
                        <h3>Cliniques dentaires</h3>
                        <p>Affiche les services, promotions et conseils d'hygiène.</p>
                    </a>
                    <a href="/pages/fr/salons-coiffure.html" class="dropdown-signage">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7657204c-6455-4f17-a0c5-b18227d2ea07/Salon+de+coiffure.gif?format=2500w" alt="Écran d'affichage dynamique dans un salon de coiffure">
                        <h3>Salons de coiffure</h3>
                        <p>Présente les services et les promotions.</p>
                    </a>
                </div>
            </div>
        </a>
        <a id="link-reseau" href="/pages/fr/reseau-publicitaire.html" class="nav-button">Réseau Publicitaire</a>
        <a id="link-carrieres" href="/pages/fr/carrieres.html" class="nav-button">Carrières</a>
        <a id="link-contact" href="/pages/fr/contact.html" class="nav-button">Contact</a>
        <a id="link-login" href="/pages/fr/connexion.html" class="nav-button login-button">Se Connecter</a>
    </nav>
    <div class="language-switcher">
        <a id="lang-link" href="#" class="lang-button">🌐</a>
    </div>
    <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
</header>
`;

    // Function to load header content
    function loadHeader() {
        try {
            // Insert header into the page
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
                console.log('Header loaded successfully');
            } else {
                // If no container exists, prepend to body
                document.body.insertAdjacentHTML('afterbegin', headerHTML);
                console.log('Header inserted at the beginning of body');
            }
            
            // Initialize header functionality
            initializeHeader();
        } catch (error) {
            console.error('Failed to load header:', error);
            createFallbackHeader();
        }
    }

    // Fonction pour initialiser les fonctionnalités du header
    function initializeHeader() {
        // Charger la police Inter si nécessaire
        if (!document.fonts || !document.fonts.check('1em Inter')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
            console.log('Police Inter chargée');
        }

        // Définir les traductions et URLs pour chaque langue
        const translations = {
            fr: {
                affichage: { text: "Gestion d'affichage dynamique", href: "/pages/fr/affichage-dynamique.html" },
                reseau: { text: "Réseau Publicitaire", href: "/pages/fr/reseau-publicitaire.html" },
                carrieres: { text: "Carrières", href: "/pages/fr/carrieres.html" },
                contact: { text: "Contact", href: "/pages/fr/contact.html" },
                login: { text: "Se Connecter", href: "/pages/fr/connexion.html" },
                logoHref: "/",
                dropdown: [
                    { href: "/pages/fr/industries.html", text: "Industries", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3391fb05-2ac3-43d2-bf23-f77afee5bf75/Xtranumerik+-+Gestion+centralis%C3%A9-+WEB+Accueil.png?format=2500w", alt: "Écran d'affichage dynamique dans une usine industrielle", desc: "Affiche les métriques de production et les alertes de sécurité." },
                    { href: "/pages/fr/gyms.html", text: "Gyms", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/db86bc49-10a3-4a73-933c-1e337a73cb5e/Gyms.gif?format=2500w", alt: "Écran d'affichage dynamique dans un centre de fitness", desc: "Présente les horaires de cours et des conseils de fitness." },
                    { href: "/pages/fr/restaurants.html", text: "Restaurants", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/1744307786373-EIWSK5KDMV64EXXQ1N4S/Diapositive4.JPG?format=2500w", alt: "Écran d'affichage dynamique montrant un menu dans un restaurant", desc: "Affiche les menus et les offres spéciales." },
                    { href: "/pages/fr/concessions-auto.html", text: "Concessions automobiles", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c13f8573-8e5c-44f8-9d2d-23da5ad3b602/Vachon+Subaru+Gif+WEB.gif?format=2500w", alt: "Écran d'affichage dynamique dans une concession automobile", desc: "Met en avant les promotions et les véhicules en vedette." },
                    { href: "/pages/fr/hotels.html", text: "Hôtels", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/100f7c13-c5b8-49d9-adfc-3f15d68ce12c/Hotel.gif?format=2500w", alt: "Écran d'affichage dynamique dans un hall d'hôtel", desc: "Informe sur les services et les événements." },
                    { href: "/pages/fr/centres-commerciaux.html", text: "Centres commerciaux", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/385625e2-7c05-4ed6-81b0-71125d095028/Centre+d%27achat.gif?format=2500w", alt: "Écran d'affichage dynamique dans un centre commercial", desc: "Guide les visiteurs avec des plans et des promotions." },
                    { href: "/pages/fr/commerce-detail.html", text: "Commerces de détail", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/2b26da1c-9f2d-4059-a561-b0ed6a2a3900/commerce-de-detail.gif?format=2500w", alt: "Écran d'affichage dynamique dans une boutique de détail", desc: "Met en valeur les produits et les promotions." },
                    { href: "/pages/fr/pharmacies.html", text: "Pharmacies", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6e66768a-28c2-4ba4-bf79-a5fd6fe58e4d/pharmacy.gif?format=2500w", alt: "Écran d'affichage dynamique près d'un comptoir de pharmacie", desc: "Promeut les produits de santé et les rappels." },
                    { href: "/pages/fr/cliniques-dentaires.html", text: "Cliniques dentaires", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/f4c98289-c334-42c4-b944-8fc8c15a0a28/Clinique+dentaire.gif?format=2500w", alt: "Écran d'affichage dynamique dans une salle d'attente de clinique dentaire", desc: "Affiche les services, promotions et conseils d'hygiène." },
                    { href: "/pages/fr/salons-coiffure.html", text: "Salons de coiffure", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7657204c-6455-4f17-a0c5-b18227d2ea07/Salon+de+coiffure.gif?format=2500w", alt: "Écran d'affichage dynamique dans un salon de coiffure", desc: "Présente les services et les promotions." }
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
                    { href: "/pages/en/industry.html", text: "Industries", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3391fb05-2ac3-43d2-bf23-f77afee5bf75/Xtranumerik+-+Gestion+centralis%C3%A9-+WEB+Accueil.png?format=2500w", alt: "Digital signage screen in an industrial factory", desc: "Displays production metrics and safety alerts." },
                    { href: "/pages/en/gym.html", text: "Gyms", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/db86bc49-10a3-4a73-933c-1e337a73cb5e/Gyms.gif?format=2500w", alt: "Digital signage screen in a fitness center", desc: "Shows class schedules and fitness tips." },
                    { href: "/pages/en/restaurant.html", text: "Restaurants", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/1744307786373-EIWSK5KDMV64EXXQ1N4S/Diapositive4.JPG?format=2500w", alt: "Digital signage screen displaying a menu in a restaurant", desc: "Presents menus and special offers." },
                    { href: "/pages/en/car-dealership.html", text: "Car Dealerships", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c13f8573-8e5c-44f8-9d2d-23da5ad3b602/Vachon+Subaru+Gif+WEB.gif?format=2500w", alt: "Digital signage screen in a car dealership", desc: "Highlights promotions and featured vehicles." },
                    { href: "/pages/en/hotel.html", text: "Hotels", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/100f7c13-c5b8-49d9-adfc-3f15d68ce12c/Hotel.gif?format=2500w", alt: "Digital signage screen in a hotel lobby", desc: "Informs about services and events." },
                    { href: "/pages/en/shopping-center.html", text: "Shopping Centers", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/385625e2-7c05-4ed6-81b0-71125d095028/Centre+d%27achat.gif?format=2500w", alt: "Digital signage screen in a shopping center", desc: "Guides visitors with maps and promotions." },
                    { href: "/pages/en/retail.html", text: "Retail", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/2b26da1c-9f2d-4059-a561-b0ed6a2a3900/commerce-de-detail.gif?format=2500w", alt: "Digital signage screen in a retail store", desc: "Showcases products and promotions." },
                    { href: "/pages/en/pharmacy.html", text: "Pharmacies", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6e66768a-28c2-4ba4-bf79-a5fd6fe58e4d/pharmacy.gif?format=2500w", alt: "Digital signage screen near a pharmacy counter", desc: "Promotes health products and reminders." },
                    { href: "/pages/en/dental-clinic.html", text: "Dental Clinics", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/f4c98289-c334-42c4-b944-8fc8c15a0a28/Clinique+dentaire.gif?format=2500w", alt: "Digital signage screen in a dental clinic waiting room", desc: "Displays services, promotions, and hygiene tips." },
                    { href: "/pages/en/hair-salon.html", text: "Hair Salons", img: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7657204c-6455-4f17-a0c5-b18227d2ea07/Salon+de+coiffure.gif?format=2500w", alt: "Digital signage screen in a hair salon", desc: "Presents services and promotions." }
                ]
            }
        };

        // Fonction pour déterminer la langue et le slug à partir de l'URL
        function getLangAndSlug() {
            let path = window.location.pathname.toLowerCase();
            let lang, slug;
            if (path.startsWith('/pages/en/') || path.startsWith('/en/')) {
                lang = 'en';
                slug = path.includes('/pages/en/') ? path.substring(10) : path.substring(4);
            } else if (path.startsWith('/pages/fr/') || path.startsWith('/fr/')) {
                lang = 'fr';
                slug = path.includes('/pages/fr/') ? path.substring(10) : path.substring(4);
            } else if (path === '/' || path === '/index.html') {
                lang = 'fr';
                slug = '';
            } else {
                lang = 'fr';
                slug = path.substring(1);
            }
            return { lang, slug };
        }

        // Fonction pour calculer l'URL de la langue opposée
        function getOppositeLangHref() {
            const { lang, slug } = getLangAndSlug();
            const targetLang = lang === 'fr' ? 'en' : 'fr';
            
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                return `/pages/${targetLang}/`;
            }
            
            // Map simple des noms de fichiers
            const pageMap = {
                'industries.html': 'industry.html',
                'industry.html': 'industries.html',
                'gyms.html': 'gym.html',
                'gym.html': 'gyms.html',
                'restaurants.html': 'restaurant.html',
                'restaurant.html': 'restaurants.html',
                'concessions-auto.html': 'car-dealership.html',
                'car-dealership.html': 'concessions-auto.html',
                'hotels.html': 'hotel.html',
                'hotel.html': 'hotels.html',
                'centres-commerciaux.html': 'shopping-center.html',
                'shopping-center.html': 'centres-commerciaux.html',
                'commerce-detail.html': 'retail.html',
                'retail.html': 'commerce-detail.html',
                'pharmacies.html': 'pharmacy.html',
                'pharmacy.html': 'pharmacies.html',
                'cliniques-dentaires.html': 'dental-clinic.html',
                'dental-clinic.html': 'cliniques-dentaires.html',
                'salons-coiffure.html': 'hair-salon.html',
                'hair-salon.html': 'salons-coiffure.html',
                'carrieres.html': 'careers.html',
                'careers.html': 'carrieres.html',
                'contact.html': 'contact.html',
                'connexion.html': 'login.html',
                'login.html': 'connexion.html',
                'reseau-publicitaire.html': 'advertising-display-network.html',
                'advertising-display-network.html': 'reseau-publicitaire.html'
            };
            
            let targetPage = pageMap[slug] || slug;
            return `/pages/${targetLang}/${targetPage}`;
        }

        // Fonction pour mettre à jour le header
        function updateHeader() {
            const { lang } = getLangAndSlug();
            const dropdownItems = document.querySelectorAll('.dropdown-signage');

            // Mettre à jour les liens de navigation
            const affichageButton = document.getElementById('link-affichage');
            if (affichageButton) {
                affichageButton.firstChild.textContent = translations[lang].affichage.text;
                affichageButton.href = translations[lang].affichage.href;
            }

            const reseauLink = document.getElementById('link-reseau');
            if (reseauLink) {
                reseauLink.textContent = translations[lang].reseau.text;
                reseauLink.href = translations[lang].reseau.href;
            }

            const carrieresLink = document.getElementById('link-carrieres');
            if (carrieresLink) {
                carrieresLink.textContent = translations[lang].carrieres.text;
                carrieresLink.href = translations[lang].carrieres.href;
            }

            const contactLink = document.getElementById('link-contact');
            if (contactLink) {
                contactLink.textContent = translations[lang].contact.text;
                contactLink.href = translations[lang].contact.href;
            }

            const loginLink = document.getElementById('link-login');
            if (loginLink) {
                loginLink.textContent = translations[lang].login.text;
                loginLink.href = translations[lang].login.href;
            }

            // Mettre à jour le lien du logo
            const logoLink = document.getElementById('logo-link');
            if (logoLink) {
                logoLink.href = translations[lang].logoHref;
            }

            // Mettre à jour les vignettes du menu déroulant
            dropdownItems.forEach((item, index) => {
                if (translations[lang].dropdown[index]) {
                    item.href = translations[lang].dropdown[index].href;
                    const img = item.querySelector('img');
                    if (img) {
                        img.src = translations[lang].dropdown[index].img;
                        img.alt = translations[lang].dropdown[index].alt;
                    }
                    const h3 = item.querySelector('h3');
                    if (h3) {
                        h3.textContent = translations[lang].dropdown[index].text;
                    }
                    let descElement = item.querySelector('p');
                    if (translations[lang].dropdown[index].desc) {
                        if (!descElement) {
                            descElement = document.createElement('p');
                            item.appendChild(descElement);
                        }
                        descElement.textContent = translations[lang].dropdown[index].desc;
                    } else if (descElement) {
                        descElement.remove();
                    }
                }
            });

            // Mettre à jour le lien langue dynamiquement
            const langLink = document.getElementById('lang-link');
            if (langLink) {
                langLink.href = getOppositeLangHref();
            }

            document.documentElement.lang = lang;
        }

        // Gestion du menu hamburger
        const hamburger = document.querySelector('.hamburger');
        const navButtons = document.querySelector('.nav-buttons');

        if (hamburger && navButtons) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navButtons.classList.toggle('active');
            });
        }

        // Gestion du menu déroulant et double clic
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
                    const { lang } = getLangAndSlug();
                    window.location.href = translations[lang].affichage.href;
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

        // Fermer le menu hamburger lorsqu'un lien est cliqué
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target !== affichageButton) {
                    if (hamburger) hamburger.classList.remove('active');
                    if (navButtons) navButtons.classList.remove('active');
                }
            });
        });

        // Initialiser les traductions
        updateHeader();

        // Écouter les changements d'URL pour les SPA
        window.addEventListener('popstate', () => {
            updateHeader();
        });
    }

    // Fallback header creation
    function createFallbackHeader() {
        const fallbackHeader = `
            <style>
                .fallback-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    background: linear-gradient(90deg, #190544 0%, #2a0a6e 50%, #190544 100%);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                    z-index: 2000;
                    border-bottom: 3px solid #ffa91a;
                }
                .fallback-header .logo img {
                    height: 50px;
                }
                .fallback-header .nav {
                    display: flex;
                    gap: 20px;
                }
                .fallback-header .nav a {
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .fallback-header .nav a:hover {
                    background-color: rgba(255, 169, 26, 0.2);
                }
                body {
                    margin-top: 80px;
                }
            </style>
            <header class="fallback-header">
                <div class="logo">
                    <a href="/">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7eef8943-d34e-4427-b3cb-2884e8c66666/LOGO+Xtranumerik+fond+mauve+%281920+x+1080+px%29.png?format=2500w" alt="Xtranumerik Logo">
                    </a>
                </div>
                <nav class="nav">
                    <a href="/pages/fr/contact.html">Contact</a>
                    <a href="/pages/fr/carrieres.html">Carrières</a>
                    <a href="/pages/fr/connexion.html">Se Connecter</a>
                </nav>
            </header>
        `;

        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = fallbackHeader;
        } else {
            document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
        }
        
        console.log('Fallback header created');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }

    // Export for potential external use
    window.XtranumerikHeader = {
        load: loadHeader,
        createFallback: createFallbackHeader
    };
})();
