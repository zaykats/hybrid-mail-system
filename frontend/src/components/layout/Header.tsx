
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Menu, X, User, LogOut, Settings, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useClient } from '@/contexts/ClientContext'; 

// interface HeaderProps {
//   isAuthenticated?: boolean;
//   user?: {
//     name: string;
//     email: string;
//     type: string;
//   };
// }

// const Header = ({ isAuthenticated = false, user }: HeaderProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useLanguage();

//   const handleLogout = () => {
//     console.log('Déconnexion...');
//     navigate('/');
//   };
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { client, isAuthenticated, logout } = useClient();

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
        {/* Logo LRH */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-bg">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div className="hidden font-bold sm:inline-block">
            <span className="text-poste-blue text-xl">LRH</span>
            <span className="text-poste-yellow text-sm ml-1">Maroc</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex ml-auto items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.dashboard')}
              </Link>
              <Link to="/create-letter" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.createLetter')}
              </Link>
              <Link to="/tracking" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.tracking')}
              </Link>
              <Link to="/history" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.history')}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{client?.name || 'Utilisateur'}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {client?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t('nav.profile')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/services" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.services')}
              </Link>
              <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.pricing')}
              </Link>
              <Link to="/contact" className="text-sm font-medium transition-colors hover:text-poste-blue">
                {t('nav.contact')}
              </Link>
              
              {/* Admin Access Dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/admin-login')}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Connexion Admin</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Panel Admin</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => navigate('/admin-login')}
              >
                <Shield className="h-4 w-4" />
                Connexion Admin
              </Button>


                          
              <Link to="/login">
                <Button variant="outline" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-poste-blue hover:bg-poste-blue-light" size="sm">
                  {t('nav.register')}
                </Button>
              </Link>
            </>
          )}
          
          <LanguageSelector />
        </nav>

        {/* Menu Mobile */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-base font-medium">
                  {t('nav.dashboard')}
                </Link>
                <Link to="/create-letter" className="block px-3 py-2 text-base font-medium">
                  {t('nav.createLetter')}
                </Link>
                <Link to="/tracking" className="block px-3 py-2 text-base font-medium">
                  {t('nav.tracking')}
                </Link>
                <Link to="/history" className="block px-3 py-2 text-base font-medium">
                  {t('nav.history')}
                </Link>
                <Link to="/profile" className="block px-3 py-2 text-base font-medium">
                  {t('nav.profile')}
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/services" className="block px-3 py-2 text-base font-medium">
                  {t('nav.services')}
                </Link>
                <Link to="/pricing" className="block px-3 py-2 text-base font-medium">
                  {t('nav.pricing')}
                </Link>
                <Link to="/contact" className="block px-3 py-2 text-base font-medium">
                  {t('nav.contact')}
                </Link>
                
                {/* Admin Links for Mobile */}
                <div className="border-t pt-2 mt-2">
                  <p className="px-3 py-1 text-sm font-medium text-gray-500">Administration</p>
                  <Link to="/admin-login" className="block px-3 py-2 text-base font-medium text-poste-blue">
                    Connexion Admin
                  </Link>
                </div>
                
                <Link to="/login" className="block px-3 py-2 text-base font-medium">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
