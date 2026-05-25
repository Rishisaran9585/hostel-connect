import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSnapshot = () => {
  return (
    <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Decorative subtle gradient background blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -ml-48 -mb-24 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Portrait Image */}
          <div className="relative h-[380px] lg:h-[480px] w-full rounded-[2.5rem] overflow-hidden shadow-lg group/img">
            <img 
              src="/hero1.png" 
              alt="Coimbatore Hostel Owners Association" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
          </div>

          {/* Right Column - Content & Bottom Image */}
          <div className="flex flex-col justify-between h-full space-y-6 lg:space-y-8">
            {/* Top Text Content */}
            <div className="space-y-4 md:space-y-5">
              {/* Label */}
              <div>
                <span className="text-[#00c07f] font-bold text-xs md:text-sm tracking-wider uppercase">
                  About Us
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-slate-900 leading-tight tracking-tight">
                Coimbatore Hostel Owners Association (CHOA)
              </h2>

              {/* Description Text */}
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                The Coimbatore Hostel Owners Association (CHOA), established in 2017, is a dedicated nonprofit organization formed by 13 visionary hostel owners who came together with a common goal of strengthening and uplifting the hostel industry in and around Coimbatore. The association was founded to create a unified platform that represents the interests of hostel owners while promoting collaboration, professionalism, and mutual support among members.
              </p>

              {/* Tagline */}
              <div className="border-l-4 border-[#00c07f] pl-4 py-0.5">
                <p className="text-xs md:text-sm font-semibold italic text-slate-800">
                  “Together for Better Hostels and Better Living.”
                </p>
              </div>

              {/* Read More Button */}
              <div className="pt-1">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-3.5 bg-[#00c07f] hover:bg-[#00a86f] text-white font-semibold py-2 pl-5 pr-2 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,192,127,0.25)] hover:shadow-[0_6px_16px_rgba(0,192,127,0.35)] hover:scale-105 active:scale-95 group"
                >
                  <span className="text-xs md:text-sm">Read More</span>
                  <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-[#00c07f]" strokeWidth={3} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="relative rounded-[1.5rem] overflow-hidden shadow-md h-32 md:h-36 w-full group/img2">
              <img 
                src="/hero2.png" 
                alt="Coimbatore Hostel Owners Association Collaboration"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img2:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;


