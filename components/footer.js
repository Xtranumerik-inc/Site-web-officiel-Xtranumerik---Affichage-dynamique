/**
 * Footer Loader - Version simplifiée et robuste
 * Charge dynamiquement le footer HTML et les styles associés
 * Compatible avec Cloudflare Pages
 */

(function() {
    'use strict';
    
    console.log('Footer loader: Initialisation...');
    
    // Configuration
    const FOOTER_CONFIG = {
        htmlPath: '/components/footer.html',
        cssPath: '/components/footer.css',
        containerId: 'footer-container',
        retryAttempts: 3,
        retryDelay: 500
    };
    
    /**
     * Charge le HTML du footer
     */
    async function loadFooterHTML() {
        try {
            const response = await fetch(FOOTER_CONFIG.htmlPath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const html = await response.text();
            console.log('Footer loader: HTML chargé avec succès');
            return html;
        } catch (error) {
            console.error('Footer loader: Erreur lors du chargement du HTML', error);
            throw error;
        }
    }
    
    /**
     * Insère le footer dans le DOM et met à jour les liens selon la langue
     */
    function insertFooter(html) {
        const container = document.getElementById(FOOTER_CONFIG.containerId);
        if (!container) {
            console.error('Footer loader: Container non trouvé');
            return;
        }
        
        // Insérer le HTML
        container.innerHTML = html;
        console.log('Footer loader: Footer inséré dans le DOM');
        
        // Déterminer la langue et mettre à jour les liens si nécessaire
        const currentPath = window.location.pathname.toLowerCase();
        const isEnglish = currentPath.includes('/en/');
        
        if (isEnglish) {
            updateFooterForEnglish();
        }
        
        // Mettre à jour l'année
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Met à jour les liens et textes pour la version anglaise
     */
    function updateFooterForEnglish() {
        const translations = {
            "Gestion d'Affichage Dynamique": "Dynamic Display Management",
            "Réseau Publicitaire": "Advertising Network",
            "Voir la map publicitaire": "View the Advertising Map",
            "Carrières": "Careers",
            "Contactez-nous": "Contact Us",
            "Tous droits réservés": "All rights reserved"
        };
        
        // Mettre à jour les textes des liens
        const links = document.querySelectorAll('.footer-nav a');
        links.forEach(link => {
            const text = link.textContent.trim();
            if (translations[text]) {
                link.textContent = translations[text];
            }
            
            // Mettre à jour les URLs
            const href = link.getAttribute('href');
            if (href && href.includes('/fr/')) {
                link.setAttribute('href', href.replace('/fr/', '/en/'));
            }
        });
        
        // Mettre à jour le texte des droits
        const rightsElement = document.getElementById('rights-text');
        if (rightsElement) {
            rightsElement.textContent = 'All rights reserved';
        }
        
        // Mettre à jour les liens du logo et du copyright
        const footerLinks = document.querySelectorAll('#logo-link, #bottom-link');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('/fr/')) {
                link.setAttribute('href', href.replace('/fr/', '/en/'));
            }
        });
    }
    
    /**
     * Initialise le footer
     */
    async function initializeFooter() {
        try {
            console.log('Footer loader: Début du chargement...');
            
            // Charger le HTML
            const html = await loadFooterHTML();
            
            // Insérer le footer
            insertFooter(html);
            
            console.log('Footer loader: Chargement terminé avec succès');
            
            // Déclencher un événement
            window.dispatchEvent(new Event('footerLoaded'));
            
        } catch (error) {
            console.error('Footer loader: Erreur complète', error);
            
            // Footer de secours
            const container = document.getElementById(FOOTER_CONFIG.containerId);
            if (container) {
                const lang = window.location.pathname.includes('/en/') ? 'en' : 'fr';
                const fallbackText = lang === 'en' ? 'All rights reserved' : 'Tous droits réservés';
                container.innerHTML = `
                    <footer style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
                        <p>© 2025 Xtranumerik. ${fallbackText}.</p>
                        <p>
                            <a href="mailto:patrick@xtranumerik.ca" style="color: #64b5f6;">Contact</a>
                        </p>
                    </footer>
                `;
            }
        }
    }
    
    // Lancer l'initialisation quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFooter);
    } else {
        // DOM déjà chargé, initialiser immédiatement
        setTimeout(initializeFooter, 0);
    }
    
})();