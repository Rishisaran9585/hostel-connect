import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Calendar, ArrowLeft, Clock, Share2, Tag, Copy, Send, MessageCircle, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL, BACKEND_URL } from '@/config';
import CTASection from '@/components/home/CTASection';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    readTime: string;
    image: string;
    category: string;
}

const initialBlogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'New Fire Safety Rules for Hostels in Tamil Nadu',
        content: 'A simple guide to the newest fire safety rules for 2024. Learn what you need to do to stay safe. All hostels must now install smoke detectors and have a clear fire exit plan. Regular drills are mandatory.',
        date: '2024-01-25',
        author: 'CHOA Executive Committee',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
        category: 'Regulatory Policy',
    },
    {
        id: 2,
        title: 'How We Helped the State Get GST Tax Relief',
        content: 'The story of how we worked together to save hostel owners money on GST taxes. After months of deliberation with state officials, we achieved a significant reduction in applicable tax rates for non-AC hostel rooms.',
        date: '2024-01-20',
        author: 'Legal Advocacy Wing',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
        category: 'Milestone Events',
    },
    {
        id: 3,
        title: 'Modern Hostel Management: Digitizing Guest Operations',
        content: 'Learn the industry-standard software practices for running a contactless and highly efficient hostel facility. From mobile check-ins to digital payment collection, technology is changing the game.',
        date: '2024-01-15',
        author: 'Operations Oversight',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        category: 'Operational Excellence',
    },
];

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/blog.php`);
                const data = await response.json();
                const foundItem = data.find((item: any) => item.id.toString() === id);

                if (foundItem) {
                    setPost({
                        id: parseInt(foundItem.id),
                        title: foundItem.title,
                        content: foundItem.content,
                        date: foundItem.created_at,
                        author: foundItem.author,
                        readTime: '5 min read',
                        image: foundItem.image_url ? `${BACKEND_URL}/${foundItem.image_url}` : '',
                        category: 'General',
                    });
                } else {
                    const localPost = initialBlogPosts.find(p => p.id.toString() === id);
                    if (localPost) {
                        setPost(localPost);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                const localPost = initialBlogPosts.find(p => p.id.toString() === id);
                if (localPost) {
                    setPost(localPost);
                }
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const shareUrl = window.location.href;
    const shareTitle = post?.title || 'Check out this post from CHOA';

    const handleShare = (platform: string) => {
        let url = '';
        switch (platform) {
            case 'whatsapp':
                url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                toast.success('Link copied to clipboard!');
                return;
        }
        if (url) window.open(url, '_blank', 'width=600,height=400');
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-pulse text-xl font-bold text-muted-foreground italic">
                        Gathering story details...
                    </div>
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-black mb-4">Post Not Found</h2>
                    <Button onClick={() => navigate('/blog')}>Return to Blog</Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/blog')}
                        className="mb-8 group hover:bg-primary/5 -ml-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Button>

                    <div className="max-w-4xl mx-auto">
                        <Badge variant="secondary" className="bg-primary/5 text-primary border-none mb-6 px-3 py-1 uppercase tracking-widest text-[10px] font-black">
                            {post.category}
                        </Badge>

                        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-border/40">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-1.5">Written by</p>
                                    <p className="text-sm font-bold text-foreground">{post.author}</p>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-border hidden md:block" />

                            <div className="flex items-center gap-6">
                                <div className="flex items-center text-sm font-medium text-muted-foreground">
                                    <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                    {new Date(post.date).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                                <div className="flex items-center text-sm font-medium text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-2 opacity-70" />
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {post.image && (
                    <div className="w-full max-w-6xl mx-auto px-4 mb-16">
                        <div className="aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <div className="container mx-auto px-4 pb-24">
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {post.content.split('\n').map((paragraph, idx) => (
                                paragraph.trim() && (
                                    <p key={idx} className="mb-6 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                                        {paragraph.trim()}
                                    </p>
                                )
                            ))}
                        </div>

                        <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Topics:</span>
                                <Badge variant="outline" className="text-[10px] font-bold">Regulatory</Badge>
                                <Badge variant="outline" className="text-[10px] font-bold">Management</Badge>
                            </div>

                            <div className="flex items-center gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 gap-2 border-border/50 text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 shadow-xl border-border/50">
                                        <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="rounded-lg gap-3 py-2.5 cursor-pointer">
                                            <MessageCircle className="w-4 h-4 text-green-500" />
                                            <span className="font-semibold text-xs">WhatsApp</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShare('facebook')} className="rounded-lg gap-3 py-2.5 cursor-pointer">
                                            <Facebook className="w-4 h-4 text-blue-600" />
                                            <span className="font-semibold text-xs">Facebook</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShare('telegram')} className="rounded-lg gap-3 py-2.5 cursor-pointer">
                                            <Send className="w-4 h-4 text-blue-400" />
                                            <span className="font-semibold text-xs">Telegram</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShare('twitter')} className="rounded-lg gap-3 py-2.5 cursor-pointer">
                                            <Twitter className="w-4 h-4 text-sky-500" />
                                            <span className="font-semibold text-xs">X (Twitter)</span>
                                        </DropdownMenuItem>
                                        <div className="h-px bg-border/50 my-1" />
                                        <DropdownMenuItem onClick={() => handleShare('copy')} className="rounded-lg gap-3 py-2.5 cursor-pointer">
                                            <Copy className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-semibold text-xs">Copy Link</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <CTASection />
        </Layout>
    );
};

export default BlogDetail;
