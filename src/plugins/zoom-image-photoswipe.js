import PhotoSwipeLightbox from 'photoswipe/lightbox';

function install(hook) {
  hook.doneEach(() => {
    const gallerySelector =
      '.markdown-section img:not(.emoji):not([data-no-zoom])';
    const images = Array.from(
      document.querySelectorAll(gallerySelector),
    ).filter(elm => !elm.closest('a'));

    if (images.length === 0) {
      return;
    }

    images.forEach(img => {
      const link = document.createElement('a');
      link.href = img.src;
      link.setAttribute('data-pswp-width', img.naturalWidth);
      link.setAttribute('data-pswp-height', img.naturalHeight);
      img.parentNode.insertBefore(link, img);
      link.appendChild(img);
    });

    const lightbox = new PhotoSwipeLightbox({
      gallery: gallerySelector,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();
  });
}

window.$docsify = window.$docsify || {};
$docsify.plugins = [install, ...($docsify.plugins || [])];
