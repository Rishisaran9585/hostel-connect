import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import ExecutiveCommittee from '@/components/home/ExecutiveCommittee';
import ServicesSection from '@/components/home/ServicesSection';
import Highlights from '@/components/home/Highlights';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSnapshot />
      <ExecutiveCommittee />
      <ServicesSection />
      <Highlights />
      <Testimonials />
    </Layout>
  );
};

export default Index;
