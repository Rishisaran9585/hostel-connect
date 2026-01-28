import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Trash2, Upload } from 'lucide-react';

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
    category: string;
    created_at: string;
}

const GalleryManager = () => {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('events');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/gallery.php');
            const data = await response.json();
            setGallery(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            try {
                const response = await fetch(`http://localhost/hostel-connect/backend/api/gallery.php?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchGallery();
                }
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', file);

        setUploadLoading(true);

        try {
            const response = await fetch('http://localhost/hostel-connect/backend/api/gallery.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                fetchGallery();
                setIsModalOpen(false);
                setTitle('');
                setCategory('events');
                setFile(null);
            } else {
                alert(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error connecting to server');
        } finally {
            setUploadLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Add Image
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : gallery.length === 0 ? (
                        <p className="text-gray-400 col-span-full text-center py-12">No images in gallery</p>
                    ) : (
                        gallery.map((item) => (
                            <div key={item.id} className="group relative aspect-square bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                                <img
                                    src={`http://localhost/hostel-connect/backend/${item.image_url}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                                    <p className="text-white font-medium text-sm truncate">{item.title}</p>
                                    <p className="text-gray-300 text-xs">{item.category}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-white mb-4">Upload New Image</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Category</label>
                                    <select
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                    >
                                        <option value="events">Events</option>
                                        <option value="facilities">Facilities</option>
                                        <option value="students">Students</option>
                                        <option value="campus">Campus</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Image</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md hover:border-amber-500 transition-colors">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-amber-500 hover:text-amber-400 focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setFile(e.target.files?.[0] || null)} accept="image/*" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                            {file && <p className="text-sm text-amber-500 mt-2 font-medium">{file.name}</p>}
                                        </div>
                                    </div>
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
                                        disabled={uploadLoading}
                                        className={`px-4 py-2 bg-amber-600 rounded-md text-white hover:bg-amber-700 transition flex items-center ${uploadLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {uploadLoading ? 'Uploading...' : 'Upload Image'}
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

export default GalleryManager;
