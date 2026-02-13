import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/home/CTASection';
import { API_BASE_URL, BACKEND_URL } from '@/config';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: 'events' | 'facilities' | 'students' | 'campus';
}

const initialGalleryImages: GalleryImage[] = [];

const categories = [
  { key: 'all', label: 'All Collection' },
  { key: 'events', label: 'Events & Functions' },
  { key: 'facilities', label: 'Our Facilities' },
  { key: 'students', label: 'Associated Members' },
  { key: 'campus', label: 'Campus Life' },
];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery.php`);
        const data = await response.json();
        const transformedData: GalleryImage[] = data.map((item: any) => ({
          id: parseInt(item.id),
          src: `${BACKEND_URL}/${item.image_url}`,
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
      <div className="container mx-auto px-4 py-12">

        {/* Modern Filter Bar - Simplified */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(cat => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-full font-bold transition-all px-6 h-10 ${selectedCategory === cat.key ? 'shadow-lg shadow-primary/20' : 'text-muted-foreground'
                }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid - Reduced size */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Overlay - Reduced content size */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <Badge className="w-fit bg-primary text-white border-none mb-1 shadow-sm text-[7px] font-black uppercase tracking-widest px-1.5 py-0">
                  {image.category}
                </Badge>
                <h3 className="text-white text-xs font-bold leading-tight line-clamp-2">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && !loading && (
          <div className="py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-foreground">No imagery found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try selecting a different filter category.</p>
          </div>
        )}

        {loading && (
          <div className="py-24 text-center animate-pulse">
            <p className="text-muted-foreground font-bold italic">Loading gallery...</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <button
            onClick={closeLightbox}
            className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all z-[110]"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-between w-full max-w-6xl h-full">
            <button
              onClick={() => navigateLightbox('prev')}
              className="w-12 h-12 rounded-full bg-white/5 hidden md:flex items-center justify-center text-white hover:bg-primary transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 flex flex-col items-center justify-center h-full px-4">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[80vh] object-contain rounded-xl animate-in zoom-in duration-300"
              />
              <div className="mt-8 text-center">
                <Badge className="bg-primary/20 text-primary border-none mb-2 px-3 py-0.5 uppercase font-black tracking-widest text-[9px]">
                  {lightboxImage.category}
                </Badge>
                <h2 className="text-xl md:text-2xl font-black text-white">{lightboxImage.title}</h2>
              </div>
            </div>

            <button
              onClick={() => navigateLightbox('next')}
              className="w-12 h-12 rounded-full bg-white/5 hidden md:flex items-center justify-center text-white hover:bg-primary transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <CTASection />
    </Layout>
  );
};

export default Gallery;
