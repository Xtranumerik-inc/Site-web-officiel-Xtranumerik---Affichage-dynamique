/* ==============================================
   Advertising Map - PDF Viewer
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
 * Initialize PDF viewer
 */
function initializePDFViewer() {
  // Configure PDF.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  
  canvas = document.getElementById('pdf-canvas');
  ctx = canvas.getContext('2d');
  
  // Load PDF
  const url = '/data/Trousse Média/Trousse Media Xtranumerik 2025-2026.pdf';
  
  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdfDoc = pdf;
    document.getElementById('pdf-page-count').textContent = pdf.numPages;
    
    // Hide loading and show controls
    document.getElementById('pdf-loading').style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('pdf-controls').style.display = 'flex';
    
    // Render first page
    renderPage(pageNum);
  }).catch(function(error) {
    console.error('PDF loading error:', error);
    document.getElementById('pdf-loading').style.display = 'none';
    document.getElementById('pdf-error').style.display = 'block';
  });
}

/**
 * Render a PDF page
 */
function renderPage(num) {
  pageRendering = true;
  
  // Get page
  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render context
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    const renderTask = page.render(renderContext);
    
    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page waiting to render
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
  
  // Update page number
  document.getElementById('pdf-page-num').textContent = num;
  updateNavButtons();
}

/**
 * Queue rendering of a page
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Previous page
 */
function prevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

/**
 * Next page
 */
function nextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

/**
 * Zoom in
 */
function zoomIn() {
  scale += 0.25;
  queueRenderPage(pageNum);
}

/**
 * Zoom out
 */
function zoomOut() {
  if (scale > 0.5) {
    scale -= 0.25;
    queueRenderPage(pageNum);
  }
}

/**
 * Fit to width
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
 * Update navigation buttons state
 */
function updateNavButtons() {
  document.getElementById('pdf-prev').disabled = (pageNum <= 1);
  document.getElementById('pdf-next').disabled = (pageNum >= pdfDoc.numPages);
}