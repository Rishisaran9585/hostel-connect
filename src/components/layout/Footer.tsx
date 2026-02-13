import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Members', path: '/members' },
    { name: 'Media Gallery', path: '/gallery' },
    { name: 'Latest Blog', path: '/blog' },
    { name: 'News & Updates', path: '/notices' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const branches = [
    'Coimbatore HQ',
    'Salem Sector',
    'Trichy Central',
    'Erode Hub',
    'Tiruppur Zone',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-foreground text-background pt-24 relative overflow-hidden">
      {/* Decorative Architecture */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 pb-20">
          {/* Authority Profile */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shadow-2xl shadow-primary/20 transform -rotate-6">
                <span className="text-white font-black text-3xl">C</span>
              </div>
              <div>
                <h3 className="font-black text-2xl tracking-tighter leading-none mb-1">CHOA</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Institutional Body</p>
              </div>
            </div>
            <p className="text-base opacity-70 leading-relaxed font-medium max-w-sm">
              The Coimbatore Hostel Owner Association (CHOA) is the architect of modern residency standards in Tamil Nadu. We empower 300+ visionary owners through advocacy and legislative innovation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xl"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-primary" />
              <h3 className="font-black text-sm uppercase tracking-[0.2em]">Quick Access</h3>
            </div>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-base opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300 flex items-center gap-3 group font-medium"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-primary" />
              <h3 className="font-black text-sm uppercase tracking-[0.2em]">Regional Hubs</h3>
            </div>
            <ul className="space-y-4">
              {branches.map((branch) => (
                <li key={branch} className="flex items-center gap-3 text-base opacity-60 font-medium group cursor-default">
                  <MapPin className="w-4 h-4 text-primary group-hover:animate-bounce" />
                  {branch}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Reg No: 63/2017</span>
              </div>
            </div>
          </div>

          {/* Headquarters */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-primary" />
              <h3 className="font-black text-sm uppercase tracking-[0.2em]">Headquarters</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group hover:bg-white/10 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <span className="text-base opacity-70 leading-relaxed font-medium">
                  6A, Thudiyalur Main Road,<br />
                  Saravanampatti Post, Coimbatore<br />
                  Tamil Nadu – 641035
                </span>
              </li>
              <li>
                <a href="tel:9047747633" className="flex items-center gap-4 text-base group hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="opacity-70 group-hover:opacity-100 font-bold tracking-tight">9047747633</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@coimbatorehostels.com" className="flex items-center gap-4 text-base group hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="opacity-70 group-hover:opacity-100 font-bold tracking-tight">info@coimbatorehostels.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Terminal Bar */}
      <div className="bg-black/40 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">
                © {new Date().getFullYear()} CHOA Institutional Authority
              </p>
              <div className="flex gap-8">
                <Link to="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 hover:text-primary transition-all">Privacy Framework</Link>
                <Link to="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 hover:text-primary transition-all">Legislative Terms</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Powering Excellence Since 2017</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
