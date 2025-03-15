// Simple typewriter effect for hero headlines
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.words = options.words || [element.innerHTML];
        this.speed = options.speed || 70;
        this.delay = options.delay || 1500;
        this.loop = options.loop || false;
        
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        // Save original content for accessibility
        this.originalContent = element.innerHTML;
        element.setAttribute('aria-label', this.originalContent);
        
        // Clear the element
        element.innerHTML = '';
        
        // Add cursor
        this.cursor = document.createElement('span');
        this.cursor.className = 'typewriter-cursor';
        this.cursor.innerHTML = '|';
        this.element.parentNode.insertBefore(this.cursor, this.element.nextSibling);
        
        // Start typing
        this.type();
    }
    
    type() {
        // Current word
        const currentWord = this.words[this.wordIndex];
        
        // Calculate typing speed (slightly random for a more natural effect)
        const typeSpeed = this.speed * (0.8 + Math.random() * 0.4);
        
        if (this.isDeleting) {
            // Remove a character
            this.element.innerHTML = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Add a character
            this.element.innerHTML = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        // If word is complete
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Pause at the end of typing
            this.isDeleting = this.loop || this.wordIndex < this.words.length - 1;
            setTimeout(() => this.type(), this.delay);
        } 
        // If word is deleted
        else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            setTimeout(() => this.type(), 500);
        } 
        // Continue typing or deleting
        else {
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // Cleanup method to remove event listeners and restore original content if needed
    destroy() {
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
        this.element.innerHTML = this.originalContent;
    }
}

// Initialize typewriter effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for the cursor
    const style = document.createElement('style');
    style.innerHTML = `
        .typewriter-cursor {
            display: inline-block;
            margin-left: 3px;
            opacity: 1;
            animation: blink 0.7s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Apply to headline
    const headline = document.querySelector('.hero-headline');
    if (headline) {
        const originalText = headline.innerHTML;
        // Split the text to keep the gradient-text span intact
        const parts = originalText.split(/<span class="gradient-text">(.*?)<\/span>/);
        if (parts.length === 3) {
            // Create wrapper for the first part
            const firstPart = document.createElement('span');
            firstPart.innerHTML = parts[0];
            headline.innerHTML = '';
            headline.appendChild(firstPart);
            
            // Keep the gradient span
            const gradientSpan = document.createElement('span');
            gradientSpan.className = 'gradient-text';
            gradientSpan.innerHTML = parts[1];
            headline.appendChild(gradientSpan);
            
            // Create a typewriter effect just for the first part
            new Typewriter(firstPart, {
                words: [parts[0]],
                speed: 50,
                loop: false
            });
        } else {
            // Fallback if we couldn't split properly
            new Typewriter(headline, {
                words: [originalText],
                speed: 50,
                loop: false
            });
        }
    }
    
    // Apply to other elements as needed
    const sectionHeaders = document.querySelectorAll('.section-intro h2');
    sectionHeaders.forEach(header => {
        // Only animate headers as they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Split the text to keep the gradient-text span intact
                    const originalText = header.innerHTML;
                    const parts = originalText.split(/<span class="gradient-text">(.*?)<\/span>/);
                    
                    if (parts.length === 3) {
                        // Create wrapper for the first part
                        const firstPart = document.createElement('span');
                        firstPart.innerHTML = parts[0];
                        header.innerHTML = '';
                        header.appendChild(firstPart);
                        
                        // Keep the gradient span
                        const gradientSpan = document.createElement('span');
                        gradientSpan.className = 'gradient-text';
                        gradientSpan.innerHTML = parts[1];
                        header.appendChild(gradientSpan);
                        
                        // Add the last part if it exists
                        if (parts[2]) {
                            const lastPart = document.createElement('span');
                            lastPart.innerHTML = parts[2];
                            header.appendChild(lastPart);
                            
                            // Create a typewriter effect for the last part
                            new Typewriter(lastPart, {
                                words: [parts[2]],
                                speed: 50,
                                loop: false
                            });
                        }
                        
                        // Create a typewriter effect for the first part
                        new Typewriter(firstPart, {
                            words: [parts[0]],
                            speed: 50,
                            loop: false
                        });
                    } else {
                        // Fallback if we couldn't split properly
                        new Typewriter(header, {
                            words: [originalText],
                            speed: 50,
                            loop: false
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(header);
    });
}); 