import { ArrowRight, Users, Building, Award, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/hero1.png',
    '/hero2.png',
    '/hero3.png',
    '/hero4.png',
    '/hero5.png',
    '/hero6.png',
  ];

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[650px] md:h-[750px] flex items-center overflow-hidden group">
      {/* Background Image with Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
        {/* Enhanced Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-3xl space-y-8 py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl rounded-full px-5 py-3 border border-white/30 animate-fade-up shadow-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-white text-xs font-bold tracking-wider uppercase">
              Established 2017 • 300+ Members • 10,000+ Rooms
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-black text-white leading-[1.1] animate-fade-up stagger-1 tracking-tight">
            Building Better <br />
            <span className="text-white">Hostels Together</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl animate-fade-up stagger-2 leading-relaxed">
            A unified voice for 300+ hostel and PG owners across Tamil Nadu. We work to resolve operational issues, ensure legal compliance, and promote sustainable growth.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 pt-4 animate-fade-up stagger-3">
            {[
              { value: '300+', label: 'Members' },
              { value: '10,000+', label: 'Rooms' },
              { value: '2017', label: 'Founded' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-8 animate-fade-up stagger-4">
            <Link to="/members">
              <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-black hover:bg-emerald-400 font-bold text-base shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                Explore Members
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl border-2 border-white/40 text-white backdrop-blur-md hover:bg-white/15 font-bold text-base transition-all">
                Join Us
              </Button>
            </Link>
          </div>

          {/* Image indicator dots */}
          <div className="flex gap-3 pt-8 animate-fade-up stagger-5">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-white w-8'
                    : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
