import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Vision & Mission', path: '/vision-mission' },
  { name: 'Member', path: '/members' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Notice', path: '/notices' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Institutional Top Bar */}
      <div className="bg-primary text-white py-1.5 hidden md:block relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="tel:9047747633" className="flex items-center gap-2.5 hover:text-white/80 transition-all group">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black tracking-tight">+91 90477 47633</span>
            </a>
            <a href="mailto:info@coimbatorehostels.com" className="flex items-center gap-2.5 hover:text-white/80 transition-all group">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black tracking-tight">info@coimbatorehostels.com</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-widest">Reg No: 63/2017</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 opacity-60" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">TN Regional HQ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Hub */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-white/20 shadow-xl"
            : "bg-white border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            isScrolled ? "h-16" : "h-20"
          )}>
            {/* Architectural Logo */}
            <Link to="/" className="flex items-center gap-5 group">
              <div className="relative">
                <div className={cn(
                  "rounded-2xl hero-gradient flex items-center justify-center shadow-2xl group-hover:shadow-primary/40 transition-all duration-500 transform group-hover:-rotate-6",
                  isScrolled ? "w-10 h-10" : "w-11 h-11"
                )}>
                  <span className={cn(
                    "text-white font-black transition-all duration-500",
                    isScrolled ? "text-xl" : "text-2xl"
                  )}>C</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-foreground tracking-tighter leading-none mb-1 group-hover:text-primary transition-colors">
                  CHOA
                </h1>
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.25em] opacity-60">
                  Regional Hostel Ecosystem
                </p>
              </div>
            </Link>

            {/* Intelligence Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 group overflow-hidden",
                    location.pathname === link.path
                      ? "text-primary bg-primary/5 shadow-sm"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[3px] bg-primary/20 transform transition-transform duration-500 origin-left",
                    location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Terminal Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/contact">
                <Button className="h-10 px-6 rounded-xl bg-primary hover:bg-primary-dark font-black text-[10px] uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 ring-4 ring-primary/10">
                  Join Association
                </Button>
              </Link>
            </div>

            {/* Command Interface (Mobile Menu Button) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-xl bg-secondary/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/50"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Tactical Mobile Overlay */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-border shadow-2xl overflow-hidden transition-all duration-500 ease-in-out",
            isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="container mx-auto px-6 py-10 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-between group",
                  location.pathname === link.path
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.name}
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-500",
                  location.pathname === link.path ? "rotate-[-90deg]" : "group-hover:rotate-[-90deg] opacity-40"
                )} />
              </Link>
            ))}
            <div className="pt-8 mt-6 border-t border-border flex flex-col gap-4">
              <Button className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                Join Membership
              </Button>
              <div className="flex items-center justify-center gap-6 mt-4 opacity-40">
                <Phone className="w-5 h-5" />
                <Mail className="w-5 h-5" />
                <Globe className="w-5 h-5" />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
