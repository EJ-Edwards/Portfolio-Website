import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Header() {
  const loc = useLocation();

  useEffect(() => {
    const btn = document.querySelector('.hamburger');
    const nav = document.getElementById('mainNav');
    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    };
    btn?.addEventListener('click', toggle);
    return () => btn?.removeEventListener('click', toggle);
  }, []);

  return (
    <header id="header">
      <div className="nav-shell">
        <span id="siteName">Eric Edwards</span>
        <button
          className="hamburger"
          aria-label="Open navigation"
          aria-controls="mainNav"
          aria-expanded="false"
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="mainNav">
          <Link to="/" className={loc.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/work" className={loc.pathname === '/work' ? 'active' : ''}>
            Works
          </Link>
          <Link
            to="/certificates"
            className={loc.pathname === '/certificates' ? 'active' : ''}
          >
            Certificates
          </Link>
          <Link to="/contact" className={loc.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
