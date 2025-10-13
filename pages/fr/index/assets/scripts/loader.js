/**
 * Loader.js - Chargement Dynamique des Sections
 * Gestion intelligente du chargement modulaire avec animations
 */

(function() {
    'use strict';

    // Configuration des sections à charger
    const sections = [
        { id: 'hero', file: 'hero.html', priority: 1 },
        { id: 'compatibility', file: 'compatibility.html', priority: 2 },
        { id: 'tech', file: 'tech-innovante.html', priority: 3 },
        { id: 'solutions', file: 'solutions-secteurs.html', priority: 4 },
        { id: 'avantages', file: 'avantages.html', priority: 5 },
        { id: 'partenaires', file: 'partenaires.html', priority: 6 },
        { id: 'faq', file: 'faq.html', priority: 7 }
    ];

    // Chemin de base des sections
    const SECTIONS_PATH = './sections/';

    // Cache des sections chargées
    const sectionCache = new Map();

    // État du chargement
    let loadingProgress = 0;
    const totalSections = sections.length;

    /**
     * Charge une section HTML
     */
    async function loadSection(section) {
        // Vérifier le cache
        if (sectionCache.has(section.id)) {
            return sectionCache.get(section.id);
        }

        try {
            const response = await fetch(`${SECTIONS_PATH}${section.file}`);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status} pour ${section.file}`);
            }

            const html = await response.text();
            sectionCache.set(section.id, html);
            return html;

        } catch (error) {
            console.error(`❌ Erreur chargement section ${section.id}:`, error);
            return `<div class="error-section">
                <p>⚠️ Erreur de chargement de la section ${section.id}</p>
            </div>`;
        }
    }

    /**
     * Injecte le HTML dans le conteneur avec animation
     */
    function injectSection(containerId, html) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.warn(`⚠️ Conteneur #${containerId} introuvable`);
            return;
        }

        // Injecter le HTML
        container.innerHTML = html;
        
        // Ajouter classe pour animation
        container.classList.add('fade-in-up');
        
        // Déclencher les animations des éléments enfants
        const animatableElements = container.querySelectorAll('.scroll-reveal, .stagger-item');
        animatableElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('revealed', 'animate');
            }, index * 100);
        });

        // Initialiser les scripts de la section si présents
        initializeSectionScripts(container);
    }

    /**
     * Initialise les scripts spécifiques d'une section
     */
    function initializeSectionScripts(container) {
        // Carousel
        const carousels = container.querySelectorAll('.carousel');
        if (carousels.length > 0 && typeof initCarousel === 'function') {
            carousels.forEach(carousel => initCarousel(carousel));
        }

        // Particules
        const particleContainers = container.querySelectorAll('.particles-container');
        if (particleContainers.length > 0 && typeof initParticles === 'function') {
            particleContainers.forEach(pc => initParticles(pc));
        }

        // Compteurs animés
        const counters = container.querySelectorAll('.counter[data-target]');
        if (counters.length > 0 && typeof animateCounter === 'function') {
            counters.forEach(counter => animateCounter(counter));
        }

        // FAQ accordéon
        const faqItems = container.querySelectorAll('.faq-item');
        if (faqItems.length > 0) {
            initFAQ(faqItems);
        }
    }

    /**
     * Initialise FAQ accordéon
     */
    function initFAQ(items) {
        items.forEach(item => {
            const question = item.querySelector('h3');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Fermer tous les items
                    items.forEach(i => i.classList.remove('active'));
                    
                    // Ouvrir l'item cliqué si fermé
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * Met à jour la barre de progression
     */
    function updateProgress() {
        loadingProgress++;
        const percentage = (loadingProgress / totalSections) * 100;
        
        // Dispatcher événement custom
        document.dispatchEvent(new CustomEvent('sectionLoaded', {
            detail: { 
                loaded: loadingProgress, 
                total: totalSections, 
                percentage 
            }
        }));

        // Afficher dans console en dev
        if (window.location.hostname === 'localhost') {
            console.log(`📦 Chargement: ${loadingProgress}/${totalSections} (${percentage.toFixed(0)}%)`);
        }
    }

    /**
     * Charge toutes les sections en parallèle
     */
    async function loadAllSections() {
        console.log('🚀 Début chargement sections...');
        
        try {
            // Charger toutes les sections en parallèle
            const loadPromises = sections.map(async (section) => {
                const html = await loadSection(section);
                injectSection(`${section.id}-section`, html);
                updateProgress();
            });

            await Promise.all(loadPromises);
            
            console.log('✅ Toutes les sections chargées!');
            
            // Dispatcher événement de fin de chargement
            document.dispatchEvent(new CustomEvent('allSectionsLoaded'));
            
            // Initialiser Intersection Observer pour scroll reveals
            initScrollReveal();
            
            // Masquer loader si présent
            hideLoader();

        } catch (error) {
            console.error('❌ Erreur chargement global:', error);
        }
    }

    /**
     * Initialise Intersection Observer pour animations au scroll
     */
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: afficher tous les éléments
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                el.classList.add('revealed');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observer tous les éléments scroll-reveal
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Masque le loader
     */
    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }

        // Retirer classe loading du body
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }

    /**
     * Gestion des erreurs réseau
     */
    window.addEventListener('online', () => {
        console.log('🌐 Connexion rétablie');
        // Recharger les sections échouées si besoin
    });

    window.addEventListener('offline', () => {
        console.warn('⚠️ Pas de connexion internet');
    });

    /**
     * Performance monitoring
     */
    function logPerformance() {
        if ('performance' in window && performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            
            console.log(`⚡ Performance:
- DOM Ready: ${domReady}ms
- Load complet: ${loadTime}ms`);
        }
    }

    /**
     * Initialisation au chargement DOM
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadAllSections();
            
            // Log performance après chargement
            window.addEventListener('load', () => {
                setTimeout(logPerformance, 0);
            });
        });
    } else {
        // DOM déjà chargé
        loadAllSections();
        logPerformance();
    }

    // Export pour debug
    window.SectionLoader = {
        reload: loadAllSections,
        cache: sectionCache,
        sections: sections
    };

})();
