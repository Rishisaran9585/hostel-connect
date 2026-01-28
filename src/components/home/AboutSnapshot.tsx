import { CheckCircle2, Calendar, Users, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSnapshot = () => {
  const highlights = [
    { icon: Calendar, text: 'Founded in 2017' },
    { icon: Users, text: '300+ Active Members' },
    { icon: MapPin, text: '5 Branches Across Tamil Nadu' },
    { icon: Shield, text: 'Government Registered Body' },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                The Voice of Hostel Owners in Tamil Nadu
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The Coimbatore Hostel Owner Association (CHOA) is a registered industry body 
                committed to protecting and advancing the interests of hostel owners. Since our 
                establishment in 2017, we have successfully advocated for policy changes that 
                benefit the entire hostel industry.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:shadow-card transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="default" size="lg">
                Learn More About Us
              </Button>
            </Link>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-primary/20" />
              <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-primary/10" />
              
              {/* Central Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center mb-6 shadow-card">
                  <span className="text-primary-foreground font-bold text-4xl">C</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">CHOA</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Coimbatore Hostel Owner Association
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Men Hostels
                  </span>
                  <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Women Hostels
                  </span>
                </div>
              </div>

              {/* Registration Badge */}
              <div className="absolute bottom-6 right-6 bg-background rounded-xl p-4 shadow-card">
                <div className="text-xs text-muted-foreground">Reg No.</div>
                <div className="font-bold text-foreground">63/2017</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
