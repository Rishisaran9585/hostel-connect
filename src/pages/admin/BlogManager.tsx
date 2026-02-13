import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Trash2, Search, Calendar, FileText, X, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { API_BASE_URL, BACKEND_URL } from '@/config';
import { toast } from 'sonner';

interface Blog {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
    image_url?: string;
}

const BlogManager = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/blog.php`);
            const data = await response.json();
            setBlogs(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/blog.php?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    toast.success('Blog post deleted');
                    fetchBlogs();
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                toast.error('Failed to delete blog post');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('author', formData.author);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/blog.php`, {
                method: 'POST',
                body: data,
            });
            if (response.ok) {
                toast.success('Blog post published successfully');
                fetchBlogs();
                setIsModalOpen(false);
                setFormData({ title: '', content: '', author: '' });
                setImageFile(null);
                setImagePreview(null);
            } else {
                toast.error('Failed to publish blog post');
            }
        } catch (error) {
            console.error('Error posting blog:', error);
            toast.error('An error occurred');
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Blog Posts</h1>
                        <p className="text-slate-500 text-sm">Write and manage updates for the hostel community.</p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold px-6 h-11 flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
                    >
                        <FileText size={18} />
                        Add New Post
                    </Button>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title or author..."
                            className="pl-11 h-11 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse shadow-sm" />
                        ))
                    ) : filteredBlogs.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-400 text-sm italic">No blog posts found.</p>
                        </div>
                    ) : (
                        filteredBlogs.map((blog) => (
                            <div key={blog.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:border-primary/20 transition-all shadow-sm group">
                                {blog.image_url && (
                                    <div className="h-40 overflow-hidden border-b border-slate-100">
                                        <img
                                            src={`${BACKEND_URL}/${blog.image_url}`}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1 font-medium">
                                        {blog.content}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700">{blog.author}</span>
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                                                <Calendar size={10} />
                                                {formatDate(blog.created_at)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />

                        <div className="relative bg-white rounded-3xl p-8 w-full max-w-2xl border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                            >
                                <X size={18} />
                            </button>

                            <h2 className="text-xl font-bold text-slate-900 mb-6">New Blog Post</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Post Title</label>
                                        <Input
                                            required
                                            placeholder="Enter title"
                                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</label>
                                        <Input
                                            required
                                            placeholder="Your name"
                                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                            value={formData.author}
                                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Featured Image</label>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all overflow-hidden relative">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-3 text-slate-400" />
                                                    <p className="mb-2 text-sm text-slate-500 font-bold">Click to upload photo</p>
                                                    <p className="text-xs text-slate-400 font-medium">SVG, PNG, JPG or WebP</p>
                                                </div>
                                            )}
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                className="mt-2 text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-wider"
                                            >
                                                Remove Image
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Content</label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="Write your post content here..."
                                        className="w-full bg-slate-50 border border-slate-200 focus:border-primary/20 focus:bg-white rounded-2xl text-slate-700 p-4 text-sm focus:outline-none transition-all resize-none font-medium"
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 h-12 rounded-xl text-slate-600 border-slate-200 font-bold uppercase tracking-wider text-[11px]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 h-12 rounded-xl bg-primary text-white font-bold uppercase tracking-wider text-[11px] shadow-lg shadow-primary/20"
                                    >
                                        Publish Post
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default BlogManager;
