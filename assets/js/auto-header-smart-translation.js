/**
 * Script d'injection automatique du header Xtranumerik - VERSION TRADUCTION INTELLIGENTE
 * DATE: 27 août 2025
 * 
 * 🎯 PROBLÈME RÉSOLU : Navigation intelligente vers la page équivalente
 * 
 * ❌ PROBLÈME IDENTIFIÉ :
 * - Le bouton EN/FR renvoyait toujours vers la page d'accueil
 * - Aucune détection de la page actuelle depuis l'URL réelle
 * - Mapping incomplet des pages FR ↔ EN
 * 
 * ✅ CORRECTIONS APPORTÉES :
 * - Détection précise de la page depuis window.location.pathname  
 * - Support complet des patterns d'URL actuels du site:
 *   * /fr/contact → /en/contact
 *   * /fr/reseau-publicitaire → /en/advertising-network
 *   * /pages/fr/contact.html → /pages/en/contact.html
 * - Mapping bidirectionnel complet et testé
 * - Génération d'URL dynamique au moment du clic
 * - Fallback sécurisé vers la page d'accueil si mapping introuvable
 * - Logs détaillés pour debug et maintenance
 * 
 * 🧪 TESTS EFFECTUÉS :
 * ✅ /fr/contact → /en/contact 
 * ✅ /en/contact → /fr/contact
 * ✅ /fr/reseau-publicitaire → /en/advertising-network
 * ✅ /en/advertising-network → /fr/reseau-publicitaire
 * ✅ /pages/fr/carte.html → /pages/en/map.html
 * ✅ Fallback si page inexistante → page d'accueil
 * 
 * @author Assistant AI
 * @version 2.0.0
 */

(function() {
    'use strict';

    // 🗺️ CONFIGURATION DE MAPPING COMPLÈTE
    const CONFIG = {
        // Mapping bidirectionnel des pages FR ↔ EN
        pageMapping: {
            // Français → Anglais
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
                'salons-coiffure.html': 'hair-salons.html',
                
                // Pages sans extension (URLs courtes)
                'contact': 'contact',
                'reseau-publicitaire': 'advertising-network',
                'carte': 'map',
                'connexion': 'login',
                'carrieres': 'careers',
                'industries': 'industries',
                'gyms': 'gyms',
                'restaurants': 'restaurants',
                'concessions-auto': 'car-dealerships',
                'hotels': 'hotels',
                'centres-commerciaux': 'shopping-centers',
                'commerce-detail': 'retail-stores',
                'pharmacies': 'pharmacies',
                'cliniques-dentaires': 'dental-clinics',
                'salons-coiffure': 'hair-salons'
            },
            
            // Anglais → Français  
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
                'hair-salons.html': 'salons-coiffure.html',
                
                // Pages sans extension (URLs courtes)
                'contact': 'contact',
                'advertising-network': 'reseau-publicitaire', 
                'map': 'carte',
                'login': 'connexion',
                'careers': 'carrieres',
                'industries': 'industries',
                'gyms': 'gyms',
                'restaurants': 'restaurants',
                'car-dealerships': 'concessions-auto',
                'hotels': 'hotels',
                'shopping-centers': 'centres-commerciaux',
                'retail-stores': 'commerce-detail',
                'pharmacies': 'pharmacies',
                'dental-clinics': 'cliniques-dentaires',
                'hair-salons': 'salons-coiffure'
            }
        },

        // 🔍 DÉTECTION INTELLIGENTE DE LA LANGUE
        detectLanguage: function() {
            console.log('🔍 === DÉTECTION DE LANGUE ===');
            
            // 1. Vérifier l'attribut lang du HTML
            const htmlLang = document.documentElement.lang;
            if (htmlLang) {
                const detectedLang = htmlLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
                console.log('🏷️  Langue détectée via attribut HTML lang:', htmlLang, '→', detectedLang);
                return detectedLang;
            }
            
            // 2. Analyser l'URL courante  
            const pathname = window.location.pathname.toLowerCase();
            console.log('🔍 Analyse du pathname:', pathname);
            
            // Détecter les patterns d'URL courants
            if (pathname.includes('/en/') || pathname.includes('/pages/en/')) {
                console.log('✅ Langue détectée via URL: anglais');
                return 'en';
            }
            
            if (pathname.includes('/fr/') || pathname.includes('/pages/fr/')) {
                console.log('✅ Langue détectée via URL: français');
                return 'fr';
            }
            
            // 3. Fallback vers français par défaut
            console.log('🔄 Langue par défaut appliquée: français');
            return 'fr';
        },

        // 📄 EXTRACTION INTELLIGENTE DU NOM DE PAGE
        getCurrentPageName: function() {
            console.log('📄 === EXTRACTION NOM DE PAGE ===');
            
            const fullPath = window.location.pathname;
            console.log('📄 URL pathname complète:', fullPath);
            
            // Nettoyer et diviser le chemin
            const segments = fullPath.split('/').filter(segment => segment.length > 0);
            console.log('📄 Segments détectés:', segments);
            
            let pageName = 'index'; // Valeur par défaut
            
            // PATTERN 1: Chemin vide → Page d'accueil
            if (segments.length === 0) {
                console.log('📄 Pattern: URL racine (/) → index');
                return 'index';
            }
            
            // PATTERN 2: /fr/nompage ou /en/nompage  
            // Exemple: /fr/contact, /en/advertising-network
            if (segments.length >= 2 && (segments[0] === 'fr' || segments[0] === 'en')) {
                pageName = segments[1];
                console.log('📄 Pattern: /langue/page détecté → ' + pageName);
            }
            
            // PATTERN 3: /pages/fr/nompage.html ou /pages/en/nompage.html
            // Exemple: /pages/fr/contact.html
            else if (segments.length >= 3 && segments[0] === 'pages') {
                pageName = segments[2];
                console.log('📄 Pattern: /pages/langue/page détecté → ' + pageName);
                
                // Supprimer l'extension .html si présente
                if (pageName.endsWith('.html')) {
                    pageName = pageName.replace('.html', '');
                    console.log('📄 Extension .html supprimée → ' + pageName);
                }
            }
            
            // PATTERN 4: Page directe
            else if (segments.length >= 1) {
                pageName = segments[segments.length - 1];
                console.log('📄 Pattern: page directe détectée → ' + pageName);
            }
            
            // Nettoyer les paramètres URL et ancres
            pageName = pageName.split('?')[0].split('#')[0];
            
            console.log('📄 ✅ Nom de page final:', pageName);
            console.log('📄 === FIN EXTRACTION ===');
            
            return pageName;
        },

        // 🔄 GÉNÉRATION INTELLIGENTE DE L'URL DE TRADUCTION
        generateTranslationUrl: function() {
            console.log('🌐 === GÉNÉRATION URL TRADUCTION ===');
            
            const currentLang = this.detectLanguage();
            const targetLang = currentLang === 'fr' ? 'en' : 'fr';
            const currentPageName = this.getCurrentPageName();
            
            console.log('🌐 État actuel:');
            console.log('  - Langue actuelle:', currentLang);
            console.log('  - Langue cible:', targetLang);
            console.log('  - Page actuelle:', currentPageName);
            
            // Chercher la page équivalente dans la langue cible
            let targetPageName = null;
            let mappingMethod = 'aucun';
            
            // Tentative 1: Mapping direct
            const directMapping = this.pageMapping[currentLang];
            if (directMapping && directMapping[currentPageName]) {
                targetPageName = directMapping[currentPageName];
                mappingMethod = 'direct';
                console.log('✅ Mapping direct réussi:', currentPageName, '→', targetPageName);
            }
            
            // Tentative 2: Essayer avec extension .html
            if (!targetPageName && !currentPageName.includes('.html')) {
                const pageNameWithExt = currentPageName + '.html';
                if (directMapping && directMapping[pageNameWithExt]) {
                    targetPageName = directMapping[pageNameWithExt];
                    mappingMethod = 'direct avec extension';
                    console.log('✅ Mapping avec extension réussi:', pageNameWithExt, '→', targetPageName);
                    
                    // Si la cible a .html, la supprimer pour l'URL courte
                    if (targetPageName.endsWith('.html')) {
                        targetPageName = targetPageName.replace('.html', '');
                    }
                }
            }
            
            // Tentative 3: Recherche inverse dans le mapping de la langue cible
            if (!targetPageName) {
                const reverseMapping = this.pageMapping[targetLang];
                if (reverseMapping) {
                    const foundKey = Object.keys(reverseMapping).find(key => 
                        reverseMapping[key] === currentPageName || 
                        reverseMapping[key] === currentPageName + '.html'
                    );
                    
                    if (foundKey) {
                        targetPageName = foundKey.replace('.html', '');
                        mappingMethod = 'inverse';
                        console.log('✅ Mapping inverse réussi:', currentPageName, '→', targetPageName);
                    }
                }
            }
            
            // Tentative 4: Fallback vers page d'accueil
            if (!targetPageName) {
                targetPageName = 'index';
                mappingMethod = 'fallback';
                console.log('🛡️  Fallback appliqué → page d\'accueil');
            }
            
            // Construire l'URL finale
            // Détecter le format d'URL actuel pour conserver la cohérence
            const currentPath = window.location.pathname;
            let finalUrl;
            
            if (currentPath.includes('/pages/')) {
                // Format long: /pages/langue/page.html
                const extension = targetPageName === 'index' ? '.html' : '.html';
                finalUrl = `/pages/${targetLang}/${targetPageName}${extension}`;
            } else {
                // Format court: /langue/page
                if (targetPageName === 'index') {
                    finalUrl = `/${targetLang}/`;
                } else {
                    finalUrl = `/${targetLang}/${targetPageName}`;
                }
            }
            
            console.log('🌐 Résumé traduction:');
            console.log('  - Méthode mapping:', mappingMethod);
            console.log('  - Page source:', currentPageName, '(' + currentLang + ')');
            console.log('  - Page cible:', targetPageName, '(' + targetLang + ')');
            console.log('  - URL générée:', finalUrl);
            console.log('🌐 === FIN GÉNÉRATION ===');
            
            return finalUrl;
        }
    };

    // Exposer la configuration pour debug
    window.XTRANUMERIK_SMART_CONFIG = CONFIG;

    // 🎨 TEMPLATES HTML DES HEADERS (identiques à la version précédente)
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

                    <!-- Actions -->
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

                    <!-- Actions -->
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
        styles: HEADER_FR.styles // Mêmes styles
    };

    // 🚀 FONCTION D'INJECTION DU HEADER
    function injectHeader() {
        console.log('🚀 === INJECTION HEADER TRADUCTION INTELLIGENTE ===');
        
        const language = CONFIG.detectLanguage();
        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;
        
        console.log('🎨 Header sélectionné:', language.toUpperCase());

        // Injection des styles (avec ID unique pour éviter les doublons)
        if (!document.getElementById('smart-header-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'smart-header-styles';
            styleElement.innerHTML = headerConfig.styles;
            document.head.appendChild(styleElement);
            console.log('🎨 Styles injectés avec succès');
        }

        // Injection du HTML
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerConfig.html;
        const headerElement = headerContainer.firstElementChild;
        
        // Insérer au début du body
        document.body.insertBefore(headerElement, document.body.firstChild);
        console.log('🏗️  HTML du header injecté avec succès');

        // Initialiser les interactions
        initializeSmartHeaderInteractions();
        
        console.log('✅ Header', language.toUpperCase(), 'avec traduction intelligente activé!');
    }

    // ⚡ INITIALISATION DES INTERACTIONS INTELLIGENTES
    function initializeSmartHeaderInteractions() {
        console.log('⚡ === INIT INTERACTIONS INTELLIGENTES ===');
        
        // 🔗 CONFIGURATION DU BOUTON DE TRADUCTION INTELLIGENT
        const langSwitch = document.getElementById('lang-switch');
        
        if (langSwitch) {
            console.log('🔍 Bouton de traduction trouvé, configuration en cours...');
            
            // Fonction de mise à jour du lien (appelée au clic pour être toujours à jour)
            function updateTranslationLink() {
                const smartUrl = CONFIG.generateTranslationUrl();
                langSwitch.href = smartUrl;
                console.log('🔗 Lien de traduction mis à jour:', smartUrl);
                return smartUrl;
            }
            
            // Mise à jour initiale
            updateTranslationLink();
            
            // 🖱️  GESTIONNAIRE DE CLIC INTELLIGENT
            langSwitch.addEventListener('click', function(event) {
                event.preventDefault();
                
                console.log('🖱️  === CLIC TRADUCTION INTELLIGENT ===');
                console.log('🔄 URL actuelle:', window.location.href);
                
                // Recalculer l'URL au moment exact du clic pour une précision maximale
                const targetUrl = updateTranslationLink();
                
                console.log('🎯 Redirection vers:', targetUrl);
                console.log('🚀 Navigation en cours...');
                
                // Navigation immédiate
                window.location.href = targetUrl;
            });
            
            console.log('✅ Bouton de traduction intelligent configuré avec succès!');
        } else {
            console.error('❌ ERREUR: Bouton de traduction introuvable dans le DOM!');
        }

        // 📱 MENU MOBILE
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                console.log('📱 Menu mobile basculé');
            });
        }

        // 🖱️  FERMETURE DU MENU MOBILE PAR CLIC EXTÉRIEUR
        document.addEventListener('click', function(event) {
            if (navMenu && mobileToggle) {
                if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });

        // 📜 EFFETS DE SCROLL AVANCÉS
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const header = document.getElementById('main-header');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                // Auto-masquage lors du scroll vers le bas
                if (currentScroll > lastScrollTop && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                // Changement d'opacité selon la position
                if (currentScroll > 50) {
                    header.style.background = 'rgba(25, 5, 68, 0.98)';
                } else {
                    header.style.background = 'rgba(25, 5, 68, 0.95)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // 🎯 MISE EN ÉVIDENCE DU LIEN ACTIF
        highlightActiveLink();
        
        console.log('⚡ Toutes les interactions intelligentes sont configurées!');
    }

    // 🎯 FONCTION DE MISE EN ÉVIDENCE DU LIEN ACTIF
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.style.color = '#ffa91a';
                link.style.fontWeight = '700';
                console.log('🎯 Lien actif mis en évidence:', linkPath);
            }
        });
    }

    // 🎬 LANCEMENT AUTOMATIQUE
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

    console.log('🎊 Script de header avec traduction intelligente chargé!');
    console.log('🔧 Debug: CONFIG accessible via window.XTRANUMERIK_SMART_CONFIG');
    console.log('🧪 Test de traduction:', CONFIG.generateTranslationUrl());

})();