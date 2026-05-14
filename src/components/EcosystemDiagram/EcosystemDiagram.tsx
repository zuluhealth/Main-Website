'use client';

import { useEffect, useRef, useState } from 'react';
import SectionChip from '../SectionChip/SectionChip';
import styles from './EcosystemDiagram.module.scss';

type BorderDef = { id: string; x: number; y: number; w: number; h: number; rx: number };

const HOVER_PILLS: BorderDef[] = [
  { id: 'patients',    x: 15.5,   y: 824,     w: 636.5,  h: 224,    rx: 112    },
  { id: 'phone',       x: 744.38, y: 802.88,  w: 146.25, h: 266.25, rx: 13.125 },
  { id: 'zulu',        x: 1035.5, y: 801.5,   w: 809,    h: 254,    rx: 37     },
  { id: 'physicians',  x: 698,    y: 6.5,     w: 861.5,  h: 224,    rx: 112    },
  { id: 'hospitals',   x: 1688,   y: 6.5,     w: 797,    h: 224,    rx: 112    },
  { id: 'diagnostic',  x: 2213,   y: 483.5,   w: 689,    h: 306.5,  rx: 153.25 },
  { id: 'insurers',    x: 2213,   y: 1066.25, w: 689,    h: 306.5,  rx: 153.25 },
  { id: 'pharmacies',  x: 698,    y: 1619,    w: 861.5,  h: 224,    rx: 112    },
  { id: 'authorities', x: 1688,   y: 1619,    w: 1049,   h: 224,    rx: 112    },
];

export default function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/images/zulu-providers.svg')
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setSvgMarkup(text);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.ecosystem}>
      <div className={styles.container}>
        <SectionChip
          chip="The Zulu Ecosystem"
          title="One connected healthtech network"
          centered
          light
        />

        <div
          ref={ref}
          className={`${styles.illustration} ${visible ? styles.visible : ''}`}
        >
          <div className={styles.ambientGlow} aria-hidden="true" />

          <div
            className={styles.image}
            role="img"
            aria-label="Zulu ecosystem diagram showing connected healthcare providers, labs, pharmacies, and patients"
            dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
          />

          <svg
            className={styles.overlay}
            viewBox="0 0 2918 1870"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="magic-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className={styles.hoverLayer}>
              {HOVER_PILLS.map((pill) => (
                <rect
                  key={`hover-${pill.id}`}
                  x={pill.x}
                  y={pill.y}
                  width={pill.w}
                  height={pill.h}
                  rx={pill.rx}
                  className={styles.hoverPill}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
