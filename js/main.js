// Interacciones básicas para la landing de Alta-Volt México.
// Funciones: menú responsive, scroll suave, acordeón accesible, generación de mensaje WhatsApp, toast y resaltado de sección.

(() => {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.getElementById('nav-menu');
    const header = document.querySelector('.site-header');
    const anchors = document.querySelectorAll('a[href^="#"]');
    const accordionItems = document.querySelectorAll('.accordion__item');
    const contactForm = document.getElementById('contact-form');
    const toast = document.querySelector('.toast');
    const brandVideo = document.getElementById('brand-video');
    const brandLogo = document.getElementById('brand-logo');
    const brandLink = document.querySelector('.brand');
    const heroVideo = document.getElementById('hero-intro');
    const skipIntroButton = document.getElementById('skip-intro');
    const heroLogoButton = document.getElementById('hero-logo');

    const whatsappNumber = '525575163124';

    const buildWhatsAppLink = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const showBrandLogo = () => {
        if (brandVideo && !brandVideo.classList.contains('is-hidden')) {
            brandVideo.pause();
            brandVideo.classList.add('is-hidden');
        }

        if (brandLogo) {
            brandLogo.hidden = false;
        }
    };

    if (brandVideo) {
        const playPromise = brandVideo.play();
        if (playPromise) {
            playPromise.catch(showBrandLogo);
        }

        brandVideo.addEventListener('ended', showBrandLogo);
        brandVideo.addEventListener('error', showBrandLogo);
    } else {
        showBrandLogo();
    }

    brandLink?.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const showHeroLogo = () => {
        if (heroVideo && !heroVideo.classList.contains('is-hidden')) {
            heroVideo.pause();
            heroVideo.classList.add('is-hidden');
        }

        if (skipIntroButton) {
            skipIntroButton.hidden = true;
        }

        if (heroLogoButton) {
            heroLogoButton.hidden = false;
        }
    };

    if (heroVideo) {
        const playPromise = heroVideo.play();
        if (playPromise) {
            playPromise.catch(showHeroLogo);
        }

        heroVideo.addEventListener('ended', showHeroLogo);
        heroVideo.addEventListener('error', showHeroLogo);
    } else {
        showHeroLogo();
    }

    skipIntroButton?.addEventListener('click', showHeroLogo);

    heroLogoButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Menú móvil
    navToggle?.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar menú al elegir sección
    navList?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navList.classList.remove('is-open');
            navToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    // Scroll suave
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Resaltar sección en header
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.nav__list a[href="#${id}"]`);
                if (navLink && entry.isIntersecting) {
                    document.querySelectorAll('.nav__list a').forEach((l) => l.classList.remove('is-active'));
                    navLink.classList.add('is-active');
                }
            });
        },
        { threshold: 0.5, rootMargin: '-50px 0px -50px 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    // Acordeón accesible
    accordionItems.forEach((item) => {
        item.addEventListener('click', () => {
            const isExpanded = item.getAttribute('aria-expanded') === 'true';
            accordionItems.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
            item.setAttribute('aria-expanded', String(!isExpanded));
        });
    });

    // Generar mensaje WhatsApp desde formulario
    contactForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = contactForm.nombre.value.trim();
        const tipo = contactForm.tipo.value;
        const ubicacion = contactForm.ubicacion.value.trim();
        const servicio = contactForm.servicio.value;
        const detalle = contactForm.detalle.value.trim();

        if (!nombre || !tipo || !ubicacion || !servicio || !detalle) {
            showToast('Completa los campos obligatorios');
            return;
        }

        const mensaje = `Hola, soy ${nombre}. Necesito servicio ${tipo}. Ubicación: ${ubicacion}. Servicio: ${servicio}. Detalles: ${detalle}.`;
        const whatsappUrl = buildWhatsAppLink(mensaje);

        const opened = window.open(whatsappUrl, '_blank', 'noopener');
        if (!opened) {
            await copyToClipboard(mensaje);
            showToast('Mensaje copiado');
        }
    });

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
        }
    };

    const showToast = (message) => {
        if (!toast) return;
        toast.textContent = message;
        toast.hidden = false;
        toast.classList.add('is-visible');
        setTimeout(() => {
            toast.classList.remove('is-visible');
            toast.hidden = true;
        }, 2500);
    };
})();
