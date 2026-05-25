import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Highlights = () => {
  const highlights = [
    {
      title: 'Association Meetings',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      category: 'Meeting',
    },
    {
      title: 'Workshops & Seminars',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      category: 'Workshop',
    },
    {
      title: 'Regulatory Guidance',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      category: 'Seminar',
    },
    {
      title: 'Member Engagement',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      category: 'Community',
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -ml-48 -mb-32" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -mr-40 -mt-32" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-6">
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
            <span>Recent News</span>
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
            Highlights from our <br />
            Meetings & Events
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Stay updated with our latest activities, workshops, and member gatherings.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Category Badge */}
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Title and CTA */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white leading-tight group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5" />
                    <span>Read More</span>
                  </div>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/50 rounded-2xl transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link to="/blog">
            <Button size="lg" className="h-14 px-10 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:shadow-2xl hover:shadow-emerald-500/30 text-white font-bold text-base transition-all hover:scale-105 group">
              View All News & Updates
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
