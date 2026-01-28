import Layout from '@/components/layout/Layout';
import { Calendar, User, ArrowRight, Clock, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category: string;
  tags?: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Tamil Nadu: New Fire Safety Regulations for Hostels',
    excerpt: 'A comprehensive guide to the latest fire safety requirements and compliance standards mandated by the TN government for accommodation providers in 2024.',
    date: '2024-01-25',
    author: 'CHOA Executive Committee',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    category: 'Regulatory Policy',
    tags: ['Complince', 'Safety', 'Legal']
  },
  {
    id: 2,
    title: 'How CHOA Advocacy Achieved Statewide GST Exemption',
    excerpt: 'An inside look at the 24-month lobbying efforts that successfully secured tax relief for thousands of hostel entrepreneurs.',
    date: '2024-01-20',
    author: 'Legal Advocacy Wing',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    category: 'Milestone Events',
  },
  {
    id: 3,
    title: 'Modern Hostel Management: Digitizing Guest Operations',
    excerpt: 'Learn the industry-standard software practices for running a contactless and highly efficient hostel facility.',
    date: '2024-01-15',
    author: 'Operations Oversight',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    category: 'Operational Excellence',
  },
  {
    id: 4,
    title: 'Residential Status & Property Tax: A Definitive Guide',
    excerpt: 'Detailed breakdown of the property tax classifications for hostels and how to verify your facility is correctly categorized.',
    date: '2024-01-10',
    author: 'Financial Consultants',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    category: 'Financial Insights',
  },
  {
    id: 5,
    title: 'Business Startup Roadmap: Licensing to Launch',
    excerpt: 'The complete step-by-step masterclass for new entrepreneurs entering the TN hostel sector in 2024.',
    date: '2024-01-05',
    author: 'Member Support Team',
    readTime: '20 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    category: 'Entrepreneurship',
  },
  {
    id: 6,
    title: 'CHOA Zonal Meet 2023: Highlights & Strategic Roadmaps',
    excerpt: 'Key takeaways from our annual gathering where the 2024 legislative agenda was formally established.',
    date: '2024-01-01',
    author: 'Communications Desk',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: 'Official News',
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

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost/hostel-connect/backend/api/blog.php');
        const data = await response.json();
        const transformedData: BlogPost[] = data.map((item: any) => ({
          id: parseInt(item.id),
          title: item.title,
          excerpt: item.content.substring(0, 100) + '...', // Create excerpt from content
          date: item.created_at,
          author: item.author,
          readTime: '5 min read', // Placeholder
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', // Placeholder
          category: 'General', // Placeholder
        }));
        setBlogPosts(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
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
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 mb-8 backdrop-blur-md uppercase tracking-widest text-[10px] font-black">
            Association Editorial
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
            Insights for the <span className="text-white/80">Visionary Owner</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Official releases, compliance updates, and expert strategy for Tamil Nadu's hostel industry.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">

          {/* Featured Editorial Post */}
          <div className="mb-16 animate-fade-up">
            <div className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border/50 shadow-xl hover:shadow-primary/5 transition-all duration-700">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="absolute top-8 right-8 flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-white transition-colors w-10 h-10">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-white transition-colors w-10 h-10">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-3 py-1 w-fit rounded-lg font-black uppercase tracking-widest text-[9px]">
                    Featured Editorial
                  </Badge>

                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground text-base font-medium mb-8 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-black text-primary text-sm">C</div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Words by</p>
                        <p className="text-xs font-bold text-foreground">{blogPosts[0].author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-xl">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold">{formatDate(blogPosts[0].date)}</span>
                      <div className="w-1 h-1 rounded-full bg-border mx-1" />
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold">{blogPosts[0].readTime}</span>
                    </div>
                  </div>

                  <Button size="lg" className="h-14 px-8 rounded-2xl w-fit font-black text-sm group/btn shadow-lg shadow-primary/20">
                    Read Complete Feature
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Posts Grid - Modern Masonry Simulation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="group flex flex-col bg-card rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-700 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-white/90 backdrop-blur-md text-foreground border-none font-black text-[8px] uppercase tracking-widest px-2 py-1">{post.category}</Badge>
                  </div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex flex-col flex-1 pb-8">
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    <span className="flex items-center gap-1 text-primary">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors flex-grow">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm font-medium mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-border/30 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center font-black text-primary text-[9px]">C</div>
                      <span className="text-[10px] font-bold text-foreground">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" className="font-black text-[9px] uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 rounded-lg px-3 group/i h-8">
                        Explore
                        <ArrowRight className="w-3 h-3 ml-1 group-hover/i:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Premium Pagination Mockup */}
          <div className="mt-24 flex items-center justify-center gap-4">
            <Button disabled variant="outline" className="rounded-2xl h-14 w-14 border-border/50 text-muted-foreground">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <Button key={i} variant={i === 1 ? 'default' : 'ghost'} className={`w-14 h-14 rounded-2xl font-black ${i === 1 ? 'shadow-xl shadow-primary/20' : 'text-muted-foreground'}`}>
                  {i}
                </Button>
              ))}
            </div>
            <Button variant="outline" className="rounded-2xl h-14 w-14 border-border/50 text-primary">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default Blog;
