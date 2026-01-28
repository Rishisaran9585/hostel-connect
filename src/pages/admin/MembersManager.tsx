import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    join_date: string;
}

const MembersManager = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        join_date: ''
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/members.php');
            const data = await response.json();
            setMembers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching members:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this member?')) {
            try {
                const response = await fetch(`http://localhost/hostel-connect/backend/api/members.php?id=${id}`, {
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
        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/members.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchMembers();
                setIsModalOpen(false);
                setFormData({ name: '', role: '', email: '', phone: '', join_date: '' });
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Members Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Add Member
                    </button>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-400">Loading...</td>
                                    </tr>
                                ) : members.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-400">No members found</td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-750">
                                            <td className="px-6 py-4 whitespace-nowrap text-white">{member.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                                <div className="text-sm">{member.email}</div>
                                                <div className="text-xs text-gray-500">{member.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{member.join_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    className="text-red-400 hover:text-red-300 ml-3"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-white mb-4">Add New Member</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Role</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Phone</label>
                                    <input
                                        type="tel"
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Join Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={formData.join_date}
                                        onChange={e => setFormData({ ...formData, join_date: e.target.value })}
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
                                        Add Member
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

export default MembersManager;
