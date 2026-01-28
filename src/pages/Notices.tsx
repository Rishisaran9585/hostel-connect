import Layout from '@/components/layout/Layout';
import { Bell, Calendar, AlertTriangle, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
}

const notices: Notice[] = [
  {
    id: 1,
    title: 'Annual General Meeting 2024 - Mandatory Attendance',
    content: 'All members are hereby informed that the Annual General Meeting for the year 2024 will be held on February 15th, 2024 at 10:00 AM at the Association Hall, Coimbatore. Attendance is mandatory for all registered members. Important agenda items including election of new office bearers and policy decisions will be discussed.',
    date: '2024-01-28',
    isUrgent: true,
  },
  {
    id: 2,
    title: 'New Fire Safety Compliance Deadline Extended',
    content: 'The deadline for fire safety compliance has been extended to March 31st, 2024. All hostel owners are required to complete fire safety audits and obtain necessary certifications before this date. Non-compliance may result in license suspension.',
    date: '2024-01-25',
    isUrgent: true,
  },
  {
    id: 3,
    title: 'Workshop on Tax Compliance - Free for Members',
    content: 'CHOA is organizing a free workshop on tax compliance for all members on February 5th, 2024. The workshop will cover property tax, GST exemptions, and other relevant tax matters. Limited seats available. Register early to confirm your participation.',
    date: '2024-01-20',
    isUrgent: false,
  },
  {
    id: 4,
    title: 'Membership Renewal Reminder',
    content: 'This is a reminder for all members to renew their annual membership before March 1st, 2024. Members with pending renewals will not be able to avail association services. Please visit our office or contact us to complete your renewal.',
    date: '2024-01-18',
    isUrgent: false,
    hasAttachment: true,
    attachmentName: 'Renewal_Form_2024.pdf',
  },
  {
    id: 5,
    title: 'New Government Guidelines for Women Hostels',
    content: 'The Tamil Nadu government has issued new guidelines for women hostels regarding safety measures and compliance requirements. All women hostel owners are requested to review these guidelines and implement necessary changes within 60 days.',
    date: '2024-01-15',
    isUrgent: true,
    hasAttachment: true,
    attachmentName: 'TN_Women_Hostel_Guidelines_2024.pdf',
  },
  {
    id: 6,
    title: 'Zonal Meeting Schedule - January 2024',
    content: 'Zonal meetings for January 2024 are scheduled as follows: Coimbatore - Jan 25, Salem - Jan 26, Trichy - Jan 27, Erode - Jan 28, Tiruppur - Jan 29. All zonal members are requested to attend their respective meetings.',
    date: '2024-01-10',
    isUrgent: false,
  },
  {
    id: 7,
    title: 'Collector License Renewal Process Simplified',
    content: 'Good news for all members! The collector license renewal process has been simplified based on our advocacy. The new streamlined process reduces documentation requirements and processing time. Contact our office for assistance with your renewal.',
    date: '2024-01-05',
    isUrgent: false,
  },
  {
    id: 8,
    title: 'Holiday Closure Notice',
    content: 'The CHOA office will remain closed from January 14-16, 2024 on account of Pongal celebrations. For emergencies, please contact the emergency helpline. Regular services will resume on January 17, 2024.',
    date: '2024-01-02',
    isUrgent: false,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const Notices = () => {
  const urgentNotices = notices.filter(n => n.isUrgent);
  const regularNotices = notices.filter(n => !n.isUrgent);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              Notice Board
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Official Announcements
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Stay updated with the latest announcements, circulars, and important notices from CHOA.
            </p>
          </div>
        </div>
      </section>

      {/* Urgent Notices */}
      {urgentNotices.length > 0 && (
        <section className="py-8 bg-accent/5 border-y border-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Urgent Notices</h2>
            </div>
            <div className="space-y-4">
              {urgentNotices.map(notice => (
                <div 
                  key={notice.id}
                  className="bg-card rounded-xl p-6 shadow-card border-l-4 border-accent"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{notice.title}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          Urgent
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {notice.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(notice.date)}</span>
                        </div>
                        {notice.hasAttachment && (
                          <Button variant="outline" size="sm" className="text-xs">
                            <Download className="w-3.5 h-3.5 mr-1" />
                            {notice.attachmentName}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Notices */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">All Notices</h2>
          </div>
          <div className="space-y-4">
            {notices.map(notice => (
              <div 
                key={notice.id}
                className={`bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border-l-4 ${
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
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{notice.title}</h3>
                      {notice.isUrgent && (
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {notice.content}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(notice.date)}</span>
                      </div>
                      {notice.hasAttachment && (
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="w-3.5 h-3.5 mr-1" />
                          {notice.attachmentName}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Notices;
