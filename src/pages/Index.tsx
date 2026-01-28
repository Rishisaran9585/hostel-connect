import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import AchievementsSection from '@/components/home/AchievementsSection';
import ServicesSection from '@/components/home/ServicesSection';
import StatsCounter from '@/components/home/StatsCounter';
import NoticesSection from '@/components/home/NoticesSection';
import BranchesSection from '@/components/home/BranchesSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSnapshot />
      <AchievementsSection />
      <ServicesSection />
      <StatsCounter />
      <NoticesSection />
      <BranchesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
