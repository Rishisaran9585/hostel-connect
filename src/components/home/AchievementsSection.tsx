import { Trophy, FileCheck, Building2, Award, CheckCircle } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: FileCheck,
      title: 'No GST for Hostel Industry',
      description: 'Successfully advocated for GST exemption for hostel services, saving thousands for our members.',
    },
    {
      icon: Building2,
      title: 'No Commercial Property Tax',
      description: 'Achieved recognition of hostels as residential properties, eliminating commercial tax burden.',
    },
    {
      icon: Trophy,
      title: 'Industry Revolution',
      description: 'Transformed the hostel industry standards and practices across Tamil Nadu.',
    },
    {
      icon: Award,
      title: 'Highest Licensed Hostel Count',
      description: 'Coimbatore now has the highest number of properly licensed hostels in the region.',
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Key Achievements
          </h2>
          <p className="text-muted-foreground text-lg">
            Our association has played a pivotal role in shaping policies and 
            protecting the rights of hostel owners across Tamil Nadu.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <achievement.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {achievement.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Achieved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
