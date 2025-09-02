/**
 * Script d'injection automatique du header - VERSION MOBILE CORRIGÉE
 * DATE: 2 septembre 2025
 * 
 * 🔧 CORRECTIONS DÉFORMATION MOBILE :
 * ✅ Layout flexbox robuste sans déformation
 * ✅ Contraintes précises largeur/hauteur
 * ✅ Breakpoints mobile optimisés
 * ✅ Support iPhone/Android/tablettes
 * ✅ Menu burger stable
 * ✅ Logo proportionnel
 * ✅ Test 320px-1200px validé
 */

(function() {
    'use strict';

    // Configuration avec optimisations anti-déformation
    const CONFIG = {
        LOGO_URL: '/data/images/LOGO%20Xtranumerik%20fond%20mauve%20(1920%20x%201080%20px).png',
        
        // Détection précise d'appareil mobile
        isMobile: function() {
            return window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        isVerySmallScreen: function() {
            return window.innerWidth <= 480;
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

    // Templates HTML pour les headers - VERSION ANTI-DÉFORMATION
    const HEADER_FR = {
        html: `
        <header class="main-header mobile-fixed" id="main-header">
            <nav class="header-nav" role="navigation" aria-label="Navigation principale">
                <div class="nav-container">
                    <!-- Logo avec contraintes fixes -->
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
                            <ul class="dropdown-menu" role="menu" aria-label="Solutions">
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

                    <!-- Actions avec contraintes fixes -->
                    <div class="nav-actions">
                        <a href="javascript:void(0)" class="lang-switch" id="lang-switch" title="Switch to English" aria-label="Changer la langue vers l'anglais">EN</a>
                        <a href="/pages/fr/contact.html" class="cta-button">Contactez-nous</a>
                        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-menu">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        `,
        styles: `
        <style>
        /* Reset complet pour éviter les déformations */
        .main-header.mobile-fixed * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        /* Header principal avec contraintes strictes */
        .main-header.mobile-fixed {
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
            overflow: hidden;
        }
        
        .header-nav {
            padding: 0;
            position: relative;
            width: 100%;
            max-width: 100%;
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            height: 65px;
            min-height: 65px;
            max-height: 65px;
            width: 100%;
            position: relative;
        }
        
        /* Logo avec contraintes fixes anti-déformation */
        .nav-logo {
            flex-shrink: 0;
            width: auto;
            min-width: 60px;
            max-width: 120px;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .nav-logo .logo-link {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            touch-action: manipulation;
            width: 100%;
            height: 100%;
            padding: 8px 0;
        }
        
        .logo-img {
            width: auto;
            height: 100%;
            max-height: 40px;
            max-width: 80px;
            min-width: 50px;
            border-radius: 8px;
            object-fit: contain;
            transition: transform 0.3s ease;
            display: block;
        }
        
        .logo-img:hover {
            transform: scale(1.05);
        }
        
        /* Navigation principale avec contraintes */
        .nav-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
            position: static;
            background: transparent;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        
        .nav-item {
            position: relative;
            flex-shrink: 0;
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
            touch-action: manipulation;
            height: 40px;
            font-size: 0.9rem;
            white-space: nowrap;
            line-height: 1;
        }
        
        .nav-link:hover,
        .nav-link:focus {
            color: #ffa91a;
            background: rgba(255, 169, 26, 0.1);
        }
        
        .dropdown-toggle {
            cursor: pointer;
        }
        
        .dropdown-arrow {
            font-size: 0.7rem;
            transition: transform 0.3s ease;
            margin-left: 0.25rem;
        }
        
        .dropdown:hover .dropdown-arrow {
            transform: rotate(180deg);
        }
        
        /* Dropdown avec contraintes */
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(25, 5, 68, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 169, 26, 0.2);
            border-radius: 10px;
            min-width: 180px;
            max-width: 250px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            list-style: none;
            margin: 0;
            padding: 0.5rem 0;
            margin-top: 0.5rem;
            max-height: 70vh;
            overflow-y: auto;
            z-index: 1001;
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
            padding: 0.6rem 1rem;
            transition: all 0.3s ease;
            font-weight: 400;
            border-radius: 6px;
            margin: 0 0.5rem;
            touch-action: manipulation;
            height: auto;
            font-size: 0.85rem;
            line-height: 1.2;
        }
        
        .dropdown-link:hover,
        .dropdown-link:focus {
            background: rgba(255, 169, 26, 0.15);
            color: #ffa91a;
            transform: translateX(5px);
        }
        
        /* Actions avec contraintes strictes */
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-shrink: 0;
            height: 100%;
            min-width: fit-content;
        }
        
        .lang-switch {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding: 0.4rem 0.6rem;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.8rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 169, 26, 0.3);
            cursor: pointer;
            touch-action: manipulation;
            width: 36px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .lang-switch:hover,
        .lang-switch:focus {
            background: #ffa91a;
            color: #190544;
            transform: translateY(-1px) scale(1.05);
        }
        
        .cta-button {
            background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            color: #190544;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 3px 10px rgba(255, 169, 26, 0.3);
            touch-action: manipulation;
            height: 32px;
            display: flex;
            align-items: center;
            font-size: 0.75rem;
            white-space: nowrap;
            flex-shrink: 0;
            min-width: fit-content;
        }
        
        .cta-button:hover,
        .cta-button:focus {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(255, 169, 26, 0.4);
        }
        
        /* Menu mobile hamburger avec contraintes */
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.4rem;
            gap: 0.2rem;
            touch-action: manipulation;
            width: 36px;
            height: 32px;
            justify-content: center;
            align-items: center;
            border-radius: 6px;
            transition: background-color 0.3s ease;
            flex-shrink: 0;
        }
        
        .mobile-menu-toggle:hover,
        .mobile-menu-toggle:focus {
            background: rgba(255, 169, 26, 0.1);
        }
        
        .hamburger-line {
            width: 20px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
            border-radius: 1px;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(4px, 4px);
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(4px, -4px);
        }
        
        /* Responsive avec breakpoints précis */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0.5rem 0.75rem;
                height: 55px;
                min-height: 55px;
                max-height: 55px;
            }
            
            .nav-menu {
                position: fixed;
                top: 55px;
                left: 0;
                right: 0;
                width: 100vw;
                background: rgba(25, 5, 68, 0.98);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 1rem;
                gap: 0;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                max-height: calc(100vh - 55px);
                overflow-y: auto;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                justify-content: flex-start;
            }
            
            .nav-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .nav-item {
                width: 100%;
                border-bottom: 1px solid rgba(255, 169, 26, 0.1);
            }
            
            .nav-item:last-child {
                border-bottom: none;
            }
            
            .nav-link {
                padding: 0.75rem 0;
                font-size: 1rem;
                justify-content: center;
                width: 100%;
                height: auto;
                min-height: 44px;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-actions {
                gap: 0.4rem;
            }
            
            .cta-button {
                padding: 0.3rem 0.6rem;
                font-size: 0.7rem;
                height: 28px;
            }
            
            .lang-switch {
                padding: 0.3rem 0.5rem;
                font-size: 0.7rem;
                width: 32px;
                height: 28px;
            }
            
            .logo-img {
                max-height: 32px;
                max-width: 60px;
                min-width: 40px;
            }
            
            .nav-logo {
                min-width: 50px;
                max-width: 80px;
            }
            
            /* Dropdown mobile */
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border: none;
                background: rgba(255, 169, 26, 0.1);
                margin: 0.5rem 0 0 0;
                border-radius: 6px;
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
                max-height: none;
                min-width: auto;
                max-width: none;
                width: 100%;
            }
            
            .dropdown-link {
                padding: 0.6rem;
                margin: 0;
                border-radius: 0;
                text-align: center;
                font-size: 0.9rem;
                min-height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        
        /* Très petits écrans (iPhone SE, etc.) */
        @media (max-width: 480px) {
            .nav-container {
                padding: 0.4rem 0.5rem;
                height: 50px;
                min-height: 50px;
                max-height: 50px;
            }
            
            .nav-menu {
                top: 50px;
                max-height: calc(100vh - 50px);
            }
            
            .logo-img {
                max-height: 28px;
                max-width: 50px;
                min-width: 35px;
            }
            
            .nav-logo {
                min-width: 45px;
                max-width: 65px;
            }
            
            .cta-button {
                padding: 0.25rem 0.5rem;
                font-size: 0.65rem;
                height: 26px;
            }
            
            .lang-switch {
                padding: 0.25rem 0.4rem;
                font-size: 0.65rem;
                width: 28px;
                height: 26px;
            }
            
            .mobile-menu-toggle {
                width: 32px;
                height: 28px;
                padding: 0.3rem;
            }
            
            .hamburger-line {
                width: 18px;
                height: 2px;
            }
        }
        
        /* Écrans ultra-larges */
        @media (min-width: 1200px) {
            .nav-container {
                padding: 1rem 2rem;
                height: 70px;
                min-height: 70px;
                max-height: 70px;
            }
            
            .nav-menu {
                gap: 1.5rem;
            }
            
            .nav-actions {
                gap: 0.75rem;
            }
            
            .cta-button {
                padding: 0.6rem 1.2rem;
                font-size: 0.9rem;
                height: 36px;
            }
            
            .lang-switch {
                padding: 0.5rem 0.8rem;
                font-size: 0.85rem;
                width: 40px;
                height: 36px;
            }
            
            .logo-img {
                max-height: 45px;
                max-width: 85px;
            }
            
            .nav-link {
                font-size: 1rem;
                padding: 0.6rem 1rem;
                height: 44px;
            }
        }
        
        /* Mode sombre */
        @media (prefers-color-scheme: dark) {
            .main-header.mobile-fixed {
                background: rgba(15, 23, 42, 0.95);
            }
            
            .dropdown-menu {
                background: rgba(15, 23, 42, 0.98);
            }
        }
        
        /* Réduction des mouvements */
        @media (prefers-reduced-motion: reduce) {
            .main-header.mobile-fixed,
            .nav-link,
            .dropdown-menu,
            .lang-switch,
            .cta-button,
            .hamburger-line {
                transition: none !important;
            }
            
            .dropdown:hover .dropdown-arrow {
                transform: none;
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
        <header class="main-header mobile-fixed" id="main-header">
            <nav class="header-nav" role="navigation" aria-label="Main navigation">
                <div class="nav-container">
                    <!-- Logo avec contraintes fixes -->
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
                            <ul class="dropdown-menu" role="menu" aria-label="Solutions">
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

                    <!-- Actions avec contraintes fixes -->
                    <div class="nav-actions">
                        <a href="javascript:void(0)" class="lang-switch" id="lang-switch" title="Passer au français" aria-label="Switch language to French">FR</a>
                        <a href="/pages/en/contact.html" class="cta-button">Contact Us</a>
                        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        `,
        styles: HEADER_FR.styles // Mêmes styles anti-déformation
    };

    // Fonction principale d'injection anti-déformation
    function injectHeader() {
        console.log('🚀 === INJECTION HEADER ANTI-DÉFORMATION - DÉBUT ===');
        
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;
        
        console.log('📋 Header anti-déformation sélectionné:', language.toUpperCase());
        console.log('📱 Mobile détecté:', CONFIG.isMobile());
        console.log('📱 Très petit écran:', CONFIG.isVerySmallScreen());

        // Injection des styles anti-déformation
        if (!document.getElementById('auto-header-mobile-fixed-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'auto-header-mobile-fixed-styles';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
            console.log('🎨 Styles anti-déformation injectés');
        }

        // Injection du HTML
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerConfig.html;
        const headerElement = headerContainer.firstElementChild;
        
        // Insérer le header au début du body
        document.body.insertBefore(headerElement, document.body.firstChild);
        console.log('🏗️ HTML du header anti-déformation injecté');

        // Initialisation des interactions anti-déformation
        initializeFixedHeaderInteractions();
        
        console.log('✅ Header anti-déformation', language.toUpperCase(), 'injecté avec succès');
        console.log('🚀 === INJECTION HEADER ANTI-DÉFORMATION - FIN ===');
    }

    // Fonction d'initialisation des interactions avec corrections de déformation
    function initializeFixedHeaderInteractions() {
        console.log('⚡ === INIT INTERACTIONS ANTI-DÉFORMATION ===');
        
        // Configuration du bouton de changement de langue
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            console.log('🔍 Bouton de changement de langue trouvé');
            
            function updateLanguageSwitchLink() {
                const targetUrl = CONFIG.getAlternateLangUrl();
                langSwitch.href = targetUrl;
                console.log('🔗 ✅ LIEN TRANSLATION ANTI-DÉFORMATION CORRIGÉ:', targetUrl);
                return targetUrl;
            }
            
            // Mise à jour initiale du lien
            updateLanguageSwitchLink();
            
            // Gestionnaire de clic
            langSwitch.addEventListener('click', function(event) {
                event.preventDefault();
                
                console.log('🖱️ === CLIC TRADUCTION ANTI-DÉFORMATION DÉTECTÉ ===');
                
                const finalTargetUrl = updateLanguageSwitchLink();
                
                console.log('🚀 🌐 NAVIGATION VERS:', finalTargetUrl);
                console.log('🚀 📍 DEPUIS:', window.location.href);
                
                window.location.href = finalTargetUrl;
            });
            
            // Support du clavier
            langSwitch.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
            });
            
            console.log('✅ ⚡ GESTIONNAIRE DE TRADUCTION ANTI-DÉFORMATION CONFIGURÉ');
        }

        // Menu mobile anti-déformation
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            function toggleMobileMenu() {
                const isActive = mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active', isActive);
                
                // Mise à jour ARIA
                mobileToggle.setAttribute('aria-expanded', isActive.toString());
                mobileToggle.setAttribute('aria-label', isActive ? 'Fermer le menu' : 'Ouvrir le menu');
                
                // Gestion du scroll body
                if (isActive) {
                    document.body.style.overflow = 'hidden';
                    const firstLink = navMenu.querySelector('.nav-link');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                } else {
                    document.body.style.overflow = '';
                }
                
                console.log('📱 Menu mobile anti-déformation basculé:', isActive ? 'OUVERT' : 'FERMÉ');
            }
            
            // Gestionnaires d'événements
            mobileToggle.addEventListener('click', function(event) {
                event.preventDefault();
                toggleMobileMenu();
            });
            
            // Support tactile amélioré
            let touchStartY = 0;
            mobileToggle.addEventListener('touchstart', function(event) {
                touchStartY = event.touches[0].clientY;
            }, { passive: true });
            
            mobileToggle.addEventListener('touchend', function(event) {
                const touchEndY = event.changedTouches[0].clientY;
                const touchDiff = Math.abs(touchEndY - touchStartY);
                
                if (touchDiff < 10) {
                    event.preventDefault();
                    toggleMobileMenu();
                }
            }, { passive: false });
            
            // Support clavier
            mobileToggle.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleMobileMenu();
                }
            });
            
            console.log('✅ Menu mobile anti-déformation configuré');
        }

        // Fermeture automatique du menu
        document.addEventListener('click', function(event) {
            if (navMenu && mobileToggle) {
                if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Fermeture avec Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');
                document.body.style.overflow = '';
                mobileToggle.focus();
            }
        });
        
        // Gestion du redimensionnement sans déformation
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 250);
        });

        // Effets de scroll optimisés sans déformation
        let scrollTimeout;
        let lastScrollTop = 0;
        const scrollThreshold = 5;
        
        function handleScroll() {
            const header = document.getElementById('main-header');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDiff = Math.abs(currentScroll - lastScrollTop);
            
            if (scrollDiff < scrollThreshold) return;

            if (header) {
                if (currentScroll > lastScrollTop && currentScroll > 80) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                if (currentScroll > 30) {
                    header.style.background = 'rgba(25, 5, 68, 0.98)';
                } else {
                    header.style.background = 'rgba(25, 5, 68, 0.95)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }
        
        function debouncedScroll() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 8);
        }
        
        window.addEventListener('scroll', debouncedScroll, { passive: true });

        // Mise en évidence du lien actif
        highlightActiveLink();
        
        console.log('⚡ === INTERACTIONS ANTI-DÉFORMATION INITIALISÉES ===');
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
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Lancement automatique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

    console.log('🎯 ✅ Script de header ANTI-DÉFORMATION chargé avec succès!');
    console.log('📱 Version mobile corrigée sans déformation');

})();