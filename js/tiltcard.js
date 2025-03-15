// 3D Card Tilt Effect
document.addEventListener('DOMContentLoaded', function() {
    // Only apply on desktop devices
    if (window.innerWidth < 768) return;
    
    // Get all cards to apply the effect to
    const cards = document.querySelectorAll('.feature-item, .result-card');
    
    // Add the CSS for the effect
    const style = document.createElement('style');
    style.innerHTML = `
        .tilt-card {
            transform-style: preserve-3d;
            transform: perspective(1000px);
            transition: transform 0.1s ease;
            will-change: transform;
        }
        
        .tilt-card .tilt-content {
            transform-style: preserve-3d;
            position: relative;
            z-index: 1;
        }
        
        .tilt-card .tilt-glare {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: inherit;
            background: linear-gradient(125deg, rgba(255, 255, 255, 0.25), transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 0;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .tilt-card {
                transform: none !important;
                transition: none !important;
            }
            
            .tilt-card .tilt-glare {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add the effect to each card
    cards.forEach(card => {
        // Skip if the card already has the effect
        if (card.classList.contains('tilt-card')) return;
        
        // Add the tilt card class
        card.classList.add('tilt-card');
        
        // Create a wrapper for the content to prevent it from being distorted
        const cardContent = document.createElement('div');
        cardContent.className = 'tilt-content';
        
        // Move the card's content into the wrapper
        while (card.firstChild) {
            cardContent.appendChild(card.firstChild);
        }
        
        // Create the glare element
        const glare = document.createElement('div');
        glare.className = 'tilt-glare';
        
        // Add elements to the card
        card.appendChild(glare);
        card.appendChild(cardContent);
        
        // Variables to track the card position
        let cardRect = card.getBoundingClientRect();
        
        // Update the card's rectangle on scroll and resize
        window.addEventListener('scroll', () => {
            cardRect = card.getBoundingClientRect();
        });
        
        window.addEventListener('resize', () => {
            cardRect = card.getBoundingClientRect();
        });
        
        // Handle mouse movement
        card.addEventListener('mousemove', e => {
            // Calculate mouse position relative to the card
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            // Calculate the percentage position
            const xPercent = x / cardRect.width;
            const yPercent = y / cardRect.height;
            
            // Calculate the tilt angle (max 10 degrees)
            const tiltX = (0.5 - yPercent) * 10;
            const tiltY = (xPercent - 0.5) * 10;
            
            // Apply the transformation
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Update glare position
            glare.style.opacity = '0.4';
            glare.style.transform = `rotate(${xPercent * 60}deg) translateY(${yPercent * 40 - 20}%)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            glare.style.opacity = '0';
        });
        
        // Handle card activation on touch devices
        card.addEventListener('touchstart', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1.02, 1.02, 1.02)';
            glare.style.opacity = '0.2';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            glare.style.opacity = '0';
        });
    });
    
    // Reinitialize when the DOM changes (useful for dynamic content)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const newCards = document.querySelectorAll('.feature-item:not(.tilt-card), .result-card:not(.tilt-card)');
                if (newCards.length > 0) {
                    // Reinitialize with the new cards (not implemented yet)
                    console.log('New cards added, should reinitialize');
                }
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}); 