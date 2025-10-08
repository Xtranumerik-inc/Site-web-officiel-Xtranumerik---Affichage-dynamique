/* ==============================================
   Carte Publicitaire - Données
   Xtranumerik - 32 Emplacements d'affichage dynamique
   ============================================== */

const adSpots = [
  { 
    id: 1, 
    lat: 46.4537792, 
    lng: -71.0355562, 
    name: "Gym Élite Coach", 
    visitors: "4,333/mois", 
    description: "Entrepreneurs occupés, travailleurs de nuit et passionnés de fitness avancé à Ste-Marie.", 
    facingTo: "un écran de 43'' orienté vers les appareils d'exercice, clientèle mixte d'amateurs de forme physique.", 
    googleMapsUrl: "https://www.google.com/maps/place/Gym+%C3%89lite+Coach+(24%2F7)/@46.4537792,-71.0355562,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3b92e63b-d8fd-44b4-8922-c5ad17fb06ea/Gym+%C3%89lite+Coach+St-Georges.jpg?format=2500w" 
  },
  { 
    id: 2, 
    lat: 46.4362786, 
    lng: -71.0208288, 
    name: "Restaurant Giovannina", 
    visitors: "10,833/mois", 
    description: "Couples en rendez-vous romantique, amateurs de cuisine italienne authentique et groupes d'affaires à Ste-Marie.", 
    facingTo: "Un écran de 43'' placé dans les files d'attente pour les plats à emporter et à l'entrée de la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Giovannina+%7C+Lounge,+Pizza,+Salades+%26+P%C3%A2tes+%C3%A0+Sainte-Marie/@46.4362786,-71.0208288,17z", 
    imageUrl: "" 
  },
  { 
    id: 3, 
    lat: 46.4562891, 
    lng: -71.0363647, 
    name: "Galeries de la Chaudière (3 écrans)", 
    visitors: "112,667/mois", 
    description: "Shoppers de tous âges, adolescents en groupe et familles en sortie shopping à Ste-Marie.", 
    facingTo: "Trois écrans de 55'' vertical, une par entrée, situés directement dans les allées du centre d'achats, endroits très achalandé par une clientèles de tous âges", 
    googleMapsUrl: "https://www.google.com/maps/place/Les+Galeries+de+la+Chaudi%C3%A8re/@46.4562891,-71.0363647,17z", 
    imageUrl: "" 
  },
  { 
    id: 4, 
    lat: 46.456531, 
    lng: -71.036253, 
    name: "Restaurant MIKES", 
    visitors: "10,833/mois", 
    description: "Familles multi-générationnelles, touristes et habitués du déjeuner à Ste-Marie.", 
    facingTo: "Un écran de 43'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Toujours+Mikes/@46.456531,-71.036253,16z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/16da176c-db54-4116-924d-eaaafbb79c2c/Restaurant+Giovannina.jpg?format=2500w" 
  },
  { 
    id: 5, 
    lat: 46.3096609, 
    lng: -70.8797443, 
    name: "Athletik Culture GYM", 
    visitors: "3,467/mois", 
    description: "Jeunes professionnels actifs, athlètes amateurs et personnes soucieuses de leur condition physique à St-Joseph.", 
    facingTo: "un écran de 43'' orienté vers les appareils d'exercice, clientèle mixte d'amateurs de forme physique.", 
    googleMapsUrl: "https://www.google.com/maps/place/Athl%C3%A9tik+Culture+GYM/@46.3096609,-70.8797443,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/def3f0b8-b0da-48ae-a245-90837644710e/Athl%C3%A9tik+Culture+GYM.PNG?format=2500w" 
  },
  { 
    id: 6, 
    lat: 46.3087423, 
    lng: -70.8815006, 
    name: "Resto l'Express", 
    visitors: "4,333/mois", 
    description: "Routiers professionnels, travailleurs matinaux et voyageurs en transit à St-Joseph.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger principale, clientèle de personne de droit (resto situé en face du palais de justice) et familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+l'Express/@46.3087423,-70.8815006,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7b272211-07c7-4b35-85d4-581cb62877cd/Resto+l%27Express.jpg?format=2500w" 
  },
  { 
    id: 7, 
    lat: 46.2547, 
    lng: -70.6789, 
    name: "Pharmacie Espace N. Dame", 
    visitors: "6,500/mois", 
    description: "Patients réguliers et familles cherchant des conseils santé à N. Dame des Pins.", 
    facingTo: "Un écran de 43'' orienté vers la salle d'attente de la pharmacie, clientèle familiale de tous âges.", 
    googleMapsUrl: "", 
    imageUrl: "" 
  },
  { 
    id: 8, 
    lat: 46.2272334, 
    lng: -70.513401, 
    name: "Dép. Marché Abénakis", 
    visitors: "15,167/mois", 
    description: "Familles faisant l'épicerie hebdomadaire, personnes âgées du quartier et commerçants locaux à St-Prosper.", 
    facingTo: "Un écran de 32'' situé juste derière la caissière face au clients, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/March%C3%A9+Abenakis/@46.2272334,-70.513401,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c2d6157a-e6b3-4eb1-a7c1-5edc68f57b81/March%C3%A9+Abenakis.jpg?format=2500w" 
  },
  { 
    id: 9, 
    lat: 46.2106353, 
    lng: -70.4825045, 
    name: "Studio Santé Gym 24h (St-Prosper)", 
    visitors: "2,600/mois", 
    description: "Résidents locaux soucieux de leur santé, jeunes adultes et travailleurs de quarts à St-Prosper.", 
    facingTo: "un écran de 43'' orienté vers les appareils d'exercice, clientèle mixte d'amateurs de forme physique.", 
    googleMapsUrl: "https://www.google.com/maps/place/Studio+Sant%C3%A9+Gym+24h/@46.2106353,-70.4825045,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/38f326a-e630fb88-f1d-7b3-dffe0e432fc.jpg?format=2500w" 
  },
  { 
    id: 10, 
    lat: 46.2135047, 
    lng: -70.4786834, 
    name: "Clinique & Pharmacie (2 écrans)", 
    visitors: "10,833/mois", 
    description: "Patients de tous âges, familles avec enfants et personnes âgées nécessitant des soins réguliers à St-Prosper.", 
    facingTo: "Deux écrans de 43'' orienté vers les salles d'attente de la clinique et du physio, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Clinique+Medicale+St-Prosper/@46.2135047,-70.4786834,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/dde0f0ba-7446-48c5-9e9e-043c719d2d109/Clinique+M%C3%A9dicale+St-Prosper.jpg?format=2500w" 
  },
  { 
    id: 12, 
    lat: 46.1290591, 
    lng: -70.367007, 
    name: "La Bonne Fringale", 
    visitors: "4,333/mois", 
    description: "Professionnels en lunch d'affaires, gastronomes et couples célébrant des occasions spéciales à St-Zacharie.", 
    facingTo: "Un écran de 43'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+%C3%A0+la+Bonne+Fringale/@46.1290591,-70.367007,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/9d02dec0-44be-47cf-84bb-912c5bf67df2/Restaurant+%C3%A0+la+Bonne+Fringale.jpg?format=2500w" 
  },
  { 
    id: 13, 
    lat: 46.1470763, 
    lng: -70.9063196, 
    name: "Pizzéria Jippy", 
    visitors: "5,200/mois", 
    description: "Étudiants, jeunes familles pressées et amateurs de pizza artisanale à St-Victor.", 
    facingTo: "Un écran de 50'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Pizzeria+Jippy/@46.1470763,-70.9063196,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/0bd885fb-22cc-4a8b-946c-d657b4f6e72d/Pizza+Jippy.jpg?format=2500w" 
  },
  { 
    id: 14, 
    lat: 45.871817, 
    lng: -70.9853831, 
    name: "Bistro Bonichoix", 
    visitors: "3,900/mois", 
    description: "Familles du quartier, personnes âgées et clients réguliers cherchant des produits frais à Courcelle.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/March%C3%A9+Bonichoix+-+Alimentation+Elite+2005+inc./@45.871817,-70.9853831,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/edf0f4da-ad29-44ed-9c91-6ac81be443ec/Screenshot+2025-06-03+171724.png?format=2500w" 
  },
  { 
    id: 15, 
    lat: 46.1044769, 
    lng: -71.2817687, 
    name: "Restaurant le Truc", 
    visitors: "4,333/mois", 
    description: "Camionneurs, voyageurs pressés et familles en road trip à Thetford.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto-Truc/@46.1044769,-71.2817687,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6bec7d7b-cf26-40c7-8f0f-eace81361594/Resto+truc.jpg?format=2500w" 
  },
  { 
    id: 16, 
    lat: 46.1194527, 
    lng: -70.6706433, 
    name: "Salon Quilles Plus (2 écrans)", 
    visitors: "3,467/mois", 
    description: "Groupes d'amis, familles en sortie et ligues de quilles organisées à St-Georges.", 
    facingTo: "Deux écrans de 50'' orienté vers les allées de quilles, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Salon+Quilles+Chez+Plus/@46.1194527,-70.6706433,17z", 
    imageUrl: "" 
  },
  { 
    id: 17, 
    lat: 46.0953658, 
    lng: -70.6430308, 
    name: "Fromagerie la Pépite d'Or", 
    visitors: "4,333/mois", 
    description: "Touristes gourmands, amateurs de fromages fins et clients cherchant des produits locaux à St-Georges.", 
    facingTo: "Un écran de 43'' placé dans les files d'attente pour les plats à emporter et à l'entrée de la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Fromagerie+la+P%C3%A9pite+d'Or+Inc./@46.0953658,-70.6430308,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/d230aa6c-937a-4da5-a023-0066e482472f/Fromagerie+la+P%C3%A9pite+d%27Or.jpg?format=2500w" 
  },
  { 
    id: 18, 
    lat: 46.1142172, 
    lng: -70.6749684, 
    name: "Restaurant le Sablonet", 
    visitors: "4,333/mois", 
    description: "Couples aisés, groupes d'affaires et amateurs de gastronomie locale à St-Georges.", 
    facingTo: "Un écran de 43'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Le+Sablonet/@46.1142172,-70.6749684,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/9dacd26d-f698-4f8f-81a9-ea19c556ecd9/Restaurant+Le+Sablonet.jpg?format=2500w" 
  },
  { 
    id: 19, 
    lat: 46.0964416, 
    lng: -70.6463177, 
    name: "Studio Santé Gym 24h (2 écrans)", 
    visitors: "5,200/mois", 
    description: "Personnes âgées actives, débutants en fitness et personnes en réadaptation physique à St-Georges.", 
    facingTo: "Deux écrans de 43'' un ecran chaque étage, orienté vers les appareils d'exercice, clientèle mixte d'amateurs de forme physique.", 
    googleMapsUrl: "https://www.google.com/maps/place/Studio+Sant%C3%A9+Gym+24h/@46.0964416,-70.6463177,17z", 
    imageUrl: "" 
  },
  { 
    id: 20, 
    lat: 46.1168869, 
    lng: -70.6796526, 
    name: "Baril Grill", 
    visitors: "10,833/mois", 
    description: "Amateurs de viande de qualité, groupes d'affaires et couples célébrant des occasions spéciales à St-Georges.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Baril+Grill/@46.1168869,-70.6796526,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6f80aaba-f2d4-4ab4-b32b-0540a3301c0d/Baril+Grill.jpg?format=2500w" 
  },
  { 
    id: 21, 
    lat: 46.1090561, 
    lng: -70.655366, 
    name: "Boston Pizza", 
    visitors: "12,133/mois", 
    description: "Familles nombreuses, groupes d'adolescents et amateurs de sports en groupe à St-Georges.", 
    facingTo: "Un écran de 55'' orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Boston+Pizza/@46.1090561,-70.655366,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7931ff7c-090d-49ac-9b2e-71cbe9312a67/Boston+pizza.png?format=2500w" 
  },
  { 
    id: 22, 
    lat: 46.0845, 
    lng: -70.6523, 
    name: "Centre d'art martiaux Kaisen", 
    visitors: "867/mois", 
    description: "Demandeurs d'emploi, professionnels en transition et jeunes diplômés à St-Georges.", 
    facingTo: "un écran de 43'' orienté vers la salle d'exercises, clientèle mixte d'amateurs de forme physique.", 
    googleMapsUrl: "", 
    imageUrl: "" 
  },
  { 
    id: 23, 
    lat: 46.1504729, 
    lng: -70.7762262, 
    name: "NRJ Spa Nordique", 
    visitors: "3,033/mois", 
    description: "Professionnels aisés, couples en escapade romantique et amateurs de bien-être et détente à St-Alfred.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger, clientèle amateur de soins du corps de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/NRJ+Spa+Nordique/@46.1504729,-70.7762262,17z", 
    imageUrl: "" 
  },
  { 
    id: 24, 
    lat: 46.0114203, 
    lng: -70.6178217, 
    name: "Resto-Parc 2000", 
    visitors: "1,733/mois", 
    description: "Familles en sortie dominicale, organisateurs d'événements et amateurs de vues panoramiques à St-René.", 
    facingTo: "Un écran de 43'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+Parc+2000+Inc./@46.0114203,-70.6178217,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/ac18f51a-35ee-4315-a920-276f2c0ee0a6/Resto+Parc+2000+Inc.jpg?format=2500w" 
  },
  { 
    id: 25, 
    lat: 45.8576338, 
    lng: -70.6342738, 
    name: "Rotisserie Mom's", 
    visitors: "3,467/mois", 
    description: "Jeunes adultes 25-40 ans, couples sans enfants et amateurs de soirées thématiques à St-Gédéon.", 
    facingTo: "Un écran de 43'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+mom's/@45.8576338,-70.6342738,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/cf526810-3dc1-4873-9e93-d4ec9d72fa4e/Resto+MOM+PUB.png?format=2500w" 
  },
  { 
    id: 26, 
    lat: 45.9594959, 
    lng: -70.6788479, 
    name: "Casse-Croûte Chez Marie", 
    visitors: "4,333/mois", 
    description: "Travailleurs de la construction, habitués locaux et nostalgiques de la cuisine québécoise traditionnelle à St-Martin.", 
    facingTo: "Un écran de 43'' placé près de la caisse orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Casse-Cro%C3%BBte+Chez+Marie/@45.9594959,-70.6788479,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/d5e1c4d2-4a70-4434-bb87-07b90eaf6016/Chez+Marie.PNG.jpg?format=2500w" 
  },
  { 
    id: 28, 
    lat: 45.9607918, 
    lng: -70.8254776, 
    name: "Place St-Honoré", 
    visitors: "6,500/mois", 
    description: "Résidents locaux, visiteurs des services municipaux et commerçants du centre-ville de St-Honoré.", 
    facingTo: "Un écran de 43'' orienté vers la salle d'Attente des plusieurs spécialiste ( coiffure, estetique, ortho, coach de vie, pharmacie, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/477+Rue+Principale,+Saint-Honor%C3%A9-de-Shenley,+QC+B4+7XG/@45.9607918,-70.8254776,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/b5a56569-81bc-4d87-8d68-a6a1b88ae618/Saint-Honor%C3%A9-de-Shenley.jpg?format=2500w" 
  },
  { 
    id: 29, 
    lat: 45.9616571, 
    lng: -70.9373016, 
    name: "Restaurant le Royal", 
    visitors: "4,333/mois", 
    description: "Familles avec enfants, professionnels en pause déjeuner et groupes d'amis recherchant une ambiance conviviale à La Guadeloupe.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Bar+Royal/@45.9616571,-70.9373016,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6aef6a49-2d4d-44da-a813-ab9017c4cde9/%C3%89cran+Royal.png?format=2500w" 
  },
  { 
    id: 30, 
    lat: 46.454214, 
    lng: -71.0386819, 
    name: "Resto L'infusion", 
    visitors: "4,333/mois", 
    description: "Café bistro accueillant avec ambiance chaleureuse pour professionnels, étudiants et familles à Ste-Marie.", 
    facingTo: "Un écran de 43'' orienté vers la salle à manger, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+L'infusion+-+Caf%C3%A9+Bistro/@46.454214,-71.0386819,17z", 
    imageUrl: "" 
  },
  { 
    id: 31, 
    lat: 46.8363753, 
    lng: -71.2950314, 
    name: "Boxe Fit Québec", 
    visitors: "3,900/mois", 
    description: "Centre de boxe fitness moderne attirant athlètes, amateurs de sports de combat et personnes en quête de dépassement à Québec.", 
    facingTo: "Un écran de 55'' orienté vers la salle d'attente, clientèle familiale de tous âges.", 
    googleMapsUrl: "https://www.google.com/maps/place/Boxe+Fit+Qu%C3%A9bec/@46.8363753,-71.2950314,17z", 
    imageUrl: "" 
  },
  { 
    id: 32, 
    lat: 46.2625656, 
    lng: -70.7662964, 
    name: "Club de Golf de Beauceville", 
    visitors: "5,200/mois", 
    description: "Golfeurs passionnés, professionnels en réseautage et amateurs de sports extérieurs à Beauceville.", 
    facingTo: "Deux écrans de 50'' orientés vers les allées de quilles, clientèle familiale de tous âges et amateurs de golf.", 
    googleMapsUrl: "https://www.google.com/maps/place/Club+de+Golf+de+Beauceville/@46.2625656,-70.7662964,17z", 
    imageUrl: "" 
  }
];

// Fonction pour obtenir le format d'écran selon l'emplacement
function getScreenFormat(spotId) {
  // Boston Pizza et Boxe Fit Québec ont des écrans de 55"
  if (spotId === 21 || spotId === 31) {
    return "55\" HD";
  }
  // Galeries de la Chaudière a des écrans de 55" vertical
  if (spotId === 3) {
    return "55\" Vertical HD";
  }
  // Club de Golf de Beauceville et Salon Quilles Plus ont des écrans de 50"
  if (spotId === 32 || spotId === 16 || spotId === 13) {
    return "50\" HD";
  }
  // Dép. Marché Abénakis a un écran de 32"
  if (spotId === 8) {
    return "32\" HD";
  }
  // Par défaut, tous les autres ont des écrans de 43"
  return "43\" HD";
}
