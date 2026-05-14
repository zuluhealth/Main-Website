import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import CoreFeatures from '@/components/CoreFeatures/CoreFeatures';
import AdditionalModules from '@/components/AdditionalModules/AdditionalModules';
import FinalCTA from '@/components/FinalCTA/FinalCTA';
import Footer from '@/components/Footer/Footer';

const CALENDLY_URL = 'https://outlook.office.com/book/ZuluPlatformDemos@basbina352.com/?ismsaljsauthenabled';

export const metadata: Metadata = {
  title: 'Our Products - Zulu Healthcare Platform',
  description:
    'Explore the full suite of Zulu products: EMR, clinical decision support, AI voice-to-EMR, orders, inventory, and more.',
  openGraph: {
    title: 'Our Products - Zulu Healthcare Platform',
    description:
      'Explore the full suite of Zulu products: EMR, clinical decision support, AI voice-to-EMR, orders, inventory, and more.',
  },
};

export default function Products() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Our Digital Solutions"
          subtitle="A connected suite of products that unifies clinic operations, records, and care coordination."
          showCTA={true}
          fullHeight={true}
          variant="products"
          showCompliance={false}
          ctaButtons={[
            { label: 'Book a Demo', href: CALENDLY_URL, variant: 'primary' },
            { label: 'Explore Features', href: '#core-features', variant: 'secondary' },
          ]}
        />
        <CoreFeatures />
        <AdditionalModules />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
