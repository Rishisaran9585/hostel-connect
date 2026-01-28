import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Trash2 } from 'lucide-react';

interface Blog {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

const BlogManager = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            const response = await fetch('http://localhost/hostel-connect/backend/api/blog.php');
            const data = await response.json();
            setBlogs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`http://localhost/hostel-connect/backend/api/blog.php?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchBlogs();
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/blog.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchBlogs();
                setIsModalOpen(false);
                setFormData({ title: '', content: '', author: '' });
            }
        } catch (error) {
            console.error('Error posting blog:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Blog Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                    >
                        <Plus className="mr-2 h-5 w-5" /> New Post
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : blogs.length === 0 ? (
                        <p className="text-gray-400">No blog posts found</p>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{blog.title}</h3>
                                <p className="text-gray-400 mb-4 line-clamp-3 flex-1">{blog.content}</p>
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                                    <span className="text-sm text-gray-500">By {blog.author}</span>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-900/20"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl border border-gray-700 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-white mb-4">Create New Blog Post</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Author</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Content</label>
                                    <textarea
                                        required
                                        rows={8}
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-amber-600 rounded-md text-white hover:bg-amber-700"
                                    >
                                        Publish Post
                                    </button>
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
