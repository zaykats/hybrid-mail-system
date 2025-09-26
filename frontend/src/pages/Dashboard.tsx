
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Mail,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClient } from '@/contexts/ClientContext'; 

const Dashboard = () => {
  // const user = {
  //   name: 'Ahmed Benali',
  //   email: 'ahmed.benali@email.com',
  //   type: 'Particulier'
  // };
  
const { client , isAuthenticated} = useClient();

  const recentLetters = [
    {
      id: 'LRH_20241210143022001_001',
      recipient: 'Marie Dubois',
      city: 'Casablanca',
      status: 'Livré',
      date: '2024-12-10',
      amount: '15.00 MAD'
    },
    {
      id: 'LRH_20241209120515002_002',
      recipient: 'Service des Impôts',
      city: 'Rabat',
      status: 'En transit',
      date: '2024-12-09',
      amount: '12.50 MAD'
    },
    {
      id: 'LRH_20241208094530003_003',
      recipient: 'Université Hassan II',
      city: 'Casablanca',
      status: 'Pris en charge',
      date: '2024-12-08',
      amount: '10.00 MAD'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Livré': { color: 'bg-green-500', text: 'text-white' },
      'En transit': { color: 'bg-blue-500', text: 'text-white' },
      'Pris en charge': { color: 'bg-yellow-500', text: 'text-white' },
      'Commande déclarée': { color: 'bg-gray-500', text: 'text-white' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Commande déclarée'];
    
    return (
      <Badge className={`${config.color} ${config.text} hover:${config.color}/80`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* En-tête du tableau de bord */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Bienvenue {client.name}, gérez vos envois et suivez vos lettres.
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-poste-yellow rounded-lg">
                  <Send className="h-6 w-6 text-poste-blue" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lettres envoyées</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Livrées</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions rapides */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-poste-blue" />
                  Actions rapides
                </CardTitle>
                <CardDescription>
                  Raccourcis vers les actions principales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/create-letter" className="block">
                  <Button className="w-full bg-poste-blue hover:bg-poste-blue-light">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une lettre
                  </Button>
                </Link>
                
                <Link to="/tracking" className="block">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Suivre un envoi
                  </Button>
                </Link>
                
                <Link to="/history" className="block">
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Voir l'historique
                  </Button>
                </Link>
                
                <Link to="/templates" className="block">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Modèles de lettres
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Lettres récentes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-poste-blue" />
                    Lettres récentes
                  </span>
                  <Link to="/history">
                    <Button variant="ghost" size="sm">
                      Voir tout
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>
                  Vos derniers envois et leur statut
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLetters.map((letter) => (
                    <div key={letter.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {letter.recipient}
                          </h4>
                          {getStatusBadge(letter.status)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>ID: {letter.id}</p>
                          <p>Destination: {letter.city} • {letter.date}</p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium text-gray-900">{letter.amount}</p>
                        <Link to={`/tracking/${letter.id}`} className="text-sm text-poste-blue hover:underline">
                          Suivre
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conseils et astuces */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-poste-blue">💡 Conseil du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Utilisez nos modèles prédéfinis pour gagner du temps lors de la rédaction de vos lettres administratives. 
                Vous pouvez les personnaliser selon vos besoins !
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
