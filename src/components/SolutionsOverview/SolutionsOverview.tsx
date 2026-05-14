import SectionChip from '../SectionChip/SectionChip';
import styles from './SolutionsOverview.module.scss';

const CALENDLY_URL = 'https://outlook.office.com/book/ZuluPlatformDemos@basbina352.com/?ismsaljsauthenabled';

const solutions = [
  {
    title: 'Clinic Management',
    description:
      'Unified scheduling, structured registration, and patient flow tools that give your team time back for care.',
  },
  {
    title: 'Electronic Medical Records',
    description:
      'Centralized histories, labs, medications, and notes accessible instantly at the point of care.',
  },
  {
    title: 'Orders & Documentation',
    description:
      'Digital labs, imaging, prescriptions, and visit notes in a few clicks\u2014fewer errors, faster coordination.',
  },
  {
    title: 'Clinical Decision Support',
    description:
      'Real-time medication safety, dosing, and interaction checks, tuned to the local drug list.',
  },
  {
    title: 'AI Voice-to-EMR',
    description:
      'Multilingual AI that listens during consultations and structures notes directly into EMR fields.',
  },
  {
    title: 'Inventory Management',
    description:
      'Integrated tracking of medications and supplies with real-time visibility and low-stock alerts.',
  },
];

export default function SolutionsOverview() {
  return (
    <section className={styles.solutions}>
      <div className={styles.container}>
        <SectionChip
          chip="Our Solutions"
          title="Here are the solutions we offer"
          centered
        />

        <div className={styles.grid}>
          {solutions.map((solution) => (
            <div key={solution.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{solution.title}</h3>
              <p className={styles.cardDescription}>{solution.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a
            href={CALENDLY_URL}
            className={styles.primaryBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a demo
          </a>
          <a href="/products" className={styles.secondaryBtn}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
