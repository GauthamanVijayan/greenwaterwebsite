// document.getElementById('contactForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (this.checkValidity()) {
//         // Form is valid, ready for Web3Forms
//         alert('Form is valid and ready to submit!');
//     }
// });

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const emailRegex = /.+@.+\..+/;  // Simple check for '@' and '.' with content around them
    
    if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('is-invalid');
        return;
    }
    
    // If validation passes
    if (this.checkValidity()) {
        alert('Form is valid and ready to submit!');
    }
});

// Remove invalid class when user types
document.getElementById('email').addEventListener('input', function() {
    this.classList.remove('is-invalid');
});