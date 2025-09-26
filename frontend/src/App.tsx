
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ClientProvider } from "@/contexts/ClientContext"; // ⬅️ Import this
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import CreateLetter from "./pages/CreateLetter";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import History from "./pages/History";
import Tracking from "./pages/Tracking";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log('App component rendering');
  
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <LanguageProvider>
  //       <TooltipProvider>
  //         <Toaster />
  //         <Sonner />
  //         <BrowserRouter>
  //           <Routes>
  //             <Route path="/" element={<Index />} />
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/register" element={<Register />} />
  //             <Route path="/dashboard" element={<Dashboard />} />
  //             <Route path="/services" element={<Services />} />
  //             <Route path="/pricing" element={<Pricing />} />
  //             <Route path="/contact" element={<Contact />} />
  //             <Route path="/admin-login" element={<AdminLogin />} />
  //             <Route path="/admin-dashboard" element={<AdminDashboard />} />
  //             <Route path="/create-letter" element={<CreateLetter />} />
  //             <Route path="/history" element={<History />} />
  //             <Route path="/tracking" element={<Tracking />} />
  //             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  //             <Route path="*" element={<NotFound />} />
  //           </Routes>
  //         </BrowserRouter>
  //       </TooltipProvider>
  //     </LanguageProvider>
  //   </QueryClientProvider>
  // );




  return (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ClientProvider> 
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Index />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/services" element={<Services />} />
               <Route path="/pricing" element={<Pricing />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/admin-login" element={<AdminLogin />} />
               <Route path="/admin-dashboard" element={<AdminDashboard />} />
               <Route path="/create-letter" element={<CreateLetter />} />
               <Route path="/history" element={<History />} />
               <Route path="/tracking" element={<Tracking />} />
               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
               <Route path="*" element={<NotFound />} />            
              </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ClientProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

};

export default App;
