/**
 * XTRANUMERIK MOBILE OPTIMIZER LOADER
 * Chargement automatique des optimisations mobiles
 * Date: 2 septembre 2025
 * 
 * Ce script détecte les appareils mobiles et charge automatiquement
 * tous les fichiers CSS et JS nécessaires pour une expérience mobile optimale
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // Détection mobile robuste
        isMobile: function() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            const isSmallScreen = window.innerWidth < 768;
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            return isMobileUA || (isSmallScreen && isTouchDevice);
        },

        // Fichiers CSS mobiles à charger
        mobileCSS: [
            '/assets/css/mobile-first.css',
            '/assets/css/mobile-enhanced.css'
        ],

        // Fichiers JS mobiles à charger
        mobileJS: [
            '/assets/js/mobile-navigation.js',
            '/assets/js/touch-carousel.js',
            '/assets/js/mobile-feedback.js',
            '/assets/js/page-specific-mobile.js'
        ],

        // Meta tags mobiles essentiels
        mobileMetas: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'format-detection', content: 'telephone=no' }
        ]
    };

    // Classe principale du Mobile Optimizer
    class MobileOptimizer {
        constructor() {
            this.isLoaded = false;
            this.startTime = performance.now();
            
            if (CONFIG.isMobile()) {
                console.log('📱 MOBILE DÉTECTÉ - Chargement des optimisations...');
                this.init();
            } else {
                console.log('🖥️ DESKTOP DÉTECTÉ - Optimisations mobiles ignorées');
            }
        }

        async init() {
            try {
                // 1. Ajouter les meta tags mobiles
                this.addMobileMetas();
                
                // 2. Charger les CSS mobiles en priorité
                await this.loadMobileCSS();
                
                // 3. Charger les JS mobiles de façon asynchrone
                this.loadMobileJS();
                
                // 4. Configurer les événements mobiles
                this.setupMobileEvents();
                
                // 5. Optimisations initiales
                this.applyInitialOptimizations();
                
                this.isLoaded = true;
                const loadTime = performance.now() - this.startTime;
                console.log(`✅ OPTIMISATIONS MOBILES CHARGÉES en ${Math.round(loadTime)}ms`);
                
                // Dispatch event pour notifier les autres scripts
                document.dispatchEvent(new CustomEvent('mobileOptimizerReady', {
                    detail: { loadTime: loadTime }
                }));

            } catch (error) {
                console.error('❌ ERREUR lors du chargement mobile:', error);
            }
        }

        addMobileMetas() {
            CONFIG.mobileMetas.forEach(meta => {
                // Vérifier si la meta n'existe pas déjà
                const existing = document.querySelector(`meta[name="${meta.name}"]`);
                if (!existing) {
                    const metaElement = document.createElement('meta');
                    metaElement.name = meta.name;
                    metaElement.content = meta.content;
                    document.head.appendChild(metaElement);
                    console.log(`📝 Meta ajoutée: ${meta.name}`);
                }
            });
        }

        loadMobileCSS() {
            const promises = CONFIG.mobileCSS.map(cssFile => {
                return new Promise((resolve, reject) => {
                    // Vérifier si le CSS n'est pas déjà chargé
                    const existing = document.querySelector(`link[href="${cssFile}"]`);
                    if (existing) {
                        resolve();
                        return;
                    }

                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = cssFile;
                    
                    link.onload = () => {
                        console.log(`🎨 CSS Mobile chargé: ${cssFile}`);
                        resolve();
                    };
                    
                    link.onerror = () => {
                        console.warn(`⚠️ Impossible de charger: ${cssFile}`);
                        resolve(); // Continuer même en cas d'erreur
                    };
                    
                    document.head.appendChild(link);
                });
            });

            return Promise.all(promises);
        }

        loadMobileJS() {
            CONFIG.mobileJS.forEach(jsFile => {
                // Vérifier si le script n'est pas déjà chargé
                const existing = document.querySelector(`script[src="${jsFile}"]`);
                if (existing) return;

                const script = document.createElement('script');
                script.src = jsFile;
                script.async = true;
                
                script.onload = () => {
                    console.log(`⚡ JS Mobile chargé: ${jsFile}`);
                };
                
                script.onerror = () => {
                    console.warn(`⚠️ Impossible de charger: ${jsFile}`);
                };
                
                document.head.appendChild(script);
            });
        }

        setupMobileEvents() {
            // Prévention du zoom accidentel
            document.addEventListener('touchstart', function(e) {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            }, { passive: false });

            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(e) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);

            // Gestion de l'orientation
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.handleOrientationChange();
                }, 100);
            });

            console.log('📱 Événements mobiles configurés');
        }

        handleOrientationChange() {
            const orientation = window.orientation;
            const body = document.body;
            
            // Nettoyage des classes d'orientation précédentes
            body.classList.remove('portrait', 'landscape');
            
            if (Math.abs(orientation) === 90) {
                body.classList.add('landscape');
                console.log('🔄 Orientation: Paysage');
            } else {
                body.classList.add('portrait');
                console.log('🔄 Orientation: Portrait');
            }

            // Recalcul des layouts
            this.recalculateLayouts();
        }

        applyInitialOptimizations() {
            // Ajout de la classe mobile au body
            document.body.classList.add('mobile-optimized');
            
            // Optimisation du viewport
            this.optimizeViewport();
            
            // Configuration des liens tactiles
            this.setupTouchOptimizations();
            
            // Amélioration des formulaires
            this.optimizeForms();
        }

        optimizeViewport() {
            // Ajustement automatique de la hauteur viewport sur mobile
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 100);
            });
        }

        setupTouchOptimizations() {
            // Amélioration des zones tactiles
            const links = document.querySelectorAll('a, button');
            links.forEach(element => {
                // S'assurer que les éléments tactiles ont une taille minimale
                const computedStyle = window.getComputedStyle(element);
                const height = parseInt(computedStyle.height);
                const width = parseInt(computedStyle.width);
                
                if (height < 44 || width < 44) {
                    element.style.minHeight = '44px';
                    element.style.minWidth = '44px';
                    element.style.display = 'inline-flex';
                    element.style.alignItems = 'center';
                    element.style.justifyContent = 'center';
                }
            });
        }

        optimizeForms() {
            // Optimisation des champs de formulaire pour mobile
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                // Taille minimale pour éviter le zoom sur iOS
                if (!input.style.fontSize) {
                    input.style.fontSize = '16px';
                }
                
                // Configuration du type de clavier
                if (input.type === 'email' && !input.getAttribute('inputmode')) {
                    input.setAttribute('inputmode', 'email');
                }
                
                if (input.type === 'tel' && !input.getAttribute('inputmode')) {
                    input.setAttribute('inputmode', 'tel');
                }
                
                if (input.type === 'number' && !input.getAttribute('inputmode')) {
                    input.setAttribute('inputmode', 'numeric');
                }
                
                // Ajout de classes pour le styling mobile
                input.classList.add('mobile-input');
            });
        }

        recalculateLayouts() {
            // Recalcul des carrousels
            if (window.TouchCarousel) {
                document.querySelectorAll('.carousel').forEach(carousel => {
                    if (carousel.touchCarouselInstance) {
                        carousel.touchCarouselInstance.recalculate();
                    }
                });
            }

            // Trigger custom event pour les autres composants
            document.dispatchEvent(new CustomEvent('mobileLayoutRecalculate'));
        }

        // Méthodes publiques
        isReady() {
            return this.isLoaded;
        }

        getLoadTime() {
            return performance.now() - this.startTime;
        }
    }

    // Auto-initialisation
    let mobileOptimizer;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            mobileOptimizer = new MobileOptimizer();
        });
    } else {
        mobileOptimizer = new MobileOptimizer();
    }

    // Export global pour accès externe
    window.XtranumerikMobileOptimizer = mobileOptimizer;

    console.log('🚀 Xtranumerik Mobile Optimizer Loader initialisé');

})();