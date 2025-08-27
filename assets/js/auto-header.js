/**
 * Script d'injection automatique du header Xtranumerik
 * VERSION FINALE CORRIGÉE - 27 août 2025
 * 
 * CORRECTION MAJEURE : Switch de langue intelligent
 * - Détection correcte des URLs sans extension .html
 * - Navigation vers la page équivalente dans l'autre langue
 * - Support complet du mapping FR ↔ EN
 * - Configuration exposée globalement pour debug
 */

(function() {
    'use strict';

    // Configuration des chemins selon la structure du site
    const CONFIG = {
        // Mapping des pages entre français et anglais
        pageMapping: {
            // Français vers Anglais
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
            // Anglais vers Français
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

        // Détection automatique de la langue basée sur l'URL ou l'attribut lang
        detectLanguage: function() {
            // Vérifier l'attribut lang du HTML
            const htmlLang = document.documentElement.lang;
            if (htmlLang) {
                console.log('🔍 Langue détectée via attribut HTML lang:', htmlLang);
                return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
            }
            
            // Vérifier l'URL
            const path = window.location.pathname;
            console.log('🔍 Chemin actuel:', path);
            
            if (path.includes('/en/') || path.includes('/english/')) {
                console.log('🔍 Langue détectée via URL: anglais');
                return 'en';
            }
            
            if (path.includes('/fr/') || path.includes('/french/') || path.includes('/francais/')) {
                console.log('🔍 Langue détectée via URL: français');
                return 'fr';
            }
            
            // Par défaut français seulement si aucune indication contraire
            console.log('🔍 Langue par défaut: français');
            return 'fr';
        },

        // Extraction améliorée du nom de fichier actuel - VERSION CORRIGÉE
        getCurrentPageName: function() {
            const path = window.location.pathname;
            console.log('📄 Analyse du chemin complet:', path);
            
            // Diviser le chemin en segments et nettoyer
            const pathSegments = path.split('/').filter(segment => segment !== '');
            console.log('📄 Segments du chemin:', pathSegments);
            
            // Structure attendue : /pages/[langue]/[page] ou /pages/[langue]/
            if (pathSegments.length >= 2 && pathSegments[0] === 'pages') {
                // Vérifier s'il y a une page spécifique après la langue
                if (pathSegments[2]) {
                    // Page spécifique (ex: /pages/fr/contact)
                    let pageName = pathSegments[2];
                    
                    // Ajouter .html si pas déjà présent
                    if (!pageName.includes('.html')) {
                        pageName = pageName + '.html';
                    }
                    
                    console.log('📄 Nom de page extrait:', pageName);
                    return pageName;
                }
            }
            
            // Page d'accueil par défaut si aucune page spécifique
            console.log('📄 Page par défaut: index.html');
            return 'index.html';
        },

        // Génération intelligente du lien de changement de langue - VERSION CORRIGÉE
        getAlternateLangUrl: function() {
            const currentLang = this.detectLanguage();
            const targetLang = currentLang === 'fr' ? 'en' : 'fr';
            
            console.log('🌐 === DÉBUT GÉNÉRATION URL ALTERNATIVE ===');
            console.log('🌐 Langue actuelle:', currentLang);
            console.log('🌐 Langue cible:', targetLang);
            
            // Extraire le nom de fichier actuel - VERSION AMÉLIORÉE
            const currentPage = this.getCurrentPageName();
            console.log('🌐 Page actuelle détectée:', currentPage);
            
            // Trouver la page équivalente dans la langue cible
            const mapping = this.pageMapping[currentLang];
            let targetPage = 'index.html'; // Fallback par défaut
            
            console.log('🌐 Mapping disponible pour', currentLang + ':', mapping);
            
            if (mapping && mapping[currentPage]) {
                targetPage = mapping[currentPage];
                console.log('✅ Mapping direct trouvé:', currentPage, '->', targetPage);
            } else {
                console.log('❌ Aucun mapping direct trouvé pour:', currentPage);
                
                // Si pas de mapping direct, essayer de trouver une correspondance inverse
                const reverseMapping = this.pageMapping[targetLang];
                console.log('🔄 Tentative de mapping inverse avec:', reverseMapping);
                
                const found = Object.keys(reverseMapping || {}).find(key => reverseMapping[key] === currentPage);
                if (found) {
                    targetPage = found;
                    console.log('✅ Mapping inverse trouvé:', currentPage, '->', targetPage);
                } else {
                    console.log('❌ Aucun mapping inverse trouvé, utilisation du fallback');
                }
            }
            
            console.log('🎯 Page cible finale:', targetPage);
            
            const targetUrl = `/pages/${targetLang}/${targetPage}`;
            console.log('🔗 URL finale générée:', targetUrl);
            console.log('🌐 === FIN GÉNÉRATION URL ALTERNATIVE ===');
            
            return targetUrl;
        },

        // Détection automatique du chemin relatif vers assets
        getAssetPath: function() {
            const path = window.location.pathname;
            const depth = path.split('/').filter(segment => segment !== '').length;
            
            // Ajustement basé sur la profondeur du fichier
            if (path === '/' || path === '/index.html') {
                return 'assets/js/';
            } else if (path.includes('/pages/fr/') || path.includes('/pages/en/')) {
                return '../../assets/js/';
            } else if (path.includes('/fr/') || path.includes('/en/')) {
                return '../assets/js/';
            } else {
                return 'assets/js/';
            }
        }
    };

    // Exposer CONFIG globalement pour debug et accès externe
    window.XTRANUMERIK_CONFIG = CONFIG;

    // Structure du header français avec URL dynamique
    const HEADER_FR = {
        html: `
        <header class="main-header" id="main-header">
            <nav class="header-nav">
                <div class="nav-container">
                    <!-- Logo -->
                    <div class="nav-logo">
                        <a href="/pages/fr/index.html" class="logo-link">
                            <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/aee0b749-f8da-4823-b82d-2e2430e72d63/Fond+du+site+web+Xtranumerik.png?format=300w" alt="Xtranumerik Logo" class="logo-img">
                            <span class="logo-text">Xtranumerik</span>
                        </a>
                    </div>

                    <!-- Navigation principale -->
                    <ul class="nav-menu" id="nav-menu">
                        <li class="nav-item">
                            <a href="/pages/fr/index.html" class="nav-link">Accueil</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Solutions <span class="dropdown-arrow">▼</span></a>
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

                    <!-- Boutons d'action -->
                    <div class="nav-actions">
                        <a href="#" class="lang-switch" id="lang-switch" title="Switch to English">EN</a>
                        <a href="mailto:patrick@xtranumerik.ca?subject=Demande%20de%20contact" class="cta-button">Contactez-nous</a>
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
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
        }
        
        .logo-img {
            width: 40px;
            height: 40px;
            margin-right: 0.75rem;
            border-radius: 8px;
        }
        
        .logo-text {
            background: linear-gradient(135deg, #ffffff 0%, #ffa91a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-container {
                padding: 1rem;
            }
            
            .nav-menu {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: rgba(25, 5, 68, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
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
            }
            
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
            }
        }
        
        /* Ajustement du body pour compenser le header fixe */
        body {
            padding-top: 80px;
        }
        </style>
        `
    };

    // Structure du header anglais avec URL dynamique
    const HEADER_EN = {
        html: `
        <header class="main-header" id="main-header">
            <nav class="header-nav">
                <div class="nav-container">
                    <!-- Logo -->
                    <div class="nav-logo">
                        <a href="/pages/en/index.html" class="logo-link">
                            <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/aee0b749-f8da-4823-b82d-2e2430e72d63/Fond+du+site+web+Xtranumerik.png?format=300w" alt="Xtranumerik Logo" class="logo-img">
                            <span class="logo-text">Xtranumerik</span>
                        </a>
                    </div>

                    <!-- Navigation principale -->
                    <ul class="nav-menu" id="nav-menu">
                        <li class="nav-item">
                            <a href="/pages/en/index.html" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Solutions <span class="dropdown-arrow">▼</span></a>
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

                    <!-- Boutons d'action -->
                    <div class="nav-actions">
                        <a href="#" class="lang-switch" id="lang-switch" title="Passer au français">FR</a>
                        <a href="mailto:patrick@xtranumerik.ca?subject=Contact%20Request" class="cta-button">Contact Us</a>
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
        styles: HEADER_FR.styles // Mêmes styles pour les deux langues
    };

    // Fonction d'injection du header
    function injectHeader() {
        // Détecter la langue
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;

        // Injecter les styles
        if (!document.getElementById('auto-header-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'auto-header-styles';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
        }

        // Injecter le HTML du header
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerConfig.html;
        document.body.insertBefore(headerContainer.firstElementChild, document.body.firstChild);

        // Initialiser les interactions du header
        initializeHeaderInteractions();

        console.log(`✅ Header ${language.toUpperCase()} injecté automatiquement`);
    }

    // Fonction d'initialisation des interactions - VERSION FINALE CORRIGÉE DYNAMIQUE
    function initializeHeaderInteractions() {
        // Configuration dynamique du lien de changement de langue - VERSION CORRIGÉE
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            // Fonction pour mettre à jour l'URL dynamiquement
            function updateLangSwitchUrl() {
                const alternateUrl = CONFIG.getAlternateLangUrl();
                langSwitch.href = alternateUrl;
                console.log('🔗 Lien de changement de langue configuré:', alternateUrl);
                return alternateUrl;
            }
            
            // Mettre à jour l'URL immédiatement
            updateLangSwitchUrl();
            
            // Ajouter un event listener pour régénérer l'URL et naviguer
            langSwitch.addEventListener('click', function(e) {
                e.preventDefault(); // Empêcher la navigation par défaut
                
                console.log('🌐 Début du processus de changement de langue...');
                
                // Régénérer l'URL au moment du clic pour assurer la fraîcheur
                const targetUrl = updateLangSwitchUrl();
                
                console.log('🌐 Navigation vers:', targetUrl);
                
                // Naviguer vers l'URL cible
                window.location.href = targetUrl;
            });
        } else {
            console.error('❌ Élément lang-switch non trouvé dans le DOM');
        }

        // Menu mobile
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Fermer le menu mobile si on clique ailleurs
        document.addEventListener('click', function(event) {
            if (navMenu && mobileToggle) {
                if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });

        // Effet de scroll sur le header
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const header = document.getElementById('main-header');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                if (currentScroll > lastScrollTop && currentScroll > 100) {
                    // Scroll vers le bas - cacher le header
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scroll vers le haut - montrer le header
                    header.style.transform = 'translateY(0)';
                }

                // Changer l'opacité selon le scroll
                if (currentScroll > 50) {
                    header.style.background = 'rgba(25, 5, 68, 0.98)';
                } else {
                    header.style.background = 'rgba(25, 5, 68, 0.95)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Highlight du lien actif
        highlightActiveLink();
    }

    // Fonction pour mettre en évidence le lien actif
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.style.color = '#ffa91a';
                link.style.fontWeight = '700';
            }
        });
    }

    // Injection automatique quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

})();