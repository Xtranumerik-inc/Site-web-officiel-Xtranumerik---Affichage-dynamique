#!/usr/bin/env node

/**
 * Script de mise à jour automatique pour ajouter le script auto-header.js
 * dans tous les fichiers HTML du site Xtranumerik
 * 
 * Usage: node update-headers.js
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration des fichiers à traiter
const FILES_TO_UPDATE = [
    // Pages françaises
    { file: 'pages/fr/contact.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/carrieres.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/carte.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/centres-commerciaux.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/cliniques-dentaires.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/commerce-detail.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/concessions-auto.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/connexion.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/gyms.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/hotels.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/industries.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/pharmacies.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/reseau-publicitaire.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/restaurants.html', scriptPath: '../../assets/js/auto-header.js' },
    { file: 'pages/fr/salons-coiffure.html', scriptPath: '../../assets/js/auto-header.js' },
    
    // Pages anglaises
    { file: 'pages/en/contact.html', scriptPath: '../../assets/js/auto-header.js' },
];

/**
 * Met à jour un fichier HTML pour ajouter le script auto-header
 * @param {string} filePath - Chemin vers le fichier
 * @param {string} scriptPath - Chemin du script à ajouter
 */
async function updateHtmlFile(filePath, scriptPath) {
    try {
        console.log(`Traitement de ${filePath}...`);
        
        // Lire le fichier
        let content = await fs.readFile(filePath, 'utf8');
        
        // Vérifier si le script est déjà présent
        if (content.includes('auto-header.js')) {
            console.log(`  ✓ ${filePath} contient déjà le script auto-header.js`);
            return;
        }
        
        // Chercher la balise </head>
        const headCloseIndex = content.indexOf('</head>');
        if (headCloseIndex === -1) {
            console.log(`  ✗ Impossible de trouver </head> dans ${filePath}`);
            return;
        }
        
        // Construire la ligne du script
        const scriptLine = `    <!-- Header automatique via JavaScript -->\n    <script src="${scriptPath}"></script>\n    `;
        
        // Insérer le script avant la fermeture du head
        content = content.slice(0, headCloseIndex) + scriptLine + content.slice(headCloseIndex);
        
        // Écrire le fichier modifié
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`  ✓ Script ajouté dans ${filePath}`);
        
    } catch (error) {
        console.log(`  ✗ Erreur lors du traitement de ${filePath}: ${error.message}`);
    }
}

/**
 * Fonction principale
 */
async function main() {
    console.log('🚀 Mise à jour automatique des headers HTML...\n');
    
    let processedCount = 0;
    let errorCount = 0;
    
    for (const { file, scriptPath } of FILES_TO_UPDATE) {
        try {
            // Vérifier si le fichier existe
            await fs.access(file);
            await updateHtmlFile(file, scriptPath);
            processedCount++;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`  ⚠️  Fichier non trouvé: ${file}`);
            } else {
                console.log(`  ✗ Erreur: ${file} - ${error.message}`);
                errorCount++;
            }
        }
    }
    
    console.log('\n📊 Résumé:');
    console.log(`   Fichiers traités: ${processedCount}`);
    console.log(`   Erreurs: ${errorCount}`);
    console.log('\n✨ Mise à jour terminée !');
    
    // Instructions pour l'utilisateur
    console.log('\n📝 Instructions:');
    console.log('1. Vérifiez que tous les fichiers ont été mis à jour correctement');
    console.log('2. Testez le site web sur https://xtranumerik-website.pages.dev/');
    console.log('3. Le header devrait maintenant apparaître automatiquement sur toutes les pages');
    console.log('4. Le script détecte automatiquement la langue (FR/EN) et affiche le bon header');
}

// Exécution du script
if (require.main === module) {
    main().catch(console.error);
}