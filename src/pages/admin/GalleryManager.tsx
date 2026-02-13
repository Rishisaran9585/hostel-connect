import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Trash2, Upload, X, Search, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL, BACKEND_URL } from '@/config';

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
    const [searchQuery, setSearchQuery] = useState('');

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('events');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/gallery.php`);
            const data = await response.json();
            setGallery(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setGallery([]);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/gallery.php?id=${id}`, {
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
            const response = await fetch(`${API_BASE_URL}/gallery.php`, {
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

    const filteredGallery = gallery.filter(item =>
        (item.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (item.category?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6 animate-fade-in text-slate-600">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery Gallery</h1>
                        <p className="text-slate-500 text-sm font-medium">Upload and manage photos of your hostel events and facilities.</p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold px-6 h-11 flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
                    >
                        <Upload size={18} />
                        Upload Image
                    </Button>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title or category..."
                            className="pl-11 h-11 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="aspect-square bg-white rounded-2xl border border-slate-200 animate-pulse shadow-sm" />
                        ))
                    ) : filteredGallery.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                            <Camera size={40} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-400 text-sm italic">No images found in the gallery.</p>
                        </div>
                    ) : (
                        filteredGallery.map((item) => (
                            <div key={item.id} className="group relative aspect-square bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-primary/20 hover:shadow-lg transition-all">
                                <img
                                    src={`${BACKEND_URL}/${item.image_url}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg scale-100 active:scale-95"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="absolute top-3 left-3">
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary border-none text-[9px] uppercase font-black py-0.5 px-2 rounded-md shadow-sm">
                                        {item.category}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent">
                                    <p className="text-white text-[11px] font-bold truncate">{item.title}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />

                        <div className="relative bg-white rounded-3xl p-8 w-full max-w-md border border-slate-200 shadow-2xl">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>

                            <div className="mb-6 text-center">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                                    <Upload size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Upload New Photo</h2>
                                <p className="text-xs text-slate-500 font-medium mt-1">Add a new image to your collection</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Image Title</label>
                                    <Input
                                        required
                                        placeholder="Caption for the photo"
                                        className="bg-slate-50 border-slate-200 focus:bg-white focus:border-primary/20 rounded-xl transition-all"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gallery Category</label>
                                    <select
                                        className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-primary/20 focus:bg-white rounded-xl text-slate-700 px-4 text-sm focus:outline-none cursor-pointer font-medium"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                    >
                                        <option value="events">Events & Functions</option>
                                        <option value="facilities">Our Facilities</option>
                                        <option value="students">Associated Members</option>
                                        <option value="campus">Campus Life</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select File</label>
                                    <div className="relative h-32 border-2 border-slate-200 border-dashed rounded-2xl hover:border-primary/50 hover:bg-slate-50 transition-all flex flex-col items-center justify-center group cursor-pointer overflow-hidden bg-white shadow-xs">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={e => setFile(e.target.files?.[0] || null)}
                                            accept="image/*"
                                        />
                                        <div className="text-center p-4">
                                            <Upload className="mx-auto h-8 w-8 text-slate-300 group-hover:text-primary mb-2 transition-transform group-hover:-translate-y-1" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                {file ? file.name : 'Choose high-quality image'}
                                            </p>
                                            <p className="text-[8px] text-slate-400 mt-1 uppercase">JPG, PNG up to 5MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
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
                                        disabled={uploadLoading}
                                        className="flex-1 h-12 rounded-xl bg-primary text-white font-bold uppercase tracking-wider text-[11px] shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {uploadLoading ? 'Uploading...' : 'Finalize Upload'}
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

export default GalleryManager;
