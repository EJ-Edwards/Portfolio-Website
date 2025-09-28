window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.08)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('mainNav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            }
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .contact-card, .certificate-item').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    const profilePic = document.getElementById('pic');
    if (profilePic) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            profilePic.style.transform = `translateY(${rate}px)`;
        });
    }

    // Typing effect for main headings
    const mainHeading = document.querySelector('#about h1, #Works h1, section h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Mouse cursor trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({x: e.clientX, y: e.clientY});
        if (mouseTrail.length > 20) mouseTrail.shift();
        
        // Create trail elements
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #00bfff, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.8;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            setTimeout(() => trail.remove(), 300);
        }, 100);
    });
});