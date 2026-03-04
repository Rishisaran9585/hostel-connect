import { ArrowRight, Users, Building, Award, ShieldCheck, MapPin, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-140px)] flex items-center hero-gradient overflow-hidden">
      {/* Dynamic Background Layout */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Premium Cinematic Blobs */}
      <div className="absolute top-0 -left-48 w-[40rem] h-[40rem] bg-white/[0.02] rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[50rem] h-[50rem] bg-primary-dark/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Elite Credential Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2 mb-6 border border-white/20 animate-fade-up shadow-lg group cursor-default">
            <ShieldCheck className="w-4 h-4 text-white animate-pulse" />
            <span className="text-white text-[9px] font-black tracking-[0.2em] uppercase">
              Working for Hostel Owners Since 2017
            </span>
          </div>

          {/* Visionary Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 animate-fade-up stagger-1 tracking-tight">
            BUILDING BETTER <br />
            <span className="text-white/70 italic font-medium">HOSTELS TOGETHER</span>
          </h1>

          {/* Narrative Tagline */}
          <p className="text-base md:text-lg text-white/90 font-medium mb-8 max-w-2xl animate-fade-up stagger-2 leading-relaxed tracking-tight">
            We are a group of over 300 hostel owners in Tamil Nadu, working together to keep our hostels safe and high-quality.
          </p>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-up stagger-3">
            <Link to="/members">
              <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-primary hover:bg-secondary font-black text-base shadow-xl transition-all hover:scale-105 active:scale-95 group">
                See Members
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/10 font-black text-base transition-all">
                Get in Touch With Us
              </Button>
            </Link>
          </div>

          {/* Elite Stats Ticker */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-fade-up stagger-4 max-w-5xl">
            {[
              { label: 'Experience', value: '8+ Yrs', icon: Award },
              { label: 'Our Members', value: '300+', icon: Users },
              { label: 'Our Offices', value: '05', icon: MapPin },
              { label: 'Hostel Rooms', value: '500+', icon: Building },
            ].map((stat, i) => (
              <div key={i} className="relative bg-white/5 backdrop-blur-3xl rounded-[2rem] p-4 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-500 group overflow-hidden">
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-md">
                    <stat.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-0.5">{stat.value}</div>
                    <div className="text-white/50 text-[8px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Abstract Design Element: Geometric Fade */}
    </section>
  );
};

export default HeroSection;
