import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Phone, Building, User, ShieldCheck, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';
import { API_BASE_URL, BACKEND_URL } from '@/config';

type MemberCategory = 'founders' | 'board' | 'executive' | 'general';

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

const categoryLabels: Record<MemberCategory, string> = {
  founders: 'Founders',
  board: 'Board Members',
  executive: 'Executive Committee',
  general: 'Associated Members',
};

const categoryOrder: MemberCategory[] = ['founders', 'board', 'executive', 'general'];

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MemberCategory | 'all'>('all');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/members.php`);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-12 pb-20">
        {/* Simplified Category Section */}
        <div className="flex flex-wrap gap-2 justify-center mb-16 px-4">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full font-black px-5 h-9 text-[10px] uppercase tracking-wider transition-all ${selectedCategory === 'all' ? 'shadow-lg shadow-primary/20 scale-105' : 'text-muted-foreground'}`}
          >
            All Members
          </Button>
          {categoryOrder.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full font-black px-5 h-9 text-[10px] uppercase tracking-wider transition-all ${selectedCategory === cat ? 'shadow-lg shadow-primary/20 scale-105' : 'text-muted-foreground'}`}
            >
              {categoryLabels[cat]}
            </Button>
          ))}
        </div>

        {/* Members Grouped by Category */}
        <div className="space-y-20">
          {categoryOrder.map(cat => {
            const categoryMembers = filteredMembers.filter(m => m.category === cat);
            if (categoryMembers.length === 0) return null;

            return (
              <section key={cat} className="animate-fade-in">
                <div className="flex items-center gap-6 mb-12">
                  <h2 className="text-lg md:text-xl font-black text-foreground uppercase tracking-[0.2em] whitespace-nowrap">
                    {categoryLabels[cat]}
                  </h2>
                  <div className="h-px w-full bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {categoryMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="group flex flex-col bg-card rounded-2xl border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Compact Photo */}
                      <div className="aspect-[4/5] overflow-hidden bg-primary/5 relative">
                        {member.photo ? (
                          <img
                            src={`${BACKEND_URL}/${member.photo}`}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-primary/30">
                            <User className="w-12 h-12 opacity-20" />
                            <span className="text-xl font-black mt-2 uppercase">{member.name[0]}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Compact Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <h3 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors flex-1">
                            {member.name}
                          </h3>
                          {member.designation && (
                            <span className="text-[8px] text-primary font-black uppercase tracking-widest bg-primary/5 px-2 py-1 rounded whitespace-nowrap">
                              {member.designation}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/30 space-y-3">
                          <div className="flex items-center gap-2.5 text-sm text-foreground font-bold tracking-tight">
                            <Building className="w-3.5 h-3.5 flex-shrink-0 text-primary/40" />
                            <span className="truncate">{member.hostelName}</span>
                          </div>
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-colors group/phone"
                          >
                            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover/phone:bg-primary group-hover/phone:text-white transition-all shadow-sm">
                              <Phone className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-black tracking-widest">{member.phone}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {filteredMembers.length === 0 && !loading && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-black text-foreground uppercase tracking-widest">No members found</h3>
            <p className="text-muted-foreground text-sm mt-2">Try selecting a different category or searching.</p>
          </div>
        )}
      </div>

      <CTASection />
    </Layout>
  );
};

export default Members;
