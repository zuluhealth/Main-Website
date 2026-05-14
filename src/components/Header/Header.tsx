'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

const BOOKING_URL = 'https://outlook.office.com/book/ZuluPlatformDemos@basbina352.com/?ismsaljsauthenabled';

export default function Header() {
  const pathname = usePathname();
  const isProviders = pathname?.startsWith('/providers');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/zulu-full.svg" alt="Zulu" />
        </Link>

        <nav className={styles.nav}>
          <Link href="/providers">Providers</Link>
          <Link href="/products">Products</Link>
        </nav>

        {isProviders ? (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waitlistBtn}
          >
            Book a demo
          </a>
        ) : (
          <button className={styles.waitlistBtn}>Join the waitlist</button>
        )}
      </div>
    </header>
  );
}
