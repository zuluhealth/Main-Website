'use client';

import styles from './Hero.module.scss';
import ZuluHeroBackground from './ZuluHeroBackground';
import ZuluProductsBackground from './ZuluProductsBackground';

interface HeroCTAButton {
  label: string;
  href?: string;
  variant: 'primary' | 'secondary';
}

interface HeroProps {
  title: string;
  subtitle?: string;
  showCTA?: boolean;
  fullHeight?: boolean;
  ctaButtons?: HeroCTAButton[];
  showCompliance?: boolean;
  variant?: 'default' | 'provider' | 'products';
}

export default function Hero({ title, subtitle, showCTA = true, fullHeight = true, ctaButtons, showCompliance, variant = 'default' }: HeroProps) {
  const resolvedShowCompliance = showCompliance !== undefined ? showCompliance : (showCTA && !ctaButtons);

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
            {ctaButtons ? (
              ctaButtons.map((btn) => {
                const isHash = btn.href?.startsWith('#');
                const isInternal = btn.href?.startsWith('/');
                const isExternal = !isHash && !isInternal;
                return (
                  <a
                    key={btn.label}
                    href={btn.href}
                    className={btn.variant === 'primary' ? styles.waitlistBtn : styles.discoverBtn}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    onClick={(e) => {
                      if (isHash) {
                        e.preventDefault();
                        scrollToSection(btn.href!.slice(1));
                      }
                    }}
                  >
                    {btn.label}
                  </a>
                );
              })
            ) : (
              <button className={styles.waitlistBtn}>Join the waitlist</button>
            )}
          </div>
        )}

        {resolvedShowCompliance && (
          <div className={styles.compliance}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5L8 0Z" fill="currentColor"/>
            </svg>
            <span>HIPAA & HL7 compliant</span>
          </div>
        )}
      </div>

      {variant === 'provider' ? (
        <div className={styles.canvasBackground}>
          <ZuluHeroBackground />
        </div>
      ) : variant === 'products' ? (
        <div className={styles.canvasBackground}>
          <ZuluProductsBackground />
        </div>
      ) : (
        <div className={styles.backgroundImage} />
      )}
    </section>
  );
}
