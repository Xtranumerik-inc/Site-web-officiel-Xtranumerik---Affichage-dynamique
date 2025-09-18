/**
 * Script d'injection automatique du header - VERSION MOBILE OPTIMISÉE
 * DATE: 18 septembre 2025
 * 
 * 🔧 CORRECTIONS MOBILES :
 * ✅ Logo sans déformation mobile
 * ✅ Layout flexbox robuste
 * ✅ Menu burger stable
 * ✅ Breakpoints optimisés (320px, 480px, 768px)
 * ✅ Support tactile amélioré
 * ✅ Performance optimisée
 * ✅ CSS mobile-fixes-2025.css intégré automatiquement
 * 🔧 SOLUTION OVERLAY FULL-SCREEN - FIX VISIBILITÉ MENU
 * ✅ Gestion overflow body menu mobile
 * ✅ Touch targets 44px minimum
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

    // Fonction pour charger le CSS mobile-fixes-2025.css
    function loadMobileFixes() {
        return new Promise((resolve, reject) => {
            // Vérifier si déjà chargé
            if (document.getElementById('mobile-fixes-2025-css')) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.id = 'mobile-fixes-2025-css';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '/assets/css/mobile-fixes-2025.css';
            
            link.onload = () => {
                console.log('✅ CSS mobile-fixes-2025.css chargé avec succès');
                resolve();
            };
            
            link.onerror = () => {
                console.warn('⚠️ Échec chargement mobile-fixes-2025.css, application inline');
                resolve(); // Continue même si échec
            };

            document.head.appendChild(link);
        });
    }

    // Templates HTML pour les headers - VERSION OVERLAY FULL-SCREEN
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

                    <!-- Navigation principale -->
                    <ul class="nav-menu" id="nav-menu" role="menubar">
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
            
            <!-- 🔧 NOUVELLE SOLUTION: Overlay full-screen pour mobile -->
            <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
        </header>
        `,
        styles: `
        <style>
        /* Reset pour éviter déformations */
        .main-header * {
            box-sizing: border-box;
        }
        
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
            z-index: 1000;
            transition: all 0.3s ease;
            overflow: visible;
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
        
        .nav-menu {
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
            z-index: 100;
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
        
        /* Actions avec contraintes optimisées touch targets */
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
        
        /* Menu burger mobile optimisé touch targets */
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
            z-index: 1001;
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
        
        /* 🔧 NOUVELLE SOLUTION: Overlay full-screen */
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
            z-index: 999;
            overflow-y: auto;
            padding-top: 65px;
        }
        
        .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Responsive mobile avec overlay full-screen */
        @media (max-width: 768px) {
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
            
            .nav-menu {
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
                flex-direction: column;
                padding: 80px 2rem 2rem;
                gap: 0;
                opacity: 0;
                visibility: hidden;
                transform: translateX(-100%);
                transition: all 0.3s ease;
                justify-content: flex-start;
                z-index: 1000;
                overflow-y: auto;
            }
            
            .nav-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateX(0);
            }
            
            .mobile-menu-overlay {
                padding-top: 55px;
            }
            
            .nav-item {
                width: 100%;
                border-bottom: 1px solid rgba(255, 169, 26, 0.1);
                margin-bottom: 0.5rem;
            }
            
            .nav-item:last-child {
                border-bottom: none;
            }
            
            .nav-link {
                padding: 1rem 0;
                font-size: 1.1rem;
                justify-content: center;
                width: 100%;
                min-height: 48px;
                font-weight: 600;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-actions {
                gap: 0.4rem;
            }
            
            .cta-button {
                padding: 0.3rem 0.6rem;
                font-size: 0.75rem;
                min-width: 44px;
                min-height: 44px;
            }
            
            .lang-switch {
                padding: 0.3rem 0.5rem;
                font-size: 0.75rem;
                min-width: 44px;
                min-height: 44px;
            }
            
            /* Dropdown mobile simplifié */
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border: none;
                background: rgba(255, 169, 26, 0.1);
                margin: 0.5rem 0;
                border-radius: 8px;
                width: 100%;
                z-index: auto;
                max-height: none;
            }
            
            .dropdown-link {
                padding: 0.8rem;
                text-align: center;
                font-size: 1rem;
                min-height: 48px;
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
            
            .nav-menu {
                padding: 70px 1.5rem 1.5rem;
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
                min-width: 44px;
                min-height: 44px;
            }
            
            .lang-switch {
                padding: 0.25rem 0.4rem;
                font-size: 0.7rem;
                min-width: 44px;
                min-height: 44px;
            }
            
            .mobile-menu-toggle {
                min-width: 44px;
                min-height: 44px;
                padding: 0.3rem;
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
            
            .nav-menu {
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
                min-height: 44px;
            }
            
            .lang-switch {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
                min-width: 44px;
                min-height: 44px;
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
        html: `
        <header class="main-header" id="main-header">
            <nav class="header-nav" role="navigation" aria-label="Main navigation">
                <div class="nav-container">
                    <!-- Logo optimisé mobile -->
                    <div class="nav-logo">
                        <a href="/pages/en/index.html" class="logo-link" aria-label="Xtranumerik Home">
                            <img src="${CONFIG.LOGO_URL}" alt="Xtranumerik Logo" class="logo-img">
                        </a>
                    </div>

                    <!-- Main Navigation -->
                    <ul class="nav-menu" id="nav-menu" role="menubar">
                        <li class="nav-item" role="none">
                            <a href="/pages/en/index.html" class="nav-link" role="menuitem">Home</a>
                        </li>
                        <li class="nav-item dropdown" role="none">
                            <a href="javascript:void(0)" class="nav-link dropdown-toggle" role="menuitem" aria-haspopup="true" aria-expanded="false">Solutions <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li role="none"><a href="/pages/en/industries.html" class="dropdown-link" role="menuitem">Industries</a></li>
                                <li role="none"><a href="/pages/en/gyms.html" class="dropdown-link" role="menuitem">Gyms</a></li>
                                <li role="none"><a href="/pages/en/restaurants.html" class="dropdown-link" role="menuitem">Restaurants</a></li>
                                <li role="none"><a href="/pages/en/car-dealerships.html" class="dropdown-link" role="menuitem">Car Dealerships</a></li>
                                <li role="none"><a href="/pages/en/hotels.html" class="dropdown-link" role="menuitem">Hotels</a></li>
                                <li role="none"><a href="/pages/en/shopping-centers.html" class="dropdown-link" role="menuitem">Shopping Centers</a></li>
                                <li role="none"><a href="/pages/en/retail-stores.html" class="dropdown-link" role="menuitem">Retail Stores</a></li>
                                <li role="none"><a href="/pages/en/pharmacies.html" class="dropdown-link" role="menuitem">Pharmacies</a></li>
                                <li role="none"><a href="/pages/en/dental-clinics.html" class="dropdown-link" role="menuitem">Dental Clinics</a></li>
                                <li role="none"><a href="/pages/en/hair-salons.html" class="dropdown-link" role="menuitem">Hair Salons</a></li>
                            </ul>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/en/contact.html" class="nav-link" role="menuitem">Contact</a>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/en/advertising-network.html" class="nav-link" role="menuitem">Advertising Network</a>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/en/map.html" class="nav-link" role="menuitem">Interactive Map</a>
                        </li>
                        <li class="nav-item" role="none">
                            <a href="/pages/en/login.html" class="nav-link" role="menuitem">Login</a>
                        </li>
                    </ul>

                    <!-- Actions optimisées mobile -->
                    <div class="nav-actions">
                        <a href="javascript:void(0)" class="lang-switch" id="lang-switch" title="Passer au français">FR</a>
                        <a href="/pages/en/contact.html" class="cta-button">Contact Us</a>
                        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
            
            <!-- 🔧 NOUVELLE SOLUTION: Overlay full-screen pour mobile -->
            <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
        </header>
        `,
        styles: HEADER_FR.styles // Mêmes styles
    };

    // Fonction principale d'injection
    async function injectHeader() {
        console.log('🚀 === INJECTION HEADER OVERLAY FULL-SCREEN - DÉBUT ===');
        
        // Charger d'abord le CSS mobile-fixes-2025.css
        await loadMobileFixes();
        
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
        const headerElement = headerContainer.firstElementChild;
        
        // Insérer le header au début du body
        document.body.insertBefore(headerElement, document.body.firstChild);
        console.log('🏗️ HTML du header injecté');

        // Initialisation des interactions
        initializeHeaderInteractions();
        
        console.log('✅ Header', language.toUpperCase(), 'injecté avec SOLUTION OVERLAY FULL-SCREEN');
        console.log('🚀 === INJECTION HEADER OVERLAY FULL-SCREEN - FIN ===');
    }

    // Fonction d'initialisation des interactions avec OVERLAY FULL-SCREEN
    function initializeHeaderInteractions() {
        console.log('⚡ === INIT INTERACTIONS OVERLAY ===');
        
        // Configuration du bouton de changement de langue
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            console.log('🔍 Bouton de changement de langue trouvé');
            
            function updateLanguageSwitchLink() {
                const targetUrl = CONFIG.getAlternateLangUrl();
                langSwitch.href = targetUrl;
                console.log('🔗 ✅ LIEN TRANSLATION CORRIGÉ:', targetUrl);
                return targetUrl;
            }
            
            // Mise à jour initiale du lien
            updateLanguageSwitchLink();
            
            // Gestionnaire de clic
            langSwitch.addEventListener('click', function(event) {
                event.preventDefault();
                
                console.log('🖱️ === CLIC TRADUCTION DÉTECTÉ ===');
                
                const finalTargetUrl = updateLanguageSwitchLink();
                
                console.log('🚀 🌐 NAVIGATION VERS:', finalTargetUrl);
                console.log('🚀 📍 DEPUIS:', window.location.href);
                
                window.location.href = finalTargetUrl;
            });
            
            console.log('✅ ⚡ GESTIONNAIRE DE TRADUCTION CONFIGURÉ');
        } else {
            console.error('❌ ERREUR: Bouton de changement de langue NON TROUVÉ!');
        }

        // 🔧 NOUVELLE SOLUTION: Menu mobile avec overlay full-screen
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const mobileOverlay = document.getElementById('mobile-menu-overlay');

        if (mobileToggle && navMenu && mobileOverlay) {
            function toggleMobileMenu() {
                const isActive = mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active', isActive);
                mobileOverlay.classList.toggle('active', isActive);
                
                // Mise à jour ARIA
                mobileToggle.setAttribute('aria-expanded', isActive.toString());
                
                // 🔧 Gestion overflow body simplifiée
                if (isActive) {
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                } else {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
                
                console.log('📱 Menu overlay basculé:', isActive ? 'OUVERT' : 'FERMÉ');
            }
            
            mobileToggle.addEventListener('click', function(event) {
                event.preventDefault();
                toggleMobileMenu();
            });
            
            // Fermer le menu en cliquant sur l'overlay
            mobileOverlay.addEventListener('click', function(event) {
                if (event.target === mobileOverlay) {
                    toggleMobileMenu();
                }
            });
            
            console.log('✅ Menu mobile overlay configuré');
        }

        // Fermeture menu mobile avec touche Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu && mobileToggle && mobileOverlay) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    
                    // Restaurer overflow body
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                    
                    mobileToggle.focus(); // Restaurer le focus pour accessibilité
                }
            }
        });

        // Effets de scroll optimisés avec throttling
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
        
        // Optimisation scroll avec requestAnimationFrame
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });

        // Mise en évidence du lien actif
        highlightActiveLink();
        
        console.log('⚡ === INTERACTIONS OVERLAY INITIALISÉES ===');
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

    console.log('🎯 ✅ Script de header OVERLAY FULL-SCREEN chargé avec succès!');

})();