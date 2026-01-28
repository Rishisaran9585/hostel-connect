import { MapPin } from 'lucide-react';

const BranchesSection = () => {
  const branches = [
    { name: 'Coimbatore', isHeadquarters: true },
    { name: 'Salem', isHeadquarters: false },
    { name: 'Trichy', isHeadquarters: false },
    { name: 'Erode', isHeadquarters: false },
    { name: 'Tiruppur', isHeadquarters: false },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Presence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Branches Across Tamil Nadu
          </h2>
          <p className="text-muted-foreground text-lg">
            We have established our presence in major cities across Tamil Nadu, 
            ensuring support and representation for hostel owners throughout the state.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {branches.map((branch, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                branch.isHeadquarters 
                  ? 'hero-gradient text-primary-foreground shadow-card' 
                  : 'bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30'
              }`}
            >
              <MapPin className={`w-5 h-5 ${branch.isHeadquarters ? '' : 'text-primary'}`} />
              <div>
                <span className="font-semibold">{branch.name}</span>
                {branch.isHeadquarters && (
                  <span className="block text-xs opacity-80">Headquarters</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
