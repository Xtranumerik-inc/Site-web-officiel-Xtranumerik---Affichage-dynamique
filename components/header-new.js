// Header component loader - static version
(function() {
    'use strict';

    // Function to load header content
    async function loadHeader() {
        try {
            const response = await fetch('/components/header-new.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const headerHTML = await response.text();
            
            // Insert header into the page
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
                console.log('Header loaded successfully');
            } else {
                // If no container exists, prepend to body
                document.body.insertAdjacentHTML('afterbegin', headerHTML);
                console.log('Header inserted at the beginning of body');
            }
        } catch (error) {
            console.error('Failed to load header:', error);
            // Fallback: create basic header structure if loading fails
            createFallbackHeader();
        }
    }

    // Fallback header creation
    function createFallbackHeader() {
        const fallbackHeader = `
            <style>
                .fallback-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    background: linear-gradient(90deg, #190544 0%, #2a0a6e 50%, #190544 100%);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                    z-index: 2000;
                    border-bottom: 3px solid #ffa91a;
                }
                .fallback-header .logo img {
                    height: 50px;
                }
                .fallback-header .nav {
                    display: flex;
                    gap: 20px;
                }
                .fallback-header .nav a {
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .fallback-header .nav a:hover {
                    background-color: rgba(255, 169, 26, 0.2);
                }
                body {
                    margin-top: 80px;
                }
            </style>
            <header class="fallback-header">
                <div class="logo">
                    <a href="/">
                        <img src="https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7eef8943-d34e-4427-b3cb-2884e8c66666/LOGO+Xtranumerik+fond+mauve+%281920+x+1080+px%29.png?format=2500w" alt="Xtranumerik Logo">
                    </a>
                </div>
                <nav class="nav">
                    <a href="/pages/fr/contact.html">Contact</a>
                    <a href="/pages/fr/carrieres.html">Carrières</a>
                    <a href="/pages/fr/connexion.html">Se Connecter</a>
                </nav>
            </header>
        `;

        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = fallbackHeader;
        } else {
            document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
        }
        
        console.log('Fallback header created');
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