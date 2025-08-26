// Script de correction pour le site Xtranumerik
// Ce script gère les redirections et corrige les chemins des ressources

(function() {
    'use strict';
    
    // Déterminer la langue actuelle
    function getCurrentLanguage() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/en/')) return 'en';
        if (path.includes('/fr/')) return 'fr';
        if (path === '/' || path === '') return 'fr';
        return 'fr';
    }
    
    // Vérifier si on est sur la racine et rediriger vers /fr/
    function checkAndRedirect() {
        const path = window.location.pathname;
        
        // Si on est exactement sur la racine, rediriger vers /fr/
        if (path === '/' || path === '') {
            window.location.href = '/fr/';
            return true;
        }
        
        // Si on est sur /index.html, rediriger vers /fr/
        if (path === '/index.html') {
            window.location.href = '/fr/';
            return true;
        }
        
        return false;
    }
    
    // Corriger les chemins des ressources
    function fixResourcePaths() {
        // Corriger les liens CSS
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/')) {
                // Enlever le préfixe de langue des chemins absolus
                const cleanPath = href.replace(/^\/(?:fr|en)\//, '/');
                if (cleanPath !== href) {
                    link.setAttribute('href', cleanPath);
                }
            }
        });
        
        // Corriger les scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src && src.startsWith('/')) {
                // Enlever le préfixe de langue des chemins absolus
                const cleanPath = src.replace(/^\/(?:fr|en)\//, '/');
                if (cleanPath !== src) {
                    // Créer un nouveau script avec le bon chemin
                    const newScript = document.createElement('script');
                    newScript.src = cleanPath;
                    if (script.type) newScript.type = script.type;
                    if (script.async) newScript.async = true;
                    if (script.defer) newScript.defer = true;
                    
                    script.parentNode.replaceChild(newScript, script);
                }
            }
        });
    }
    
    // Créer les pages manquantes dynamiquement
    function createMissingPages() {
        const lang = getCurrentLanguage();
        const currentPath = window.location.pathname;
        
        // Liste des pages qui devraient exister
        const pages = {
            '/fr/': 'index.html',
            '/en/': 'pages/en/digital-signage.html',
            '/fr/affichage-dynamique': 'index.html',
            '/en/digital-signage': 'pages/en/digital-signage.html'
        };
        
        // Si la page actuelle est dans notre liste et qu'elle n'existe pas
        if (pages[currentPath]) {
            // Charger le contenu de la page appropriée
            fetch('/' + pages[currentPath])
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Page not found');
                    }
                    return response.text();
                })
                .then(html => {
                    // Remplacer le contenu de la page actuelle
                    document.open();
                    document.write(html);
                    document.close();
                    
                    // Réappliquer les corrections après le chargement
                    setTimeout(() => {
                        fixResourcePaths();
                    }, 100);
                })
                .catch(error => {
                    console.error('Erreur lors du chargement de la page:', error);
                });
        }
    }
    
    // Fonction principale
    function init() {
        // Vérifier si on doit rediriger
        if (checkAndRedirect()) {
            return; // Arrêter l'exécution si on redirige
        }
        
        // Corriger les chemins des ressources
        fixResourcePaths();
        
        // Gérer les pages manquantes
        createMissingPages();
        
        // Écouter les changements de navigation (pour les SPA)
        window.addEventListener('popstate', function() {
            init();
        });
    }
    
    // Exécuter quand le DOM est chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Exporter les fonctions pour utilisation externe si nécessaire
    window.XtranumerikSiteFix = {
        getCurrentLanguage,
        checkAndRedirect,
        fixResourcePaths,
        createMissingPages,
        init
    };
})();