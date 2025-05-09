// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Inicializar el slider de testimonios
    const testimonialSlider = tns({
        container: '#testimonial-slider',
        items: 1,
        slideBy: 1,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000,
        speed: 800,
        nav: true,
        navPosition: 'bottom',
        controls: true,
        controlsText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            768: {
                items: 2,
                gutter: 20
            },
            992: {
                items: 3,
                gutter: 30
            }
        }
    });

    // Manejar el comportamiento de la barra de navegación al hacer scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mostrar u ocultar el botón "ir arriba"
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Inicializar contador regresivo para el próximo servicio
    function updateCountdown() {
        // Obtener la próxima fecha de domingo (ejemplo)
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Lunes, etc.
        const daysUntilNextSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
        
        const nextSunday = new Date();
        nextSunday.setDate(now.getDate() + daysUntilNextSunday);
        nextSunday.setHours(10, 30, 0, 0); // 10:30 AM
        
        // Si es domingo y ya pasó la hora del servicio, configurar para el próximo domingo
        if (dayOfWeek === 0 && now.getHours() >= 10 && now.getMinutes() >= 30) {
            nextSunday.setDate(nextSunday.getDate() + 7);
        }
        
        // Calcular la diferencia de tiempo
        const timeLeft = nextSunday - now;
        
        // Si la fecha ya pasó, mostrar ceros
        if (timeLeft <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Calcular días, horas, minutos y segundos restantes
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Actualizar el DOM
        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        
        // Mostrar la fecha del próximo servicio
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        document.getElementById('next-service-date').textContent = nextSunday.toLocaleDateString('es-ES', options) + ', 10:30 AM';
    }
    
    // Actualizar el contador cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Función para mostrar u ocultar la lista de eventos
    const showEventsBtn = document.getElementById('show-events');
    const eventList = document.getElementById('event-list');
    
    if (showEventsBtn && eventList) {
        showEventsBtn.addEventListener('click', function() {
            if (eventList.style.display === 'none' || !eventList.style.display) {
                eventList.style.display = 'block';
                showEventsBtn.innerHTML = '<i class="fas fa-chevron-up me-1"></i> Ocultar Eventos';
                // Desplazar la pantalla hacia los eventos
                eventList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                eventList.style.display = 'none';
                showEventsBtn.innerHTML = '<i class="fas fa-chevron-down me-1"></i> Mostrar Eventos';
            }
        });
    }

    // Volver arriba al hacer clic en el botón
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Manejar el envío del formulario de petición de oración
    const prayerRequestForm = document.getElementById('prayer-request-form');
    
    if (prayerRequestForm) {
        prayerRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const prayerRequest = document.getElementById('prayer-request').value;
            const isPrivate = document.getElementById('private-request').checked;
            
            // Aquí se podrían enviar los datos a un servidor
            // Por ahora, mostraremos un mensaje de confirmación
            
            // Crear una alerta de Bootstrap
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertDiv.role = 'alert';
            
            alertDiv.innerHTML = `
                <strong>¡Gracias ${name}!</strong> Hemos recibido tu petición de oración.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            // Insertar la alerta antes del formulario
            prayerRequestForm.parentNode.insertBefore(alertDiv, prayerRequestForm);
            
            // Reiniciar el formulario
            prayerRequestForm.reset();
            
            // Eliminar la alerta después de 5 segundos
            setTimeout(function() {
                alertDiv.remove();
            }, 5000);
        });
    }

    // Manejar el envío del formulario de boletín
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Aquí se podrían enviar los datos a un servidor
            // Por ahora, mostraremos un mensaje de confirmación
            
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertDiv.role = 'alert';
            
            alertDiv.innerHTML = `
                <strong>¡Gracias!</strong> Te has suscrito correctamente a nuestro boletín.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            newsletterForm.parentNode.insertBefore(alertDiv, newsletterForm.nextSibling);
            
            // Reiniciar el formulario
            newsletterForm.reset();
            
            // Eliminar la alerta después de 5 segundos
            setTimeout(function() {
                alertDiv.remove();
            }, 5000);
        });
    }

    // Animar los enlaces de navegación para suavizar el desplazamiento
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Si el menú móvil está abierto, cerrarlo
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            }
        });
    });
});