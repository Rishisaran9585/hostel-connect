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
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Column: Contact Information & Context */}
            <div className="space-y-12 pt-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Always Available</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9]">
                  Let's Start a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Conversation</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium max-w-md leading-relaxed">
                  We are here to answer your questions, resolve your issues, and welcome you to the community.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group p-8 rounded-[2rem] bg-secondary/30 border border-border/50 hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{info.tag}</span>
                      <h3 className="text-lg font-black text-foreground">{info.title}</h3>
                      <div className="flex flex-col gap-1">
                        {info.details.map((detail, dIndex) => (
                          info.action ? (
                            <a
                              key={dIndex}
                              href={`${info.action.type}:${info.action.value}`}
                              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={dIndex} className="text-sm font-medium text-muted-foreground">{detail}</p>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-4 p-6 rounded-3xl bg-secondary/50 border border-border/50 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-black text-foreground text-lg">Official Association</h4>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Govt Reg No. 63/2017</p>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Form */}
            <div className="lg:sticky lg:top-32">
              <div className="rounded-[3rem] bg-white border border-border/40 shadow-2xl shadow-primary/5 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[10rem] pointer-events-none" />

                <div className="relative z-10 mb-10">
                  <h3 className="text-3xl font-black text-foreground mb-3">Send a Message</h3>
                  <p className="text-muted-foreground font-medium">Fill out the form below and we will get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Your Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rajesh Kumar"
                        required
                        className="h-14 px-6 rounded-2xl bg-secondary/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        required
                        className="h-14 px-6 rounded-2xl bg-secondary/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="h-14 px-6 rounded-2xl bg-secondary/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Licensing, Dispute..."
                        required
                        className="h-14 px-6 rounded-2xl bg-secondary/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Message Narrative</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detail your inquiry here for our executive committee review..."
                      rows={5}
                      required
                      className="p-6 rounded-[2rem] bg-secondary/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-medium resize-none"
                    />
                  </div>

                  <Button type="submit" size="xl" className="w-full h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                    Send Message
                    <Send className="w-4 h-4 ml-3" />
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

            {/* Google Map Embed */}
            <div className="absolute inset-0 bg-muted">
              <iframe
                width="100%"
                height="100%"
                title="CHOA Headquarters Location"
                src="https://maps.google.com/maps?q=6A, Thudiyalur Main Road, Saravanampatti Post, Coimbatore – 641035&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ filter: "grayscale(0.5) contrast(1.2) opacity(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 group-hover:filter-none transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
