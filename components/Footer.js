import Link from 'next/link';
import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <span className={styles.footerName}>Tejo Sai Sumanth Maddineni</span>
          <span className={styles.footerRole}>Senior Network Security Engineer</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/about" className={styles.footerLink}>Experience</Link>
          <Link href="/projects" className={styles.footerLink}>Case Studies</Link>
          <Link href="/contact" className={styles.footerLink}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}