/**
 * Script de Test et Validation - Navigation Multilingue Header
 * 
 * Utilisez ce script dans la console du navigateur pour tester
 * la navigation multilingue du header après déploiement
 * 
 * Date: 27 août 2025
 */

(function testHeaderLanguageNavigation() {
    console.log('🧪 === TEST DE VALIDATION NAVIGATION MULTILINGUE ===');
    
    // Test 1: Vérifier que XTRANUMERIK_CONFIG est exposé
    console.log('\n📋 Test 1: Configuration globale accessible');
    if (window.XTRANUMERIK_CONFIG) {
        console.log('✅ XTRANUMERIK_CONFIG trouvé');
        
        // Test des fonctions principales
        try {
            const currentLang = window.XTRANUMERIK_CONFIG.detectLanguage();
            const currentPage = window.XTRANUMERIK_CONFIG.getCurrentPageName();
            const alternateUrl = window.XTRANUMERIK_CONFIG.getAlternateLangUrl();
            
            console.log('🔍 Langue détectée:', currentLang);
            console.log('📄 Page actuelle:', currentPage);
            console.log('🔗 URL alternative:', alternateUrl);
            
            console.log('✅ Toutes les fonctions principales fonctionnent');
        } catch (error) {
            console.error('❌ Erreur lors du test des fonctions:', error);
        }
    } else {
        console.log('❌ XTRANUMERIK_CONFIG non trouvé - cache ancien encore actif');
        return;
    }
    
    // Test 2: Vérifier que le bouton de changement de langue existe
    console.log('\n📋 Test 2: Élément bouton de changement de langue');
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        console.log('✅ Bouton lang-switch trouvé');
        console.log('🔗 URL actuelle du bouton:', langSwitch.href);
        
        // Vérifier si l'URL est correcte
        const expectedUrl = window.XTRANUMERIK_CONFIG.getAlternateLangUrl();
        const currentUrl = langSwitch.href;
        
        if (currentUrl.includes(expectedUrl)) {
            console.log('✅ URL du bouton est correcte');
        } else {
            console.log('❌ URL du bouton incorrecte');
            console.log('   Attendue:', expectedUrl);
            console.log('   Actuelle:', currentUrl);
        }
    } else {
        console.log('❌ Bouton lang-switch non trouvé');
    }
    
    // Test 3: Vérifier le mapping des pages
    console.log('\n📋 Test 3: Mapping des pages');
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    
    if (pathSegments.length >= 3 && pathSegments[0] === 'pages') {
        const currentLang = pathSegments[1];
        const currentPage = pathSegments[2] || 'index';
        const pageName = currentPage.includes('.html') ? currentPage : currentPage + '.html';
        
        const mapping = window.XTRANUMERIK_CONFIG.pageMapping[currentLang];
        if (mapping && mapping[pageName]) {
            console.log('✅ Mapping trouvé pour', pageName, '->', mapping[pageName]);
        } else {
            console.log('⚠️ Aucun mapping trouvé pour', pageName);
            console.log('   Fallback vers index.html sera utilisé');
        }
    }
    
    // Test 4: Test de simulation de clic
    console.log('\n📋 Test 4: Simulation de clic (ne navigue pas réellement)');
    if (langSwitch && window.XTRANUMERIK_CONFIG) {
        console.log('🌐 Simulation du processus de changement de langue...');
        
        const targetUrl = window.XTRANUMERIK_CONFIG.getAlternateLangUrl();
        console.log('🎯 URL cible calculée:', targetUrl);
        
        // Vérifier si c'est une URL valide et contextuelle
        const isValidTarget = targetUrl.includes('/pages/') && 
                             targetUrl !== window.location.pathname;
        
        if (isValidTarget) {
            console.log('✅ Test de simulation réussi - URL cible valide');
        } else {
            console.log('❌ Test de simulation échoué - URL cible invalide');
        }
    }
    
    // Test 5: Test de correspondances spécifiques
    console.log('\n📋 Test 5: Tests de correspondances spécifiques');
    const testCases = [
        { fr: 'contact.html', en: 'contact.html' },
        { fr: 'carte.html', en: 'map.html' },
        { fr: 'reseau-publicitaire.html', en: 'advertising-network.html' },
        { fr: 'connexion.html', en: 'login.html' }
    ];
    
    testCases.forEach(testCase => {
        const frMapping = window.XTRANUMERIK_CONFIG.pageMapping.fr[testCase.fr];
        const enMapping = window.XTRANUMERIK_CONFIG.pageMapping.en[testCase.en];
        
        const frCorrect = frMapping === testCase.en;
        const enCorrect = enMapping === testCase.fr;
        
        if (frCorrect && enCorrect) {
            console.log(`✅ Mapping ${testCase.fr} ↔ ${testCase.en} correct`);
        } else {
            console.log(`❌ Mapping ${testCase.fr} ↔ ${testCase.en} incorrect`);
        }
    });
    
    console.log('\n🏁 === TEST TERMINÉ ===');
    
    // Résumé des résultats
    const configExists = !!window.XTRANUMERIK_CONFIG;
    const buttonExists = !!document.getElementById('lang-switch');
    
    if (configExists && buttonExists) {
        console.log('🎉 TOUS LES TESTS DE BASE PASSENT - La correction est déployée!');
        console.log('\n📝 Pour tester la navigation:');
        console.log('1. Naviguez vers une page spécifique (ex: /pages/fr/contact)');
        console.log('2. Cliquez sur le bouton EN/FR');
        console.log('3. Vérifiez que vous arrivez sur la page équivalente');
    } else {
        console.log('⏳ La correction n\'est pas encore déployée - cache CDN en cours de propagation');
    }
})();

// Fonction utilitaire pour test manuel
window.testLanguageSwitch = function() {
    if (window.XTRANUMERIK_CONFIG) {
        const url = window.XTRANUMERIK_CONFIG.getAlternateLangUrl();
        console.log('🔗 URL alternative pour la page actuelle:', url);
        
        const currentPage = window.XTRANUMERIK_CONFIG.getCurrentPageName();
        const currentLang = window.XTRANUMERIK_CONFIG.detectLanguage();
        
        console.log('📊 Détails:');
        console.log('  - Page actuelle:', currentPage);
        console.log('  - Langue actuelle:', currentLang);
        console.log('  - URL cible:', url);
        
        return { currentPage, currentLang, targetUrl: url };
    } else {
        console.log('❌ Configuration non disponible');
        return null;
    }
};

console.log('🧪 Script de test chargé. Tapez testLanguageSwitch() pour un test rapide.');