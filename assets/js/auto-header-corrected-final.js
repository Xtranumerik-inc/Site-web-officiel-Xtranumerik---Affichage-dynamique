/**
 * Script d'injection automatique du header Xtranumerik
 * VERSION FINALE CORRIGÉE - Navigation intelligente entre langues
 * 
 * CORRECTION PRINCIPALE: Le système de switch de langue pointe maintenant
 * vers la page équivalente dans l'autre langue au lieu de toujours pointer vers index.html
 * 
 * Date de correction: 27 août 2025
 */

(function() {
    'use strict';

    // Configuration globale du système de header
    const HEADER_CONFIG = {
        // Mapping complet des pages français