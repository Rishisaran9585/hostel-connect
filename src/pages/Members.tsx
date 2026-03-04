import { useState } from 'react';
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

const membersData: Member[] = [
  // Founders
  {
    id: 1,
    name: 'Mr. Rajesh Kumar',
    designation: 'Founder & President',
    hostelName: 'Sri Lakshmi Mens Hostel',
    phone: '9047747633',
    category: 'founders',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop',
    email: 'rajesh.kumar@hostelconnect.com'
  },
  {
    id: 2,
    name: 'Mr. Suresh Babu',
    designation: 'Founder & Vice President',
    hostelName: 'Kavitha Womens Hostel',
    phone: '9876543210',
    category: 'founders',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop',
    email: 'suresh.babu@hostelconnect.com'
  },
  {
    id: 3,
    name: 'Mr. Venkatesh R',
    designation: 'Founder & Secretary',
    hostelName: 'Coimbatore Premier Hostel',
    phone: '9876543211',
    category: 'founders',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop',
    email: 'venkatesh.r@hostelconnect.com'
  },

  // Board Members
  {
    id: 4,
    name: 'Mrs. Lakshmi Devi',
    designation: 'Treasurer',
    hostelName: 'Devi Womens Hostel',
    phone: '9876543212',
    category: 'board',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Mr. Anand Kumar',
    designation: 'Joint Secretary',
    hostelName: 'Anand Mens Hostel',
    phone: '9876543213',
    category: 'board',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Mr. Prakash S',
    designation: 'Board Member',
    hostelName: 'Prakash Student Home',
    phone: '9876543214',
    category: 'board',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'Mrs. Meena R',
    designation: 'Board Member',
    hostelName: 'Meena Ladies Hostel',
    phone: '9876543215',
    category: 'board',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&auto=format&fit=crop'
  },

  // Executive Committee
  { id: 8, name: 'Mr. Ganesh K', designation: 'Executive Member', hostelName: 'Ganesh Boys Hostel', phone: '9876543216', category: 'executive', photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 9, name: 'Mr. Kumar S', designation: 'Executive Member', hostelName: 'Kumar Student Hostel', phone: '9876543217', category: 'executive', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 10, name: 'Mrs. Priya V', designation: 'Executive Member', hostelName: 'Priya Womens Home', phone: '9876543218', category: 'executive', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 11, name: 'Mr. Mohan R', designation: 'Executive Member', hostelName: 'Mohan PG Hostel', phone: '9876543219', category: 'executive', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop' },

  // Zonal Heads
  { id: 12, name: 'Mr. Selvam K', designation: 'Zonal Head', hostelName: 'Selvam Mens Hostel', phone: '9876543220', category: 'zonal', zone: 'Coimbatore', photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 13, name: 'Mr. Ravi Kumar', designation: 'Zonal Head', hostelName: 'Ravi Student Hostel', phone: '9876543221', category: 'zonal', zone: 'Salem', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 14, name: 'Mrs. Geetha S', designation: 'Zonal Head', hostelName: 'Geetha Ladies Hostel', phone: '9876543222', category: 'zonal', zone: 'Trichy', photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 15, name: 'Mr. Bala K', designation: 'Zonal Head', hostelName: 'Bala Hostel', phone: '9876543223', category: 'zonal', zone: 'Erode', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop' },
  { id: 16, name: 'Mr. Senthil R', designation: 'Zonal Head', hostelName: 'Senthil PG Home', phone: '9876543224', category: 'zonal', zone: 'Tiruppur', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop' },

  // General Members
  { id: 17, name: 'Mr. Arun Kumar', hostelName: 'Arun Boys Hostel', phone: '9876543225', category: 'general' },
  { id: 18, name: 'Mrs. Sundari M', hostelName: 'Sundari Womens Hostel', phone: '9876543226', category: 'general' },
  { id: 19, name: 'Mr. Karthik S', hostelName: 'Karthik Student Home', phone: '9876543227', category: 'general' },
  { id: 20, name: 'Mr. Vijay R', hostelName: 'Vijay Mens PG', phone: '9876543228', category: 'general' },
  { id: 21, name: 'Mrs. Revathi K', hostelName: 'Revathi Ladies Home', phone: '9876543229', category: 'general' },
  { id: 22, name: 'Mr. Dinesh P', hostelName: 'Dinesh Hostel', phone: '9876543230', category: 'general' },
  { id: 23, name: 'Mr. Murali K', hostelName: 'Murali Student Hostel', phone: '9876543231', category: 'general' },
  { id: 24, name: 'Mrs. Kavitha R', hostelName: 'Kavitha PG Home', phone: '9876543232', category: 'general' },
];

const categoryLabels: Record<MemberCategory, string> = {
  founders: 'Visionary Founders',
  board: 'Executive Board',
  executive: 'Strategic Committee',
  zonal: 'Zonal Operations',
  general: 'Associated Members',
};

const categoryOrder: MemberCategory[] = ['founders', 'board', 'executive', 'zonal', 'general'];

const Members = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MemberCategory | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<MemberCategory>>(new Set(categoryOrder));

  const filteredMembers = membersData.filter(member => {
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
            Professional Network
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
            Our Council of <span className="text-white/80">Proprietors</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            The collective strength of 300+ visionary owners driving the future of the Tamil Nadu hostel industry.
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
                    <div className="w-20 h-20 rounded-[2rem] hero-gradient flex items-center justify-center shadow-2xl shadow-primary/20 text-white relative group-hover:scale-110 transition-all duration-500">
                      {isGeneral ? <Users className="w-9 h-9" /> : <ShieldCheck className="w-9 h-9" />}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary text-xs font-black shadow-lg">
                        {members.length}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2">{categoryLabels[category]}</h2>
                      <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                        <div className="w-8 h-[2px] bg-primary" />
                        <span>Official Committee Members</span>
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
                        {/* Profile Image - Reduced Size */}
                        <div className="aspect-square overflow-hidden bg-secondary/50">
                          <img
                            src={member.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          {/* Name */}
                          <h3 className="text-lg font-black text-foreground leading-tight mb-2">
                            {member.name}
                          </h3>

                          {/* Conditional Content Based on Member Type */}
                          {!isGeneral ? (
                            // Executive Members: Show designation, hostel name, and contact
                            <>
                              {member.designation && (
                                <p className="text-sm text-primary font-bold mb-2">
                                  {member.designation}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground font-medium mb-3 line-clamp-1">
                                {member.hostelName}
                              </p>
                              <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{member.phone}</span>
                              </a>
                            </>
                          ) : (
                            // Regular Members: Show only hostel name and contact
                            <>
                              <p className="text-sm text-muted-foreground font-medium mb-3 line-clamp-2">
                                {member.hostelName}
                              </p>
                              <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
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
