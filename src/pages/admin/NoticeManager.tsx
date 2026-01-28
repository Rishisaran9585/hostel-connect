import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Trash2, Bell, AlertTriangle, Info, Calendar, Search, Megaphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
    const [searchQuery, setSearchQuery] = useState('');
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
            setNotices(Array.isArray(data) ? data : []);
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

    const filteredNotices = notices.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getNoticeTypeStyles = (type: string) => {
        switch (type.toLowerCase()) {
            case 'important':
                return {
                    badge: 'bg-rose-500/10 text-rose-500 border-rose-500/10',
                    icon: <AlertTriangle size={12} className="mr-1.5" />,
                    card: 'border-rose-200 bg-rose-50/30'
                };
            case 'event':
                return {
                    badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10',
                    icon: <Megaphone size={12} className="mr-1.5" />,
                    card: 'border-emerald-200 bg-emerald-50/30'
                };
            default:
                return {
                    badge: 'bg-blue-500/10 text-blue-500 border-blue-500/10',
                    icon: <Info size={12} className="mr-1.5" />,
                    card: 'border-slate-200 bg-white'
                };
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notices</h1>
                        <p className="text-slate-500 text-sm">Post important announcements for the hostel members.</p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold px-6 h-11 flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
                    >
                        <Bell size={18} />
                        Add New Notice
                    </Button>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search notices..."
                            className="pl-11 h-11 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl text-sm transition-all"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {loading ? (
                        [1, 2].map(i => (
                            <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse" />
                        ))
                    ) : filteredNotices.length === 0 ? (
                        <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-400 text-sm italic">No notices found.</p>
                        </div>
                    ) : (
                        filteredNotices.map((notice) => {
                            const styles = getNoticeTypeStyles(notice.type);
                            return (
                                <div key={notice.id} className={`p-6 rounded-2xl border transition-all hover:shadow-md ${styles.card} group relative overflow-hidden`}>
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <Badge variant="outline" className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${styles.badge}`}>
                                                {styles.icon}
                                                {notice.type}
                                            </Badge>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Calendar size={12} />
                                                {new Date(notice.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(notice.id)}
                                            className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">{notice.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed max-w-4xl font-medium relative z-10">{notice.content}</p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />

                        <div className="relative bg-white rounded-3xl p-8 w-full max-w-xl border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>

                            <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Notice</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notice Title</label>
                                    <Input
                                        required
                                        placeholder="Enter title"
                                        className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</label>
                                    <select
                                        className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-primary/20 focus:bg-white rounded-xl text-slate-700 px-4 text-sm focus:outline-none cursor-pointer font-medium"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="general">General</option>
                                        <option value="important">Important</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notice Content</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Write notice details..."
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
                                        Post Notice
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

export default NoticeManager;
