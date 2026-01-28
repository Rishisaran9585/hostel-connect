import Layout from '@/components/layout/Layout';
import { FileText, Calculator, Users, HelpCircle, Shield, Scale, ClipboardCheck, HeartHandshake, GraduationCap, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: 'Simplified Collector License',
      description: 'We provide complete end-to-end assistance in obtaining your hostel collector license. Our team guides you through the entire process, handles documentation, and ensures quick approval.',
      features: ['Document preparation', 'Application submission', 'Follow-up with authorities', 'Renewal assistance'],
    },
    {
      icon: Calculator,
      title: 'Government Tax Assistance',
      description: 'Navigate the complex world of taxes with our expert guidance. We help you understand applicable taxes, claim exemptions, and ensure full compliance with tax regulations.',
      features: ['Property tax consultation', 'GST guidance', 'Tax filing support', 'Exemption claims'],
    },
    {
      icon: Users,
      title: 'Free Member Consultancy',
      description: 'All association members get access to free consultancy services on various aspects of hostel management and operations.',
      features: ['Operational guidance', 'Best practices', 'Industry insights', 'Peer networking'],
    },
    {
      icon: Shield,
      title: 'Legal Protection',
      description: 'We stand by our members in legal matters. Our association provides support and guidance when members face legal challenges related to their hostel business.',
      features: ['Legal consultation', 'Dispute mediation', 'Rights advocacy', 'Documentation support'],
    },
    {
      icon: HelpCircle,
      title: 'New Hostel Setup',
      description: 'Thinking of starting a hostel? We provide comprehensive guidance for new entrepreneurs looking to enter the hostel industry.',
      features: ['Location guidance', 'License requirements', 'Setup consultation', 'Compliance checklist'],
    },
    {
      icon: Scale,
      title: 'Compliance Support',
      description: 'Stay compliant with all regulatory requirements. We help you understand and meet all the compliance requirements for running a hostel.',
      features: ['Fire safety', 'Health standards', 'Building codes', 'Safety audits'],
    },
    {
      icon: ClipboardCheck,
      title: 'Documentation Services',
      description: 'Professional assistance with all documentation requirements for your hostel business, from initial setup to ongoing compliance.',
      features: ['Agreement drafts', 'Record maintenance', 'Compliance documents', 'Government forms'],
    },
    {
      icon: HeartHandshake,
      title: 'Dispute Resolution',
      description: 'We help mediate and resolve disputes between hostel owners, tenants, and authorities to maintain harmony in the industry.',
      features: ['Mediation services', 'Fair resolution', 'Expert guidance', 'Legal referrals'],
    },
  ];

  const hostelTypes = [
    {
      icon: Building,
      title: 'Men Hostels',
      description: 'Complete support for owners running mens hostels, including specialized guidance on regulations and best practices.',
    },
    {
      icon: Building,
      title: 'Women Hostels',
      description: 'Dedicated assistance for womens hostel owners, with focus on safety compliance and specific regulatory requirements.',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Comprehensive Support for Hostel Owners
            </h1>
            <p className="text-xl text-primary-foreground/90">
              From licensing to legal protection, we provide everything you need to run a successful hostel business.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Core Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive support services designed to help hostel owners succeed while staying fully compliant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/20"
              >
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel Types */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              We Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              All Types of Hostels
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hostelTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card text-center"
              >
                <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-6">
                  <type.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {type.title}
                </h3>
                <p className="text-muted-foreground">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Our Services?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to learn more about how we can help you with your hostel business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
              <Link to="/members">
                <Button variant="outline" size="lg">Join Association</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
