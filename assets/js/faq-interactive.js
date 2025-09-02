// FAQ Interactive JavaScript optimisé pour affichage dynamique Québec
// Gestion des accordéons FAQ avec animations fluides et SEO-friendly

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;

    // Initialiser chaque item FAQ
    faqItems.forEach((item, index) => {
        const question = item.querySelector('h3[itemprop="name"]');
        const answer = item.querySelector('div[itemprop="acceptedAnswer"]');
        
        if (!question || !answer) return;

        // Ajouter les attributs d'accessibilité
        const questionId = `faq-question-${index + 1}`;
        const answerId = `faq-answer-${index + 1}`;
        
        question.setAttribute('id', questionId);
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        
        answer.setAttribute('id', answerId);
        answer.setAttribute('aria-labelledby', questionId);
        answer.setAttribute('role', 'region');

        // Gérer les clics
        question.addEventListener('click', () => toggleFAQ(item, question, answer));
        
        // Gérer l'accessibilité clavier
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item, question, answer);
            }
        });

        // Animation d'entrée progressive
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Gérer les liens vers FAQ depuis l'URL
    handleFAQDeepLinking();
}

function toggleFAQ(item, question, answer) {
    const isActive = item.classList.contains('active');
    
    // Fermer tous les autres éléments FAQ (comportement accordion)
    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
            closeFAQItem(activeItem);
        }
    });

    // Basculer l'état de l'élément cliqué
    if (isActive) {
        closeFAQItem(item);
    } else {
        openFAQItem(item, question, answer);
    }

    // Analytics - tracking des interactions FAQ
    trackFAQInteraction(question.textContent, !isActive);
}

function openFAQItem(item, question, answer) {
    item.classList.add('active');
    question.setAttribute('aria-expanded', 'true');
    
    // Animation d'ouverture fluide
    const content = answer.querySelector('p[itemprop="text"]');
    if (content) {
        // Calculer la hauteur nécessaire
        const contentHeight = content.scrollHeight;
        answer.style.maxHeight = contentHeight + 50 + 'px'; // +50px pour le padding
        
        // Animer l'opacité
        setTimeout(() => {
            answer.style.opacity = '1';
        }, 100);
    }

    // Smooth scroll vers l'élément si nécessaire
    setTimeout(() => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (!isVisible) {
            item.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
            });
        }
    }, 300);
}

function closeFAQItem(item) {
    const question = item.querySelector('h3[itemprop="name"]');
    const answer = item.querySelector('div[itemprop="acceptedAnswer"]');
    
    item.classList.remove('active');
    question.setAttribute('aria-expanded', 'false');
    
    // Animation de fermeture
    answer.style.maxHeight = '0';
    answer.style.opacity = '0';
}

function handleFAQDeepLinking() {
    // Gérer les liens directs vers une FAQ spécifique
    const hash = window.location.hash;
    
    if (hash && hash.startsWith('#faq-')) {
        const targetElement = document.querySelector(hash);
        if (targetElement && targetElement.closest('.faq-item')) {
            const faqItem = targetElement.closest('.faq-item');
            const question = faqItem.querySelector('h3[itemprop="name"]');
            const answer = faqItem.querySelector('div[itemprop="acceptedAnswer"]');
            
            // Ouvrir automatiquement la FAQ ciblée
            setTimeout(() => {
                openFAQItem(faqItem, question, answer);
                
                // Scroll avec délai pour l'animation
                setTimeout(() => {
                    faqItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 500);
            }, 1000);
        }
    }
}

function trackFAQInteraction(question, opened) {
    // Analytics pour mesurer l'engagement FAQ
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_interaction', {
            'event_category': 'Affichage Dynamique FAQ',
            'event_label': question,
            'action': opened ? 'open' : 'close',
            'custom_map': {
                'metric1': opened ? 1 : 0
            }
        });
    }

    // Alternative tracking pour autres systèmes d'analytics
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'faq_engagement',
            'faq_question': question,
            'faq_action': opened ? 'expand' : 'collapse',
            'page_section': 'affichage_dynamique_quebec'
        });
    }

    // Log pour debug en développement
    console.log(`FAQ ${opened ? 'opened' : 'closed'}: ${question}`);
}

// Utilitaires d'optimisation performance
const utils = {
    // Debounce pour optimiser les événements
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

    // Throttle pour scroll et resize
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
        };
    }
};

// Observer pour animations au scroll (optimisé)
function initFAQScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const faqObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Déclencher animation d'entrée personnalisée si nécessaire
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer toutes les FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            faqObserver.observe(item);
        });
    }
}

// Initialiser les animations scroll
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initFAQScrollAnimations, 500);
});

// Gestion des erreurs gracieuse
window.addEventListener('error', (e) => {
    if (e.filename && e.filename.includes('faq-interactive.js')) {
        console.warn('Erreur FAQ JavaScript:', e.message);
        // Fallback : s'assurer que les FAQ restent fonctionnelles même en cas d'erreur
        document.querySelectorAll('.faq-item h3').forEach(question => {
            if (!question.onclick) {
                question.style.cursor = 'pointer';
                question.onclick = function() {
                    const item = this.closest('.faq-item');
                    item.classList.toggle('active');
                };
            }
        });
    }
});

// Export pour utilisation globale si nécessaire
window.XtranumerikFAQ = {
    init: initFAQ,
    toggle: toggleFAQ,
    open: openFAQItem,
    close: closeFAQItem
};