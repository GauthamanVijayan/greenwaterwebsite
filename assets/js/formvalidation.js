// document.getElementById('contactForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (this.checkValidity()) {
//         // Form is valid, ready for Web3Forms
//         alert('Form is valid and ready to submit!');
//     }
// });

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';

    try {
        const formData = new FormData(this);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            // Clear the form
            this.reset();
            alert('Thank you for your submission!');
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('Sorry, there was an error submitting your form. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }
});