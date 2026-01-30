// Sticky Header Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Reveal Animations on Scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => revealObserver.observe(reveal));

// Active Nav Link Highlight
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

// ========================================
// 3D COVERFLOW CAROUSEL
// ========================================

class Carousel3D {
    constructor(container) {
        this.track = container.querySelector('#carouselTrack');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.prevBtn = container.querySelector('#prevBtn');
        this.nextBtn = container.querySelector('#nextBtn');
        this.dotsContainer = container.querySelector('#carouselDots');

        if (!this.track || this.slides.length === 0) return;

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.createDots();
        this.updateCarousel();
        this.bindEvents();
        this.startAutoplay();
    }

    createDots() {
        if (!this.dotsContainer) return;

        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }

        this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    }

    updateCarousel() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'prev-2', 'next', 'next-2', 'hidden');

            const diff = index - this.currentIndex;

            if (diff === 0) {
                slide.classList.add('active');
            } else if (diff === -1 || (this.currentIndex === 0 && index === this.totalSlides - 1)) {
                if (diff === -1) slide.classList.add('prev');
                else slide.classList.add('prev');
            } else if (diff === -2 || (this.currentIndex <= 1 && index === this.totalSlides - 2 + this.currentIndex)) {
                if (diff === -2) slide.classList.add('prev-2');
                else slide.classList.add('hidden');
            } else if (diff === 1 || (this.currentIndex === this.totalSlides - 1 && index === 0)) {
                if (diff === 1) slide.classList.add('next');
                else slide.classList.add('next');
            } else if (diff === 2 || (this.currentIndex >= this.totalSlides - 2 && index === 1 - (this.totalSlides - 1 - this.currentIndex))) {
                if (diff === 2) slide.classList.add('next-2');
                else slide.classList.add('hidden');
            } else {
                slide.classList.add('hidden');
            }
        });

        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;

        this.isAnimating = true;
        this.currentIndex = index;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.prev();
                this.startAutoplay();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.next();
                this.startAutoplay();
            });
        }

        // Touch/swipe support
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        // Mouse drag support
        let isDragging = false;
        let startX = 0;

        this.track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            this.track.style.cursor = 'grabbing';
        });

        this.track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        this.track.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.cursor = 'grab';

            const diff = e.clientX - startX;
            if (Math.abs(diff) > 50) {
                this.stopAutoplay();
                if (diff > 0) {
                    this.prev();
                } else {
                    this.next();
                }
                this.startAutoplay();
            }
        });

        this.track.addEventListener('mouseleave', () => {
            isDragging = false;
            this.track.style.cursor = 'grab';
        });

        // Click on slide to navigate
        this.slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                const index = parseInt(slide.dataset.index);
                this.stopAutoplay();
                this.goToSlide(index);
                this.startAutoplay();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.stopAutoplay();
                this.prev();
                this.startAutoplay();
            } else if (e.key === 'ArrowRight') {
                this.stopAutoplay();
                this.next();
                this.startAutoplay();
            }
        });
    }

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 50) {
            this.stopAutoplay();
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
            this.startAutoplay();
        }
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, 4000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel3D(carouselContainer);
    }
});

// Form Submission Simulation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your inquiry! The Darshan Health Club team will contact you shortly.');
            contactForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}
