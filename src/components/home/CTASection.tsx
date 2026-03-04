import { ArrowRight, Phone, ShieldCheck, Mail, Zap, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CTASection = () => {
  return (
    <section className="py-6 bg-background overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative rounded-[1rem] md:rounded-[1.5rem] hero-gradient overflow-hidden p-6 md:p-8 shadow-[0_20px_40px_-10px_rgba(22,101,52,0.15)] group">
          {/* Advanced Background Architecture */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[120px] group-hover:scale-110 transition-all duration-1000 pointer-events-none" />
          <div className="absolute -bottom-48 -left-48 w-[40rem] h-[40rem] bg-black/40 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                <div className="w-5 h-[1.5px] bg-white/40" />
                <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[7px]">Working Together</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tighter leading-tight">
                Join our <span className="text-white/70 italic font-medium">Community</span>
              </h2>
              <p className="text-white/80 text-[11px] font-medium leading-normal mb-4 max-w-md mx-auto md:mx-0">
                Largest group of Tamil Nadu hostel owners. Together, we grow stronger.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left font-sans">
                    <p className="text-white font-black text-[10px] leading-none mb-0.5">Statewide</p>
                    <p className="text-white/40 text-[7px] uppercase font-bold tracking-widest">Growth</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left font-sans">
                    <p className="text-white font-black text-[10px] leading-none mb-0.5">300+ Members</p>
                    <p className="text-white/40 text-[7px] uppercase font-bold tracking-widest">Network</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-2 w-full md:w-[180px]">
              <Link to="/contact" className="flex-1 w-full">
                <Button className="w-full h-10 rounded-lg bg-white text-primary hover:bg-secondary font-black text-[9px] uppercase tracking-wider shadow-sm group/btn transition-all">
                  Join Now
                  <Zap className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/members" className="flex-1 w-full">
                <Button variant="outline" className="w-full h-10 rounded-lg border border-white/20 text-white backdrop-blur-md hover:bg-white/10 font-black text-[9px] uppercase tracking-wider flex items-center justify-center transition-all">
                  Directory
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
