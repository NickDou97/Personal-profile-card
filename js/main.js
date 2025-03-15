// Setup Counter Animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    // Function to animate counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 50; // update every 50ms
        const totalSteps = duration / stepTime;
        const stepValue = target / totalSteps;
        let current = 0;
        
        const updateCounter = () => {
            current += stepValue;
            if (current > target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, stepTime);
        };
        
        updateCounter();
    }
    
    // Setup Intersection Observer to trigger counter when visible
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Setup Animation Toggle
function setupAnimationToggle() {
    const toggleBtn = document.getElementById('toggle-animation');
    const neuralNetwork = document.getElementById('neural-network');
    
    if (toggleBtn && neuralNetwork) {
        // Check for saved preference
        const animationDisabled = localStorage.getItem('animation-disabled') === 'true';
        
        // Apply saved preference
        if (animationDisabled) {
            neuralNetwork.style.display = 'none';
            toggleBtn.classList.add('disabled');
            toggleBtn.title = 'Enable Animation';
        }
        
        toggleBtn.addEventListener('click', function() {
            if (neuralNetwork.style.display === 'none') {
                // Enable animation
                neuralNetwork.style.display = 'block';
                toggleBtn.classList.remove('disabled');
                toggleBtn.title = 'Disable Animation';
                localStorage.setItem('animation-disabled', 'false');
                
                // Restart animation
                createNeuralNetworkAnimation();
            } else {
                // Disable animation
                neuralNetwork.style.display = 'none';
                toggleBtn.classList.add('disabled');
                toggleBtn.title = 'Enable Animation';
                localStorage.setItem('animation-disabled', 'true');
                
                // Clear all animation nodes
                while (neuralNetwork.firstChild) {
                    neuralNetwork.removeChild(neuralNetwork.firstChild);
                }
            }
        });
    }
}

// Solutions Section Tab Functionality
function setupSolutionTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding tab content
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
                
                // Reset and restart animations
                setupAnimations();
            });
        });
    }
}

// Setup Workflow Animation
function setupWorkflowAnimation() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const progressBar = document.querySelector('.progress-bar');
    
    if (workflowSteps.length && progressBar) {
        let currentStep = 0;
        
        // Reset all steps first
        workflowSteps.forEach(step => step.classList.remove('active'));
        
        // Set the first step as active initially
        workflowSteps[0].classList.add('active');
        progressBar.style.width = '20%';
        
        // Start animation cycle
        const animateWorkflow = () => {
            currentStep = (currentStep + 1) % workflowSteps.length;
            
            // Update active step
            workflowSteps.forEach(step => step.classList.remove('active'));
            workflowSteps[currentStep].classList.add('active');
            
            // Update progress bar
            progressBar.style.width = `${(currentStep + 1) * (100 / workflowSteps.length)}%`;
        };
        
        // Set interval for animation, but clear any existing interval first
        if (window.workflowInterval) clearInterval(window.workflowInterval);
        window.workflowInterval = setInterval(animateWorkflow, 2500);
    }
}

// Setup Data Points Animation
function setupDataAnimation() {
    const dataPoints = document.querySelectorAll('.data-point');
    const dataContainer = document.querySelector('.data-animation');
    const connectionsContainer = document.querySelector('.data-connections');
    
    if (dataPoints.length && dataContainer && connectionsContainer) {
        // Clear existing connections first
        connectionsContainer.innerHTML = '';
        
        // Position data points randomly
        dataPoints.forEach((point, index) => {
            const x = 10 + (Math.random() * 80); // Keep within 10-90% of container width
            const y = 10 + (Math.random() * 80); // Keep within 10-90% of container height
            
            point.style.left = `${x}%`;
            point.style.top = `${y}%`;
            
            // Add subtle animation
            point.style.animation = `pulse ${2 + Math.random() * 2}s infinite`;
            point.style.animationDelay = `${Math.random() * 2}s`;
        });
        
        // Create connections between points (not all, just some close ones)
        for (let i = 0; i < dataPoints.length; i++) {
            const point1 = dataPoints[i].getBoundingClientRect();
            const point1CenterX = point1.left + point1.width / 2;
            const point1CenterY = point1.top + point1.height / 2;
            
            for (let j = i + 1; j < dataPoints.length; j++) {
                const point2 = dataPoints[j].getBoundingClientRect();
                const point2CenterX = point2.left + point2.width / 2;
                const point2CenterY = point2.top + point2.height / 2;
                
                // Calculate distance between points
                const dx = point2CenterX - point1CenterX;
                const dy = point2CenterY - point1CenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Only connect close points (adjust threshold as needed)
                if (distance < 100) {
                    const connection = document.createElement('div');
                    connection.className = 'data-connection';
                    connection.style.position = 'absolute';
                    connection.style.height = '1px';
                    connection.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    
                    // Position and rotate the connection line
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    const length = distance;
                    
                    connection.style.width = `${length}px`;
                    connection.style.left = `${point1CenterX - dataContainer.getBoundingClientRect().left}px`;
                    connection.style.top = `${point1CenterY - dataContainer.getBoundingClientRect().top}px`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    connection.style.transformOrigin = 'left center';
                    
                    connectionsContainer.appendChild(connection);
                }
            }
        }
    }
}

// Setup All Animations
function setupAnimations() {
    setupWorkflowAnimation();
    setupDataAnimation();
    
    // Add any other animations here as needed
}

// Initialize custom animations if their scripts are loaded
function initCustomAnimations() {
    // Check if the scripts are loaded and execute if available
    if (typeof window.confettiManager !== 'undefined') {
        console.log('Confetti animation loaded');
    }
    
    // Add any animation resets or customizations here
}

// Initialize Everything for Solutions Section
window.initSolutionsSection = function() {
    setupSolutionTabs();
    setupAnimations();
    
    // Add solutions section to the existing scroll observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If this is one of our animation containers, reset animations
                if (entry.target.closest('.tab-content')) {
                    setupAnimations();
                }
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all scroll elements in the solutions section
    document.querySelectorAll('.solutions-section .scroll-observe').forEach(el => {
        scrollObserver.observe(el);
    });
};

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
    
    // Setup animation toggle
    setupAnimationToggle();
    
    // Setup counter animations
    setupCounterAnimations();
    
    // Initialize custom animations
    initCustomAnimations();
    
    // Initialize Solutions Section if it exists
    if (document.querySelector('.solutions-section')) {
        window.initSolutionsSection();
    }
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
    
    // Performance optimization - reduce the number of nodes and connections
    const width = container.clientWidth;
    const height = container.clientHeight;
    const nodeCount = Math.min(20, Math.floor(width * height / 20000)); // Reduced node count
    const nodes = [];
    const connections = [];
    const connectionDistance = Math.min(150, width * 0.15); 
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 4 + 2;
        const speedX = (Math.random() - 0.5) * 0.3; // Slower movement
        const speedY = (Math.random() - 0.5) * 0.3; // Slower movement
        
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
    
    // Create connections (significantly reduced for performance)
    const maxConnections = Math.min(nodeCount * 2, 30); // Much fewer connections
    let connectionCount = 0;
    
    for (let i = 0; i < nodeCount && connectionCount < maxConnections; i++) {
        // Only connect to a few nearby nodes
        for (let j = i + 1; j < Math.min(i + 4, nodeCount) && connectionCount < maxConnections; j++) {
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
    const fps = 20; // Reduced FPS for better performance
    const interval = 1000 / fps;
    let isScrolling = false;
    
    // Pause animation during scroll
    window.addEventListener('scroll', function() {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        const scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 200);
    });
    
    function animate(timestamp) {
        animationFrameId = requestAnimationFrame(animate);
        
        // Skip frames if scrolling or to maintain desired FPS
        if (isScrolling || timestamp - lastTimestamp < interval) return;
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
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Debounce resize handler
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Clear existing animation
            cancelAnimationFrame(animationFrameId);
            
            // Clear existing nodes and connections
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            
            // Reinitialize animation
            createNeuralNetworkAnimation();
        }, 300);
    });
}

// Hero Terminal Animation
function resetHeroAnimation() {
    const codeLines = document.querySelectorAll('.hero-terminal .code-line');
    codeLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        void line.offsetWidth; // Trigger reflow
        line.style.opacity = '';
        line.style.transform = '';
    });
}

function updateHeroScores() {
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-99
    const leads = Math.floor(Math.random() * 15) + 15; // Random leads between 15-29
    
    const scoreElement = document.querySelector('.score-value');
    const leadsElement = document.querySelector('.leads-value');
    const statusElement = document.querySelector('.hero-terminal .process-badge.status-high');
    
    if (scoreElement) scoreElement.textContent = score;
    if (leadsElement) leadsElement.textContent = leads;
    
    if (statusElement) {
        if (score >= 90) {
            statusElement.textContent = 'Premium';
            statusElement.style.background = 'rgba(94, 234, 212, 0.2)';
            statusElement.style.borderColor = 'rgba(94, 234, 212, 0.4)';
        } else if (score >= 80) {
            statusElement.textContent = 'High Value';
            statusElement.style.background = 'rgba(56, 189, 248, 0.15)';
            statusElement.style.borderColor = 'rgba(56, 189, 248, 0.3)';
        } else {
            statusElement.textContent = 'Qualified';
            statusElement.style.background = 'rgba(45, 55, 72, 0.2)';
            statusElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    }
}

// Start the hero animation loop
let heroAnimationInterval = setInterval(() => {
    resetHeroAnimation();
    updateHeroScores();
}, 8000); // Reset every 8 seconds

// Initial update
updateHeroScores();

// Cleanup interval when page changes
window.addEventListener('beforeunload', () => {
    clearInterval(heroAnimationInterval);
});

// Form Validation and Character Count
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const messageTextarea = document.getElementById('message');
    const characterCount = document.querySelector('.character-count .current');
    
    // Character count
    if (messageTextarea && characterCount) {
        messageTextarea.addEventListener('input', () => {
            const current = messageTextarea.value.length;
            const max = messageTextarea.getAttribute('maxlength');
            characterCount.textContent = current;
            
            if (current >= max - 50) {
                characterCount.parentElement.style.color = 'var(--error-color)';
            } else {
                characterCount.parentElement.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    // Form validation
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                input.addEventListener('invalid', (e) => {
                    e.preventDefault();
                    showError(input);
                });
                
                input.addEventListener('input', () => {
                    if (input.validity.valid) {
                        hideError(input);
                    } else {
                        showError(input);
                    }
                });
            }
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (form.checkValidity()) {
                const submitButton = form.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                try {
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitButton.disabled = true;
                    
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (!response.ok) throw new Error('Submission failed');
                    
                    // Success
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    submitButton.style.backgroundColor = 'var(--success-color)';
                    form.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.style.backgroundColor = '';
                        submitButton.disabled = false;
                    }, 3000);
                    
                } catch (error) {
                    console.error('Form submission error:', error);
                    submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
                    submitButton.style.backgroundColor = 'var(--error-color)';
                    
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.style.backgroundColor = '';
                        submitButton.disabled = false;
                    }, 3000);
                }
            } else {
                // Show errors for all invalid fields
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        showError(input);
                    }
                });
            }
        });
    }
});

function showError(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        let message = '';
        
        if (input.validity.valueMissing) {
            message = 'This field is required';
        } else if (input.validity.typeMismatch) {
            message = `Please enter a valid ${input.type}`;
        } else if (input.validity.patternMismatch) {
            message = input.title || 'Please match the requested format';
        } else if (input.validity.tooShort) {
            message = `Must be at least ${input.getAttribute('minlength')} characters`;
        } else if (input.validity.tooLong) {
            message = `Must be no more than ${input.getAttribute('maxlength')} characters`;
        }
        
        errorMessage.textContent = message;
    }
}

function hideError(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.textContent = '';
    }
}
