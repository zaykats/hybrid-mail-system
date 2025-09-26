
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-poste-gray to-white">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl gradient-bg shadow-lg">
            <Mail className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-poste-blue mb-2">404</h1>
          <div className="w-24 h-1 bg-poste-yellow mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            {t('404.title')}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t('404.description')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full bg-poste-blue hover:bg-poste-blue-light text-white font-medium py-3 rounded-lg transition-all duration-200 hover:shadow-lg">
              <Home className="mr-2 h-4 w-4" />
              {t('404.backHome')}
            </Button>
          </Link>
          
          <Link to="/services">
            <Button variant="outline" className="w-full border-poste-blue text-poste-blue hover:bg-poste-blue hover:text-white py-3 rounded-lg transition-all duration-200">
              <Search className="mr-2 h-4 w-4" />
              {t('nav.services')}
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-20 left-20 w-32 h-32 bg-poste-yellow/10 rounded-full blur-xl"></div>
        <div className="absolute -z-10 bottom-20 right-20 w-40 h-40 bg-poste-blue/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
