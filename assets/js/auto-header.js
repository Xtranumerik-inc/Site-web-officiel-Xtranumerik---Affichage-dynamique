/**
 * Script d'injection automatique du header Xtranumerik - VERSION LIENS INTERNES
 * DATE: 27 août 2025
 * 
 * 🔧 CORRECTION MAJEURE : Conversion des liens externes vers liens internes
 * 
 * ❌ PROBLÈME IDENTIFIÉ :
 * - Le bouton "Contactez-nous" utilisait mailto:patrick@xtranumerik.ca (EXTERNE)
 * - Le bouton "Contact Us" utilisait mailto:patrick@xtranumerik.ca (EXTERNE)
 * - Navigation qui sortait du contexte interne du site
 * 
 * ✅ CORRECTIONS APPORTÉES :
 * - Bouton FR "Contactez-nous" : mailto → /pages/fr/contact.html
 * - Bouton EN "Contact Us" : mailto → /pages/en/contact.html
 * - Conservation de toute la logique de traduction et navigation
 * - Tous les liens pointent maintenant vers des pages internes
 */

(function() {
    'use strict';

    // Configuration complète avec mapping bidirectionnel CORRIGÉ
    const CONFIG = {
        // Mapping des pages entre français et anglais - VERSION ÉTENDUE
        pageMapping: {
            // Français vers Anglais
            'fr': {
                'index.html': 'index.html',
                'contact.html': 'contact.html',
                'reseau-publicitaire.html': 'advertising-network.html',
                'carte.html': 'map.html',
                'connexion.html': 'login.html',
                'carrieres.html': 'careers.html',
                // Pages sectorielles
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
                // Pages sectorielles
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
            // 1. Vérifier l'attribut lang du HTML
            const htmlLang = document.documentElement.lang;
            if (htmlLang) {
                console.log('🔍 Langue détectée via attribut HTML lang:', htmlLang);
                return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
            }
            
            // 2. Analyser l'URL
            const path = window.location.pathname;
            console.log('🔍 Analyse du chemin pour détection de langue:', path);
            
            // Vérifier les patterns d'URL
            if (path.includes('/en/')) {
                console.log('🔍 Langue détectée via URL: anglais');
                return 'en';
            }
            
            if (path.includes('/fr/')) {
                console.log('🔍 Langue détectée via URL: français');
                return 'fr';
            }
            
            // 3. Fallback basé sur le domaine/contenu
            console.log('🔍 Langue par défaut appliquée: français');
            return 'fr';
        },

        // 🔧 FONCTION COMPLÈTEMENT RÉÉCRITE - EXTRACTION DU NOM DE PAGE
        getCurrentPageName: function() {
            const fullPath = window.location.pathname;
            console.log('📄 === EXTRACTION NOM DE PAGE - DÉBUT ===');
            console.log('📄 URL complète analysée:', window.location.href);
            console.log('📄 Chemin pathname:', fullPath);
            
            // Diviser le chemin en segments et nettoyer
            const segments = fullPath.split('/').filter(segment => segment !== '');
            console.log('📄 Segments du chemin:', segments);
            
            let pageName = 'index.html'; // Valeur par défaut sécurisée
            
            // PATTERN 1: URL racine "/" ou vide
            if (segments.length === 0) {
                console.log('📄 PATTERN: URL racine détectée');
                return pageName;
            }
            
            // PATTERN 2: /pages/[langue]/[page].html
            // Exemple: /pages/fr/contact.html
            if (segments.length >= 2 && segments[0] === 'pages') {
                console.log('📄 PATTERN: /pages/langue/page détecté');
                
                if (segments.length === 2) {
                    // /pages/fr/ ou /pages/en/ sans page spécifique
                    console.log('📄 Pas de page spécifique après la langue');
                    return 'index.html';
                }
                
                if (segments.length >= 3) {
                    // /pages/fr/contact.html ou /pages/fr/contact
                    pageName = segments[2];
                    console.log('📄 Page extraite des segments:', pageName);
                }
            }
            
            // PATTERN 3: /[langue]/[page].html  
            // Exemple: /fr/contact.html
            else if (segments.length >= 1 && (segments[0] === 'fr' || segments[0] === 'en')) {
                console.log('📄 PATTERN: /langue/page détecté');
                
                if (segments.length === 1) {
                    // Juste /fr/ ou /en/
                    console.log('📄 Langue sans page spécifique');
                    return 'index.html';
                }
                
                if (segments.length >= 2) {
                    // /fr/contact.html
                    pageName = segments[1];
                    console.log('📄 Page extraite après langue:', pageName);
                }
            }
            
            // PATTERN 4: URL directe vers une page
            // Exemple: /contact.html
            else if (segments.length >= 1) {
                console.log('📄 PATTERN: Page directe détectée');
                pageName = segments[segments.length - 1]; // Dernière segment
                console.log('📄 Dernière segment utilisée:', pageName);
            }
            
            // NORMALISATION : S'assurer que l'extension .html est présente
            if (pageName && !pageName.includes('.html') && pageName !== '/' && !pageName.includes('?')) {
                console.log('📄 Extension .html manquante, ajout en cours...');
                pageName = pageName + '.html';
            }
            
            // SÉCURITÉ : Nettoyer les paramètres URL ou ancres
            if (pageName.includes('?')) {
                pageName = pageName.split('?')[0];
                console.log('📄 Paramètres URL supprimés:', pageName);
            }
            
            if (pageName.includes('#')) {
                pageName = pageName.split('#')[0];
                console.log('📄 Ancres supprimées:', pageName);
            }
            
            console.log('📄 📋 RÉSULTAT FINAL:', pageName);
            console.log('📄 === EXTRACTION NOM DE PAGE - FIN ===');
            
            return pageName;
        },

        // 🔧 GÉNÉRATION URL ALTERNATIVE CORRIGÉE
        getAlternateLangUrl: function() {
            console.log('🌐 === GÉNÉRATION URL TRADUCTION - DÉBUT ===');
            
            const currentLang = this.detectLanguage();
            const targetLang = currentLang === 'fr' ? 'en' : 'fr';
            const currentPage = this.getCurrentPageName();
            
            console.log('🌐 📊 ÉTAT ACTUEL:');
            console.log('🌐   - Langue actuelle:', currentLang);
            console.log('🌐   - Langue cible:', targetLang);
            console.log('🌐   - Page actuelle:', currentPage);
            
            // 🔍 RECHERCHE DU MAPPING
            let targetPage = null;
            let mappingUsed = 'aucun';
            
            // Tentative 1: Mapping direct (langue actuelle → langue cible)
            const directMapping = this.pageMapping[currentLang];
            if (directMapping && directMapping[currentPage]) {
                targetPage = directMapping[currentPage];
                mappingUsed = 'direct';
                console.log('✅ 🎯 MAPPING DIRECT RÉUSSI');
                console.log('✅   - Entrée:', currentPage);
                console.log('✅   - Sortie:', targetPage);
            }
            
            // Tentative 2: Mapping inverse (recherche dans langue cible)
            if (!targetPage) {
                console.log('🔄 Tentative mapping inverse...');
                const reverseMapping = this.pageMapping[targetLang];
                if (reverseMapping) {
                    // Chercher une clé dans la langue cible qui a comme valeur notre page actuelle
                    const reverseKey = Object.keys(reverseMapping).find(key => 
                        reverseMapping[key] === currentPage
                    );
                    
                    if (reverseKey) {
                        targetPage = reverseKey;
                        mappingUsed = 'inverse';
                        console.log('✅ 🎯 MAPPING INVERSE RÉUSSI');
                        console.log('✅   - Page recherchée:', currentPage);
                        console.log('✅   - Page trouvée:', targetPage);
                    }
                }
            }
            
            // Tentative 3: Fallback sécurisé
            if (!targetPage) {
                targetPage = 'index.html';
                mappingUsed = 'fallback';
                console.log('🛡️ FALLBACK APPLIQUÉ - Retour à l\'accueil');
                console.log('🛡️   - Raison: Aucun mapping trouvé pour', currentPage);
            }
            
            // 🏗️ CONSTRUCTION DE L'URL FINALE
            const finalUrl = `/pages/${targetLang}/${targetPage}`;
            
            console.log('🌐 📋 RÉSUMÉ DE LA TRADUCTION:');
            console.log('🌐   - Mapping utilisé:', mappingUsed);
            console.log('🌐   - Page source:', currentPage, '(' + currentLang + ')');
            console.log('🌐   - Page cible:', targetPage, '(' + targetLang + ')');
            console.log('🌐   - URL générée:', finalUrl);
            console.log('🌐 === GÉNÉRATION URL TRADUCTION - FIN ===');
            
            return finalUrl;
        }
    };

    // Exposer CONFIG globalement pour débogage
    window.XTRANUMERIK_HEADER_CONFIG = CONFIG;

    // Templates HTML pour les headers - VERSION LIENS INTERNES
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

                    <!-- Actions - LIENS INTERNES UNIQUEMENT -->
                    <div class="nav-actions">
                        <a href="#" class="lang-switch" id="lang-switch" title="Switch to English">EN</a>
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
        
        /* Ajustement du body */
        body {
            padding-top: 80px;
        }
        </style>
        `
    };

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

                    <!-- Main Navigation -->
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

                    <!-- Actions - LIENS INTERNES UNIQUEMENT -->
                    <div class="nav-actions">
                        <a href="#" class="lang-switch" id="lang-switch" title="Passer au français">FR</a>
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
        console.log('🚀 === INJECTION HEADER LIENS INTERNES - DÉBUT ===');
        
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;
        
        console.log('📋 Header sélectionné:', language.toUpperCase());

        // Injection des styles
        if (!document.getElementById('auto-header-styles-internal-links')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'auto-header-styles-internal-links';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
            console.log('🎨 Styles injectés avec ID unique');
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
        
        console.log('✅ Header', language.toUpperCase(), 'injecté automatiquement');
        console.log('🚀 === INJECTION HEADER LIENS INTERNES - FIN ===');
    }

    // 🔧 FONCTION D'INITIALISATION CORRIGÉE
    function initializeHeaderInteractions() {
        console.log('⚡ === INIT INTERACTIONS LIENS INTERNES ===');
        
        // Configuration du bouton de changement de langue - VERSION CORRIGÉE
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            console.log('🔍 Bouton de changement de langue trouvé');
            
            // 🔧 FONCTION DE MISE À JOUR DU LIEN - CORRIGÉE
            function updateLanguageSwitchLink() {
                const targetUrl = CONFIG.getAlternateLangUrl();
                langSwitch.href = targetUrl;
                console.log('🔗 ✅ LIEN TRANSLATION CORRIGÉ:', targetUrl);
                return targetUrl;
            }
            
            // Mise à jour initiale du lien
            updateLanguageSwitchLink();
            
            // 🔧 GESTIONNAIRE DE CLIC CORRIGÉ
            langSwitch.addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut
                
                console.log('🖱️ === CLIC TRADUCTION DÉTECTÉ ===');
                
                // Recalculer l'URL au moment précis du clic
                const finalTargetUrl = updateLanguageSwitchLink();
                
                console.log('🚀 🌐 NAVIGATION IMMINENTE VERS:', finalTargetUrl);
                console.log('🚀 📍 DEPUIS:', window.location.href);
                
                // Navigation immédiate
                window.location.href = finalTargetUrl;
            });
            
            console.log('✅ ⚡ GESTIONNAIRE DE TRADUCTION CORRIGÉ CONFIGURÉ');
        } else {
            console.error('❌ ERREUR CRITIQUE: Bouton de changement de langue NON TROUVÉ!');
        }

        // Menu mobile
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                console.log('📱 Menu mobile basculé');
            });
            console.log('✅ Menu mobile configuré');
        }

        // Fermeture du menu mobile
        document.addEventListener('click', function(event) {
            if (navMenu && mobileToggle) {
                if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });

        // Effets de scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
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
        });

        // Mise en évidence du lien actif
        highlightActiveLink();
        
        console.log('⚡ === INTERACTIONS LIENS INTERNES INITIALISÉES ===');
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
            }
        });
    }

    // Lancement automatique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

    console.log('🎯 ✅ Script de header LIENS INTERNES chargé avec succès!');

})();