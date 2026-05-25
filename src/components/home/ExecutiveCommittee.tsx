import { Badge } from '@/components/ui/badge';

const ExecutiveCommittee = () => {
  const executives = [
    {
      name: 'A. Thiruparan',
      position: 'Chairman',
      image: 'https://i.pravatar.cc/150?u=exec1',
    },
    {
      name: 'S. Suresh',
      position: 'Vice Chairman',
      image: 'https://i.pravatar.cc/150?u=exec2',
    },
    {
      name: 'R. Natrajan',
      position: 'Joint Treasurer',
      image: 'https://i.pravatar.cc/150?u=exec3',
    },
    {
      name: 'M. Ashok Kumar',
      position: 'Vice President',
      image: 'https://i.pravatar.cc/150?u=exec4',
    },
    {
      name: 'Sahil Srivastavam',
      position: 'Vice President',
      image: 'https://i.pravatar.cc/150?u=exec5',
    },
    {
      name: 'P. Vinaya Raja',
      position: 'Joint Secretary',
      image: 'https://i.pravatar.cc/150?u=exec6',
    },
    {
      name: 'M S Radhakrishnan',
      position: 'Joint Treasurer',
      image: 'https://i.pravatar.cc/150?u=exec7',
    },
    {
      name: 'M N Muruganantham',
      position: 'Co-Secretary',
      image: 'https://i.pravatar.cc/150?u=exec8',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -mr-48 -mt-32" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -ml-40 -mb-32" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-6">
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
            <span>Leadership</span>
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
            Our Executive Committee
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Meet the dedicated leaders guiding our association towards excellence and member success.
          </p>
        </div>

        {/* Executive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {executives.map((exec, index) => (
            <div
              key={index}
              className="group text-center space-y-5 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className="relative mx-auto">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-emerald-200 shadow-lg group-hover:shadow-2xl group-hover:border-emerald-400 transition-all duration-500">
                  <img 
                    src={exec.image} 
                    alt={exec.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white shadow-md" />
              </div>

              {/* Member Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-foreground group-hover:text-emerald-600 transition-colors">{exec.name}</h3>
                <div className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full font-bold text-xs">
                  {exec.position}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Social Links (optional) */}
              <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer" />
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;
