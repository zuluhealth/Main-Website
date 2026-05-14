import SectionChip from '../SectionChip/SectionChip';
import styles from './CoreFeatures.module.scss';

const features = [
  {
    title: 'Patient & Schedule Management',
    description: 'Centralized scheduling and structured registration help you control clinic flow, reduce no-shows, and manage follow-ups efficiently\u2014so your time is used where it matters: with patients.',
  },
  {
    title: 'Electronic Medical Records (EMR)',
    description: 'All patient histories, labs, medications, and notes in one place, accessible instantly at the point of care\u2014supporting clear decisions without paper or fragmented files.',
  },
  {
    title: 'Orders Management',
    description: 'Digital labs, imaging, prescriptions, and visit documentation in a few clicks\u2014reducing errors, speeding up coordination, and ensuring accurate, billable records.',
  },
];

export default function CoreFeatures() {
  return (
    <section id="core-features" className={styles.coreFeatures}>
      <div className={styles.container}>
        <SectionChip chip="Core Features" title="Everything You Need in One System" centered />
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
