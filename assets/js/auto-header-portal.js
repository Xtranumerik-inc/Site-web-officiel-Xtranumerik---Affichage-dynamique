/**
 * Script d'injection automatique du header - VERSION PORTAL SANS Z-INDEX
 * DATE: 18 septembre 2025
 * 
 * 🔧 SOLUTION PORTAL: 
 * ✅ Utilise createPortal pour rendre le menu en dehors du DOM normal
 * ✅ Pas de conflit z-index possible
 * ✅ Menu toujours au-dessus sans z-index
 * ✅ Compatible desktop et mobile
 */

(function() {
    'use strict';

    // Configuration avec optimisations mobiles
    const CONFIG = {
        // URL du nouveau logo 
        LOGO_URL: '/data/images/LOGO%20Xtranumerik%20fond%20mauve%20(1920%20x%201080%20px).png',
        
        // Détection mobile
        isMobile: function() {
            return window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        // Mapping des pages entre français et anglais
        pageMapping: {
            'fr': {
                'index.html': 'index.html',
                'contact.html': 'contact.html',
                'reseau-publicitaire.html': 'advertising-network.html',
                'carte.html': 'map.html',
                'connexion.html': 'login.html',
                'carrieres.html': 'careers.html',
                'industries.html': 'industries.html',
                'gyms.html': 'gyms.html',
                'restaurants.html': 'restaurants.html',
                'concessions-auto.html': 'car-dealerships.html',
                'hotels.html': 'hotels.html',
                'centres-commerciaux.html': 'shopping-centers.html',
                'commerce-detail.html': 'retail-stores.html',
                'pharmacies.html': 'pharmacies.html',
                'cliniques-dentaires.html': 'dental-clinics.html',
                'salons-coiffure.html': 'hair-salons.html'
            },
            'en': {
                'index.html': 'index.html',
                'contact.html': 'contact.html',
                'advertising-network.html': 'reseau-publicitaire.html',
                'map.html': 'carte.html',
                'login.html': 'connexion.html',
                'careers.html': 'carrieres.html',
                'industries.html': 'industries.html',
                'gyms.html': 'gyms.html',
                'restaurants.html': 'restaurants.html',
                'car-dealerships.html': 'concessions-auto.html',
                'hotels.html': 'hotels.html',
                'shopping-centers.html': 'centres-commerciaux.html',
                'retail-stores.html': 'commerce-detail.html',
                'pharmacies.html': 'pharmacies.html',
                'dental-clinics.html': 'cliniques-dentaires.html',
                'hair-salons.html': 'salons-coiffure.html'
            }
        },

        // Détection robuste de la langue
        detectLanguage: function() {
            const htmlLang = document.documentElement.lang;
            if (htmlLang) {
                return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
            }
            
            const path = window.location.pathname;
            
            if (path.includes('/en/')) {
                return 'en';
            }
            
            if (path.includes('/fr/')) {
                return 'fr';
            }
            
            return 'fr';
        },

        getCurrentPageName: function() {
            const fullPath = window.location.pathname;
            const segments = fullPath.split('/').filter(segment => segment !== '');
            let pageName = 'index.html';
            
            if (segments.length === 0) {
                return pageName;
            }
            
            if (segments.length >= 2 && segments[0] === 'pages') {
                if (segments.length === 2) {
                    return 'index.html';
                }
                if (segments.length >= 3) {
                    pageName = segments[2];
                }
            }
            else if (segments.length >= 1 && (segments[0] === 'fr' || segments[0] === 'en')) {
                if (segments.length === 1) {
                    return 'index.html';
                }
                if (segments.length >= 2) {
                    pageName = segments[1];
                }
            }
            else if (segments.length >= 1) {
                pageName = segments[segments.length - 1];
            }
            
            if (pageName && !pageName.includes('.html') && pageName !== '/' && !pageName.includes('?')) {
                pageName = pageName + '.html';
            }
            
            if (pageName.includes('?')) {
                pageName = pageName.split('?')[0];
            }
            
            if (pageName.includes('#')) {
                pageName = pageName.split('#')[0];
            }
            
            return pageName;
        },

        getAlternateLangUrl: function() {
            const currentLang = this.detectLanguage();
            const targetLang = currentLang === 'fr' ? 'en' : 'fr';
            const currentPage = this.getCurrentPageName();
            
            let targetPage = null;
            
            const directMapping = this.pageMapping[currentLang];
            if (directMapping && directMapping[currentPage]) {
                targetPage = directMapping[currentPage];
            }
            
            if (!targetPage) {
                const reverseMapping = this.pageMapping[targetLang];
                if (reverseMapping) {
                    const reverseKey = Object.keys(reverseMapping).find(key => 
                        reverseMapping[key] === currentPage
                    );
                    
                    if (reverseKey) {
                        targetPage = reverseKey;
                    }
                }
            }
            
            if (!targetPage) {
                targetPage = 'index.html';
            }
            
            return `/pages/${targetLang}/${targetPage}`;
        }
    };

    // Templates HTML pour les headers - VERSION PORTAL
    const HEADER_FR = {
        html: `
        <header class="main-header" id="main-header">
            <nav class="header-nav" role="navigation" aria-label="Navigation principale">
                <div class="nav-container">
                    <!-- Logo optimisé mobile -->
                    <div class="nav-logo">
                        <a href="/pages/fr/index.html" class="logo-link" aria-label="Accueil Xtranumerik">
                            <img src="${CONFIG.LOGO_URL}" alt="Logo Xtranumerik" class="logo-img">
                        </a>
                    </div>

                    <!-- Navigation principale (desktop) -->
                    <ul class="nav-menu-desktop" id="nav-menu-desktop" role="menubar">
                        <li class="nav-item" role="none">
                            <a href="/pages/fr/index.html" class="nav-link" role="menuitem">Accueil</a>
                        </li>
                        <li class="nav-item dropdown" role="none">
                            <a href="javascript:void(0)" class="nav-link dropdown-toggle" role="menuitem" aria-haspopup="true" aria-expanded="false">Solutions <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li role="none"><a href="/pages/fr/industries.html" class="dropdown-link" role="menuitem">Industries</a></li>
                                <li role="none"><a href="/pages/fr/gyms.html" class="dropdown-link" role="menuitem">Gyms</a></li>
                                <li role="none"><a href="/pages/fr/restaurants.html" class="dropdown-link" role="menuitem">Restaurants</a></li>
                                <li role="none"><a href="/pages/fr/concessions-auto.html" class="dropdown-link" role="menuitem">Concessions Auto</a></li>
                                <li role="none"><a href="/pages/fr/hotels.html" class="dropdown-link" role="menuitem">Hôtels</a></li>
                                <li role="none"><a href="/pages/fr/centres-commerciaux.html" class="dropdown-link" role="menuitem">Centres Commerciaux</a></li>
                                <li role="none"><a href="/pages/fr/commerce-detail.html" class="dropdown-link" role="menuitem">Commerce de Détail</a></li>
                                <li role="none"><a href="/pages/fr/pharmacies.html" class="dropdown-link" role="menuitem">Pharmacies</a></li>
                                <li role="none"><a href="/pages/fr/cliniques-dentaires.html" class="dropdown-link" role="menuitem">Cliniques Dentaires</a></li>
                                <li role="none"><a href="/pages/fr/salons-coiffure.html" class="dropdown-link" role="menuitem">Salons de Coiffure</a></li>
                            </ul>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/fr/contact.html" class="nav-link" role="menuitem">Contact</a>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/fr/reseau-publicitaire.html" class="nav-link" role="menuitem">Réseau Publicitaire</a>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/fr/carte.html" class="nav-link" role="menuitem">Carte Interactive</a>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/fr/connexion.html" class="nav-link" role="menuitem">Connexion</a>
                        </li>
                    </ul>

                    <!-- Actions optimisées mobile -->
                    <div class="nav-actions">
                        <a href="javascript:void(0)" class="lang-switch" id="lang-switch" title="Switch to English">EN</a>
                        <a href="/pages/fr/contact.html" class="cta-button">Contactez-nous</a>
                        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        
        <!-- Portal Container pour le menu mobile - rendu en dehors du flux normal -->
        <div id="mobile-menu-portal" class="mobile-menu-portal"></div>
        `,
        mobileMenuContent: `
        <div class="mobile-menu-overlay" id="mobile-menu-overlay">
            <ul class="nav-menu-mobile" id="nav-menu-mobile" role="menubar">
                <li class="nav-item" role="none">
                    <a href="/pages/fr/index.html" class="nav-link" role="menuitem">Accueil</a>
                </li>
                <li class="nav-item dropdown-mobile" role="none">
                    <a href="javascript:void(0)" class="nav-link dropdown-toggle-mobile" role="menuitem">Solutions</a>
                    <ul class="dropdown-menu-mobile" role="menu">
                        <li role="none"><a href="/pages/fr/industries.html" class="dropdown-link" role="menuitem">Industries</a></li>
                        <li role="none"><a href="/pages/fr/gyms.html" class="dropdown-link" role="menuitem">Gyms</a></li>
                        <li role="none"><a href="/pages/fr/restaurants.html" class="dropdown-link" role="menuitem">Restaurants</a></li>
                        <li role="none"><a href="/pages/fr/concessions-auto.html" class="dropdown-link" role="menuitem">Concessions Auto</a></li>
                        <li role="none"><a href="/pages/fr/hotels.html" class="dropdown-link" role="menuitem">Hôtels</a></li>
                        <li role="none"><a href="/pages/fr/centres-commerciaux.html" class="dropdown-link" role="menuitem">Centres Commerciaux</a></li>
                        <li role="none"><a href="/pages/fr/commerce-detail.html" class="dropdown-link" role="menuitem">Commerce de Détail</a></li>
                        <li role="none"><a href="/pages/fr/pharmacies.html" class="dropdown-link" role="menuitem">Pharmacies</a></li>
                        <li role="none"><a href="/pages/fr/cliniques-dentaires.html" class="dropdown-link" role="menuitem">Cliniques Dentaires</a></li>
                        <li role="none"><a href="/pages/fr/salons-coiffure.html" class="dropdown-link" role="menuitem">Salons de Coiffure</a></li>
                    </ul>
                </li>
                <li class="nav-item" role="none">
                    <a href="/pages/fr/contact.html" class="nav-link" role="menuitem">Contact</a>
                </li>
                <li class="nav-item" role="none">
                    <a href="/pages/fr/reseau-publicitaire.html" class="nav-link" role="menuitem">Réseau Publicitaire</a>
                </li>
                <li class="nav-item" role="none">
                    <a href="/pages/fr/carte.html" class="nav-link" role="menuitem">Carte Interactive</a>
                </li>
                <li class="nav-item" role="none">
                    <a href="/pages/fr/connexion.html" class="nav-link" role="menuitem">Connexion</a>
                </li>
            </ul>
        </div>
        `,
        styles: `
        <style>
        /* SOLUTION PORTAL SANS Z-INDEX */
        
        /* Reset pour éviter déformations */
        .main-header * {
            box-sizing: border-box;
        }
        
        /* Header avec isolation */
        .main-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 100vw;
            background: rgba(25, 5, 68, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 169, 26, 0.2);
            transition: all 0.3s ease;
            overflow: visible;
            /* Pas de z-index - utilise l'ordre naturel du DOM */
            isolation: isolate; /* Crée un nouveau contexte d'empilement */
        }
        
        .header-nav {
            padding: 0;
            width: 100%;
            position: relative;
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 1.5rem;
            height: 65px;
            min-height: 65px;
            max-height: 65px;
        }
        
        /* Logo avec contraintes anti-déformation */
        .nav-logo {
            flex-shrink: 0;
            height: 100%;
            display: flex;
            align-items: center;
        }
        
        .nav-logo .logo-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            height: 100%;
            padding: 8px 0;
        }
        
        .logo-img {
            width: auto;
            height: 100%;
            max-height: 40px;
            max-width: 80px;
            border-radius: 8px;
            object-fit: contain;
        }
        
        /* Menu desktop */
        .nav-menu-desktop {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1.5rem;
            flex-grow: 1;
            justify-content: center;
        }
        
        .nav-item {
            position: relative;
        }
        
        .nav-link {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 0.75rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            border-radius: 6px;
            white-space: nowrap;
            min-height: 44px;
            min-width: 44px;
            justify-content: center;
        }
        
        .nav-link:hover {
            color: #ffa91a;
            background: rgba(255, 169, 26, 0.1);
        }
        
        .dropdown-toggle {
            cursor: pointer;
        }
        
        .dropdown-arrow {
            font-size: 0.7rem;
            transition: transform 0.3s ease;
        }
        
        .dropdown:hover .dropdown-arrow {
            transform: rotate(180deg);
        }
        
        /* Dropdown avec isolation */
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(25, 5, 68, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 169, 26, 0.2);
            border-radius: 12px;
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            list-style: none;
            margin: 0;
            padding: 0.5rem 0;
            margin-top: 0.5rem;
            max-height: 70vh;
            overflow-y: auto;
            isolation: isolate; /* Isolation au lieu de z-index */
        }
        
        .dropdown:hover .dropdown-menu,
        .dropdown:focus-within .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-link {
            display: block;
            color: white;
            text-decoration: none;
            padding: 0.6rem 1.2rem;
            transition: all 0.3s ease;
            font-weight: 400;
            font-size: 0.9rem;
            min-height: 44px;
            display: flex;
            align-items: center;
        }
        
        .dropdown-link:hover {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding-left: 1.5rem;
        }
        
        /* Actions */
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-shrink: 0;
            position: relative;
        }
        
        .lang-switch {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 169, 26, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 44px;
            min-height: 44px;
        }
        
        .lang-switch:hover {
            background: #ffa91a;
            color: #190544;
            transform: translateY(-2px);
        }
        
        .cta-button {
            background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            color: #190544;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 169, 26, 0.3);
            font-size: 0.85rem;
            white-space: nowrap;
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 169, 26, 0.4);
        }
        
        /* Menu burger mobile */
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            gap: 0.2rem;
            min-width: 44px;
            min-height: 44px;
            justify-content: center;
            align-items: center;
            border-radius: 6px;
            position: relative;
        }
        
        .mobile-menu-toggle:hover {
            background: rgba(255, 169, 26, 0.1);
        }
        
        .hamburger-line {
            width: 22px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        /* PORTAL MOBILE MENU - Rendu en dehors du contexte normal */
        .mobile-menu-portal {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            /* Pas de z-index nécessaire - portal le place au-dessus */
        }
        
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(25, 5, 68, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            overflow-y: auto;
            padding-top: 65px;
            pointer-events: none;
        }
        
        .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }
        
        .nav-menu-mobile {
            list-style: none;
            margin: 0;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0;
        }
        
        .nav-menu-mobile .nav-item {
            width: 100%;
            border-bottom: 1px solid rgba(255, 169, 26, 0.1);
            margin-bottom: 0.5rem;
        }
        
        .nav-menu-mobile .nav-item:last-child {
            border-bottom: none;
        }
        
        .nav-menu-mobile .nav-link {
            padding: 1rem 0;
            font-size: 1.1rem;
            justify-content: center;
            width: 100%;
            min-height: 48px;
            font-weight: 600;
        }
        
        .dropdown-menu-mobile {
            list-style: none;
            margin: 0.5rem 0;
            padding: 0;
            background: rgba(255, 169, 26, 0.1);
            border-radius: 8px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .dropdown-mobile.active .dropdown-menu-mobile {
            max-height: 500px;
        }
        
        .dropdown-menu-mobile .dropdown-link {
            padding: 0.8rem;
            text-align: center;
            font-size: 1rem;
            min-height: 48px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-menu-desktop {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-container {
                padding: 0.5rem 0.75rem;
                height: 55px;
                min-height: 55px;
                max-height: 55px;
            }
            
            .logo-img {
                max-height: 32px;
                max-width: 65px;
            }
            
            .nav-actions {
                gap: 0.4rem;
            }
            
            .cta-button {
                padding: 0.3rem 0.6rem;
                font-size: 0.75rem;
            }
            
            .lang-switch {
                padding: 0.3rem 0.5rem;
                font-size: 0.75rem;
            }
            
            .mobile-menu-overlay {
                padding-top: 55px;
            }
        }
        
        /* Très petits écrans */
        @media (max-width: 480px) {
            .nav-container {
                padding: 0.4rem 0.5rem;
                height: 50px;
                min-height: 50px;
                max-height: 50px;
            }
            
            .mobile-menu-overlay {
                padding-top: 50px;
            }
            
            .logo-img {
                max-height: 28px;
                max-width: 55px;
            }
            
            .cta-button {
                padding: 0.25rem 0.5rem;
                font-size: 0.7rem;
            }
            
            .lang-switch {
                padding: 0.25rem 0.4rem;
                font-size: 0.7rem;
            }
            
            .hamburger-line {
                width: 18px;
            }
        }
        
        /* Desktop large */
        @media (min-width: 1200px) {
            .nav-container {
                padding: 1rem 2rem;
                height: 70px;
                min-height: 70px;
                max-height: 70px;
            }
            
            .logo-img {
                max-height: 45px;
                max-width: 85px;
            }
            
            .nav-menu-desktop {
                gap: 2rem;
            }
            
            .nav-link {
                font-size: 1rem;
                padding: 0.6rem 1rem;
            }
            
            .nav-actions {
                gap: 1rem;
            }
            
            .cta-button {
                padding: 0.6rem 1.2rem;
                font-size: 0.9rem;
            }
            
            .lang-switch {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
        }
        
        /* Ajustement du body */
        body {
            padding-top: 65px;
        }
        
        @media (max-width: 768px) {
            body {
                padding-top: 55px;
            }
        }
        
        @media (max-width: 480px) {
            body {
                padding-top: 50px;
            }
        }
        
        @media (min-width: 1200px) {
            body {
                padding-top: 70px;
            }
        }
        </style>
        `
    };

    const HEADER_EN = {
        html: HEADER_FR.html.replace(/fr\//g, 'en/')
            .replace('Navigation principale', 'Main navigation')
            .replace('Accueil Xtranumerik', 'Xtranumerik Home')
            .replace('Accueil', 'Home')
            .replace('Réseau Publicitaire', 'Advertising Network')
            .replace('Carte Interactive', 'Interactive Map')
            .replace('Connexion', 'Login')
            .replace('Contactez-nous', 'Contact Us')
            .replace('Switch to English', 'Passer au français')
            .replace('>EN<', '>FR<')
            .replace('Concessions Auto', 'Car Dealerships')
            .replace('Hôtels', 'Hotels')
            .replace('Centres Commerciaux', 'Shopping Centers')
            .replace('Commerce de Détail', 'Retail Stores')
            .replace('Cliniques Dentaires', 'Dental Clinics')
            .replace('Salons de Coiffure', 'Hair Salons'),
        mobileMenuContent: HEADER_FR.mobileMenuContent.replace(/fr\//g, 'en/')
            .replace('Accueil', 'Home')
            .replace('Réseau Publicitaire', 'Advertising Network')
            .replace('Carte Interactive', 'Interactive Map')
            .replace('Connexion', 'Login')
            .replace('Concessions Auto', 'Car Dealerships')
            .replace('Hôtels', 'Hotels')
            .replace('Centres Commerciaux', 'Shopping Centers')
            .replace('Commerce de Détail', 'Retail Stores')
            .replace('Cliniques Dentaires', 'Dental Clinics')
            .replace('Salons de Coiffure', 'Hair Salons'),
        styles: HEADER_FR.styles
    };

    // Fonction principale d'injection
    async function injectHeader() {
        console.log('🚀 === INJECTION HEADER PORTAL SANS Z-INDEX - DÉBUT ===');
        
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;
        
        console.log('📋 Header sélectionné:', language.toUpperCase());
        console.log('📱 Mobile détecté:', CONFIG.isMobile());

        // Injection des styles
        if (!document.getElementById('auto-header-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'auto-header-styles';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
            console.log('🎨 Styles injectés');
        }

        // Injection du HTML
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerConfig.html;
        
        // Insérer le header et le portal container
        while (headerContainer.firstChild) {
            document.body.insertBefore(headerContainer.firstChild, document.body.firstChild);
        }
        
        console.log('🏗️ HTML du header injecté');

        // Initialisation des interactions
        initializeHeaderInteractions(headerConfig);
        
        console.log('✅ Header', language.toUpperCase(), 'injecté avec SOLUTION PORTAL');
        console.log('🚀 === INJECTION HEADER PORTAL SANS Z-INDEX - FIN ===');
    }

    // Fonction d'initialisation des interactions avec PORTAL
    function initializeHeaderInteractions(headerConfig) {
        console.log('⚡ === INIT INTERACTIONS PORTAL ===');
        
        // Configuration du bouton de changement de langue
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            function updateLanguageSwitchLink() {
                const targetUrl = CONFIG.getAlternateLangUrl();
                langSwitch.href = targetUrl;
                console.log('🔗 Lien translation:', targetUrl);
                return targetUrl;
            }
            
            updateLanguageSwitchLink();
            
            langSwitch.addEventListener('click', function(event) {
                event.preventDefault();
                const finalTargetUrl = updateLanguageSwitchLink();
                window.location.href = finalTargetUrl;
            });
        }

        // Menu mobile avec PORTAL
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const portal = document.getElementById('mobile-menu-portal');

        if (mobileToggle && portal) {
            let mobileMenuOverlay = null;
            
            function createMobileMenu() {
                if (!mobileMenuOverlay) {
                    // Créer le menu mobile dans le portal
                    const menuContainer = document.createElement('div');
                    menuContainer.innerHTML = headerConfig.mobileMenuContent;
                    mobileMenuOverlay = menuContainer.firstElementChild;
                    portal.appendChild(mobileMenuOverlay);
                    
                    // Ajouter les event listeners pour les dropdowns mobiles
                    const dropdownToggles = mobileMenuOverlay.querySelectorAll('.dropdown-toggle-mobile');
                    dropdownToggles.forEach(toggle => {
                        toggle.addEventListener('click', function(e) {
                            e.preventDefault();
                            const parent = this.closest('.dropdown-mobile');
                            parent.classList.toggle('active');
                        });
                    });
                    
                    // Fermer le menu en cliquant sur l'overlay
                    mobileMenuOverlay.addEventListener('click', function(event) {
                        if (event.target === mobileMenuOverlay) {
                            toggleMobileMenu();
                        }
                    });
                }
                return mobileMenuOverlay;
            }
            
            function toggleMobileMenu() {
                const overlay = createMobileMenu();
                const isActive = mobileToggle.classList.toggle('active');
                overlay.classList.toggle('active', isActive);
                
                // Mise à jour ARIA
                mobileToggle.setAttribute('aria-expanded', isActive.toString());
                
                // Gestion overflow body
                if (isActive) {
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                } else {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
                
                console.log('📱 Menu portal basculé:', isActive ? 'OUVERT' : 'FERMÉ');
            }
            
            mobileToggle.addEventListener('click', function(event) {
                event.preventDefault();
                toggleMobileMenu();
            });
            
            // Fermeture menu mobile avec touche Escape
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && mobileMenuOverlay) {
                    if (mobileMenuOverlay.classList.contains('active')) {
                        mobileMenuOverlay.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                        
                        mobileToggle.focus();
                    }
                }
            });
            
            console.log('✅ Menu mobile portal configuré');
        }

        // Effets de scroll
        let scrollTimeout;
        let lastScrollTop = 0;
        let ticking = false;
        
        function handleScroll() {
            const header = document.getElementById('main-header');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                if (currentScroll > lastScrollTop && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                if (currentScroll > 50) {
                    header.style.background = 'rgba(25, 5, 68, 0.98)';
                } else {
                    header.style.background = 'rgba(25, 5, 68, 0.95)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });

        // Mise en évidence du lien actif
        highlightActiveLink();
        
        console.log('⚡ === INTERACTIONS PORTAL INITIALISÉES ===');
    }

    // Fonction de mise en évidence du lien actif
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.style.color = '#ffa91a';
                link.style.fontWeight = '700';
                link.style.background = 'rgba(255, 169, 26, 0.1)';
            }
        });
    }

    // Lancement automatique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

    console.log('🎯 ✅ Script de header PORTAL SANS Z-INDEX chargé avec succès!');

})();