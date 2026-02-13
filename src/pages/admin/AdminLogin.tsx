import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { API_BASE_URL } from '@/config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('adminUser', JSON.stringify(data.user)); // Optional: store user info
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Authentication sequence failed');
            }
        } catch (err) {
            setError('System synchronization error. Verify network link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden font-sans selection:bg-primary/20 selection:text-primary">
            {/* Soft background accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

            <div className="max-w-md w-full relative z-10">
                {/* Branding Entrance */}
                <div className="text-center mb-10 animate-fade-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl hero-gradient mb-6 shadow-2xl shadow-primary/30 group">
                        <Shield className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-3">CHOA</h1>
                    <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Administrative Access Protocol</p>
                </div>

                {/* Login Container */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 animate-fade-in stagger-1">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-5 block transition-colors group-focus-within:text-primary">Admin Username</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-primary" />
                                    <Input
                                        id="username"
                                        type="text"
                                        required
                                        autoComplete="username"
                                        placeholder="Username"
                                        className="h-16 pl-14 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-2xl text-slate-800 font-bold placeholder:text-slate-300 transition-all focus:ring-primary/20"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-5 block transition-colors group-focus-within:text-primary">Admin Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-primary" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="h-16 pl-14 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-2xl text-slate-800 font-bold placeholder:text-slate-300 transition-all focus:ring-primary/20"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 p-4 rounded-2xl animate-fade-up">
                                <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-sm">
                                    <X size={16} />
                                </div>
                                <p className="text-rose-600 text-xs font-bold leading-tight">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 rounded-[2rem] bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 group transition-all duration-500"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                                <>
                                    Login Now
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                            <Home size={14} />
                            Back to Home
                        </Link>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Ver: 2.0.4-LTS</p>
                    </div>
                </div>

                {/* Secure footer */}
                <p className="mt-8 text-center text-slate-400 text-[9px] font-black uppercase tracking-[0.4em] opacity-60">
                    Secure Admin Panel • Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};

// Simple reusable X icon
const X = ({ size, className }: { size: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

export default AdminLogin;
