/* ==============================================
   Carte Publicitaire - Interface utilisateur
   Modals, Notifications & UI Components
   ============================================== */

/**
 * Ouvre la modale de commande
 */
function openOrderModal() {
  const modal = createOrderModal();
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/**
 * Crée la modale de commande
 */
function createOrderModal() {
  const modal = document.createElement('div');
  modal.className = 'order-modal';
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal-content">
      <h2>Finaliser votre demande de réservation</h2>
      <form id="order-form" onsubmit="submitOrder(event)">
        <div class="form-group">
          <label>Nom de l'entreprise *</label>
          <input type="text" name="company" required>
        </div>
        <div class="form-group">
          <label>Nom du contact *</label>
          <input type="text" name="contact" required>
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input type="email" name="email" required>
        </div>
        <div class="form-group">
          <label>Téléphone *</label>
          <input type="tel" name="phone" required>
        </div>
        <div class="form-group">
          <label>Durée de campagne</label>
          <select name="duration">
            <option>1 mois</option>
            <option>3 mois</option>
            <option>6 mois</option>
            <option>12 mois</option>
            <option>Autre</option>
          </select>
        </div>
        <div class="form-group">
          <label>Message (optionnel)</label>
          <textarea name="message" rows="3"></textarea>
        </div>
        <div class="modal-summary">
          <h3>Récapitulatif : ${cartItems.length} emplacement(s) sélectionné(s)</h3>
          <ul>
            ${cartItems.map(item => `<li>${item.name} (${item.visitors})</li>`).join('')}
          </ul>
        </div>
        <div class="modal-actions">
          <button type="button" onclick="closeModal()">Annuler</button>
          <button type="submit">Envoyer la demande</button>
        </div>
      </form>
    </div>
  `;
  return modal;
}

/**
 * Ferme la modale
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
 * Affiche une notification
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
 * Affiche un message de succès après l'envoi de la commande
 */
function showSuccessMessage() {
  showNotification('Votre demande a été envoyée avec succès!');
}

/**
 * Initialise l'application au chargement
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chargement de la page...');
  
  if (typeof L !== 'undefined') {
    initializeMapAndFeatures();
  } else {
    console.log('En attente du chargement de Leaflet...');
    setTimeout(initializeMapAndFeatures, 500);
  }
  
  // Initialiser le visualiseur PDF
  initializePDFViewer();
});
