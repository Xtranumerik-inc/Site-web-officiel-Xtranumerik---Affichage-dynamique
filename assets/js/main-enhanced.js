// Main Enhanced JavaScript - Version optimisée 2025
// Support tactile complet et performance mobile

const CONFIG = {
    intervals: {
        hero: 6000,
        partners: 1500
    },
    thresholds: {
        intersection: 0.1,
        particles: window.innerWidth > 768 ? 30 : 10 // Moins de particules sur mobile
    },
    touch: {
        swipeThreshold: 50,
        verticalThreshold: 100
    }
};

let state = {
    intervals: {},
    carousels: {
        hero: { currentSlide: 0, element: null, dots: null, isTransitioning: false },
        partners: { currentSlide: 0, element: null, originalImages: null, totalOriginalImages: 0, slideWidth: 0 }
    },
    isVisible: true,
    isMobile: window.innerWidth <= 768,
    touchData: { startX: 0, startY: 0, endX: 0, endY: 0, startTime: 0 }
};

// Détection améliorée du support tactile
const isTouchDevice = () => {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
};

// Utilitaires optimisés
const utils = {
    debounce: (func, wait) => {
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

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    getLanguage: () => {
        return document.documentElement.lang || 
               document.querySelector('html').getAttribute('lang') || 
               'fr';
    },

    // Nouvelle fonction pour le support tactile amélioré
    handleSwipe: (element, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown) => {
        if (!isTouchDevice()) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let touchStartTime = 0;

        element.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            touchStartTime = Date.now();
        }, { passive: true });

        element.addEventListener('touchmove', (e) => {
            // Prévenir le scroll si swipe horizontal
            const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
            const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
            
            if (diffX > diffY && diffX > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        element.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const touchDuration = Date.now() - touchStartTime;
            handleGesture();
        }, { passive: true });

        function handleGesture() {
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            const absDiffX = Math.abs(diffX);
            const absDiffY = Math.abs(diffY);

            // Swipe horizontal
            if (absDiffX > CONFIG.touch.swipeThreshold && 
                absDiffY < CONFIG.touch.verticalThreshold) {
                if (diffX > 0 && onSwipeLeft) {
                    onSwipeLeft();
                } else if (diffX < 0 && onSwipeRight) {
                    onSwipeRight();
                }
            }
            
            // Swipe vertical
            if (absDiffY > CONFIG.touch.swipeThreshold && 
                absDiffX < CONFIG.touch.verticalThreshold) {
                if (diffY > 0 && onSwipeUp) {
                    onSwipeUp();
                } else if (diffY < 0 && onSwipeDown) {
                    onSwipeDown();
                }
            }
        }
    }
};

// Initialisation principale optimisée
function init() {
    detectDevice();
    initCarousels();
    initParticles();
    initScrollProgress();
    initSectionAnimations();
    initMemoryGame();
    initSmoothNavigation();
    initEventListeners();
    initMobileOptimizations();
}

// Détection de l'appareil
function detectDevice() {
    state.isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('is-mobile', state.isMobile);
    document.body.classList.toggle('is-touch', isTouchDevice());
}

// Optimisations spécifiques mobile
function initMobileOptimizations() {
    if (state.isMobile) {
        // Désactiver les animations lourdes
        document.querySelectorAll('.particle').forEach(particle => {
            if (Math.random() > 0.3) { // Garder seulement 30% des particules
                particle.remove();
            }
        });

        // Optimiser les images
        optimizeImagesForMobile();

        // Ajouter viewport height fix pour iOS
        fixViewportHeight();

        // Améliorer le touch feedback
        addTouchFeedback();
    }
}

// Fix pour la hauteur viewport sur iOS
function fixViewportHeight() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', utils.debounce(setVH, 100));
    window.addEventListener('orientationchange', setVH);
}

// Optimisation des images pour mobile
function optimizeImagesForMobile() {
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
}

// Ajout du feedback tactile
function addTouchFeedback() {
    document.querySelectorAll('.btn, .carousel-nav button, .faq-item').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });

        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        }, { passive: true });
    });
}

// Carrousels optimisés avec support tactile amélioré
function initCarousels() {
    clearIntervals();
    
    // Hero carousel
    const hero = state.carousels.hero;
    hero.element = document.getElementById('hero-carousel');
    hero.dots = document.querySelectorAll('#hero-carousel-dots .dot');

    if (hero.element) {
        // Support tactile pour hero carousel
        utils.handleSwipe(
            hero.element,
            () => nextSlide('hero'),  // Swipe left
            () => prevSlide('hero'),  // Swipe right
            null,
            null
        );

        // Support clavier
        hero.element.setAttribute('tabindex', '0');
        hero.element.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide('hero');
            if (e.key === 'ArrowRight') nextSlide('hero');
        });
    }

    // Partners carousel
    const partners = state.carousels.partners;
    partners.element = document.getElementById('partners-carousel');
    
    if (partners.element) {
        partners.originalImages = Array.from(partners.element.children);
        partners.totalOriginalImages = partners.originalImages.length;

        // Duplication optimisée pour défilement infini
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) {
            partners.originalImages.forEach(img => 
                fragment.appendChild(img.cloneNode(true))
            );
        }
        partners.element.innerHTML = '';
        partners.element.appendChild(fragment);

        // Support tactile pour partners carousel
        utils.handleSwipe(
            partners.element.parentElement,
            () => nextSlide('partners'),
            () => prevSlide('partners'),
            null,
            null
        );
    }

    calculateSlideWidth();
    resetCarousels();
    updateCarousel('hero');
    updateCarousel('partners');
    startAutoPlay();
}

function calculateSlideWidth() {
    const partners = state.carousels.partners;
    if (partners.element && partners.element.children[0]) {
        const firstImg = partners.element.children[0];
        const style = getComputedStyle(firstImg);
        partners.slideWidth = firstImg.offsetWidth + 
            parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
}

function clearIntervals() {
    Object.values(state.intervals).forEach(clearInterval);
    state.intervals = {};
}

function resetCarousels() {
    state.carousels.hero.currentSlide = 0;
    state.carousels.partners.currentSlide = 0;
}

function startAutoPlay() {
    if (state.isVisible && !state.isMobile) { // Auto-play seulement sur desktop
        state.intervals.hero = setInterval(() => nextSlide('hero'), CONFIG.intervals.hero);
        state.intervals.partners = setInterval(() => nextSlide('partners'), CONFIG.intervals.partners);
    }
}

function updateCarousel(carouselId) {
    const carousel = state.carousels[carouselId];
    
    if (carouselId === 'hero' && carousel.element) {
        if (!carousel.isTransitioning) {
            carousel.isTransitioning = true;
            carousel.element.style.transform = `translateX(-${carousel.currentSlide * 100}%)`;
            
            setTimeout(() => {
                carousel.isTransitioning = false;
            }, 500);
        }
        
        if (carousel.dots) {
            carousel.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === carousel.currentSlide);
                dot.setAttribute('aria-current', i === carousel.currentSlide ? 'true' : 'false');
            });
        }
    } else if (carouselId === 'partners' && carousel.element) {
        const offset = carousel.currentSlide * carousel.slideWidth;
        carousel.element.style.transform = `translateX(-${offset}px)`;

        // Gestion du carrousel infini optimisée
        if (carousel.currentSlide >= carousel.totalOriginalImages * 2) {
            requestAnimationFrame(() => {
                carousel.element.style.transition = 'none';
                carousel.currentSlide -= carousel.totalOriginalImages;
                carousel.element.style.transform = `translateX(-${carousel.currentSlide * carousel.slideWidth}px)`;
                void carousel.element.offsetHeight; // Force reflow
                carousel.element.style.transition = 'transform 0.5s linear';
            });
        } else if (carousel.currentSlide < 0) {
            requestAnimationFrame(() => {
                carousel.element.style.transition = 'none';
                carousel.currentSlide += carousel.totalOriginalImages;
                carousel.element.style.transform = `translateX(-${carousel.currentSlide * carousel.slideWidth}px)`;
                void carousel.element.offsetHeight; // Force reflow
                carousel.element.style.transition = 'transform 0.5s linear';
            });
        }
    }
}

// Navigation des carrousels avec prévention du spam
function nextSlide(carouselId) {
    const carousel = state.carousels[carouselId];
    
    if (carouselId === 'hero' && carousel.element && !carousel.isTransitioning) {
        carousel.currentSlide = (carousel.currentSlide + 1) % carousel.element.children.length;
        updateCarousel(carouselId);
    } else if (carouselId === 'partners') {
        carousel.currentSlide++;
        updateCarousel(carouselId);
    }
}

function prevSlide(carouselId) {
    const carousel = state.carousels[carouselId];
    
    if (carouselId === 'hero' && carousel.element && !carousel.isTransitioning) {
        carousel.currentSlide = (carousel.currentSlide - 1 + carousel.element.children.length) % 
                               carousel.element.children.length;
        updateCarousel(carouselId);
    } else if (carouselId === 'partners') {
        carousel.currentSlide--;
        updateCarousel(carouselId);
    }
}

function goToSlide(carouselId, index) {
    if (carouselId === 'hero' && !state.carousels[carouselId].isTransitioning) {
        state.carousels[carouselId].currentSlide = index;
        updateCarousel(carouselId);
    }
}

// Particules optimisées avec performance check
function initParticles() {
    const container = document.getElementById('particles');
    if (!container || state.isMobile) return;
    
    // Check performance avant d'ajouter les particules
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => createParticles(container), { timeout: 1000 });
    } else {
        setTimeout(() => createParticles(container), 100);
    }
}

function createParticles(container) {
    const fragment = document.createDocumentFragment();
    const particleCount = state.isMobile ? 10 : CONFIG.thresholds.particles;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);
}

// Barre de progression optimisée avec RAF
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    let ticking = false;
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = scrollPercent + '%';
        ticking = false;
    };

    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Animations des sections avec lazy loading
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: state.isMobile ? 0.05 : CONFIG.thresholds.intersection,
        rootMargin: state.isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Lazy load des images dans la section
                const images = entry.target.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
                
                // Une fois visible, ne plus observer
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Navigation fluide avec offset pour header fixe
function initSmoothNavigation() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mise à jour de l'URL sans scroll
                history.pushState(null, null, targetId);
            }
        }
    });
}

// Jeu mémoire optimisé avec animations fluides
function initMemoryGame() {
    const memoryGame = document.getElementById('memory-game');
    const memoryInfo = document.getElementById('memory-info');
    
    if (!memoryGame || !memoryInfo) return;

    const currentLang = utils.getLanguage();
    
    // Données multilingues
    const gameData = {
        fr: {
            cards: [
                { name: 'Retail', match: 'Booste les ventes', info: 'Transforme l\'expérience client en magasin avec des visuels dynamiques.' },
                { name: 'Booste les ventes', match: 'Retail' },
                { name: 'Hôtel', match: 'Améliore l\'hospitalité', info: 'Personnalise les services pour une expérience luxueuse.' },
                { name: 'Améliore l\'hospitalité', match: 'Hôtel' },
                { name: 'Industrie', match: 'Augmente la sécurité', info: 'Affiche alertes et métriques en temps réel.' },
                { name: 'Augmente la sécurité', match: 'Industrie' },
                { name: 'Bureau', match: 'Booste l\'engagement', info: 'Améliore la communication interne.' },
                { name: 'Booste l\'engagement', match: 'Bureau' }
            ],
            winMessage: '🎉 Félicitations ! Vous avez découvert tous les avantages de l\'affichage dynamique !'
        },
        en: {
            cards: [
                { name: 'Retail', match: 'Boosts Sales', info: 'Transforms in-store customer experience with dynamic visuals.' },
                { name: 'Boosts Sales', match: 'Retail' },
                { name: 'Hotel', match: 'Improves Hospitality', info: 'Personalizes services for a luxurious experience.' },
                { name: 'Improves Hospitality', match: 'Hotel' },
                { name: 'Industry', match: 'Increases Security', info: 'Displays real-time alerts and metrics.' },
                { name: 'Increases Security', match: 'Industry' },
                { name: 'Office', match: 'Boosts Engagement', info: 'Improves internal communication.' },
                { name: 'Boosts Engagement', match: 'Office' }
            ],
            winMessage: '🎉 Congratulations! You discovered all digital signage advantages!'
        }
    };

    const { cards, winMessage } = gameData[currentLang] || gameData.fr;

    // Mélanger les cartes
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    let gameState = {
        hasFlippedCard: false,
        lockBoard: false,
        firstCard: null,
        secondCard: null,
        matchedPairs: 0
    };

    // Créer les cartes avec animations
    const fragment = document.createDocumentFragment();
    cards.forEach((card, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        memoryCard.dataset.name = card.name;
        memoryCard.dataset.match = card.match;
        memoryCard.dataset.info = card.info || '';
        memoryCard.style.animationDelay = `${index * 50}ms`;

        memoryCard.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">?</div>
                <div class="memory-card-back">${card.name}</div>
            </div>
        `;

        // Support tactile et souris
        const handleCardClick = () => flipCard(memoryCard);
        memoryCard.addEventListener('click', handleCardClick);
        memoryCard.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleCardClick();
        }, { passive: false });

        fragment.appendChild(memoryCard);
    });

    memoryGame.appendChild(fragment);

    function flipCard(card) {
        if (gameState.lockBoard || card === gameState.firstCard || card.classList.contains('matched')) return;

        card.classList.add('flipped');

        if (!gameState.hasFlippedCard) {
            gameState.hasFlippedCard = true;
            gameState.firstCard = card;
            return;
        }

        gameState.secondCard = card;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = gameState.firstCard.dataset.name === gameState.secondCard.dataset.match || 
                       gameState.firstCard.dataset.match === gameState.secondCard.dataset.name;
        
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        gameState.firstCard.classList.add('matched');
        gameState.secondCard.classList.add('matched');
        
        const info = gameState.firstCard.dataset.info || gameState.secondCard.dataset.info;
        if (info) {
            showInfo(info);
        }

        gameState.matchedPairs++;
        
        if (gameState.matchedPairs === 4) {
            setTimeout(() => showInfo(winMessage, true), 500);
        }

        resetBoard();
    }

    function unflipCards() {
        gameState.lockBoard = true;
        setTimeout(() => {
            gameState.firstCard.classList.remove('flipped');
            gameState.secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        gameState.hasFlippedCard = false;
        gameState.lockBoard = false;
        gameState.firstCard = null;
        gameState.secondCard = null;
    }

    function showInfo(text, isWin = false) {
        memoryInfo.textContent = text;
        memoryInfo.style.display = 'block';
        memoryInfo.classList.add('show');
        
        if (isWin) {
            memoryInfo.classList.add('win');
        }
        
        if (!isWin) {
            setTimeout(() => {
                memoryInfo.classList.remove('show');
                setTimeout(() => {
                    memoryInfo.style.display = 'none';
                }, 300);
            }, 4000);
        }
    }
}

// Gestionnaires d'événements optimisés
function initEventListeners() {
    // Redimensionnement avec debounce
    window.addEventListener('resize', utils.debounce(() => {
        detectDevice();
        calculateSlideWidth();
        updateCarousel('partners');
        fixViewportHeight();
    }, 250));

    // Orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            detectDevice();
            calculateSlideWidth();
            updateCarousel('hero');
            updateCarousel('partners');
        }, 500);
    });

    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
        state.isVisible = !document.hidden;
        if (state.isVisible) {
            startAutoPlay();
        } else {
            clearIntervals();
        }
    });

    // Performance observer
    if ('PerformanceObserver' in window) {
        try {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    // Log des métriques de performance
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                }
            });
            perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Silent fail pour les navigateurs non supportés
        }
    }
}

// Optimisations de performance avancées
function optimizePerformance() {
    // Préchargement des images critiques
    const criticalImages = [
        'https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/aee0b749-f8da-4823-b82d-2e2430e72d63/Fond+du+site+web+Xtranumerik.png?format=1000w'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Lazy loading natif
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback avec IntersectionObserver
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Optimisation des fonts
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1em Inter'),
            document.fonts.load('700 1em Playfair Display')
        ]).then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
}

// Service Worker pour le cache offline
function registerServiceWorker() {
    if ('serviceWorker' in navigator && !state.isMobile) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Silent fail si le service worker n'existe pas
            });
        });
    }
}

// Initialisation avec vérification du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Optimisations après chargement complet
window.addEventListener('load', () => {
    optimizePerformance();
    registerServiceWorker();
});

// Nettoyage lors du déchargement
window.addEventListener('beforeunload', () => {
    clearIntervals();
});

// Export des fonctions globales pour les boutons
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;