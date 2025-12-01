import styles from './JoinWaitlist.module.scss';

export default function JoinWaitlist() {
  return (
    <section className={styles.joinWaitlist}>
      <div className={styles.container}>
        <div className={styles.outerBorder}>
          <button className={styles.waitlistButton}>
            <span className={styles.buttonText}>Join the waitlist</span>
            <span className={styles.buttonGlow}></span>
          </button>
        </div>
      </div>
    </section>
  );
}

