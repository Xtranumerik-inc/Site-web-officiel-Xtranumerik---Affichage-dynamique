// Language detection and switching functionality
import { translations, urlMapFrToEn, urlMapEnToFr } from './translations.js';

// Get current language and slug from URL
export function getLangAndSlug() {
    let path = window.location.pathname.toLowerCase();
    let lang, slug;
    
    if (path.includes('/en/')) {
        lang = 'en';
        slug = path.substring(path.indexOf('/en/') + 4);
    } else if (path.includes('/fr/')) {
        lang = 'fr';
        slug = path.substring(path.indexOf('/fr/') + 4);
    } else {
        lang = 'fr';
        slug = path.substring(1) || 'index.html';
    }
    
    return { lang, slug };
}

// Calculate opposite language URL with file name translation
export function getOppositeLangHref() {
    const { lang, slug } = getLangAndSlug();
    const targetLang = lang === 'fr' ? 'en' : 'fr';
    let targetSlug = slug;
    
    // Apply file name translation
    if (lang === 'fr' && urlMapFrToEn[slug]) {
        targetSlug = urlMapFrToEn[slug];
    } else if (lang === 'en' && urlMapEnToFr[slug]) {
        targetSlug = urlMapEnToFr[slug];
    }
    
    let targetPath;
    if (targetSlug === '' || targetSlug === 'index.html') {
        targetPath = targetLang === 'en' ? '/pages/en/index.html' : '/pages/fr/index.html';
    } else {
        targetPath = `/pages/${targetLang}/${targetSlug}`;
    }
    
    console.log(`Switch langue: ${lang} -> ${targetLang}, slug: ${slug} -> ${targetSlug}, path: ${targetPath}`);
    return targetPath;
}

// Update header content based on current language
export function updateHeader() {
    const { lang } = getLangAndSlug();
    console.log(`Mise à jour header pour langue: ${lang}`);
    
    // Update navigation links
    const affichageButton = document.getElementById('link-affichage');
    if (affichageButton) {
        const firstChild = affichageButton.firstChild;
        if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
            firstChild.textContent = translations[lang].affichage.text;
        }
        affichageButton.href = translations[lang].affichage.href;
    }

    const reseauLink = document.getElementById('link-reseau');
    if (reseauLink) {
        reseauLink.textContent = translations[lang].reseau.text;
        reseauLink.href = translations[lang].reseau.href;
    }

    const contactLink = document.getElementById('link-contact');
    if (contactLink) {
        contactLink.textContent = translations[lang].contact.text;
        contactLink.href = translations[lang].contact.href;
    }

    const loginLink = document.getElementById('link-login');
    if (loginLink) {
        loginLink.textContent = translations[lang].login.text;
        loginLink.href = translations[lang].login.href;
    }

    // Update logo link
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.href = translations[lang].logoHref;
    }

    // Update dropdown items
    const dropdownIds = [
        'dropdown-industries', 'dropdown-gyms', 'dropdown-restaurants', 
        'dropdown-concessions-auto', 'dropdown-hotels', 'dropdown-centres-commerciaux',
        'dropdown-commerce-detail', 'dropdown-pharmacies', 'dropdown-cliniques-dentaires', 
        'dropdown-salons-coiffure'
    ];
    
    dropdownIds.forEach((id, index) => {
        const item = document.getElementById(id);
        if (item && translations[lang].dropdown[index]) {
            const translation = translations[lang].dropdown[index];
            item.href = translation.href;
            
            const h3 = item.querySelector('h3');
            if (h3) {
                h3.textContent = translation.text;
            }
            
            let descElement = item.querySelector('p');
            if (translation.desc) {
                if (!descElement) {
                    descElement = document.createElement('p');
                    item.appendChild(descElement);
                }
                descElement.textContent = translation.desc;
            } else if (descElement) {
                descElement.remove();
            }
        }
    });

    // Update language switcher link
    const langLink = document.getElementById('lang-link');
    if (langLink) {
        const oppositeHref = getOppositeLangHref();
        langLink.href = oppositeHref;
        
        langLink.onclick = function(e) {
            e.preventDefault();
            console.log(`Redirection vers: ${oppositeHref}`);
            window.location.href = oppositeHref;
            return false;
        };
    }

    document.documentElement.lang = lang;
}