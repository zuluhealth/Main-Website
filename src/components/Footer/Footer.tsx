'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src="/zulu-full.svg" alt="Zulu" />
        </div>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.bottom}>
        <div className={styles.column}>
          <Link href="https://www.instagram.com/zuluhealth" target="_blank" rel="noopener noreferrer">Instagram</Link>
          <Link href="https://www.linkedin.com/company/zuluhealth/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
          {/* <Link href="/">Newsletter</Link> */}
          {/* <Link href="/">WhatsApp</Link> */}
        </div>

        <div className={styles.column}>
          {/* <Link href="/">Manifesto</Link> */}
          <Link href="/our-mission">Our mission</Link>
          {/* <Link href="/">Privacy Policy</Link> */}
          <Link href="/">Provider Access</Link>
        </div>

        <div className={styles.column}>
          {/* <Link href="/">HIPAA Compliant</Link> */}
          {/* <Link href="/">ISO Certified</Link> */}
          <button 
            onClick={() => scrollToSection('data-privacy')} 
            className={styles.linkButton}
          >
            Data Privacy
          </button>
        </div>
      </div>
    </footer>
  );
}

