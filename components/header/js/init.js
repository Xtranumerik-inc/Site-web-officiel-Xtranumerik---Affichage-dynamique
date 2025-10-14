// Header initialization and global exports
import { updateHeader, getLangAndSlug, getOppositeLangHref } from './language.js';
import { initializeDropdown } from './dropdown.js';
import { initializeHamburger } from './hamburger.js';

// Load Inter font if needed
function loadInterFont() {
    if (!document.fonts.check('1em Inter')) {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        console.log('Police Inter chargée');
    }
}

// Main initialization function
function initializeHeader() {
    console.log('Initialisation du header');
    loadInterFont();
    updateHeader();
    initializeHamburger();
    initializeDropdown();
}

// Initialize when DOM is ready
if (document.querySelector('.custom-header')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHeader);
    } else {
        initializeHeader();
    }
}

// Export utilities globally for other scripts
window.HeaderUtils = {
    updateHeader,
    initializeHeader,
    getLangAndSlug,
    getOppositeLangHref
};