import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sri Ramani',
      position: 'Hostel Owner',
      image: 'https://i.pravatar.cc/150?u=testimonial1',
      rating: 5,
      text: 'The association has been instrumental in navigating complex regulatory requirements. Their support with the Single Window System was invaluable for our licensing process.',
    },
    {
      name: 'Rajesh Kumar',
      position: 'PG Owner',
      image: 'https://i.pravatar.cc/150?u=testimonial2',
      rating: 5,
      text: 'Excellent guidance on compliance and legal matters. The executive committee is always responsive to member concerns and provides practical solutions.',
    },
    {
      name: 'Priya Sharma',
      position: 'Hostel Operator',
      image: 'https://i.pravatar.cc/150?u=testimonial3',
      rating: 5,
      text: 'Being part of this association has helped us stay informed about regulatory changes and best practices. Highly recommended for all hostel owners!',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -mr-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -ml-40" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-6">
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
            <span>Testimonials</span>
            <div className="w-10 h-1 bg-emerald-600 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
            What our members <br />
            say about us
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Real feedback from hostel and PG owners across Tamil Nadu.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-500 flex flex-col overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Rating */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-foreground font-medium leading-relaxed mb-6 flex-grow relative z-10">
                "{testimonial.text}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-200 mb-6" />

              {/* Author Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-200 flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                  <div className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs mt-0.5">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Member Count Badge */}
        <div className="flex justify-center">
          <div className="relative p-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 w-full max-w-lg shadow-lg">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <span className="text-3xl font-black">1500+</span>
              </div>
              <div>
                <p className="font-black text-foreground text-lg">Active Members</p>
                <p className="text-muted-foreground text-sm font-medium">Trusting us for their hostel operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
