// Feature: john-marcus-portfolio
// Artifacts module - PDF size guard and artifact viewer

const PDF_SIZE_LIMIT = 10_000_000; // 10MB in bytes

export function initArtifacts() {
  const artifactCards = document.querySelectorAll('[data-artifact-type]');

  artifactCards.forEach(card => {
    const type = card.dataset.artifactType;
    const viewBtn = card.querySelector('.artifact-view');

    if (!viewBtn) return;

    if (type === 'pdf') {
      handlePdfArtifact(card, viewBtn);
    } else if (type === 'video') {
      handleVideoArtifact(card, viewBtn);
    }
  });
}

function handlePdfArtifact(card, viewBtn) {
  const pdfSize = parseInt(card.dataset.pdfSize, 10) || 0;
  const pdfSrc = card.dataset.src;
  const downloadHref = card.dataset.download;

  if (pdfSize > PDF_SIZE_LIMIT) {
    // Large file - show warning and download-only
    viewBtn.textContent = 'Large File';
    viewBtn.disabled = true;
    viewBtn.style.opacity = '0.5';
    viewBtn.title = 'File size exceeds 10MB. Please download to view.';
  } else {
    // Small file - open in modal
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPdfViewer(pdfSrc, downloadHref);
    });
  }
}

function handleVideoArtifact(card, viewBtn) {
  const videoSrc = card.dataset.src;
  const isExternal = card.dataset.external === 'true';

  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openVideoViewer(videoSrc, isExternal);
  });
}

function openPdfViewer(pdfSrc, downloadHref) {
  const modal = document.createElement('div');
  modal.className = 'pdf-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const content = document.createElement('div');
  content.className = 'pdf-modal__content';

  const iframe = document.createElement('iframe');
  iframe.className = 'pdf-modal__iframe';
  iframe.src = pdfSrc;
  iframe.title = 'PDF Viewer';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'pdf-modal__close';
  closeBtn.setAttribute('aria-label', 'Close PDF viewer');
  closeBtn.innerHTML = '&times;';

  const footer = document.createElement('div');
  footer.className = 'pdf-modal__footer';

  const downloadLink = document.createElement('a');
  downloadLink.href = downloadHref;
  downloadLink.download = true;
  downloadLink.className = 'btn btn--secondary';
  downloadLink.textContent = 'Download PDF';

  footer.appendChild(downloadLink);
  content.appendChild(iframe);
  content.appendChild(closeBtn);
  content.appendChild(footer);
  modal.appendChild(content);
  document.body.appendChild(modal);

  function closeModal() {
    modal.remove();
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };

  document.addEventListener('keydown', handleEscape);
  closeBtn.focus();
}

function openVideoViewer(videoSrc, isExternal) {
  const modal = document.createElement('div');
  modal.className = 'pdf-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const content = document.createElement('div');
  content.className = 'pdf-modal__content';

  let videoElement;

  if (isExternal) {
    videoElement = document.createElement('iframe');
    videoElement.className = 'pdf-modal__iframe';
    videoElement.src = videoSrc;
    videoElement.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    videoElement.title = 'Video Player';
  } else {
    videoElement = document.createElement('video');
    videoElement.className = 'pdf-modal__iframe';
    videoElement.controls = true;
    videoElement.src = videoSrc;
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'pdf-modal__close';
  closeBtn.setAttribute('aria-label', 'Close video player');
  closeBtn.innerHTML = '&times;';

  content.appendChild(videoElement);
  content.appendChild(closeBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);

  function closeModal() {
    modal.remove();
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };

  document.addEventListener('keydown', handleEscape);
  closeBtn.focus();
}


