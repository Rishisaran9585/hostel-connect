import Layout from '@/components/layout/Layout';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding New Fire Safety Regulations for Hostels',
    excerpt: 'A comprehensive guide to the latest fire safety requirements that every hostel owner must comply with in 2024.',
    date: '2024-01-25',
    author: 'CHOA Admin',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    category: 'Regulations',
  },
  {
    id: 2,
    title: 'How CHOA Helped Achieve GST Exemption',
    excerpt: 'The story of our successful advocacy that led to GST exemption for hostel services across Tamil Nadu.',
    date: '2024-01-20',
    author: 'CHOA Admin',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    category: 'Achievements',
  },
  {
    id: 3,
    title: 'Best Practices for Hostel Management',
    excerpt: 'Learn the industry best practices for running a successful and compliant hostel business.',
    date: '2024-01-15',
    author: 'CHOA Admin',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    category: 'Guide',
  },
  {
    id: 4,
    title: 'Property Tax: What Hostel Owners Need to Know',
    excerpt: 'Understanding property tax classifications and how to ensure your hostel is taxed correctly.',
    date: '2024-01-10',
    author: 'CHOA Admin',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    category: 'Taxation',
  },
  {
    id: 5,
    title: 'Starting a Hostel Business: Complete Guide',
    excerpt: 'Everything you need to know about starting a hostel business in Tamil Nadu, from licensing to operations.',
    date: '2024-01-05',
    author: 'CHOA Admin',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    category: 'Guide',
  },
  {
    id: 6,
    title: 'CHOA Annual Meet 2023 Highlights',
    excerpt: 'A recap of the key discussions, decisions, and celebrations from our annual gathering.',
    date: '2024-01-01',
    author: 'CHOA Admin',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: 'News',
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

const Blog = () => {
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
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              News & Insights
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Stay informed about the hostel industry, regulations, and association activities.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <div className="mb-12">
            <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 w-fit">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(blogPosts[0].date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <Button className="w-fit group">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map(post => (
              <article 
                key={post.id}
                className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
