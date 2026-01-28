import Layout from '@/components/layout/Layout';
import { CheckCircle, Target, Eye, Heart, Shield, Users, Award, Scale, Rocket, History, Globe, ArrowRight, ShieldCheck, Zap, FileText, Calculator, HelpCircle, Check, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    { icon: ShieldCheck, title: 'Absolute Integrity', description: 'We operate with institutional transparency, maintaining the highest ethical standards in all regulatory advocacy.' },
    { icon: Users, title: 'Collective Unity', description: 'Our strength lies in our solidarity. We believe in the power of a unified voice to drive industry-wide change.' },
    { icon: Award, title: 'Operational Excellence', description: 'We establish high benchmarks for safety and service, ensuring Tamil Nadu hostels are world-class facilities.' },
    { icon: Zap, title: 'Active Advocacy', description: 'Proactive engagement with government bodies to protect member interests and simplify administrative hurdles.' },
  ];

  const services = [
    {
      icon: FileText,
      title: 'Statutory Licensing',
      category: 'Regulatory',
      description: 'End-to-end expertise in securing and maintaining the critical Hostel Collector License, ensuring legalized operations.',
      features: ['Digital application handling', 'Bureaucratic liaison', 'Renewal automation', 'Compliance auditing'],
    },
    {
      icon: Calculator,
      title: 'Fiscal Advisory',
      category: 'Finance',
      description: 'Sophisticated tax planning and advocacy. We negotiate statewide tax exemptions and specialized GST guidance.',
      features: ['Property tax optimization', 'GST structure advice', 'Municipal levy appeals', 'Exemption verification'],
    },
    {
      icon: Shield,
      title: 'Legal Advocacy',
      category: 'Protection',
      description: 'Robust institutional support for legal challenges. We represent members in policy discussions and dispute mediation.',
      features: ['Litigation support', 'Policy advocacy', 'Regulatory mediation', 'Rights protection'],
    },
    {
      icon: Users,
      title: 'Strategic Consultancy',
      category: 'Growth',
      description: 'Access to an exclusive knowledge base of hostel operations, market trends, and modern management practices.',
      features: ['Operational auditing', 'Market positioning', 'Networking summits', 'Standardization guide'],
    },
    {
      icon: HelpCircle,
      title: 'Venture Incubation',
      category: 'Consulting',
      description: 'Comprehensive roadmap for new hostel entrepreneurs. From feasibility studies to final launch, we mentor you.',
      features: ['Zoning verification', 'Feasibility reporting', 'System implementation', 'Vendor procurement'],
    },
    {
      icon: Scale,
      title: 'Governance & Compliance',
      category: 'Standards',
      description: 'Maintaining institutional standards in safety and hygiene. Implementing government-mandated infrastructure improvements.',
      features: ['Fire safety engineering', 'Health standard SOPs', 'Building code audits', 'Digital surveillance setup'],
    },
  ];

  const milestones = [
    { year: '2017', title: 'Institutional Foundation', description: 'CHOA was officially registered (63/2017) with a mandate to unite the fragmented hostel sector.' },
    { year: '2018', title: 'Historical GST Victory', description: 'Secured landmark GST exemptions for hostel services, saving millions for the collective membership.' },
    { year: '2019', title: 'Property Tax Reclassification', description: 'Successfully reclassified hostels as residential assets, significantly reducing operational overhead.' },
    { year: '2021', title: 'Regional Hub Expansion', description: 'Established Zonal Operation Centers in Salem, Trichy, Erode, and Tiruppur for decentralized support.' },
    { year: '2024', title: '300+ Visionary Members', description: 'Consolidated a network of 300+ verified proprietors, making CHOA the state\'s most influential body.' },
  ];

  const hostelTypes = [
    {
      icon: Building,
      title: 'Men Hostels',
      description: 'Specialized regulatory frameworks and management systems for mens housing.',
      theme: 'from-blue-500/10 to-blue-600/5'
    },
    {
      icon: Building,
      title: 'Women Hostels',
      description: 'Dedicated focus on the enhanced security mandates and safety protocols.',
      theme: 'from-emerald-500/10 to-emerald-600/5'
    },
  ];

  return (
    <Layout>
      {/* Premium Hero Section */}
      <section className="py-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 mb-8 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
            Our History
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight max-w-5xl mx-auto leading-tight">
            Building the <span className="text-white/80">Future of Hostels</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            We help hostel owners grow safely and legally across Tamil Nadu since 2017.
          </p>
        </div>

        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-dark/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Editorial Story Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Established March 2017</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 tracking-tight leading-tight">
                Our <br /><span className="text-primary/80">Story</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
                <p>
                  CHOA was started to bring all hostel owners together as one strong team.
                </p>
                <p>
                  Today, we work with over 300 owners to solve common problems and deal with government rules together.
                </p>
              </div>

              <div className="flex flex-wrap gap-10 mt-12 pt-12 border-t border-border/30">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-foreground">300+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Active Members</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-foreground">05+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Regional Hubs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-foreground">07+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Policy Victories</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto rounded-[3.5rem] bg-secondary/50 p-12 overflow-hidden border border-border/50 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center mb-8 shadow-2xl shadow-primary/30 transition-transform hover:scale-110 duration-700">
                    <span className="text-white font-black text-5xl">C</span>
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4">Registered Association</h3>
                  <div className="px-8 py-3 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-primary/10">
                    <p className="text-5xl font-black text-primary tracking-tighter leading-none">63/2017</p>
                  </div>
                  <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[9px] pt-4">Government ID Number</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Portfolio Section - Merged from Services.tsx */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Solutions Portfolio</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                How We <br />Help You
              </h2>
            </div>
            <p className="text-muted-foreground text-lg font-medium max-w-sm mb-2 border-l-2 border-primary/20 pl-6">
              We handle the legal paperwork so you can focus on your guests.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-[2.5rem] p-10 border border-border/50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 animate-fade-up flex flex-col items-start overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700" />

                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-transparent group-hover:shadow-primary/20">
                  <service.icon className="w-6 h-6" />
                </div>

                <Badge variant="outline" className="mb-4 border-primary/20 text-primary font-black uppercase tracking-widest text-[8px] px-3 py-0.5">
                  {service.category}
                </Badge>

                <h3 className="text-2xl font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium flex-grow">
                  {service.description}
                </p>

                <div className="w-full space-y-3 pt-8 border-t border-border/30">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3 text-xs font-bold text-foreground/80">
                      <div className="w-5 h-5 rounded-md bg-primary/5 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="mt-8 -ml-3 group/btn font-black uppercase tracking-widest text-[9px] text-primary gap-2 h-10">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Divisions - Merged from Services.tsx */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
              Specialized Divisions
            </h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              We provide distinct regulatory and operational assistance frameworks for the two primary residency sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {hostelTypes.map((type, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${type.theme} p-12 rounded-[3.5rem] border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-700 text-center overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/40 blur-[80px]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center mb-8 shadow-2xl shadow-primary/10 group-hover:scale-110 transition-transform duration-500">
                    <type.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground text-base font-medium leading-relaxed max-w-xs mx-auto">
                    {type.description}
                  </p>
                  <Link to="/contact" className="mt-10 inline-flex items-center gap-3 font-black text-[9px] uppercase tracking-[0.2em] text-primary hover:gap-5 transition-all">
                    Explore Guidelines
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Value Proposition */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                <div className="w-8 h-[2px] bg-primary" />
                <span>The CHOA Creed</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight leading-tight">
                Foundations of Our <br />Institutional Strength
              </h2>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-md">
                We are governed by principles that prioritize member security and industry-wide standardization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-card p-10 rounded-[2.5rem] border border-border/50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-transparent group-hover:shadow-primary/20">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Timeline */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
              Institutional Journey
            </h2>
            <div className="w-16 h-1 hero-gradient mx-auto rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/20 to-transparent hidden md:block -translate-x-1/2" />
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-10 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-primary z-20 hidden md:block" />
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:-mt-2 mb-4 md:mb-0 z-10 px-5 py-1.5 rounded-full hero-gradient text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                    Year {milestone.year}
                  </div>
                  <div className={`w-full md:w-[45%] p-10 bg-card rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl transition-all duration-700 relative overflow-hidden group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`absolute top-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700 ${index % 2 === 0 ? 'left-0 rounded-br-[4rem] rounded-bl-none' : 'right-0'}`} />
                    <h3 className="text-xl font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
