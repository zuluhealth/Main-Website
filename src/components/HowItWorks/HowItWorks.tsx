'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionChip from '../SectionChip/SectionChip';
import styles from './HowItWorks.module.scss';

const steps = [
  {
    id: 1,
    title: 'Book Appointments',
    image: '/images/bookappointments.webp',
  },
  {
    id: 2,
    title: 'View test results',
    image: '/images/viewlabresults.webp',
  },
  {
    id: 3,
    title: 'Keep medical records',
    image: '/images/keepmedicalrecords.webp',
  },
  {
    id: 4,
    title: 'Manage your family\'s health',
    image: '/images/manageyourlovedones.webp',
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        // Trigger fade out
        setIsTransitioning(true);
        
        // After fade out, change index and fade in
        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % steps.length);
          setIsTransitioning(false);
        }, 300); // Half of total transition time
      } else {
        setActiveIndex((prev) => (prev + 1) % steps.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Mobile: Only render active step with fade transition
  if (isMobile) {
    return (
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <SectionChip chip="How it works" title="Works like magic." centered />

          <div className={styles.stepsMobile}>
            <div
              className={`${styles.stepMobile} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
            >
              <div className={styles.imageWrapperMobile}>
                <Image 
                  src={steps[activeIndex].image} 
                  alt={steps[activeIndex].title} 
                  fill
                  className={styles.imageMobile}
                  sizes="(max-width: 768px) 90vw, 600px"
                  priority
                />
              </div>
              <p className={styles.stepTitleMobile}>{steps[activeIndex].title}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Render all steps with width animation
  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <SectionChip chip="How it works" title="Works like magic." centered />

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`${styles.step} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 600px"
                  className={styles.image}
                />
              </div>
              <p className={styles.stepTitle}>{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

