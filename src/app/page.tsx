import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import ScrollRevealText from '@/components/ScrollRevealText/ScrollRevealText';
import Separator from '@/components/Separator/Separator';
import DataPrivacy from '@/components/DataPrivacy/DataPrivacy';
import JoinWaitlist from '@/components/JoinWaitlist/JoinWaitlist';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';

const missionPreview = `Health shouldn't be something we only think about when it's too late. It should be something we understand, manage, and nurture every day clearly, calmly, and intelligently. The truth is, most people don't know what's really going on inside their bodies. Not because they don't care, but because the system makes it nearly impossible to know.`;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Connected Healthcare."
          subtitle="One central platform where you can book appointments, view test results, keep medical records, all in one place."
          showCTA={true}
          fullHeight={true}
        />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <ScrollRevealText text={missionPreview} preview={true} enableReveal={false} />
        <Separator variant="dark" />
        <div id="data-privacy">
          <DataPrivacy />
        </div>
        <JoinWaitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
