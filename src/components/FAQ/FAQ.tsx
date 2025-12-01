'use client';

import { useState } from 'react';
import SectionChip from '../SectionChip/SectionChip';
import styles from './FAQ.module.scss';

const faqs = [
  {
    id: 1,
    question: 'Is my health data safe on Zulu?',
    answer: 'Yes. We use enterprise-grade encryption and international security standards. Your information is protected at every stage — stored, transferred, and accessed.',
  },
  {
    id: 2,
    question: 'Who can see my data?',
    answer: 'Only you and those you share it with — whether that\'s a doctor, caregiver, or family member.',
  },
  {
    id: 3,
    question: 'If I revoke access, does the hospital or clinic still have my records?',
    answer: 'Yes. Once you share a record with a healthcare facility, they may save it as part of their official records for compliance and continuity of care. On Zulu, however, you remain in full control — you can revoke access at any time, stopping ongoing visibility into your personal health record.',
  },
  {
    id: 4,
    question: 'What can I do with Zulu today?',
    answer: 'You can view your lab results and reports digitally, keep them organized in one timeline, manage your personal health record, that of your loved ones, and book medical appointments.',
  },
  {
    id: 5,
    question: 'Can I manage my family\'s health?',
    answer: 'Yes. Zulu supports family accounts, so you can keep track of records for children, parents, or anyone you care for.',
  },
  {
    id: 6,
    question: 'Will Zulu connect with wearables like Apple Watch or Oura?',
    answer: 'Not yet. We\'re focused on building a seamless experience with hospitals, labs, and clinics first — but wearable integration is on our roadmap.',
  },
  {
    id: 7,
    question: 'What if my hospital doesn\'t use Zulu yet?',
    answer: 'You can still download the app and upload your records yourself and book appointments at other facilities (clinics, labs). Feel free to push your providers to join Zulu :)',
  },
  {
    id: 8,
    question: 'Can I upload my own documents to Zulu (like PDFs from other hospitals or old scans)?',
    answer: 'Yes. You can upload and store documents directly in the app, so even records from providers outside our network or old records are organized in your timeline.',
  },
  {
    id: 9,
    question: 'What happens if I switch hospitals or providers? Will my data move with me?',
    answer: 'Yes. Your Zulu app keeps your records independent of any single hospital or clinic, so your history moves with you. Once a new provider joins the network, you can share your records instantly.',
  },
  {
    id: 10,
    question: 'Can I use Zulu if I live abroad but visit Lebanon or the Middle East for treatment?',
    answer: 'Of course! You can use Zulu anywhere, and your records remain accessible.',
  },
  {
    id: 11,
    question: 'Will my old records be available, or only new ones going forward?',
    answer: 'Both. Your new results will appear automatically. You can upload you old records manually (either as PDFs or by entering the information). We are also working with hospitals and clinics to digitize and integrate past records so your full history is in one place.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <SectionChip chip="Support" title="Frequently Asked Questions" centered />

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${styles.faqItem} ${openId === faq.id ? styles.open : ''}`}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className={styles.question}>
                <span>{faq.question}</span>
                <svg
                  className={styles.icon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9L12 16L5 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

