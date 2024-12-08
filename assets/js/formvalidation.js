// Form Validation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Regular expressions for validation
    const patterns = {
        phone: /^(?:\+971|00971|0)?(?:50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };

    // Error messages
    const errorMessages = {
        name: {
            required: 'Please enter your name',
            minLength: 'Name must be at least 2 characters'
        },
        email: {
            required: 'Please enter your email',
            invalid: 'Please enter a valid email address'
        },
        phone: {
            required: 'Please enter your phone number',
            invalid: 'Please enter a valid UAE phone number'
        },
        address: {
            required: 'Please enter your delivery address'
        }
    };

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || 
            Object.assign(document.createElement('div'), {
                className: 'error-message text-danger mt-1'
            });
        errorDiv.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        input.classList.add('is-invalid');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('is-invalid');
    }

    function validateField(input) {
        removeError(input);
        const value = input.value.trim();

        // Required field validation
        if (!value) {
            showError(input, errorMessages[input.id].required);
            return false;
        }

        // Specific field validations
        switch(input.id) {
            case 'email':
                if (!patterns.email.test(value)) {
                    showError(input, errorMessages.email.invalid);
                    return false;
                }
                break;
            case 'phone':
                if (!patterns.phone.test(value)) {
                    showError(input, errorMessages.phone.invalid);
                    return false;
                }
                break;
            case 'name':
                if (value.length < 2) {
                    showError(input, errorMessages.name.minLength);
                    return false;
                }
                break;
        }

        return true;
    }

    // Real-time validation
    ['name', 'email', 'phone', 'address'].forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        ['name', 'email', 'phone', 'address'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input && !validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Here you would typically send the form data to your server
            // For now, show success message
            const formData = new FormData(contactForm);
            alert('Thank you for your message. We will contact you soon!');
            contactForm.reset();
        }
    });
});