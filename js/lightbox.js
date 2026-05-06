// Feature: john-marcus-portfolio
// Lightbox module - award certificate image lightbox

export function initLightbox() {
  const lightboxImages = document.querySelectorAll('[data-lightbox]');

  lightboxImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openLightbox(img);
    });
  });

  function openLightbox(img) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');

    const content = document.createElement('div');
    content.className = 'lightbox__content';

    const fullImage = document.createElement('img');
    fullImage.className = 'lightbox__image';
    fullImage.src = img.dataset.lightbox || img.src;
    fullImage.alt = img.alt;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox__close';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.innerHTML = '&times;';

    content.appendChild(fullImage);
    content.appendChild(closeBtn);
    lightbox.appendChild(content);
    document.body.appendChild(lightbox);

    // Store the trigger element for focus restoration
    const triggerElement = img;

    function closeLightbox() {
      lightbox.remove();
      triggerElement.focus();
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Escape key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handleEscape);
      }
    };

    document.addEventListener('keydown', handleEscape);
    closeBtn.focus();
  }
}

