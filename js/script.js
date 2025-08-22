// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('nav');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
            mobileMenuButton.classList.toggle('mobile-menu-open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbar.contains(event.target);
            
            if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                mobileMenuButton.classList.remove('mobile-menu-open');
            }
        });
    }
    
    // Set active link based on current page
    const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('nav-active');
        }
    });
    
    // Close mobile menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                mobileMenuButton.classList.remove('mobile-menu-open');
            }
        });
    });
    
    // Add scroll effect to navbar and footer
    const footer = document.querySelector('footer');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        
        // Navbar scroll effects
        if (currentScrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        // Update last scroll position
        lastScrollTop = currentScrollTop;
        
        // Footer effect when near bottom of page
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight;
        
        if (pageHeight - scrollPosition < 200) {
            footer.style.boxShadow = '0 -4px 6px -1px rgba(0, 0, 0, 0.1)';
            footer.style.borderTop = '1px solid rgba(56, 189, 248, 0.3)';
        } else {
            footer.style.boxShadow = 'none';
            footer.style.borderTop = 'none';
        }
    });

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show an alert
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.projects-section .card');
    projectCards.forEach(card => {
        card.classList.add('hover-scale');
    });

    // Handle placeholder images
    // This would be replaced with actual image loading in a real implementation
    const placeholderImages = document.querySelectorAll('[id$="-image"]');
    placeholderImages.forEach(img => {
        // Check if the image failed to load
        img.addEventListener('error', function() {
            this.src = 'assets/placeholder.jpg';
        });
    });

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('footer p');
    copyrightElements.forEach(el => {
        if (el.textContent.includes('©')) {
            el.textContent = el.textContent.replace(/\d{4}/, currentYear);
        }
    });
});