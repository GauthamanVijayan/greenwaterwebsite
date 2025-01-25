document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
    const submitButton = document.getElementById('submitBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update button state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        // Show initial status
        result.innerHTML = `
            <div class="alert alert-info">
                <div class="d-flex align-items-center">
                    <i class="fas fa-spinner fa-spin me-2"></i>
                    <span>Please wait...</span>
                </div>
            </div>
        `;

        // Prepare form data for submission
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Submit to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Show success message
                result.innerHTML = `
                    <div class="alert alert-success">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-check-circle me-2"></i>
                            <span>${json.message}</span>
                        </div>
                    </div>
                `;
                
                // Redirect after showing success message
                setTimeout(() => {
                    window.location.href = 'success.html';
                }, 2000);
            } else {
                // Show error message
                result.innerHTML = `
                    <div class="alert alert-danger">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-exclamation-circle me-2"></i>
                            <span>${json.message}</span>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            // Show error message for caught errors
            result.innerHTML = `
                <div class="alert alert-danger">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-exclamation-circle me-2"></i>
                        <span>Something went wrong! Please try again.</span>
                    </div>
                </div>
            `;
        })
        .finally(() => {
            // Reset form and button state
            form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
            
            // Hide the result message after 5 seconds
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
    });
});