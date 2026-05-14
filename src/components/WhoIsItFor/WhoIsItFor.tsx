import Image from 'next/image';
import SectionChip from '../SectionChip/SectionChip';
import styles from './WhoIsItFor.module.scss';

export default function WhoIsItFor() {
  return (
    <section className={styles.whoIsItFor}>
      <div className={styles.container}>
        <SectionChip chip="Who Is It For" title="Built for the Providers Who Power Healthcare" centered light />
        <div className={styles.content}>
          <div className={styles.illustration}>
            <Image
              src="/images/zulu-providers.svg"
              alt="Zulu provider network illustration showing connected healthcare providers"
              width={2918}
              height={1870}
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
