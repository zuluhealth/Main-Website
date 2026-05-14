import Image from 'next/image';
import SectionChip from '../SectionChip/SectionChip';
import styles from './ProviderSolution.module.scss';

const features = [
  {
    title: 'Maximize Visibility & Bookings',
    description: 'Get discovered by a wider patient base. Allow patients to find your clinic and book appointments instantly online, 24/7.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop',
    alt: 'Patient-facing booking screen showing a provider profile',
  },
  {
    title: 'Slash No-Shows & Automate Engagement',
    description: 'Keep your schedule full. Zulu sends automated appointment and care plan reminders directly to your patients, ensuring they show up on time and stay compliant with their treatments.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    alt: 'Automated SMS and push notification reminders on a phone',
  },
  {
    title: 'Unified EMRs & E-Prescriptions',
    description: 'Say goodbye to paper. Access standardized electronic medical histories, track progress, and issue e-prescriptions seamlessly from a secure, centralized dashboard.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=450&fit=crop',
    alt: 'Provider dashboard showing a clean patient medical history',
  },
  {
    title: 'Seamless Payments & Data Analytics',
    description: 'Collect digital payments effortlessly and utilize powerful data analytics to make informed decisions that drive your clinic\'s growth and operational efficiency.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    alt: 'Chart UI showing clinic growth and payment analytics',
  },
];

export default function ProviderSolution() {
  return (
    <section className={styles.providerSolution}>
      <div className={styles.container}>
        <SectionChip chip="The solution" title="Everything You Need to Scale and Succeed" centered />
        <p className={styles.intro}>
          Zulu replaces outdated silos with an intelligent, centralized platform.
        </p>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={feature.title} className={`${styles.featureRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={800}
                  height={450}
                  className={styles.image}
                />
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
