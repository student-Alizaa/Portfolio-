document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFormValidation();
    initScrollEffects();
    initAnimations();
});
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    window.addEventListener('scroll', function() {
        highlightActiveSection();
    });
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        if (isFullNameValid && isEmailValid && isMessageValid) {
            showSuccessMessage();
            form.reset();
        }
    });
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    fullNameInput.addEventListener('input', () => clearFieldError('fullName'));
    emailInput.addEventListener('input', () => clearFieldError('email'));
    messageInput.addEventListener('input', () => clearFieldError('message'));
    function validateFullName() {
        const fullName = fullNameInput.value.trim();
        const errorElement = document.getElementById('fullName-error');
        
        if (fullName === '') {
            showError('fullName', 'Full name is required');
            return false;
        } else if (fullName.length < 2) {
            showError('fullName', 'Full name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            showError('fullName', 'Full name can only contain letters and spaces');
            return false;
        }
        
        clearFieldError('fullName');
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError('email', 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            return false;
        }
        
        clearFieldError('email');
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            showError('message', 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            return false;
        }
        
        clearFieldError('message');
        return true;
    }

    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.style.borderColor = '#ff6b6b';
    }

    function clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        errorElement.classList.remove('show');
        inputElement.style.borderColor = 'rgba(100, 255, 218, 0.2)';
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('input, textarea');
        
        errorElements.forEach(error => error.classList.remove('show'));
        inputElements.forEach(input => input.style.borderColor = 'rgba(100, 255, 218, 0.2)');
        successMessage.classList.remove('show');
    }

    function showSuccessMessage() {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}
function initScrollEffects() {
    const scrollTopButton = document.getElementById('scroll-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
function initAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll('.about-text, .about-image, .project-card, .contact-content');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
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
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(10, 25, 47, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(100, 255, 218, 0.15)';
    } else {
        header.style.background = 'rgba(10, 25, 47, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(100, 255, 218, 0.1)';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100 + 1000);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
       
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
       
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});