/* ==============================================
   Carte Publicitaire - Gestion du panier
   Shopping Cart Management
   ============================================== */

let cartItems = [];
let isCartOpen = false;

/**
 * Initialise le panier
 */
function initializeCart() {
  updateCartUI();
}

/**
 * Configure les événements du panier
 */
function setupCartEvents() {
  const cartElement = document.getElementById('floating-cart');
  
  cartElement.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleCart();
  });
  
  cartElement.addEventListener('mouseenter', function() {
    openCart();
  });
  
  cartElement.addEventListener('mouseleave', function() {
    setTimeout(() => {
      if (!isCartOpen) {
        closeCart();
      }
    }, 300);
  });
  
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#floating-cart')) {
      closeCart();
    }
  });
}

/**
 * Toggle le panier ouvert/fermé
 */
function toggleCart() {
  isCartOpen = !isCartOpen;
  const cart = document.getElementById('floating-cart');
  cart.classList.toggle('active', isCartOpen);
}

/**
 * Ouvre le panier
 */
function openCart() {
  const cart = document.getElementById('floating-cart');
  cart.classList.add('active');
}

/**
 * Ferme le panier
 */
function closeCart() {
  isCartOpen = false;
  const cart = document.getElementById('floating-cart');
  cart.classList.remove('active');
}

/**
 * Toggle un item dans le panier (ajouter ou retirer)
 */
function toggleCartItem(spotId) {
  const spot = adSpots.find(s => s.id === spotId);
  const isInCart = cartItems.find(item => item.id === spotId);
  
  if (isInCart) {
    removeFromCart(spotId);
  } else {
    addToCart(spot);
  }
  
  if (markers.find(m => m.location.id === spotId)) {
    updateMarkers();
  }
  
  updateFloatingAddButton();
}

/**
 * Ajoute un emplacement au panier
 */
function addToCart(spot) {
  if (cartItems.find(item => item.id === spot.id)) {
    showNotification('Cet emplacement est déjà dans votre panier', 'error');
    return;
  }
  
  cartItems.push({
    id: spot.id,
    name: spot.name,
    visitors: spot.visitors,
    imageUrl: spot.imageUrl || '/assets/images/placeholder.jpg',
    googleMapsUrl: spot.googleMapsUrl,
    description: spot.description
  });
  
  updateCartUI();
  saveCartToStorage();
  showNotification('✓ Ajouté au panier');
  animateCartIcon();
}

/**
 * Retire un emplacement du panier
 */
function removeFromCart(itemId) {
  cartItems = cartItems.filter(item => item.id !== itemId);
  updateCartUI();
  saveCartToStorage();
  updateMarkers();
}

/**
 * Met à jour l'interface du panier
 */
function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const cartList = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-cart');
  const orderBtn = document.querySelector('.btn-order');
  
  badge.textContent = cartItems.length;
  badge.style.display = cartItems.length > 0 ? 'flex' : 'none';
  
  if (cartItems.length === 0) {
    cartList.style.display = 'none';
    emptyMessage.style.display = 'block';
    orderBtn.disabled = true;
  } else {
    cartList.style.display = 'block';
    emptyMessage.style.display = 'none';
    orderBtn.disabled = false;
    
    cartList.innerHTML = cartItems.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image" style="background-image: url(${item.imageUrl})"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-details">👥 ${item.visitors}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
      </div>
    `).join('');
  }
  
  document.querySelector('.cart-count').textContent = `${cartItems.length} emplacement${cartItems.length > 1 ? 's' : ''}`;
}

/**
 * Réinitialise le panier
 */
function resetCart() {
  if (cartItems.length === 0) return;
  
  if (confirm('Voulez-vous vraiment vider votre panier ?')) {
    cartItems.forEach(item => {
      if (markers.find(m => m.location.id === item.id)) {
        updateMarkers();
      }
    });
    
    cartItems = [];
    updateCartUI();
    saveCartToStorage();
    showNotification('Panier réinitialisé');
    updateFloatingAddButton();
  }
}

/**
 * Lance le processus de commande
 */
function processOrder() {
  if (cartItems.length === 0) return;
  openOrderModal();
}

/**
 * Anime l'icône du panier
 */
function animateCartIcon() {
  const cart = document.getElementById('floating-cart');
  cart.classList.add('bounce');
  setTimeout(() => {
    cart.classList.remove('bounce');
  }, 600);
}

/**
 * Sauvegarde le panier dans le session storage
 */
function saveCartToStorage() {
  sessionStorage.setItem('xtranumerik_cart', JSON.stringify(cartItems));
}

/**
 * Charge le panier depuis le session storage
 */
function loadCartFromStorage() {
  const saved = sessionStorage.getItem('xtranumerik_cart');
  if (saved) {
    cartItems = JSON.parse(saved);
    updateCartUI();
    updateMarkers();
  }
}

/**
 * Soumet la commande par email
 */
function submitOrder(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const orderData = Object.fromEntries(formData);
  const emailBody = buildEmailBody(orderData);
  
  window.location.href = `mailto:info@xtranumerik.ca?subject=Demande réservation emplacements publicitaires - ${cartItems.length} sites&body=${encodeURIComponent(emailBody)}`;
  
  setTimeout(() => {
    resetCart();
    closeModal();
    showSuccessMessage();
  }, 1000);
}

/**
 * Construit le corps de l'email de commande
 */
function buildEmailBody(orderData) {
  let body = `Bonjour,\n\n`;
  body += `Je souhaite réserver des emplacements publicitaires d'affichage dynamique sur votre réseau.\n\n`;
  body += `INFORMATIONS DE CONTACT:\n`;
  body += `- Entreprise: ${orderData.company}\n`;
  body += `- Contact: ${orderData.contact}\n`;
  body += `- Email: ${orderData.email}\n`;
  body += `- Téléphone: ${orderData.phone}\n`;
  body += `- Durée souhaitée: ${orderData.duration}\n\n`;
  body += `EMPLACEMENTS SÉLECTIONNÉS (${cartItems.length}):\n`;
  
  cartItems.forEach(item => {
    body += `- ${item.name} (${item.visitors})\n`;
  });
  
  if (orderData.message) {
    body += `\nMESSAGE ADDITIONNEL:\n${orderData.message}\n`;
  }
  
  body += `\nMerci de me contacter pour finaliser cette réservation et discuter des tarifs.\n\nCordialement`;
  return body;
}
