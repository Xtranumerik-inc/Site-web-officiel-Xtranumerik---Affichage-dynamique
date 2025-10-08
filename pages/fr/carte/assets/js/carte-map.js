/* ==============================================
   Carte Publicitaire - Logique de la carte
   Leaflet Map & Markers Management
   ============================================== */

let mapFr;
let markers = [];
let selectedLocationId = null;

/**
 * Initialise la carte et toutes les fonctionnalités
 */
function initializeMapAndFeatures() {
  try {
    mapFr = initializeMap('map-fr', 'fr');
    if (mapFr) {
      initializeCart();
      setupCartEvents();
      loadCartFromStorage();
      generateLocationList();
    }
    
    window.addEventListener('resize', () => {
      if (mapFr) {
        mapFr.invalidateSize();
      }
    });
  } catch (e) {
    console.error('Erreur lors de l\'initialisation:', e);
    document.getElementById('map-fr').innerHTML = '<p class="error-message">Erreur de chargement de la carte.</p>';
  }
}

/**
 * Initialise la carte Leaflet
 */
function initializeMap(mapId, lang) {
  try {
    console.log('Initialisation de la carte...');
    
    if (typeof L === 'undefined') {
      throw new Error('Leaflet non chargé');
    }
    
    const map = L.map(mapId).setView([46.0, -70.7], 8);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
    
    markers = [];
    
    // Ajouter tous les marqueurs
    adSpots.forEach(spot => {
      const marker = L.marker([spot.lat, spot.lng]).addTo(map);
      marker.bindPopup(createPopupContent(spot));
      
      marker.on('click', () => {
        selectedLocationId = spot.id;
        highlightLocationInList(spot.id);
        showFloatingAddButton(spot);
      });
      
      markers.push({ marker, location: spot });
    });
    
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    console.log('Carte initialisée avec succès');
    return map;
    
  } catch (e) {
    console.error('Erreur d\'initialisation de la carte:', e);
    document.getElementById(mapId).innerHTML = '<p class="error-message">Erreur de chargement de la carte.</p>';
    return null;
  }
}

/**
 * Crée le contenu HTML du popup pour un emplacement
 */
function createPopupContent(spot) {
  const isInCart = cartItems.find(item => item.id === spot.id);
  const buttonText = isInCart ? 'Retirer du panier' : 'Ajouter au panier';
  const buttonClass = isInCart ? 'btn-remove' : 'btn-add';
  const imageHtml = spot.imageUrl ? `<img src="${spot.imageUrl}" alt="${spot.name}" style="max-width:100%;" onerror="this.style.display='none';" />` : '';
  
  return `
    <div class="ad-popup" data-id="${spot.id}">
      <h3>${spot.name}</h3>
      ${imageHtml}
      <p style="margin: 10px 0; font-size: 0.85rem; color: #ffa91a;">${spot.facingTo}</p>
      <button class="${buttonClass}" onclick="toggleCartItem(${spot.id})">${isInCart ? '🗑️' : '🛒'} ${buttonText}</button>
      <button onclick="openGoogleMaps('${spot.googleMapsUrl}')" ${!spot.googleMapsUrl ? 'disabled' : ''}>Voir sur Google Maps</button>
    </div>
  `;
}

/**
 * Met à jour tous les marqueurs de la carte
 */
function updateMarkers() {
  try {
    markers.forEach(m => {
      const spot = m.location;
      m.marker.bindPopup(createPopupContent(spot));
    });
  } catch (e) {
    console.error('Erreur mise à jour des marqueurs:', e);
  }
}

/**
 * Ouvre Google Maps pour un emplacement
 */
function openGoogleMaps(url) {
  if (url) {
    window.open(url, '_blank');
  }
}

/**
 * Génère la liste des emplacements dans la sidebar
 */
function generateLocationList() {
  const locationList = document.getElementById('location-list');
  if (!locationList) return;
  
  adSpots.forEach(spot => {
    const locationItem = document.createElement('div');
    locationItem.className = 'location-item';
    locationItem.id = `location-${spot.id}`;
    locationItem.innerHTML = `
      <div class="location-header">
        <div style="flex: 1;">
          <h4 class="location-title">${spot.name}</h4>
          <div class="visitors-count">👥 ${spot.visitors}</div>
        </div>
        <div>📍</div>
      </div>
      <p class="location-description">${spot.description}</p>
      <p class="location-facing">${spot.facingTo}</p>
      <div class="location-stats">
        <span class="stat-badge traffic-badge">Format: ${getScreenFormat(spot.id)}</span>
        <span class="stat-badge status-badge">Disponible</span>
      </div>
    `;
    
    locationItem.addEventListener('click', () => {
      if (mapFr) {
        selectedLocationId = spot.id;
        mapFr.setView([spot.lat, spot.lng], 15);
        
        const marker = markers.find(m => m.location.id === spot.id);
        if (marker) {
          marker.marker.openPopup();
        }
        
        highlightLocationInList(spot.id);
        showFloatingAddButton(spot);
      }
    });
    
    locationList.appendChild(locationItem);
  });
}

/**
 * Surligne un emplacement dans la liste
 */
function highlightLocationInList(locationId) {
  document.querySelectorAll('.location-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  const locationElement = document.getElementById(`location-${locationId}`);
  if (locationElement) {
    locationElement.classList.add('selected');
    locationElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Centre la carte sur la vue initiale
 */
function centerMap() {
  if (mapFr) {
    mapFr.setView([46.0, -70.7], 8);
    selectedLocationId = null;
    hideFloatingAddButton();
  }
}

/**
 * Affiche tous les emplacements (zoom pour tous les voir)
 */
function showAllLocations() {
  if (mapFr && markers.length > 0) {
    const group = L.featureGroup(markers.map(m => m.marker));
    mapFr.fitBounds(group.getBounds().pad(0.05));
    selectedLocationId = null;
    hideFloatingAddButton();
  }
}

/**
 * Filtre les emplacements disponibles (pour l'instant, tous le sont)
 */
function filterAvailable() {
  showAllLocations();
}

/**
 * Affiche le bouton flottant "Ajouter au panier"
 */
function showFloatingAddButton(spot) {
  const floatingBtn = document.getElementById('floating-add-to-cart');
  const isInCart = cartItems.find(item => item.id === spot.id);
  
  const buttonText = isInCart ? 'Retirer du panier' : 'Ajouter au panier';
  const icon = isInCart ? '🗑️' : '🛒';
  
  floatingBtn.innerHTML = `<span class="cart-icon">${icon}</span><span>${buttonText}</span>`;
  floatingBtn.classList.add('show');
}

/**
 * Cache le bouton flottant "Ajouter au panier"
 */
function hideFloatingAddButton() {
  const floatingBtn = document.getElementById('floating-add-to-cart');
  floatingBtn.classList.remove('show');
}

/**
 * Met à jour le bouton flottant selon l'emplacement sélectionné
 */
function updateFloatingAddButton() {
  if (selectedLocationId) {
    const spot = adSpots.find(s => s.id === selectedLocationId);
    if (spot) {
      showFloatingAddButton(spot);
    }
  }
}

/**
 * Ajoute l'emplacement sélectionné au panier
 */
function addSelectedToCart() {
  if (selectedLocationId) {
    toggleCartItem(selectedLocationId);
  }
}

// Observer pour animations au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer les éléments pour animation
document.querySelectorAll('.stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
