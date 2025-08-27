/**
 * Footer Loader - VERSION LIENS INTERNES UNIQUEMENT
 * DATE: 27 août 2025
 * 
 * 🔧 CORRECTION MAJEURE : Suppression des liens externes
 * 
 * ❌ PROBLÈME IDENTIFIÉ :
 * - Liens sociaux externes vers X, Facebook, LinkedIn
 * - Ces liens sortent du contexte interne du site
 * 
 * ✅ CORRECTIONS APPORTÉES :
 * - Suppression complète des liens sociaux externes
 * - Conservation uniquement des liens internes
 * - Optimisation pour navigation interne seulement
 * - Footer plus léger et focalisé sur le contenu interne
 */

(function() {
    'use strict';
    
    console.log('Footer loader (liens internes): Initialisation...');
    
    // Configuration
    const FOOTER_CONFIG = {
        containerId: 'footer-container',
        retryAttempts: 3,
        retryDelay: 500
    };
    
    /**
     * Crée le HTML du footer avec liens internes uniquement
     */
    function createFooterHTML() {
        return `
        <footer id="custom-footer">
            <div class="footer-container">
                <div class="footer-nav">
                    <a href="/pages/fr/index.html" class="nav-link" data-key="affichage">Gestion d'Affichage Dynamique</a>
                    <a href="/pages/fr/reseau-publicitaire.html" class="nav-link" data-key="reseau">Réseau Publicitaire</a>
                    <a href="/pages/fr/carte.html" class="nav-link map-link" data-key="carte">Voir la map publicitaire</a>
                    <a href="/pages/fr/carrieres.html" class="nav-link" data-key="carrieres">Carrières</a>
                    <a href="/pages/fr/contact.html" class="nav-link" data-key="contact">Contactez-nous</a>
                </div>
                <div class="footer-logo">
                    <a id="logo-link" href="/pages/fr/index.html">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/913d56a4-7536-40b6-bbc0-4db0640301f0/Design+sans+titre.png?format=2500w" alt="xtranumerik logo">
                    </a>
                    <div id="footer-bottom" class="footer-bottom">
                        © <span id="current-year">2025</span> <a id="bottom-link" href="/pages/fr/index.html">xtranumerik.ca</a> | <span id="rights-text">Tous droits réservés</span>
                    </div>
                </div>
                <!-- Section réseaux sociaux supprimée pour liens internes uniquement -->
            </div>
        </footer>`;
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
        
        // Ajouter les styles CSS intégrés
        addFooterStyles();
    }
    
    /**
     * Ajoute les styles CSS pour le footer
     */
    function addFooterStyles() {
        if (document.getElementById('footer-styles-internal')) {
            return; // Styles déjà ajoutés
        }
        
        const styles = `
        <style id="footer-styles-internal">
        #custom-footer {
            background: linear-gradient(135deg, #190544 0%, #2d1b6b 100%);
            color: white;
            padding: 3rem 0 1rem;
            border-top: 1px solid rgba(255, 169, 26, 0.2);
            margin-top: 4rem;
        }
        
        .footer-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 3rem;
            align-items: center;
        }
        
        .footer-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            align-items: center;
        }
        
        .footer-nav .nav-link {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            padding: 0.5rem 0;
            border-bottom: 2px solid transparent;
        }
        
        .footer-nav .nav-link:hover {
            color: #ffa91a;
            border-bottom-color: #ffa91a;
            transform: translateY(-2px);
        }
        
        .footer-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .footer-logo img {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            transition: transform 0.3s ease;
        }
        
        .footer-logo a:hover img {
            transform: scale(1.05);
        }
        
        .footer-bottom {
            text-align: center;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .footer-bottom a {
            color: #ffa91a;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        
        .footer-bottom a:hover {
            color: #ffffff;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .footer-container {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }
            
            .footer-nav {
                justify-content: center;
                gap: 1rem;
            }
            
            .footer-nav .nav-link {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .footer-nav {
                flex-direction: column;
                gap: 1rem;
            }
            
            .footer-logo img {
                width: 60px;
                height: 60px;
            }
        }
        </style>`;
        
        document.head.insertAdjacentHTML('beforeend', styles);
        console.log('Footer loader: Styles CSS ajoutés');
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
            
            // Créer le HTML directement
            const html = createFooterHTML();
            
            // Insérer le footer
            insertFooter(html);
            
            console.log('Footer loader: Chargement terminé avec succès (liens internes uniquement)');
            
            // Déclencher un événement
            window.dispatchEvent(new Event('footerLoaded'));
            
        } catch (error) {
            console.error('Footer loader: Erreur complète', error);
            
            // Footer de secours
            const container = document.getElementById(FOOTER_CONFIG.containerId);
            if (container) {
                const lang = window.location.pathname.includes('/en/') ? 'en' : 'fr';
                const fallbackText = lang === 'en' ? 'All rights reserved' : 'Tous droits réservés';
                const homeLink = lang === 'en' ? '/pages/en/index.html' : '/pages/fr/index.html';
                const contactLink = lang === 'en' ? '/pages/en/contact.html' : '/pages/fr/contact.html';
                
                container.innerHTML = `
                    <footer style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
                        <p>© 2025 Xtranumerik. ${fallbackText}.</p>
                        <p>
                            <a href="${homeLink}" style="color: #64b5f6; margin-right: 15px;">Accueil</a>
                            <a href="${contactLink}" style="color: #64b5f6;">Contact</a>
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
    
    console.log('🎯 ✅ Footer loader LIENS INTERNES chargé avec succès!');
    
})();