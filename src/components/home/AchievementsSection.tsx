import { Award, Scale, ShieldCheck, Zap, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: ShieldCheck,
      title: 'Policy Reform',
      description: 'Pioneered the automated licensing protocol now adopted by the state regulatory bodies.',
      tag: 'Governance'
    },
    {
      icon: Scale,
      title: 'Legal Victory',
      description: 'Successfully mediated property tax structures for institutional hostels at the ministerial level.',
      tag: 'Advocacy'
    },
    {
      icon: Calculator,
      title: 'Fiscal Planning',
      description: 'Implemented GST exemption frameworks for small-scale residential facilities for members.',
      tag: 'Finance'
    },
    {
      icon: Award,
      title: 'Excellence Shield',
      description: 'Awarded "Outstanding Industrial Body 2023" for excellence in administrative transparency.',
      tag: 'Award'
    }
  ];

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 animate-fade-up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Impact & Legacy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Championing the <br /><span className="text-primary">Policy Framework</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-sm font-medium leading-relaxed border-l-2 border-primary/20 pl-6 mb-2">
            Our association acts as the definitive interface between proprietorship and legislative governance.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 border border-border/50 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500" />

              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <achievement.icon className="w-6 h-6" />
              </div>

              <div className="flex flex-col h-full">
                <Badge variant="outline" className="w-fit mb-4 text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary px-3 py-1">
                  {achievement.tag}
                </Badge>
                <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
