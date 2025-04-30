
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClassResources from "./pages/ClassResources";
import CategoryChapters from "./pages/CategoryChapters";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get the repository name from the URL for GitHub Pages
const getBasename = () => {
  // When running locally, use root path
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/';
  }
  
  // On GitHub pages, get the repository name from pathname
  const pathSegments = window.location.pathname.split('/');
  if (pathSegments.length > 1) {
    return '/' + pathSegments[1];
  }
  
  return '/';
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasename()}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/class/:classId" element={<ClassResources />} />
          <Route path="/class/:classId/category/:categoryId" element={<CategoryChapters />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
