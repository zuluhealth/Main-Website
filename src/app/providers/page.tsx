import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import EcosystemDiagram from '@/components/EcosystemDiagram/EcosystemDiagram';
import SolutionsOverview from '@/components/SolutionsOverview/SolutionsOverview';
import Footer from '@/components/Footer/Footer';

const CALENDLY_URL = 'https://outlook.office.com/book/ZuluPlatformDemos@basbina352.com/?ismsaljsauthenabled';

export const metadata: Metadata = {
  title: 'For Providers - Zulu Healthcare Platform',
  description:
    "We're building the biggest and the most connected healthtech system in the Middle East.",
  openGraph: {
    title: 'For Providers - Zulu Healthcare Platform',
    description:
      "We're building the biggest and the most connected healthtech system in the Middle East.",
  },
};

export default function Providers() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Modernize Your Practice. Connect Your Care."
          subtitle="We're building the biggest and the most connected healthtech system in the Middle East"
          showCTA={true}
          fullHeight={true}
          variant="provider"
          ctaButtons={[
            { label: 'Book a demo', href: CALENDLY_URL, variant: 'primary' },
            { label: 'Our Digital Solutions', href: '/products', variant: 'secondary' },
          ]}
        />
        <EcosystemDiagram />
        <SolutionsOverview />
      </main>
      <Footer />
    </>
  );
}
