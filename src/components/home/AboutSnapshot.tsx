import { ArrowRight, ShieldCheck, Scale, History, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AboutSnapshot = () => {
  const highlights = [
    { icon: ShieldCheck, text: 'Government Help', subtext: 'Dealing with Rules' },
    { icon: Scale, text: 'Legal Support', subtext: 'Legal Protection' },
    { icon: History, text: '7 Years Experience', subtext: 'Trusted by Many' },
    { icon: Zap, text: 'Business Growth', subtext: 'Smart Advice' },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Premium Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/40 rounded-full blur-[80px] -ml-24 -mb-16" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Narrative */}
          <div className="space-y-8 animate-fade-up">
            <div>
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                <div className="w-8 h-[2px] bg-primary" />
                <span>About Our Group</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mt-2 mb-6 leading-[1.1] tracking-tight">
                A Strong Voice <br /><span className="text-primary/80">for Owners</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium max-w-xl">
                CHOA helps hostel owners in Tamil Nadu work together. We represent over 300 owners and speak up for their needs.
              </p>
            </div>

            {/* Strategic highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-6 rounded-[2rem] bg-secondary/50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-base mb-0.5">{item.text}</h4>
                    <p className="text-muted-foreground text-[9px] font-black uppercase tracking-widest opacity-60">{item.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link to="/about">
                <Button size="xl" className="h-14 px-8 rounded-xl font-black group shadow-xl shadow-primary/20 bg-primary hover:scale-105 transition-all text-base">
                  Read Our Story
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>

              <div className="flex flex-col gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer overflow-hidden shadow-md">
                      <img src={`https://i.pravatar.cc/150?u=${i + 15}`} alt="Member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary text-white flex items-center justify-center text-[9px] font-black shadow-md">
                    +300
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Verified Members</span>
              </div>
            </div>
          </div>

          {/* Visual Excellence Composition */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main Architectural Card */}
            <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-[3.5rem] bg-white p-1.5 shadow-2xl overflow-hidden group border border-border/50">
              <div className="absolute inset-0 bg-secondary/30 rounded-[3rem] m-1.5 overflow-hidden border border-border/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-10">
                  <div className="w-24 h-24 rounded-[2rem] hero-gradient flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-1000">
                    <span className="text-white font-black text-5xl leading-none">C</span>
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4 leading-tight">Member List</h3>
                  <p className="text-muted-foreground text-base font-medium mb-8 leading-relaxed">
                    Making hostels better for everyone in Tamil Nadu through teamwork and shared rules.
                  </p>
                  <div className="flex flex-col gap-6">
                    <p className="text-xs font-black text-foreground uppercase tracking-[0.2em]">Our Services</p>
                    <div className="flex gap-4">
                      <Badge className="bg-primary/10 text-primary border-none rounded-xl font-black py-2 px-4 shadow-sm">MEN'S</Badge>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-xl font-black py-2 px-4 shadow-sm">WOMEN'S</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
