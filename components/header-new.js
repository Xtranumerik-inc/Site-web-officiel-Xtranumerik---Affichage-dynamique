// Header component loader - static version avec gestion avancée des chemins
(function() {
    'use strict';

    // Function to load header content
    async function loadHeader() {
        console.log('🔄 Chargement du header...');
        
        // Essayer plusieurs chemins possibles
        const possiblePaths = [
            '/components/header-new.html',
            'components/header-new.html',
            './components/header-new.html',
            '../components/header-new.html'
        ];
        
        for (const path of possiblePaths) {
            try {
                console.log(`🔍 Tentative de chargement: ${path}`);
                const response = await fetch(path);
                if (response.ok) {
                    const headerHTML = await response.text();
                    
                    // Insert header into the page
                    const headerContainer = document.getElementById('header-container');
                    if (headerContainer) {
                        headerContainer.innerHTML = headerHTML;
                        console.log('✅ Header chargé avec succès depuis:', path);
                        return; // Succès, sortir de la fonction
                    } else {
                        // If no container exists, prepend to body
                        document.body.insertAdjacentHTML('afterbegin', headerHTML);
                        console.log('✅ Header inséré au début du body depuis:', path);
                        return; // Succès, sortir de la fonction
                    }
                }
            } catch (error) {
                console.log(`❌ Erreur lors du chargement de ${path}:`, error.message);
                continue; // Essayer le prochain chemin
            }
        }
        
        // Si tous les chemins échouent, créer le header de fallback
        console.log('🔄 Tous les chemins ont échoué, création du header de fallback...');
        createFallbackHeader();
    }

    // Fallback header creation - Version complète avec tous les styles
    function createFallbackHeader() {
        const fallbackHeader = `
            <style>
                /* Base reset */
                * { margin: 0; padding: 0; box-sizing: border-box; }

                /* Custom header styles - Modern geometric design */
                .custom-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                    height: 80px;
                    background: linear-gradient(90deg, #190544 0%, #2a0a6e 50%, #190544 100%);
                    border-bottom: 3px solid #ffa91a;
                    border-radius: 0 0 16px 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 2000;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .custom-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #ffa91a, transparent);
                }

                .custom-header:hover {
                    box-shadow: 0 12px 40px rgba(255, 169, 26, 0.2);
                }

                /* Logo section */
                .logo { 
                    display: flex; 
                    align-items: center; 
                    height: 100%;
                }

                .logo a { 
                    display: block; 
                    height: 50px;
                    transition: transform 0.3s ease;
                }

                .logo img { 
                    height: 100%; 
                    width: auto; 
                    filter: brightness(1.1);
                    transition: filter 0.3s ease;
                }

                .logo a:hover { 
                    transform: scale(1.05);
                }

                .logo a:hover img {
                    filter: brightness(1.3);
                }

                /* Navigation buttons */
                .nav-buttons { 
                    display: flex; 
                    gap: 8px; 
                    position: relative; 
                    align-items: center;
                    height: 100%;
                }

                .nav-button {
                    display: flex;
                    align-items: center;
                    height: 48px;
                    padding: 0 24px;
                    background: rgba(255, 255, 255, 0.08);
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.25px;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    position: relative;
                    overflow: hidden;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .nav-button:hover {
                    background: rgba(255, 169, 26, 0.15);
                    border-color: #ffa91a;
                    color: #ffa91a;
                    transform: translateY(-2px);
                    box-shadow: 
                        0 4px 12px rgba(255, 169, 26, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                /* Login button special styling */
                .login-button {
                    background: linear-gradient(135deg, #ffa91a 0%, #e69500 100%);
                    color: #190544;
                    border: 1px solid #ffa91a;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(255, 169, 26, 0.4);
                }

                .login-button:hover {
                    background: linear-gradient(135deg, #ffb633 0%, #ffa91a 100%);
                    color: #190544;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 169, 26, 0.6);
                }

                /* Language switcher */
                .language-switcher {
                    margin-left: 16px;
                }

                .lang-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 18px;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: pointer;
                }

                .lang-button:hover {
                    background: rgba(255, 169, 26, 0.15);
                    border-color: #ffa91a;
                    color: #ffa91a;
                    transform: translateY(-2px);
                }

                /* Hamburger menu */
                .hamburger { 
                    display: none; 
                    flex-direction: column; 
                    cursor: pointer; 
                    gap: 4px; 
                    transition: transform 0.3s ease; 
                    width: 32px;
                    height: 32px;
                    justify-content: center;
                    align-items: center;
                }

                .hamburger span { 
                    width: 24px; 
                    height: 2px; 
                    background: #fff; 
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    border-radius: 2px;
                }

                .hamburger.active span:nth-child(1) { 
                    transform: rotate(45deg) translate(5px, 5px); 
                }

                .hamburger.active span:nth-child(2) { 
                    opacity: 0; 
                    transform: translateX(20px);
                }

                .hamburger.active span:nth-child(3) { 
                    transform: rotate(-45deg) translate(7px, -7px); 
                }

                /* Mobile responsive */
                @media (max-width: 768px) {
                    .custom-header { 
                        padding: 0 20px; 
                        height: 70px;
                    }

                    .logo a { 
                        height: 40px; 
                    }

                    .hamburger { 
                        display: flex; 
                    }

                    .nav-buttons { 
                        display: none; 
                        flex-direction: column; 
                        position: absolute; 
                        top: 100%; 
                        left: 0; 
                        width: 100%; 
                        background: linear-gradient(180deg, #190544 0%, #2a0a6e 100%);
                        padding: 20px; 
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
                        border-top: 1px solid rgba(255, 169, 26, 0.3);
                        gap: 12px;
                    }

                    .nav-buttons.active { 
                        display: flex; 
                    }

                    .nav-button { 
                        height: 52px;
                        text-align: center; 
                        justify-content: center;
                        border-radius: 8px;
                        font-size: 15px;
                    }

                    .language-switcher { 
                        margin-left: 12px; 
                        margin-right: 0;
                    }

                    .lang-button {
                        width: 44px;
                        height: 44px;
                    }
                }

                /* Ensure body has proper top margin to account for fixed header */
                body {
                    margin-top: 80px;
                }

                @media (max-width: 768px) {
                    body {
                        margin-top: 70px;
                    }
                }
            </style>
            
            <header class="custom-header">
                <div class="logo">
                    <a href="/">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7eef8943-d34e-4427-b3cb-2884e8c66666/LOGO+Xtranumerik+fond+mauve+%281920+x+1080+px%29.png?format=2500w" alt="Xtranumerik Logo">
                    </a>
                </div>
                <nav class="nav-buttons">
                    <a href="/pages/fr/affichage-dynamique.html" class="nav-button">Gestion d'affichage dynamique</a>
                    <a href="/pages/fr/reseau-publicitaire.html" class="nav-button">Réseau Publicitaire</a>
                    <a href="/pages/fr/carrieres.html" class="nav-button">Carrières</a>
                    <a href="/pages/fr/contact.html" class="nav-button">Contact</a>
                    <a href="/pages/fr/connexion.html" class="nav-button login-button">Se Connecter</a>
                </nav>
                <div class="language-switcher">
                    <a href="/pages/en/" class="lang-button">🌐</a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>

            <script>
                // Gestion du menu hamburger
                const hamburger = document.querySelector('.hamburger');
                const navButtons = document.querySelector('.nav-buttons');

                if (hamburger && navButtons) {
                    hamburger.addEventListener('click', () => {
                        hamburger.classList.toggle('active');
                        navButtons.classList.toggle('active');
                    });
                }

                // Fermer le menu hamburger lorsqu'un lien est cliqué
                document.querySelectorAll('.nav-button').forEach(button => {
                    button.addEventListener('click', () => {
                        if (hamburger) hamburger.classList.remove('active');
                        if (navButtons) navButtons.classList.remove('active');
                    });
                });

                console.log('✅ Header de fallback créé et configuré');
            </script>
        `;

        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = fallbackHeader;
        } else {
            document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
        }
        
        console.log('✅ Header de fallback créé avec succès');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }

    // Export for potential external use
    window.XtranumerikHeader = {
        load: loadHeader,
        createFallback: createFallbackHeader
    };
})();