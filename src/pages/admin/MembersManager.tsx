import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Trash2, Search, Filter, Mail, Phone, PlusCircle, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL, BACKEND_URL } from '@/config';

interface Member {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    hostel_name: string;
    photo: string;
    category: string;
    join_date: string;
}

const MembersManager = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        category: 'general',
        designation: '',
        hostel_name: '',
        email: '',
        phone: '',
    });
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/members.php`);
            const data = await response.json();
            setMembers(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching members:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to remove this member?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/members.php?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchMembers();
                }
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploadLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('designation', formData.designation);
        data.append('hostel_name', formData.hostel_name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        if (photoFile) {
            data.append('photo', photoFile);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/members.php`, {
                method: 'POST',
                body: data,
            });
            const result = await response.json();
            if (response.ok && result.success) {
                fetchMembers();
                setIsModalOpen(false);
                resetForm();
            } else {
                alert(result.message || 'Error occurred');
            }
        } catch (error) {
            console.error('Error adding member:', error);
            alert('Could not connect to server');
        } finally {
            setUploadLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'general',
            designation: '',
            hostel_name: '',
            email: '',
            phone: '',
        });
        setPhotoFile(null);
    };

    const filteredMembers = members.filter(member => {
        const name = member.name?.toLowerCase() || '';
        const role = member.role?.toLowerCase() || '';
        const email = member.email?.toLowerCase() || '';
        const hName = member.hostel_name?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();

        return name.includes(query) || role.includes(query) || email.includes(query) || hName.includes(query);
    });

    const categoryLabels: Record<string, string> = {
        founders: 'Founder',
        board: 'Board Member',
        executive: 'Executive Committee',
        general: 'Member',
    };

    const getRoleBadge = (category: string | undefined | null) => {
        const c = category?.toLowerCase() || 'general';
        if (c === 'founders') return 'bg-rose-500/10 text-rose-500 border-rose-500/10';
        if (c === 'board') return 'bg-amber-500/10 text-amber-500 border-amber-500/10';
        if (c === 'executive') return 'bg-blue-500/10 text-blue-500 border-blue-500/10';
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10';
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-fade-in text-slate-600">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Members</h1>
                        <p className="text-slate-500 text-sm">Manage all hostel members and their details.</p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold px-6 h-11 flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
                    >
                        <PlusCircle size={18} />
                        Add New Member
                    </Button>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, hostel or email..."
                            className="pl-11 h-11 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl text-sm transition-all"
                        />
                    </div>
                    <Button variant="outline" className="h-11 rounded-xl gap-2 text-sm text-slate-600 hover:bg-slate-50 border-slate-200 transition-all">
                        <Filter size={16} />
                        Filter
                    </Button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hostel</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    [1, 2, 3].map(i => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={5} className="px-6 py-4 text-center">
                                                <div className="h-4 bg-slate-100 rounded w-full" />
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredMembers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <p className="text-slate-400 text-sm italic">No members found.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMembers.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                                        {member.photo ? (
                                                            <img
                                                                src={`${BACKEND_URL}/${member.photo}`}
                                                                alt={member.name}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <span className="text-primary font-bold text-lg">{member.name[0]}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-900">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant="outline" className={cn("px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border shadow-xs", getRoleBadge(member.category))}>
                                                    {categoryLabels[member.category?.toLowerCase() || 'general'] || member.category}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                                                {member.hostel_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <Mail size={12} className="text-slate-400" />
                                                        {member.email || 'N/A'}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        <Phone size={12} className="text-slate-400" />
                                                        {member.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center ml-auto shadow-sm"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
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

                            <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Member</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Member Category</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {[
                                                { id: 'founders', label: 'Founder' },
                                                { id: 'board', label: 'Board Member' },
                                                { id: 'executive', label: 'Executive Committee' },
                                                { id: 'general', label: 'Member' },
                                            ].map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, category: cat.id })}
                                                    className={cn(
                                                        "py-2.5 px-2 rounded-xl text-xs font-bold transition-all border",
                                                        formData.category === cat.id
                                                            ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                                            : "text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                                                    )}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                                            <Input
                                                required
                                                placeholder="Enter name"
                                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hostel Name</label>
                                            <Input
                                                required
                                                placeholder="Enter hostel"
                                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                                value={formData.hostel_name}
                                                onChange={e => setFormData({ ...formData, hostel_name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Photo</label>
                                            <div className="relative h-11 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-primary/50 transition-all flex items-center px-4 overflow-hidden group cursor-pointer shadow-xs hover:bg-white">
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={e => setPhotoFile(e.target.files?.[0] || null)}
                                                    accept="image/*"
                                                />
                                                <Camera size={16} className="text-slate-400 mr-2 group-hover:text-primary transition-colors" />
                                                <span className="text-xs text-slate-500 truncate group-hover:text-slate-700 font-medium">
                                                    {photoFile ? photoFile.name : 'Select photo (optional)'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Designation / Role</label>
                                            <Input
                                                placeholder="e.g. Member or CEO"
                                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                                value={formData.designation}
                                                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                            <Input
                                                type="email"
                                                placeholder="email@example.com"
                                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</label>
                                            <Input
                                                type="tel"
                                                required
                                                placeholder="Direct contact No."
                                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 h-12 rounded-xl font-bold uppercase tracking-wider text-xs border-slate-200"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={uploadLoading}
                                        className="flex-1 h-12 rounded-xl bg-primary text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {uploadLoading ? 'Saving...' : 'Save Member'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout >
    );
};

// Helper for class names if not available
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default MembersManager;
