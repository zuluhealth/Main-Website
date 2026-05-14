import SectionChip from '../SectionChip/SectionChip';
import styles from './VideoEmbed.module.scss';

interface VideoEmbedProps {
  src?: string;
  poster?: string;
  chip?: string;
  title?: string;
}

export default function VideoEmbed({
  src,
  poster,
  chip = 'In Rami\u2019s Words',
  title = 'Hear the vision behind Zulu',
}: VideoEmbedProps) {
  return (
    <section className={styles.videoEmbed}>
      <div className={styles.container}>
        <SectionChip chip={chip} title={title} centered />

        <div className={styles.frame}>
          {src ? (
            <video
              className={styles.video}
              controls
              preload="metadata"
              poster={poster}
            >
              <source src={src} />
              Your browser does not support embedded video.
            </video>
          ) : (
            <div className={styles.placeholder} role="status" aria-label="Video coming soon">
              <div className={styles.playIcon} aria-hidden="true">
                <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
                  <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                  <path d="M26 22 L44 32 L26 42 Z" fill="currentColor" />
                </svg>
              </div>
              <p className={styles.placeholderText}>Video coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
