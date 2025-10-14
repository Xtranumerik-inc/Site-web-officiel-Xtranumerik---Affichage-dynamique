// Translation data and URL mappings
export const translations = {
    fr: {
        affichage: { text: "Gestion d'affichage dynamique", href: "#" },
        reseau: { text: "Carte Publicitaire", href: "/pages/fr/carte%20publicitaire.html" },
        contact: { text: "Contact", href: "/pages/fr/contact.html" },
        login: { text: "Se Connecter", href: "/pages/fr/connexion.html" },
        logoHref: "/pages/fr/index.html",
        dropdown: [
            { href: "/pages/fr/industries.html", text: "Industries", alt: "Industries", desc: "Affiche les métriques de production et les alertes de sécurité." },
            { href: "/pages/fr/gyms.html", text: "Gyms", alt: "Gyms", desc: "Présente les horaires de cours et des conseils de fitness." },
            { href: "/pages/fr/restaurants.html", text: "Restaurants", alt: "Restaurants", desc: "Affiche les menus et les offres spéciales." },
            { href: "/pages/fr/concessions-auto.html", text: "Concessions automobiles", alt: "Concessions automobiles", desc: "Met en avant les promotions et les véhicules en vedette." },
            { href: "/pages/fr/hotels.html", text: "Hôtels", alt: "Hôtels", desc: "Informe sur les services et les événements." },
            { href: "/pages/fr/centres-commerciaux.html", text: "Centres commerciaux", alt: "Centres commerciaux", desc: "Guide les visiteurs avec des plans et des promotions." },
            { href: "/pages/fr/commerce-detail.html", text: "Commerces de détail", alt: "Commerces de détail", desc: "Met en valeur les produits et les promotions." },
            { href: "/pages/fr/pharmacies.html", text: "Pharmacies", alt: "Pharmacies", desc: "Promeut les produits de santé et les rappels." },
            { href: "/pages/fr/cliniques-dentaires.html", text: "Cliniques dentaires", alt: "Cliniques dentaires", desc: "Affiche les services, promotions et conseils d'hygiène." },
            { href: "/pages/fr/salons-coiffure.html", text: "Salons de coiffure", alt: "Salons de coiffure", desc: "Présente les services et les promotions." }
        ]
    },
    en: {
        affichage: { text: "Dynamic Display Management", href: "#" },
        reseau: { text: "Advertising Map", href: "/pages/en/advertising%20map.html" },
        contact: { text: "Contact", href: "/pages/en/contact.html" },
        login: { text: "Log In", href: "/pages/en/login.html" },
        logoHref: "/pages/en/index.html",
        dropdown: [
            { href: "/pages/en/industries.html", text: "Industries", alt: "Industries", desc: "Displays production metrics and safety alerts." },
            { href: "/pages/en/gyms.html", text: "Gyms", alt: "Gyms", desc: "Shows class schedules and fitness tips." },
            { href: "/pages/en/restaurants.html", text: "Restaurants", alt: "Restaurants", desc: "Presents menus and special offers." },
            { href: "/pages/en/car-dealerships.html", text: "Car Dealerships", alt: "Car Dealerships", desc: "Highlights promotions and featured vehicles." },
            { href: "/pages/en/hotels.html", text: "Hotels", alt: "Hotels", desc: "Informs about services and events." },
            { href: "/pages/en/shopping-centers.html", text: "Shopping Centers", alt: "Shopping Centers", desc: "Guides visitors with maps and promotions." },
            { href: "/pages/en/retail-stores.html", text: "Retail Stores", alt: "Retail Stores", desc: "Showcases products and promotions." },
            { href: "/pages/en/pharmacies.html", text: "Pharmacies", alt: "Pharmacies", desc: "Promotes health products and reminders." },
            { href: "/pages/en/dental-clinics.html", text: "Dental Clinics", alt: "Dental Clinics", desc: "Displays services, promotions, and hygiene tips." },
            { href: "/pages/en/hair-salons.html", text: "Hair Salons", alt: "Hair Salons", desc: "Presents services and promotions." }
        ]
    }
};

// URL mapping FR to EN
export const urlMapFrToEn = {
    '': '',
    'index.html': 'index.html',
    'carte%20publicitaire.html': 'advertising%20map.html',
    'contact.html': 'contact.html',
    'connexion.html': 'login.html',
    'industries.html': 'industries.html',
    'gyms.html': 'gyms.html',
    'restaurants.html': 'restaurants.html',
    'concessions-auto.html': 'car-dealerships.html',
    'hotels.html': 'hotels.html',
    'centres-commerciaux.html': 'shopping-centers.html',
    'commerce-detail.html': 'retail-stores.html',
    'pharmacies.html': 'pharmacies.html',
    'cliniques-dentaires.html': 'dental-clinics.html',
    'salons-coiffure.html': 'hair-salons.html'
};

// URL mapping EN to FR (inverse)
export const urlMapEnToFr = {};
for (let key in urlMapFrToEn) {
    urlMapEnToFr[urlMapFrToEn[key]] = key;
}