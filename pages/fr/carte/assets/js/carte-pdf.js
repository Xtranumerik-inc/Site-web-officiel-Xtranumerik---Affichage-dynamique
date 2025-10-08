/* ==============================================
   Carte Publicitaire - Visualiseur PDF
   PDF.js Integration for Media Kit
   ============================================== */

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.2;
let canvas = null;
let ctx = null;

/**
 * Initialise le visualiseur PDF
 */
function initializePDFViewer() {
  // Configuration PDF.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  
  canvas = document.getElementById('pdf-canvas');
  ctx = canvas.getContext('2d');
  
  // Charger le PDF
  const url = '/data/Trousse Média/Trousse Media Xtranumerik 2025-2026.pdf';
  
  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdfDoc = pdf;
    document.getElementById('pdf-page-count').textContent = pdf.numPages;
    
    // Masquer le loading et afficher les contrôles
    document.getElementById('pdf-loading').style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('pdf-controls').style.display = 'flex';
    
    // Rendre la première page
    renderPage(pageNum);
  }).catch(function(error) {
    console.error('Erreur de chargement PDF:', error);
    document.getElementById('pdf-loading').style.display = 'none';
    document.getElementById('pdf-error').style.display = 'block';
  });
}

/**
 * Rend une page du PDF
 */
function renderPage(num) {
  pageRendering = true;
  
  // Récupérer la page
  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Objet de rendu
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    const renderTask = page.render(renderContext);
    
    // Attendre que le rendu soit terminé
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // Nouvelle page en attente de rendu
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
  
  // Mettre à jour le numéro de page
  document.getElementById('pdf-page-num').textContent = num;
  updateNavButtons();
}

/**
 * Met en file d'attente le rendu d'une page
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Page précédente
 */
function prevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

/**
 * Page suivante
 */
function nextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

/**
 * Zoom avant
 */
function zoomIn() {
  scale += 0.25;
  queueRenderPage(pageNum);
}

/**
 * Zoom arrière
 */
function zoomOut() {
  if (scale > 0.5) {
    scale -= 0.25;
    queueRenderPage(pageNum);
  }
}

/**
 * Ajuster la largeur
 */
function fitWidth() {
  const container = document.querySelector('.pdf-canvas-container');
  const containerWidth = container.clientWidth - 32; // padding
  
  if (pdfDoc) {
    pdfDoc.getPage(pageNum).then(function(page) {
      const viewport = page.getViewport({ scale: 1 });
      scale = containerWidth / viewport.width;
      queueRenderPage(pageNum);
    });
  }
}

/**
 * Met à jour l'état des boutons de navigation
 */
function updateNavButtons() {
  document.getElementById('pdf-prev').disabled = (pageNum <= 1);
  document.getElementById('pdf-next').disabled = (pageNum >= pdfDoc.numPages);
}
