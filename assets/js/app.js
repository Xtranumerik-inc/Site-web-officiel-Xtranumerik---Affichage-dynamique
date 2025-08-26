/**
 * XTRANUMERIK - SCRIPT PRINCIPAL
 * Initialisation et fonctions globales
 */

class XtranumerikApp {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initComponents();
        console.log('Xtranumerik App initialized');
    }

    // Détection de langue basée sur l'URL
    detectLanguage() {
        const path = window.location.pathname;
        if (path.includes('/en/')) return 'en';
        if (path.includes('/fr/')) return 'fr';
        // Détection navigateur par défaut
        const browserLang = navigator.language.substring(0, 2);
        return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
    }

    // Configuration des event listeners globaux
    setupEventListeners() {
        // Smooth scroll pour tous les liens ancres
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Lazy loading des images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }    // Initialisation des animations au scroll
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec data-animate
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialisation des composants
    initComponents() {
        // Initialiser les carrousels
        if (typeof Carousel !== 'undefined') {
            document.querySelectorAll('.carousel').forEach(carousel => {
                new Carousel(carousel);
            });
        }

        // Initialiser les particules si présentes
        if (document.getElementById('particles-canvas')) {
            this.initParticles();
        }

        // Initialiser les graphiques
        this.initCharts();
    }

    // Système de particules animées
    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = window.innerWidth < 768 ? 25 : 50;

        // Créer les particules
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        // Animation des particules
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Mise à jour position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Rebond sur les bords
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Dessin de la particule
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(25, 5, 68, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Redimensionnement responsive
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Initialisation des graphiques Chart.js
    initCharts() {
        document.querySelectorAll('.chart-container canvas').forEach(canvas => {
            const chartType = canvas.dataset.chartType || 'bar';
            const chartData = JSON.parse(canvas.dataset.chartData || '{}');
            
            new Chart(canvas.getContext('2d'), {
                type: chartType,
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        tooltip: { enabled: true }
                    },
                    scales: chartType === 'pie' ? {} : {
                        y: { beginAtZero: true }
                    }
                }
            });
        });
    }

    // Utilitaire pour changer de langue
    switchLanguage(newLang) {
        const currentPath = window.location.pathname;
        let newPath = currentPath.replace(/\/(fr|en)\//, `/${newLang}/`);
        
        if (!newPath.includes(`/${newLang}/`)) {
            newPath = `/${newLang}${currentPath}`;
        }
        
        window.location.href = newPath;
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    window.xtranumerik = new XtranumerikApp();
});
