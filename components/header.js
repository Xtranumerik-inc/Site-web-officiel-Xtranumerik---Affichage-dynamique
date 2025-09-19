// Header component JavaScript functionality
(function() {
    // Charger la police Inter si nécessaire
    if (!document.fonts.check('1em Inter')) {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        console.log('Police Inter chargée');
    }

    // Définir les traductions et URLs pour chaque langue
    const translations = {
        fr: {
            affichage: { text: "Gestion d'affichage dynamique", href: "#" },
            reseau: { text: "Carte Publicitaire", href: "/pages/fr/carte%20publicitaire.html" },
            contact: { text: "Contact", href: "/pages/fr/contact.html" },
            login: { text: "Se Connecter", href: "/pages/fr/connexion.html" },
            logoHref: "/pages/fr/index.html",
            dropdown: [
                { href: "/pages/fr/industries.html", text: "Industries", alt: "Industries", desc: "Affiche les métriques de production et les alertes de sécurité." },
                { href: "/pages/fr/gyms.html", text: "Gyms", alt: "Gyms", desc: "Présente les horaires de cours et des conseils de fitness." },
                { href: "/pages/fr/restaurants.html", text: "Restaurants", alt: "Restaurants", desc: "Affiche les menus et les offres spéciales." },
                { href: "/pages/fr/concessions-auto.html", text: "Concessions automobiles", alt: "Concessions automobiles", desc: "Met en avant les promotions et les véhicules en vedette." },
                { href: "/pages/fr/hotels.html", text: "Hôtels", alt: "Hôtels", desc: "Informe sur les services et les événements." },
                { href: "/pages/fr/centres-commerciaux.html", text: "Centres commerciaux", alt: "Centres commerciaux", desc: "Guide les visiteurs avec des plans et des promotions." },
                { href: "/pages/fr/commerce-detail.html", text: "Commerces de détail", alt: "Commerces de détail", desc: "Met en valeur les produits et les promotions." },
                { href: "/pages/fr/pharmacies.html", text: "Pharmacies", alt: "Pharmacies", desc: "Promeut les produits de santé et les rappels." },
                { href: "/pages/fr/cliniques-dentaires.html", text: "Cliniques dentaires", alt: "Cliniques dentaires", desc: "Affiche les services, promotions et conseils d'hygiène." },
                { href: "/pages/fr/salons-coiffure.html", text: "Salons de coiffure", alt: "Salons de coiffure", desc: "Présente les services et les promotions." }
            ]
        },
        en: {
            affichage: { text: "Dynamic Display Management", href: "#" },
            reseau: { text: "Advertising Map", href: "/pages/en/advertising%20map.html" },
            contact: { text: "Contact", href: "/pages/en/contact.html" },
            login: { text: "Log In", href: "/pages/en/login.html" },
            logoHref: "/pages/en/index.html",
            dropdown: [
                { href: "/pages/en/industries.html", text: "Industries", alt: "Industries", desc: "Displays production metrics and safety alerts." },
                { href: "/pages/en/gyms.html", text: "Gyms", alt: "Gyms", desc: "Shows class schedules and fitness tips." },
                { href: "/pages/en/restaurants.html", text: "Restaurants", alt: "Restaurants", desc: "Presents menus and special offers." },
                { href: "/pages/en/car-dealerships.html", text: "Car Dealerships", alt: "Car Dealerships", desc: "Highlights promotions and featured vehicles." },
                { href: "/pages/en/hotels.html", text: "Hotels", alt: "Hotels", desc: "Informs about services and events." },
                { href: "/pages/en/shopping-centers.html", text: "Shopping Centers", alt: "Shopping Centers", desc: "Guides visitors with maps and promotions." },
                { href: "/pages/en/retail-stores.html", text: "Retail Stores", alt: "Retail Stores", desc: "Showcases products and promotions." },
                { href: "/pages/en/pharmacies.html", text: "Pharmacies", alt: "Pharmacies", desc: "Promotes health products and reminders." },
                { href: "/pages/en/dental-clinics.html", text: "Dental Clinics", alt: "Dental Clinics", desc: "Displays services, promotions, and hygiene tips." },
                { href: "/pages/en/hair-salons.html", text: "Hair Salons", alt: "Hair Salons", desc: "Presents services and promotions." }
            ]
        }
    };

    // Map des slugs FR à EN - mis à jour avec les vraies URLs
    const slugMapFrToEn = {
        '': '',
        'index.html': 'index.html',
        'carte%20publicitaire.html': 'advertising%20map.html',
        'contact.html': 'contact.html',
        'connexion.html': 'login.html',
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
    };

    // Inverser le map pour EN à FR
    const slugMapEnToFr = {};
    for (let key in slugMapFrToEn) {
        slugMapEnToFr[slugMapFrToEn[key]] = key;
    }

    // Fonction pour déterminer la langue et le slug à partir de l'URL
    function getLangAndSlug() {
        let path = window.location.pathname.toLowerCase();
        let lang, slug;
        if (path.includes('/en/')) {
            lang = 'en';
            slug = path.substring(path.indexOf('/en/') + 4);
        } else if (path.includes('/fr/')) {
            lang = 'fr';
            slug = path.substring(path.indexOf('/fr/') + 4);
        } else {
            // Si on est à la racine ou autre, détecter par défaut français
            lang = 'fr';
            slug = path.substring(1) || 'index.html';
        }
        return { lang, slug };
    }

    // Fonction pour calculer l'URL de la langue opposée
    function getOppositeLangHref() {
        const { lang, slug } = getLangAndSlug();
        const targetLang = lang === 'fr' ? 'en' : 'fr';
        let targetSlug = slug;
        
        if (lang === 'fr') {
            targetSlug = slugMapFrToEn[slug] || slug;
        } else {
            targetSlug = slugMapEnToFr[slug] || slug;
        }
        
        let targetPath;
        if (targetSlug === '' || targetSlug === 'index.html') {
            targetPath = targetLang === 'en' ? '/pages/en/index.html' : '/pages/fr/index.html';
        } else {
            targetPath = `/pages/${targetLang}/${targetSlug}`;
        }
        
        console.log(`Switch langue: ${lang} -> ${targetLang}, slug: ${slug} -> ${targetSlug}, path: ${targetPath}`);
        return targetPath;
    }

    // Fonction pour mettre à jour le header
    function updateHeader() {
        const { lang } = getLangAndSlug();
        console.log(`Mise à jour header pour langue: ${lang}`);
        
        // Mettre à jour les liens de navigation
        const affichageButton = document.getElementById('link-affichage');
        if (affichageButton) {
            const firstChild = affichageButton.firstChild;
            if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                firstChild.textContent = translations[lang].affichage.text;
            }
            affichageButton.href = translations[lang].affichage.href;
        }

        const reseauLink = document.getElementById('link-reseau');
        if (reseauLink) {
            reseauLink.textContent = translations[lang].reseau.text;
            reseauLink.href = translations[lang].reseau.href;
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
        const dropdownIds = [
            'dropdown-industries', 'dropdown-gyms', 'dropdown-restaurants', 
            'dropdown-concessions-auto', 'dropdown-hotels', 'dropdown-centres-commerciaux',
            'dropdown-commerce-detail', 'dropdown-pharmacies', 'dropdown-cliniques-dentaires', 
            'dropdown-salons-coiffure'
        ];
        
        dropdownIds.forEach((id, index) => {
            const item = document.getElementById(id);
            if (item && translations[lang].dropdown[index]) {
                const translation = translations[lang].dropdown[index];
                item.href = translation.href;
                
                // Supprimer les images s'il y en a
                const img = item.querySelector('img');
                if (img) {
                    img.remove();
                }
                
                const h3 = item.querySelector('h3');
                if (h3) {
                    h3.textContent = translation.text;
                }
                
                let descElement = item.querySelector('p');
                if (translation.desc) {
                    if (!descElement) {
                        descElement = document.createElement('p');
                        item.appendChild(descElement);
                    }
                    descElement.textContent = translation.desc;
                } else if (descElement) {
                    descElement.remove();
                }
            }
        });

        // Mettre à jour le lien langue dynamiquement
        const langLink = document.getElementById('lang-link');
        if (langLink) {
            const oppositeHref = getOppositeLangHref();
            langLink.href = oppositeHref;
            
            // Ajouter un event listener pour le clic
            langLink.onclick = function(e) {
                e.preventDefault();
                console.log(`Redirection vers: ${oppositeHref}`);
                window.location.href = oppositeHref;
                return false;
            };
        }

        document.documentElement.lang = lang;
    }

    // Gestion du menu hamburger
    function initializeHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const navButtons = document.querySelector('.nav-buttons');

        if (hamburger && navButtons) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navButtons.classList.toggle('active');
            });
        }
    }

    // Gestion du menu déroulant et double clic
    function initializeDropdown() {
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
                    // Double clic - on ne fait rien puisque le lien est "#"
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
    }

    // Fermer le menu hamburger lorsqu'un lien est cliqué
    function initializeNavButtonClicks() {
        const hamburger = document.querySelector('.hamburger');
        const navButtons = document.querySelector('.nav-buttons');
        const affichageButton = document.getElementById('link-affichage');

        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target !== affichageButton && hamburger && navButtons) {
                    hamburger.classList.remove('active');
                    navButtons.classList.remove('active');
                }
            });
        });
    }

    // Initialiser quand le DOM est prêt
    function initializeHeader() {
        console.log('Initialisation du header');
        updateHeader();
        initializeHamburger();
        initializeDropdown();
        initializeNavButtonClicks();
    }

    // Si le header est déjà dans le DOM, l'initialiser directement
    if (document.querySelector('.custom-header')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeHeader);
        } else {
            initializeHeader();
        }
    }

    // Exposer les fonctions globalement pour que d'autres scripts puissent les utiliser
    window.HeaderUtils = {
        updateHeader,
        initializeHeader,
        getLangAndSlug,
        getOppositeLangHref
    };

})();