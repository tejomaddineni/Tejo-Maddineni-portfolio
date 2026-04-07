import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Experience' },
    { href: '/projects', label: 'Case Studies' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>TM</div>
          <span className={styles.logoText}>Tejo Maddineni</span>
        </Link>

        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  router.pathname === item.href ? styles.navLinkActive : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className={styles.navCta}>
          Let&apos;s Connect
        </Link>

        <div
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ''
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${
              router.pathname === item.href ? styles.navLinkActive : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}