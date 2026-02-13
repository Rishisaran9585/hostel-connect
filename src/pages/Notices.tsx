import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, AlertTriangle, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';
import { API_BASE_URL } from '@/config';

interface Notice {
  id: number;
  title: string;
  category: 'Strategic' | 'Compliance' | 'Operational' | 'Member Event';
  content: string;
  date: string;
  isUrgent: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    title: 'Annual Meeting 2024',
    category: 'Strategic',
    content: 'All hostel owners are invited to our 2024 meeting. we will talk about new fire safety rules and elect our team leaders.',
    date: '2024-01-28',
    isUrgent: true,
  },
  {
    id: 2,
    title: 'Fire Safety Rules: More Time Given',
    category: 'Compliance',
    content: 'The deadline for fire safety checks has been moved. Please finish your checks soon to keep your license active.',
    date: '2024-01-25',
    isUrgent: true,
  },
  {
    id: 3,
    title: 'Help with GST for Hostels',
    category: 'Operational',
    content: 'A helpful session on new tax rules for hostels. We will explain how to save on taxes.',
    date: '2024-01-20',
    isUrgent: false,
  },
  {
    id: 4,
    title: 'Membership Enrollment & Renewal Cycle 2024',
    category: 'Operational',
    content: 'The 2024 enrollment window is now active. Please ensure all primary documentation and regional branch registrations are updated.',
    date: '2024-01-18',
    isUrgent: false,
    hasAttachment: true,
    attachmentName: 'Enrollment_Guide_2024.pdf',
  },
  {
    id: 5,
    title: 'Official Directive: Safety Protocols for Women Hostels',
    category: 'Compliance',
    content: 'New government mandates regarding 24/7 security presence and verified digital surveillance for women-only accommodation facilities.',
    date: '2024-01-15',
    isUrgent: true,
    hasAttachment: true,
    attachmentName: 'Directive_WH_2024.pdf',
  },
  {
    id: 6,
    title: 'Zonal Summit Calendar: Western Tamil Nadu',
    category: 'Member Event',
    content: 'Schedule for regional coordination meetings across Erode, Salem, and Tiruppur hubs. Mandatory for zonal representatives.',
    date: '2024-01-10',
    isUrgent: false,
  },
  {
    id: 7,
    title: 'Advocacy Victory: Collector License Streamlining',
    category: 'Strategic',
    content: 'CHOA has successfully negotiated a simplified renewal portal for basic hostel licenses, reducing administrative overhead by 40%.',
    date: '2024-01-05',
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
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notice.php`);
        const data = await response.json();
        const transformedData: Notice[] = data.map((item: any) => ({
          id: parseInt(item.id),
          title: item.title,
          category: item.type, // Map directly from the category returned as type
          content: item.content,
          date: item.created_at,
          isUrgent: parseInt(item.is_urgent) === 1,
        }));
        setNotices(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notices:', error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const urgentNotices = notices.filter(n => n.isUrgent);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">

        {/* Running Notice Section */}
        {urgentNotices.length > 0 && (
          <div className="mb-12 relative overflow-hidden bg-red-50 border-y border-red-100 py-4 shadow-inner">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...urgentNotices, ...urgentNotices].map((notice, i) => ( // Duplicated for smoother feel
                <div key={`${notice.id}-${i}`} className="flex items-center mx-8 text-red-600 font-medium">
                  <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
                  <span className="mr-2 uppercase text-xs font-black tracking-widest text-red-700">Urgent:</span>
                  <span className="text-sm">{notice.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`
                group flex flex-col p-6 rounded-xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-1
                ${notice.isUrgent
                  ? 'bg-red-50/30 border-red-100 hover:border-red-200'
                  : 'bg-card border-border/40 hover:border-primary/20'
                }
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <Badge
                  variant={notice.isUrgent ? "destructive" : "secondary"}
                  className={`
                    uppercase tracking-widest text-[10px] py-1 px-3 border-none
                    ${notice.isUrgent ? '' : 'bg-secondary text-primary'}
                  `}
                >
                  {notice.category}
                </Badge>
                <div className="flex items-center text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                  {formatDate(notice.date)}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                {notice.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                {notice.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-auto">
                {notice.hasAttachment ? (
                  <Button variant="ghost" size="sm" className="h-9 text-xs font-bold text-primary hover:bg-primary/5 px-3 -ml-3 transition-all rounded-lg gap-2">
                    <Download className="w-4 h-4" />
                    {notice.attachmentName?.substring(0, 15)}...
                  </Button>
                ) : (
                  <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest pl-1">
                    View Details
                  </span>
                )}
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTASection />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Layout>
  );
};

export default Notices;
