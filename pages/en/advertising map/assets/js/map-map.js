/* ==============================================
   Advertising Map - Map Logic
   Leaflet Map & Markers Management
   ============================================== */

let mapEn;
let markers = [];
let selectedLocationId = null;

/**
 * Initialize map and all features
 */
function initializeMapAndFeatures() {
  try {
    mapEn = initializeMap('map-en', 'en');
    if (mapEn) {
      initializeCart();
      setupCartEvents();
      loadCartFromStorage();
      generateLocationList();
    }
    
    window.addEventListener('resize', () => {
      if (mapEn) {
        mapEn.invalidateSize();
      }
    });
  } catch (e) {
    console.error('Initialization error:', e);
    document.getElementById('map-en').innerHTML = '<p class="error-message">Map loading error.</p>';
  }
}

/**
 * Initialize Leaflet map
 */
function initializeMap(mapId, lang) {
  try {
    console.log('Initializing map...');
    
    if (typeof L === 'undefined') {
      throw new Error('Leaflet not loaded');
    }
    
    const map = L.map(mapId).setView([46.0, -70.7], 8);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
    
    markers = [];
    
    // Add all markers
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
    
    console.log('Map initialized successfully');
    return map;
    
  } catch (e) {
    console.error('Map initialization error:', e);
    document.getElementById(mapId).innerHTML = '<p class="error-message">Map loading error.</p>';
    return null;
  }
}

/**
 * Create HTML popup content for a location
 */
function createPopupContent(spot) {
  const isInCart = cartItems.find(item => item.id === spot.id);
  const buttonText = isInCart ? 'Remove from cart' : 'Add to cart';
  const buttonClass = isInCart ? 'btn-remove' : 'btn-add';
  const imageHtml = spot.imageUrl ? `<img src="${spot.imageUrl}" alt="${spot.name}" style="max-width:100%;" onerror="this.style.display='none';" />` : '';
  
  return `
    <div class="ad-popup" data-id="${spot.id}">
      <h3>${spot.name}</h3>
      ${imageHtml}
      <p style="margin: 10px 0; font-size: 0.85rem; color: #ffa91a;">${spot.facingTo}</p>
      <button class="${buttonClass}" onclick="toggleCartItem(${spot.id})">${isInCart ? '🗑️' : '🛒'} ${buttonText}</button>
      <button onclick="openGoogleMaps('${spot.googleMapsUrl}')" ${!spot.googleMapsUrl ? 'disabled' : ''}>View on Google Maps</button>
    </div>
  `;
}

/**
 * Update all map markers
 */
function updateMarkers() {
  try {
    markers.forEach(m => {
      const spot = m.location;
      m.marker.bindPopup(createPopupContent(spot));
    });
  } catch (e) {
    console.error('Error updating markers:', e);
  }
}

/**
 * Open Google Maps for a location
 */
function openGoogleMaps(url) {
  if (url) {
    window.open(url, '_blank');
  }
}

/**
 * Generate location list in sidebar
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
        <span class="stat-badge status-badge">Available</span>
      </div>
    `;
    
    locationItem.addEventListener('click', () => {
      if (mapEn) {
        selectedLocationId = spot.id;
        mapEn.setView([spot.lat, spot.lng], 15);
        
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
 * Highlight a location in the list
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
 * Center map to initial view
 */
function centerMap() {
  if (mapEn) {
    mapEn.setView([46.0, -70.7], 8);
    selectedLocationId = null;
    hideFloatingAddButton();
  }
}

/**
 * Show all locations (zoom to fit all)
 */
function showAllLocations() {
  if (mapEn && markers.length > 0) {
    const group = L.featureGroup(markers.map(m => m.marker));
    mapEn.fitBounds(group.getBounds().pad(0.05));
    selectedLocationId = null;
    hideFloatingAddButton();
  }
}

/**
 * Filter available locations (currently all are available)
 */
function filterAvailable() {
  showAllLocations();
}

/**
 * Show floating "Add to cart" button
 */
function showFloatingAddButton(spot) {
  const floatingBtn = document.getElementById('floating-add-to-cart');
  const isInCart = cartItems.find(item => item.id === spot.id);
  
  const buttonText = isInCart ? 'Remove from cart' : 'Add to cart';
  const icon = isInCart ? '🗑️' : '🛒';
  
  floatingBtn.innerHTML = `<span class="cart-icon">${icon}</span><span>${buttonText}</span>`;
  floatingBtn.classList.add('show');
}

/**
 * Hide floating "Add to cart" button
 */
function hideFloatingAddButton() {
  const floatingBtn = document.getElementById('floating-add-to-cart');
  floatingBtn.classList.remove('show');
}

/**
 * Update floating button based on selected location
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
 * Add selected location to cart
 */
function addSelectedToCart() {
  if (selectedLocationId) {
    toggleCartItem(selectedLocationId);
  }
}

// Observer for scroll animations
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

// Observe elements for animation
document.querySelectorAll('.stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});