import SectionChip from '../SectionChip/SectionChip';
import styles from './DataPrivacy.module.scss';

const cards = [
  {
    id: 1,
    icon: '/icons/fullcontrol.svg',
    title: 'Full Control',
    description: 'Every record, every lab result, every report is under your control. You decide who sees what — whether it\'s a doctor, a caregiver, or no one at all. Sharing is intentional and limited.',
  },
  {
    id: 2,
    icon: '/icons/robustsecurity.svg',
    title: 'Robust Security',
    description: 'We use enterprise-grade encryption and security protocols, the same standards trusted by global health systems and financial institutions. Your information is protected at every stage — in storage, in transit, and in use.',
  },
  {
    id: 3,
    icon: '/icons/privatebydesign.svg',
    title: 'Private by Design',
    description: 'From day one, we\'ve built Zulu around privacy. No shortcuts, no compromises. Every feature is designed with your confidentiality in mind.',
  },
  {
    id: 4,
    icon: '/icons/compliant.svg',
    title: 'Compliant',
    description: 'Our systems align with international best practices for healthcare data security, including HIPAA, GDPR, and regional standards where we operate.',
  },
];

export default function DataPrivacy() {
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
            <div key={card.id} className={styles.card}>
              <div className={styles.icon}>
                <img src={card.icon} alt={card.title} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <div className={styles.cardGlow}></div>
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

