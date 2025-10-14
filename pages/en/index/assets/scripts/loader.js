/**
 * Loader.js - Dynamic Section Loading
 * Intelligent management of modular loading with animations
 */

(function() {
    'use strict';

    // Configuration of sections to load
    const sections = [
        { id: 'hero', file: 'hero.html', priority: 1 },
        { id: 'compatibility', file: 'compatibility.html', priority: 2 },
        { id: 'tech', file: 'tech-innovante.html', priority: 3 },
        { id: 'avantages', file: 'avantages.html', priority: 4 },
        { id: 'partenaires', file: 'partenaires.html', priority: 5 },
        { id: 'faq', file: 'faq.html', priority: 6 }
    ];

    // Base path for sections
    const SECTIONS_PATH = './sections/';

    // Cache of loaded sections
    const sectionCache = new Map();

    // Loading state
    let loadingProgress = 0;
    const totalSections = sections.length;

    /**
     * Load an HTML section
     */
    async function loadSection(section) {
        // Check cache
        if (sectionCache.has(section.id)) {
            return sectionCache.get(section.id);
        }

        try {
            const response = await fetch(`${SECTIONS_PATH}${section.file}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status} for ${section.file}`);
            }

            const html = await response.text();
            sectionCache.set(section.id, html);
            return html;

        } catch (error) {
            console.error(`❌ Section loading error ${section.id}:`, error);
            return `<div class="error-section">
                <p>⚠️ Section loading error ${section.id}</p>
            </div>`;
        }
    }

    /**
     * Inject HTML into container with animation
     */
    function injectSection(containerId, html) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.warn(`⚠️ Container #${containerId} not found`);
            return;
        }

        // Inject HTML
        container.innerHTML = html;
        
        // Add class for animation
        container.classList.add('fade-in-up');
        
        // Trigger animations for child elements
        const animatableElements = container.querySelectorAll('.scroll-reveal, .stagger-item');
        animatableElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('revealed', 'animate');
            }, index * 100);
        });

        // Initialize section-specific scripts if present
        initializeSectionScripts(container);
    }

    /**
     * Initialize section-specific scripts
     */
    function initializeSectionScripts(container) {
        // Carousel
        const carousels = container.querySelectorAll('.carousel');
        if (carousels.length > 0 && typeof initCarousel === 'function') {
            carousels.forEach(carousel => initCarousel(carousel));
        }

        // Particles
        const particleContainers = container.querySelectorAll('.particles-container');
        if (particleContainers.length > 0 && typeof initParticles === 'function') {
            particleContainers.forEach(pc => initParticles(pc));
        }

        // Animated counters
        const counters = container.querySelectorAll('.counter[data-target]');
        if (counters.length > 0 && typeof animateCounter === 'function') {
            counters.forEach(counter => animateCounter(counter));
        }

        // FAQ accordion
        const faqItems = container.querySelectorAll('.faq-item');
        if (faqItems.length > 0) {
            initFAQ(faqItems);
        }
    }

    /**
     * Initialize FAQ accordion
     */
    function initFAQ(items) {
        items.forEach(item => {
            const question = item.querySelector('h3');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    items.forEach(i => i.classList.remove('active'));
                    
                    // Open clicked item if closed
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * Update progress bar
     */
    function updateProgress() {
        loadingProgress++;
        const percentage = (loadingProgress / totalSections) * 100;
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('sectionLoaded', {
            detail: { 
                loaded: loadingProgress, 
                total: totalSections, 
                percentage 
            }
        }));

        // Display in console in dev
        if (window.location.hostname === 'localhost') {
            console.log(`📦 Loading: ${loadingProgress}/${totalSections} (${percentage.toFixed(0)}%)`);
        }
    }

    /**
     * Load all sections in parallel
     */
    async function loadAllSections() {
        console.log('🚀 Starting section loading...');
        
        try {
            // Load all sections in parallel
            const loadPromises = sections.map(async (section) => {
                const html = await loadSection(section);
                injectSection(`${section.id}-section`, html);
                updateProgress();
            });

            await Promise.all(loadPromises);
            
            console.log('✅ All sections loaded!');
            
            // Dispatch end of loading event
            document.dispatchEvent(new CustomEvent('allSectionsLoaded'));
            
            // Initialize Intersection Observer for scroll reveals
            initScrollReveal();
            
            // Hide loader if present
            hideLoader();

        } catch (error) {
            console.error('❌ Global loading error:', error);
        }
    }

    /**
     * Initialize Intersection Observer for scroll animations
     */
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements
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

        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Hide loader
     */
    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }

        // Remove loading class from body
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }

    /**
     * Network error handling
     */
    window.addEventListener('online', () => {
        console.log('🌐 Connection restored');
        // Reload failed sections if needed
    });

    window.addEventListener('offline', () => {
        console.warn('⚠️ No internet connection');
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
- Complete load: ${loadTime}ms`);
        }
    }

    /**
     * Initialization on DOM load
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadAllSections();
            
            // Log performance after loading
            window.addEventListener('load', () => {
                setTimeout(logPerformance, 0);
            });
        });
    } else {
        // DOM already loaded
        loadAllSections();
        logPerformance();
    }

    // Export for debugging
    window.SectionLoader = {
        reload: loadAllSections,
        cache: sectionCache,
        sections: sections
    };

})();
