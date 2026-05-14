import SectionChip from '../SectionChip/SectionChip';
import styles from './GrowthEngine.module.scss';

const cards = [
  {
    title: 'Referral Systems',
    description: 'Built-in tools that turn your happy patients into your best advocates.',
  },
  {
    title: 'Affiliate Programs',
    description: 'Partner with other entities within the Zulu network for mutual growth.',
  },
  {
    title: 'Strategic B2B Funnels',
    description: 'Benefit from our overarching marketing that drives healthcare consumers directly to Zulu-certified providers.',
  },
];

export default function GrowthEngine() {
  return (
    <section className={styles.growthEngine}>
      <div className={styles.container}>
        <SectionChip chip="Growth" title="We Don't Just Organize Your Practice—We Grow It." centered light />
        <p className={styles.intro}>
          Zulu isn&apos;t just a management tool; it&apos;s an active growth engine for your healthcare institution. By joining our ecosystem, you tap into:
        </p>

        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.title} className={styles.card}>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.description}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
