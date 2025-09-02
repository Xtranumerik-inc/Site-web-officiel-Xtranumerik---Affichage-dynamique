/**
 * AUTO-HEADER MOBILE ENHANCED
 * Version modifiée du header avec intégration mobile premium
 * Date: 2 septembre 2025
 * 
 * ✅ Navigation mobile premium intégrée
 * ✅ Compatibilité avec le système mobile optimizer
 * ✅ Menu mobile basique désactivé (remplacé par slide-out)
 * ✅ Styles mobile optimisés
 */

(function() {
    'use strict';

    // Configuration avec nouveau logo
    const CONFIG = {
        // URL du nouveau logo 
        LOGO_URL: '/data/images/LOGO%20Xtranumerik%20fond%20mauve%20(1920%20x%201080%20px).png',
        
        // Mobile optimization
        MOBILE_BREAKPOINT: 768,
        DISABLE_BASIC_MOBILE: true, // Désactiver le menu mobile basique
        
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
                console.log('🔍 Langue détectée via attribut HTML lang:', htmlLang);
                return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
            }
            
            const path = window.location.pathname;
            console.log('🔍 Analyse du chemin pour détection de langue:', path);
            
            if (path.includes('/en/')) {
                console.log('🔍 Langue détectée via URL: anglais');
                return 'en';
            }
            
            if (path.includes('/fr/')) {
                console.log('🔍 Langue détectée via URL: français');
                return 'fr';
            }
            
            console.log('🔍 Langue par défaut appliquée: français');
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
        },

        isMobile: function() {
            return window.innerWidth < this.MOBILE_BREAKPOINT || 
                   /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    };

    // Templates HTML pour les headers avec support mobile premium
    const HEADER_FR = {
        html: `
        <header class="main-header" id="main-header">
            <nav class="header-nav">
                <div class="nav-container">
                    <!-- Logo SEUL - Sans texte "Xtranumerik" -->
                    <div class="nav-logo">
                        <a href="/pages/fr/index.html" class="logo-link">
                            <img src="${CONFIG.LOGO_URL}" alt="Logo Xtranumerik" class="logo-img">
                        </a>
                    </div>

                    <!-- Navigation principale (cachée sur mobile) -->
                    <ul class="nav-menu" id="nav-menu">
                        <li class="nav-item">
                            <a href="/pages/fr/index.html" class="nav-link">Accueil</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="javascript:void(0)" class="nav-link dropdown-toggle">Solutions <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/pages/fr/industries.html" class="dropdown-link">Industries</a></li>
                                <li><a href="/pages/fr/gyms.html" class="dropdown-link">Gyms</a></li>
                                <li><a href="/pages/fr/restaurants.html" class="dropdown-link">Restaurants</a></li>
                                <li><a href="/pages/fr/concessions-auto.html" class="dropdown-link">Concessions Auto</a></li>
                                <li><a href="/pages/fr/hotels.html" class="dropdown-link">Hôtels</a></li>
                                <li><a href="/pages/fr/centres-commerciaux.html" class="dropdown-link">Centres Commerciaux</a></li>
                                <li><a href="/pages/fr/commerce-detail.html" class="dropdown-link">Commerce de Détail</a></li>
                                <li><a href="/pages/fr/pharmacies.html" class="dropdown-link">Pharmacies</a></li>
                                <li><a href="/pages/fr/cliniques-dentaires.html" class="dropdown-link">Cliniques Dentaires</a></li>
                                <li><a href="/pages/fr/salons-coiffure.html" class="dropdown-link">Salons de Coiffure</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/fr/contact.html" class="nav-link">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/fr/reseau-publicitaire.html" class="nav-link">Réseau Publicitaire</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/fr/carte.html" class="nav-link">Carte Interactive</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/fr/connexion.html" class="nav-link">Connexion</a>
                        </li>
                    </ul>

                    <!-- Actions avec support mobile premium -->
                    <div class="nav-actions">
                        <a href="javascript:void(0)" class="lang-switch" id="lang-switch" title="Switch to English">EN</a>
                        <a href="/pages/fr/contact.html" class="cta-button">Contactez-nous</a>
                        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
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
        .main-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(25, 5, 68, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 169, 26, 0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .header-nav {
            padding: 0;
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
        }
        
        .nav-logo .logo-link {
            display: flex;
            align-items: center;
            text-decoration: none;
        }
        
        .logo-img {
            width: 80px;
            height: 45px;
            border-radius: 8px;
            object-fit: contain;
            transition: all 0.3s ease;
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
        }
        
        .nav-item {
            position: relative;
        }
        
        .nav-link {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 0;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .nav-link:hover {
            color: #ffa91a;
        }
        
        .dropdown-toggle {
            cursor: pointer;
        }
        
        .dropdown-arrow {
            font-size: 0.8rem;
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
        }
        
        .dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-link {
            display: block;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            transition: all 0.3s ease;
            font-weight: 400;
        }
        
        .dropdown-link:hover {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding-left: 2rem;
        }
        
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .lang-switch {
            background: rgba(255, 169, 26, 0.1);
            color: #ffa91a;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 169, 26, 0.3);
            cursor: pointer;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lang-switch:hover {
            background: #ffa91a;
            color: #190544;
            transform: translateY(-2px);
        }
        
        .cta-button {
            background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
            color: #190544;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 169, 26, 0.3);
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 169, 26, 0.4);
        }
        
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            gap: 0.25rem;
            min-width: 44px;
            min-height: 44px;
            align-items: center;
            justify-content: center;
        }
        
        .hamburger-line {
            width: 25px;
            height: 3px;
            background: white;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        /* Mobile Styles - Optimisés pour navigation premium */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0.75rem 1rem;
            }
            
            .logo-img {
                width: 60px;
                height: 34px;
            }
            
            /* Cacher le menu desktop sur mobile (sera remplacé par slide-out) */
            .nav-menu {
                display: none !important;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-actions {
                gap: 0.5rem;
            }
            
            .cta-button {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
                display: none; /* Sera dans le menu mobile premium */
            }
            
            .lang-switch {
                padding: 0.5rem 0.75rem;
                font-size: 0.8rem;
            }
        }
        
        /* Très petits écrans */
        @media (max-width: 320px) {
            .nav-container {
                padding: 0.5rem;
            }
            
            .lang-switch {
                display: none; /* Sera dans le menu mobile premium */
            }
        }
        
        /* Ajustement du body */
        body {
            padding-top: 60px;
        }
        
        @media (min-width: 769px) {
            body {
                padding-top: 80px;
            }
        }
        </style>
        `
    };

    const HEADER_EN = {
        html: `
        <header class="main-header" id="main-header">
            <nav class="header-nav">
                <div class="nav-container">
                    <!-- Logo SEUL - Sans texte "Xtranumerik" -->
                    <div class="nav-logo">
                        <a href="/pages/en/index.html" class="logo-link">
                            <img src="${CONFIG.LOGO_URL}" alt="Xtranumerik Logo" class="logo-img">
                        </a>
                    </div>

                    <!-- Main Navigation -->
                    <ul class="nav-menu" id="nav-menu">
                        <li class="nav-item">
                            <a href="/pages/en/index.html" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="javascript:void(0)" class="nav-link dropdown-toggle">Solutions <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/pages/en/industries.html" class="dropdown-link">Industries</a></li>
                                <li><a href="/pages/en/gyms.html" class="dropdown-link">Gyms</a></li>
                                <li><a href="/pages/en/restaurants.html" class="dropdown-link">Restaurants</a></li>
                                <li><a href="/pages/en/car-dealerships.html" class="dropdown-link">Car Dealerships</a></li>
                                <li><a href="/pages/en/hotels.html" class="dropdown-link">Hotels</a></li>
                                <li><a href="/pages/en/shopping-centers.html" class="dropdown-link">Shopping Centers</a></li>
                                <li><a href="/pages/en/retail-stores.html" class="dropdown-link">Retail Stores</a></li>
                                <li><a href="/pages/en/pharmacies.html" class="dropdown-link">Pharmacies</a></li>
                                <li><a href="/pages/en/dental-clinics.html" class="dropdown-link">Dental Clinics</a></li>
                                <li><a href="/pages/en/hair-salons.html" class="dropdown-link">Hair Salons</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/en/contact.html" class="nav-link">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/en/advertising-network.html" class="nav-link">Advertising Network</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/en/map.html" class="nav-link">Interactive Map</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/en/login.html" class="nav-link">Login</a>
                        </li>
                    </ul>

                    <!-- Actions -->
                    <div class="nav-actions">
                        <a href="javascript:void(0)" class="lang-switch" id="lang-switch" title="Passer au français">FR</a>
                        <a href="/pages/en/contact.html" class="cta-button">Contact Us</a>
                        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        `,
        styles: HEADER_FR.styles // Mêmes styles
    };

    // Fonction principale d'injection
    function injectHeader() {
        console.log('🚀 === INJECTION HEADER MOBILE ENHANCED - DÉBUT ===');
        
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;
        
        console.log('📋 Header sélectionné:', language.toUpperCase());

        // Injection des styles
        if (!document.getElementById('auto-header-mobile-enhanced-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'auto-header-mobile-enhanced-styles';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
            console.log('🎨 Styles mobile enhanced injectés');
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
        
        console.log('✅ Header Mobile Enhanced', language.toUpperCase(), 'injecté');
        console.log('🚀 === INJECTION HEADER MOBILE ENHANCED - FIN ===');

        // Event pour notifier que le header est prêt
        document.dispatchEvent(new CustomEvent('headerReady', {
            detail: { language: language, isMobile: CONFIG.isMobile() }
        }));
    }

    // Fonction d'initialisation des interactions
    function initializeHeaderInteractions() {
        console.log('⚡ === INIT INTERACTIONS MOBILE ENHANCED ===');
        
        // Configuration du bouton de changement de langue
        setupLanguageSwitch();
        
        // Configuration du menu mobile (toggle seulement, navigation gérée par mobile-navigation.js)
        setupMobileToggle();
        
        // Effets de scroll
        setupScrollEffects();

        // Mise en évidence du lien actif
        highlightActiveLink();
        
        console.log('⚡ === INTERACTIONS MOBILE ENHANCED INITIALISÉES ===');
    }

    function setupLanguageSwitch() {
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
                
                // Feedback tactile si disponible
                if (window.XtranumerikMobileFeedback) {
                    window.XtranumerikMobileFeedback.vibrate('light');
                }
                
                window.location.href = finalTargetUrl;
            });
            
            console.log('✅ ⚡ GESTIONNAIRE DE TRADUCTION CONFIGURÉ');
        } else {
            console.error('❌ ERREUR: Bouton de changement de langue NON TROUVÉ!');
        }
    }

    function setupMobileToggle() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');

        if (mobileToggle) {
            // Le toggle sera géré par mobile-navigation.js
            // On ajoute juste des styles de feedback
            mobileToggle.addEventListener('touchstart', function() {
                if (window.XtranumerikMobileFeedback) {
                    window.XtranumerikMobileFeedback.vibrate('light');
                }
            }, { passive: true });

            console.log('✅ Menu mobile toggle configuré (géré par navigation premium)');
        }

        // Désactiver le menu mobile basique si configuré
        if (CONFIG.DISABLE_BASIC_MOBILE) {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                // Supprimer les event listeners du menu basique
                navMenu.style.display = 'none';
                console.log('🚫 Menu mobile basique désactivé');
            }
        }
    }

    function setupScrollEffects() {
        let lastScrollTop = 0;
        let ticking = false;

        function updateHeader() {
            const header = document.getElementById('main-header');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                // Auto-hide sur scroll down (sauf sur mobile)
                if (!CONFIG.isMobile()) {
                    if (currentScroll > lastScrollTop && currentScroll > 100) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                }

                // Changer l'opacité selon le scroll
                if (currentScroll > 50) {
                    header.style.background = 'rgba(25, 5, 68, 0.98)';
                    header.style.borderBottomColor = 'rgba(255, 169, 26, 0.3)';
                } else {
                    header.style.background = 'rgba(25, 5, 68, 0.95)';
                    header.style.borderBottomColor = 'rgba(255, 169, 26, 0.2)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });

        // Réajuster sur resize
        window.addEventListener('resize', function() {
            const header = document.getElementById('main-header');
            if (header && CONFIG.isMobile()) {
                header.style.transform = 'translateY(0)'; // Toujours visible sur mobile
            }
        });
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
                }
            } catch (e) {
                // Ignore les liens invalides
            }
        });
    }

    // Attendre que le DOM soit prêt et que les systèmes mobiles soient chargés
    function initializeWhenReady() {
        // Si le mobile optimizer est disponible, attendre qu'il soit prêt
        if (document.querySelector('script[src*="mobile-optimizer-loader"]')) {
            document.addEventListener('mobileOptimizerReady', injectHeader);
        } else {
            // Sinon, lancer directement
            injectHeader();
        }
    }

    // Lancement automatique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWhenReady);
    } else {
        initializeWhenReady();
    }

    console.log('🎯 ✅ Auto-Header Mobile Enhanced chargé avec succès!');

})();