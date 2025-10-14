/* ==============================================
   Advertising Map - Shopping Cart Management
   Shopping Cart Management
   ============================================== */

let cartItems = [];
let isCartOpen = false;

/**
 * Initialize the shopping cart
 */
function initializeCart() {
  updateCartUI();
}

/**
 * Set up cart events
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
 * Toggle cart open/closed
 */
function toggleCart() {
  isCartOpen = !isCartOpen;
  const cart = document.getElementById('floating-cart');
  cart.classList.toggle('active', isCartOpen);
}

/**
 * Open cart
 */
function openCart() {
  const cart = document.getElementById('floating-cart');
  cart.classList.add('active');
}

/**
 * Close cart
 */
function closeCart() {
  isCartOpen = false;
  const cart = document.getElementById('floating-cart');
  cart.classList.remove('active');
}

/**
 * Toggle an item in cart (add or remove)
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
 * Add location to cart
 */
function addToCart(spot) {
  if (cartItems.find(item => item.id === spot.id)) {
    showNotification('This location is already in your cart', 'error');
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
  showNotification('✓ Added to cart');
  animateCartIcon();
}

/**
 * Remove location from cart
 */
function removeFromCart(itemId) {
  cartItems = cartItems.filter(item => item.id !== itemId);
  updateCartUI();
  saveCartToStorage();
  updateMarkers();
}

/**
 * Update cart UI
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
  
  document.querySelector('.cart-count').textContent = `${cartItems.length} location${cartItems.length > 1 ? 's' : ''}`;
}

/**
 * Reset cart
 */
function resetCart() {
  if (cartItems.length === 0) return;
  
  if (confirm('Do you really want to empty your cart?')) {
    cartItems.forEach(item => {
      if (markers.find(m => m.location.id === item.id)) {
        updateMarkers();
      }
    });
    
    cartItems = [];
    updateCartUI();
    saveCartToStorage();
    showNotification('Cart reset');
    updateFloatingAddButton();
  }
}

/**
 * Start order process
 */
function processOrder() {
  if (cartItems.length === 0) return;
  openOrderModal();
}

/**
 * Animate cart icon
 */
function animateCartIcon() {
  const cart = document.getElementById('floating-cart');
  cart.classList.add('bounce');
  setTimeout(() => {
    cart.classList.remove('bounce');
  }, 600);
}

/**
 * Save cart to session storage
 */
function saveCartToStorage() {
  sessionStorage.setItem('xtranumerik_cart', JSON.stringify(cartItems));
}

/**
 * Load cart from session storage
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
 * Submit order via email
 */
function submitOrder(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const orderData = Object.fromEntries(formData);
  const emailBody = buildEmailBody(orderData);
  
  window.location.href = `mailto:info@xtranumerik.ca?subject=Advertising location booking request - ${cartItems.length} sites&body=${encodeURIComponent(emailBody)}`;
  
  setTimeout(() => {
    resetCart();
    closeModal();
    showSuccessMessage();
  }, 1000);
}

/**
 * Build email body for order
 */
function buildEmailBody(orderData) {
  let body = `Hello,\n\n`;
  body += `I would like to book advertising locations on your digital signage network.\n\n`;
  body += `CONTACT INFORMATION:\n`;
  body += `- Company: ${orderData.company}\n`;
  body += `- Contact: ${orderData.contact}\n`;
  body += `- Email: ${orderData.email}\n`;
  body += `- Phone: ${orderData.phone}\n`;
  body += `- Desired duration: ${orderData.duration}\n\n`;
  body += `SELECTED LOCATIONS (${cartItems.length}):\n`;
  
  cartItems.forEach(item => {
    body += `- ${item.name} (${item.visitors})\n`;
  });
  
  if (orderData.message) {
    body += `\nADDITIONAL MESSAGE:\n${orderData.message}\n`;
  }
  
  body += `\nPlease contact me to finalize this booking and discuss rates.\n\nBest regards`;
  return body;
}