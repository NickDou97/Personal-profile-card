// Confetti Animation for Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas when needed
    function createCanvas() {
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
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        return canvas;
    }
    
    // Class for managing confetti
    class ConfettiManager {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.colors = [
                '#4285F4', // Blue
                '#34A853', // Green
                '#FBBC05', // Yellow
                '#EA4335', // Red
                '#673AB7', // Purple
                '#3498db', // Light blue
                '#2ecc71'  // Light green
            ];
            this.animationId = null;
        }
        
        init() {
            if (!this.canvas) {
                this.canvas = createCanvas();
                this.ctx = this.canvas.getContext('2d');
            }
        }
        
        // Create a particle
        createParticle(x, y) {
            const size = Math.random() * 10 + 5;
            return {
                x: x || Math.random() * this.canvas.width,
                y: y || -20,
                size: size,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
                rotation: Math.random() * 0.2 - 0.1,
                rotationSpeed: Math.random() * 0.01 - 0.005,
                gravity: Math.random() * 0.15 + 0.1,
                opacity: 1,
                shape: Math.random() > 0.5 ? 'circle' : 'rect',
                wobble: Math.random() * 0.1
            };
        }
        
        // Draw a particle
        drawParticle(p) {
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;
            
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            
            if (p.shape === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
            
            this.ctx.restore();
            this.ctx.globalAlpha = 1;
        }
        
        // Update particle position
        updateParticle(p) {
            p.rotation += p.rotationSpeed;
            p.x += Math.cos(p.angle) * p.speed;
            p.y += p.speed + p.gravity;
            p.x += Math.sin(Date.now() * 0.001 + p.x * 0.01) * p.wobble;
            
            // Fade out as it falls
            if (p.y > 100) {
                p.opacity -= 0.01;
            }
            
            return p.opacity > 0 && p.y < this.canvas.height;
        }
        
        // Animate the confetti
        animate() {
            if (!this.ctx) return;
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update particles
            this.particles = this.particles.filter(p => {
                this.drawParticle(p);
                return this.updateParticle(p);
            });
            
            // Continue animation if particles exist
            if (this.particles.length > 0) {
                this.animationId = requestAnimationFrame(() => this.animate());
            } else {
                this.cleanup();
            }
        }
        
        // Start the confetti
        start(x, y, count = 100) {
            this.init();
            
            // Create particles
            for (let i = 0; i < count; i++) {
                this.particles.push(this.createParticle(x, y));
            }
            
            // Start animation
            this.animate();
            
            // Stop after 5 seconds to save resources
            setTimeout(() => {
                this.stop();
            }, 5000);
        }
        
        // Stop the animation
        stop() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            
            // Cleanup after a short delay
            setTimeout(() => {
                this.cleanup();
            }, 200);
        }
        
        // Remove the canvas
        cleanup() {
            if (this.canvas && this.particles.length === 0) {
                document.body.removeChild(this.canvas);
                this.canvas = null;
                this.ctx = null;
            }
        }
    }
    
    // Create confetti manager
    const confettiManager = new ConfettiManager();
    
    // Attach to form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Check if the form already has a submit handler
        const originalSubmit = contactForm.onsubmit;
        
        contactForm.onsubmit = function(e) {
            // Call the original handler first if it exists
            if (typeof originalSubmit === 'function') {
                const result = originalSubmit.call(this, e);
                if (result === false) return false;
            }
            
            // Form validation check - assumes form is already validated
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Simulate form submission success (you'll integrate with your actual form submission)
            if (submitButton && !submitButton.disabled) {
                // Remember to only trigger confetti for successful submissions in your actual code
                setTimeout(() => {
                    const buttonRect = submitButton.getBoundingClientRect();
                    const x = buttonRect.left + buttonRect.width / 2;
                    const y = buttonRect.top;
                    
                    // Check for reduced motion preference
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        confettiManager.start(x, y, 150);
                    }
                }, 300);
            }
            
            // Don't prevent the default form submission
            // In a real application, you'd handle AJAX submission and only trigger confetti on success
        };
    }
    
    // Export the confetti manager for potential use in other scripts
    window.confettiManager = confettiManager;
}); 