// Main JavaScript for ClarityAI - Monochromatic Theme
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initAnimations();
    initFormHandling();
    initCounters();
    initFaqAccordions();
    
    // Initialize tabs if solution tabs exist
    if (document.querySelector('.tab-navigation')) {
        initTabs();
    }
    
    // Create and enable dark mode toggle
    createDarkModeToggle();
    
    // Initialize neural network animation
    createNeuralNetworkAnimation();
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Update aria-expanded attribute
            const expanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });
        
        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Scroll handling for navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation functionality
function initAnimations() {
    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Hero terminal animation
    animateTerminal();
}

// Terminal animation in hero section
function animateTerminal() {
    const codeLines = document.querySelectorAll('.code-line');
    if (!codeLines.length) return;
    
    // Reset animations
    function resetAnimation() {
        codeLines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';
            void line.offsetWidth; // Trigger reflow
            
            // Remove and reapply animation style
            line.style.animation = 'none';
            void line.offsetWidth; // Trigger reflow
            line.style.animation = '';
        });
    }
    
    // Update dynamic data
    function updateTerminalData() {
        const scoreElement = document.querySelector('.score-value');
        const leadsElement = document.querySelector('.leads-value');
        
        if (scoreElement) {
            const score = Math.floor(Math.random() * 20) + 80; // 80-99
            scoreElement.textContent = score;
            
            // Update status badge based on score
            const statusBadge = document.querySelector('.status-high');
            if (statusBadge) {
                if (score >= 90) {
                    statusBadge.textContent = 'Premium';
                } else if (score >= 85) {
                    statusBadge.textContent = 'High Value';
                } else {
                    statusBadge.textContent = 'Qualified';
                }
            }
        }
        
        if (leadsElement) {
            const leads = Math.floor(Math.random() * 15) + 20; // 20-34
            leadsElement.textContent = leads;
        }
    }
    
    // Initial update
    updateTerminalData();
    
    // Set interval for animation cycle
    const terminalInterval = setInterval(() => {
        resetAnimation();
        updateTerminalData();
    }, 8000); // Reset every 8 seconds
    
    // Cleanup on page change
    window.addEventListener('beforeunload', () => {
        clearInterval(terminalInterval);
    });
}

// Form handling functionality
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Character counter for textareas
        const textareas = form.querySelectorAll('textarea[maxlength]');
        textareas.forEach(textarea => {
            const counter = textarea.parentElement.querySelector('.character-count .current');
            if (counter) {
                textarea.addEventListener('input', () => {
                    const current = textarea.value.length;
                    const max = textarea.getAttribute('maxlength');
                    counter.textContent = current;
                    
                    // Style counter when approaching limit
                    if (current >= max - 50) {
                        counter.parentElement.style.color = 'var(--error-color)';
                    } else {
                        counter.parentElement.style.color = '';
                    }
                });
            }
        });
        
        // Form validation
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    showError(field, 'This field is required');
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    valid = false;
                    showError(field, 'Please enter a valid email address');
                } else {
                    clearError(field);
                }
            });
            
            // If valid, simulate form submission
            if (valid) {
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    // Show loading state
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate server response (would be replaced with actual AJAX)
                    setTimeout(() => {
                        // Show success state
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                        submitBtn.classList.add('success');
                        
                        // Reset form
                        form.reset();
                        
                        // Trigger success message or redirect
                        showFormSuccess(form);
                        
                        // Reset button after delay
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('success');
                        }, 3000);
                    }, 1500);
                }
            }
        });
    });
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(field, message) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            field.classList.add('error');
        }
    }
    
    function clearError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }
    
    function showFormSuccess(form) {
        // For contact form, show a success message
        if (form.id === 'contact-form') {
            const formContainer = form.closest('.contact-form-container');
            if (formContainer) {
                const successHtml = `
                    <div class="form-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Thank you!</h3>
                        <p>We've received your request and will be in touch within 24 hours to schedule your strategy call.</p>
                    </div>
                `;
                
                // Replace form with success message
                form.style.opacity = '0';
                setTimeout(() => {
                    formContainer.innerHTML = successHtml;
                    // Trigger confetti if available
                    if (typeof triggerConfetti === 'function') {
                        triggerConfetti();
                    }
                }, 300);
            }
        }
        
        // For newsletter form
        if (form.classList.contains('signup-form')) {
            const parent = form.parentElement;
            if (parent) {
                const email = form.querySelector('input[type="email"]').value;
                const successHtml = `
                    <div class="newsletter-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>You're on the list!</h3>
                        <p>We've added ${email} to our newsletter. Watch for AI insights in your inbox soon!</p>
                    </div>
                `;
                
                // Replace form with success message
                form.style.opacity = '0';
                setTimeout(() => {
                    parent.innerHTML = successHtml;
                }, 300);
            }
        }
    }
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
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
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 20; // update every 20ms
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
                return;
            }
            
            counter.textContent = Math.round(current);
        }, stepTime);
    }
}

// FAQ accordions
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Set initial state - hide answers
            answer.style.display = 'none';
            
            // Add click handler
            question.addEventListener('click', () => {
                // Toggle this answer
                const isOpen = answer.style.display === 'block';
                
                // Toggle icon
                const icon = question.querySelector('i');
                if (icon) {
                    icon.className = isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
                }
                
                // Toggle answer with smooth animation
                if (isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    setTimeout(() => {
                        answer.style.maxHeight = '0';
                        setTimeout(() => {
                            answer.style.display = 'none';
                        }, 300);
                    }, 10);
                } else {
                    answer.style.display = 'block';
                    answer.style.maxHeight = '0';
                    setTimeout(() => {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }, 10);
                }
            });
        }
    });
}

// Tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Set initial state - first tab active
    if (tabButtons.length && tabContents.length) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
        
        // Add click handlers
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Get tab ID
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    // Reset animation if needed
                    content.style.animation = 'none';
                    void content.offsetWidth;
                    content.style.animation = '';
                });
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding tab content
                const activeContent = document.getElementById(`${tabId}-tab`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }
}

// Dark mode toggle
function createDarkModeToggle() {
    // Only create if it doesn't exist already
    if (!document.querySelector('.theme-toggle')) {
        // Create toggle button
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        
        // Check user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        // Apply theme based on preference or saved value
        if (savedTheme === 'dark' || (prefersDark && !savedTheme)) {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Add click handler
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                toggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                toggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Add to document
        document.body.appendChild(toggle);
    }
}

// Neural Network Animation 
function createNeuralNetworkAnimation() {
    const container = document.getElementById('neural-network');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Calculate node count based on screen size
    const nodeCount = Math.min(30, Math.floor(width * height / 15000));
    const nodes = [];
    const connections = [];
    const connectionDistance = Math.min(200, width * 0.2);
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        // Random position
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        // Random size between 3 and 6px
        const size = Math.random() * 3 + 3;
        
        // Movement speed (slower for smoother animation)
        const speedX = (Math.random() - 0.5) * 0.2;
        const speedY = (Math.random() - 0.5) * 0.2;
        
        // Set node style
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        node.style.width = size + 'px';
        node.style.height = size + 'px';
        
        // Set opacity based on size for depth effect
        node.style.opacity = (size - 3) / 3 * 0.5 + 0.3;
        
        // Apply pulsing animation to some nodes
        if (Math.random() > 0.7) {
            node.style.animation = `pulse ${2 + Math.random() * 2}s infinite`;
            node.style.animationDelay = `${Math.random() * 2}s`;
        }
        
        // Add to document and store data
        container.appendChild(node);
        nodes.push({
            element: node,
            x, y, size, speedX, speedY
        });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            // Calculate distance between nodes
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only create connections between close nodes
            if (distance < connectionDistance) {
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                // Set initial position and opacity based on distance
                const opacity = 1 - (distance / connectionDistance);
                connection.style.opacity = opacity * 0.3;
                
                container.appendChild(connection);
                
                connections.push({
                    element: connection,
                    from: nodes[i],
                    to: nodes[j],
                    opacity
                });
            }
        }
    }
    
    // Animation function
    let animationFrameId;
    function animate() {
        // Request next frame
        animationFrameId = requestAnimationFrame(animate);
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Bounce off edges
            if (node.x <= 0 || node.x >= width) node.speedX *= -1;
            if (node.y <= 0 || node.y >= height) node.speedY *= -1;
            
            // Update position
            node.element.style.left = node.x + 'px';
            node.element.style.top = node.y + 'px';
        });
        
        // Update connections
        connections.forEach(conn => {
            const dx = conn.to.x - conn.from.x;
            const dy = conn.to.y - conn.from.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Update connection only if nodes are close enough
            if (distance < connectionDistance) {
                // Calculate connection opacity based on distance
                const opacity = (1 - (distance / connectionDistance)) * 0.3;
                conn.element.style.opacity = opacity;
                
                // Calculate width (length of connection)
                conn.element.style.width = distance + 'px';
                
                // Position at first node
                conn.element.style.left = conn.from.x + 'px';
                conn.element.style.top = conn.from.y + 'px';
                
                // Calculate angle for rotation
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                conn.element.style.transform = `rotate(${angle}deg)`;
                
                // Show connection
                conn.element.style.display = 'block';
            } else {
                // Hide connection if nodes too far apart
                conn.element.style.display = 'none';
            }
        });
    }
    
    // Start animation
    animate();
    
    // Handle page visibility changes to improve performance
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animate();
        }
    });
    
    // Setup animation toggle
    setupAnimationToggle();
}

// Setup animation toggle
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
            toggleBtn.title = 'Enable Background Animation';
        }
        
        // Add click handler
        toggleBtn.addEventListener('click', function() {
            if (neuralNetwork.style.display === 'none') {
                // Enable animation
                neuralNetwork.style.display = 'block';
                toggleBtn.classList.remove('disabled');
                toggleBtn.title = 'Disable Background Animation';
                localStorage.setItem('animation-disabled', 'false');
                
                // Restart animation
                createNeuralNetworkAnimation();
            } else {
                // Disable animation
                neuralNetwork.style.display = 'none';
                toggleBtn.classList.add('disabled');
                toggleBtn.title = 'Enable Background Animation';
                localStorage.setItem('animation-disabled', 'true');
                
                // Clear all animation nodes
                neuralNetwork.innerHTML = '';
            }
        });
    }
}

// Confetti Animation for Form Success
function triggerConfetti(options = {}) {
    // Skip animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Create canvas for animation
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Get context
    const ctx = canvas.getContext('2d');
    
    // Default options
    const settings = {
        particleCount: options.particleCount || 100,
        startVelocity: options.startVelocity || 30,
        spread: options.spread || 70,
        origin: options.origin || { x: 0.5, y: 0.5 },
        gravity: options.gravity || 1,
        ticks: options.ticks || 200,
        colors: options.colors || ['#5E5CDE', '#8684FF', '#7B79E8', '#4946D1', '#E8E8FF']
    };
    
    // Particles array
    const particles = [];
    
    // Create particles
    for (let i = 0; i < settings.particleCount; i++) {
        particles.push({
            x: settings.origin.x,
            y: settings.origin.y,
            color: settings.colors[Math.floor(Math.random() * settings.colors.length)],
            size: Math.random() * 10 + 5,
            velocity: {
                x: (Math.random() - 0.5) * settings.spread,
                y: (Math.random() * -settings.startVelocity) - 10
            },
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 5,
            opacity: 1,
            shape: Math.random() > 0.5 ? 'circle' : 'rect'
        });
    }
    
    // Remaining ticks
    let tick = 0;
    
    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update particles
        particles.forEach(p => {
            // Update position
            p.x += p.velocity.x * 0.01;
            p.y += p.velocity.y * 0.01;
            
            // Apply gravity
            p.velocity.y += settings.gravity * 0.1;
            
            // Update rotation
            p.rotation += p.rotationSpeed;
            
            // Reduce opacity based on position
            p.opacity = Math.max(0, p.opacity - 0.005);
            
            // Draw particle
            ctx.save();
            ctx.translate(p.x * canvas.width, p.y * canvas.height);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            
            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
            
            ctx.restore();
        });
        
        // Increment tick
        tick++;
        
        // Continue animation if ticks remaining and at least one visible particle
        if (tick < settings.ticks && particles.some(p => p.opacity > 0)) {
            requestAnimationFrame(animate);
        } else {
            // Remove canvas when done
            canvas.remove();
        }
    }
    
    // Start animation
    requestAnimationFrame(animate);
}

// Make confetti function globally available
window.triggerConfetti = triggerConfetti;
