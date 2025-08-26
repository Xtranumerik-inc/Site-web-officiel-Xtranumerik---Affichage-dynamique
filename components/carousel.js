/**
 * COMPOSANT CARROUSEL
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

    createControls() {
        // Créer les flèches
        if (this.options.showArrows) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-prev';
            prevBtn.innerHTML = '‹';
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-next';
            nextBtn.innerHTML = '›';
            
            this.element.appendChild(prevBtn);
            this.element.appendChild(nextBtn);
        }

        // Créer les dots
        if (this.options.showDots) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.dataset.slide = i;
                dotsContainer.appendChild(dot);
            }
            
            this.element.appendChild(dotsContainer);
        }
    }
    setupEventListeners() {
        // Flèches
        const prevBtn = this.element.querySelector('.carousel-prev');
        const nextBtn = this.element.querySelector('.carousel-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dots
        const dots = this.element.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause autoplay au survol
        this.element.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.element.addEventListener('mouseleave', () => this.resumeAutoplay());

        // Touch/swipe pour mobile
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        let startX = 0;
        let endX = 0;

        this.element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.element.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        this.handleSwipe = () => {
            const diff = startX - endX;
            const minSwipeDistance = 50;

            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }
    updateSlide() {
        // Mise à jour des slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
            slide.style.transform = `translateX(${(index - this.currentSlide) * 100}%)`;
        });

        // Mise à jour des dots
        const dots = this.element.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoplay() {
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.interval);
    }

    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
    }

    resumeAutoplay() {
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    destroy() {
        this.pauseAutoplay();
        // Nettoyer les event listeners si nécessaire
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Carousel;
} else {
    window.Carousel = Carousel;
}
