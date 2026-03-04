import { useEffect, useState, useRef } from 'react';
import { Calendar, Users, Building, MapPin, Award, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = '', duration = 2500 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smoother count
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      setCount(Math.floor(end * easeOutExpo(progress)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-1">
      {count}{suffix}
    </div>
  );
};

const StatsCounter = () => {
  const stats = [
    {
      icon: ShieldCheck,
      value: 8,
      suffix: '+',
      label: 'Institutional Legacy',
      trend: 'ESTABLISHED 2017'
    },
    {
      icon: Users,
      value: 300,
      suffix: '+',
      label: 'Council Members',
      trend: 'ACTIVE PROPRIETORS'
    },
    {
      icon: Building,
      value: 500,
      suffix: '+',
      label: 'Verified Assets',
      trend: 'LICENSED FACILITIES'
    },
    {
      icon: MapPin,
      value: 5,
      suffix: '',
      label: 'Regional Hubs',
      trend: 'TAMIL NADU WIDE'
    },
  ];

  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* High-Tech Background Layout */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="absolute -top-48 -left-48 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[30rem] h-[30rem] bg-black/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 animate-fade-up shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <stat.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                </div>

                <Counter end={stat.value} suffix={stat.suffix} />

                <div className="mt-2 flex flex-col items-center">
                  <span className="text-white/40 font-black text-[9px] uppercase tracking-[0.2em] mb-3">{stat.label}</span>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white font-black text-[8px] uppercase tracking-widest border border-white/10 group-hover:bg-white group-hover:text-primary transition-all">
                    <Zap className="w-3 h-3 group-hover:animate-pulse" />
                    {stat.trend}
                  </div>
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-white/5 rounded-tl-[2rem] group-hover:bg-white/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
