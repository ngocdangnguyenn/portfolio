// Navigation functionality
(function setupNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= (section.offsetTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });
})();

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // Get form data for validation
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }
        
        // Show sending feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Allow the form to continue submitting to Formspree
        // We don't prevent default here because we want the form to actually submit
        console.log('Form is being submitted to Formspree...');
        
        // Reset button after 5 seconds if for some reason the form doesn't redirect
        setTimeout(() => {
            if (document.body.contains(submitBtn)) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 5000);
    });
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.background = 'var(--bg-primary)';
    navMenu.style.flexDirection = 'column';
    navMenu.style.padding = '1rem';
    navMenu.style.boxShadow = 'var(--shadow-medium)';
});

// Add typing effect to hero subtitle
const typeText = document.querySelector('.subtitle');
const words = ['Final-year Student in Computer Science', 'Data-Driven Problem Solver', 'Python & ML Practitioner', 'AI & Machine Learning Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typeSpeed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, typeSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add interactive hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Add smooth reveal animation for stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetText = stat.textContent;
        const hasPlus = targetText.includes('+');
        const target = parseInt(targetText);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }
        }, 30);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
const statsObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.unobserve(aboutSection);
    }
}, { threshold: 0.5 });

if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Handle modals and demo links
(function setupModals() {
    const loadingModal = document.getElementById('loading-modal');
    
    // Handle demo links loading
    document.querySelectorAll('.project-overlay .btn').forEach(btn => {
        if (btn.textContent.trim().includes('Live Demo')) {
            btn.classList.add('demo-link');
            btn.setAttribute('target', '_blank');
            
            btn.addEventListener('click', () => {
                loadingModal.style.display = 'flex';
                setTimeout(() => { loadingModal.style.display = 'none'; }, 3000);
            });
        }
    });
    
    // Modal closing handlers
    document.getElementById('close-modal').addEventListener('click', 
        () => loadingModal.style.display = 'none');
        
    loadingModal.addEventListener('click', function(e) {
        if (e.target === this) this.style.display = 'none';
    });
    
    // Auto-hide modal when returning to page
    window.addEventListener('focus', () => loadingModal.style.display = 'none');
})();
