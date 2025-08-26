/**
 * CONFIGURATION PRINCIPALE XTRANUMERIK
 * Centralisation des paramètres globaux du site
 */

window.XtranumerikConfig = {
    // Version du site
    version: '2025.1.0',
    
    // URLs et domaines
    domain: 'xtranumerik.ca',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs',
    
    // API endpoints
    api: {
        contact: 'mailto:info@xtranumerik.ca',
        sales: 'mailto:patrick@xtranumerik.ca',
        support: 'mailto:support@xtranumerik.ca'
    },
    
    // Configuration des composants
    components: {
        carousel: {
            autoplay: true,
            interval: 5000,
            showDots: true,
            showArrows: true,
            pauseOnHover: true
        },
        
        particles: {
            count: 50,
            maxCount: 100,
            minCount: 25,
            color: 'rgba(25, 5, 68, 0.6)',
            speed: 2,
            size: 3
        },
        
        animations: {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    },
    
    // Configuration des graphiques
    charts: {
        defaultColors: {
            primary: '#190544',
            secondary: '#ffa91a',
            success: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            light: '#f8f9fa',
            dark: '#343a40'
        },
        
        defaultOptions: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    },
    
    // Configuration de la carte
    map: {
        center: [46.1158, -70.6653], // Saint-Georges, Beauce
        defaultZoom: 12,
        maxZoom: 18,
        tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors'
    },
    
    // Configuration des langues
    languages: {
        default: 'fr',
        available: ['fr', 'en'],
        detection: {
            urlPattern: /\/(fr|en)\//,
            browserFallback: true
        }
    },
    
    // Configuration SEO
    seo: {
        defaultTitle: 'Xtranumerik - Leader en Affichage Dynamique au Québec',
        titleSeparator: ' | ',
        defaultDescription: 'Solutions innovantes d\'affichage dynamique pour tous secteurs. 36 écrans, 40,000+ regards par semaine en Beauce.',
        defaultKeywords: 'affichage dynamique, écrans publicitaires, signalisation digitale, Québec, Beauce',
        ogImage: '/assets/images/og-default.jpg'
    },
    
    // Configuration des formulaires
    forms: {
        validation: {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^(\+1\s?)?(\([2-9]\d{2}\)\s?|[2-9]\d{2}[-.\s]?)[2-9]\d{2}[-.\s]?\d{4}$/
        },
        
        messages: {
            required: 'Ce champ est requis',
            email: 'Adresse email invalide',
            phone: 'Numéro de téléphone invalide',
            success: 'Message envoyé avec succès',
            error: 'Une erreur est survenue'
        }
    },
    
    // Configuration des réseaux sociaux
    social: {
        twitter: 'https://x.com/xtranumerik',
        facebook: 'https://facebook.com/xtranumerik',
        linkedin: 'https://linkedin.com/company/xtranumerik'
    },
    
    // Configuration du cache
    cache: {
        images: '7d',
        scripts: '30d',
        styles: '30d',
        pages: '1h'
    },
    
    // Configuration de la performance
    performance: {
        lazyLoadImages: true,
        preloadCritical: true,
        minifyOutput: true,
        compressImages: true,
        enableServiceWorker: false // À activer plus tard
    },
    
    // Configuration des outils tiers
    thirdParty: {
        googleAnalytics: null, // À configurer
        googleMaps: null, // Clé API si nécessaire
        hotjar: null, // À configurer si utilisé
        intercom: null // Support chat si utilisé
    }
};

// Utilitaires globaux
window.XtranumerikUtils = {
    // Détection de langue
    detectLanguage() {
        const path = window.location.pathname;
        const match = path.match(window.XtranumerikConfig.languages.detection.urlPattern);
        
        if (match) {
            return match[1];
        }
        
        if (window.XtranumerikConfig.languages.detection.browserFallback) {
            const browserLang = navigator.language.substring(0, 2);
            return window.XtranumerikConfig.languages.available.includes(browserLang) 
                ? browserLang 
                : window.XtranumerikConfig.languages.default;
        }
        
        return window.XtranumerikConfig.languages.default;
    },
    
    // Construction d'URL selon la langue
    buildUrl(path, lang = null) {
        const currentLang = lang || this.detectLanguage();
        return `/${currentLang}${path}`;
    },
    
    // Validation d'email
    isValidEmail(email) {
        return window.XtranumerikConfig.forms.validation.email.test(email);
    },
    
    // Validation de téléphone
    isValidPhone(phone) {
        return window.XtranumerikConfig.forms.validation.phone.test(phone);
    },
    
    // Formatage de numéro de téléphone
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
        }
        return phone;
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

// Configuration des événements personnalisés
window.XtranumerikEvents = {
    LANGUAGE_CHANGED: 'xtranumerik:language-changed',
    COMPONENT_LOADED: 'xtranumerik:component-loaded',
    PAGE_READY: 'xtranumerik:page-ready',
    FORM_SUBMITTED: 'xtranumerik:form-submitted',
    ANIMATION_COMPLETE: 'xtranumerik:animation-complete'
};

// Initialisation au chargement
if (typeof window !== 'undefined') {
    console.log('Xtranumerik Configuration loaded v' + window.XtranumerikConfig.version);
}
