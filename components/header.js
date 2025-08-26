/**
 * COMPOSANT HEADER - Navigation principale
 */

class HeaderComponent {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            sticky: true,
            mobileBreakpoint: 768,
            ...options
        };
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupStickyHeader();
        this.setupLanguageToggle();
    }

    // Menu mobile hamburger
    setupMobileMenu() {
        const mobileToggle = this.element.querySelector('.mobile-menu-toggle');
        const mobileMenu = this.element.querySelector('.mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Fermer le menu en cliquant sur un lien
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }

    // Header fixe au scroll
    setupStickyHeader() {
        if (!this.options.sticky) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.element.classList.add('scrolled');
                
                // Masquer/afficher selon direction scroll
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    this.element.classList.add('hidden');
                } else {
                    this.element.classList.remove('hidden');
                }
            } else {
                this.element.classList.remove('scrolled');
                this.element.classList.remove('hidden');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    // Toggle langue FR/EN
    setupLanguageToggle() {
        const langToggle = this.element.querySelector('.language-toggle');
        
        if (langToggle) {
            langToggle.addEventListener('click', (e) => {
                e.preventDefault();
                const currentLang = window.xtranumerik.currentLanguage;
                const newLang = currentLang === 'fr' ? 'en' : 'fr';
                window.xtranumerik.switchLanguage(newLang);
            });
        }
    }

    // Menu déroulant solutions
    setupDropdownMenu() {
        const dropdown = this.element.querySelector('.dropdown');
        if (!dropdown) return;

        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        trigger.addEventListener('mouseenter', () => {
            menu.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            menu.classList.remove('show');
        });

        // Version mobile - click
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= this.options.mobileBreakpoint) {
                e.preventDefault();
                menu.classList.toggle('show');
            }
        });
    }
}

/**
 * CARROUSEL COMPONENT
 */
class Carousel {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            autoplay: true,
            interval: 5000,
            showDots: true,
            showArrows: true,
            ...options
        };
        
        this.currentSlide = 0;
        this.slides = this.element.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        
        if (this.totalSlides > 0) {
            this.init();
        }
    }

    init() {
        this.createControls();
        this.setupEventListeners();
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        this.updateSlide();
    }
