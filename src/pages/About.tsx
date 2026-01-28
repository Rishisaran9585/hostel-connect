import Layout from '@/components/layout/Layout';
import { CheckCircle, Target, Eye, Heart, Shield, Users, Award, Scale } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Shield, title: 'Integrity', description: 'We operate with complete transparency and honesty in all our dealings.' },
    { icon: Users, title: 'Unity', description: 'We believe in the power of collective action and mutual support.' },
    { icon: Award, title: 'Excellence', description: 'We strive for the highest standards in hostel industry practices.' },
    { icon: Scale, title: 'Advocacy', description: 'We actively work to protect and advance members\' interests.' },
  ];

  const milestones = [
    { year: '2017', title: 'Association Founded', description: 'CHOA was officially registered on 15th March 2017 with a vision to unite hostel owners.' },
    { year: '2018', title: 'GST Exemption Victory', description: 'Successfully advocated for GST exemption on hostel services, a major win for the industry.' },
    { year: '2019', title: 'Property Tax Resolution', description: 'Achieved recognition of hostels as residential properties, eliminating commercial tax burden.' },
    { year: '2020', title: 'COVID Support Initiative', description: 'Provided extensive support to members during the pandemic, advocating for relief measures.' },
    { year: '2021', title: 'Multi-city Expansion', description: 'Expanded to Salem, Trichy, Erode, and Tiruppur with dedicated zonal representatives.' },
    { year: '2023', title: '300+ Members Milestone', description: 'Crossed the landmark of 300 active members across Tamil Nadu.' },
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              The Voice of Hostel Owners in Tamil Nadu
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Since 2017, we have been at the forefront of protecting hostel owners' rights and advancing the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Building a Stronger Hostel Industry Together
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Coimbatore Hostel Owner Association (CHOA) was founded in 2017 with a clear mission: 
                  to unite hostel owners under one umbrella and advocate for their rights and interests. 
                  What began as a small group of concerned hostel owners has grown into a powerful 
                  association with over 300 members across Tamil Nadu.
                </p>
                <p>
                  Our association was born out of necessity. Hostel owners faced numerous challenges – 
                  from complex licensing procedures to unfair taxation policies. We recognized that 
                  individually, we had little power to effect change, but together, we could make our 
                  voices heard.
                </p>
                <p>
                  Over the years, we have achieved remarkable victories that have benefited not just our 
                  members, but the entire hostel industry. From securing GST exemptions to ensuring hostels 
                  are recognized as residential rather than commercial properties, our advocacy has 
                  resulted in tangible benefits for hostel owners across the state.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 relative">
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-primary/20" />
                <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-primary/10" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center mb-6 shadow-card">
                    <span className="text-primary-foreground font-bold text-4xl">C</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Established</h3>
                  <p className="text-4xl font-bold text-primary mb-2">2017</p>
                  <p className="text-muted-foreground text-sm">Reg No: 63/2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To protect and promote the interests of hostel owners in Tamil Nadu by advocating for 
                fair policies, providing expert guidance, and creating a unified platform for the 
                hostel industry to thrive. We are committed to ensuring every member has access to 
                the resources and support they need to run successful, compliant hostel businesses.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To establish Tamil Nadu as a model state for hostel industry practices, where every 
                hostel operates with proper licensing, fair taxation, and high standards of service. 
                We envision a future where hostel owners are recognized as valuable contributors to 
                the state's educational and economic ecosystem, and where the industry is regulated 
                fairly and transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-secondary hover:shadow-card transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Key Milestones
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Why Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-8">
              Benefits of Membership
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                'Expert guidance on licensing and compliance',
                'Advocacy for fair policies and taxation',
                'Free consultancy on hostel operations',
                'Access to a network of 300+ hostel owners',
                'Representation in government discussions',
                'Regular updates on industry regulations',
                'Dispute resolution support',
                'Training and workshop opportunities',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
