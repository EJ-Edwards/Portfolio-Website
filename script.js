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
    }
});