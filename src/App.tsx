import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Members from "./pages/Members";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Notices from "./pages/Notices";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import MembersManager from './pages/admin/MembersManager';
import BlogManager from './pages/admin/BlogManager';
import NoticeManager from './pages/admin/NoticeManager';
import GalleryManager from './pages/admin/GalleryManager';
import AdminRoute from './components/admin/AdminRoute';

const queryClient = new QueryClient();

const AdminRedirect = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return <Navigate to={isAdmin ? "/admin/dashboard" : "/admin/login"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/members" element={
            <AdminRoute>
              <MembersManager />
            </AdminRoute>
          } />
          <Route path="/admin/blog" element={
            <AdminRoute>
              <BlogManager />
            </AdminRoute>
          } />
          <Route path="/admin/notices" element={
            <AdminRoute>
              <NoticeManager />
            </AdminRoute>
          } />
          <Route path="/admin/gallery" element={
            <AdminRoute>
              <GalleryManager />
            </AdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
