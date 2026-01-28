import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: 'meetings' | 'events' | 'achievements';
}

const initialGalleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Annual General Meeting 2023', category: 'meetings' },
  { id: 2, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', title: 'Executive Committee Session', category: 'meetings' },
  { id: 3, src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', title: 'Member Networking Event', category: 'events' },
  { id: 4, src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800', title: 'Award Ceremony', category: 'achievements' },
  { id: 5, src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', title: 'Workshop on Compliance', category: 'events' },
  { id: 6, src: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800', title: 'Founders Day Celebration', category: 'events' },
  { id: 7, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', title: 'Board Meeting', category: 'meetings' },
  { id: 8, src: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800', title: 'Industry Recognition Award', category: 'achievements' },
  { id: 9, src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800', title: 'Member Conference', category: 'meetings' },
  { id: 10, src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', title: 'Zonal Meet 2023', category: 'meetings' },
  { id: 11, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', title: 'Strategic Planning Session', category: 'meetings' },
  { id: 12, src: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800', title: 'Community Outreach Program', category: 'events' },
];

const categories = [
  { key: 'all', label: 'All Collection' },
  { key: 'meetings', label: 'Conferences' },
  { key: 'events', label: 'Member Events' },
  { key: 'achievements', label: 'Victories' },
];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('http://localhost/hostel-connect/backend/api/gallery.php');
        const data = await response.json();
        const transformedData: GalleryImage[] = data.map((item: any) => ({
          id: parseInt(item.id),
          src: `http://localhost/hostel-connect/backend/${item.image_url}`,
          title: item.title,
          category: item.category as any,
        }));
        setGalleryImages(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <Layout>
      {/* Premium Hero Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 mb-8 backdrop-blur-md font-bold uppercase tracking-widest text-[10px]">
            Visual Registry
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
            Our Timeline in <span className="text-white/80">Motion</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            A visual journey through the significant milestones, member interactions, and policy victories that define the CHOA legacy.
          </p>
        </div>
      </section>

      {/* Modern Filter Bar */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-2xl font-bold transition-all px-8 ${selectedCategory === cat.key ? 'shadow-xl shadow-primary/20 scale-105' : 'text-muted-foreground'
                  }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Contemporary Layout */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000"
                />

                {/* Modern Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <Badge className="w-fit bg-primary/20 backdrop-blur-md text-white border-white/20 mb-3 text-[8px] font-black uppercase tracking-widest">{image.category}</Badge>
                  <h3 className="text-white text-xl font-black mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.title}</h3>

                  <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <Maximize2 className="w-4 h-4" />
                    View Full Frame
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground">No imagery found</h3>
              <p className="text-muted-foreground mt-2">Try selecting a different filter category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox - Premium Modal Experience */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-500">
          <button
            onClick={closeLightbox}
            className="fixed top-8 right-8 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all duration-300 z-[110]"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex items-center justify-between w-full h-full max-w-7xl">
            <button
              onClick={() => navigateLightbox('prev')}
              className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hidden md:flex items-center justify-center text-white hover:bg-primary transition-all duration-500"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex-1 flex flex-col items-center justify-center h-full px-6">
              <div className="relative w-full max-h-[75vh] group/img">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="w-full h-full object-contain rounded-3xl animate-in zoom-in duration-500"
                />
              </div>

              <div className="mt-12 text-center animate-fade-up">
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 px-4 py-1 uppercase font-black tracking-widest text-[10px]">{lightboxImage.category}</Badge>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{lightboxImage.title}</h2>
                <div className="mt-6 flex items-center gap-6 text-white/40 text-sm font-bold">
                  <span>EST. 2024 COLLECTION</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>CHOA ARCHIVES</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateLightbox('next')}
              className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hidden md:flex items-center justify-center text-white hover:bg-primary transition-all duration-500"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
      <CTASection />
    </Layout>
  );
};

export default Gallery;
