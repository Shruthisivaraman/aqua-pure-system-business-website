/**
 * AQUA PURE SYSTEM - Frontend JavaScript
 * Handles animations, interactions, and user interface enhancements
 */

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================

/**
 * Initialize Intersection Observer for fade-in animations on scroll
 * Applies fade-in-animation class to elements with fade-in-on-scroll class
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.style.animationDelay || '0s';
                
                element.style.animation = `slideInUp 0.8s ease-out forwards`;
                if (delay !== '0s') {
                    element.style.animationDelay = delay;
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-on-scroll class
    document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// ENQUIRY FORM HANDLING
// ==========================================

/**
 * Handle enquiry form submission
 * Collects form data and sends to backend or stores locally
 */
function initEnquiryForm() {
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!name || !phone || !service || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Validate phone number
            const phoneRegex = /^[0-9]{10,}$/;
            if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }

            // Prepare enquiry data
            const enquiryData = {
                name: name,
                phone: phone,
                service: service,
                message: message
            };

            console.log('Sending enquiry:', enquiryData);

            // Send to backend API
            fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enquiryData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Enquiry sent successfully:', data);
                showNotification('Thank you! We will contact you soon.', 'success');
                enquiryForm.reset();
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error sending enquiry:', error);
                showNotification('Failed to send enquiry. Please try again.', 'error');
            });
        });
    }
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

/**
 * Show notification message to user
 * @param {string} message - Message text
 * @param {string} type - Notification type: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.maxWidth = '500px';
    notification.style.borderRadius = '12px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.animation = 'slideInRight 0.3s ease-out';

    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';

    notification.innerHTML = `
        <i class="fas ${icon} me-2"></i>
        <strong>${message}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

/**
 * Enable smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle if target exists
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// NAVBAR ACTIVE LINK HIGHLIGHTING
// ==========================================

/**
 * Update navbar active link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================

/**
 * Set current year in footer copyright
 */
function updateFooterYear() {
    const year = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('footer');
    
    copyrightElements.forEach(footer => {
        const copyright = footer.querySelector('p');
        if (copyright && copyright.textContent.includes('2024')) {
            copyright.textContent = copyright.textContent.replace('2024', year.toString());
        }
    });
}

// ==========================================
// GALLERY MODAL INTERACTIONS
// ==========================================

/**
 * Handle gallery image lightbox modal
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item-card');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const modalContainer = document.getElementById('modalImageContainer');
            if (modalContainer) {
                // Load actual image here or show placeholder
                const galleryLabel = `Installation & Service Image ${index + 1}`;
                modalContainer.innerHTML = `<p class="text-center text-muted fw-bold">${galleryLabel}</p>`;
            }
        });
    });
}

// ==========================================
// REVIEW SYSTEM
// ==========================================

/**
 * Load and display saved reviews
 */
function loadSavedReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const noReviewsMessage = document.getElementById('noReviewsMessage');
    
    if (!reviewsContainer) return;

    // Fetch from localStorage (for demo)
    // TODO: Replace with API GET /api/reviews
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

    if (reviews.length > 0 && noReviewsMessage) {
        noReviewsMessage.style.display = 'none';
    }

    reviews.forEach(review => {
        createReviewCard(review.name, review.rating, review.comment);
    });
}

/**
 * Create and display a review card
 * @param {string} name - Reviewer name
 * @param {number} rating - Star rating (1-5)
 * @param {string} comment - Review comment
 */
function createReviewCard(name, rating, comment) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;

    const reviewCard = document.createElement('div');
    reviewCard.className = 'col-lg-6 fade-in-on-scroll';
    
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHTML += '<i class="fas fa-star" style="color: #fbbf24; margin-right: 3px;"></i>';
        } else {
            starsHTML += '<i class="fas fa-star" style="color: #d1d5db; margin-right: 3px;"></i>';
        }
    }

    reviewCard.innerHTML = `
        <div class="card rounded-4 shadow-sm p-4 h-100">
            <div class="mb-3">
                ${starsHTML}
            </div>
            <p class="card-text text-muted lh-lg mb-3">"${comment}"</p>
            <p class="fw-bold mb-0">— ${name}</p>
        </div>
    `;

    reviewsContainer.appendChild(reviewCard);
}

// ==========================================
// FORM INPUT VALIDATION
// ==========================================

/**
 * Add real-time validation to form inputs
 */
function initFormValidation() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    const emailInputs = document.querySelectorAll('input[type="email"]');

    // Phone validation
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const phoneRegex = /^[0-9]{10,}$/;
            if (this.value && !phoneRegex.test(this.value.replace(/[-\s]/g, ''))) {
                this.style.borderColor = '#ef4444';
                this.title = 'Please enter a valid phone number';
            } else {
                this.style.borderColor = '';
                this.title = '';
            }
        });
    });

    // Email validation
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ef4444';
                this.title = 'Please enter a valid email address';
            } else {
                this.style.borderColor = '';
                this.title = '';
            }
        });
    });
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

/**
 * Add ripple effect to buttons on click
 */
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleAnimation 0.6s ease-out';

            this.style.overflow = 'hidden';
            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ==========================================
// LAZY LOAD IMAGES
// ==========================================

/**
 * Implement lazy loading for images
 */
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.getAttribute('data-src')) {
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ==========================================

/**
 * Close mobile navbar when a link is clicked
 */
function initMobileMenuClose() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const toggle = document.querySelector('.navbar-toggler');
                toggle.click();
            }
        });
    });
}

// ==========================================
// INITIALIZE ALL ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing AQUA PURE SYSTEM Frontend...');

    // Initialize all features
    initScrollAnimations();
    initEnquiryForm();
    initSmoothScroll();
    updateActiveNavLink();
    updateFooterYear();
    initGalleryModal();
    loadSavedReviews();
    initFormValidation();
    initButtonRipple();
    initLazyLoad();
    initMobileMenuClose();

    console.log('Frontend initialization complete!');
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

/**
 * Add keyboard shortcuts
 * - ESC: Close modals
 * - CTRL + K: Focus search (if available)
 */
document.addEventListener('keydown', function(event) {
    // Close modals on ESC
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        });
    }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

/**
 * Debounce function for resize events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize events
 */
const handleResize = debounce(function() {
    console.log('Window resized');
    // Recalculate any dynamic layouts here if needed
}, 250);

window.addEventListener('resize', handleResize);

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format phone number for display
 * @param {string} phone - Phone number string
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const pattern = /(\d{5})(\d{5})/;
    return cleaned.replace(pattern, '$1 $2');
}

/**
 * Check if device is mobile
 * @returns {boolean} True if mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string} Parameter value or null
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================

console.log('%cAQUA PURE SYSTEM', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cWater Filter Installation & Maintenance Services', 'font-size: 14px; color: #6b7280;');
console.log('%cVersion 1.0.0 | © 2024', 'font-size: 12px; color: #9ca3af;');
