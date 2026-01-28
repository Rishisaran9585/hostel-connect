import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Users,
    FileText,
    Bell,
    Image as ImageIcon,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Settings,
    Search,
    UserCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Members', href: '/admin/members', icon: Users },
        { name: 'Blogs', href: '/admin/blog', icon: FileText },
        { name: 'Notices', href: '/admin/notices', icon: Bell },
        { name: 'Photos', href: '/admin/gallery', icon: ImageIcon },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const currentPage = navigation.find(n => n.href === location.pathname) || { name: 'Admin', icon: LayoutDashboard };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-600 font-sans">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-all duration-300",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="px-6 py-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">H</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">Admin Portal</h1>
                                <p className="text-[11px] text-slate-500 font-medium mt-1">Hostel Connect</p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Menu
                        </div>
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        "group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-slate-600 hover:text-primary hover:bg-slate-50"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "mr-3 h-5 w-5",
                                        isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                                    )} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 mt-auto border-t border-slate-100">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                <UserCircle className="w-7 h-7 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
                                <p className="text-[11px] text-slate-500">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                            <LogOut className="mr-3 h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-300",
                isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
            )}>
                <header className={cn(
                    "sticky top-0 z-40 w-full transition-all duration-200",
                    scrolled
                        ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
                        : "bg-transparent py-5"
                )}>
                    <div className="px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm"
                            >
                                {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{currentPage.name}</h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl">
                                <Search className="w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none text-sm font-medium text-slate-600 focus:outline-none placeholder:text-slate-400 w-40"
                                />
                            </div>
                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-primary">
                                <Settings size={18} />
                            </Button>
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary relative">
                                <Bell size={18} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-8">
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

// Helper for class names
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default AdminLayout;
