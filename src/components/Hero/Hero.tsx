'use client';

import styles from './Hero.module.scss';

interface HeroProps {
  title: string;
  subtitle?: string;
  showCTA?: boolean;
  fullHeight?: boolean;
}

export default function Hero({ title, subtitle, showCTA = true, fullHeight = true }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`${styles.hero} ${fullHeight ? styles.fullHeight : styles.smallHeight}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        
        {showCTA && (
          <div className={styles.cta}>
            {/* <button className={styles.discoverBtn} onClick={() => scrollToSection('how-it-works')}>Discover</button> */}
            <button className={styles.waitlistBtn}>Join the waitlist</button>
          </div>
        )}

        {showCTA && (
          <div className={styles.compliance}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5L8 0Z" fill="currentColor"/>
            </svg>
            <span>HIPAA & HL7 compliant</span>
          </div>
        )}
      </div>

      <div className={styles.backgroundImage}>
        {/* Background image will be added via CSS */}
      </div>
    </section>
  );
}

