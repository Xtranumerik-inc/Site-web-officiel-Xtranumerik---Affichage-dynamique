// Configuration and variables optimisées
const CONFIG = {
    intervals: {
        hero: 6000,
        partners: 1500
    },
    thresholds: {
        intersection: 0.1,
        particles: 30
    }
};

let state = {
    intervals: {},
    carousels: {
        hero: { currentSlide: 0, element: null, dots: null },
        partners: { currentSlide: 0, element: null, originalImages: null, totalOriginalImages: 0, slideWidth: 0 }
    },
    isVisible: true
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
    }
};

// Initialisation principale
function init() {
    initCarousels();
    initParticles();
    initScrollProgress();
    initSectionAnimations();
    initMemoryGame();
    initSmoothNavigation();
    initEventListeners();
}

// Gestion des carrousels optimisée
function initCarousels() {
    clearIntervals();
    
    // Hero carousel
    const hero = state.carousels.hero;
    hero.element = document.getElementById('hero-carousel');
    hero.dots = document.querySelectorAll('#hero-carousel-dots .dot');

    if (!hero.element) return;

    // Partners carousel
    const partners = state.carousels.partners;
    partners.element = document.getElementById('partners-carousel');
    
    if (partners.element) {
        partners.originalImages = Array.from(partners.element.children);
        partners.totalOriginalImages = partners.originalImages.length;

        // Duplication pour défilement infini
        partners.element.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            partners.originalImages.forEach(img => 
                partners.element.appendChild(img.cloneNode(true))
            );
        }
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
    if (state.isVisible) {
        state.intervals.hero = setInterval(() => nextSlide('hero'), CONFIG.intervals.hero);
        state.intervals.partners = setInterval(() => nextSlide('partners'), CONFIG.intervals.partners);
    }
}

function updateCarousel(carouselId) {
    const carousel = state.carousels[carouselId];
    
    if (carouselId === 'hero' && carousel.element) {
        carousel.element.style.transform = `translateX(-${carousel.currentSlide * 100}%)`;
        if (carousel.dots) {
            carousel.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === carousel.currentSlide);
            });
        }
    } else if (carouselId === 'partners' && carousel.element) {
        const offset = carousel.currentSlide * carousel.slideWidth;
        carousel.element.style.transform = `translateX(-${offset}px)`;

        // Gestion du carrousel infini
        if (carousel.currentSlide >= carousel.totalOriginalImages * 2) {
            requestAnimationFrame(() => {
                carousel.element.style.transition = 'none';
                carousel.currentSlide -= carousel.totalOriginalImages;
                carousel.element.style.transform = `translateX(-${carousel.currentSlide * carousel.slideWidth}px)`;
                carousel.element.offsetHeight; // Force reflow
                carousel.element.style.transition = 'transform 0.5s linear';
            });
        } else if (carousel.currentSlide < 0) {
            requestAnimationFrame(() => {
                carousel.element.style.transition = 'none';
                carousel.currentSlide += carousel.totalOriginalImages;
                carousel.element.style.transform = `translateX(-${carousel.currentSlide * carousel.slideWidth}px)`;
                carousel.element.offsetHeight; // Force reflow
                carousel.element.style.transition = 'transform 0.5s linear';
            });
        }
    }
}

// Navigation des carrousels
function nextSlide(carouselId) {
    const carousel = state.carousels[carouselId];
    if (carouselId === 'hero' && carousel.element) {
        carousel.currentSlide = (carousel.currentSlide + 1) % carousel.element.children.length;
    } else if (carouselId === 'partners') {
        carousel.currentSlide++;
    }
    updateCarousel(carouselId);
}

function prevSlide(carouselId) {
    const carousel = state.carousels[carouselId];
    if (carouselId === 'hero' && carousel.element) {
        carousel.currentSlide = (carousel.currentSlide - 1 + carousel.element.children.length) % carousel.element.children.length;
    } else if (carouselId === 'partners') {
        carousel.currentSlide--;
    }
    updateCarousel(carouselId);
}

function goToSlide(carouselId, index) {
    if (carouselId === 'hero') {
        state.carousels[carouselId].currentSlide = index;
        updateCarousel(carouselId);
    }
}

// Particules optimisées
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < CONFIG.thresholds.particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);
}

// Barre de progression optimisée
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    const updateProgress = utils.throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = scrollPercent + '%';
    }, 16); // 60fps

    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Animations des sections optimisées
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: CONFIG.thresholds.intersection,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    sections.forEach(section => observer.observe(section));
}

// Navigation fluide
function initSmoothNavigation() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Jeu mémoire optimisé
function initMemoryGame() {
    const memoryGame = document.getElementById('memory-game');
    const memoryInfo = document.getElementById('memory-info');
    
    if (!memoryGame || !memoryInfo) return;
    
    const cardsData = [
        { name: 'Retail', match: 'Booste les ventes', info: 'Transforme l\'expérience client en magasin avec des visuels dynamiques et engageants.' },
        { name: 'Booste les ventes', match: 'Retail' },
        { name: 'Hôtel', match: 'Améliore l\'hospitalité', info: 'Personnalise les services pour une expérience luxueuse et mémorable.' },
        { name: 'Améliore l\'hospitalité', match: 'Hôtel' },
        { name: 'Industrie', match: 'Augmente la sécurité', info: 'Affiche alertes et métriques en temps réel pour une sécurité optimale.' },
        { name: 'Augmente la sécurité', match: 'Industrie' },
        { name: 'Bureau', match: 'Booste l\'engagement', info: 'Améliore la communication interne et l\'engagement des employés.' },
        { name: 'Booste l\'engagement', match: 'Bureau' }
    ];

    // Mélanger efficacement
    for (let i = cardsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
    }

    // Variables du jeu
    let gameState = {
        hasFlippedCard: false,
        lockBoard: false,
        firstCard: null,
        secondCard: null,
        matchedPairs: 0
    };

    // Créer les cartes
    const fragment = document.createDocumentFragment();
    cardsData.forEach((card) => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        memoryCard.dataset.name = card.name;
        memoryCard.dataset.match = card.match;
        memoryCard.dataset.info = card.info || '';

        memoryCard.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">?</div>
                <div class="memory-card-back">${card.name}</div>
            </div>
        `;

        memoryCard.addEventListener('click', () => flipCard(memoryCard));
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
        
        // Afficher l'info bonus
        const info = gameState.firstCard.dataset.info || gameState.secondCard.dataset.info;
        if (info) {
            showInfo(info);
        }

        gameState.matchedPairs++;
        
        if (gameState.matchedPairs === 4) {
            setTimeout(() => {
                showInfo('🎉 Félicitations ! Vous avez découvert tous les avantages de l\'affichage dynamique !', true);
            }, 500);
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
        
        if (isWin) {
            memoryInfo.style.background = 'var(--gradient-accent)';
            memoryInfo.style.color = 'var(--primary-color)';
        } else {
            memoryInfo.style.background = 'var(--gradient-glass)';
            memoryInfo.style.color = 'var(--primary-color)';
        }
        
        if (!isWin) {
            setTimeout(() => {
                memoryInfo.style.display = 'none';
            }, 4000);
        }
    }
}

// Gestionnaires d'événements optimisés
function initEventListeners() {
    // Redimensionnement avec debounce
    window.addEventListener('resize', utils.debounce(() => {
        calculateSlideWidth();
        updateCarousel('partners');
    }, 250));

    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
        state.isVisible = !document.hidden;
        if (state.isVisible) {
            startAutoPlay();
        } else {
            clearIntervals();
        }
    });

    // Support tactile pour mobile
    initTouchSupport();
}

// Support tactile optimisé
function initTouchSupport() {
    let touchStart = { x: 0, y: 0 };
    let touchEnd = { x: 0, y: 0 };
    
    const heroElement = state.carousels.hero.element;
    
    if (!heroElement) return;
    
    heroElement.addEventListener('touchstart', (e) => {
        touchStart.x = e.changedTouches[0].screenX;
        touchStart.y = e.changedTouches[0].screenY;
    }, { passive: true });
    
    heroElement.addEventListener('touchend', (e) => {
        touchEnd.x = e.changedTouches[0].screenX;
        touchEnd.y = e.changedTouches[0].screenY;
        
        const diffX = touchStart.x - touchEnd.x;
        const diffY = Math.abs(touchStart.y - touchEnd.y);
        
        // Vérifier que c'est un swipe horizontal
        if (Math.abs(diffX) > 50 && diffY < 100) {
            if (diffX > 0) {
                nextSlide('hero');
            } else {
                prevSlide('hero');
            }
        }
    }, { passive: true });
}

// Optimisations de performance
function optimizePerformance() {
    // Préchargement des images critiques
    const criticalImages = [
        'https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/aee0b749-f8da-4823-b82d-2e2430e72d63/Fond+du+site+web+Xtranumerik.png?format=2500w'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Lazy loading des images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialisation avec optimisations
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', optimizePerformance);

// Nettoyage lors du déchargement
window.addEventListener('beforeunload', () => {
    clearIntervals();
});

// Expose global functions for carousel navigation
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
