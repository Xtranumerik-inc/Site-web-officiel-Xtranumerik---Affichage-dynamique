# Header Component - Structure Modulaire

Structure organisée et modulaire pour le header du site Xtranumerik.

## 📁 Structure des fichiers

```
components/header/
├── index.html              # Fichier principal à inclure dans vos pages
├── html/                   # Composants HTML individuels
│   ├── logo.html
│   ├── navigation.html
│   ├── dropdown.html
│   ├── language-switcher.html
│   └── hamburger.html
├── css/                    # Styles modulaires
│   ├── base.css           # Styles de base et container
│   ├── navigation.css     # Styles de navigation
│   ├── dropdown.css       # Styles du menu déroulant
│   └── responsive.css     # Media queries et responsive
└── js/                     # Scripts modulaires (ES6 modules)
    ├── translations.js    # Données de traduction FR/EN
    ├── language.js        # Gestion du changement de langue
    ├── dropdown.js        # Fonctionnalité du menu déroulant
    ├── hamburger.js       # Fonctionnalité du menu mobile
    └── init.js            # Point d'entrée et initialisation
```

## 🚀 Utilisation

### Inclusion dans vos pages HTML

Remplacez l'ancienne inclusion du header par:

```html
<!-- Inclure le header modulaire -->
<script src="/path/to/load-header.js"></script>
```

Ou incluez directement le composant:

```html
<!-- Option: Inclusion directe (iframe, include, etc.) -->
<iframe src="/components/header/index.html" style="width:100%; border:none;"></iframe>
```

### Structure du fichier principal

Le fichier `index.html` charge automatiquement:
- ✅ Tous les styles CSS (base, navigation, dropdown, responsive)
- ✅ Google Fonts (Inter)
- ✅ Tous les modules JavaScript
- ✅ Structure HTML complète du header

## 🎨 Personnalisation

### Modifier les styles

Chaque fichier CSS est indépendant:

- **base.css**: Container principal, logo, reset CSS
- **navigation.css**: Boutons de navigation, langue, hamburger
- **dropdown.css**: Menu déroulant industries
- **responsive.css**: Breakpoints mobile/tablet

### Modifier les traductions

Éditez `js/translations.js` pour ajouter/modifier:
- Textes FR/EN
- URLs des pages
- Descriptions du dropdown

### Ajouter une nouvelle langue

1. Ajoutez la langue dans `js/translations.js`
2. Créez le mapping d'URLs dans `urlMapFrToEn`
3. Mettez à jour `js/language.js` si nécessaire

## 🔧 Fonctionnalités

### Traduction automatique
Le header détecte automatiquement la langue de la page (`/fr/` ou `/en/`) et:
- ✅ Traduit tous les textes
- ✅ Met à jour les URLs
- ✅ Change les liens du dropdown
- ✅ Configure le bouton de changement de langue

### Menu déroulant
- Simple clic: ouvre/ferme le menu
- Double clic: aucune action (évite la navigation)
- Clic extérieur: ferme le menu
- Clic sur item: navigue et ferme le menu

### Menu mobile (hamburger)
- Affichage automatique en dessous de 768px
- Animation fluide
- Fermeture automatique après clic sur un lien

## 🐛 Débogage

Les modules JavaScript utilisent `console.log()` pour le débogage:
- Langue détectée
- URLs générées
- Changements de langue

## 📝 Notes techniques

- **ES6 Modules**: Utilise `import/export` (nécessite `type="module"`)
- **Font loading**: Police Inter chargée automatiquement
- **CSS Variables**: Possibilité d'ajouter des variables CSS pour personnalisation
- **No jQuery**: Vanilla JavaScript uniquement

## 🔄 Migration depuis l'ancienne version

Anciens fichiers supprimés:
- ❌ `components/header.html`
- ❌ `components/header.css`  
- ❌ `components/header.js`
- ❌ `components/header-fixed.html`

Nouveau point d'entrée:
- ✅ `components/header/index.html`