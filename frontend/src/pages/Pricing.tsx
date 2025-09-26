
import React from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const pricingPlans = [
    {
      name: 'Particulier',
      description: 'Pour les envois personnels occasionnels',
      price: '0',
      period: 'Gratuit',
      features: [
        '2 lettres gratuites par mois',
        'Suivi en ligne',
        'Accusé de réception',
        'Support par email'
      ],
      payPerUse: '25 DH par lettre supplémentaire',
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professionnel',
      description: 'Pour les entreprises et professionnels',
      price: '199',
      period: 'par mois',
      features: [
        '20 lettres incluses par mois',
        'Modèles de lettres personnalisés',
        'API intégration',
        'Support prioritaire',
        'Archivage sécurisé',
        'Signature électronique'
      ],
      payPerUse: '18 DH par lettre supplémentaire',
      popular: true,
      color: 'border-poste-yellow ring-2 ring-poste-yellow'
    },
    {
      name: 'Entreprise',
      description: 'Pour les grandes organisations',
      price: '499',
      period: 'par mois',
      features: [
        'Lettres illimitées',
        'Gestion multi-utilisateurs',
        'API complète',
        'Support dédié 24/7',
        'SLA garanti',
        'Formation équipe',
        'Rapports personnalisés'
      ],
      payPerUse: 'Pas de frais supplémentaires',
      popular: false,
      color: 'border-poste-blue'
    }
  ];

  const additionalServices = [
    { name: 'Lettre Express (24h)', price: '+20 DH' },
    { name: 'Assurance documents', price: '+15 DH' },
    { name: 'Notification SMS', price: '+5 DH' },
    { name: 'Archivage longue durée', price: '+10 DH/an' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-poste-blue to-poste-blue-light text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('pricing.title')}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Des tarifs transparents et adaptés à vos besoins d'envoi de lettres recommandées
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${plan.color}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-poste-yellow text-poste-blue px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Recommandé
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    
                    <div className="py-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-poste-blue">{plan.price}</span>
                        {plan.price !== '0' && <span className="text-sm text-gray-500 ml-1">DH</span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{plan.period}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-gray-50 p-3 rounded-lg mb-6">
                      <p className="text-xs text-gray-600 font-medium">Tarif par lettre supplémentaire:</p>
                      <p className="text-sm font-semibold text-poste-blue">{plan.payPerUse}</p>
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-poste-blue hover:bg-poste-blue-light' : 'bg-gray-800 hover:bg-gray-700'}`}
                      size="lg"
                    >
                      {plan.price === '0' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-poste-blue mb-4">
                  Services complémentaires
                </h2>
                <p className="text-gray-600">
                  Personnalisez vos envois avec nos options supplémentaires
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-poste-blue" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <span className="font-bold text-poste-blue">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-poste-blue mb-12">
                Questions fréquentes
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Comment fonctionne la facturation ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      La facturation est mensuelle et basée sur votre plan choisi. Les lettres supplémentaires sont facturées selon le tarif de votre plan.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Puis-je changer de plan à tout moment ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prendront effet lors du prochain cycle de facturation.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Y a-t-il des frais cachés ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Non, tous nos tarifs sont transparents. Seuls les services complémentaires optionnels peuvent générer des frais supplémentaires.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-poste-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à choisir votre plan ?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Commencez dès aujourd'hui avec notre plan gratuit ou contactez-nous pour un plan personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-poste-yellow text-poste-blue hover:bg-poste-yellow/90">
                Commencer gratuitement
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-poste-blue">
                Contactez-nous
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
