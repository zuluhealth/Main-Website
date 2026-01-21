'use client';

import { useState } from 'react';
import SectionChip from '../SectionChip/SectionChip';
import styles from './DataPrivacy.module.scss';

const cards = [
  {
    id: 1,
    icon: '/icons/fullcontrol.svg',
    title: 'Full Control',
    description: 'You decide who sees what. Sharing is intentional and limited.',
  },
  {
    id: 2,
    icon: '/icons/robustsecurity.svg',
    title: 'Robust Security',
    description: 'Enterprise-grade encryption trusted by global health systems.',
  },
  {
    id: 3,
    icon: '/icons/privatebydesign.svg',
    title: 'Private by Design',
    description: 'Privacy first. No shortcuts, no compromises.',
  },
  {
    id: 4,
    icon: '/icons/compliant.svg',
    title: 'Compliant',
    description: 'Fully compliant with all healthcare data regulations.',
  },
];

export default function DataPrivacy() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <section className={styles.dataPrivacy}>
      <div className={styles.container}>
        <SectionChip
          chip="Your data"
          title="Your health data is personal. It's private. It's yours. At Zulu, we treat it that way."
          centered
        />

        <div className={styles.cards}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.cardWrapper} ${activeCardId === card.id ? styles.flipped : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={styles.card}>
                <div className={styles.cardFront}>
                  <div className={styles.icon}>
                    <img src={card.icon} alt={card.title} />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
                <div className={styles.cardBack}>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomText}>
          <p>
            Zulu exists to give you clarity and control over your health. That starts with making sure your most personal information is handled with the highest standards of trust and security.
          </p>
        </div>
      </div>
    </section>
  );
}
