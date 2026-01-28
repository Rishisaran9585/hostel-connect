import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                        <h3 className="text-gray-400 text-sm font-medium">Total Members</h3>
                        <p className="text-3xl font-bold text-white mt-2">Loading...</p>
                        <div className="mt-4 h-1 w-full bg-gray-700 rounded-full">
                            <div className="h-1 bg-blue-500 rounded-full w-2/3"></div>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                        <h3 className="text-gray-400 text-sm font-medium">Blog Posts</h3>
                        <p className="text-3xl font-bold text-white mt-2">Loading...</p>
                        <div className="mt-4 h-1 w-full bg-gray-700 rounded-full">
                            <div className="h-1 bg-green-500 rounded-full w-1/2"></div>
                        </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                        <h3 className="text-gray-400 text-sm font-medium">Active Notices</h3>
                        <p className="text-3xl font-bold text-white mt-2">Loading...</p>
                        <div className="mt-4 h-1 w-full bg-gray-700 rounded-full">
                            <div className="h-1 bg-amber-500 rounded-full w-3/4"></div>
                        </div>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                        <h3 className="text-gray-400 text-sm font-medium">Gallery Images</h3>
                        <p className="text-3xl font-bold text-white mt-2">Loading...</p>
                        <div className="mt-4 h-1 w-full bg-gray-700 rounded-full">
                            <div className="h-1 bg-purple-500 rounded-full w-1/3"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => window.location.href = '/admin/members'} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left group">
                            <span className="block text-white font-medium mb-1">Add Member</span>
                            <span className="text-gray-400 text-sm group-hover:text-gray-300">Create a new member profile</span>
                        </button>
                        <button onClick={() => window.location.href = '/admin/blog'} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left group">
                            <span className="block text-white font-medium mb-1">Post Blog</span>
                            <span className="text-gray-400 text-sm group-hover:text-gray-300">Write a new article</span>
                        </button>
                        <button onClick={() => window.location.href = '/admin/notices'} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left group">
                            <span className="block text-white font-medium mb-1">Create Notice</span>
                            <span className="text-gray-400 text-sm group-hover:text-gray-300">Announce something new</span>
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
