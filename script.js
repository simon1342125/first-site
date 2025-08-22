document.addEventListener("DOMContentLoaded", function() {

    // --- 1. CURSOR FOLLOWER ---
    const cursorFollower = document.getElementById('cursor-follower');
    
    // Use requestAnimationFrame for smoother animation
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.1; // Determines how fast the follower catches up

    function animateCursor() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * speed;
        cursorY += dy * speed;

        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    animateCursor(); // Start the animation loop

    // --- 2. MAGNETIC ELEMENTS ---
    const magneticElements = document.querySelectorAll('.magnetic-element');
    const magneticStrength = 0.4; // How strong the magnetic pull is

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const pos = this.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;

            this.style.transition = 'transform 0.1s ease-out';
            this.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
            
            // Enlarge and fill the cursor follower
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        });

        el.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease-out';
            this.style.transform = 'translate(0px, 0px)';
            
            // Reset cursor follower
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });

    // --- 3. TEXT REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-text-p');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
