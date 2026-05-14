import styles from './SectionChip.module.scss';

interface SectionChipProps {
  chip: string;
  title: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionChip({ chip, title, centered = false, light = false }: SectionChipProps) {
  return (
    <div className={`${styles.sectionChip} ${centered ? styles.centered : ''} ${light ? styles.light : ''}`}>
      <div className={styles.chip}>
        <span>{chip}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}

