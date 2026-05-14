import Image from 'next/image';
import SectionChip from '../SectionChip/SectionChip';
import styles from './ProblemColumns.module.scss';

const problems = [
  {
    icon: '/icons/scattered-records.svg',
    title: 'Scattered Records',
    description: 'Relying on physical files or disorganized photos makes it impossible to track patient history accurately.',
  },
  {
    icon: '/icons/inefficient-booking.svg',
    title: 'Inefficient Booking',
    description: 'Back-and-forth phone calls and messages eat up administrative time and lead to scheduling errors.',
  },
  {
    icon: '/icons/high-no-shows.svg',
    title: 'High No-Show Rates',
    description: 'Without automated reminders and seamless payments, missed appointments hurt your bottom line.',
  },
];

export default function ProblemColumns() {
  return (
    <section className={styles.problemColumns} id="problem">
      <div className={styles.container}>
        <SectionChip chip="The problem" title="Healthcare shouldn't be this fragmented." centered />
        <p className={styles.intro}>
          Today&apos;s healthcare delivery is disconnected. You&apos;re dealing with scattered paper files, manual bookings via WhatsApp, and siloed data that makes tracking patient history a headache.
        </p>
        <div className={styles.grid}>
          {problems.map((problem) => (
            <div key={problem.title} className={styles.column}>
              <div className={styles.iconContainer}>
                <Image src={problem.icon} alt={problem.title} width={24} height={24} />
              </div>
              <h3 className={styles.title}>{problem.title}</h3>
              <p className={styles.description}>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
