import { ArrowRight, Phone, ShieldCheck, Mail, Zap, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CTASection = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] hero-gradient overflow-hidden p-10 md:p-16 shadow-[0_40px_80px_-20px_rgba(22,101,52,0.25)] group">
          {/* Advanced Background Architecture */}
          <div className="absolute inset-0 opacity-[0.1]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="absolute -top-48 -right-48 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-all duration-1000 pointer-events-none" />
          <div className="absolute -bottom-48 -left-48 w-[30rem] h-[30rem] bg-black/40 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-12">
            <div className="text-center xl:text-left max-w-2xl">
              <div className="flex items-center justify-center xl:justify-start gap-4 mb-6">
                <div className="w-8 h-[2px] bg-white/40" />
                <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[9px]">Working Together</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
                Join our <br /><span className="text-white/70 italic font-medium">Community</span>
              </h2>
              <p className="text-white/90 text-lg font-medium leading-relaxed mb-8 max-w-xl mx-auto xl:mx-0">
                Be part of the largest group of hostel owners in Tamil Nadu. Together, we grow stronger.
              </p>

              <div className="flex flex-wrap gap-8 justify-center xl:justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-base leading-none mb-1">Statewide</p>
                    <p className="text-white/50 text-[9px] uppercase font-black tracking-[0.2em]">Growth Reach</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-base leading-none mb-1">300+ Members</p>
                    <p className="text-white/50 text-[9px] uppercase font-black tracking-[0.2em]">Unified Network</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row xl:flex-col gap-4 w-full xl:w-[320px]">
              <Link to="/contact" className="w-full">
                <Button className="w-full h-16 rounded-2xl bg-white text-primary hover:bg-secondary font-black text-lg shadow-xl group/btn transition-all hover:scale-105 active:scale-95">
                  Join Us Now
                  <Zap className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/members" className="w-full">
                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10 font-black text-base flex items-center justify-center transition-all">
                  See All Members
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
