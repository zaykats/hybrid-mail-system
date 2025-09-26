
import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin, Clock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
  icon: React.ElementType;
}

interface TrackingInfo {
  trackingCode: string;
  object: string;
  recipient: string;
  sender: string;
  currentStatus: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}

const Tracking = () => {
  const { t } = useLanguage();
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Données d'exemple pour le suivi
  const mockTrackingData: TrackingInfo = {
    trackingCode: 'LRH2024001',
    object: 'Demande de congé',
    recipient: 'Direction RH - Société ABC',
    sender: 'Mohamed Alami',
    currentStatus: 'delivered',
    estimatedDelivery: '2024-01-16',
    events: [
      {
        date: '2024-01-16',
        time: '14:30',
        status: 'delivered',
        location: 'Casablanca Centre',
        description: 'Lettre livrée et signée par le destinataire',
        icon: CheckCircle
      },
      {
        date: '2024-01-16',
        time: '09:15',
        status: 'out_for_delivery',
        location: 'Casablanca Centre',
        description: 'En cours de livraison',
        icon: Truck
      },
      {
        date: '2024-01-15',
        time: '16:45',
        status: 'processing',
        location: 'Centre de tri Casablanca',
        description: 'Lettre prise en charge par le centre postal',
        icon: Package
      },
      {
        date: '2024-01-15',
        time: '10:00',
        status: 'sent',
        location: 'LRH Plateforme',
        description: 'Lettre créée et envoyée pour traitement',
        icon: Package
      }
    ]
  };

  const handleTrackingSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Veuillez saisir un code de suivi');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation d'une recherche
    setTimeout(() => {
      if (trackingCode === 'LRH2024001') {
        setTrackingResult(mockTrackingData);
      } else {
        setError('Code de suivi introuvable. Vérifiez votre code et réessayez.');
        setTrackingResult(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Livrée</Badge>;
      case 'out_for_delivery':
        return <Badge className="bg-blue-100 text-blue-800">En livraison</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">En traitement</Badge>;
      case 'sent':
        return <Badge className="bg-gray-100 text-gray-800">Envoyée</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'out_for_delivery':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'sent':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* En-tête */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-poste-blue mb-2">
              Suivi de lettre recommandée
            </h1>
            <p className="text-gray-600">
              Entrez votre code de suivi pour connaître le statut de votre lettre
            </p>
          </div>

          {/* Formulaire de recherche */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Rechercher une lettre
              </CardTitle>
              <CardDescription>
                Le code de suivi vous a été envoyé par email après l'envoi de votre lettre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Ex: LRH2024001"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
                />
                <Button 
                  onClick={handleTrackingSearch}
                  disabled={isLoading}
                  className="bg-poste-blue hover:bg-poste-blue-light"
                >
                  {isLoading ? 'Recherche...' : 'Suivre'}
                </Button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Résultats du suivi */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Détails de la lettre</span>
                    {getStatusBadge(trackingResult.currentStatus)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Code de suivi</label>
                        <p className="font-mono text-lg">{trackingResult.trackingCode}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Objet</label>
                        <p>{trackingResult.object}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Destinataire</label>
                        <p>{trackingResult.recipient}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Expéditeur</label>
                        <p>{trackingResult.sender}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historique de suivi */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Historique de suivi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.events.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                          <event.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{event.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {event.date} à {event.time}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conseils */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900 mb-1">Informations utiles</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Le destinataire doit présenter sa CIN lors de la réception</li>
                        <li>• Vous recevrez une notification par email à chaque changement de statut</li>
                        <li>• En cas de problème, contactez notre service client avec votre code de suivi</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tracking;
