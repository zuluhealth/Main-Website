import styles from './FinalCTA.module.scss';

const CALENDLY_URL = 'https://outlook.office.com/book/ZuluPlatformDemos@basbina352.com/?ismsaljsauthenabled';

export default function FinalCTA() {
  return (
    <section className={styles.finalCta}>
      <div className={styles.container}>
        <h2 className={styles.headline}>Ready to make care simpler and more scalable?</h2>
        <p className={styles.subtitle}>
          Let us show you exactly how Zulu fits into your clinic, hospital, or practice. Book a personalized walkthrough today.
        </p>
        <div className={styles.outerBorder}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            <span className={styles.buttonText}>Book a Demo</span>
            <span className={styles.buttonGlow}></span>
          </a>
        </div>
        <p className={styles.subtext}>No commitment required. Speak directly with our onboarding specialists.</p>
      </div>
    </section>
  );
}
