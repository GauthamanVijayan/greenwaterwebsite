document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const requiredInputs = form.querySelectorAll('[required]');

    // Function to check if form is valid
    function checkFormValidity() {
        let isValid = true;
        requiredInputs.forEach(input => {
            if (!input.validity.valid) {
                isValid = false;
            }
        });
        submitBtn.disabled = !isValid;
    }

    // Check validity on input change
    requiredInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('change', checkFormValidity);
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            return;
        }

        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
                submitBtn.disabled = true;  // Reset button state
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was a problem sending your message. Please try again.');
        } finally {
            submitBtn.disabled = false;
        }
    });
});