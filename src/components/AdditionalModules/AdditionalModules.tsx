import Image from 'next/image';
import SectionChip from '../SectionChip/SectionChip';
import styles from './AdditionalModules.module.scss';

const modules = [
  {
    title: 'Clinical Decision Support',
    description: 'Integrated with Medi-Span (Wolters Kluwer) and mapped to the Lebanese Ministry of Health drug list to provide real-time medication safety checks directly inside the EMR.',
    bullets: [
      'Drug\u2013drug and drug\u2013allergy interaction alerts',
      'Dosing guidance and formulary alignment',
      'Lebanese market relevance, not generic databases',
    ],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=450&fit=crop',
    alt: 'Clinical decision support with medication safety checks',
  },
  {
    title: 'AI Voice-to-EMR Transcription',
    description: 'AI-powered documentation that listens during consultations and automatically structures notes directly into the correct EMR fields\u2014not just free text.',
    bullets: [
      'Captures history, assessment, and plan in real time',
      'Multilingual (English, Arabic, French\u2014even mixed in one sentence)',
      'Reduces documentation time and post-consultation charting',
    ],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop',
    alt: 'AI-powered voice transcription during a medical consultation',
  },
  {
    title: 'Inventory Management',
    description: 'Integrated tracking of medications and medical supplies within the clinic workflow.',
    bullets: [
      'Real-time stock visibility',
      'Low-stock alerts and usage tracking',
      'Reduced losses, expiries, and manual reconciliation',
    ],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=450&fit=crop',
    alt: 'Medical inventory and supply management',
  },
];

export default function AdditionalModules() {
  return (
    <section className={styles.additionalModules}>
      <div className={styles.container}>
        <SectionChip chip="Additional Modules" title="Extend Your Capabilities" centered />
        <p className={styles.intro}>
          Go beyond the essentials with powerful add-on modules.
        </p>

        <div className={styles.grid}>
          {modules.map((mod, index) => (
            <div key={mod.title} className={`${styles.featureRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={mod.image}
                  alt={mod.alt}
                  width={800}
                  height={450}
                  className={styles.image}
                />
              </div>
              <div className={styles.contentWrapper}>
                <h3 className={styles.title}>{mod.title}</h3>
                <p className={styles.description}>{mod.description}</p>
                <ul className={styles.bullets}>
                  {mod.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
