import styles from './Separator.module.scss';

interface SeparatorProps {
  variant?: 'dark' | 'light';
}

export default function Separator({ variant = 'dark' }: SeparatorProps) {
  return (
    <div className={`${styles.separator} ${styles[variant]}`}></div>
  );
}

