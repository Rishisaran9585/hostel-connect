import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Phone, Building, ChevronDown, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
}

const membersData: Member[] = [
  // Founders
  { id: 1, name: 'Mr. Rajesh Kumar', designation: 'Founder & President', hostelName: 'Sri Lakshmi Mens Hostel', phone: '9047747633', category: 'founders' },
  { id: 2, name: 'Mr. Suresh Babu', designation: 'Founder & Vice President', hostelName: 'Kavitha Womens Hostel', phone: '9876543210', category: 'founders' },
  { id: 3, name: 'Mr. Venkatesh R', designation: 'Founder & Secretary', hostelName: 'Coimbatore Premier Hostel', phone: '9876543211', category: 'founders' },
  
  // Board Members
  { id: 4, name: 'Mrs. Lakshmi Devi', designation: 'Treasurer', hostelName: 'Devi Womens Hostel', phone: '9876543212', category: 'board' },
  { id: 5, name: 'Mr. Anand Kumar', designation: 'Joint Secretary', hostelName: 'Anand Mens Hostel', phone: '9876543213', category: 'board' },
  { id: 6, name: 'Mr. Prakash S', designation: 'Board Member', hostelName: 'Prakash Student Home', phone: '9876543214', category: 'board' },
  { id: 7, name: 'Mrs. Meena R', designation: 'Board Member', hostelName: 'Meena Ladies Hostel', phone: '9876543215', category: 'board' },
  
  // Executive Committee
  { id: 8, name: 'Mr. Ganesh K', designation: 'Executive Member', hostelName: 'Ganesh Boys Hostel', phone: '9876543216', category: 'executive' },
  { id: 9, name: 'Mr. Kumar S', designation: 'Executive Member', hostelName: 'Kumar Student Hostel', phone: '9876543217', category: 'executive' },
  { id: 10, name: 'Mrs. Priya V', designation: 'Executive Member', hostelName: 'Priya Womens Home', phone: '9876543218', category: 'executive' },
  { id: 11, name: 'Mr. Mohan R', designation: 'Executive Member', hostelName: 'Mohan PG Hostel', phone: '9876543219', category: 'executive' },
  
  // Zonal Heads
  { id: 12, name: 'Mr. Selvam K', designation: 'Zonal Head - Coimbatore', hostelName: 'Selvam Mens Hostel', phone: '9876543220', category: 'zonal', zone: 'Coimbatore' },
  { id: 13, name: 'Mr. Ravi Kumar', designation: 'Zonal Head - Salem', hostelName: 'Ravi Student Hostel', phone: '9876543221', category: 'zonal', zone: 'Salem' },
  { id: 14, name: 'Mrs. Geetha S', designation: 'Zonal Head - Trichy', hostelName: 'Geetha Ladies Hostel', phone: '9876543222', category: 'zonal', zone: 'Trichy' },
  { id: 15, name: 'Mr. Bala K', designation: 'Zonal Head - Erode', hostelName: 'Bala Hostel', phone: '9876543223', category: 'zonal', zone: 'Erode' },
  { id: 16, name: 'Mr. Senthil R', designation: 'Zonal Head - Tiruppur', hostelName: 'Senthil PG Home', phone: '9876543224', category: 'zonal', zone: 'Tiruppur' },
  
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
  founders: 'Founders',
  board: 'Board Members',
  executive: 'Executive Committee',
  zonal: 'Zonal Heads',
  general: 'General Members',
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
              Our Members
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Meet Our Association Members
            </h1>
            <p className="text-xl text-primary-foreground/90">
              300+ dedicated hostel owners united for a stronger industry across Tamil Nadu.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or hostel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {categoryOrder.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {categoryLabels[cat]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Members List */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          {categoryOrder.map(category => {
            const members = getMembersByCategory(category);
            if (members.length === 0) return null;

            const isExpanded = expandedCategories.has(category);

            return (
              <div key={category} className="mb-8 last:mb-0">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-card mb-4 hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <h2 className="font-semibold text-foreground">{categoryLabels[category]}</h2>
                      <p className="text-sm text-muted-foreground">{members.length} members</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Members Grid */}
                {isExpanded && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {members.map(member => (
                      <div 
                        key={member.id}
                        className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-7 h-7 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                            {member.designation && (
                              <p className="text-primary text-sm font-medium truncate">{member.designation}</p>
                            )}
                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                              <Building className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{member.hostelName}</span>
                            </div>
                            <a 
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1 hover:text-primary transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{member.phone}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No members found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Members;
