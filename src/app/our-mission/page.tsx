import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import ScrollRevealText from '@/components/ScrollRevealText/ScrollRevealText';
import JoinWaitlist from '@/components/JoinWaitlist/JoinWaitlist';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: "Our Mission - Zulu Healthcare Platform",
  description: "We're building the future of preventative healthcare. Zulu brings all your health information into one place — clean, organized, and instantly accessible. Learn about our mission to transform healthcare.",
  openGraph: {
    title: "Our Mission - Zulu Healthcare Platform",
    description: "We're building the future of preventative healthcare. Zulu brings all your health information into one place — clean, organized, and instantly accessible.",
  },
};

const fullMissionText = `Health shouldn't be something we only think about when it's too late. It should be something we understand, manage, and nurture every day — clearly, calmly, and intelligently.

The truth is, most people don't know what's really going on inside their bodies. Not because they don't care, but because the system makes it nearly impossible to know. Our health data is scattered across hospitals, labs, and clinics — trapped in disconnected systems, collecting dust in drawers and inboxes.

The result is a dangerous kind of blindness: we make decisions about our health with fragments of information, when what we need is the full picture.

We believe that the future of healthcare is preventative — but prevention requires data. It requires access, organization, and context. It requires a clear, continuous view of your own health.

That's why we're building Zulu. To bring all your health information into one place — clean, organized, and instantly accessible.

Every lab result, every prescription, every scan, every diagnosis — right there, on your phone. An up to date and exhaustive record of your health.

To do this, we're connecting directly with hospitals, clinics, labs, and pharmacies across the region — building the infrastructure that allows your data to flow safely and intelligently into one app.

You'll be able to see your records, manage appointments, view test results, and even take care of your family's health, all on Zulu.

We're still early. Really early. But the mission is clear, and we're building the future of healthcare from the ground up. If you want to help, here's how:

Download the app. Try it. Tell us everything you hate about it.

Every complaint helps us get it right. And if you work in a hospital or clinic — join us.

Book a demo. Let's connect your systems. Let's build this thing together.`;

export default function OurMission() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Our Mission"
          showCTA={false}
          fullHeight={false}
        />
        <ScrollRevealText text={fullMissionText} preview={false} />
        <JoinWaitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

