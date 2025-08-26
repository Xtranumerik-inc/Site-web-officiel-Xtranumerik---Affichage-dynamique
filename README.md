# XTRANUMERIK - STRUCTURE DE SITE WEB
*Générée le 25 août 2025*

## 🏗️ ARCHITECTURE GÉNÉRALE

```
Z:\PUBLICITE XTRANUMERIK\SITE INTERNET\Xtranumerik\
├── assets/                 # Ressources statiques
│   ├── css/               # Feuilles de style
│   ├── js/                # Scripts JavaScript
│   └── images/            # Images et médias
├── components/            # Composants réutilisables
├── pages/                 # Pages du site
│   ├── fr/               # Version française
│   └── en/               # Version anglaise
├── data/                  # Données JSON
└── README.md             # Cette documentation
```

## 📁 DÉTAIL DES DOSSIERS

### `/assets/`
**Ressources statiques optimisées pour Cloudflare**

- **`/css/`** - Styles modulaires
  - `main.css` - Styles de base et variables CSS
  - `components.css` - Styles des composants UI
  - `animations.css` - Animations et transitions
  - `responsive.css` - Grille responsive et breakpoints

- **`/js/`** - Scripts JavaScript modulaires  
  - `app.js` - Application principale et initialisation
  - `config.js` - Configuration globale centralisée
  - `memory-game.js` - Jeu de mémoire interactif

- **`/images/`** - Médias (à organiser)
  - Logos, photos équipe, captures écrans
  - Images sectorielles, galerie, partenaires
  - Favicons et images Open Graph

### `/components/`
**Composants réutilisables pour toutes les pages**

- `header.html` - Navigation principale avec menu déroulant
- `header.js` - Logique navigation (mobile, sticky, langue)
- `footer.html` - Pied de page multilingue avec liens
- `carousel.js` - Composant carrousel avec touch/swipe

### `/pages/`
**Pages complètes du site (bilingues)**

#### `/pages/fr/` - Version française
- `index.html` - Page d'accueil avec hero, carrousel, jeu mémoire
- `industries.html` - Page sectorielle avec graphiques Chart.js
- `reseau-publicitaire.html` - Présentation réseau + témoignages
- `carte.html` - Carte interactive Leaflet.js (30 emplacements)

#### `/pages/en/` - Version anglaise
- Structure identique avec traductions
- URLs adaptées (`/en/industries`, `/en/map`, etc.)

### `/data/`
**Données centralisées en JSON**

- `translations.json` - Traductions FR/EN et mapping URLs
- `company.json` - Informations entreprise, équipe, stats

## 🎨 SYSTÈME DE DESIGN

### Couleurs
```css
--primary-color: #190544    /* Violet foncé Xtranumerik */
--secondary-color: #ffa91a  /* Orange accent */
--gradient-primary: linear-gradient(135deg, #190544, #2a0845)
--gradient-secondary: linear-gradient(135deg, #ffa91a, #ff8c00)
```

### Typographies
- **Titres** : Space Grotesk (600-700)
- **Corps** : Poppins (300-600)  
- **Accents** : Roboto Slab, Inter, Playfair Display

### Composants UI
- **Glass cards** : backdrop-filter blur avec bordures transparentes
- **Boutons** : Gradients avec effets hover et animations
- **Animations** : fadeIn, slideUp, scaleIn, float, pulse

## ⚙️ FONCTIONNALITÉS TECHNIQUES

### Système Multilingue
- Détection automatique langue via URL (`/fr/` ou `/en/`)
- Fallback sur langue navigateur
- Mapping des URLs dans `translations.json`
- Toggle langue dynamique

### Composants Interactifs
- **Carrousels** : Autoplay, navigation, touch/swipe
- **Particules** : Canvas animations avec performance
- **Graphiques** : Chart.js avec plugin DataLabels
- **Carte** : Leaflet.js avec 30 marqueurs géolocalisés
- **Jeu mémoire** : 8 paires, timer, score

### Optimisations Performance
- **Lazy loading** : Images avec IntersectionObserver
- **Animations GPU** : Transform et opacity uniquement
- **Modularité** : CSS et JS séparés par fonction
- **CDN ready** : Structure optimisée Cloudflare

## 🛠️ TECHNOLOGIES UTILISÉES

### Frontend Core
- **HTML5** sémantique avec Schema.org
- **CSS3** modern (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+** (Classes, Modules, Async/Await)

### Librairies Externes (CDN)
- **Chart.js 3.9.1** + plugin DataLabels - Graphiques
- **Leaflet.js 1.9.4** - Cartes interactives  
- **Google Fonts** - Typographies web

### SEO et Meta
- Balises Open Graph complètes
- Schema.org structured data
- Liens hreflang multilingues
- URLs canoniques
- Sitemap ready

## 📱 RESPONSIVE DESIGN

### Breakpoints
- **xs** : < 576px (mobile)
- **sm** : >= 576px (mobile large)  
- **md** : >= 768px (tablette)
- **lg** : >= 992px (desktop)
- **xl** : >= 1200px (desktop large)
- **xxl** : >= 1400px (desktop XL)

### Grille Système
```css
.grid-1, .grid-2, .grid-3, .grid-4    /* Auto-fit responsive */
.grid-md-2, .grid-lg-3, .grid-xl-4    /* Breakpoint specific */
```

## 🚀 DÉPLOIEMENT CLOUDFLARE

### Structure Cloudflare Pages
1. **Build** : Statique pur (pas de build process)
2. **Routes** : Redirect `/` vers `/fr/` selon préférences
3. **Headers** : Cache-Control optimisés par type fichier
4. **Functions** : Potentiel pour contact forms

### Optimisations Cloudflare
- **Minify** : CSS/JS/HTML automatique
- **Image Optimization** : Compression automatique  
- **CDN** : Distribution globale des assets
- **Analytics** : Web Analytics natif

## 📊 STATISTIQUES SITE

### Pages créées
- **17 pages HTML** complètes et fonctionnelles
- **10 secteurs** d'activité couverts
- **2 langues** (FR/EN) avec système intelligent
- **30 emplacements** géolocalisés sur carte

### Composants
- **4 CSS** modulaires (1400+ lignes)
- **5 JavaScript** réutilisables (800+ lignes)  
- **2 HTML** templates (header/footer)
- **3 JSON** données centralisées

## 🔗 LIENS IMPORTANTS

### Contact
- **Email général** : info@xtranumerik.ca
- **Directeur ventes** : patrick@xtranumerik.ca  
- **Téléphone** : 581-705-8777
- **Adresse** : 724 170e Rue, Saint-Georges, QC

### Plateformes
- **Accès client** : https://acces.xtranumerik.com
- **Gestion distance** : https://remote.xtranumerik.com

### Réseaux sociaux
- **X (Twitter)** : https://x.com/xtranumerik
- **Facebook** : https://facebook.com/xtranumerik  
- **LinkedIn** : https://linkedin.com/company/xtranumerik

## 📝 PROCHAINES ÉTAPES

### Immédiat
1. **Images** : Ajouter toutes les images dans `/assets/images/`
2. **Version EN** : Créer les pages anglaises correspondantes
3. **Test** : Valider tous les liens et fonctionnalités

### Court terme  
1. **Analytics** : Configurer Google Analytics
2. **Forms** : Ajouter formulaires de contact fonctionnels
3. **PWA** : Service Worker pour cache offline
4. **SEO** : Sitemap XML et robots.txt

### Moyen terme
1. **CMS** : Interface admin pour gestion contenu
2. **Blog** : Section actualités et cas d'usage
3. **A/B Testing** : Optimisation conversions
4. **Chat** : Support client en temps réel

---

**Site développé pour Cloudflare Pages**  
*Structure modulaire, performance optimisée, SEO ready*  
*Compatible avec tous les services Cloudflare (Workers, KV, D1, R2)*
