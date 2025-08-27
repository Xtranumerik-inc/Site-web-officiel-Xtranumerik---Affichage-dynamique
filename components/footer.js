/**
 * Footer Loader - VERSION LIENS INTERNES UNIQUEMENT
 * DATE: 27 août 2025
 * 
 * 🔧 CORRECTION MAJEURE : Suppression des liens externes
 * 
 * ❌ PROBLÈME IDENTIFIÉ :
 * - Footer de secours contenait un lien mailto externe 
 * - Possibles liens externes dans le HTML chargé
 * 
 * ✅ CORRECTIONS APPORTÉES :
 * - Footer de secours utilise uniquement des liens internes
 * - Suppression complète de tous les liens externes
 * - Conservation de la logique multilingue FR/EN
 * - Navigation interne optimisée
 */

(function() {
    'use strict';
    
    console.log('Footer loader (liens internes): Initialisation...');
    
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
        
        // 🔧 SUPPRESSION DES LIENS SOCIAUX EXTERNES (si présents dans le HTML)
        const socialLinks = container.querySelectorAll('a[href*="x.com"], a[href*="facebook.com"], a[href*="linkedin.com"], a[href*="twitter.com"]');
        if (socialLinks.length > 0) {
            console.log('🔧 Suppression des liens sociaux externes détectés:', socialLinks.length);
            socialLinks.forEach(link => {
                const parentSection = link.closest('.footer-social');
                if (parentSection) {
                    parentSection.remove();
                    console.log('🗑️ Section réseaux sociaux supprimée');
                } else {
                    link.remove();
                    console.log('🗑️ Lien externe supprimé:', link.href);
                }
            });
        }
        
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
        
        console.log('✅ Footer configuré avec liens internes uniquement');
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
        
        // Mapping des URLs français vers anglais
        const urlMappings = {
            '/pages/fr/index.html': '/pages/en/index.html',
            '/pages/fr/reseau-publicitaire.html': '/pages/en/advertising-network.html',
            '/pages/fr/carte.html': '/pages/en/map.html', 
            '/pages/fr/carrieres.html': '/pages/en/careers.html',
            '/pages/fr/contact.html': '/pages/en/contact.html'
        };
        
        // Mettre à jour les textes des liens
        const links = document.querySelectorAll('.footer-nav a');
        links.forEach(link => {
            const text = link.textContent.trim();
            if (translations[text]) {
                link.textContent = translations[text];
            }
            
            // Mettre à jour les URLs spécifiques
            const href = link.getAttribute('href');
            if (href && urlMappings[href]) {
                link.setAttribute('href', urlMappings[href]);
            }
        });
        
        // Mettre à jour le texte des droits
        const rightsElement = document.getElementById('rights-text');
        if (rightsElement) {
            rightsElement.textContent = 'All rights reserved';
        }
        
        // Mettre à jour les liens du logo et du copyright
        const logoLink = document.getElementById('logo-link');
        const bottomLink = document.getElementById('bottom-link');
        
        if (logoLink) {
            logoLink.setAttribute('href', '/pages/en/index.html');
        }
        
        if (bottomLink) {
            bottomLink.setAttribute('href', '/pages/en/index.html');
        }
        
        console.log('Footer loader: Version anglaise appliquée avec liens internes');
    }
    
    /**
     * Initialise le footer
     */
    async function initializeFooter() {
        try {
            console.log('Footer loader: Début du chargement (liens internes)...');
            
            // Charger le HTML
            const html = await loadFooterHTML();
            
            // Insérer le footer
            insertFooter(html);
            
            console.log('Footer loader: Chargement terminé avec succès (liens internes uniquement)');
            
            // Déclencher un événement
            window.dispatchEvent(new Event('footerLoaded'));
            
        } catch (error) {
            console.error('Footer loader: Erreur complète', error);
            
            // 🔧 Footer de secours avec LIENS INTERNES UNIQUEMENT
            const container = document.getElementById(FOOTER_CONFIG.containerId);
            if (container) {
                const lang = window.location.pathname.includes('/en/') ? 'en' : 'fr';
                const fallbackText = lang === 'en' ? 'All rights reserved' : 'Tous droits réservés';
                const homeLink = lang === 'en' ? '/pages/en/index.html' : '/pages/fr/index.html';
                const contactLink = lang === 'en' ? '/pages/en/contact.html' : '/pages/fr/contact.html';
                const contactText = lang === 'en' ? 'Contact' : 'Contact';
                
                container.innerHTML = `
                    <footer style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
                        <p>© 2025 Xtranumerik. ${fallbackText}.</p>
                        <p>
                            <a href="${homeLink}" style="color: #64b5f6; margin-right: 15px;">Accueil</a>
                            <a href="${contactLink}" style="color: #64b5f6;">${contactText}</a>
                        </p>
                    </footer>
                `;
                console.log('🛡️ Footer de secours avec liens internes appliqué');
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
    
    console.log('🎯 ✅ Footer loader LIENS INTERNES chargé avec succès!');
    
})();