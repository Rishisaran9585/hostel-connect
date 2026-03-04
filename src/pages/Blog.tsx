import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, User, ArrowRight, Clock, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';
import { API_BASE_URL, BACKEND_URL } from '@/config';

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

const initialBlogPosts: BlogPost[] = [];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blog.php`);
        const data = await response.json();
        const transformedData: BlogPost[] = data.map((item: any) => ({
          id: parseInt(item.id),
          title: item.title,
          excerpt: item.content.substring(0, 100) + '...',
          date: item.created_at,
          author: item.author,
          readTime: '5 min read',
          image: item.image_url ? `${BACKEND_URL}/${item.image_url}` : '',
          category: 'General',
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
      <div className="container mx-auto px-4 py-12">



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-card rounded-xl border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-none text-[9px] uppercase tracking-widest px-2.5 py-1">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3 mr-1.5 opacity-60" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-border/30 mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-black text-primary text-[10px]">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-1">Author</p>
                      <p className="text-xs font-bold text-foreground leading-none">{post.author}</p>
                    </div>
                  </div>

                  <Link to={`/blog/${post.id}`}>
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CTASection />


    </Layout>
  );
};

export default Blog;
