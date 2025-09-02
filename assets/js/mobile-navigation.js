/**
 * XTRANUMERIK MOBILE NAVIGATION
 * Navigation mobile premium avec slide-out et accordéon
 * Date: 2 septembre 2025
 * 
 * ✅ Navigation slide-out fluide
 * ✅ Menu accordéon animé
 * ✅ Gestes tactiles (swipe)
 * ✅ Gestion des événements clavier
 */

(function() {
    'use strict';

    class XtranumerikMobileNavigation {
        constructor() {
            this.isInitialized = false;
            this.isOpen = false;
            this.overlay = null;
            this.menu = null;
            this.toggle = null;
            this.closeBtn = null;
            this.dropdowns = [];
            
            // Configuration
            this.config = {
                menuWidth: 320,
                animationDuration: 400,
                swipeThreshold: 50,
                backdropBlur: true,
                enableSwipeGestures: true,
                enableKeyboardNav: true,
                autoClose: true, // Fermer automatiquement après clic sur lien
                breakpoint: 768 // Point de rupture desktop
            };

            // Touch handling
            this.touch = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                isDragging: false,
                startTime: 0
            };

            this.init();
        }

        init() {
            try {
                // Attendre que le DOM soit prêt et que le header soit injecté
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        setTimeout(() => this.setupNavigation(), 100);
                    });
                } else {
                    setTimeout(() => this.setupNavigation(), 100);
                }

                console.log('🚀 Mobile Navigation: Initialization started');
            } catch (error) {
                console.error('❌ Mobile Navigation: Initialization error:', error);
            }
        }

        setupNavigation() {
            try {
                // Vérifier si nous sommes sur mobile
                if (!this.isMobileDevice()) {
                    console.log('📱 Mobile Navigation: Desktop detected, skipping mobile nav');
                    return;
                }

                // Créer la structure de navigation mobile
                this.createMobileNavStructure();
                
                // Configurer les event listeners
                this.setupEventListeners();
                
                // Configurer les gestes tactiles
                if (this.config.enableSwipeGestures) {
                    this.setupSwipeGestures();
                }
                
                // Configurer la navigation clavier
                if (this.config.enableKeyboardNav) {
                    this.setupKeyboardNavigation();
                }

                this.isInitialized = true;
                console.log('✅ Mobile Navigation: Setup completed');
                
                // Dispatch event pour notifier les autres composants
                document.dispatchEvent(new CustomEvent('mobileNavigationReady'));

            } catch (error) {
                console.error('❌ Mobile Navigation: Setup error:', error);
            }
        }

        isMobileDevice() {
            return window.innerWidth < this.config.breakpoint || 
                   /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        createMobileNavStructure() {
            // Rechercher le bouton toggle existant du header
            this.toggle = document.getElementById('mobile-menu-toggle');
            
            if (!this.toggle) {
                console.warn('⚠️ Mobile Navigation: Toggle button not found');
                return;
            }

            // Créer l'overlay
            this.createOverlay();
            
            // Créer le menu mobile
            this.createMobileMenu();
            
            // Transformer la navigation existante
            this.transformExistingNavigation();
            
            console.log('🏗️ Mobile Navigation: Structure created');
        }

        createOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'mobile-nav-overlay';
            this.overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(this.overlay);
        }

        createMobileMenu() {
            this.menu = document.createElement('div');
            this.menu.className = 'mobile-nav-menu';
            this.menu.setAttribute('aria-label', 'Menu de navigation mobile');
            this.menu.setAttribute('role', 'navigation');
            
            // Header du menu
            const header = this.createMenuHeader();
            this.menu.appendChild(header);
            
            // Container pour les items de navigation
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'mobile-nav-items';
            itemsContainer.setAttribute('role', 'menu');
            this.menu.appendChild(itemsContainer);
            
            // Footer du menu
            const footer = this.createMenuFooter();
            this.menu.appendChild(footer);
            
            document.body.appendChild(this.menu);
        }

        createMenuHeader() {
            const header = document.createElement('div');
            header.className = 'mobile-nav-header';
            
            // Logo
            const logo = document.createElement('img');
            logo.src = '/data/images/LOGO%20Xtranumerik%20fond%20mauve%20(1920%20x%201080%20px).png';
            logo.alt = 'Logo Xtranumerik';
            logo.className = 'mobile-nav-logo';
            
            // Bouton de fermeture
            this.closeBtn = document.createElement('button');
            this.closeBtn.className = 'mobile-nav-close';
            this.closeBtn.innerHTML = '✕';
            this.closeBtn.setAttribute('aria-label', 'Fermer le menu');
            this.closeBtn.setAttribute('title', 'Fermer le menu');
            
            header.appendChild(logo);
            header.appendChild(this.closeBtn);
            
            return header;
        }

        createMenuFooter() {
            const footer = document.createElement('div');
            footer.className = 'mobile-nav-footer';
            
            // Bouton CTA
            const ctaButton = document.createElement('a');
            ctaButton.href = '/pages/fr/contact.html';
            ctaButton.className = 'mobile-nav-cta';
            ctaButton.textContent = 'Contactez-nous';
            ctaButton.setAttribute('role', 'button');
            
            // Switch de langue
            const langSwitch = document.createElement('a');
            langSwitch.href = '#';
            langSwitch.className = 'mobile-lang-switch';
            langSwitch.textContent = this.detectLanguage() === 'fr' ? 'EN' : 'FR';
            langSwitch.setAttribute('role', 'button');
            langSwitch.setAttribute('aria-label', 'Changer de langue');
            
            footer.appendChild(ctaButton);
            footer.appendChild(langSwitch);
            
            return footer;
        }

        transformExistingNavigation() {
            // Récupérer le menu existant du header
            const existingMenu = document.getElementById('nav-menu');
            if (!existingMenu) return;

            const mobileItemsContainer = this.menu.querySelector('.mobile-nav-items');
            const existingItems = existingMenu.querySelectorAll('.nav-item');

            existingItems.forEach((item, index) => {
                const mobileItem = this.createMobileNavItem(item, index);
                mobileItemsContainer.appendChild(mobileItem);
            });
        }

        createMobileNavItem(originalItem, index) {
            const mobileItem = document.createElement('div');
            mobileItem.className = 'mobile-nav-item';
            
            const originalLink = originalItem.querySelector('.nav-link');
            const dropdown = originalItem.querySelector('.dropdown-menu');
            
            if (dropdown) {
                // Item avec sous-menu
                mobileItem.classList.add('mobile-dropdown');
                
                const link = document.createElement('a');
                link.href = 'javascript:void(0)';
                link.className = 'mobile-nav-link';
                link.setAttribute('role', 'menuitem');
                link.setAttribute('aria-expanded', 'false');
                link.setAttribute('aria-controls', `mobile-dropdown-${index}`);
                
                const text = originalLink.textContent.replace('▼', '').trim();
                link.innerHTML = `${text} <span class="mobile-dropdown-arrow">▼</span>`;
                
                const dropdownContent = document.createElement('div');
                dropdownContent.className = 'mobile-dropdown-content';
                dropdownContent.id = `mobile-dropdown-${index}`;
                dropdownContent.setAttribute('role', 'menu');
                dropdownContent.setAttribute('aria-labelledby', link.id);
                
                // Ajouter les sous-items
                const subItems = dropdown.querySelectorAll('.dropdown-link');
                subItems.forEach(subItem => {
                    const mobileSubLink = document.createElement('a');
                    mobileSubLink.href = subItem.href;
                    mobileSubLink.className = 'mobile-dropdown-link';
                    mobileSubLink.textContent = subItem.textContent;
                    mobileSubLink.setAttribute('role', 'menuitem');
                    dropdownContent.appendChild(mobileSubLink);
                });
                
                mobileItem.appendChild(link);
                mobileItem.appendChild(dropdownContent);
                
                // Stocker la référence pour la gestion des événements
                this.dropdowns.push({
                    trigger: link,
                    content: dropdownContent,
                    item: mobileItem
                });
                
            } else {
                // Item simple
                const link = document.createElement('a');
                link.href = originalLink.href;
                link.className = 'mobile-nav-link';
                link.textContent = originalLink.textContent;
                link.setAttribute('role', 'menuitem');
                
                mobileItem.appendChild(link);
            }
            
            return mobileItem;
        }

        setupEventListeners() {
            // Toggle button
            if (this.toggle) {
                this.toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMenu();
                });
            }

            // Close button
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeMenu();
                });
            }

            // Overlay click
            if (this.overlay) {
                this.overlay.addEventListener('click', () => {
                    this.closeMenu();
                });
            }

            // Dropdown toggles
            this.dropdowns.forEach(dropdown => {
                dropdown.trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleDropdown(dropdown);
                });
            });

            // Auto-close sur clic de lien
            if (this.config.autoClose) {
                const navLinks = this.menu.querySelectorAll('.mobile-nav-link:not([href="javascript:void(0)"]), .mobile-dropdown-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        setTimeout(() => this.closeMenu(), 150);
                    });
                });
            }

            // Gestion du redimensionnement
            window.addEventListener('resize', this.debounce(() => {
                if (window.innerWidth >= this.config.breakpoint && this.isOpen) {
                    this.closeMenu();
                }
            }, 250));

            console.log('👂 Mobile Navigation: Event listeners setup completed');
        }

        setupSwipeGestures() {
            // Gestes sur l'overlay (fermeture par swipe)
            this.overlay.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.overlay.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
            this.overlay.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });

            // Gestes sur le menu (fermeture par swipe vers la droite)
            this.menu.addEventListener('touchstart', this.handleMenuTouchStart.bind(this), { passive: true });
            this.menu.addEventListener('touchmove', this.handleMenuTouchMove.bind(this), { passive: false });
            this.menu.addEventListener('touchend', this.handleMenuTouchEnd.bind(this), { passive: true });

            console.log('👆 Mobile Navigation: Swipe gestures setup completed');
        }

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;

                switch (e.key) {
                    case 'Escape':
                        e.preventDefault();
                        this.closeMenu();
                        break;
                    case 'Tab':
                        this.handleTabNavigation(e);
                        break;
                }
            });

            console.log('⌨️ Mobile Navigation: Keyboard navigation setup completed');
        }

        // Gestion des événements tactiles
        handleTouchStart(e) {
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;
            this.touch.startTime = Date.now();
        }

        handleTouchMove(e) {
            this.touch.currentX = e.touches[0].clientX;
            this.touch.currentY = e.touches[0].clientY;
        }

        handleTouchEnd(e) {
            const deltaX = this.touch.currentX - this.touch.startX;
            const deltaY = Math.abs(this.touch.currentY - this.touch.startY);
            const deltaTime = Date.now() - this.touch.startTime;

            // Swipe vers la droite pour fermer
            if (deltaX > this.config.swipeThreshold && 
                deltaY < this.config.swipeThreshold && 
                deltaTime < 300) {
                this.closeMenu();
            }
        }

        handleMenuTouchStart(e) {
            this.touch.startX = e.touches[0].clientX;
            this.touch.isDragging = false;
        }

        handleMenuTouchMove(e) {
            if (!this.touch.isDragging) {
                this.touch.currentX = e.touches[0].clientX;
                const deltaX = this.touch.currentX - this.touch.startX;
                
                if (deltaX > 20) {
                    this.touch.isDragging = true;
                    this.menu.style.transition = 'none';
                }
            }

            if (this.touch.isDragging) {
                const deltaX = Math.max(0, this.touch.currentX - this.touch.startX);
                this.menu.style.transform = `translateX(${deltaX}px)`;
                
                // Ajuster l'opacité de l'overlay
                const opacity = Math.max(0, 1 - (deltaX / this.config.menuWidth));
                this.overlay.style.opacity = opacity;
                
                e.preventDefault();
            }
        }

        handleMenuTouchEnd(e) {
            if (this.touch.isDragging) {
                const deltaX = this.touch.currentX - this.touch.startX;
                
                this.menu.style.transition = '';
                this.menu.style.transform = '';
                this.overlay.style.opacity = '';
                
                if (deltaX > this.config.swipeThreshold) {
                    this.closeMenu();
                }
                
                this.touch.isDragging = false;
            }
        }

        handleTabNavigation(e) {
            const focusableElements = this.menu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        // Méthodes principales
        toggleMenu() {
            if (this.isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        }

        openMenu() {
            if (!this.isInitialized || this.isOpen) return;

            this.isOpen = true;
            
            // Ajouter les classes actives
            this.overlay.classList.add('active');
            this.menu.classList.add('active');
            this.toggle.classList.add('active');
            
            // Prévenir le scroll du body
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
            
            // Focus sur le premier élément
            setTimeout(() => {
                const firstFocusable = this.menu.querySelector('a, button');
                if (firstFocusable) firstFocusable.focus();
            }, this.config.animationDuration);

            // Vibration tactile si supportée
            this.triggerHapticFeedback();

            console.log('📱 Mobile Navigation: Menu opened');
            
            // Dispatch event
            document.dispatchEvent(new CustomEvent('mobileMenuOpen'));
        }

        closeMenu() {
            if (!this.isOpen) return;

            this.isOpen = false;
            
            // Fermer tous les dropdowns
            this.closeAllDropdowns();
            
            // Retirer les classes actives
            this.overlay.classList.remove('active');
            this.menu.classList.remove('active');
            this.toggle.classList.remove('active');
            
            // Restaurer le scroll du body
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Remettre le focus sur le toggle
            this.toggle.focus();

            console.log('📱 Mobile Navigation: Menu closed');
            
            // Dispatch event
            document.dispatchEvent(new CustomEvent('mobileMenuClose'));
        }

        toggleDropdown(dropdown) {
            const isActive = dropdown.item.classList.contains('active');
            
            // Fermer tous les autres dropdowns
            this.closeAllDropdowns();
            
            if (!isActive) {
                dropdown.item.classList.add('active');
                dropdown.trigger.setAttribute('aria-expanded', 'true');
                dropdown.content.style.maxHeight = dropdown.content.scrollHeight + 'px';
                
                this.triggerHapticFeedback([10]);
                
                console.log('📱 Mobile Navigation: Dropdown opened');
            }
        }

        closeAllDropdowns() {
            this.dropdowns.forEach(dropdown => {
                dropdown.item.classList.remove('active');
                dropdown.trigger.setAttribute('aria-expanded', 'false');
                dropdown.content.style.maxHeight = '0';
            });
        }

        // Utilitaires
        detectLanguage() {
            const htmlLang = document.documentElement.lang;
            if (htmlLang) {
                return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
            }
            
            const path = window.location.pathname;
            if (path.includes('/en/')) return 'en';
            return 'fr';
        }

        getScrollbarWidth() {
            const scrollDiv = document.createElement('div');
            scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
            document.body.appendChild(scrollDiv);
            const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return scrollbarWidth;
        }

        triggerHapticFeedback(pattern = [10]) {
            if ('vibrate' in navigator) {
                navigator.vibrate(pattern);
            }
        }

        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // API publique
        isMenuOpen() {
            return this.isOpen;
        }

        destroy() {
            // Cleanup event listeners et DOM
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            
            if (this.menu && this.menu.parentNode) {
                this.menu.parentNode.removeChild(this.menu);
            }
            
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            this.isInitialized = false;
            console.log('🗑️ Mobile Navigation: Destroyed');
        }
    }

    // Auto-initialisation
    let mobileNav;
    
    // Attendre que le mobile optimizer soit prêt
    document.addEventListener('mobileOptimizerReady', () => {
        mobileNav = new XtranumerikMobileNavigation();
    });
    
    // Fallback si l'optimizer n'est pas chargé
    setTimeout(() => {
        if (!mobileNav) {
            mobileNav = new XtranumerikMobileNavigation();
        }
    }, 2000);

    // Export global
    window.XtranumerikMobileNavigation = XtranumerikMobileNavigation;

    console.log('🚀 Xtranumerik Mobile Navigation: Script loaded');

})();