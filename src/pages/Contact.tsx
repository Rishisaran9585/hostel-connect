import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received",
      description: "Our association representative will contact you shortly.",
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Headquarters',
      details: ['6A, Thudiyalur Main Road, Saravanampatti Post,', 'Coimbatore – 641035'],
      tag: 'Strategic Location'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 90477 47633', 'We are here to help'],
      action: { type: 'tel', value: '9047747633' },
      tag: 'Available 24/7'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@coimbatorehostels.com', 'For any questions'],
      action: { type: 'mailto', value: 'info@coimbatorehostels.com' },
      tag: 'Verified Source'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: By Appointment'],
      tag: 'Standard Timing'
    },
  ];

  return (
    <Layout>
      {/* Premium Hero */}
      <section className="py-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark/20 rounded-full blur-[100px] -ml-32 -mb-32" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 mb-8 backdrop-blur-md">
            Connect With Us
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            We are here to <span className="text-white/80">Help You</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Whether you are starting a new hostel or need help with rules, we are here to support you at every step.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Contact Detail Cards - Left Side */}
            <div className="lg:col-span-4 space-y-6">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-foreground mb-4">Official Channels</h2>
                <p className="text-muted-foreground font-medium">Use these direct channels for legitimate association inquiries and member support.</p>
              </div>

              {contactInfo.map((info, index) => (
                <div key={index} className="group relative p-8 rounded-[2.5rem] bg-secondary/50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="absolute top-6 right-8">
                    <Badge className="bg-white text-primary border-none shadow-sm text-[8px] font-black uppercase tracking-widest">{info.tag}</Badge>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-foreground mb-2">{info.title}</h3>
                      {info.details.map((detail, dIndex) => (
                        info.action ? (
                          <a
                            key={dIndex}
                            href={`${info.action.type}:${info.action.value}`}
                            className="block text-muted-foreground text-sm font-medium hover:text-primary transition-colors"
                          >
                            {detail}
                          </a>
                        ) : (
                          <p key={dIndex} className="text-muted-foreground text-sm font-medium">{detail}</p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Registration Meta */}
              <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground">Verified Entity</h3>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Reg No. 63/2017</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Message Form - Right Side */}
            <div className="lg:col-span-8">
              <div className="bg-card rounded-[3rem] p-10 md:p-16 border border-border/50 shadow-2xl relative overflow-hidden">
                {/* Visual decoration in form */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem]" />

                <div className="relative z-10 mb-12">
                  <div className="inline-flex items-center gap-2 mb-4 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <MessageSquare className="w-4 h-4" />
                    <span>Send us a message</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Write to <span className="text-primary">Our Team</span></h2>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                        Full Name Representative
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rajesh Kumar"
                        required
                        className="h-16 px-6 rounded-2xl bg-secondary/50 border-transparent focus:bg-white focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                        Correspondence Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        required
                        className="h-16 px-6 rounded-2xl bg-secondary/50 border-transparent focus:bg-white focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                        WhatsApp / Phone Contact
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="h-16 px-6 rounded-2xl bg-secondary/50 border-transparent focus:bg-white focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                        Specific Purpose
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Licensing, Dispute..."
                        required
                        className="h-16 px-6 rounded-2xl bg-secondary/50 border-transparent focus:bg-white focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                      Message Narrative
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detail your inquiry here for our executive committee review..."
                      rows={6}
                      required
                      className="p-6 rounded-[2rem] bg-secondary/50 border-transparent focus:bg-white focus:ring-primary/20 transition-all font-medium resize-none"
                    />
                  </div>
                  <Button type="submit" size="xl" className="w-full sm:w-auto h-16 px-12 rounded-2xl font-black group shadow-xl shadow-primary/20">
                    Send Message
                    <Send className="w-6 h-6 ml-3 group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Geospatial Visualization Placeholder */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="relative h-[600px] rounded-[3.5rem] overflow-hidden group shadow-2xl border border-border/50">
            {/* Mask and Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-16 left-16 z-20 max-w-lg text-white animate-fade-up">
              <Badge className="bg-primary text-white border-transparent px-4 py-2 mb-6">Location Registry</Badge>
              <h3 className="text-4xl font-black mb-4">Official CHOA Office</h3>
              <p className="text-white/70 font-medium mb-8 leading-relaxed">Visit our primary registration hub in Saravanampatti for physical documentation processing and face-to-face consultancy.</p>
              <a
                href="https://maps.google.com/?q=Saravanampatti,Coimbatore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-primary font-bold transition-all flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  Get Navigational Directions
                </Button>
              </a>
            </div>

            {/* Abstract Map Background Simulation */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-1000">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
              <div className="relative z-0 w-32 h-32 rounded-full hero-gradient blur-[80px] animate-pulse" />
              <MapPin className="w-24 h-24 text-primary relative z-0 animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
