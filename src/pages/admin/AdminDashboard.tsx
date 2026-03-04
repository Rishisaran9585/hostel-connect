import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Users, FileText, Bell, Image as ImageIcon, Activity, Zap, ShieldCheck, Database } from 'lucide-react';
import { API_BASE_URL } from '@/config';

const AdminDashboard = () => {
    const [statsData, setStatsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stats.php`);
            const data = await response.json();
            if (data.success) {
                setStatsData(data.stats);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setLoading(false);
        }
    };

    const stats = [
        { label: 'Members', value: statsData?.total_members || '0', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Blogs', value: statsData?.blog_posts || '0', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Notices', value: statsData?.active_notices || '0', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Gallery', value: statsData?.gallery_assets || '0', icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
                        <p className="text-slate-500 text-sm">Welcome! See what's happening at your hostel.</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-500">
                        <Activity size={14} className="animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{statsData?.system_status || 'Online'}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse" />
                        ))
                    ) : (
                        stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/20 transition-all shadow-sm group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <h3 className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">{stat.label}</h3>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded uppercase tracking-tighter">Current</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 h-full shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-8">What do you want to do?</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { title: 'Add a Member', sub: 'Register new member', link: '/admin/members', icon: Users, theme: 'hover:bg-emerald-500/5 group-hover:text-emerald-600' },
                                    { title: 'Write a Blog', sub: 'Post an update', link: '/admin/blog', icon: FileText, theme: 'hover:bg-blue-500/5 group-hover:text-blue-600' },
                                    { title: 'Post a Notice', sub: 'Tell members something', link: '/admin/notices', icon: Bell, theme: 'hover:bg-rose-500/5 group-hover:text-rose-600' },
                                ].map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => window.location.href = action.link}
                                        className={`p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all text-left group`}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-all">
                                            <action.icon size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="block text-slate-900 font-bold text-sm mb-1">{action.title}</span>
                                        <span className="text-slate-500 text-[11px] font-medium">{action.sub}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div>
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 h-full shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <ShieldCheck size={20} className="text-primary" />
                                Status
                            </h2>

                            <div className="space-y-4">
                                {[
                                    { label: 'Database', val: 'Connected', icon: Database, color: 'text-emerald-500' },
                                    { label: 'Server Status', val: 'Online', icon: Activity, color: 'text-blue-500' },
                                    { label: 'Uptime', val: '99.9%', icon: Zap, color: 'text-amber-500' },
                                ].map((sys, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <sys.icon size={16} className={sys.color} />
                                            <span className="text-xs font-semibold text-slate-500">{sys.label}</span>
                                        </div>
                                        <span className={`text-[11px] font-bold ${sys.color}`}>{sys.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
