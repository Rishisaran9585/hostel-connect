import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Phone, Building, ChevronDown, User, Mail, ShieldCheck, MapPin, Users, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';

type MemberCategory = 'founders' | 'board' | 'executive' | 'zonal' | 'general';

interface Member {
  id: number;
  name: string;
  designation?: string;
  hostelName: string;
  phone: string;
  photo?: string;
  category: MemberCategory;
  zone?: string;
  email?: string;
}

const initialMembers: Member[] = [];

const categoryLabels: Record<MemberCategory, string> = {
  founders: 'Visionary Founders',
  board: 'Executive Board',
  executive: 'Strategic Committee',
  zonal: 'Zonal Operations',
  general: 'Associated Members',
};

const categoryOrder: MemberCategory[] = ['founders', 'board', 'executive', 'zonal', 'general'];

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MemberCategory | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<MemberCategory>>(new Set(categoryOrder));

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost/hostel-connect/backend/api/members.php');
        const data = await response.json();

        const transformedData: Member[] = data.map((item: any) => ({
          id: parseInt(item.id),
          name: item.name,
          designation: item.role,
          hostelName: item.hostel_name || 'Associated Hostel',
          phone: item.phone,
          photo: item.photo,
          category: (item.category as MemberCategory) || 'general',
          email: item.email
        }));
        setMembers(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.hostelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || member.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: MemberCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getMembersByCategory = (category: MemberCategory) =>
    filteredMembers.filter(m => m.category === category);

  return (
    <Layout>
      {/* Premium Hero */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 mb-8 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
            Our Network
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            Our <span className="text-white/80">Members</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            A group of over 300 hostel owners working together for a better future.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search by name, hostel, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 h-16 bg-secondary/50 border-transparent focus:bg-white focus:ring-primary/20 rounded-3xl transition-all font-medium text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Member Sections */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          {categoryOrder.map((category, catIndex) => {
            const members = getMembersByCategory(category);
            if (members.length === 0) return null;

            const isExpanded = expandedCategories.has(category);
            const isGeneral = category === 'general';

            return (
              <div key={category} className="mb-24 last:mb-0 animate-fade-up" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                {/* Visual Category Header */}
                <div
                  className="group flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b-2 border-primary/10 cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shadow-xl shadow-primary/20 text-white relative group-hover:scale-110 transition-all duration-500">
                      {isGeneral ? <Users className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-white flex items-center justify-center text-primary text-[10px] font-black shadow-lg">
                        {members.length}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mb-1">{categoryLabels[category]}</h2>
                      <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                        <div className="w-8 h-[2px] bg-primary" />
                        <span>Main Team Members</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-0 flex items-center gap-4 text-muted-foreground font-black text-[10px] uppercase tracking-widest">
                    <span>{isExpanded ? 'Collapse Directory' : 'Expand Directory'}</span>
                    <div className={`w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-all duration-500 ${isExpanded ? 'rotate-180 bg-primary text-white' : ''}`}>
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Directory Feed */}
                {isExpanded && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {members.map((member, mIndex) => (
                      <div
                        key={member.id}
                        className="group bg-secondary/30 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                      >
                        {/* Compact Modern Image */}
                        <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
                          {member.photo ? (
                            <img
                              src={`http://localhost/hostel-connect/backend/${member.photo}`}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5 text-primary">
                              <User className="w-10 h-10 opacity-20" />
                              <span className="text-xl font-black mt-1">{member.name[0]}</span>
                            </div>
                          )}
                        </div>

                        {/* Compact Card Content */}
                        <div className="p-5">
                          {/* Name */}
                          <h3 className="text-base font-black text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                            {member.name}
                          </h3>

                          {/* Details */}
                          {!isGeneral ? (
                            <>
                              {member.designation && (
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">
                                  {member.designation}
                                </p>
                              )}
                              <p className="text-[9px] text-muted-foreground font-bold mb-3 flex items-center gap-1 opacity-70">
                                <Building className="w-2.5 h-2.5" />
                                {member.hostelName}
                              </p>
                              <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                  <Phone className="w-3.5 h-3.5" />
                                </div>
                                <span>{member.phone}</span>
                              </a>
                            </>
                          ) : (
                            <>
                              <p className="text-[9px] text-muted-foreground font-bold mb-3 flex items-center gap-1 opacity-70">
                                <Building className="w-3 h-3 text-primary/40" />
                                {member.hostelName}
                              </p>
                              <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                  <Phone className="w-4 h-4" />
                                </div>
                                <span>{member.phone}</span>
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Members;
