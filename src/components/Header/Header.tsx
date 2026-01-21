'use client';

import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/zulu-full.svg" alt="Zulu" />
        </Link>

        <nav className={styles.nav}>
          <Link href="/our-mission">Our mission</Link>
          <Link href="/#providers">Providers</Link>
        </nav>

        <button className={styles.waitlistBtn}>Join the waitlist</button>
      </div>
    </header>
  );
}

