// Wait for the document to be fully loaded before setting up event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Find our contact form by its ID
    const contactForm = document.getElementById('contactForm');

    // Only proceed if we found the form
    if (contactForm) {
        // Listen for when the form is submitted
        contactForm.addEventListener('submit', async function(event) {
            // Prevent the form from submitting in the traditional way
            // This is crucial to avoid the Web3Forms success page
            event.preventDefault();

            // Get our submit button to show loading state
            const submitButton = document.getElementById('submitBtn');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            try {
                // Create a FormData object that contains all our form fields
                const formData = new FormData(this);

                // Send the form data to Web3Forms using fetch
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                // Parse the JSON response from Web3Forms
                const result = await response.json();

                if (result.success) {
                    // The form was submitted successfully

                    // First clear the form
                    this.reset();

                    // Show a temporary success message
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success mt-3';
                    successAlert.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="fas fa-check-circle me-2"></i>
                            <span>Message sent successfully! Redirecting...</span>
                        </div>
                    `;
                    this.appendChild(successAlert);

                    // Redirect to our success page after a brief delay
                    // This delay lets users see the success message
                    setTimeout(() => {
                        window.location.href = 'success.html';
                    }, 1500);
                } else {
                    // Handle unsuccessful submission
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Show error message if something goes wrong
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert alert-danger mt-3';
                errorAlert.innerHTML = `
                    <div class="d-flex align-items-center">
                        <i class="fas fa-exclamation-circle me-2"></i>
                        <span>There was an error sending your message. Please try again.</span>
                    </div>
                `;
                this.appendChild(errorAlert);
            } finally {
                // Always re-enable the submit button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        });
    }
});