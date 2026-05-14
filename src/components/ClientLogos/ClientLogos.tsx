import SectionChip from '../SectionChip/SectionChip';
import styles from './ClientLogos.module.scss';

const logos = [
  { name: 'Client 1', src: '/images/logos/placeholder-1.svg' },
  { name: 'Client 2', src: '/images/logos/placeholder-2.svg' },
  { name: 'Client 3', src: '/images/logos/placeholder-3.svg' },
  { name: 'Client 4', src: '/images/logos/placeholder-4.svg' },
  { name: 'Client 5', src: '/images/logos/placeholder-5.svg' },
  { name: 'Client 6', src: '/images/logos/placeholder-6.svg' },
];

export default function ClientLogos() {
  const track = [...logos, ...logos];

  return (
    <section className={styles.clientLogos}>
      <div className={styles.header}>
        <SectionChip
          chip="Trusted By"
          title="Leading clinics already building with Zulu"
          centered
        />
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {track.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className={styles.logo}>
              {/* Using <img> so missing placeholder files gracefully show alt text rather than throw build errors. Swap for real logos. */}
              <img src={logo.src} alt={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
