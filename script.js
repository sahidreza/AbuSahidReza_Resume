// Loading Screen - Compatible with all browsers
const initLoader = () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleLoader);
    } else {
        handleLoader();
    }
};

const handleLoader = () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            
            // Initialize particles after loading
            setTimeout(() => {
                initParticles();
            }, 500);
        }
    }, 1500);
};

initLoader();

// Fallback for older browsers
window.addEventListener('load', handleLoader);

// Particle Animation
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get actual viewport dimensions (fixes iOS Safari issues)
    const updateCanvasSize = () => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Set CSS size to prevent blurriness
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    };
    
    updateCanvasSize();
    
    const particles = [];
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleCount = isMobile ? 25 : 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', updateCanvasSize);
    
    // Fix for iOS orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(updateCanvasSize, 100);
    });
}

// Mobile Menu Toggle - Touch optimized
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    // Use touchstart for better mobile response
    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchend', toggleMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Enhanced Intersection Observer with stagger
const observeElements = (selector, delay = 0) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * delay}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * delay}s`;
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elementObserver.observe(el);
    });
};

// Observe elements with stagger
observeElements('.section', 0.1);
observeElements('.expertise-card', 0.1);
observeElements('.timeline-item', 0.15);
observeElements('.stat-card', 0.1);
observeElements('.education-card', 0.1);
observeElements('.contact-item', 0.1);

// Add active class to current nav link
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id') || 'home';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === 'home' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        }
    });
});

// Enhanced Parallax effects - optimized for mobile
let ticking = false;

const updateParallax = () => {
    const scrolled = window.pageYOffset || window.pageY || document.documentElement.scrollTop;
    const hero = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-wrapper');
    
    if (hero && scrolled < window.innerHeight) {
        const parallaxOffset = scrolled * 0.2;
        hero.style.webkitTransform = `translateY(${parallaxOffset}px)`;
        hero.style.transform = `translateY(${parallaxOffset}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
    }
    
    if (heroImage && scrolled < window.innerHeight) {
        const parallaxOffset = scrolled * 0.15;
        heroImage.style.webkitTransform = `translateY(${parallaxOffset}px)`;
        heroImage.style.transform = `translateY(${parallaxOffset}px)`;
    }
    
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Optimize scroll performance
const optimizeScroll = () => {
    // Use passive listeners where possible for better performance
    const scrollElements = document.querySelectorAll('.hero, .section');
    scrollElements.forEach(el => {
        el.style.willChange = 'transform';
    });
};

// Call after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeScroll);
} else {
    optimizeScroll();
}

// Fix for iOS Safari viewport height issue
const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
});

// Enhanced hover effects for expertise cards
const expertiseCards = document.querySelectorAll('.expertise-card');
expertiseCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced hover effects for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.01)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Smooth reveal animation for stats
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.9)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    statsObserver.observe(card);
    
    // Add pulse animation on hover
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(0) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll reveal for sections
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    revealOnScroll.observe(section);
});

// Add cursor trail effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Animate numbers in stat cards
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '') + 
                             (element.textContent.includes('%') ? '%' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Trigger number animation when stats come into view
statCards.forEach(card => {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberEl = entry.target.querySelector('.stat-number');
                if (numberEl && !numberEl.classList.contains('animated')) {
                    numberEl.classList.add('animated');
                    const text = numberEl.textContent;
                    const num = parseInt(text);
                    if (!isNaN(num)) {
                        animateValue(numberEl, 0, num, 2000);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    statObserver.observe(card);
});
