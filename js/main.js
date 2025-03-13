// Main JavaScript file for Agentic AI Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    setupMobileMenu();
    
    // Neural Network Animation
    createNeuralNetworkAnimation();
    
    // Form Handling
    setupFormHandling();
    
    // Initialize text effects
    initTextEffects();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize fade-in effect
    initFadeInEffect();
    
    // FAQ Toggle Functionality
    setupFaqToggles();
});

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// Form Handling Setup
function setupFormHandling() {
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Create success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thank you for subscribing with: ${email}`;
            
            // Replace form with success message
            this.innerHTML = '';
            this.appendChild(successMsg);
        });
    }
}

// Text Effect Initialization
function initTextEffects() {
    // Setup highlight text effects
    const highlightElements = document.querySelectorAll('.highlight-text');
    
    if (highlightElements.length) {
        highlightElements.forEach(el => {
            // Add active class after a small delay for initial effect
            setTimeout(() => {
                el.classList.add('active');
            }, 500 + Math.random() * 1000); // Random delay between 500ms and 1500ms
        });
    }
    
    // Setup clarity text effects
    const clarityElements = document.querySelectorAll('.clarity-text');
    
    if (clarityElements.length) {
        clarityElements.forEach(el => {
            setTimeout(() => {
                el.classList.add('active');
            }, 300 + Math.random() * 700);
        });
    }
}

// Scroll Animation Setup
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-observe, .service-card');
    
    if (scrollElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
        
        scrollElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Fade-in animation for content 
function initFadeInEffect() {
    const fadeItems = document.querySelectorAll('.fade-in-item');
    
    if (fadeItems.length) {
        // Create IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If element is in viewport
                if (entry.isIntersecting) {
                    // Calculate delay based on order of appearance
                    const index = Array.from(fadeItems).indexOf(entry.target);
                    const delay = index * 150; // 150ms incremental delay between items
                    
                    // Apply delay and add visible class
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1, // trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // slightly before scrolling into full view
        });
        
        // Start observing each item
        fadeItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// FAQ Toggle Setup
function setupFaqToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle answer visibility
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    answer.style.display = 'block';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });
        
        // Initialize: Hide all answers initially
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.style.display = 'none';
        });
    }
}

// Neural Network Animation 
function createNeuralNetworkAnimation() {
    const container = document.getElementById('neural-network');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    const nodeCount = Math.min(40, Math.floor(width * height / 10000)); // Responsive node count
    const nodes = [];
    const connections = [];
    const connectionDistance = Math.min(150, width * 0.15); // Responsive connection distance
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 4 + 2;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        node.style.width = size + 'px';
        node.style.height = size + 'px';
        node.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(node);
        
        nodes.push({
            element: node,
            x, y, size, speedX, speedY
        });
    }
    
    // Create connections (limit based on device performance)
    const maxConnections = Math.min(nodeCount * nodeCount * 0.3, 200);
    let connectionCount = 0;
    
    for (let i = 0; i < nodeCount && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < nodeCount && connectionCount < maxConnections; j++) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            container.appendChild(connection);
            
            connections.push({
                element: connection,
                from: nodes[i],
                to: nodes[j]
            });
            
            connectionCount++;
        }
    }
    
    // Animation loop with performance optimization
    let animationFrameId;
    let lastTimestamp = 0;
    const fps = 30;
    const interval = 1000 / fps;
    
    function animate(timestamp) {
        animationFrameId = requestAnimationFrame(animate);
        
        // Throttle to desired fps
        if (timestamp - lastTimestamp < interval) return;
        lastTimestamp = timestamp;
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Bounce off edges
            if (node.x <= 0 || node.x >= width) node.speedX *= -1;
            if (node.y <= 0 || node.y >= height) node.speedY *= -1;
            
            node.element.style.left = node.x + 'px';
            node.element.style.top = node.y + 'px';
        });
        
        // Update connections
        connections.forEach(conn => {
            const dx = conn.from.x - conn.to.x;
            const dy = conn.from.y - conn.to.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                
                const centerX = (conn.from.x + conn.to.x) / 2;
                const centerY = (conn.from.y + conn.to.y) / 2;
                
                conn.element.style.width = distance + 'px';
                conn.element.style.left = centerX + 'px';
                conn.element.style.top = centerY + 'px';
                
                // Calculate angle for rotation
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                conn.element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                conn.element.style.opacity = opacity * 0.5;
                conn.element.style.display = 'block';
            } else {
                conn.element.style.display = 'none';
            }
        });
    }
    
    // Start animation
    animate(0);
    
    // Cleanup on page visibility change to save resources
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animate(0);
        }
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if(navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});
