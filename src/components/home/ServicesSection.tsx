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
    <section className="py-24 bg-gradient-to-b from-background to-gray-50 relative overflow-hidden">
      {/* Modern Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -ml-48 -mt-32" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -mr-40 -mb-32" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-6">
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">
            How We Help You <br />
            Succeed
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Comprehensive support to handle legal requirements while you focus on providing quality accommodation.
          </p>
        </div>

        {/* Services Grid - Modern Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-500 overflow-hidden flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg text-white group-hover:scale-110 transition-transform duration-500">
                <service.icon className="w-7 h-7" />
              </div>

              {/* Badge */}
              <div className="inline-flex gap-2 mb-4 w-fit">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
                  {service.title.split(' ')[0]}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow font-medium">
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
