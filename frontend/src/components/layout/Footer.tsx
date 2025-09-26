
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-poste-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-poste-yellow">
                <Mail className="h-6 w-6 text-poste-blue" />
              </div>
              <div>
                <span className="text-white text-xl font-bold">LRH</span>
                <span className="text-poste-yellow text-sm ml-1">Maroc</span>
              </div>
            </div>
            <p className="text-sm text-blue-100">
              Modernisation du service postal marocain. Envoyez vos lettres numériquement, 
              nous nous occupons de l'impression et de la livraison physique.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-poste-yellow">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/letter" className="text-blue-100 hover:text-white transition-colors">
                  Envoi de lettres
                </Link>
              </li>
              <li>
                <Link to="/services/tracking" className="text-blue-100 hover:text-white transition-colors">
                  Suivi en temps réel
                </Link>
              </li>
              <li>
                <Link to="/services/templates" className="text-blue-100 hover:text-white transition-colors">
                  Modèles prédéfinis
                </Link>
              </li>
              <li>
                <Link to="/services/ai" className="text-blue-100 hover:text-white transition-colors">
                  Génération IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-poste-yellow">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-blue-100 hover:text-white transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-blue-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-100 hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-poste-yellow">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-poste-yellow" />
                <span className="text-blue-100">+212 5 22 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-poste-yellow" />
                <span className="text-blue-100">contact@lrh.ma</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-poste-yellow" />
                <span className="text-blue-100">Casablanca, Maroc</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-blue-100 hover:text-poste-yellow transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-poste-yellow transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-poste-yellow transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-poste-yellow transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-100">
              © 2024 LRH Maroc. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-blue-100 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="text-sm text-blue-100 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
