
import React from 'react';
import { Mail, Shield, Truck, Clock, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: 'Lettre Recommandée Standard',
      description: 'Service de base avec accusé de réception',
      icon: Mail,
      features: ['Accusé de réception', 'Suivi en ligne', 'Preuve de dépôt'],
      price: '25 DH',
      popular: false
    },
    {
      title: 'Lettre Recommandée Express',
      description: 'Livraison rapide en 24-48h',
      icon: Truck,
      features: ['Livraison rapide', 'Suivi temps réel', 'Notification SMS', 'Assurance incluse'],
      price: '45 DH',
      popular: true
    },
    {
      title: 'Lettre Recommandée Sécurisée',
      description: 'Maximum de sécurité pour vos documents importants',
      icon: Shield,
      features: ['Chiffrement avancé', 'Signature électronique', 'Archivage sécurisé', 'Support prioritaire'],
      price: '65 DH',
      popular: false
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Plus besoin de vous déplacer en bureau de poste'
    },
    {
      icon: Shield,
      title: 'Sécurité garantie',
      description: 'Vos documents sont protégés et traçables'
    },
    {
      icon: CheckCircle,
      title: 'Simplicité',
      description: 'Interface intuitive et processus simplifié'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-poste-blue to-poste-blue-light text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez nos solutions de lettres recommandées adaptées à tous vos besoins
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${service.popular ? 'ring-2 ring-poste-yellow' : ''}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-poste-yellow text-poste-blue px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Populaire
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-poste-blue/10 rounded-full">
                        <service.icon className="h-8 w-8 text-poste-blue" />
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="text-3xl font-bold text-poste-blue mt-4">
                      {service.price}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${service.popular ? 'bg-poste-blue hover:bg-poste-blue-light' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                      Choisir ce service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-poste-blue mb-4">
                Pourquoi choisir LRH Maroc ?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre plateforme vous offre une expérience moderne et sécurisée pour tous vos envois de lettres recommandées
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-poste-yellow/20 rounded-full group-hover:bg-poste-yellow/30 transition-colors">
                      <advantage.icon className="h-8 w-8 text-poste-blue" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-poste-blue">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-poste-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Créez votre compte dès maintenant et envoyez votre première lettre recommandée
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-poste-yellow text-poste-blue hover:bg-poste-yellow/90">
                Créer un compte
              </Button>
              <Button size="lg" variant="outline" className="border-white text-poste-blue hover:bg-white hover:text-poste-yellow">
                En savoir plus
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
