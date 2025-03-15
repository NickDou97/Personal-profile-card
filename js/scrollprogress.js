// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create the progress bar element
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress-bar');
    
    // Add ARIA attributes for accessibility
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-label', 'Page scroll progress: 0%');
    
    // Insert at the beginning of the body
    document.body.prepend(progressBar);
    
    // Add the CSS for the progress bar
    const style = document.createElement('style');
    style.innerHTML = `
        .scroll-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 1000;
            transition: width 0.1s;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .scroll-progress-bar {
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Function to update the progress bar width
    function updateProgressBar() {
        // Calculate scroll progress
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const progress = scrollTop / scrollHeight * 100;
        
        // Update the width and ARIA attributes
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
        progressBar.setAttribute('aria-label', `Page scroll progress: ${Math.round(progress)}%`);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateProgressBar);
    
    // Also update on resize (in case document height changes)
    window.addEventListener('resize', updateProgressBar);
    
    // Initial update
    updateProgressBar();
}); 