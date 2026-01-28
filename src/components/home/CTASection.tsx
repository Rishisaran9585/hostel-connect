import { ArrowRight, Phone, ShieldCheck, Mail, Zap, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CTASection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[3rem] md:rounded-[4rem] hero-gradient overflow-hidden p-12 md:p-24 shadow-[0_50px_100px_-20px_rgba(22,101,52,0.3)] group">
          {/* Advanced Background Architecture */}
          <div className="absolute inset-0 opacity-[0.1]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[120px] group-hover:scale-110 transition-all duration-1000 pointer-events-none" />
          <div className="absolute -bottom-48 -left-48 w-[40rem] h-[40rem] bg-black/40 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-20">
            <div className="text-center xl:text-left max-w-2xl">
              <div className="flex items-center justify-center xl:justify-start gap-4 mb-8">
                <div className="w-10 h-[2px] bg-white/40" />
                <span className="text-white/80 font-black uppercase tracking-[0.4em] text-[10px]">Collective Unity</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
                Contribute to the <br /><span className="text-white/70 italic font-medium">Collective Legacy</span>
              </h2>
              <p className="text-white/90 text-xl font-medium leading-relaxed mb-12 max-w-xl mx-auto xl:mx-0">
                The future of our industry is written by those who unify. Join 300+ visionary owners in shaping the narrative.
              </p>

              <div className="flex flex-wrap gap-10 justify-center xl:justify-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg leading-none mb-1">Statewide</p>
                    <p className="text-white/50 text-[10px] uppercase font-black tracking-[0.2em]">Growth Reach</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg leading-none mb-1">300+ Members</p>
                    <p className="text-white/50 text-[10px] uppercase font-black tracking-[0.2em]">Unified Network</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row xl:flex-col gap-6 w-full xl:w-[380px]">
              <Link to="/contact" className="w-full">
                <Button size="xl" className="w-full h-20 rounded-3xl bg-white text-primary hover:bg-secondary font-black text-xl shadow-2xl group/btn transition-all hover:scale-105 active:scale-95">
                  Secure Membership
                  <Zap className="w-6 h-6 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/members" className="w-full">
                <Button size="xl" variant="outline" className="w-full h-20 rounded-3xl border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10 font-black text-lg flex items-center justify-center transition-all">
                  View Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
