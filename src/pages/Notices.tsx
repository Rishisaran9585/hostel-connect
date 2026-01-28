import Layout from '@/components/layout/Layout';
import { Bell, Calendar, AlertTriangle, Download, ChevronRight, Filter, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import CTASection from '@/components/home/CTASection';

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

const notices: Notice[] = [
  {
    id: 1,
    title: 'Annual General Meeting 2024: Primary Assembly',
    category: 'Strategic',
    content: 'Formal convocation for the 2024 assembly of hostel entrepreneurs. Key agenda includes the ratification of new fire safety mandates and executive committee elections.',
    date: '2024-01-28',
    isUrgent: true,
  },
  {
    id: 2,
    title: 'Statutory Fire Safety Compliance: Deadline Extension',
    category: 'Compliance',
    content: 'The regulatory deadline for the 2024 Fire Safety Audit has been strategically extended. Members must finalize certifications to avoid license interruption.',
    date: '2024-01-25',
    isUrgent: true,
  },
  {
    id: 3,
    title: 'Masterclass: Navigating GST Policy for Hostels',
    category: 'Operational',
    content: 'An exclusive technical session regarding the recent statewide tax exemptions secured by CHOA advocacy. Recommended for all financial representatives.',
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost/hostel-connect/backend/api/notice.php');
        const data = await response.json();
        const transformedData: Notice[] = data.map((item: any) => ({
          id: parseInt(item.id),
          title: item.title,
          category: item.type === 'general' ? 'Operational' : item.type === 'important' ? 'Compliance' : 'Member Event',
          content: item.content,
          date: item.created_at,
          isUrgent: item.type === 'important',
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
      {/* Premium Hero Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 mb-8 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
            Official Registry
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
            Critical <span className="text-white/80">Directives</span> & News
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            The authoritative bulletin for Tamil Nadu hostel owners. Updated in real-time with legislative and administrative alerts.
          </p>
        </div>
      </section>

      {/* Modern Dashboard Layout */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-12 gap-8">

            {/* Left Sidebar - Urgent Alerts & Stats */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-foreground">Board Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border/50">
                    <span className="font-bold text-muted-foreground uppercase text-[9px] tracking-widest">Active Alerts</span>
                    <Badge className="bg-primary text-white text-xs">{notices.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border/50">
                    <span className="font-bold text-muted-foreground uppercase text-[9px] tracking-widest">Urgent Handled</span>
                    <Badge className="bg-red-500 text-white font-black text-xs">{urgentNotices.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-muted-foreground uppercase text-[9px] tracking-widest">Last Updated</span>
                    <span className="text-[10px] font-bold text-foreground">28 Jan 2024</span>
                  </div>
                </div>
              </div>

              {/* High Priority Feature List */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4 mb-2">Priority Directives</h4>
                {urgentNotices.map((notice, index) => (
                  <div key={notice.id} className="group p-5 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-500 cursor-pointer">
                    <div className="flex gap-3 items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 group-hover:text-white flex-shrink-0" />
                      <div>
                        <h5 className="font-black text-base mb-1 leading-tight">{notice.title}</h5>
                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest opacity-60">
                          <Calendar className="w-2.5 h-2.5" />
                          {formatDate(notice.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Timeline - Central Feed */}
            <div className="lg:col-span-8 space-y-8">

              {/* Modern Search/Filter Bar */}
              <div className="flex items-center gap-4 bg-secondary/50 p-2 rounded-[2rem] border border-border/30 mb-12">
                <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input className="h-14 bg-transparent border-none pl-14 focus-visible:ring-0 font-medium placeholder:text-muted-foreground" placeholder="Search directives or categories..." />
                </div>
                <Button variant="ghost" className="h-14 px-8 rounded-2xl gap-2 font-bold text-muted-foreground">
                  <Filter className="w-5 h-5" />
                  Filter Feed
                </Button>
              </div>

              {/* Timeline Feed */}
              <div className="space-y-4 relative">
                {/* Visual vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-secondary hidden md:block" />

                {notices.map((notice, index) => (
                  <div
                    key={notice.id}
                    className="group relative md:pl-20 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Visual Timeline Marker */}
                    <div className="absolute left-6 top-8 w-3.5 h-3.5 rounded-full bg-white border-4 border-primary z-10 hidden md:block group-hover:scale-150 transition-transform duration-500 shadow-lg shadow-primary/20" />

                    <div className={`p-6 rounded-2xl border border-border/50 bg-card hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-700 relative overflow-hidden ${notice.isUrgent ? 'ring-2 ring-red-500/10 grayscale group-hover:grayscale-0' : ''
                      }`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[3rem]" />

                      <div className="flex flex-wrap items-center gap-3 mb-4 relative z-10">
                        <Badge className="bg-secondary text-primary border-none rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
                          {notice.category}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                          <Calendar className="w-3 h-3" />
                          {formatDate(notice.date)}
                        </div>
                        {notice.isUrgent && (
                          <Badge className="bg-red-500 text-white border-none py-0.5 text-[9px] group/u animate-pulse">
                            Action Required
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors pr-16">
                        {notice.title}
                      </h3>

                      <p className="text-muted-foreground text-sm md:text-base font-medium mb-6 leading-relaxed max-w-2xl">
                        {notice.content}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        {notice.hasAttachment ? (
                          <Button variant="outline" size="lg" className="h-12 px-6 rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white font-black text-[10px] gap-2 group/dl shadow-md shadow-primary/5">
                            <Download className="w-4 h-4 group-dl:animate-bounce" />
                            {notice.attachmentName}
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Info className="w-4 h-4" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Digital Bulletin Only</span>
                          </div>
                        )}

                        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subscription Box */}
              <div className="mt-20 p-12 rounded-[3.5rem] hero-gradient relative overflow-hidden shadow-2xl shadow-primary/30 group">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='white'/%3E%3C/svg%3E')]" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-md text-white">
                    <h4 className="text-3xl font-black mb-4 leading-tight">SMS Alert Subscription</h4>
                    <p className="text-white/80 font-medium">Get critical government directives delivered directly to your verified phone number.</p>
                  </div>
                  <Button size="xl" className="h-20 px-12 rounded-[2rem] bg-white text-primary font-black text-lg shadow-2xl transition-all hover:scale-105 active:scale-95">
                    Enable Mobile Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default Notices;
