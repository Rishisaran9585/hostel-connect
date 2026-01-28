import { Bell, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NoticesSection = () => {
  const notices = [
    {
      id: 1,
      title: 'Annual General Meeting 2024',
      date: '2024-02-15',
      isUrgent: true,
      excerpt: 'All members are requested to attend the AGM scheduled for February 2024.',
    },
    {
      id: 2,
      title: 'New Fire Safety Guidelines',
      date: '2024-01-28',
      isUrgent: true,
      excerpt: 'Important update regarding fire safety compliance for all registered hostels.',
    },
    {
      id: 3,
      title: 'Membership Renewal Reminder',
      date: '2024-01-20',
      isUrgent: false,
      excerpt: 'Please renew your annual membership before the deadline to continue enjoying benefits.',
    },
    {
      id: 4,
      title: 'Workshop on Tax Compliance',
      date: '2024-01-15',
      isUrgent: false,
      excerpt: 'Free workshop for members on understanding and complying with tax regulations.',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Section Header */}
          <div className="lg:col-span-1">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Latest Notices
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Important announcements and updates for association members. Stay informed about meetings, policy changes, and events.
            </p>
            <Link to="/notices">
              <Button variant="default" className="group">
                View All Notices
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Notices List */}
          <div className="lg:col-span-2 space-y-4">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className={`bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border-l-4 ${
                  notice.isUrgent ? 'border-accent' : 'border-primary'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notice.isUrgent ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    {notice.isUrgent ? (
                      <AlertTriangle className="w-5 h-5 text-accent" />
                    ) : (
                      <Bell className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {notice.title}
                      </h3>
                      {notice.isUrgent && (
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex-shrink-0">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                      {notice.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(notice.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
