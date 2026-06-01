window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('mainNav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    const updateActiveLinks = () => {
        const currentPath = window.location.pathname.replace(/\/$/, '');
        const currentHash = window.location.hash;
        document.querySelectorAll('#header nav a').forEach(link => {
            const target = link.getAttribute('href');
            link.classList.remove('active');
            if (!target) return;

            if (target.startsWith('#') && currentHash === target) {
                link.classList.add('active');
                return;
            }

            try {
                const targetUrl = new URL(target, window.location.origin);
                const targetPath = targetUrl.pathname.replace(/\/$/, '');
                if (targetPath === currentPath) {
                    link.classList.add('active');
                }
            } catch (error) {
                // ignore invalid URLs
            }
        });
    };

    updateActiveLinks();

    const header = document.getElementById('header');
    const updateHeaderStyle = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.project-card, .focus-card, .profile-card, .story, .section-heading, .cta-row, .panel-card, .skill-card, .service-card, .community-card, .building-card, .cta-panel').forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });
});
