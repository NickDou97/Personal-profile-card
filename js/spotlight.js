// Mouse Spotlight Effect
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on larger screens
    if (window.innerWidth < 768) return;
    
    // Create the spotlight element
    const spotlight = document.createElement('div');
    spotlight.classList.add('mouse-spotlight');
    document.body.appendChild(spotlight);
    
    // Add the CSS for the spotlight
    const style = document.createElement('style');
    style.innerHTML = `
        .mouse-spotlight {
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(
                circle at center,
                rgba(62, 152, 255, 0.15) 0%,
                rgba(111, 76, 255, 0.08) 30%,
                rgba(0, 0, 0, 0) 70%
            );
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
            will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .mouse-spotlight {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Variables for spotlight position
    let spotlightX = -100;
    let spotlightY = -100;
    let mouseX = -100;
    let mouseY = -100;
    let isVisible = false;
    
    // Show the spotlight after a short delay
    setTimeout(() => {
        spotlight.style.opacity = '1';
        isVisible = true;
    }, 1000);
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // If initially hidden, show immediately on first mouse move
        if (!isVisible) {
            spotlight.style.opacity = '1';
            isVisible = true;
        }
    });
    
    // Animate the spotlight
    function animateSpotlight() {
        // Apply easing for smooth movement
        const easing = 0.15; // Lower = slower
        spotlightX += (mouseX - spotlightX) * easing;
        spotlightY += (mouseY - spotlightY) * easing;
        
        // Apply the position
        spotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px)`;
        
        // Continue the animation
        requestAnimationFrame(animateSpotlight);
    }
    
    // Start the animation
    animateSpotlight();
    
    // Hide spotlight on touch (mobile devices)
    document.addEventListener('touchstart', () => {
        spotlight.style.display = 'none';
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            spotlight.style.opacity = '0';
        } else {
            spotlight.style.opacity = '1';
        }
    });
}); 