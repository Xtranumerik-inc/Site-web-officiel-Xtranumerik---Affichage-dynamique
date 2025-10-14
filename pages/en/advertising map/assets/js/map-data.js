/* ==============================================
   Advertising Map - Data
   Xtranumerik - 32 Digital Signage Locations
   ============================================== */

const adSpots = [
  { 
    id: 1, 
    lat: 46.4537792, 
    lng: -71.0355562, 
    name: "Gym Elite Coach", 
    visitors: "4,333/month", 
    description: "Busy entrepreneurs, night shift workers, and advanced fitness enthusiasts in Ste-Marie.", 
    facingTo: "A 43'' screen facing exercise equipment, mixed clientele of fitness enthusiasts.", 
    googleMapsUrl: "https://www.google.com/maps/place/Gym+%C3%89lite+Coach+(24%2F7)/@46.4537792,-71.0355562,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/3b92e63b-d8fd-44b4-8922-c5ad17fb06ea/Gym+%C3%89lite+Coach+St-Georges.jpg?format=2500w" 
  },
  { 
    id: 2, 
    lat: 46.4362786, 
    lng: -71.0208288, 
    name: "Restaurant Giovannina", 
    visitors: "10,833/month", 
    description: "Couples on romantic dates, authentic Italian cuisine lovers, and business groups in Ste-Marie.", 
    facingTo: "A 43'' screen placed in takeout queues and dining room entrance, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Giovannina+%7C+Lounge,+Pizza,+Salades+%26+P%C3%A2tes+%C3%A0+Sainte-Marie/@46.4362786,-71.0208288,17z", 
    imageUrl: "" 
  },
  { 
    id: 3, 
    lat: 46.4562891, 
    lng: -71.0363647, 
    name: "Galeries de la Chaudière (3 screens)", 
    visitors: "112,667/month", 
    description: "Shoppers of all ages, teen groups, and families on shopping trips in Ste-Marie.", 
    facingTo: "Three 55'' vertical screens, one per entrance, located directly in shopping center aisles, very busy area with clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Les+Galeries+de+la+Chaudi%C3%A8re/@46.4562891,-71.0363647,17z", 
    imageUrl: "" 
  },
  { 
    id: 4, 
    lat: 46.456531, 
    lng: -71.036253, 
    name: "Restaurant MIKES", 
    visitors: "10,833/month", 
    description: "Multi-generational families, tourists, and breakfast regulars in Ste-Marie.", 
    facingTo: "A 43'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Toujours+Mikes/@46.456531,-71.036253,16z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/16da176c-db54-4116-924d-eaaafbb79c2c/Restaurant+Giovannina.jpg?format=2500w" 
  },
  { 
    id: 5, 
    lat: 46.3096609, 
    lng: -70.8797443, 
    name: "Athletik Culture GYM", 
    visitors: "3,467/month", 
    description: "Active young professionals, amateur athletes, and fitness-conscious individuals in St-Joseph.", 
    facingTo: "A 43'' screen facing exercise equipment, mixed clientele of fitness enthusiasts.", 
    googleMapsUrl: "https://www.google.com/maps/place/Athl%C3%A9tik+Culture+GYM/@46.3096609,-70.8797443,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/def3f0b8-b0da-48ae-a245-90837644710e/Athl%C3%A9tik+Culture+GYM.PNG?format=2500w" 
  },
  { 
    id: 6, 
    lat: 46.3087423, 
    lng: -70.8815006, 
    name: "Resto l'Express", 
    visitors: "4,333/month", 
    description: "Professional truckers, early morning workers, and travelers in transit in St-Joseph.", 
    facingTo: "A 43'' screen facing the main dining room, legal professional clientele (restaurant located across from courthouse) and family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+l'Express/@46.3087423,-70.8815006,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7b272211-07c7-4b35-85d4-581cb62877cd/Resto+l%27Express.jpg?format=2500w" 
  },
  { 
    id: 7, 
    lat: 46.2547, 
    lng: -70.6789, 
    name: "Pharmacie Espace N. Dame", 
    visitors: "6,500/month", 
    description: "Regular patients and families seeking health advice in N. Dame des Pins.", 
    facingTo: "A 43'' screen facing the pharmacy waiting area, family clientele of all ages.", 
    googleMapsUrl: "", 
    imageUrl: "" 
  },
  { 
    id: 8, 
    lat: 46.2272334, 
    lng: -70.513401, 
    name: "Dép. Marché Abénakis", 
    visitors: "15,167/month", 
    description: "Families doing weekly grocery shopping, neighborhood seniors, and local merchants in St-Prosper.", 
    facingTo: "A 32'' screen located right behind the cashier facing customers, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/March%C3%A9+Abenakis/@46.2272334,-70.513401,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/c2d6157a-e6b3-4eb1-a7c1-5edc68f57b81/March%C3%A9+Abenakis.jpg?format=2500w" 
  },
  { 
    id: 9, 
    lat: 46.2106353, 
    lng: -70.4825045, 
    name: "Studio Santé Gym 24h (St-Prosper)", 
    visitors: "2,600/month", 
    description: "Health-conscious local residents, young adults, and shift workers in St-Prosper.", 
    facingTo: "A 43'' screen facing exercise equipment, mixed clientele of fitness enthusiasts.", 
    googleMapsUrl: "https://www.google.com/maps/place/Studio+Sant%C3%A9+Gym+24h/@46.2106353,-70.4825045,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/38f326a-e630fb88-f1d-7b3-dffe0e432fc.jpg?format=2500w" 
  },
  { 
    id: 10, 
    lat: 46.2135047, 
    lng: -70.4786834, 
    name: "Clinic & Pharmacy (2 screens)", 
    visitors: "10,833/month", 
    description: "Patients of all ages, families with children, and seniors requiring regular care in St-Prosper.", 
    facingTo: "Two 43'' screens facing clinic and physio waiting areas, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Clinique+Medicale+St-Prosper/@46.2135047,-70.4786834,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/dde0f0ba-7446-48c5-9e9e-043c719d2d109/Clinique+M%C3%A9dicale+St-Prosper.jpg?format=2500w" 
  },
  { 
    id: 12, 
    lat: 46.1290591, 
    lng: -70.367007, 
    name: "La Bonne Fringale", 
    visitors: "4,333/month", 
    description: "Professionals on business lunches, food lovers, and couples celebrating special occasions in St-Zacharie.", 
    facingTo: "A 43'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+%C3%A0+la+Bonne+Fringale/@46.1290591,-70.367007,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/9d02dec0-44be-47cf-84bb-912c5bf67df2/Restaurant+%C3%A0+la+Bonne+Fringale.jpg?format=2500w" 
  },
  { 
    id: 13, 
    lat: 46.1470763, 
    lng: -70.9063196, 
    name: "Pizzéria Jippy", 
    visitors: "5,200/month", 
    description: "Students, young families on the go, and artisan pizza lovers in St-Victor.", 
    facingTo: "A 50'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Pizzeria+Jippy/@46.1470763,-70.9063196,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/0bd885fb-22cc-4a8b-946c-d657b4f6e72d/Pizza+Jippy.jpg?format=2500w" 
  },
  { 
    id: 14, 
    lat: 45.871817, 
    lng: -70.9853831, 
    name: "Bistro Bonichoix", 
    visitors: "3,900/month", 
    description: "Neighborhood families, seniors, and regular customers looking for fresh products in Courcelle.", 
    facingTo: "A 43'' screen facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/March%C3%A9+Bonichoix+-+Alimentation+Elite+2005+inc./@45.871817,-70.9853831,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/edf0f4da-ad29-44ed-9c91-6ac81be443ec/Screenshot+2025-06-03+171724.png?format=2500w" 
  },
  { 
    id: 15, 
    lat: 46.1044769, 
    lng: -71.2817687, 
    name: "Restaurant le Truc", 
    visitors: "4,333/month", 
    description: "Truckers, rushed travelers, and families on road trips in Thetford.", 
    facingTo: "A 43'' screen facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto-Truc/@46.1044769,-71.2817687,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6bec7d7b-cf26-40c7-8f0f-eace81361594/Resto+truc.jpg?format=2500w" 
  },
  { 
    id: 16, 
    lat: 46.1194527, 
    lng: -70.6706433, 
    name: "Salon Quilles Plus (2 screens)", 
    visitors: "3,467/month", 
    description: "Friend groups, families on outings, and organized bowling leagues in St-Georges.", 
    facingTo: "Two 50'' screens facing bowling lanes, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Salon+Quilles+Chez+Plus/@46.1194527,-70.6706433,17z", 
    imageUrl: "" 
  },
  { 
    id: 17, 
    lat: 46.0953658, 
    lng: -70.6430308, 
    name: "Fromagerie la Pépite d'Or", 
    visitors: "4,333/month", 
    description: "Gourmet tourists, fine cheese lovers, and customers looking for local products in St-Georges.", 
    facingTo: "A 43'' screen placed in takeout queues and dining room entrance, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Fromagerie+la+P%C3%A9pite+d'Or+Inc./@46.0953658,-70.6430308,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/d230aa6c-937a-4da5-a023-0066e482472f/Fromagerie+la+P%C3%A9pite+d%27Or.jpg?format=2500w" 
  },
  { 
    id: 18, 
    lat: 46.1142172, 
    lng: -70.6749684, 
    name: "Restaurant le Sablonet", 
    visitors: "4,333/month", 
    description: "Affluent couples, business groups, and local gastronomy enthusiasts in St-Georges.", 
    facingTo: "A 43'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Le+Sablonet/@46.1142172,-70.6749684,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/9dacd26d-f698-4f8f-81a9-ea19c556ecd9/Restaurant+Le+Sablonet.jpg?format=2500w" 
  },
  { 
    id: 19, 
    lat: 46.0964416, 
    lng: -70.6463177, 
    name: "Studio Santé Gym 24h (2 screens)", 
    visitors: "5,200/month", 
    description: "Active seniors, fitness beginners, and people in physical rehabilitation in St-Georges.", 
    facingTo: "Two 43'' screens, one screen per floor, facing exercise equipment, mixed clientele of fitness enthusiasts.", 
    googleMapsUrl: "https://www.google.com/maps/place/Studio+Sant%C3%A9+Gym+24h/@46.0964416,-70.6463177,17z", 
    imageUrl: "" 
  },
  { 
    id: 20, 
    lat: 46.1168869, 
    lng: -70.6796526, 
    name: "Baril Grill", 
    visitors: "10,833/month", 
    description: "Quality meat lovers, business groups, and couples celebrating special occasions in St-Georges.", 
    facingTo: "A 43'' screen facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Baril+Grill/@46.1168869,-70.6796526,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6f80aaba-f2d4-4ab4-b32b-0540a3301c0d/Baril+Grill.jpg?format=2500w" 
  },
  { 
    id: 21, 
    lat: 46.1090561, 
    lng: -70.655366, 
    name: "Boston Pizza", 
    visitors: "12,133/month", 
    description: "Large families, teen groups, and sports enthusiasts in groups in St-Georges.", 
    facingTo: "A 55'' screen facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Boston+Pizza/@46.1090561,-70.655366,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/7931ff7c-090d-49ac-9b2e-71cbe9312a67/Boston+pizza.png?format=2500w" 
  },
  { 
    id: 22, 
    lat: 46.0845, 
    lng: -70.6523, 
    name: "Martial Arts Center Kaisen", 
    visitors: "867/month", 
    description: "Job seekers, professionals in transition, and recent graduates in St-Georges.", 
    facingTo: "A 43'' screen facing the exercise room, mixed clientele of fitness enthusiasts.", 
    googleMapsUrl: "", 
    imageUrl: "" 
  },
  { 
    id: 23, 
    lat: 46.1504729, 
    lng: -70.7762262, 
    name: "NRJ Spa Nordique", 
    visitors: "3,033/month", 
    description: "Affluent professionals, couples on romantic getaways, and wellness and relaxation enthusiasts in St-Alfred.", 
    facingTo: "A 43'' screen facing the dining room, body care enthusiast clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/NRJ+Spa+Nordique/@46.1504729,-70.7762262,17z", 
    imageUrl: "" 
  },
  { 
    id: 24, 
    lat: 46.0114203, 
    lng: -70.6178217, 
    name: "Resto-Parc 2000", 
    visitors: "1,733/month", 
    description: "Families on Sunday outings, event organizers, and panoramic view enthusiasts in St-René.", 
    facingTo: "A 43'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+Parc+2000+Inc./@46.0114203,-70.6178217,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/ac18f51a-35ee-4315-a920-276f2c0ee0a6/Resto+Parc+2000+Inc.jpg?format=2500w" 
  },
  { 
    id: 25, 
    lat: 45.8576338, 
    lng: -70.6342738, 
    name: "Rotisserie Mom's", 
    visitors: "3,467/month", 
    description: "Young adults 25-40 years old, couples without children, and themed party enthusiasts in St-Gédéon.", 
    facingTo: "A 43'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+mom's/@45.8576338,-70.6342738,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/cf526810-3dc1-4873-9e93-d4ec9d72fa4e/Resto+MOM+PUB.png?format=2500w" 
  },
  { 
    id: 26, 
    lat: 45.9594959, 
    lng: -70.6788479, 
    name: "Casse-Croûte Chez Marie", 
    visitors: "4,333/month", 
    description: "Construction workers, local regulars, and nostalgic fans of traditional Quebec cuisine in St-Martin.", 
    facingTo: "A 43'' screen placed near the cash register facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Casse-Cro%C3%BBte+Chez+Marie/@45.9594959,-70.6788479,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/d5e1c4d2-4a70-4434-bb87-07b90eaf6016/Chez+Marie.PNG.jpg?format=2500w" 
  },
  { 
    id: 28, 
    lat: 45.9607918, 
    lng: -70.8254776, 
    name: "Place St-Honoré", 
    visitors: "6,500/month", 
    description: "Local residents, municipal service visitors, and downtown merchants in St-Honoré.", 
    facingTo: "A 43'' screen facing the waiting room of several specialists (hairdressing, aesthetics, ortho, life coach, pharmacy), family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/477+Rue+Principale,+Saint-Honor%C3%A9-de-Shenley,+QC+B4+7XG/@45.9607918,-70.8254776,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/b5a56569-81bc-4d87-8d68-a6a1b88ae618/Saint-Honor%C3%A9-de-Shenley.jpg?format=2500w" 
  },
  { 
    id: 29, 
    lat: 45.9616571, 
    lng: -70.9373016, 
    name: "Restaurant le Royal", 
    visitors: "4,333/month", 
    description: "Families with children, professionals on lunch break, and friend groups seeking a friendly atmosphere in La Guadeloupe.", 
    facingTo: "A 43'' screen facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Restaurant+Bar+Royal/@45.9616571,-70.9373016,17z", 
    imageUrl: "https://images.squarespace-cdn.com/content/v1/657625271114fa52dac0d038/6aef6a49-2d4d-44da-a813-ab9017c4cde9/%C3%89cran+Royal.png?format=2500w" 
  },
  { 
    id: 30, 
    lat: 46.454214, 
    lng: -71.0386819, 
    name: "Resto L'infusion", 
    visitors: "4,333/month", 
    description: "Welcoming café bistro with warm atmosphere for professionals, students, and families in Ste-Marie.", 
    facingTo: "A 43'' screen facing the dining room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Resto+L'infusion+-+Caf%C3%A9+Bistro/@46.454214,-71.0386819,17z", 
    imageUrl: "" 
  },
  { 
    id: 31, 
    lat: 46.8363753, 
    lng: -71.2950314, 
    name: "Boxe Fit Québec", 
    visitors: "3,900/month", 
    description: "Modern boxing fitness center attracting athletes, combat sports enthusiasts, and people seeking self-improvement in Quebec City.", 
    facingTo: "A 55'' screen facing the waiting room, family clientele of all ages.", 
    googleMapsUrl: "https://www.google.com/maps/place/Boxe+Fit+Qu%C3%A9bec/@46.8363753,-71.2950314,17z", 
    imageUrl: "" 
  },
  { 
    id: 32, 
    lat: 46.2625656, 
    lng: -70.7662964, 
    name: "Beauceville Golf Club", 
    visitors: "5,200/month", 
    description: "Passionate golfers, networking professionals, and outdoor sports enthusiasts in Beauceville.", 
    facingTo: "Two 50'' screens facing bowling lanes, family clientele of all ages and golf enthusiasts.", 
    googleMapsUrl: "https://www.google.com/maps/place/Club+de+Golf+de+Beauceville/@46.2625656,-70.7662964,17z", 
    imageUrl: "" 
  }
];

/**
 * Get screen format based on location
 */
function getScreenFormat(spotId) {
  // Boston Pizza and Boxe Fit Québec have 55" screens
  if (spotId === 21 || spotId === 31) {
    return "55\" HD";
  }
  // Galeries de la Chaudière has 55" vertical screens
  if (spotId === 3) {
    return "55\" Vertical HD";
  }
  // Beauceville Golf Club, Salon Quilles Plus, and Pizzéria Jippy have 50" screens
  if (spotId === 32 || spotId === 16 || spotId === 13) {
    return "50\" HD";
  }
  // Dép. Marché Abénakis has a 32" screen
  if (spotId === 8) {
    return "32\" HD";
  }
  // By default, all others have 43" screens
  return "43\" HD";
}