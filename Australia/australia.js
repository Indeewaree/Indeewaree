document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle 
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle) {
        navToggle.addEventListener('click', () => document.body.classList.toggle('mobile-nav-active'));
    }

    // Mobile Dropdown Click Handler
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (event) => {
            if (window.innerWidth <= 768) {
                event.preventDefault();
                dropdownContent.classList.toggle('show');
            }
        });
    }

    // Close Menus When a Link is Clicked
    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && !e.target.closest('.dropdown')) {
                document.body.classList.remove('mobile-nav-active');
            }
        });
    }
    
    //  Scroll-Reveal Animations 
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // Festivals Gallery Overlay 
    const festivalItems = document.querySelectorAll('.festivals-section .gallery-item');
    festivalItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); 
            item.classList.toggle('overlay-visible');
        });
    });

    // Simple Image Lightbox
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = image.src;
        });
    });
    const closeLightbox = () => { lightbox.style.display = 'none'; }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // Adventure Modal Logic
    const modalButtons = document.querySelectorAll('.btn-adventure');
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if(modal) modal.style.display = 'flex';
        });
    });
    const adventureModalCloseButtons = document.querySelectorAll('.adventure-modal-close');
    adventureModalCloseButtons.forEach(button => {
        button.addEventListener('click', () => button.closest('.adventure-modal').style.display = 'none');
    });
    const allAdventureModals = document.querySelectorAll('.adventure-modal');
    allAdventureModals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if(event.target === modal) modal.style.display = 'none';
        });
    });

    // Map Modal Logic
    const destinationTitles = document.querySelectorAll('.destination-title');
    const mapModal = document.getElementById('map-modal');
    const mapContainer = document.getElementById('map-container');
    const mapModalClose = document.querySelector('.map-modal-close');

    const openMapModal = (mapSrc) => {
        mapContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = mapSrc;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.allowFullscreen = "";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        
        mapContainer.appendChild(iframe);
        mapModal.style.display = 'flex';
    };

    const closeMapModal = () => {
        mapModal.style.display = 'none';
        mapContainer.innerHTML = '';
    };

    destinationTitles.forEach(title => {
        title.addEventListener('click', () => {
            const mapSrc = title.getAttribute('data-map-src');
            if (mapSrc) {
                openMapModal(mapSrc);
            }
        });
    });

    if (mapModalClose) mapModalClose.addEventListener('click', closeMapModal);
    if (mapModal) mapModal.addEventListener('click', (event) => {
        if (event.target === mapModal) {
            closeMapModal();
        }
    });
});