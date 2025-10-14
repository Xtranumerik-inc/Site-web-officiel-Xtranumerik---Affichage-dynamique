// Hamburger menu functionality
export function initializeHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navButtons = document.querySelector('.nav-buttons');
    const affichageButton = document.getElementById('link-affichage');

    if (hamburger && navButtons) {
        // Toggle hamburger menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navButtons.classList.toggle('active');
        });

        // Close hamburger menu when clicking nav buttons (except dropdown button)
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target !== affichageButton && hamburger && navButtons) {
                    hamburger.classList.remove('active');
                    navButtons.classList.remove('active');
                }
            });
        });
    }
}