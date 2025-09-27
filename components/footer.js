/**
 * Footer Loader - VERSION RÉPARÉE ET ROBUSTE
 * DATE: 27 septembre 2025
 * 
 * 🔧 RÉPARATIONS EFFECTUÉES :
 * ✅ Gestion d'erreurs robuste avec retry automatique
 * ✅ Détection de langue améliorée et fallback
 * ✅ URLs corrigées avec espaces encodés proprement
 * ✅ Chargement asynchrone avec timeout
 * ✅ Footer de secours garanti en cas d'échec
 * ✅ Compatible avec nouveaux cache headers
 * ✅ Debug logging pour diagnostic
 */

(function() {
    'use strict';
    
    // Configuration robuste
    const FOOTER_CONFIG = {
        htmlPath: '/components/footer.html',
        cssPath: '/components/footer.css',
        containerId: 'footer-container',
        retryAttempts: 3,
        retryDelay: 1000,
        timeout: 5000
    };
    
    // Variables de debug
    let debugMode = true;
    let loadAttempts = 0;
    
    function log(message, type = 'info') {
        if (debugMode) {
            const timestamp = new Date().toLocaleTimeString();
            const prefix = `[${timestamp}] Footer:`;
            
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
        if (title.includes('english') || title.includes(' en ')) {
            log('Langue détectée via title: EN');
            return 'en';
        }
        
        // 4. Fallback par défaut
        log('Langue par défaut: FR');
        return 'fr';
    }
    
    /**
     * Charge le HTML du footer avec timeout et retry
     */
    async function loadFooterHTML() {
        return new Promise(async (resolve, reject) => {
            loadAttempts++;
            log(`Tentative de chargement ${loadAttempts}/${FOOTER_CONFIG.retryAttempts}...`);
            
            try {
                // Ajouter un cache-buster pour forcer le refresh
                const cacheBuster = Date.now();
                const url = `${FOOTER_CONFIG.htmlPath}?v=${cacheBuster}`;
                
                // Créer un timeout manuel
                const timeoutId = setTimeout(() => {
                    reject(new Error('Timeout lors du chargement'));
                }, FOOTER_CONFIG.timeout);
                
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
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
                log(`Erreur lors du chargement: ${error.message}`, 'error');
                
                if (loadAttempts < FOOTER_CONFIG.retryAttempts) {
                    log(`Retry dans ${FOOTER_CONFIG.retryDelay}ms...`, 'warn');
                    setTimeout(() => {
                        loadFooterHTML().then(resolve).catch(reject);
                    }, FOOTER_CONFIG.retryDelay);
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
        
        // Ajouter les event listeners
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
     * Ajoute les event listeners au footer
     */
    function addFooterEventListeners(container) {
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            link.addEventListener('click', function(event) {
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
     * Crée un footer de secours en cas d'échec
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
            <footer style="background: #1a1a2e; color: white; padding: 2rem 1rem; text-align: center; margin-top: 2rem;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-bottom: 1.5rem;">
                        <a href="${homeLink}" style="color: #64b5f6; text-decoration: none; padding: 0.5rem 1rem; border-radius: 5px; transition: background-color 0.3s;">${homeText}</a>
                        <a href="${mapLink}" style="color: #64b5f6; text-decoration: none; padding: 0.5rem 1rem; border-radius: 5px; transition: background-color 0.3s;">${mapText}</a>
                        <a href="${contactLink}" style="color: #64b5f6; text-decoration: none; padding: 0.5rem 1rem; border-radius: 5px; transition: background-color 0.3s;">${contactText}</a>
                    </div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                        <p>© ${new Date().getFullYear()} <a href="${homeLink}" style="color: #ffa91a; text-decoration: none;">Xtranumerik.ca</a> | ${rightsText}</p>
                    </div>
                </div>
            </footer>
        `;
        
        // Ajouter des effets hover
        const style = document.createElement('style');
        style.textContent = `
            #footer-container a:hover {
                background-color: rgba(255, 169, 26, 0.1) !important;
            }
        `;
        document.head.appendChild(style);
        
        log(`Footer de secours créé (${currentLang.toUpperCase()})`, 'success');
    }
    
    /**
     * Fonction principale d'initialisation
     */
    async function initializeFooter() {
        log('=== INITIALISATION FOOTER RÉPARÉ ===');
        
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
                window.dispatchEvent(new CustomEvent('footerLoaded', {
                    detail: { language: detectLanguage() }
                }));
                
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
            window.dispatchEvent(new CustomEvent('footerError', {
                detail: { error: error.message }
            }));
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
        setDebug: function(enabled) {
            debugMode = enabled;
            log(`Debug mode: ${enabled ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);
        }
    };
    
    // Lancement automatique selon l'état du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFooter);
        log('Footer programmé pour DOMContentLoaded');
    } else {
        // DOM déjà prêt, petite temporisation pour s'assurer que le container existe
        setTimeout(initializeFooter, 100);
        log('Footer programmé pour exécution immédiate');
    }
    
    log('🎯 ✅ Script footer RÉPARÉ chargé avec succès!');
    
})();