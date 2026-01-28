import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Members', path: '/members' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const branches = [
    'Coimbatore',
    'Salem',
    'Trichy',
    'Erode',
    'Tiruppur',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">CHOA</h3>
                <p className="text-sm opacity-70">Since 2017</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Coimbatore Hostel Owner Association is a registered body dedicated to supporting and empowering hostel owners across Tamil Nadu since 2017.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Our Branches</h3>
            <ul className="space-y-3">
              {branches.map((branch) => (
                <li key={branch} className="flex items-center gap-2 text-sm opacity-80">
                  <MapPin className="w-4 h-4 text-primary" />
                  {branch}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <div className="text-xs opacity-60 space-y-1">
                <p>Registration No: 63/2017</p>
                <p>Date: 15 March 2017</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-80 leading-relaxed">
                  6A, Thudiyalur Main Road,<br />
                  Saravanampatti Post,<br />
                  Coimbatore – 641035
                </span>
              </li>
              <li>
                <a href="tel:9047747633" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  9047747633
                </a>
              </li>
              <li>
                <a href="mailto:info@coimbatorehostels.com" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  info@coimbatorehostels.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                Mon - Sat: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>© {new Date().getFullYear()} Coimbatore Hostel Owner Association. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:opacity-100 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:opacity-100 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
