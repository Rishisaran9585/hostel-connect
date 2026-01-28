import { FileText, Calculator, Users, HelpCircle, Shield, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: FileText,
      title: 'Simplified Collector License',
      description: 'Complete assistance in obtaining and renewing your hostel collector license with minimal hassle.',
    },
    {
      icon: Calculator,
      title: 'Government Tax Assistance',
      description: 'Expert guidance on all government taxes, ensuring compliance while minimizing your tax burden.',
    },
    {
      icon: Users,
      title: 'Free Member Consultancy',
      description: 'Complimentary consultancy services for all association members on hostel-related matters.',
    },
    {
      icon: Shield,
      title: 'Legal Protection',
      description: 'Support in legal matters and protection of your rights as a hostel owner.',
    },
    {
      icon: HelpCircle,
      title: 'New Hostel Setup',
      description: 'Complete guidance for entrepreneurs looking to start a new hostel business.',
    },
    {
      icon: Scale,
      title: 'Compliance Support',
      description: 'Help with all regulatory requirements and maintaining proper documentation.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive support services designed to help hostel owners 
            thrive in their business while staying compliant with regulations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/services">
            <Button variant="default" size="lg" className="group">
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
