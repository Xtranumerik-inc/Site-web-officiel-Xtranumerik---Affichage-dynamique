/**
 * Footer Loader
 * Charge dynamiquement le footer HTML et les styles associés
 * Compatible avec Cloudflare Pages
 */

(function() {
    'use strict';
    
    // Configuration
    const FOOTER_CONFIG = {
        htmlPath: '/components/footer.html',
        cssPath: '/components/footer.css',
        containerId: 'footer-container',
        retryAttempts: 3,
        retryDelay: 500
    };
    
    /**
     * Charge le CSS du footer
     */
    function loadFooterStyles() {
        // Vérifie si le CSS est déjà chargé
        const existingLink = document.querySelector(`link[href="${FOOTER_CONFIG.cssPath}"]`);
        if (existingLink) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = FOOTER_CONFIG.cssPath;
            link.onload = resolve;
            link.onerror = () => reject(new Error(`Échec du chargement du CSS : ${FOOTER_CONFIG.cssPath}`));
            document.head.appendChild(link);
        });
    }
    
    /**
     * Charge le HTML du footer avec retry
     */
    async function fetchFooterHTML(attempt = 1) {
        try {
            const response = await fetch(FOOTER_CONFIG.htmlPath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} : ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            if (attempt < FOOTER_CONFIG.retryAttempts) {
                console.warn(`Tentative ${attempt} échouée, nouvel essai...`);
                await new Promise(resolve => setTimeout(resolve, FOOTER_CONFIG.retryDelay));
                return fetchFooterHTML(attempt + 1);
            }
            throw error;
        }
    }
    
    /**
     * Insère le footer dans le DOM
     */
    function insertFooter(html) {
        const container = document.getElementById(FOOTER_CONFIG.containerId);
        if (!container) {
            console.error(`Container avec l'ID "${FOOTER_CONFIG.containerId}" non trouvé`);
            return;
        }
        
        container.innerHTML = html;
        
        // Déclenche un événement pour signaler que le footer est chargé
        window.dispatchEvent(new Event('footerLoaded'));
    }
    
    /**
     * Initialise les fonctionnalités du footer
     */
    function initializeFooterFeatures() {
        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }
        
        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Affiche/masque le bouton selon le scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.display = 'flex';
                } else {
                    backToTopBtn.style.display = 'none';
                }
            });
        }
        
        // Contact buttons
        const contactButtons = document.querySelectorAll('.footer-cta .btn');
        contactButtons.forEach(button => {
            button.addEventListener('click', handleContactClick);
        });
        
        // Social links tracking
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', handleSocialClick);
        });
    }
    
    /**
     * Gestion du formulaire de newsletter
     */
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (validateEmail(email)) {
            // Créer un mailto link
            const subject = encodeURIComponent('Inscription Newsletter Xtranumerik');
            const body = encodeURIComponent(`Bonjour,\n\nJe souhaite m'inscrire à votre newsletter.\n\nEmail : ${email}\n\nMerci !`);
            window.location.href = `mailto:patrick@xtranumerik.ca?subject=${subject}&body=${body}`;
            
            // Message de confirmation
            showMessage('Merci ! Votre demande d'inscription sera traitée rapidement.', 'success');
            emailInput.value = '';
        } else {
            showMessage('Veuillez entrer une adresse email valide.', 'error');
        }
    }
    
    /**
     * Validation email
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /**
     * Affiche un message temporaire
     */
    function showMessage(text, type) {
        const existingMessage = document.querySelector('.footer-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `footer-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    /**
     * Gestion des clics sur les boutons de contact
     */
    function handleContactClick(e) {
        // Analytics tracking si disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_click', {
                'event_category': 'engagement',
                'event_label': 'footer_cta'
            });
        }
    }
    
    /**
     * Gestion des clics sur les réseaux sociaux
     */
    function handleSocialClick(e) {
        const network = e.currentTarget.getAttribute('aria-label');
        
        // Analytics tracking si disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_click', {
                'event_category': 'engagement',
                'event_label': network
            });
        }
    }
    
    /**
     * Ajoute les animations CSS nécessaires
     */
    function addAnimations() {
        if (document.getElementById('footer-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'footer-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Initialise le footer
     */
    async function initializeFooter() {
        try {
            // Ajoute les animations
            addAnimations();
            
            // Charge les styles et le HTML en parallèle
            const [, html] = await Promise.all([
                loadFooterStyles(),
                fetchFooterHTML()
            ]);
            
            // Insère le footer
            insertFooter(html);
            
            // Initialise les fonctionnalités
            initializeFooterFeatures();
            
            console.log('Footer chargé avec succès');
        } catch (error) {
            console.error('Erreur lors du chargement du footer:', error);
            
            // Footer de secours minimaliste
            const container = document.getElementById(FOOTER_CONFIG.containerId);
            if (container) {
                container.innerHTML = `
                    <footer class="footer-fallback" style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
                        <p>© 2025 Xtranumerik. Tous droits réservés.</p>
                        <p>
                            <a href="mailto:patrick@xtranumerik.ca" style="color: #64b5f6;">Contact</a> |
                            <a href="/pages/fr/mentions-legales.html" style="color: #64b5f6;">Mentions légales</a>
                        </p>
                    </footer>
                `;
            }
        }
    }
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFooter);
    } else {
        // DOM déjà chargé
        initializeFooter();
    }
    
    // Export pour utilisation externe si nécessaire
    window.FooterLoader = {
        reload: initializeFooter,
        showMessage: showMessage
    };
})();
