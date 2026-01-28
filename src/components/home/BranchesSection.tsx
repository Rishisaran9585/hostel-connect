import { MapPin, Building, Navigation, Globe, Zap, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BranchesSection = () => {
  const branches = [
    {
      city: 'Coimbatore',
      area: 'RS Puram & Peelamedu',
      members: '150+ Members',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop',
    },
    {
      city: 'Chennai',
      area: 'OMR & Adyar',
      members: '80+ Members',
      image: 'https://images.unsplash.com/photo-1583505221971-993559677043?q=80&w=800&auto=format&fit=crop',
    },
    {
      city: 'Madurai',
      area: 'Anna Nagar',
      members: '40+ Members',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?q=80&w=800&auto=format&fit=crop',
    },
    {
      city: 'Trichy',
      area: 'Thillai Nagar',
      members: '25+ Members',
      image: 'https://images.unsplash.com/photo-1626014303757-03f9ec6bc96c?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <div className="w-8 h-[2px] bg-primary" />
              <span>Regional Influence</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Strategic <br /><span className="text-primary/80">Regional Hubs</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg font-medium max-w-sm border-l-2 border-primary/20 pl-6 mb-2">
            Broadening our advocacy footprint across the major industrial centers of Tamil Nadu.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-secondary border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Image with Desaturation */}
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out">
                <img
                  src={branch.image}
                  alt={branch.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>

              {/* Dynamic Overlay Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="mb-4">
                  <Badge className="bg-primary/90 text-white border-none rounded-lg font-black text-[8px] uppercase tracking-widest px-3 py-1 mb-3">
                    {branch.members}
                  </Badge>
                  <h3 className="text-3xl font-black text-white mb-2 leading-none uppercase tracking-tighter">
                    {branch.city}
                  </h3>
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    {branch.area}
                  </p>
                </div>

                <div className="h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-700 delay-100" />

                <div className="mt-4 flex items-center gap-3 text-white font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <span>Hub Intelligence</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Regional Marker Badge */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <span className="text-white font-black text-[10px]">TN</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
