import Layout from '@/components/layout/Layout';
import { Target, Lightbulb, CheckCircle2, HeartHandshake, Shield, Scale, Users, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VisionMission = () => {
  const objectiveCategories = [
    {
      title: "Unity & Ethics",
      icon: Users,
      description: "Uniting owners under a common legal and ethical framework.",
      points: [
        "To bring all hostel owners operating in the city under one roof and create unity among them.",
        "All hostel owners operating in the city shall strive to operate their establishments in a legal and ethical manner.",
        "To safeguard and enhance the interests and security aspects of the hostel owners mentioned above.",
        "This organization shall operate without political motives or profit-oriented intentions.",
        "The association shall function in accordance with the T.N.A. Association Registration Act, 1975 and Rules, 1978"
      ]
    },
    {
      title: "Safety & Wellbeing",
      icon: Home,
      description: "Setting benchmarks for safe and healthy living.",
      points: [
        "To create awareness regarding the development of basic infrastructure facilities to ensure safe accommodation for both men and women, irrespective of ethnicity, language, or religion.",
        "To promote awareness about maintaining safety and hygiene standards in hostels, particularly for students attending colleges and individuals going to work.",
        "To ensure that men and women staying in hostels are accommodated separately and safely, and that adequate facilities are provided for their well-being and reassurance of their parents.",
        "To improve the health and safety standards of hostels by adopting modern communication tools suitable for the changing environment.",
        "To promote a healthy and comfortable living environment for people residing in hostels."
      ]
    },
    {
      title: "Social Welfare",
      icon: HeartHandshake,
      description: "Empowering the underprivileged and collaborating for society.",
      points: [
        "To provide assistance to the poor and orphans in establishing small industrial enterprises, considering their financial circumstances.",
        "To collaborate with other organizations and individuals for the benefit and welfare of society.",
        "To provide free textbooks, school uniforms, and medical assistance to poor orphans, within the financial capacity of the institution.",
        "To provide access to medical facilities wherever possible."
      ]
    }
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
            Institutional Mandate
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight max-w-5xl mx-auto leading-tight">
            Our Vision & <span className="text-white/80">Mission</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            The core principles and objectives that drive the Coimbatore Hostel Owners Association.
          </p>
        </div>

        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-dark/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Vision & Mission High-Level */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Vision Card */}
            <div className="bg-primary/[0.03] p-12 rounded-[3.5rem] border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-[6rem] group-hover:scale-110 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-2xl shadow-primary/10">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                To create a unified, standard-driven, and thriving hostel ecosystem in the city where hostel owners are empowered and residents experience safe, hygienic, and inclusive accommodations.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-secondary/30 p-12 rounded-[3.5rem] border border-border/50 shadow-sm hover:shadow-xl transition-all duration-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/50 rounded-bl-[6rem] group-hover:scale-110 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-2xl shadow-black/5">
                <Target className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                To guide operators toward legal compliance, raise infrastructure benchmarks, protect owner interests, and extend our resources for the socio-economic welfare of the broader community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Objectives List */}
      <section className="py-24 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Core Bylaws</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
              Aims & Objectives
            </h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              The foundational pillars that outline our operational duties, member commitments, and social responsibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {objectiveCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-card p-10 rounded-[2.5rem] border border-border/50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 relative"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{category.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {category.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-medium leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default VisionMission;
