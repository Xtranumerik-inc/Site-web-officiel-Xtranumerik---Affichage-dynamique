/**
 * Footer Loader - VERSION CLOUDFLARE ROCKET LOADER COMPATIBLE
 * DATE: 27 septembre 2025
 * 
 * 🚀 CORRECTION CLOUDFLARE ROCKET LOADER :
 * ✅ Compatible avec Rocket Loader defer/async
 * ✅ Détection automatique Cloudflare modifications
 * ✅ Force l'exécution même avec type modifié
 * ✅ Fallback robuste si scripts bloqués
 * ✅ Event listeners Rocket Loader compatibles
 */

(function() {
    'use strict';
    
    // Détection Cloudflare Rocket Loader
    const isRocketLoaderActive = () => {
        return !!(window.CloudFlare || 
                 document.querySelector('script[data-cf-settings]') ||
                 document.querySelector('script[src*="rocket-loader"]') ||
                 document.currentScript?.type?.includes('-text/javascript'));
    };
    
    // Configuration robuste
    const FOOTER_CONFIG = {
        htmlPath: '/components/footer.html',
        cssPath: '/components/footer.css',
        containerId: 'footer-container',
        retryAttempts: 5,
        retryDelay: 1000,
        timeout: 8000,
        rocketLoaderDelay: 2000 // Délai spécial pour Rocket Loader
    };
    
    // Variables de debug
    let debugMode = true;
    let loadAttempts = 0;
    let isRocketLoader = false;
    
    function log(message, type = 'info') {
        if (debugMode) {
            const timestamp = new Date().toLocaleTimeString();
            const prefix = `[${timestamp}] Footer${isRocketLoader ? ' [RL]' : ''}:`;
            
            switch(type) {
                case 'error':
                    console.error(prefix, message);
                    break;
                case 'warn':
                    console.warn(prefix, message);
                    break;
                case 'success':
                    console.log(`%c${prefix} ${message}`, 'color: #4CAF50; font-weight: bold');
                    break;
                default:
                    console.log(prefix, message);
            }
        }
    }
    
    /**
     * Détection robuste de la langue avec multiples fallbacks
     */
    function detectLanguage() {
        // 1. Vérifier l'attribut lang du document
        const htmlLang = document.documentElement.lang;
        if (htmlLang && htmlLang.toLowerCase().startsWith('en')) {
            log('Langue détectée via HTML lang: EN');
            return 'en';
        }
        
        // 2. Vérifier l'URL
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/en/')) {
            log('Langue détectée via URL: EN');
            return 'en';
        }
        
        // 3. Vérifier le title ou meta description
        const title = document.title.toLowerCase();
        if (title.includes('english') || title.includes(' en ') || title.includes('solutions')) {
            log('Langue détectée via title: EN');
            return 'en';
        }
        
        // 4. Vérifier le contenu de la page
        const bodyText = document.body?.textContent?.toLowerCase() || '';
        const englishWords = ['contact us', 'solutions', 'home', 'advertising map'];
        const frenchWords = ['contactez-nous', 'accueil', 'carte publicitaire'];
        
        const englishCount = englishWords.filter(word => bodyText.includes(word)).length;
        const frenchCount = frenchWords.filter(word => bodyText.includes(word)).length;
        
        if (englishCount > frenchCount) {
            log('Langue détectée via contenu: EN');
            return 'en';
        }
        
        // 5. Fallback par défaut
        log('Langue par défaut: FR');
        return 'fr';
    }
    
    /**
     * Charge le HTML du footer avec timeout et retry compatible Cloudflare
     */
    async function loadFooterHTML() {
        return new Promise(async (resolve, reject) => {
            loadAttempts++;
            log(`Tentative ${loadAttempts}/${FOOTER_CONFIG.retryAttempts}${isRocketLoader ? ' (Rocket Loader actif)' : ''}...`);
            
            try {
                // Cache-buster spécial pour Cloudflare
                const cacheBuster = Date.now() + Math.random().toString(36).substr(2, 9);
                const url = `${FOOTER_CONFIG.htmlPath}?v=${cacheBuster}&cf=${isRocketLoader ? '1' : '0'}`;
                
                // Timeout adapté selon Rocket Loader
                const timeoutDelay = isRocketLoader ? FOOTER_CONFIG.timeout * 1.5 : FOOTER_CONFIG.timeout;
                
                const timeoutId = setTimeout(() => {
                    reject(new Error(`Timeout après ${timeoutDelay}ms`));
                }, timeoutDelay);
                
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    cache: 'no-store'
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const html = await response.text();
                
                if (!html || html.trim().length === 0) {
                    throw new Error('HTML vide reçu');
                }
                
                log('HTML chargé avec succès', 'success');
                resolve(html);
                
            } catch (error) {
                log(`Erreur: ${error.message}`, 'error');
                
                if (loadAttempts < FOOTER_CONFIG.retryAttempts) {
                    const retryDelay = isRocketLoader ? FOOTER_CONFIG.retryDelay * 1.5 : FOOTER_CONFIG.retryDelay;
                    log(`Retry dans ${retryDelay}ms...`, 'warn');
                    setTimeout(() => {
                        loadFooterHTML().then(resolve).catch(reject);
                    }, retryDelay);
                } else {
                    reject(error);
                }
            }
        });
    }
    
    /**
     * Insère et configure le footer
     */
    function insertFooter(html) {
        const container = document.getElementById(FOOTER_CONFIG.containerId);
        if (!container) {
            log('ERREUR: Container footer non trouvé!', 'error');
            return false;
        }
        
        // Insérer le HTML
        container.innerHTML = html;
        log('Footer inséré dans le DOM');
        
        // Supprimer les liens externes s'ils existent
        removeExternalLinks(container);
        
        // Configurer la langue
        const currentLang = detectLanguage();
        if (currentLang === 'en') {
            updateFooterForEnglish(container);
        } else {
            updateFooterForFrench(container);
        }
        
        // Mettre à jour l'année
        updateCurrentYear(container);
        
        // Ajouter les event listeners compatible Rocket Loader
        addFooterEventListeners(container);
        
        log(`Footer configuré avec succès (${currentLang.toUpperCase()})`, 'success');
        return true;
    }
    
    /**
     * Supprime les liens externes (réseaux sociaux)
     */
    function removeExternalLinks(container) {
        const externalDomains = ['x.com', 'twitter.com', 'facebook.com', 'linkedin.com', 'instagram.com'];
        const links = container.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && externalDomains.some(domain => href.includes(domain))) {
                const parentSection = link.closest('.footer-social, .social-links');
                if (parentSection) {
                    parentSection.remove();
                    log('Section réseaux sociaux supprimée');
                } else {
                    link.remove();
                    log(`Lien externe supprimé: ${href}`);
                }
            }
        });
    }
    
    /**
     * Met à jour le footer pour la version française
     */
    function updateFooterForFrench(container) {
        const translations = {
            'Dynamic Display Management': 'Gestion d\'Affichage Dynamique',
            'Advertising Map': 'Carte Publicitaire',
            'Contact Us': 'Contactez-nous',
            'All rights reserved': 'Tous droits réservés'
        };
        
        const urlMappings = {
            '/pages/en/index.html': '/pages/fr/index.html',
            '/pages/en/advertising map.html': '/pages/fr/carte%20publicitaire.html',
            '/pages/en/contact.html': '/pages/fr/contact.html'
        };
        
        updateFooterContent(container, translations, urlMappings);
        log('Version française appliquée');
    }
    
    /**
     * Met à jour le footer pour la version anglaise
     */
    function updateFooterForEnglish(container) {
        const translations = {
            'Gestion d\'Affichage Dynamique': 'Dynamic Display Management',
            'Carte Publicitaire': 'Advertising Map',
            'Contactez-nous': 'Contact Us',
            'Tous droits réservés': 'All rights reserved'
        };
        
        const urlMappings = {
            '/pages/fr/index.html': '/pages/en/index.html',
            '/pages/fr/carte%20publicitaire.html': '/pages/en/advertising%20map.html',
            '/pages/fr/contact.html': '/pages/en/contact.html'
        };
        
        updateFooterContent(container, translations, urlMappings);
        log('Version anglaise appliquée');
    }
    
    /**
     * Met à jour le contenu du footer (textes et liens)
     */
    function updateFooterContent(container, translations, urlMappings) {
        // Mettre à jour les textes
        Object.entries(translations).forEach(([original, translated]) => {
            const elements = container.querySelectorAll('*');
            elements.forEach(element => {
                if (element.textContent && element.textContent.trim() === original) {
                    element.textContent = translated;
                }
            });
        });
        
        // Mettre à jour les URLs
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const currentHref = link.getAttribute('href');
            if (urlMappings[currentHref]) {
                link.setAttribute('href', urlMappings[currentHref]);
                log(`URL mise à jour: ${currentHref} → ${urlMappings[currentHref]}`);
            }
        });
    }
    
    /**
     * Met à jour l'année courante
     */
    function updateCurrentYear(container) {
        const yearElement = container.querySelector('#current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
            log('Année mise à jour');
        }
    }
    
    /**
     * Ajoute les event listeners au footer - Compatible Rocket Loader
     */
    function addFooterEventListeners(container) {
        const links = container.querySelectorAll('a[href]');
        
        // Fonction d'ajout d'événement compatible Rocket Loader
        const addCompatibleEventListener = (element, event, handler) => {
            if (isRocketLoader) {
                // Pour Rocket Loader, utiliser setTimeout pour assurer l'exécution
                setTimeout(() => {
                    element.addEventListener(event, handler, { passive: true });
                }, 100);
            } else {
                element.addEventListener(event, handler, { passive: true });
            }
        };
        
        links.forEach(link => {
            addCompatibleEventListener(link, 'click', function(event) {
                const href = this.getAttribute('href');
                
                // Vérifier si c'est un lien interne valide
                if (href && href.startsWith('/')) {
                    log(`Navigation vers: ${href}`);
                } else if (href && href.startsWith('mailto:')) {
                    log(`Email: ${href}`);
                } else if (href === 'javascript:void(0)' || href === '#') {
                    event.preventDefault();
                    log('Lien désactivé cliqué');
                }
            });
        });
    }
    
    /**
     * Crée un footer de secours en cas d'échec - Optimisé Cloudflare
     */
    function createFallbackFooter() {
        const container = document.getElementById(FOOTER_CONFIG.containerId);
        if (!container) {
            log('Impossible de créer le footer de secours: container non trouvé', 'error');
            return;
        }
        
        const currentLang = detectLanguage();
        const isEnglish = currentLang === 'en';
        
        const homeText = isEnglish ? 'Home' : 'Accueil';
        const mapText = isEnglish ? 'Advertising Map' : 'Carte Publicitaire';
        const contactText = isEnglish ? 'Contact' : 'Contact';
        const rightsText = isEnglish ? 'All rights reserved' : 'Tous droits réservés';
        
        const homeLink = isEnglish ? '/pages/en/index.html' : '/pages/fr/index.html';
        const mapLink = isEnglish ? '/pages/en/advertising%20map.html' : '/pages/fr/carte%20publicitaire.html';
        const contactLink = isEnglish ? '/pages/en/contact.html' : '/pages/fr/contact.html';
        
        container.innerHTML = `
            <footer style="background: linear-gradient(135deg, #190544 0%, #1a1a2e 100%); color: white; padding: 2rem 1rem; text-align: center; margin-top: 2rem; border-top: 1px solid rgba(255, 169, 26, 0.2);">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-bottom: 1.5rem;">
                        <a href="${homeLink}" style="color: #64b5f6; text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; background: rgba(255, 169, 26, 0.1); border: 1px solid rgba(255, 169, 26, 0.3);">${homeText}</a>
                        <a href="${mapLink}" style="color: #64b5f6; text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; background: rgba(255, 169, 26, 0.1); border: 1px solid rgba(255, 169, 26, 0.3);">${mapText}</a>
                        <a href="${contactLink}" style="color: #64b5f6; text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; background: rgba(255, 169, 26, 0.1); border: 1px solid rgba(255, 169, 26, 0.3);">${contactText}</a>
                    </div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                        <p>© ${new Date().getFullYear()} <a href="${homeLink}" style="color: #ffa91a; text-decoration: none; font-weight: bold;">Xtranumerik.ca</a> | ${rightsText}</p>
                        ${isRocketLoader ? '<p style="font-size: 0.8rem; color: #999; margin-top: 0.5rem;">[Cloudflare Optimized]</p>' : ''}
                    </div>
                </div>
            </footer>
        `;
        
        // Ajouter des effets hover compatible Cloudflare
        const style = document.createElement('style');
        style.textContent = `
            #footer-container a:hover {
                background-color: rgba(255, 169, 26, 0.2) !important;
                color: #ffa91a !important;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
        
        log(`Footer de secours créé (${currentLang.toUpperCase()})${isRocketLoader ? ' [Cloudflare Optimized]' : ''}`, 'success');
    }
    
    /**
     * Fonction principale d'initialisation - Compatible Rocket Loader
     */
    async function initializeFooter() {
        isRocketLoader = isRocketLoaderActive();
        
        log('=== INITIALISATION FOOTER CLOUDFLARE COMPATIBLE ===');
        log(`Rocket Loader détecté: ${isRocketLoader ? 'OUI' : 'NON'}`);
        
        // Délai spécial pour Rocket Loader
        if (isRocketLoader) {
            log(`Attente Rocket Loader (${FOOTER_CONFIG.rocketLoaderDelay}ms)...`);
            await new Promise(resolve => setTimeout(resolve, FOOTER_CONFIG.rocketLoaderDelay));
        }
        
        try {
            // Vérifier que le container existe
            const container = document.getElementById(FOOTER_CONFIG.containerId);
            if (!container) {
                throw new Error('Container footer non trouvé dans le DOM');
            }
            
            // Charger le HTML
            log('Chargement du HTML...');
            const html = await loadFooterHTML();
            
            // Insérer et configurer
            const success = insertFooter(html);
            
            if (success) {
                // Déclencher un événement personnalisé
                const event = new CustomEvent('footerLoaded', {
                    detail: { 
                        language: detectLanguage(),
                        rocketLoader: isRocketLoader,
                        attempts: loadAttempts
                    }
                });
                
                if (isRocketLoader) {
                    // Pour Rocket Loader, attendre un peu avant de déclencher l'événement
                    setTimeout(() => window.dispatchEvent(event), 200);
                } else {
                    window.dispatchEvent(event);
                }
                
                log('=== FOOTER CHARGÉ AVEC SUCCÈS ===', 'success');
            } else {
                throw new Error('Échec de l\'insertion du footer');
            }
            
        } catch (error) {
            log(`ERREUR COMPLÈTE: ${error.message}`, 'error');
            log('Création du footer de secours...', 'warn');
            
            // Créer le footer de secours
            createFallbackFooter();
            
            // Déclencher un événement d'erreur
            const errorEvent = new CustomEvent('footerError', {
                detail: { 
                    error: error.message,
                    rocketLoader: isRocketLoader,
                    attempts: loadAttempts
                }
            });
            
            if (isRocketLoader) {
                setTimeout(() => window.dispatchEvent(errorEvent), 200);
            } else {
                window.dispatchEvent(errorEvent);
            }
        }
    }
    
    /**
     * Fonction de retry manuelle (exposée globalement pour debug)
     */
    window.retryFooter = function() {
        log('Retry manuel du footer...');
        loadAttempts = 0;
        initializeFooter();
    };
    
    /**
     * Configuration globale pour debug
     */
    window.footerDebug = {
        config: FOOTER_CONFIG,
        detectLanguage: detectLanguage,
        retry: window.retryFooter,
        isRocketLoader: () => isRocketLoader,
        setDebug: function(enabled) {
            debugMode = enabled;
            log(`Debug mode: ${enabled ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);
        }
    };
    
    // Lancement automatique selon l'état du DOM - Compatible Rocket Loader
    const startFooterLoader = () => {
        if (isRocketLoaderActive()) {
            // Rocket Loader détecté - attendre qu'il soit prêt
            const rocketLoaderWait = () => {
                if (document.readyState === 'complete' || 
                    (document.readyState === 'interactive' && document.getElementById(FOOTER_CONFIG.containerId))) {
                    setTimeout(initializeFooter, FOOTER_CONFIG.rocketLoaderDelay);
                } else {
                    setTimeout(rocketLoaderWait, 500);
                }
            };
            rocketLoaderWait();
        } else {
            // Pas de Rocket Loader - lancement normal
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeFooter);
                log('Footer programmé pour DOMContentLoaded');
            } else {
                setTimeout(initializeFooter, 100);
                log('Footer programmé pour exécution immédiate');
            }
        }
    };
    
    startFooterLoader();
    
    log('🚀 ✅ Script footer CLOUDFLARE ROCKET LOADER COMPATIBLE chargé!');
    
})();