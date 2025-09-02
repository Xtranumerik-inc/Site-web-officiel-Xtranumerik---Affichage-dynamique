/**
 * XTRANUMERIK MOBILE FEEDBACK
 * Système de feedback tactile et visuel pour mobile
 * Date: 2 septembre 2025
 * 
 * ✅ Feedback haptique (vibrations)
 * ✅ Effets visuels tactiles (ripple)
 * ✅ Animations de réponse
 * ✅ Toast notifications mobiles
 */

(function() {
    'use strict';

    class XtranumerikMobileFeedback {
        constructor() {
            this.isInitialized = false;
            this.activeToasts = [];
            this.rippleElements = new Set();
            
            // Configuration
            this.config = {
                // Vibrations
                hapticFeedback: true,
                vibrationPatterns: {
                    light: [10],
                    medium: [15],
                    heavy: [25],
                    double: [10, 50, 10],
                    success: [10, 30, 10],
                    error: [50, 30, 50, 30, 50]
                },
                
                // Effets visuels
                rippleEffect: true,
                rippleColor: 'rgba(255, 169, 26, 0.3)',
                rippleDuration: 600,
                
                // Toast notifications
                toastDuration: 4000,
                toastPosition: 'bottom',
                maxToasts: 3
            };

            this.init();
        }

        init() {
            try {
                // Vérifier support tactile et vibration
                this.checkCapabilities();
                
                // Configurer les événements de base
                this.setupGlobalFeedback();
                
                // Configurer les effets ripple
                this.setupRippleEffects();
                
                // Configurer les toasts
                this.setupToastSystem();
                
                // Event listeners pour les interactions
                this.setupInteractionFeedback();

                this.isInitialized = true;
                console.log('✅ Mobile Feedback: System initialized');
                
                // Event global
                document.dispatchEvent(new CustomEvent('mobileFeedbackReady'));

            } catch (error) {
                console.error('❌ Mobile Feedback: Initialization error:', error);
            }
        }

        checkCapabilities() {
            // Support des vibrations
            this.hasVibration = 'vibrate' in navigator && /Mobi|Android/i.test(navigator.userAgent);
            
            // Support tactile
            this.hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            console.log(`📱 Mobile Feedback: Vibration=${this.hasVibration}, Touch=${this.hasTouch}`);
        }

        setupGlobalFeedback() {
            // Feedback automatique pour les éléments interactifs
            document.addEventListener('touchstart', (e) => {
                const element = e.target.closest('button, a, input, .btn, .mobile-btn');
                if (element && !element.classList.contains('no-feedback')) {
                    this.handleTouchFeedback(element, e);
                }
            }, { passive: true });

            // Feedback sur focus (pour navigation clavier)
            document.addEventListener('focusin', (e) => {
                const element = e.target;
                if (element.matches('button, a, input, .btn, .mobile-btn')) {
                    this.handleFocusFeedback(element);
                }
            });

            // Feedback pour changements d'état
            document.addEventListener('change', (e) => {
                if (e.target.matches('input, select, textarea')) {
                    this.vibrate('light');
                }
            });
        }

        handleTouchFeedback(element, event) {
            // Déterminer le type de feedback selon l'élément
            let feedbackType = 'light';
            
            if (element.classList.contains('cta-button') || element.classList.contains('mobile-nav-cta')) {
                feedbackType = 'medium';
            } else if (element.classList.contains('mobile-carousel-btn')) {
                feedbackType = 'light';
            } else if (element.matches('input[type="submit"], button[type="submit"]')) {
                feedbackType = 'success';
            }

            // Appliquer le feedback
            this.vibrate(feedbackType);
            
            // Effet ripple si activé
            if (this.config.rippleEffect) {
                this.createRipple(element, event);
            }

            // Animation de pression
            this.animatePress(element);
        }

        handleFocusFeedback(element) {
            // Feedback visuel pour la navigation clavier
            element.classList.add('keyboard-focused');
            
            setTimeout(() => {
                element.classList.remove('keyboard-focused');
            }, 200);
        }

        setupRippleEffects() {
            // Ajouter automatiquement les effets ripple
            const rippleSelectors = [
                'button',
                'a.btn',
                '.mobile-btn',
                '.cta-button',
                '.mobile-nav-link',
                '.mobile-carousel-dot'
            ];

            rippleSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (!element.classList.contains('no-ripple')) {
                        this.addRippleToElement(element);
                    }
                });
            });

            // Observer pour les nouveaux éléments
            this.observeNewElements();
        }

        addRippleToElement(element) {
            if (this.rippleElements.has(element)) return;

            element.classList.add('mobile-ripple');
            this.rippleElements.add(element);

            // Styles de base si pas déjà définis
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative';
            }
            element.style.overflow = 'hidden';
        }

        createRipple(element, event) {
            if (!this.config.rippleEffect || !element.classList.contains('mobile-ripple')) return;

            // Position relative au bouton
            const rect = element.getBoundingClientRect();
            const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
            const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

            // Créer l'élément ripple
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            // Calculer la taille
            const size = Math.max(element.offsetWidth, element.offsetHeight);
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: ${this.config.rippleColor};
                width: ${size}px;
                height: ${size}px;
                left: ${x - size / 2}px;
                top: ${y - size / 2}px;
                transform: scale(0);
                pointer-events: none;
                z-index: 1;
                animation: rippleAnimation ${this.config.rippleDuration}ms ease-out;
            `;

            // Ajouter au DOM
            element.appendChild(ripple);

            // Nettoyer après l'animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, this.config.rippleDuration);
        }

        animatePress(element) {
            element.classList.add('mobile-pressed');
            
            setTimeout(() => {
                element.classList.remove('mobile-pressed');
            }, 150);
        }

        setupToastSystem() {
            // Créer le conteneur de toasts s'il n'existe pas
            if (!document.getElementById('mobile-toast-container')) {
                const container = document.createElement('div');
                container.id = 'mobile-toast-container';
                container.className = 'mobile-toast-container';
                container.style.cssText = `
                    position: fixed;
                    ${this.config.toastPosition}: 20px;
                    left: 20px;
                    right: 20px;
                    z-index: 1002;
                    pointer-events: none;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                `;
                document.body.appendChild(container);
            }

            // Ajouter les styles CSS pour les animations
            this.injectToastStyles();
        }

        injectToastStyles() {
            if (document.getElementById('mobile-feedback-styles')) return;

            const styles = document.createElement('style');
            styles.id = 'mobile-feedback-styles';
            styles.textContent = `
                @keyframes rippleAnimation {
                    from {
                        transform: scale(0);
                        opacity: 1;
                    }
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                
                .mobile-pressed {
                    transform: scale(0.96) !important;
                    transition: transform 0.1s ease !important;
                }
                
                .keyboard-focused {
                    box-shadow: 0 0 0 3px rgba(255, 169, 26, 0.5) !important;
                    outline: none !important;
                }
                
                .mobile-toast-container {
                    pointer-events: none;
                }
                
                .mobile-toast {
                    pointer-events: auto;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .mobile-toast.active {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                .mobile-toast.removing {
                    transform: translateX(100%);
                    opacity: 0;
                }
            `;
            
            document.head.appendChild(styles);
        }

        observeNewElements() {
            // Observer pour détecter les nouveaux éléments à rippler
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const rippleElements = node.querySelectorAll('button, a.btn, .mobile-btn, .cta-button');
                            rippleElements.forEach(element => {
                                if (!element.classList.contains('no-ripple')) {
                                    this.addRippleToElement(element);
                                }
                            });
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        // API publique pour les vibrations
        vibrate(pattern = 'light') {
            if (!this.hasVibration || !this.config.hapticFeedback) return false;

            let vibrationPattern;
            
            if (typeof pattern === 'string') {
                vibrationPattern = this.config.vibrationPatterns[pattern] || this.config.vibrationPatterns.light;
            } else if (Array.isArray(pattern)) {
                vibrationPattern = pattern;
            } else {
                vibrationPattern = [pattern];
            }

            try {
                navigator.vibrate(vibrationPattern);
                return true;
            } catch (error) {
                console.warn('⚠️ Mobile Feedback: Vibration failed:', error);
                return false;
            }
        }

        // API publique pour les toasts
        showToast(message, options = {}) {
            const config = {
                type: 'info', // info, success, warning, error
                duration: this.config.toastDuration,
                actions: [],
                ...options
            };

            // Limiter le nombre de toasts
            if (this.activeToasts.length >= this.config.maxToasts) {
                this.dismissToast(this.activeToasts[0]);
            }

            // Créer le toast
            const toast = this.createToast(message, config);
            
            // Ajouter au conteneur
            const container = document.getElementById('mobile-toast-container');
            container.appendChild(toast);
            
            // Activer l'animation
            setTimeout(() => toast.classList.add('active'), 50);
            
            // Auto-dismiss
            if (config.duration > 0) {
                setTimeout(() => {
                    this.dismissToast(toast);
                }, config.duration);
            }

            // Feedback haptique selon le type
            switch (config.type) {
                case 'success':
                    this.vibrate('success');
                    break;
                case 'error':
                    this.vibrate('error');
                    break;
                case 'warning':
                    this.vibrate('double');
                    break;
                default:
                    this.vibrate('light');
            }

            this.activeToasts.push(toast);
            console.log(`📱 Mobile Feedback: Toast shown (${config.type}): ${message}`);
            
            return toast;
        }

        createToast(message, config) {
            const toast = document.createElement('div');
            toast.className = `mobile-toast mobile-toast-${config.type}`;
            
            // Styles selon le type
            const typeStyles = {
                info: 'background: linear-gradient(135deg, #3b82f6, #1e40af);',
                success: 'background: linear-gradient(135deg, #10b981, #059669);',
                warning: 'background: linear-gradient(135deg, #f59e0b, #d97706);',
                error: 'background: linear-gradient(135deg, #ef4444, #dc2626);'
            };
            
            toast.style.cssText = `
                ${typeStyles[config.type] || typeStyles.info}
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                min-height: 48px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                backdrop-filter: blur(20px);
            `;

            // Contenu du message
            const messageEl = document.createElement('span');
            messageEl.textContent = message;
            toast.appendChild(messageEl);

            // Bouton de fermeture
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: inherit;
                font-size: 18px;
                padding: 4px;
                margin-left: 1rem;
                cursor: pointer;
                border-radius: 4px;
                transition: background 0.2s ease;
                min-width: 32px;
                min-height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            closeBtn.onmouseout = () => closeBtn.style.background = 'none';
            closeBtn.onclick = () => this.dismissToast(toast);
            
            toast.appendChild(closeBtn);

            // Actions personnalisées
            if (config.actions && config.actions.length > 0) {
                config.actions.forEach(action => {
                    const actionBtn = document.createElement('button');
                    actionBtn.textContent = action.text;
                    actionBtn.style.cssText = `
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: inherit;
                        padding: 0.5rem 1rem;
                        margin-left: 0.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: background 0.2s ease;
                    `;
                    
                    actionBtn.onclick = () => {
                        action.handler(toast);
                        this.dismissToast(toast);
                    };
                    
                    toast.appendChild(actionBtn);
                });
            }

            return toast;
        }

        dismissToast(toast) {
            if (!toast || !toast.parentNode) return;

            toast.classList.add('removing');
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                
                // Retirer de la liste active
                const index = this.activeToasts.indexOf(toast);
                if (index > -1) {
                    this.activeToasts.splice(index, 1);
                }
            }, 400);
        }

        // Méthodes de convenance pour les toasts
        showSuccess(message, options = {}) {
            return this.showToast(message, { ...options, type: 'success' });
        }

        showError(message, options = {}) {
            return this.showToast(message, { ...options, type: 'error' });
        }

        showWarning(message, options = {}) {
            return this.showToast(message, { ...options, type: 'warning' });
        }

        showInfo(message, options = {}) {
            return this.showToast(message, { ...options, type: 'info' });
        }

        // Configuration
        setConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
        }

        // Getters
        isVibrationSupported() {
            return this.hasVibration;
        }

        isTouchSupported() {
            return this.hasTouch;
        }

        getActiveToastsCount() {
            return this.activeToasts.length;
        }

        // Cleanup
        destroy() {
            // Nettoyer tous les toasts
            this.activeToasts.forEach(toast => this.dismissToast(toast));
            
            // Supprimer les styles injectés
            const styles = document.getElementById('mobile-feedback-styles');
            if (styles) styles.remove();
            
            // Supprimer le conteneur de toasts
            const container = document.getElementById('mobile-toast-container');
            if (container) container.remove();
            
            this.isInitialized = false;
            console.log('🗑️ Mobile Feedback: System destroyed');
        }
    }

    // Auto-initialisation
    let mobileFeedback;

    // Attendre que le mobile optimizer soit prêt
    document.addEventListener('mobileOptimizerReady', () => {
        mobileFeedback = new XtranumerikMobileFeedback();
    });

    // Fallback
    setTimeout(() => {
        if (!mobileFeedback) {
            mobileFeedback = new XtranumerikMobileFeedback();
        }
    }, 1000);

    // API globale
    window.XtranumerikMobileFeedback = {
        vibrate: (pattern) => mobileFeedback?.vibrate(pattern),
        showToast: (message, options) => mobileFeedback?.showToast(message, options),
        showSuccess: (message, options) => mobileFeedback?.showSuccess(message, options),
        showError: (message, options) => mobileFeedback?.showError(message, options),
        showWarning: (message, options) => mobileFeedback?.showWarning(message, options),
        showInfo: (message, options) => mobileFeedback?.showInfo(message, options),
        getInstance: () => mobileFeedback
    };

    console.log('🚀 Xtranumerik Mobile Feedback: Script loaded');

})();