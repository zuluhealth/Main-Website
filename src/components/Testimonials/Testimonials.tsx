'use client';

import SectionChip from '../SectionChip/SectionChip';
import styles from './Testimonials.module.scss';

const testimonials = [
  {
    quote: 'Zulu transformed how our clinic operates. We spend less time on WhatsApp and paperwork, and more time actually treating patients.',
    name: 'Dr. [Name]',
    role: '[Clinic]',
  },
  {
    quote: 'The automated reminders alone have reduced our no-show rate drastically. It\'s a game-changer for our daily operations.',
    name: '[Name]',
    role: 'Clinic Manager',
  },
];

export default function Testimonials() {
  // Duplicate the array so the marquee loops seamlessly
  const slides = [...testimonials, ...testimonials];

  return (
    <section className={styles.testimonials}>
      <div className={styles.header}>
        <SectionChip chip="Testimonials" title="Trusted by Forward-Thinking Healthcare Providers" centered />
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {slides.map((testimonial, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.quoteMark}>&ldquo;</span>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.attribution}>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.role}>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
