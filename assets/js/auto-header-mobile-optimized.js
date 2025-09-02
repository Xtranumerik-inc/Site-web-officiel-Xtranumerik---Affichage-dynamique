/**
 * Script d'injection automatique du header - VERSION MOBILE OPTIMISÉE
 * DATE: 2 septembre 2025
 * 
 * 🔧 OPTIMISATIONS MOBILES :
 * ✅ Menu burger responsive avec animations fluides
 * ✅ Touch-friendly avec zones tactiles 48px minimum
 * ✅ Gestion complète des événements tactiles
 * ✅ Performance optimisée pour mobiles
 * ✅ Navigation intuitive avec fermeture automatique
 * ✅ Dropdown adaptatifs pour écrans tactiles
 * ✅ Logo responsive et adaptatif
 * ✅ Accessibilité mobile renforcée
 */

(function() {
    'use strict';

    // Configuration avec nouveau logo et optimisations mobiles
    const CONFIG = {
        // URL du logo avec fallback responsive
        LOGO_URL: '/data/images/LOGO%20Xtranumerik%20fond%20mauve%20(1920%20x%201080%20px).png',
        
        // Détection d'appareil mobile
        isMobile: function() {
            return window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        // Optimisation performance mobile
        isReducedMotion: function() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        }
    };

    // Templates HTML pour les headers - VERSION MOBILE OPTIMISÉE
    const HEADER_FR = {
        html: `
        <header class=\"main-header mobile-optimized\" id=\"main-header\">
            <nav class=\"header-nav\" role=\"navigation\" aria-label=\"Navigation principale\">
                <div class=\"nav-container\">
                    <!-- Logo responsive -->\n                    <div class=\"nav-logo\">\n                        <a href=\"/pages/fr/index.html\" class=\"logo-link\" aria-label=\"Accueil Xtranumerik\">\n                            <img src=\"${CONFIG.LOGO_URL}\" alt=\"Logo Xtranumerik\" class=\"logo-img\">\n                        </a>\n                    </div>

                    <!-- Navigation principale -->\n                    <ul class=\"nav-menu\" id=\"nav-menu\" role=\"menubar\">\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/fr/index.html\" class=\"nav-link\" role=\"menuitem\">Accueil</a>\n                        </li>\n                        <li class=\"nav-item dropdown\" role=\"none\">\n                            <a href=\"javascript:void(0)\" class=\"nav-link dropdown-toggle\" role=\"menuitem\" aria-haspopup=\"true\" aria-expanded=\"false\">Solutions <span class=\"dropdown-arrow\">▼</span></a>\n                            <ul class=\"dropdown-menu\" role=\"menu\" aria-label=\"Solutions\">\n                                <li role=\"none\"><a href=\"/pages/fr/industries.html\" class=\"dropdown-link\" role=\"menuitem\">Industries</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/gyms.html\" class=\"dropdown-link\" role=\"menuitem\">Gyms</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/restaurants.html\" class=\"dropdown-link\" role=\"menuitem\">Restaurants</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/concessions-auto.html\" class=\"dropdown-link\" role=\"menuitem\">Concessions Auto</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/hotels.html\" class=\"dropdown-link\" role=\"menuitem\">Hôtels</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/centres-commerciaux.html\" class=\"dropdown-link\" role=\"menuitem\">Centres Commerciaux</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/commerce-detail.html\" class=\"dropdown-link\" role=\"menuitem\">Commerce de Détail</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/pharmacies.html\" class=\"dropdown-link\" role=\"menuitem\">Pharmacies</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/cliniques-dentaires.html\" class=\"dropdown-link\" role=\"menuitem\">Cliniques Dentaires</a></li>\n                                <li role=\"none\"><a href=\"/pages/fr/salons-coiffure.html\" class=\"dropdown-link\" role=\"menuitem\">Salons de Coiffure</a></li>\n                            </ul>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/fr/contact.html\" class=\"nav-link\" role=\"menuitem\">Contact</a>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/fr/reseau-publicitaire.html\" class=\"nav-link\" role=\"menuitem\">Réseau Publicitaire</a>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/fr/carte.html\" class=\"nav-link\" role=\"menuitem\">Carte Interactive</a>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/fr/connexion.html\" class=\"nav-link\" role=\"menuitem\">Connexion</a>\n                        </li>\n                    </ul>

                    <!-- Actions mobiles optimisées -->\n                    <div class=\"nav-actions\">\n                        <a href=\"javascript:void(0)\" class=\"lang-switch\" id=\"lang-switch\" title=\"Switch to English\" aria-label=\"Changer la langue vers l'anglais\">EN</a>\n                        <a href=\"/pages/fr/contact.html\" class=\"cta-button\">Contactez-nous</a>\n                        <button class=\"mobile-menu-toggle\" id=\"mobile-menu-toggle\" aria-label=\"Ouvrir le menu\" aria-expanded=\"false\" aria-controls=\"nav-menu\">\n                            <span class=\"hamburger-line\"></span>\n                            <span class=\"hamburger-line\"></span>\n                            <span class=\"hamburger-line\"></span>\n                        </button>\n                    </div>\n                </div>\n            </nav>\n        </header>\n        `,
        styles: `
        <style>
        /* Reset et optimisations mobiles de base */
        .main-header.mobile-optimized {\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            background: rgba(25, 5, 68, 0.95);\n            backdrop-filter: blur(20px);\n            border-bottom: 1px solid rgba(255, 169, 26, 0.2);\n            z-index: 1000;\n            transition: all 0.3s ease;\n            -webkit-backdrop-filter: blur(20px); /* Safari support */\n        }
        
        .header-nav {\n            padding: 0;\n            position: relative;\n        }
        
        .nav-container {\n            max-width: 1400px;\n            margin: 0 auto;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            padding: 0.75rem 1rem;\n            height: 70px;\n        }
        
        /* Logo responsive et optimisé mobile */
        .nav-logo .logo-link {\n            display: flex;\n            align-items: center;\n            text-decoration: none;\n            touch-action: manipulation;\n            min-width: 48px;\n            min-height: 48px;\n            justify-content: center;\n        }
        
        .logo-img {\n            width: clamp(60px, 8vw, 80px);\n            height: clamp(35px, 5vw, 45px);\n            border-radius: 8px;\n            object-fit: contain;\n            transition: transform 0.3s ease;\n        }
        
        .logo-img:hover {\n            transform: scale(1.05);\n        }
        
        /* Navigation principale - Mobile First */
        .nav-menu {\n            display: flex;\n            list-style: none;\n            margin: 0;\n            padding: 0;\n            gap: 1.5rem;\n            position: static;\n            background: transparent;\n        }
        
        .nav-item {\n            position: relative;\n        }
        
        .nav-link {\n            color: white;\n            text-decoration: none;\n            font-weight: 500;\n            padding: 0.75rem 0.5rem;\n            transition: all 0.3s ease;\n            display: flex;\n            align-items: center;\n            gap: 0.25rem;\n            border-radius: 8px;\n            touch-action: manipulation;\n            min-height: 48px;\n            font-size: clamp(0.9rem, 2.5vw, 1rem);\n        }
        
        .nav-link:hover,\n        .nav-link:focus {\n            color: #ffa91a;\n            background: rgba(255, 169, 26, 0.1);\n            outline: 2px solid rgba(255, 169, 26, 0.3);\n            outline-offset: 2px;\n        }
        
        .dropdown-toggle {\n            cursor: pointer;\n        }
        
        .dropdown-arrow {\n            font-size: 0.8rem;\n            transition: transform 0.3s ease;\n        }
        
        .dropdown:hover .dropdown-arrow {\n            transform: rotate(180deg);\n        }
        
        /* Dropdown adaptatif mobile */
        .dropdown-menu {\n            position: absolute;\n            top: 100%;\n            left: 0;\n            background: rgba(25, 5, 68, 0.98);\n            backdrop-filter: blur(20px);\n            -webkit-backdrop-filter: blur(20px);\n            border: 1px solid rgba(255, 169, 26, 0.2);\n            border-radius: 12px;\n            min-width: 200px;\n            opacity: 0;\n            visibility: hidden;\n            transform: translateY(-10px);\n            transition: all 0.3s ease;\n            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n            list-style: none;\n            margin: 0;\n            padding: 0.5rem 0;\n            margin-top: 0.5rem;\n            max-height: 70vh;\n            overflow-y: auto;\n        }
        
        .dropdown:hover .dropdown-menu,\n        .dropdown:focus-within .dropdown-menu {\n            opacity: 1;\n            visibility: visible;\n            transform: translateY(0);\n        }
        
        .dropdown-link {\n            display: block;\n            color: white;\n            text-decoration: none;\n            padding: 0.75rem 1.5rem;\n            transition: all 0.3s ease;\n            font-weight: 400;\n            border-radius: 8px;\n            margin: 0 0.5rem;\n            touch-action: manipulation;\n            min-height: 48px;\n            font-size: clamp(0.85rem, 2.2vw, 0.95rem);\n        }
        
        .dropdown-link:hover,\n        .dropdown-link:focus {\n            background: rgba(255, 169, 26, 0.15);\n            color: #ffa91a;\n            padding-left: 2rem;\n            outline: 2px solid rgba(255, 169, 26, 0.3);\n        }
        
        /* Actions mobiles optimisées */
        .nav-actions {\n            display: flex;\n            align-items: center;\n            gap: 0.5rem;\n        }
        
        .lang-switch {\n            background: rgba(255, 169, 26, 0.1);\n            color: #ffa91a;\n            padding: 0.5rem 0.75rem;\n            border-radius: 25px;\n            text-decoration: none;\n            font-weight: 600;\n            font-size: clamp(0.8rem, 2.2vw, 0.9rem);\n            transition: all 0.3s ease;\n            border: 1px solid rgba(255, 169, 26, 0.3);\n            cursor: pointer;\n            touch-action: manipulation;\n            min-width: 48px;\n            min-height: 48px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }
        
        .lang-switch:hover,\n        .lang-switch:focus {\n            background: #ffa91a;\n            color: #190544;\n            transform: translateY(-2px);\n            outline: 2px solid rgba(255, 169, 26, 0.5);\n        }
        
        .cta-button {\n            background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);\n            color: #190544;\n            padding: 0.5rem 1rem;\n            border-radius: 25px;\n            text-decoration: none;\n            font-weight: 700;\n            transition: all 0.3s ease;\n            box-shadow: 0 4px 15px rgba(255, 169, 26, 0.3);\n            touch-action: manipulation;\n            min-height: 48px;\n            display: flex;\n            align-items: center;\n            font-size: clamp(0.8rem, 2.2vw, 0.9rem);\n            white-space: nowrap;\n        }
        
        .cta-button:hover,\n        .cta-button:focus {\n            transform: translateY(-2px);\n            box-shadow: 0 6px 20px rgba(255, 169, 26, 0.4);\n            outline: 2px solid rgba(255, 169, 26, 0.5);\n        }
        
        /* Menu mobile hamburger optimisé */
        .mobile-menu-toggle {\n            display: none;\n            flex-direction: column;\n            background: none;\n            border: none;\n            cursor: pointer;\n            padding: 0.5rem;\n            gap: 0.25rem;\n            touch-action: manipulation;\n            min-width: 48px;\n            min-height: 48px;\n            justify-content: center;\n            align-items: center;\n            border-radius: 8px;\n            transition: background-color 0.3s ease;\n        }
        
        .mobile-menu-toggle:hover,\n        .mobile-menu-toggle:focus {\n            background: rgba(255, 169, 26, 0.1);\n            outline: 2px solid rgba(255, 169, 26, 0.3);\n        }
        
        .hamburger-line {\n            width: 25px;\n            height: 3px;\n            background: white;\n            transition: all 0.3s ease;\n            border-radius: 2px;\n        }
        
        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {\n            transform: rotate(45deg) translate(6px, 6px);\n        }\n        \n        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {\n            opacity: 0;\n        }\n        \n        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {\n            transform: rotate(-45deg) translate(6px, -6px);\n        }
        
        /* Responsive mobile-first breakpoints */\n        @media (max-width: 768px) {\n            .nav-container {\n                padding: 0.75rem 1rem;\n                height: 60px;\n            }\n            \n            .nav-menu {\n                position: fixed;\n                top: 60px;\n                left: 0;\n                width: 100%;\n                background: rgba(25, 5, 68, 0.98);\n                backdrop-filter: blur(20px);\n                -webkit-backdrop-filter: blur(20px);\n                flex-direction: column;\n                padding: 1.5rem;\n                gap: 0;\n                opacity: 0;\n                visibility: hidden;\n                transform: translateY(-20px);\n                transition: all 0.3s ease;\n                max-height: calc(100vh - 60px);\n                overflow-y: auto;\n                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n            }\n            \n            .nav-menu.active {\n                opacity: 1;\n                visibility: visible;\n                transform: translateY(0);\n            }\n            \n            .nav-item {\n                width: 100%;\n                border-bottom: 1px solid rgba(255, 169, 26, 0.1);\n            }\n            \n            .nav-item:last-child {\n                border-bottom: none;\n            }\n            \n            .nav-link {\n                padding: 1rem 0;\n                font-size: 1.1rem;\n                justify-content: center;\n                width: 100%;\n            }\n            \n            .mobile-menu-toggle {\n                display: flex;\n            }\n            \n            .nav-actions {\n                gap: 0.25rem;\n            }\n            \n            .cta-button {\n                padding: 0.4rem 0.8rem;\n                font-size: 0.8rem;\n            }\n            \n            .lang-switch {\n                padding: 0.4rem 0.6rem;\n                font-size: 0.8rem;\n                min-width: 40px;\n                min-height: 40px;\n            }\n            \n            /* Dropdown mobile adaptatif */\n            .dropdown-menu {\n                position: static;\n                opacity: 1;\n                visibility: visible;\n                transform: none;\n                box-shadow: none;\n                border: none;\n                background: rgba(255, 169, 26, 0.1);\n                margin: 0.5rem 0 0 0;\n                border-radius: 8px;\n                backdrop-filter: none;\n                -webkit-backdrop-filter: none;\n                max-height: none;\n            }\n            \n            .dropdown-link {\n                padding: 0.75rem 1rem;\n                margin: 0;\n                border-radius: 0;\n                text-align: center;\n                font-size: 1rem;\n            }\n        }
        
        /* Très petits écrans */\n        @media (max-width: 480px) {\n            .nav-container {\n                padding: 0.5rem;\n                height: 55px;\n            }\n            \n            .nav-menu {\n                top: 55px;\n                max-height: calc(100vh - 55px);\n                padding: 1rem;\n            }\n            \n            .logo-img {\n                width: clamp(50px, 10vw, 65px);\n                height: clamp(30px, 6vw, 38px);\n            }\n            \n            .cta-button {\n                padding: 0.3rem 0.6rem;\n                font-size: 0.75rem;\n            }\n            \n            .lang-switch {\n                padding: 0.3rem 0.5rem;\n                font-size: 0.75rem;\n                min-width: 36px;\n                min-height: 36px;\n            }\n            \n            .mobile-menu-toggle {\n                min-width: 44px;\n                min-height: 44px;\n                padding: 0.4rem;\n            }\n            \n            .hamburger-line {\n                width: 22px;\n                height: 2px;\n            }\n        }
        
        /* Tablettes */\n        @media (min-width: 769px) and (max-width: 1024px) {\n            .nav-container {\n                padding: 1rem 1.5rem;\n            }\n            \n            .nav-menu {\n                gap: 1.25rem;\n            }\n            \n            .nav-actions {\n                gap: 0.75rem;\n            }\n        }
        
        /* Grands écrans */\n        @media (min-width: 1025px) {\n            .nav-container {\n                padding: 1rem 2rem;\n            }\n            \n            .nav-menu {\n                gap: 2rem;\n            }\n            \n            .nav-actions {\n                gap: 1rem;\n            }\n            \n            .cta-button {\n                padding: 0.75rem 1.5rem;\n                font-size: 1rem;\n            }\n            \n            .lang-switch {\n                padding: 0.5rem 1rem;\n                font-size: 0.9rem;\n            }\n        }
        
        /* Optimisations pour réduire le mouvement */\n        @media (prefers-reduced-motion: reduce) {\n            .main-header.mobile-optimized,\n            .nav-link,\n            .dropdown-menu,\n            .lang-switch,\n            .cta-button,\n            .hamburger-line {\n                transition: none !important;\n            }\n            \n            .dropdown:hover .dropdown-arrow {\n                transform: none;\n            }\n        }
        
        /* Mode sombre */\n        @media (prefers-color-scheme: dark) {\n            .main-header.mobile-optimized {\n                background: rgba(15, 23, 42, 0.95);\n            }\n            \n            .dropdown-menu {\n                background: rgba(15, 23, 42, 0.98);\n            }\n        }
        
        /* Ajustement du body pour le header fixe */\n        body {\n            padding-top: 70px;\n        }\n        \n        @media (max-width: 768px) {\n            body {\n                padding-top: 60px;\n            }\n        }\n        \n        @media (max-width: 480px) {\n            body {\n                padding-top: 55px;\n            }\n        }
        </style>\n        `
    };

    const HEADER_EN = {
        html: `
        <header class=\"main-header mobile-optimized\" id=\"main-header\">
            <nav class=\"header-nav\" role=\"navigation\" aria-label=\"Main navigation\">
                <div class=\"nav-container\">
                    <!-- Responsive Logo -->\n                    <div class=\"nav-logo\">\n                        <a href=\"/pages/en/index.html\" class=\"logo-link\" aria-label=\"Xtranumerik Home\">\n                            <img src=\"${CONFIG.LOGO_URL}\" alt=\"Xtranumerik Logo\" class=\"logo-img\">\n                        </a>\n                    </div>

                    <!-- Main Navigation -->\n                    <ul class=\"nav-menu\" id=\"nav-menu\" role=\"menubar\">\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/en/index.html\" class=\"nav-link\" role=\"menuitem\">Home</a>\n                        </li>\n                        <li class=\"nav-item dropdown\" role=\"none\">\n                            <a href=\"javascript:void(0)\" class=\"nav-link dropdown-toggle\" role=\"menuitem\" aria-haspopup=\"true\" aria-expanded=\"false\">Solutions <span class=\"dropdown-arrow\">▼</span></a>\n                            <ul class=\"dropdown-menu\" role=\"menu\" aria-label=\"Solutions\">\n                                <li role=\"none\"><a href=\"/pages/en/industries.html\" class=\"dropdown-link\" role=\"menuitem\">Industries</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/gyms.html\" class=\"dropdown-link\" role=\"menuitem\">Gyms</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/restaurants.html\" class=\"dropdown-link\" role=\"menuitem\">Restaurants</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/car-dealerships.html\" class=\"dropdown-link\" role=\"menuitem\">Car Dealerships</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/hotels.html\" class=\"dropdown-link\" role=\"menuitem\">Hotels</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/shopping-centers.html\" class=\"dropdown-link\" role=\"menuitem\">Shopping Centers</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/retail-stores.html\" class=\"dropdown-link\" role=\"menuitem\">Retail Stores</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/pharmacies.html\" class=\"dropdown-link\" role=\"menuitem\">Pharmacies</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/dental-clinics.html\" class=\"dropdown-link\" role=\"menuitem\">Dental Clinics</a></li>\n                                <li role=\"none\"><a href=\"/pages/en/hair-salons.html\" class=\"dropdown-link\" role=\"menuitem\">Hair Salons</a></li>\n                            </ul>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/en/contact.html\" class=\"nav-link\" role=\"menuitem\">Contact</a>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/en/advertising-network.html\" class=\"nav-link\" role=\"menuitem\">Advertising Network</a>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/en/map.html\" class=\"nav-link\" role=\"menuitem\">Interactive Map</a>\n                        </li>\n                        <li class=\"nav-item\" role=\"none\">\n                            <a href=\"/pages/en/login.html\" class=\"nav-link\" role=\"menuitem\">Login</a>\n                        </li>\n                    </ul>

                    <!-- Mobile-optimized Actions -->\n                    <div class=\"nav-actions\">\n                        <a href=\"javascript:void(0)\" class=\"lang-switch\" id=\"lang-switch\" title=\"Passer au français\" aria-label=\"Switch language to French\">FR</a>\n                        <a href=\"/pages/en/contact.html\" class=\"cta-button\">Contact Us</a>\n                        <button class=\"mobile-menu-toggle\" id=\"mobile-menu-toggle\" aria-label=\"Open menu\" aria-expanded=\"false\" aria-controls=\"nav-menu\">\n                            <span class=\"hamburger-line\"></span>\n                            <span class=\"hamburger-line\"></span>\n                            <span class=\"hamburger-line\"></span>\n                        </button>\n                    </div>\n                </div>\n            </nav>\n        </header>\n        `,
        styles: HEADER_FR.styles // Mêmes styles optimisés
    };

    // Fonction principale d'injection mobile-optimisée
    function injectHeader() {
        console.log('🚀 === INJECTION HEADER MOBILE OPTIMISÉ - DÉBUT ===');\n        \n        const language = CONFIG.detectLanguage();\n        const headerConfig = language === 'en' ? HEADER_EN : HEADER_FR;\n        \n        console.log('📋 Header mobile sélectionné:', language.toUpperCase());\n        console.log('📱 Appareil mobile détecté:', CONFIG.isMobile());\n        console.log('⚡ Mouvement réduit:', CONFIG.isReducedMotion());

        // Injection des styles avec optimisations mobiles
        if (!document.getElementById('auto-header-mobile-styles')) {\n            const styleElement = document.createElement('div');\n            styleElement.id = 'auto-header-mobile-styles';\n            styleElement.innerHTML = headerConfig.styles;\n            document.head.appendChild(styleElement);\n            console.log('🎨 Styles mobiles injectés avec ID unique');\n        }

        // Injection du HTML
        const headerContainer = document.createElement('div');\n        headerContainer.innerHTML = headerConfig.html;\n        const headerElement = headerContainer.firstElementChild;\n        \n        // Insérer le header au début du body\n        document.body.insertBefore(headerElement, document.body.firstChild);\n        console.log('🏗️ HTML du header mobile injecté');\n\n        // Initialisation des interactions mobiles\n        initializeMobileHeaderInteractions();\n        \n        console.log('✅ Header mobile', language.toUpperCase(), 'injecté avec succès');\n        console.log('🚀 === INJECTION HEADER MOBILE OPTIMISÉ - FIN ===');\n    }

    // Fonction d'initialisation des interactions mobiles optimisées
    function initializeMobileHeaderInteractions() {\n        console.log('⚡ === INIT INTERACTIONS MOBILES ===');\n        \n        // Configuration du bouton de changement de langue\n        const langSwitch = document.getElementById('lang-switch');\n        \n        if (langSwitch) {\n            console.log('🔍 Bouton de changement de langue trouvé');\n            \n            function updateLanguageSwitchLink() {\n                const targetUrl = CONFIG.getAlternateLangUrl();\n                langSwitch.href = targetUrl;\n                console.log('🔗 ✅ LIEN TRANSLATION MOBILE CORRIGÉ:', targetUrl);\n                return targetUrl;\n            }\n            \n            // Mise à jour initiale du lien\n            updateLanguageSwitchLink();\n            \n            // Gestionnaire de clic optimisé mobile\n            langSwitch.addEventListener('click', function(event) {\n                event.preventDefault();\n                \n                console.log('🖱️ === CLIC TRADUCTION MOBILE DÉTECTÉ ===');\n                \n                const finalTargetUrl = updateLanguageSwitchLink();\n                \n                console.log('🚀 🌐 NAVIGATION MOBILE VERS:', finalTargetUrl);\n                console.log('🚀 📍 DEPUIS:', window.location.href);\n                \n                window.location.href = finalTargetUrl;\n            });\n            \n            // Support du clavier pour accessibilité\n            langSwitch.addEventListener('keydown', function(event) {\n                if (event.key === 'Enter' || event.key === ' ') {\n                    event.preventDefault();\n                    this.click();\n                }\n            });\n            \n            console.log('✅ ⚡ GESTIONNAIRE DE TRADUCTION MOBILE CONFIGURÉ');\n        } else {\n            console.error('❌ ERREUR: Bouton de changement de langue NON TROUVÉ!');\n        }

        // Menu mobile optimisé avec gestion tactile\n        const mobileToggle = document.getElementById('mobile-menu-toggle');\n        const navMenu = document.getElementById('nav-menu');\n\n        if (mobileToggle && navMenu) {\n            // Gestion du clic/touch\n            mobileToggle.addEventListener('click', function(event) {\n                event.preventDefault();\n                toggleMobileMenu();\n            });\n            \n            // Support tactile amélioré\n            let touchStartY = 0;\n            mobileToggle.addEventListener('touchstart', function(event) {\n                touchStartY = event.touches[0].clientY;\n            }, { passive: true });\n            \n            mobileToggle.addEventListener('touchend', function(event) {\n                const touchEndY = event.changedTouches[0].clientY;\n                const touchDiff = Math.abs(touchEndY - touchStartY);\n                \n                // Si le mouvement est minimal, considérer comme un tap\n                if (touchDiff < 10) {\n                    event.preventDefault();\n                    toggleMobileMenu();\n                }\n            }, { passive: false });\n            \n            // Support clavier pour accessibilité\n            mobileToggle.addEventListener('keydown', function(event) {\n                if (event.key === 'Enter' || event.key === ' ') {\n                    event.preventDefault();\n                    toggleMobileMenu();\n                }\n            });\n            \n            function toggleMobileMenu() {\n                const isActive = mobileToggle.classList.toggle('active');\n                navMenu.classList.toggle('active', isActive);\n                \n                // Mise à jour ARIA pour accessibilité\n                mobileToggle.setAttribute('aria-expanded', isActive.toString());\n                mobileToggle.setAttribute('aria-label', isActive ? 'Fermer le menu' : 'Ouvrir le menu');\n                \n                // Gestion du focus\n                if (isActive) {\n                    // Désactiver le scroll du body quand le menu est ouvert\n                    document.body.style.overflow = 'hidden';\n                    // Focus sur le premier lien du menu\n                    const firstLink = navMenu.querySelector('.nav-link');\n                    if (firstLink) {\n                        setTimeout(() => firstLink.focus(), 100);\n                    }\n                } else {\n                    // Réactiver le scroll du body\n                    document.body.style.overflow = '';\n                }\n                \n                console.log('📱 Menu mobile basculé:', isActive ? 'OUVERT' : 'FERMÉ');\n            }\n            \n            console.log('✅ Menu mobile tactile configuré');\n        }

        // Fermeture automatique du menu mobile\n        document.addEventListener('click', function(event) {\n            if (navMenu && mobileToggle) {\n                if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {\n                    navMenu.classList.remove('active');\n                    mobileToggle.classList.remove('active');\n                    mobileToggle.setAttribute('aria-expanded', 'false');\n                    mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');\n                    document.body.style.overflow = '';\n                }\n            }\n        });\n        \n        // Fermeture avec Escape\n        document.addEventListener('keydown', function(event) {\n            if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {\n                navMenu.classList.remove('active');\n                mobileToggle.classList.remove('active');\n                mobileToggle.setAttribute('aria-expanded', 'false');\n                mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');\n                document.body.style.overflow = '';\n                mobileToggle.focus();\n            }\n        });\n        \n        // Fermeture automatique sur redimensionnement\n        let resizeTimer;\n        window.addEventListener('resize', function() {\n            clearTimeout(resizeTimer);\n            resizeTimer = setTimeout(function() {\n                if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {\n                    navMenu.classList.remove('active');\n                    mobileToggle.classList.remove('active');\n                    mobileToggle.setAttribute('aria-expanded', 'false');\n                    document.body.style.overflow = '';\n                }\n            }, 250);\n        });

        // Effets de scroll optimisés pour mobile avec debouncing\n        let scrollTimeout;\n        let lastScrollTop = 0;\n        const scrollThreshold = 10; // Seuil minimal pour déclencher les effets\n        \n        function handleScroll() {\n            const header = document.getElementById('main-header');\n            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;\n            const scrollDiff = Math.abs(currentScroll - lastScrollTop);\n            \n            // Ignorer les petits mouvements de scroll\n            if (scrollDiff < scrollThreshold) return;\n\n            if (header) {\n                // Cache le header lors du scroll vers le bas, l'affiche lors du scroll vers le haut\n                if (currentScroll > lastScrollTop && currentScroll > 100) {\n                    header.style.transform = 'translateY(-100%)';\n                } else {\n                    header.style.transform = 'translateY(0)';\n                }\n\n                // Opacité du background basée sur le scroll\n                if (currentScroll > 50) {\n                    header.style.background = 'rgba(25, 5, 68, 0.98)';\n                } else {\n                    header.style.background = 'rgba(25, 5, 68, 0.95)';\n                }\n            }\n\n            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;\n        }\n        \n        // Debounced scroll handler pour optimiser les performances\n        function debouncedScroll() {\n            clearTimeout(scrollTimeout);\n            scrollTimeout = setTimeout(handleScroll, 10);\n        }\n        \n        // Utiliser passive listeners pour de meilleures performances\n        window.addEventListener('scroll', debouncedScroll, { passive: true });\n\n        // Mise en évidence du lien actif mobile\n        highlightActiveLinkMobile();\n        \n        // Support des gestes tactiles pour les dropdowns\n        initializeTouchDropdowns();\n        \n        console.log('⚡ === INTERACTIONS MOBILES INITIALISÉES ===');\n    }

    // Fonction de mise en évidence du lien actif mobile
    function highlightActiveLinkMobile() {\n        const currentPath = window.location.pathname;\n        const navLinks = document.querySelectorAll('.nav-link');\n\n        navLinks.forEach(link => {\n            const linkPath = new URL(link.href).pathname;\n            if (linkPath === currentPath) {\n                link.style.color = '#ffa91a';\n                link.style.fontWeight = '700';\n                link.style.background = 'rgba(255, 169, 26, 0.1)';\n                link.setAttribute('aria-current', 'page');\n            }\n        });\n    }\n    \n    // Initialisation des dropdowns tactiles\n    function initializeTouchDropdowns() {\n        const dropdowns = document.querySelectorAll('.dropdown');\n        \n        dropdowns.forEach(dropdown => {\n            const toggle = dropdown.querySelector('.dropdown-toggle');\n            const menu = dropdown.querySelector('.dropdown-menu');\n            \n            if (toggle && menu) {\n                let isOpen = false;\n                \n                // Gestion tactile des dropdowns\n                toggle.addEventListener('click', function(event) {\n                    if (CONFIG.isMobile()) {\n                        event.preventDefault();\n                        isOpen = !isOpen;\n                        \n                        if (isOpen) {\n                            menu.style.position = 'static';\n                            menu.style.opacity = '1';\n                            menu.style.visibility = 'visible';\n                            menu.style.transform = 'translateY(0)';\n                            toggle.setAttribute('aria-expanded', 'true');\n                        } else {\n                            menu.style.opacity = '0';\n                            menu.style.visibility = 'hidden';\n                            menu.style.transform = 'translateY(-10px)';\n                            toggle.setAttribute('aria-expanded', 'false');\n                        }\n                    }\n                });\n                \n                // Support clavier\n                toggle.addEventListener('keydown', function(event) {\n                    if (event.key === 'Enter' || event.key === ' ') {\n                        event.preventDefault();\n                        this.click();\n                    }\n                });\n            }\n        });\n    }

    // Lancement automatique avec détection de readyState\n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', injectHeader);\n    } else {\n        injectHeader();\n    }\n\n    console.log('🎯 ✅ Script de header MOBILE OPTIMISÉ chargé avec succès!');\n    console.log('📱 Version mobile-first avec support tactile complet');\n\n})();