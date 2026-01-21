'use client';

import Image from 'next/image';
import SectionChip from '../SectionChip/SectionChip';
import styles from './HowItWorks.module.scss';

const features = [
  {
    id: 1,
    title: 'Book Instantly',
    description: 'Choose your doctor or lab and schedule your visit in seconds. No calls. No waiting.',
    icon: '/icons/lighting.svg',
  },
  {
    id: 2,
    title: 'Get Results Fast',
    description: 'Your lab and test results appear automatically in your Zulu app, securely and instantly.',
    icon: '/icons/speed.svg',
  },
  {
    id: 3,
    title: 'Stay Organized',
    description: 'Keep all your reports, prescriptions, and records in one easy place.',
    icon: '/icons/organised.svg',
  },
  {
    id: 4,
    title: 'For You and Your Family',
    description: 'Manage your loved ones\' profiles and appointments from the same account.',
    icon: '/icons/family.svg',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <SectionChip chip="How it works" title="Works like magic." centered />

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={feature.id} className={`${styles.featureRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
              
              <div className={styles.cardWrapper}>
                <div className={styles.card}>
                  <div className={styles.glow} />
                  <div className={styles.iconWrapper}>
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={80}
                      height={80}
                      className={styles.icon}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.contentWrapper}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
