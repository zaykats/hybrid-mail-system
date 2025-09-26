
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Shield, Clock, MapPin, Smartphone, Printer } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Principal */}
      <section className="relative overflow-hidden gradient-bg py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenu */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Envoyez vos lettres en
                  <span className="text-poste-yellow"> numérique</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  LRH révolutionne l'envoi postal au Maroc. Créez votre lettre en ligne, 
                  nous l'imprimons et la livrons physiquement partout au royaume.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-poste-yellow text-poste-blue hover:bg-yellow-400 font-semibold">
                    Commencer gratuitement
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="outline" className="border-white text-poste-blue hover:bg-white hover:text-poste-yellow">
                    Voir la démo
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-poste-yellow">24h</div>
                  <div className="text-sm text-blue-100">Livraison moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-poste-yellow">100%</div>
                  <div className="text-sm text-blue-100">Sécurisé</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-poste-yellow">12</div>
                  <div className="text-sm text-blue-100">Villes couvertes</div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 animate-fade-in">
                <Card className="hover-scale">
                  <CardContent className="p-6 text-center">
                    <Smartphone className="h-12 w-12 text-poste-blue mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Créez en ligne</h3>
                    <p className="text-sm text-gray-600">Interface intuitive</p>
                  </CardContent>
                </Card>
                <Card className="hover-scale mt-8">
                  <CardContent className="p-6 text-center">
                    <Printer className="h-12 w-12 text-poste-blue mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Nous imprimons</h3>
                    <p className="text-sm text-gray-600">Centre postal</p>
                  </CardContent>
                </Card>
                <Card className="hover-scale">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 text-poste-blue mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Livraison</h3>
                    <p className="text-sm text-gray-600">Facteur officiel</p>
                  </CardContent>
                </Card>
                <Card className="hover-scale mt-8">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-poste-blue mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Suivi</h3>
                    <p className="text-sm text-gray-600">Temps réel</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 bg-poste-yellow rounded-full"></div>
          <div className="absolute top-40 right-40 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-poste-yellow rounded-full"></div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir LRH ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution moderne qui combine la commodité du numérique 
              avec la fiabilité du service postal traditionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-scale card-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-poste-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-poste-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Gain de temps</h3>
                <p className="text-gray-600">
                  Plus besoin de vous déplacer. Créez et envoyez vos lettres 
                  depuis votre domicile en quelques clics.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale card-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-poste-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-poste-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Sécurité maximale</h3>
                <p className="text-gray-600">
                  Transmission cryptée, suivi en temps réel et confirmation 
                  de livraison avec CIN du destinataire.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale card-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-poste-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-poste-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Couverture nationale</h3>
                <p className="text-gray-600">
                  Service disponible dans toutes les grandes villes du Maroc 
                  avec extension progressive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
