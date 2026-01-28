import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Trash2 } from 'lucide-react';

interface Notice {
    id: number;
    title: string;
    content: string;
    type: string;
    created_at: string;
}

const NoticeManager = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'general'
    });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/notice.php');
            const data = await response.json();
            setNotices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notices:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this notice?')) {
            try {
                const response = await fetch(`http://localhost/hostel-connect/backend/api/notice.php?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchNotices();
                }
            } catch (error) {
                console.error('Error deleting notice:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/notice.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchNotices();
                setIsModalOpen(false);
                setFormData({ title: '', content: '', type: 'general' });
            }
        } catch (error) {
            console.error('Error creating notice:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Notice Board</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Create Notice
                    </button>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : notices.length === 0 ? (
                        <p className="text-gray-400">No active notices</p>
                    ) : (
                        notices.map((notice) => (
                            <div key={notice.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${notice.type === 'important' ? 'bg-red-900 text-red-200' :
                                                notice.type === 'event' ? 'bg-green-900 text-green-200' :
                                                    'bg-blue-900 text-blue-200'
                                            }`}>
                                            {notice.type}
                                        </span>
                                        <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                                    </div>
                                    <p className="text-gray-400">{notice.content}</p>
                                    <p className="text-xs text-gray-500 mt-2">Posted on: {new Date(notice.created_at).toLocaleDateString()}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(notice.id)}
                                    className="text-gray-500 hover:text-red-400 p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-white mb-4">Create Notice</h2>
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
                                    <label className="block text-sm font-medium text-gray-400">Type</label>
                                    <select
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="general">General</option>
                                        <option value="important">Important</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Content</label>
                                    <textarea
                                        required
                                        rows={4}
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
                                        Post Notice
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

export default NoticeManager;
