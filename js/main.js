// Archivo base para interacciones futuras del sitio Alta-Volt México.
// Mantener las funciones encapsuladas y utilizar selectores claros para escalabilidad.

(() => {
    const contactButtons = document.querySelectorAll('[href^="mailto:"]');

    // Ejemplo de mejora futura: seguimiento de clics en botones de contacto.
    contactButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log('Contacto iniciado desde:', button.textContent.trim());
        });
    });
})();
