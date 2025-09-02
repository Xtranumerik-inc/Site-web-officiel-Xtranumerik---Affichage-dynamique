/**
 * XTRANUMERIK PAGE-SPECIFIC MOBILE
 * Optimisations mobiles spécifiques par type de page
 * Date: 2 septembre 2025
 * 
 * ✅ Page d'accueil (hero, carrousels)
 * ✅ Pages contact (formulaires)
 * ✅ Pages carte (interactions map)
 * ✅ Pages sectorielles (layouts)
 */

(function() {
    'use strict';

    class XtranumerikPageSpecificMobile {
        constructor() {
            this.pageType = null;
            this.optimizations = [];
            this.isInitialized = false;
            
            // Configuration par type de page
            this.pageConfigs = {
                home: {
                    hero: true,
                    carousel: true,
                    partners: true,
                    parallax: false // Désactivé sur mobile
                },
                contact: {
                    forms: true,
                    validation: true,
                    keyboard: true
                },
                map: {
                    touch: true,
                    responsive: true,
                    controls: true
                },
                sectoral: {
                    accordion: true,
                    gallery: true,
                    stats: true
                },
                industries: {
                    charts: true,
                    accordion: true
                }
            };

            this.init();
        }

        init() {
            try {
                // Détecter le type de page
                this.detectPageType();
                
                // Appliquer les optimisations spécifiques
                this.applyOptimizations();
                
                // Configurer les événements de page
                this.setupPageEvents();

                this.isInitialized = true;
                console.log(`✅ Page-Specific Mobile: Initialized for ${this.pageType} page`);

            } catch (error) {
                console.error('❌ Page-Specific Mobile: Initialization error:', error);
            }
        }

        detectPageType() {
            const path = window.location.pathname.toLowerCase();
            const title = document.title.toLowerCase();
            
            if (path.includes('contact') || title.includes('contact')) {
                this.pageType = 'contact';
            } else if (path.includes('carte') || path.includes('map') || title.includes('carte') || title.includes('map')) {
                this.pageType = 'map';
            } else if (path.includes('industries') || title.includes('industries')) {
                this.pageType = 'industries';
            } else if (path.includes('gyms') || path.includes('restaurants') || path.includes('hotels') || 
                      path.includes('concessions') || path.includes('centres-commerciaux') ||
                      path.includes('commerce-detail') || path.includes('pharmacies') ||
                      path.includes('cliniques') || path.includes('salons')) {
                this.pageType = 'sectoral';
            } else if (path.includes('index') || path === '/' || path.endsWith('/fr/') || path.endsWith('/en/')) {
                this.pageType = 'home';
            } else {
                this.pageType = 'default';
            }

            console.log(`📱 Page-Specific Mobile: Detected page type: ${this.pageType}`);
        }

        applyOptimizations() {
            const config = this.pageConfigs[this.pageType];
            if (!config) return;

            switch (this.pageType) {
                case 'home':
                    this.optimizeHomePage();
                    break;
                case 'contact':
                    this.optimizeContactPage();
                    break;
                case 'map':
                    this.optimizeMapPage();
                    break;
                case 'sectoral':
                    this.optimizeSectoralPage();
                    break;
                case 'industries':
                    this.optimizeIndustriesPage();
                    break;
            }
        }

        optimizeHomePage() {
            console.log('🏠 Optimizing home page for mobile...');

            // Hero section mobile
            this.optimizeHeroSection();
            
            // Carrousels hero et partenaires
            this.optimizeHomeCarousels();
            
            // Sections avec animations
            this.optimizeHomeSections();
            
            // Parallax mobile (désactivation)
            this.disableParallaxOnMobile();
        }

        optimizeHeroSection() {
            const heroSection = document.querySelector('.hero, .hero-section');
            if (!heroSection) return;

            // Ajustement de la hauteur sur mobile
            heroSection.style.minHeight = 'calc(100vh - 60px)';
            
            // Layout mobile pour le hero
            const content = heroSection.querySelector('.content');
            const carousel = heroSection.querySelector('.carousel-container');
            
            if (content && carousel) {
                // Stack vertical sur mobile
                heroSection.style.display = 'flex';
                heroSection.style.flexDirection = 'column';
                heroSection.style.gap = '2rem';
                
                content.style.order = '1';
                carousel.style.order = '2';
                content.style.textAlign = 'center';
            }

            // Optimisation des textes
            const title = heroSection.querySelector('h1');
            if (title) {
                title.style.fontSize = 'clamp(1.75rem, 8vw, 3rem)';
                title.style.lineHeight = '1.2';
                title.style.marginBottom = '1rem';
            }

            const subtitle = heroSection.querySelector('.subtitle, p');
            if (subtitle) {
                subtitle.style.fontSize = 'clamp(1rem, 4vw, 1.25rem)';
                subtitle.style.marginBottom = '2rem';
            }

            console.log('📱 Home: Hero section optimized');
        }

        optimizeHomeCarousels() {
            // Optimization spécifique pour les carrousels de la page d'accueil
            const heroCarousel = document.querySelector('#hero-carousel, .hero-carousel');
            const partnersCarousel = document.querySelector('#partners-carousel, .partners-carousel');

            if (heroCarousel) {
                this.setupMobileCarouselGestures(heroCarousel, {
                    autoPlay: true,
                    showDots: true,
                    swipeThreshold: 30
                });
            }

            if (partnersCarousel) {
                this.setupMobileCarouselGestures(partnersCarousel, {
                    autoPlay: true,
                    showDots: false,
                    loop: true,
                    swipeThreshold: 50
                });
            }

            console.log('📱 Home: Carousels optimized');
        }

        optimizeHomeSections() {
            // Sections avec animations progressives
            const sections = document.querySelectorAll('.section, .avantages-section, .partners-section');
            
            sections.forEach((section, index) => {
                // Intersection Observer pour animations
                this.setupScrollAnimations(section, index);
                
                // Espacement mobile
                section.style.padding = '3rem 1rem';
                section.style.marginBottom = '2rem';
            });

            // Grid des avantages
            const avantagesList = document.querySelector('.avantages-list');
            if (avantagesList) {
                avantagesList.style.display = 'grid';
                avantagesList.style.gap = '1.5rem';
                avantagesList.style.gridTemplateColumns = '1fr';
                
                // 2 colonnes sur mobile large
                if (window.innerWidth > 480) {
                    avantagesList.style.gridTemplateColumns = 'repeat(2, 1fr)';
                }
            }

            console.log('📱 Home: Sections optimized');
        }

        disableParallaxOnMobile() {
            // Désactiver les effets parallax sur mobile pour les performances
            const parallaxElements = document.querySelectorAll('[data-parallax], .parallax');
            parallaxElements.forEach(element => {
                element.style.transform = 'none';
                element.style.willChange = 'auto';
            });
        }

        optimizeContactPage() {
            console.log('📞 Optimizing contact page for mobile...');

            // Formulaires mobiles
            this.optimizeContactForms();
            
            // Validation en temps réel
            this.setupMobileFormValidation();
            
            // Auto-correction des champs
            this.setupFormAutoCorrection();
            
            // Clavier adaptatif
            this.setupAdaptiveKeyboard();
        }

        optimizeContactForms() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.classList.add('mobile-form');
                
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.classList.add('mobile-input');
                    
                    // Taille minimale pour éviter le zoom iOS
                    if (!input.style.fontSize) {
                        input.style.fontSize = '16px';
                    }
                    
                    // Padding tactile
                    input.style.minHeight = '48px';
                    input.style.padding = '12px 16px';
                });

                // Boutons de soumission
                const submitBtns = form.querySelectorAll('input[type="submit"], button[type="submit"]');
                submitBtns.forEach(btn => {
                    btn.classList.add('mobile-btn');
                    btn.style.minHeight = '48px';
                    btn.style.width = '100%';
                    btn.style.marginTop = '1rem';
                });
            });

            console.log('📱 Contact: Forms optimized');
        }

        setupMobileFormValidation() {
            const inputs = document.querySelectorAll('.mobile-input');
            
            inputs.forEach(input => {
                input.addEventListener('blur', (e) => {
                    this.validateField(e.target);
                });
                
                input.addEventListener('input', (e) => {
                    this.clearFieldError(e.target);
                });
            });
        }

        validateField(field) {
            const value = field.value.trim();
            const type = field.type;
            let isValid = true;
            let errorMessage = '';

            // Validation par type
            switch (type) {
                case 'email':
                    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    errorMessage = 'Email invalide';
                    break;
                case 'tel':
                    isValid = /^[\d\s\-\+\(\)]+$/.test(value) && value.length >= 10;
                    errorMessage = 'Numéro de téléphone invalide';
                    break;
                case 'text':
                    if (field.required) {
                        isValid = value.length > 0;
                        errorMessage = 'Ce champ est requis';
                    }
                    break;
            }

            this.showFieldValidation(field, isValid, errorMessage);
        }

        showFieldValidation(field, isValid, message) {
            // Supprimer les messages d'erreur existants
            this.clearFieldError(field);

            if (!isValid) {
                field.style.borderColor = '#ef4444';
                
                const errorEl = document.createElement('div');
                errorEl.className = 'field-error';
                errorEl.textContent = message;
                errorEl.style.cssText = `
                    color: #ef4444;
                    font-size: 14px;
                    margin-top: 4px;
                    animation: slideInUp 0.3s ease;
                `;
                
                field.parentNode.insertBefore(errorEl, field.nextSibling);
                
                // Vibration d'erreur
                if (window.XtranumerikMobileFeedback) {
                    window.XtranumerikMobileFeedback.vibrate('error');
                }
            } else {
                field.style.borderColor = '#10b981';
                
                // Feedback de succès
                if (window.XtranumerikMobileFeedback) {
                    window.XtranumerikMobileFeedback.vibrate('light');
                }
            }
        }

        clearFieldError(field) {
            field.style.borderColor = '';
            const errorEl = field.parentNode.querySelector('.field-error');
            if (errorEl) {
                errorEl.remove();
            }
        }

        setupFormAutoCorrection() {
            const emailInputs = document.querySelectorAll('input[type="email"]');
            emailInputs.forEach(input => {
                input.addEventListener('blur', (e) => {
                    let value = e.target.value.trim().toLowerCase();
                    
                    // Corrections communes
                    value = value.replace(/gmial|gmai|gmai\./, 'gmail.');
                    value = value.replace(/yahooo|yaho/, 'yahoo');
                    value = value.replace(/hotmial/, 'hotmail');
                    
                    if (value !== e.target.value) {
                        e.target.value = value;
                        
                        // Notification de correction
                        if (window.XtranumerikMobileFeedback) {
                            window.XtranumerikMobileFeedback.showInfo('Email corrigé automatiquement', {
                                duration: 2000
                            });
                        }
                    }
                });
            });
        }

        setupAdaptiveKeyboard() {
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                switch (input.type) {
                    case 'email':
                        input.setAttribute('inputmode', 'email');
                        input.setAttribute('autocomplete', 'email');
                        break;
                    case 'tel':
                        input.setAttribute('inputmode', 'tel');
                        input.setAttribute('autocomplete', 'tel');
                        break;
                    case 'text':
                        if (input.name.includes('name') || input.name.includes('nom')) {
                            input.setAttribute('autocomplete', 'name');
                        }
                        break;
                }
            });

            console.log('📱 Contact: Adaptive keyboard setup');
        }

        optimizeMapPage() {
            console.log('🗺️ Optimizing map page for mobile...');

            // Optimisation Leaflet pour mobile
            setTimeout(() => {
                this.optimizeLeafletMap();
            }, 1000);
            
            // Controls tactiles
            this.setupMapTouchControls();
        }

        optimizeLeafletMap() {
            if (typeof L !== 'undefined' && window.map) {
                // Désactiver le zoom molette sur mobile
                window.map.scrollWheelZoom.disable();
                
                // Activer le zoom tactile
                window.map.touchZoom.enable();
                window.map.doubleClickZoom.enable();
                
                // Contrôles tactiles
                window.map.addControl(L.control.zoom({
                    position: 'bottomright'
                }));
                
                // Gestion des popups sur mobile
                window.map.on('popupopen', (e) => {
                    const popup = e.popup;
                    const content = popup.getContent();
                    
                    // Ajuster la taille sur mobile
                    popup.options.maxWidth = Math.min(300, window.innerWidth - 40);
                    popup.update();
                });

                console.log('📱 Map: Leaflet optimized for mobile');
            }
        }

        setupMapTouchControls() {
            const mapContainer = document.querySelector('#map, .map-container');
            if (!mapContainer) return;

            // Message d'instruction mobile
            const instructions = document.createElement('div');
            instructions.textContent = 'Utilisez deux doigts pour déplacer la carte';
            instructions.style.cssText = `
                position: absolute;
                top: 10px;
                left: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                text-align: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            mapContainer.style.position = 'relative';
            mapContainer.appendChild(instructions);

            // Afficher les instructions au touch
            mapContainer.addEventListener('touchstart', () => {
                instructions.style.opacity = '1';
                setTimeout(() => {
                    instructions.style.opacity = '0';
                }, 3000);
            });
        }

        optimizeSectoralPage() {
            console.log('🏢 Optimizing sectoral page for mobile...');

            // Accordéons mobile
            this.setupMobileAccordions();
            
            // Galleries tactiles
            this.setupMobileGalleries();
            
            // Stats animées
            this.setupAnimatedStats();
        }

        setupMobileAccordions() {
            const accordions = document.querySelectorAll('.accordion, .faq-item');
            
            accordions.forEach(accordion => {
                const trigger = accordion.querySelector('.accordion-trigger, .faq-question');
                const content = accordion.querySelector('.accordion-content, .faq-answer');
                
                if (trigger && content) {
                    trigger.style.minHeight = '48px';
                    trigger.style.cursor = 'pointer';
                    trigger.style.userSelect = 'none';
                    
                    trigger.addEventListener('click', () => {
                        this.toggleAccordion(accordion, content);
                    });
                }
            });
        }

        toggleAccordion(accordion, content) {
            const isActive = accordion.classList.contains('active');
            
            // Fermer tous les autres accordéons (optionnel)
            const allAccordions = document.querySelectorAll('.accordion.active, .faq-item.active');
            allAccordions.forEach(item => {
                if (item !== accordion) {
                    item.classList.remove('active');
                    const itemContent = item.querySelector('.accordion-content, .faq-answer');
                    if (itemContent) itemContent.style.maxHeight = '0';
                }
            });
            
            // Toggle l'accordéon actuel
            if (isActive) {
                accordion.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                accordion.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Feedback haptique
                if (window.XtranumerikMobileFeedback) {
                    window.XtranumerikMobileFeedback.vibrate('light');
                }
                
                // Scroll smooth vers l'accordéon ouvert
                setTimeout(() => {
                    accordion.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }

        setupMobileGalleries() {
            const galleries = document.querySelectorAll('.gallery, .image-grid');
            
            galleries.forEach(gallery => {
                // Grid responsive pour mobile
                gallery.style.display = 'grid';
                gallery.style.gap = '1rem';
                gallery.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
                
                const images = gallery.querySelectorAll('img');
                images.forEach(img => {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.borderRadius = '8px';
                    img.style.cursor = 'pointer';
                    
                    // Click pour agrandir (lightbox mobile)
                    img.addEventListener('click', () => {
                        this.showImageLightbox(img);
                    });
                });
            });
        }

        showImageLightbox(img) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const lightboxImg = img.cloneNode();
            lightboxImg.style.cssText = `
                max-width: 90vw;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                width: 48px;
                height: 48px;
                border: none;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 24px;
                border-radius: 50%;
                cursor: pointer;
            `;
            
            overlay.appendChild(lightboxImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            // Animations
            setTimeout(() => overlay.style.opacity = '1', 10);
            
            // Fermeture
            const closeLightbox = () => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeLightbox();
            });
        }

        setupAnimatedStats() {
            const stats = document.querySelectorAll('.stat-number, .counter');
            
            stats.forEach(stat => {
                this.setupCounterAnimation(stat);
            });
        }

        setupCounterAnimation(element) {
            const targetValue = parseInt(element.textContent) || 0;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(element, targetValue);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        }

        animateCounter(element, target) {
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, stepTime);
        }

        optimizeIndustriesPage() {
            console.log('🏭 Optimizing industries page for mobile...');

            // Optimisation des graphiques Chart.js
            this.optimizeChartsForMobile();
            
            // Accordéons des industries
            this.setupMobileAccordions();
        }

        optimizeChartsForMobile() {
            // Attendre que Chart.js soit chargé
            setTimeout(() => {
                if (typeof Chart !== 'undefined') {
                    // Configuration mobile pour tous les graphiques
                    Chart.defaults.responsive = true;
                    Chart.defaults.maintainAspectRatio = false;
                    Chart.defaults.plugins.legend.display = false; // Masquer les légendes sur mobile
                    
                    console.log('📊 Industries: Charts optimized for mobile');
                }
            }, 1500);
        }

        // Utilitaires
        setupScrollAnimations(element, delay = 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('mobile-fade-in');
                        }, delay * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        }

        setupMobileCarouselGestures(carousel, options) {
            // Si le Touch Carousel n'est pas encore initialisé
            if (!carousel.touchCarouselInstance && window.XtranumerikTouchCarousel) {
                carousel.touchCarouselInstance = new window.XtranumerikTouchCarousel(carousel, options);
            }
        }

        setupPageEvents() {
            // Events spécifiques selon le type de page
            document.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.handleOrientationChange();
                }, 100);
            });

            // Gestion du clavier virtuel
            this.setupVirtualKeyboardHandling();
        }

        handleOrientationChange() {
            // Recalculs nécessaires après changement d'orientation
            const carousels = document.querySelectorAll('.carousel');
            carousels.forEach(carousel => {
                if (carousel.touchCarouselInstance) {
                    carousel.touchCarouselInstance.recalculate();
                }
            });

            console.log('📱 Page-Specific: Orientation changed, layouts recalculated');
        }

        setupVirtualKeyboardHandling() {
            // Gestion du redimensionnement lors de l'ouverture du clavier
            let initialViewportHeight = window.innerHeight;

            window.addEventListener('resize', () => {
                const currentViewportHeight = window.innerHeight;
                const diff = initialViewportHeight - currentViewportHeight;

                if (diff > 150) { // Clavier probablement ouvert
                    document.body.classList.add('keyboard-open');
                } else {
                    document.body.classList.remove('keyboard-open');
                }
            });
        }

        // API publique
        getPageType() {
            return this.pageType;
        }

        isInitialized() {
            return this.isInitialized;
        }

        destroy() {
            // Cleanup des optimizations
            this.optimizations.forEach(cleanup => {
                if (typeof cleanup === 'function') {
                    cleanup();
                }
            });
            
            this.isInitialized = false;
            console.log('🗑️ Page-Specific Mobile: Destroyed');
        }
    }

    // Auto-initialisation
    let pageSpecificMobile;

    // Attendre que les autres systèmes mobiles soient prêts
    document.addEventListener('mobileOptimizerReady', () => {
        pageSpecificMobile = new XtranumerikPageSpecificMobile();
    });

    // Fallback
    setTimeout(() => {
        if (!pageSpecificMobile) {
            pageSpecificMobile = new XtranumerikPageSpecificMobile();
        }
    }, 2000);

    // Export global
    window.XtranumerikPageSpecificMobile = pageSpecificMobile;

    console.log('🚀 Xtranumerik Page-Specific Mobile: Script loaded');

})();