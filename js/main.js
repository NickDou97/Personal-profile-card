// Main JavaScript file for Clarity AI Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    setupMobileMenu();
    
    // Neural Network Animation
    createNeuralNetworkAnimation();
    
    // Form Handling
    setupFormHandling();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // FAQ Toggle Functionality
    setupFaqToggles();
    
    // Smooth scrolling for internal links
    setupSmoothScrolling();
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
        
        // Close menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Form Handling Setup
function setupFormHandling() {
    // Newsletter signup form
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
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const company = this.querySelector('#company').value;
            const role = this.querySelector('#role').value;
            const message = this.querySelector('#message').value;
            
            // Simple form validation
            if (!name || !email || !company || !role) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Create success message
            const formContainer = this.parentElement;
            formContainer.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your interest!</h3>
                    <p>We've received your request and will be in touch within 24 hours to schedule your strategy call.</p>
                    <p>A confirmation email has been sent to ${email}.</p>
                </div>
            `;
        });
    }
}

// Scroll Animation Setup
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-observe');
    
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

// Smooth Scrolling for Internal Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
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
    
    // Resize handler
    window.addEventListener('resize', function() {
        // Clear existing animation
        cancelAnimationFrame(animationFrameId);
        
        // Clear existing nodes and connections
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        // Reinitialize animation
        setTimeout(() => {
            createNeuralNetworkAnimation();
        }, 200);
    });
}
