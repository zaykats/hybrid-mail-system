
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+212 5 37 71 90 00', '+212 5 37 71 90 01'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@lrh.ma', 'info@lrh.ma'],
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Avenue Mohammed V', 'Rabat, Maroc 10000'],
      color: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun - Ven: 8h - 18h', 'Sam: 9h - 13h'],
      color: 'text-purple-600'
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
              {t('contact.title')}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner et répondre à toutes vos questions
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <info.icon className={`h-6 w-6 ${info.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-poste-blue">
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Décrivez votre demande en détail..."
                        rows={5}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-poste-blue hover:bg-poste-blue-light"
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map and Additional Info */}
              <div className="space-y-6">
                {/* Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-poste-blue">
                      Notre localisation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>Carte interactive</p>
                        <p className="text-sm">Avenue Mohammed V, Rabat</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-poste-blue">
                      Questions fréquentes
                    </CardTitle>
                    <CardDescription>
                      Consultez nos réponses aux questions les plus courantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-left">
                      Comment suivre ma lettre ?
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Quels sont les délais de livraison ?
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Comment modifier mon adresse ?
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Problème de livraison
                    </Button>
                  </CardContent>
                </Card>

                {/* Support Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-poste-blue">
                      Support client
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Lundi - Vendredi</span>
                        <span className="text-gray-600">8h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Samedi</span>
                        <span className="text-gray-600">9h00 - 13h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dimanche</span>
                        <span className="text-gray-600">Fermé</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-poste-yellow/20 rounded-lg">
                      <p className="text-sm text-poste-blue font-medium">
                        Support d'urgence 24/7 disponible pour les clients Pro et Entreprise
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
