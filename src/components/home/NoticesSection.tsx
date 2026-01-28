import { Bell, Calendar, ArrowRight, AlertTriangle, Info, ShieldAlert, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NoticesSection = () => {
  const notices = [
    {
      id: 1,
      title: 'Annual Institutional Summit 2024',
      date: '2024-02-15',
      isUrgent: true,
      category: 'Summit',
      excerpt: 'The definitive annual assembly for all CHOA members to discuss the 2024 legislative roadmap.',
    },
    {
      id: 2,
      title: 'Fire Safety Infrastructure Mandate',
      date: '2024-01-28',
      isUrgent: true,
      category: 'Mandate',
      excerpt: 'Critical updates to the automated fire suppression standards required for all classified hostels.',
    },
    {
      id: 3,
      title: 'Registry Renewal Cycle',
      date: '2024-01-20',
      isUrgent: false,
      category: 'Registry',
      excerpt: 'The 2024 institutional membership renewal window is now open for all verified proprietors.',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background kinetic elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-24 -mt-24" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Dashboard Header */}
          <div className="lg:w-2/5 sticky top-24">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Real-time Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mt-2 mb-6 tracking-tight leading-[1.1]">
              Institutional <br /><span className="text-primary/80">Directives</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
              Synchronized bulletins and critical alerts broadcasted directly from the association council.
            </p>
            <Link to="/notices">
              <Button variant="default" className="h-16 px-10 rounded-2xl font-black group shadow-xl shadow-primary/20 bg-primary hover:scale-105 transition-all text-base">
                View All News
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Intelligence Feed */}
          <div className="lg:w-3/5 grid gap-6">
            {notices.map((notice, index) => (
              <div
                key={notice.id}
                className="group relative bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-8 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500" />

                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  {/* Status Indicator */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-sm ${notice.isUrgent ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                    {notice.isUrgent ? (
                      <ShieldAlert className="w-7 h-7" />
                    ) : (
                      <Bell className="w-7 h-7" />
                    )}
                  </div>

                  {/* Directive Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-white/50 border border-border/50 px-3 py-1 rounded-full">
                        {notice.category}
                      </span>
                      {notice.isUrgent && (
                        <Badge variant="destructive" className="bg-destructive text-white border-none px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest animate-pulse">
                          Urgent
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest ml-auto opacity-50">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(notice.date)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {notice.excerpt}
                    </p>
                  </div>

                  {/* Terminal Action */}
                  <div className="flex items-center md:items-end md:justify-end">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary hover:text-white transition-all w-12 h-12 border border-border/50">
                      <ArrowRight className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Visual Indicator of more */}
            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-[0.25em] bg-white/30 px-6 py-2 rounded-full border border-border/50">
                Latest News & Updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
