/* ==============================================
   Advertising Map - User Interface
   Modals, Notifications & UI Components
   ============================================== */

/**
 * Open order modal
 */
function openOrderModal() {
  const modal = createOrderModal();
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/**
 * Create order modal
 */
function createOrderModal() {
  const modal = document.createElement('div');
  modal.className = 'order-modal';
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal-content">
      <h2>Finalize Your Booking Request</h2>
      <form id="order-form" onsubmit="submitOrder(event)">
        <div class="form-group">
          <label>Company Name *</label>
          <input type="text" name="company" required>
        </div>
        <div class="form-group">
          <label>Contact Name *</label>
          <input type="text" name="contact" required>
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input type="email" name="email" required>
        </div>
        <div class="form-group">
          <label>Phone *</label>
          <input type="tel" name="phone" required>
        </div>
        <div class="form-group">
          <label>Campaign Duration</label>
          <select name="duration">
            <option>1 month</option>
            <option>3 months</option>
            <option>6 months</option>
            <option>12 months</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Message (optional)</label>
          <textarea name="message" rows="3"></textarea>
        </div>
        <div class="modal-summary">
          <h3>Summary: ${cartItems.length} location(s) selected</h3>
          <ul>
            ${cartItems.map(item => `<li>${item.name} (${item.visitors})</li>`).join('')}
          </ul>
        </div>
        <div class="modal-actions">
          <button type="button" onclick="closeModal()">Cancel</button>
          <button type="submit">Send Request</button>
        </div>
      </form>
    </div>
  `;
  return modal;
}

/**
 * Close modal
 */
function closeModal() {
  const modal = document.querySelector('.order-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `cart-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

/**
 * Show success message after order submission
 */
function showSuccessMessage() {
  showNotification('Your request has been sent successfully!');
}

/**
 * Initialize application on load
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading page...');
  
  if (typeof L !== 'undefined') {
    initializeMapAndFeatures();
  } else {
    console.log('Waiting for Leaflet to load...');
    setTimeout(initializeMapAndFeatures, 500);
  }
  
  // Initialize PDF viewer
  initializePDFViewer();
});