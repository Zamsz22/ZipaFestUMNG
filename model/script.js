document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Transicion HEADER
    // ===================================
    const header = document.querySelector('header');
    if (header) { // Comprueba si el header existe
        const scrollDistance = 25;
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollDistance) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===================================
    // Botones slider y control de tiempo
    // ===================================
    const slider = document.querySelector('.hero-slider ul');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    // SOLO EJECUTAR EL CÓDIGO DEL SLIDER SI LOS ELEMENTOS EXISTEN
    if (slider && nextBtn && prevBtn) {
        const slides = document.querySelectorAll('.hero-slider li');
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval;
        const intervalTime = 10000;

        function showSlide(index) {
            if (index >= totalSlides) currentIndex = 0;
            else if (index < 0) currentIndex = totalSlides - 1;
            else currentIndex = index;

            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            resetInterval();
        });

        function autoSlide() {
            showSlide(currentIndex + 1);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(autoSlide, intervalTime);
        }

        slideInterval = setInterval(autoSlide, intervalTime);
    }

    // ===================================
    // APARECER OBJETOS AL SCROLLEAR
    // ===================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const statsSection = document.querySelector('.stats-footer');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    if (statsSection) { // Comprueba si la sección de stats existe
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Asegúrate de tener una función llamada animateStats() en alguna parte
                    // si no la tienes, esta línea dará error.
                    // animateStats(); 
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // ===================================
    // LÓGICA PARA LOS POP-UPS DE CUPONES
    // ===================================
    const couponLinks = document.querySelectorAll('.coupon-card');
    const popups = document.querySelectorAll('.popup-container');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Solo ejecutar si hay cupones en la página
    if (couponLinks.length > 0) {
        couponLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href');
                const targetPopup = document.querySelector(targetId);

                if (targetPopup) {
                    targetPopup.classList.add('visible');
                }
            });
        });

        function closeAllPopups() {
            popups.forEach(popup => {
                popup.classList.remove('visible');
            });
        }

        closeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                closeAllPopups();
            });
        });

        popups.forEach(popup => {
            popup.addEventListener('click', function(event) {
                if (event.target === this) {
                    closeAllPopups();
                }
            });
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeAllPopups();
            }
        });
    }
});

// =================== MENÚ HAMBURGUESA MÓVIL ===================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const categoryMenu = document.getElementById('categoryMenu');
const body = document.body;

// Función para abrir/cerrar el menú
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Función para cerrar el menú
function closeMenu() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    
    // También cerrar el dropdown de categorías si está abierto
    if (window.innerWidth <= 767) {
        categoryMenu.classList.remove('active');
    }
}

// Click en el botón hamburguesa
menuToggle.addEventListener('click', toggleMenu);

// Click en el overlay para cerrar el menú
navOverlay.addEventListener('click', closeMenu);

// Click en el menú de categorías (solo en móvil)
categoryMenu.addEventListener('click', function(e) {
    if (window.innerWidth <= 767) {
        // Si se hace click en el enlace principal de CATEGORIAS
        const clickedLink = e.target.closest('a');
        if (clickedLink && clickedLink.parentElement === categoryMenu) {
            e.preventDefault();
            categoryMenu.classList.toggle('active');
        }
    }
});

// Cerrar menú al hacer clic en un enlace (excepto categorías)
const navItems = navLinks.querySelectorAll('a');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Si es un enlace dentro del dropdown, no cerrar
        if (this.closest('.drop-down')) {
            closeMenu();
        }
        // Si es cualquier otro enlace y no es el de categorías, cerrar
        else if (!this.closest('.category')) {
            closeMenu();
        }
    });
});

// Cerrar menú al presionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
    }
});



// Cerrar menú y dropdown al cambiar el tamaño de la ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 767) {
        closeMenu();
        categoryMenu.classList.remove('active');
    }
});




