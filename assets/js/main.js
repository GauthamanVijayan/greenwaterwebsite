document.addEventListener('DOMContentLoaded', function() {
    // Simple function to set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if we're on home page
        if ((currentPath === '/' || currentPath.includes('index.html')) && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }

    // Call it immediately
    setActiveNav();

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse?.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }

                // Update active state for navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Add active class to nav items based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        if (currentPage.includes('services_contact')) {
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');

                // Check for both direct section links and page-specific section links
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`) || 
                               document.querySelector(`.nav-link[href="services_contact.html#${sectionId}"]`);

                if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            });
        }
    }

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageOptions = {
            threshold: 0,
            rootMargin: '0px 0px 50px 0px'
        };

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, imageOptions);

            images.forEach(img => imageObserver.observe(img));
        } else {
            images.forEach(img => loadImage(img));
        }
    }

    function loadImage(image) {
        if (image.dataset.src) {
            image.src = image.dataset.src;
            delete image.dataset.src;
        }
    }
});