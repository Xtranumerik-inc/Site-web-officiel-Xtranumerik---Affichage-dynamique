/**
 * Footer Loader - VERSION LIENS INTERNES UNIQUEMENT
 * DATE: 19 septembre 2025
 * 
 * 🔧 MISE À JOUR : Correction des liens footer avec espaces dans les URLs
 * 
 * ✅ FONCTIONNALITÉS :
 * - Navigation footer simplifiée : "Carte Publicitaire" / "Advertising Map"
 * - Suppression complète du lien "Carrières"
 * - URLs corrigées avec espaces encodés (%20)
 * - Traductions FR/EN adaptées aux nouveaux liens
 * - Maintien de toutes les corrections précédentes (liens internes uniquement)
 */

(function() {
    'use strict';
    
    console.log('Footer loader (liens internes - URLs corrigées): Initialisation...');
    
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
        
        console.log('✅ Footer configuré avec URLs corrigées (Carte Publicitaire / Advertising Map)');
    }
    
    /**
     * Met à jour les liens et textes pour la version anglaise
     */
    function updateFooterForEnglish() {
        const translations = {
            "Gestion d'Affichage Dynamique": "Dynamic Display Management",
            "Carte Publicitaire": "Advertising Map",
            "Contactez-nous": "Contact Us",
            "Tous droits réservés": "All rights reserved"
        };
        
        // 🔧 CORRECTION: URLs avec espaces encodés - NOUVELLE STRUCTURE
        const urlMappings = {
            '/pages/fr/index.html': '/pages/en/index.html',
            '/pages/fr/carte%20publicitaire.html': '/pages/en/advertising%20map.html',
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
        
        console.log('Footer loader: Version anglaise appliquée avec URLs corrigées');
    }
    
    /**
     * Initialise le footer
     */
    async function initializeFooter() {
        try {
            console.log('Footer loader: Début du chargement (URLs corrigées)...');
            
            // Charger le HTML
            const html = await loadFooterHTML();
            
            // Insérer le footer
            insertFooter(html);
            
            console.log('Footer loader: Chargement terminé avec succès (URLs corrigées)');
            
            // Déclencher un événement
            window.dispatchEvent(new Event('footerLoaded'));
            
        } catch (error) {
            console.error('Footer loader: Erreur complète', error);
            
            // 🔧 Footer de secours avec URLs CORRIGÉES
            const container = document.getElementById(FOOTER_CONFIG.containerId);
            if (container) {
                const lang = window.location.pathname.includes('/en/') ? 'en' : 'fr';
                const fallbackText = lang === 'en' ? 'All rights reserved' : 'Tous droits réservés';
                const homeLink = lang === 'en' ? '/pages/en/index.html' : '/pages/fr/index.html';
                const contactLink = lang === 'en' ? '/pages/en/contact.html' : '/pages/fr/contact.html';
                // 🔧 CORRECTION: URLs avec espaces encodés
                const mapLink = lang === 'en' ? '/pages/en/advertising%20map.html' : '/pages/fr/carte%20publicitaire.html';
                const contactText = lang === 'en' ? 'Contact' : 'Contact';
                const mapText = lang === 'en' ? 'Advertising Map' : 'Carte Publicitaire';
                
                container.innerHTML = `
                    <footer style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
                        <p>© 2025 Xtranumerik. ${fallbackText}.</p>
                        <p>
                            <a href="${homeLink}" style="color: #64b5f6; margin-right: 15px;">Accueil</a>
                            <a href="${mapLink}" style="color: #64b5f6; margin-right: 15px;">${mapText}</a>
                            <a href="${contactLink}" style="color: #64b5f6;">${contactText}</a>
                        </p>
                    </footer>
                `;
                console.log('🛡️ Footer de secours avec URLs corrigées appliqué');
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
    
    console.log('🎯 ✅ Footer loader avec URLs CORRIGÉES (Carte Publicitaire / Advertising Map) chargé avec succès!');
    
})();