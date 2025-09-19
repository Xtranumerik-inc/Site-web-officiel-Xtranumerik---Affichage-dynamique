/**
 * Script d'injection automatique du header - VERSION INTÉGRÉE MOBILE-OPTIMIZED-2025
 * DATE: 19 septembre 2025 - CROSS-BROWSER COMPATIBILITY FIX
 * 
 * 🔧 SOLUTION INTÉGRÉE: 
 * ✅ Intègre mobile-optimized-2025.css directement dans le script
 * ✅ Menu mobile avec position fixed et z-index forcé MAXIMUM
 * ✅ Compatible desktop et mobile
 * ✅ Touch targets 44px minimum
 * ✅ Pas besoin de fichier CSS externe
 * ✅ FIX Z-INDEX: Menus Solutions par-dessus page
 * ✅ FIX JAVASCRIPT: Interactions robustes tous devices
 * ✅ CROSS-BROWSER: Préfixes vendeurs + événements tactiles améliorés
 */

(function() {
    'use strict';

    // Configuration avec optimisations mobiles
    const CONFIG = {
        // URL du nouveau logo 
        LOGO_URL: '/data/images/LOGO%20Xtranumerik%20fond%20mauve%20(1920%20x%201080%20px).png',
        
        // Détection mobile et touch devices avec fallbacks
        isMobile: function() {
            return window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        isTouchDevice: function() {
            return ('ontouchstart' in window) || 
                   (navigator.maxTouchPoints > 0) || 
                   (navigator.msMaxTouchPoints > 0) ||
                   (window.DocumentTouch && document instanceof DocumentTouch);
        },
        
        // Détection navigateur pour ajustements spécifiques
        getBrowser: function() {
            const ua = navigator.userAgent;
            if (ua.indexOf('Chrome') > -1) return 'chrome';
            if (ua.indexOf('Firefox') > -1) return 'firefox';
            if (ua.indexOf('Safari') > -1) return 'safari';
            if (ua.indexOf('Edge') > -1) return 'edge';
            if (ua.indexOf('Opera') > -1) return 'opera';
            return 'unknown';
        },
        
        // Mapping des pages entre français et anglais
        pageMapping: {
            'fr': {
                'index.html': 'index.html',
                'contact.html': 'contact.html',
                'carte publicitaire.html': 'advertising map.html',
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
                'advertising map.html': 'carte publicitaire.html',
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

    // Templates HTML pour les headers
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
                        <li class="nav-item dropdown" role="none" data-dropdown>
                            <a href="javascript:void(0)" class="nav-link dropdown-toggle" role="menuitem" aria-haspopup="true" aria-expanded="false" data-dropdown-toggle>Solutions <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu" role="menu" data-dropdown-menu>
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
                            <a href="/pages/fr/carte publicitaire.html" class="nav-link" role="menuitem">Carte Publicitaire</a>
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
        `,
        styles: `
        <style>
        /* STYLES HEADER + MOBILE-OPTIMIZED-2025 INTÉGRÉS + FIX Z-INDEX + CROSS-BROWSER */
        
        /* Variables mobile-optimized-2025 */
        :root {
            --mobile-gap: 12px;
            --mobile-font-base: 14px;
            --mobile-font-heading: 1.5rem;
            --mobile-border-radius: 12px;
            --mobile-box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            --touch-target-min: 44px;
            --touch-target-comfortable: 48px;
            --mobile-padding-xs: 8px;
            --mobile-padding-sm: 12px;
            --mobile-padding-md: 16px;
            --mobile-font-xs: 12px;
            --mobile-font-sm: 14px;
            --mobile-font-md: 16px;
            --mobile-transition-fast: 0.15s;
            --mobile-transition-standard: 0.2s;
            --mobile-blur-light: blur(10px);
            --mobile-blur-strong: blur(20px);
        }
        
        /* Reset pour éviter déformations */
        .main-header * {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
        
        /* 🔥 FIX Z-INDEX PRINCIPAL: Header toujours au-dessus avec préfixes vendeurs */
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
            -moz-backdrop-filter: blur(20px);
            -ms-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 169, 26, 0.2);
            z-index: 10000 !important;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            overflow: visible;
        }
        
        .header-nav {
            padding: 0;
            width: 100%;
            position: relative;
            z-index: inherit;
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            -moz-justify-content: space-between;
            -ms-flex-pack: justify;
            padding: 0.75rem 1.5rem;
            height: 65px;
            min-height: 65px;
            max-height: 65px;
        }
        
        /* Logo avec contraintes anti-déformation */
        .nav-logo {
            flex-shrink: 0;
            -webkit-flex-shrink: 0;
            -moz-flex-shrink: 0;
            -ms-flex-negative: 0;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
        }
        
        .nav-logo .logo-link {
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
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
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            object-fit: contain;
            -webkit-object-fit: contain;
            -moz-object-fit: contain;
            -o-object-fit: contain;
        }
        
        .nav-menu {
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1.5rem;
            flex-grow: 1;
            -webkit-flex-grow: 1;
            -moz-flex-grow: 1;
            -ms-flex-positive: 1;
            justify-content: center;
            -webkit-justify-content: center;
            -moz-justify-content: center;
            -ms-flex-pack: center;
            position: relative;
            z-index: inherit;
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
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
            gap: 0.25rem;
            border-radius: 6px;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            white-space: nowrap;
            min-height: 44px;
            min-width: 44px;
            justify-content: center;
            -webkit-justify-content: center;
            -moz-justify-content: center;
            -ms-flex-pack: center;
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
            -webkit-transition: -webkit-transform 0.3s ease;
            -moz-transition: -moz-transform 0.3s ease;
            -ms-transition: -ms-transform 0.3s ease;
            -o-transition: -o-transform 0.3s ease;
        }
        
        .dropdown.open .dropdown-arrow,
        .dropdown:hover .dropdown-arrow {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
        }
        
        /* 🔥 FIX Z-INDEX DROPDOWN: Solutions par-dessus page avec préfixes vendeurs */
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(25, 5, 68, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            -moz-backdrop-filter: blur(20px);
            -ms-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 169, 26, 0.2);
            border-radius: 12px;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            -webkit-transform: translateY(-10px);
            -moz-transform: translateY(-10px);
            -ms-transform: translateY(-10px);
            -o-transform: translateY(-10px);
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            list-style: none;
            margin: 0;
            padding: 0.5rem 0;
            margin-top: 0.5rem;
            max-height: 70vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            /* 🚨 Z-INDEX CRITIQUE: Au-dessus de tout le contenu de page */
            z-index: 3000 !important;
        }
        
        .dropdown:hover .dropdown-menu,
        .dropdown:focus-within .dropdown-menu,
        .dropdown.open .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
        }
        
        .dropdown-link {
            display: block;
            color: white;
            text-decoration: none;
            padding: 0.6rem 1.2rem;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            font-weight: 400;
            font-size: 0.9rem;
            min-height: 44px;
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
        }
        
        .dropdown-link:hover {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding-left: 1.5rem;
        }
        
        /* Actions */
        .nav-actions {
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
            gap: 0.75rem;
            flex-shrink: 0;
            -webkit-flex-shrink: 0;
            -moz-flex-shrink: 0;
            -ms-flex-negative: 0;
            position: relative;
        }
        
        .lang-switch {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            border: 1px solid rgba(255, 169, 26, 0.3);
            cursor: pointer;
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
            justify-content: center;
            -webkit-justify-content: center;
            -moz-justify-content: center;
            -ms-flex-pack: center;
            min-width: 44px;
            min-height: 44px;
        }
        
        .lang-switch:hover {
            background: #ffa91a;
            color: #190544;
            transform: translateY(-2px);
            -webkit-transform: translateY(-2px);
            -moz-transform: translateY(-2px);
            -ms-transform: translateY(-2px);
            -o-transform: translateY(-2px);
        }
        
        .cta-button {
            background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            background: -webkit-linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            background: -moz-linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            background: -ms-linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            background: -o-linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            color: #190544;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            -webkit-border-radius: 25px;
            -moz-border-radius: 25px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 169, 26, 0.3);
            -webkit-box-shadow: 0 4px 15px rgba(255, 169, 26, 0.3);
            -moz-box-shadow: 0 4px 15px rgba(255, 169, 26, 0.3);
            font-size: 0.85rem;
            white-space: nowrap;
            min-height: 44px;
            min-width: 44px;
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
            justify-content: center;
            -webkit-justify-content: center;
            -moz-justify-content: center;
            -ms-flex-pack: center;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            -webkit-transform: translateY(-2px);
            -moz-transform: translateY(-2px);
            -ms-transform: translateY(-2px);
            -o-transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 169, 26, 0.4);
            -webkit-box-shadow: 0 6px 20px rgba(255, 169, 26, 0.4);
            -moz-box-shadow: 0 6px 20px rgba(255, 169, 26, 0.4);
        }
        
        /* Menu burger mobile */
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            -webkit-flex-direction: column;
            -moz-flex-direction: column;
            -ms-flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            gap: 0.2rem;
            min-width: 44px;
            min-height: 44px;
            justify-content: center;
            -webkit-justify-content: center;
            -moz-justify-content: center;
            -ms-flex-pack: center;
            align-items: center;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-flex-align: center;
            border-radius: 6px;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            position: relative;
            z-index: 20001 !important;
        }
        
        .mobile-menu-toggle:hover {
            background: rgba(255, 169, 26, 0.1);
        }
        
        .hamburger-line {
            width: 22px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            border-radius: 2px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
            -webkit-transform: rotate(45deg) translate(5px, 5px);
            -moz-transform: rotate(45deg) translate(5px, 5px);
            -ms-transform: rotate(45deg) translate(5px, 5px);
            -o-transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
            -webkit-transform: rotate(-45deg) translate(5px, -5px);
            -moz-transform: rotate(-45deg) translate(5px, -5px);
            -ms-transform: rotate(-45deg) translate(5px, -5px);
            -o-transform: rotate(-45deg) translate(5px, -5px);
        }
        
        /* 🔧 FIX MENU MOBILE: Position fixed avec Z-INDEX MAXIMUM */
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
                -moz-backdrop-filter: blur(20px);
                -ms-backdrop-filter: blur(20px);
                flex-direction: column;
                -webkit-flex-direction: column;
                -moz-flex-direction: column;
                -ms-flex-direction: column;
                padding: 80px 2rem 2rem;
                gap: 0;
                opacity: 0;
                visibility: hidden;
                transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
                -moz-transform: translateX(-100%);
                -ms-transform: translateX(-100%);
                -o-transform: translateX(-100%);
                transition: all 0.3s ease;
                -webkit-transition: all 0.3s ease;
                -moz-transition: all 0.3s ease;
                -ms-transition: all 0.3s ease;
                -o-transition: all 0.3s ease;
                justify-content: flex-start;
                -webkit-justify-content: flex-start;
                -moz-justify-content: flex-start;
                -ms-flex-pack: start;
                z-index: 19999;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            /* 🚨 SOLUTION FINALE: Z-INDEX MAXIMUM GARANTI POUR MENU MOBILE */
            .nav-menu.active {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                height: 100dvh !important;
                background: rgba(25, 5, 68, 0.98) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                -moz-backdrop-filter: blur(20px) !important;
                -ms-backdrop-filter: blur(20px) !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateX(0) !important;
                -webkit-transform: translateX(0) !important;
                -moz-transform: translateX(0) !important;
                -ms-transform: translateX(0) !important;
                -o-transform: translateX(0) !important;
                display: flex !important;
                display: -webkit-flex !important;
                display: -moz-flex !important;
                display: -ms-flexbox !important;
                flex-direction: column !important;
                -webkit-flex-direction: column !important;
                -moz-flex-direction: column !important;
                -ms-flex-direction: column !important;
                padding-top: 80px !important;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch !important;
                /* 🔥 Z-INDEX MAXIMUM ABSOLU - AU-DESSUS DE TOUT */
                z-index: 99999999 !important;
            }
            
            /* 🔥 HEADER ENCORE PLUS HAUT QUAND MENU ACTIF */
            .main-header:has(.nav-menu.active) {
                z-index: 100000000 !important;
            }
            
            /* Force le burger à rester visible au-dessus du menu */
            .mobile-menu-toggle.active {
                z-index: 100000001 !important;
            }
            
            /* Dropdown menu sur mobile: intégré dans le flux du menu mobile */
            .dropdown-menu {
                position: static !important;
                z-index: auto !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
                -webkit-transform: none !important;
                -moz-transform: none !important;
                -ms-transform: none !important;
                -o-transform: none !important;
                box-shadow: none !important;
                -webkit-box-shadow: none !important;
                -moz-box-shadow: none !important;
                border: none !important;
                background: rgba(255, 169, 26, 0.1) !important;
                margin: 0.5rem 0 !important;
                border-radius: 8px !important;
                -webkit-border-radius: 8px !important;
                -moz-border-radius: 8px !important;
                width: 100% !important;
                max-height: none !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                -moz-backdrop-filter: none !important;
                -ms-backdrop-filter: none !important;
                display: none; /* Par défaut caché sur mobile */
            }
            
            .dropdown-menu.show {
                display: block !important;
            }
            
            .mobile-menu-toggle {
                display: flex;
                display: -webkit-flex;
                display: -moz-flex;
                display: -ms-flexbox;
            }
            
            .nav-actions {
                gap: 0.4rem;
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
                -webkit-justify-content: center;
                -moz-justify-content: center;
                -ms-flex-pack: center;
                width: 100%;
                min-height: 48px;
                font-weight: 600;
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
            
            .nav-menu.active {
                padding-top: 70px !important;
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
        
        /* Ajustement du body pour le header fixe */
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
        
        /* 🚀 OPTIMISATIONS PERFORMANCE GLOBALES MOBILE */
        @media (max-width: 1024px) {
            * {
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
                -ms-touch-action: manipulation;
            }
            
            html {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                text-size-adjust: 100%;
                scroll-behavior: auto;
            }
            
            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeSpeed;
                font-display: swap;
            }
            
            .main-header,
            .nav-menu {
                transform: translateZ(0);
                -webkit-transform: translateZ(0);
                -moz-transform: translateZ(0);
                -ms-transform: translateZ(0);
                will-change: transform;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                -moz-backface-visibility: hidden;
            }
        }
        
        /* Enhanced iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
            .nav-menu.active {
                height: -webkit-fill-available !important;
            }
            
            body {
                position: relative;
                -webkit-overflow-scrolling: touch;
            }
            
            input, textarea, select {
                font-size: 16px !important;
            }
            
            a, button, input, select, textarea {
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
            
            .nav-menu,
            .dropdown-menu {
                -webkit-overflow-scrolling: touch;
            }
        }
        
        /* Firefox specific fixes */
        @-moz-document url-prefix() {
            .nav-menu.active {
                scrollbar-width: none;
            }
        }
        
        /* IE/Edge specific fixes */
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            .nav-container {
                display: -ms-flexbox;
                -ms-flex-align: center;
                -ms-flex-pack: justify;
            }
            
            .nav-menu {
                display: -ms-flexbox;
                -ms-flex-positive: 1;
                -ms-flex-pack: center;
            }
            
            .nav-actions {
                display: -ms-flexbox;
                -ms-flex-align: center;
                -ms-flex-negative: 0;
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
            .replace('Carte Publicitaire', 'Advertising Map')
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
        styles: HEADER_FR.styles
    };

    // Variables globales pour gestion état
    let currentActiveDropdown = null;
    let touchStartTime = 0;
    let lastTouchEnd = 0;
    let scrollTimeout = null;
    let isPointerEvent = false;

    // Détection des capacités d'événements tactiles
    const EventDetection = {
        hasPointerEvents: 'PointerEvent' in window,
        hasTouchEvents: 'TouchEvent' in window,
        hasMouseEvents: 'MouseEvent' in window,
        
        // Déterminer le meilleur type d'événement à utiliser
        getBestEventType: function() {
            if (this.hasPointerEvents && CONFIG.isTouchDevice()) {
                return 'pointer';
            } else if (this.hasTouchEvents && CONFIG.isTouchDevice()) {
                return 'touch';
            } else {
                return 'mouse';
            }
        }
    };

    // Fonction principale d'injection
    async function injectHeader() {
        console.log('🚀 === INJECTION HEADER CROSS-BROWSER AVEC FIX JAVASCRIPT COMPLET - DÉBUT ===');
        
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;
        const browser = CONFIG.getBrowser();
        const eventType = EventDetection.getBestEventType();
        
        console.log('📋 Header sélectionné:', language.toUpperCase());
        console.log('📱 Mobile détecté:', CONFIG.isMobile());
        console.log('👆 Touch device:', CONFIG.isTouchDevice());
        console.log('🌐 Navigateur détecté:', browser);
        console.log('⚡ Type d\'événement optimal:', eventType);

        // Injection des styles
        if (!document.getElementById('auto-header-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'auto-header-styles';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
            console.log('🎨 Styles injectés avec FIX Z-INDEX et préfixes vendeurs');
        }

        // Injection du HTML
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerConfig.html;
        const headerElement = headerContainer.firstElementChild;
        
        // Insérer le header au début du body
        document.body.insertBefore(headerElement, document.body.firstChild);
        console.log('🏗️ HTML du header injecté');

        // Initialisation des interactions ROBUSTES cross-browser
        initializeHeaderInteractions();
        
        console.log('✅ Header', language.toUpperCase(), 'injecté avec FIX JAVASCRIPT cross-browser complet');
        console.log('🚀 === INJECTION HEADER CROSS-BROWSER AVEC FIX JAVASCRIPT COMPLET - FIN ===');
    }

    // Fonction d'initialisation des interactions ROBUSTES cross-browser
    function initializeHeaderInteractions() {
        console.log('⚡ === INIT INTERACTIONS ROBUSTES CROSS-BROWSER AVEC FIX JAVASCRIPT ===');
        
        // Configuration du bouton de changement de langue
        initializeLanguageSwitch();
        
        // Configuration menu mobile avec gestion robuste cross-browser
        initializeMobileMenu();
        
        // Configuration dropdown Solutions avec gestion tactile cross-browser
        initializeDropdownMenus();
        
        // Gestionnaires globaux
        initializeGlobalEventHandlers();
        
        // Effets de scroll optimisés
        initializeScrollEffects();

        // Mise en évidence du lien actif
        highlightActiveLink();
        
        console.log('⚡ === INTERACTIONS ROBUSTES CROSS-BROWSER AVEC FIX JAVASCRIPT INITIALISÉES ===');
    }

    // Initialisation changement de langue
    function initializeLanguageSwitch() {
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
            
            // Gestionnaire de clic robuste cross-browser
            const addUniversalClickHandler = (element, handler) => {
                if (EventDetection.hasPointerEvents) {
                    element.addEventListener('pointerup', handler);
                }
                if (EventDetection.hasTouchEvents) {
                    element.addEventListener('touchend', handler);
                }
                if (EventDetection.hasMouseEvents) {
                    element.addEventListener('click', handler);
                }
            };
            
            addUniversalClickHandler(langSwitch, function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log('🖱️ === CLIC TRADUCTION DÉTECTÉ ===');
                
                const finalTargetUrl = updateLanguageSwitchLink();
                
                console.log('🚀 🌐 NAVIGATION VERS:', finalTargetUrl);
                console.log('🚀 📍 DEPUIS:', window.location.href);
                
                window.location.href = finalTargetUrl;
            });
            
            console.log('✅ ⚡ GESTIONNAIRE DE TRADUCTION CROSS-BROWSER CONFIGURÉ');
        } else {
            console.error('❌ ERREUR: Bouton de changement de langue NON TROUVÉ!');
        }
    }

    // Initialisation menu mobile ROBUSTE cross-browser
    function initializeMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            console.log('📱 Configuration menu mobile robuste cross-browser');
            
            function toggleMobileMenu(event) {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                const isActive = mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active', isActive);
                
                // Mise à jour ARIA
                mobileToggle.setAttribute('aria-expanded', isActive.toString());
                
                // Gestion overflow body pour empêcher scroll
                if (isActive) {
                    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                    document.body.style.top = `-${scrollY}px`;
                    document.body.dataset.scrollY = scrollY;
                } else {
                    const scrollY = document.body.dataset.scrollY || '0';
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY));
                    delete document.body.dataset.scrollY;
                }
                
                console.log('📱 Menu mobile basculé:', isActive ? 'OUVERT' : 'FERMÉ');
                return isActive;
            }
            
            // Gestionnaire universel cross-browser
            const addUniversalToggleHandler = (element, handler) => {
                let touchStartTime = 0;
                let lastTouchEnd = 0;
                
                // Pointer Events (moderne)
                if (EventDetection.hasPointerEvents) {
                    element.addEventListener('pointerdown', function(event) {
                        if (event.pointerType === 'touch') {
                            isPointerEvent = true;
                            touchStartTime = Date.now();
                        }
                    });
                    
                    element.addEventListener('pointerup', function(event) {
                        if (event.pointerType === 'touch' && isPointerEvent) {
                            event.preventDefault();
                            event.stopPropagation();
                            
                            const touchDuration = Date.now() - touchStartTime;
                            const timeSinceLastTouch = Date.now() - lastTouchEnd;
                            
                            if (touchDuration < 500 && timeSinceLastTouch > 300) {
                                handler();
                            }
                            
                            lastTouchEnd = Date.now();
                            isPointerEvent = false;
                        } else if (event.pointerType === 'mouse') {
                            handler(event);
                        }
                    });
                }
                
                // Touch Events (fallback pour anciens devices)
                if (EventDetection.hasTouchEvents) {
                    element.addEventListener('touchstart', function(event) {
                        if (!isPointerEvent) {
                            touchStartTime = Date.now();
                        }
                    }, { passive: true });
                    
                    element.addEventListener('touchend', function(event) {
                        if (!isPointerEvent) {
                            event.preventDefault();
                            event.stopPropagation();
                            
                            const touchDuration = Date.now() - touchStartTime;
                            const timeSinceLastTouch = Date.now() - lastTouchEnd;
                            
                            if (touchDuration < 500 && timeSinceLastTouch > 300) {
                                handler();
                            }
                            
                            lastTouchEnd = Date.now();
                        }
                    });
                }
                
                // Mouse Events (desktop et fallback)
                if (EventDetection.hasMouseEvents) {
                    element.addEventListener('click', function(event) {
                        if (!CONFIG.isTouchDevice() || (!isPointerEvent && !EventDetection.hasTouchEvents)) {
                            handler(event);
                        }
                    });
                }
            };
            
            addUniversalToggleHandler(mobileToggle, toggleMobileMenu);
            
            console.log('✅ Menu mobile robuste cross-browser configuré');
        }
    }

    // Initialisation dropdown menus avec gestion tactile ROBUSTE cross-browser
    function initializeDropdownMenus() {
        const dropdowns = document.querySelectorAll('[data-dropdown]');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('[data-dropdown-toggle]');
            const menu = dropdown.querySelector('[data-dropdown-menu]');
            
            if (toggle && menu) {
                console.log('🔽 Configuration dropdown robuste cross-browser');
                
                // Fonction toggle dropdown
                function toggleDropdown(forceClose = false) {
                    const isOpen = dropdown.classList.contains('open');
                    const shouldOpen = !isOpen && !forceClose;
                    
                    // Fermer autres dropdowns
                    if (currentActiveDropdown && currentActiveDropdown !== dropdown) {
                        currentActiveDropdown.classList.remove('open');
                        const prevToggle = currentActiveDropdown.querySelector('[data-dropdown-toggle]');
                        if (prevToggle) prevToggle.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('open', shouldOpen);
                    toggle.setAttribute('aria-expanded', shouldOpen.toString());
                    
                    // Sur mobile, gérer aussi la classe 'show' pour le menu
                    if (CONFIG.isMobile()) {
                        menu.classList.toggle('show', shouldOpen);
                    }
                    
                    currentActiveDropdown = shouldOpen ? dropdown : null;
                    
                    console.log('🔽 Dropdown:', shouldOpen ? 'OUVERT' : 'FERMÉ');
                    return shouldOpen;
                }
                
                // Gestion desktop: hover + click
                if (!CONFIG.isMobile()) {
                    // Hover seulement pour devices non-tactiles
                    dropdown.addEventListener('mouseenter', function() {
                        if (!CONFIG.isTouchDevice()) {
                            toggleDropdown();
                        }
                    });
                    
                    dropdown.addEventListener('mouseleave', function() {
                        if (!CONFIG.isTouchDevice()) {
                            toggleDropdown(true);
                        }
                    });
                }
                
                // Gestionnaire universel pour click/touch
                const addUniversalDropdownHandler = (element, handler) => {
                    let touchStartTime = 0;
                    let lastTouchEnd = 0;
                    
                    // Pointer Events
                    if (EventDetection.hasPointerEvents) {
                        element.addEventListener('pointerdown', function(event) {
                            if (event.pointerType === 'touch') {
                                isPointerEvent = true;
                                touchStartTime = Date.now();
                            }
                        });
                        
                        element.addEventListener('pointerup', function(event) {
                            if (event.pointerType === 'touch' && isPointerEvent) {
                                event.preventDefault();
                                event.stopPropagation();
                                
                                const touchDuration = Date.now() - touchStartTime;
                                const timeSinceLastTouch = Date.now() - lastTouchEnd;
                                
                                if (touchDuration < 500 && timeSinceLastTouch > 200) {
                                    handler();
                                }
                                
                                lastTouchEnd = Date.now();
                                isPointerEvent = false;
                            } else if (event.pointerType === 'mouse') {
                                event.preventDefault();
                                event.stopPropagation();
                                handler();
                            }
                        });
                    }
                    
                    // Touch Events
                    if (EventDetection.hasTouchEvents) {
                        element.addEventListener('touchstart', function(event) {
                            if (!isPointerEvent) {
                                touchStartTime = Date.now();
                            }
                        }, { passive: true });
                        
                        element.addEventListener('touchend', function(event) {
                            if (!isPointerEvent) {
                                event.preventDefault();
                                event.stopPropagation();
                                
                                const touchDuration = Date.now() - touchStartTime;
                                const timeSinceLastTouch = Date.now() - lastTouchEnd;
                                
                                if (touchDuration < 500 && timeSinceLastTouch > 200) {
                                    handler();
                                }
                                
                                lastTouchEnd = Date.now();
                            }
                        });
                    }
                    
                    // Mouse Events
                    if (EventDetection.hasMouseEvents) {
                        element.addEventListener('click', function(event) {
                            if (!CONFIG.isTouchDevice() || (!isPointerEvent && !EventDetection.hasTouchEvents)) {
                                event.preventDefault();
                                event.stopPropagation();
                                handler();
                            }
                        });
                    }
                };
                
                addUniversalDropdownHandler(toggle, toggleDropdown);
                
                console.log('✅ Dropdown cross-browser configuré');
            }
        });
    }

    // Gestionnaires d'événements globaux cross-browser
    function initializeGlobalEventHandlers() {
        // Fermeture dropdowns au clic extérieur
        const addUniversalDocumentHandler = (handler) => {
            if (EventDetection.hasPointerEvents) {
                document.addEventListener('pointerup', handler);
            }
            if (EventDetection.hasTouchEvents) {
                document.addEventListener('touchend', handler);
            }
            if (EventDetection.hasMouseEvents) {
                document.addEventListener('click', handler);
            }
        };
        
        addUniversalDocumentHandler(function(event) {
            if (currentActiveDropdown) {
                const isClickInside = currentActiveDropdown.contains(event.target);
                if (!isClickInside) {
                    currentActiveDropdown.classList.remove('open');
                    const toggle = currentActiveDropdown.querySelector('[data-dropdown-toggle]');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    
                    // Sur mobile, retirer aussi la classe 'show'
                    const menu = currentActiveDropdown.querySelector('[data-dropdown-menu]');
                    if (menu && CONFIG.isMobile()) {
                        menu.classList.remove('show');
                    }
                    
                    currentActiveDropdown = null;
                }
            }
        });

        // Fermeture menu mobile avec Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                const navMenu = document.getElementById('nav-menu');
                const mobileToggle = document.getElementById('mobile-menu-toggle');
                
                // Fermer menu mobile
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    
                    // Restaurer overflow body
                    const scrollY = document.body.dataset.scrollY || '0';
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY));
                    delete document.body.dataset.scrollY;
                    
                    if (mobileToggle.focus) mobileToggle.focus();
                }
                
                // Fermer dropdown actif
                if (currentActiveDropdown) {
                    currentActiveDropdown.classList.remove('open');
                    const toggle = currentActiveDropdown.querySelector('[data-dropdown-toggle]');
                    if (toggle) {
                        toggle.setAttribute('aria-expanded', 'false');
                        if (toggle.focus) toggle.focus();
                    }
                    currentActiveDropdown = null;
                }
            }
        });

        // Fermeture dropdown au scroll (pour éviter problèmes z-index)
        window.addEventListener('scroll', function() {
            if (currentActiveDropdown && !CONFIG.isMobile()) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (currentActiveDropdown) {
                        currentActiveDropdown.classList.remove('open');
                        const toggle = currentActiveDropdown.querySelector('[data-dropdown-toggle]');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                        currentActiveDropdown = null;
                    }
                }, 150);
            }
        }, { passive: true });

        console.log('✅ Gestionnaires globaux cross-browser configurés');
    }

    // Effets de scroll optimisés cross-browser
    function initializeScrollEffects() {
        let scrollTimeout;
        let lastScrollTop = 0;
        let ticking = false;
        
        function handleScroll() {
            const header = document.getElementById('main-header');
            const navMenu = document.getElementById('nav-menu');
            const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (header) {
                // Auto-hide header sur scroll down (seulement si menu fermé)
                if (!navMenu || !navMenu.classList.contains('active')) {
                    if (currentScroll > lastScrollTop && currentScroll > 100) {
                        header.style.transform = 'translateY(-100%)';
                        if (header.style.webkitTransform !== undefined) {
                            header.style.webkitTransform = 'translateY(-100%)';
                        }
                    } else {
                        header.style.transform = 'translateY(0)';
                        if (header.style.webkitTransform !== undefined) {
                            header.style.webkitTransform = 'translateY(0)';
                        }
                    }
                }

                // Changement opacité background
                if (currentScroll > 50) {
                    header.style.background = 'rgba(25, 5, 68, 0.98)';
                } else {
                    header.style.background = 'rgba(25, 5, 68, 0.95)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        }
        
        // Optimisation scroll avec requestAnimationFrame ou fallback
        const optimizedScrollHandler = function() {
            if (!ticking) {
                if (window.requestAnimationFrame) {
                    requestAnimationFrame(handleScroll);
                } else if (window.webkitRequestAnimationFrame) {
                    webkitRequestAnimationFrame(handleScroll);
                } else if (window.mozRequestAnimationFrame) {
                    mozRequestAnimationFrame(handleScroll);
                } else {
                    setTimeout(handleScroll, 16);
                }
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

        console.log('✅ Effets de scroll cross-browser configurés');
    }

    // Fonction de mise en évidence du lien actif
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            try {
                const linkPath = new URL(link.href).pathname;
                if (linkPath === currentPath) {
                    link.style.color = '#ffa91a';
                    link.style.fontWeight = '700';
                    link.style.background = 'rgba(255, 169, 26, 0.1)';
                }
            } catch (e) {
                console.warn('Could not parse link URL:', link.href);
            }
        });
    }

    // Configuration globale exposée pour tests
    window.XTRANUMERIK_CONFIG = CONFIG;
    window.XTRANUMERIK_EVENT_DETECTION = EventDetection;

    // Lancement automatique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

    console.log('🎯 ✅ Script header CROSS-BROWSER avec FIX JAVASCRIPT COMPLET chargé!');
    console.log('🔥 📱 Menu mobile: z-index 99999999 + interactions cross-browser robustes');
    console.log('🔥 🖥️ Dropdown desktop: z-index 3000 + hover + click tactile cross-browser');
    console.log('🔥 📋 Header: z-index 10000 + auto-hide intelligent + préfixes vendeurs');
    console.log('🔥 ⚡ Events: Pointer/Touch/Mouse optimized + anti-double-tap + debouncing');
    console.log('🔥 🌐 Cross-browser: Préfixes CSS + détection événements + fallbacks');

})();
