import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: 'meetings' | 'events' | 'achievements';
}

const galleryImages: GalleryImage[] = [
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
  { key: 'all', label: 'All' },
  { key: 'meetings', label: 'Meetings' },
  { key: 'events', label: 'Events' },
  { key: 'achievements', label: 'Achievements' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

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
      {/* Hero */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              Gallery
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Moments Together
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Capturing the journey of CHOA through meetings, events, and achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map(image => (
              <div 
                key={image.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-primary-foreground text-sm font-medium">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full">
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-center text-primary-foreground mt-4 text-lg">{lightboxImage.title}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
