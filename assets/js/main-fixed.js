// FIXED: Enhanced carousel functionality with improved structure
// Configuration optimisée
const CONFIG = {
    intervals: {
        hero: 5000,
        partners: 2000
    },
    thresholds: {
        intersection: 0.1,
        particles: 20
    }
};

// État global simplifié
let state = {
    hero: {
        currentSlide: 0,
        totalSlides: 4,
        interval: null,
        wrapper: null,
        dots: null
    },
    partners: {
        autoScroll: true,
        element: null
    },
    isVisible: true
};

// Utilitaires
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

// FIXED: Hero Carousel - Structure améliorée
function initHeroCarousel() {
    state.hero.wrapper = document.getElementById('hero-carousel-wrapper');
    state.hero.dots = document.querySelectorAll('#hero-carousel-dots .dot');
    
    if (!state.hero.wrapper) return;
    
    // Fonction de mise à jour
    function updateHeroCarousel() {
        const translateX = -state.hero.currentSlide * 25; // 25% par image (4 images)
        state.hero.wrapper.style.transform = `translateX(${translateX}%)`;
        
        // Mise à jour des dots
        state.hero.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === state.hero.currentSlide);
        });
    }
    
    // Navigation
    window.nextSlide = function(carouselType) {
        if (carouselType === 'hero') {
            state.hero.currentSlide = (state.hero.currentSlide + 1) % state.hero.totalSlides;
            updateHeroCarousel();
        }
    };
    
    window.prevSlide = function(carouselType) {
        if (carouselType === 'hero') {
            state.hero.currentSlide = (state.hero.currentSlide - 1 + state.hero.totalSlides) % state.hero.totalSlides;
            updateHeroCarousel();
        }
    };
    
    window.goToSlide = function(carouselType, index) {
        if (carouselType === 'hero' && index >= 0 && index < state.hero.totalSlides) {
            state.hero.currentSlide = index;
            updateHeroCarousel();
        }
    };
    
    // Support tactile amélioré
    let touchStartX = 0;
    let touchEndX = 0;
    
    state.hero.wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    state.hero.wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                window.nextSlide('hero');
            } else {
                window.prevSlide('hero');
            }
        }
    }, { passive: true });
    
    // Auto-play
    function startHeroAutoPlay() {
        state.hero.interval = setInterval(() => {
            if (state.isVisible) {
                window.nextSlide('hero');
            }
        }, CONFIG.intervals.hero);
    }
    
    function stopHeroAutoPlay() {
        if (state.hero.interval) {
            clearInterval(state.hero.interval);
            state.hero.interval = null;
        }
    }
    
    // Pause on hover
    const heroContainer = document.querySelector('.hero-carousel');
    if (heroContainer) {
        heroContainer.addEventListener('mouseenter', stopHeroAutoPlay);
        heroContainer.addEventListener('mouseleave', startHeroAutoPlay);
    }
    
    // Initialisation
    updateHeroCarousel();
    startHeroAutoPlay();
}

// FIXED: Partners Carousel - Contrôle simplifié
function initPartnersCarousel() {
    state.partners.element = document.getElementById('partners-carousel');
    
    if (!state.partners.element) return;
    
    // Fonction de contrôle
    window.togglePartnersScroll = function() {
        state.partners.autoScroll = !state.partners.autoScroll;
        
        if (state.partners.autoScroll) {
            state.partners.element.classList.add('auto-scroll');
        } else {
            state.partners.element.classList.remove('auto-scroll');
        }
    };
    
    // Pause on hover
    const partnersContainer = document.querySelector('.partners-carousel-container');
    if (partnersContainer) {
        partnersContainer.addEventListener('mouseenter', () => {
            if (state.partners.element) {
                state.partners.element.style.animationPlayState = 'paused';
            }
        });
        
        partnersContainer.addEventListener('mouseleave', () => {
            if (state.partners.element && state.partners.autoScroll) {
                state.partners.element.style.animationPlayState = 'running';
            }
        });
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
        particle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: 2px;
            height: 2px;
            background: rgba(255, 169, 26, 0.6);
            border-radius: 50%;
            animation: float ${15 + Math.random() * 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 20}s;
        `;
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
    }, 16);
    
    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Animations des sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section, .avantage-item');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: CONFIG.thresholds.intersection,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    sections.forEach(section => {
        section.style.cssText += `
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        `;
        observer.observe(section);
    });
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
    
    // Données du jeu
    const cardsData = [
        { name: 'Retail', match: 'Booste les ventes', info: 'Transforme l\'expérience client en magasin avec des visuels dynamiques.' },
        { name: 'Booste les ventes', match: 'Retail' },
        { name: 'Hôtel', match: 'Améliore l\'hospitalité', info: 'Personnalise les services pour une expérience luxueuse.' },
        { name: 'Améliore l\'hospitalité', match: 'Hôtel' },
        { name: 'Industrie', match: 'Augmente la sécurité', info: 'Affiche alertes et métriques en temps réel.' },
        { name: 'Augmente la sécurité', match: 'Industrie' },
        { name: 'Bureau', match: 'Booste l\'engagement', info: 'Améliore la communication interne.' },
        { name: 'Booste l\'engagement', match: 'Bureau' }
    ];
    
    // Mélanger
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
        memoryInfo.style.background = isWin ? 'linear-gradient(135deg, #190544, #ffa91a)' : 'rgba(255, 255, 255, 0.95)';
        memoryInfo.style.color = isWin ? 'white' : '#190544';
        
        if (!isWin) {
            setTimeout(() => {
                memoryInfo.style.display = 'none';
            }, 4000);
        }
    }
}

// Gestionnaires d'événements
function initEventListeners() {
    // Redimensionnement
    window.addEventListener('resize', utils.debounce(() => {
        // Recalculer les dimensions si nécessaire
    }, 250));
    
    // Gestion de la visibilité
    document.addEventListener('visibilitychange', () => {
        state.isVisible = !document.hidden;
    });
    
    // Performance
    window.addEventListener('beforeunload', () => {
        if (state.hero.interval) {
            clearInterval(state.hero.interval);
        }
    });
}

// Optimisations de performance
function optimizePerformance() {
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
    
    // Préchargement critique
    const criticalImages = [
        '/data/images/accueil/Format%20salle%20d\'attente%20xtranumerik%202025.png',
        '/data/images/accueil/IMG_6401.JPG'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Animation des particules (CSS)
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.7;
            }
        }
        
        .particle {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Initialisation principale
function init() {
    addParticleStyles();
    initHeroCarousel();
    initPartnersCarousel();
    initParticles();
    initScrollProgress();
    initSectionAnimations();
    initMemoryGame();
    initSmoothNavigation();
    initEventListeners();
}

// Démarrage
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', optimizePerformance);

// Styles CSS supplémentaires pour les cartes mémoire
function addMemoryGameStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .memory-card {
            width: 150px;
            height: 100px;
            margin: 10px;
            perspective: 1000px;
            cursor: pointer;
        }
        
        .memory-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
            border-radius: 10px;
        }
        
        .memory-card.flipped .memory-card-inner {
            transform: rotateY(180deg);
        }
        
        .memory-card-front, .memory-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        
        .memory-card-front {
            background: linear-gradient(135deg, #190544, #ffa91a);
            color: white;
            font-size: 24px;
        }
        
        .memory-card-back {
            background: white;
            color: #190544;
            transform: rotateY(180deg);
            border: 2px solid #190544;
            padding: 10px;
        }
        
        .memory-card.matched {
            opacity: 0.6;
            pointer-events: none;
        }
        
        #memory-game {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 600px;
            margin: 50px auto;
        }
        
        #memory-info {
            display: none;
            margin: 20px auto;
            padding: 20px;
            max-width: 500px;
            text-align: center;
            border-radius: 10px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Ajouter les styles au chargement
document.addEventListener('DOMContentLoaded', addMemoryGameStyles);