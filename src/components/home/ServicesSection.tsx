import { FileText, Calculator, Users, HelpCircle, Shield, Scale, ArrowRight, Check, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ServicesSection = () => {
  const services = [
    {
      icon: ShieldCheck,
      title: 'Statutory Licensing',
      description: 'End-to-end expertise in securing and maintaining the critical Hostel Collector License.',
    },
    {
      icon: Calculator,
      title: 'Fiscal Advisory',
      description: 'Sophisticated tax planning and specialized GST guidance negotiated at the state level.',
    },
    {
      icon: Shield,
      title: 'Legal Advocacy',
      description: 'Institutional support for legal challenges and mediation within the legislative framework.',
    },
    {
      icon: Users,
      title: 'Strategic Consultancy',
      description: 'Access to exclusive industry knowledge and modern management practices for growth.',
    },
    {
      icon: HelpCircle,
      title: 'Venture Incubation',
      description: 'Comprehensive roadmap for new entrepreneurs, from feasibility reports to system launch.',
    },
    {
      icon: Scale,
      title: 'Compliance Audits',
      description: 'Systematic audits ensuring adherence to state-mandated safety and building codes.',
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Premium Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] -ml-24 -mb-16" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Solutions Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Tailored <br /><span className="text-primary/80">Support Systems</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg font-medium max-w-sm border-l-2 border-primary/20 pl-6 mb-2">
            Strategically engineered to handle the complexities of institutional residency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2.5rem] bg-secondary/30 border border-border/50 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col items-start overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500" />

              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <service.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium flex-grow">
                {service.description}
              </p>

              <Link to="/about" className="mt-auto flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                <span>Request Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
