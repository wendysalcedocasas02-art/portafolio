document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MENÚ HAMBURGUESA RESPONSIVE
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================
       2. ANIMACIÓN DE BARRAS DE PROGRESO (CORREGIDO)
       ========================================== */
    const progressBars = document.querySelectorAll('.progress');

    // Forzar la carga de las barras de progreso al iniciar o al hacer scroll
    const animateSkills = () => {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress');
            bar.style.width = targetWidth;
        });
    };

    // Ejecutar al cargar la página por si ya se está visualizando la sección
    setTimeout(animateSkills, 300);

    // También mantener el evento por si se navega con scroll
    window.addEventListener('scroll', animateSkills);

    /* ==========================================
       3. VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
       ========================================== */
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    const validateName = () => {
        const value = nameInput.value.trim();
        if (value === '') {
            setError(nameInput, 'El nombre es obligatorio.');
            return false;
        } else if (value.length < 3) {
            setError(nameInput, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        } else {
            setSuccess(nameInput);
            return true;
        }
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            setError(emailInput, 'El correo electrónico es obligatorio.');
            return false;
        } else if (!emailRegex.test(value)) {
            setError(emailInput, 'Ingresa un correo electrónico válido.');
            return false;
        } else {
            setSuccess(emailInput);
            return true;
        }
    };

    const validateMessage = () => {
        const value = messageInput.value.trim();
        if (value === '') {
            setError(messageInput, 'El mensaje no puede estar vacío.');
            return false;
        } else if (value.length < 10) {
            setError(messageInput, 'El mensaje debe tener al menos 10 caracteres.');
            return false;
        } else {
            setSuccess(messageInput);
            return true;
        }
    };

    const setError = (input, message) => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        if (errorMessage) errorMessage.textContent = message;
    };

    const setSuccess = (input) => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        if (errorMessage) errorMessage.textContent = '';
    };

    if (nameInput) nameInput.addEventListener('input', validateName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (messageInput) messageInput.addEventListener('input', validateMessage);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                formStatus.style.color = 'var(--success-color)';
                formStatus.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.';
                form.reset();

                [nameInput, emailInput, messageInput].forEach(input => {
                    input.parentElement.classList.remove('success');
                });

                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            } else {
                formStatus.style.color = 'var(--error-color)';
                formStatus.textContent = 'Por favor, corrige los errores antes de enviar.';
            }
        });
    }
});
