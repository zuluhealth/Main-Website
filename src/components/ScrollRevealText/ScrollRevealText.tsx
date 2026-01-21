'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import styles from './ScrollRevealText.module.scss';

interface ScrollRevealTextProps {
  text: string;
  preview?: boolean;
  enableReveal?: boolean;
}

export default function ScrollRevealText({ text, preview = false, enableReveal = true }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordOpacities, setWordOpacities] = useState<number[]>([]);
  
  const words = text.split(' ');

  useEffect(() => {
    if (!enableReveal) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerOfViewport = windowHeight / 2;

      // Get the top of container relative to center of viewport
      const containerTop = rect.top;
      const containerHeight = rect.height;
      
      // Calculate which part of the text should be at full opacity
      // When containerTop is at centerOfViewport, we want the first words visible
      // As we scroll down, more words become visible
      const scrollProgress = (centerOfViewport - containerTop) / containerHeight;

      // Calculate opacity for each word
      const newOpacities = words.map((_, index) => {
        const wordPosition = index / words.length; // 0 to 1
        
        // Calculate how far this word is from the current scroll position
        const distance = Math.abs(wordPosition - scrollProgress);
        
        // Words within a certain range of scroll progress are visible
        // Tighter range = more focused highlight, wider = more words visible
        const visibilityRange = 0.15; // Adjust this to control how many words are visible at once
        
        if (distance < visibilityRange) {
          // Full opacity at exact position, fades as distance increases
          const opacity = 1 - (distance / visibilityRange) * 0.85;
          return Math.max(0.15, Math.min(1, opacity));
        } else {
          return 0.15;
        }
      });

      setWordOpacities(newOpacities);
    };

    // Initial calculation
    handleScroll();
    
    // Use requestAnimationFrame for smooth scrolling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [words.length, enableReveal]);

  return (
    <div 
      ref={containerRef} 
      className={`${styles.scrollRevealText} ${preview ? styles.preview : ''} ${!enableReveal ? styles.static : ''}`}
    >
      <div className={styles.text}>
        {words.map((word, index) => (
          <Fragment key={index}>
            <span
              className={styles.word}
              style={{ opacity: enableReveal ? (wordOpacities[index] || 0.15) : 1 }}
            >
              {word}
            </span>
            {' '}
          </Fragment>
        ))}
      </div>
      {preview && (
        <div className={styles.readMore}>
          <a href="/our-mission">
            Read more
            <img src="/icons/chevron.svg" alt="arrow" className={styles.chevron} />
          </a>
        </div>
      )}
    </div>
  );
}

