
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Download, Eye, CheckCircle, Truck, 
  User, Calendar, MapPin, Search, Filter,
  LogOut, Settings, Bell, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AdminAuth {
  email: string;
  city: string;
  center: string;
  loginTime: string;
}

interface Letter {
  id: string;
  trackingCode: string;
  object: string;
  recipient: {
    name: string;
    address: string;
    city: string;
  };
  sender: {
    name: string;
    email: string;
  };
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  assignedCity: string;
  content: string;
  deliveryNote?: string;
  recipientCIN?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminAuth, setAdminAuth] = useState<AdminAuth | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [filteredLetters, setFilteredLetters] = useState<Letter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [deliveryData, setDeliveryData] = useState({
    recipientCIN: '',
    deliveryNote: ''
  });

  useEffect(() => {
    // Vérifier l'authentification
    const authData = localStorage.getItem('adminAuth');
    if (!authData) {
      navigate('/admin-login');
      return;
    }

    const parsedAuth = JSON.parse(authData);
    setAdminAuth(parsedAuth);

    // Charger les lettres pour cette zone
    loadLettersForZone(parsedAuth.city);
  }, [navigate]);

  useEffect(() => {
    // Filtrer les lettres
    const filtered = letters.filter(letter => {
      const matchesSearch = 
        letter.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || letter.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredLetters(filtered);
  }, [letters, searchTerm, statusFilter]);

  const loadLettersForZone = (city: string) => {
    // Simulation de données pour la zone
    const mockLetters: Letter[] = [
      {
        id: '1',
        trackingCode: 'LRH2024001',
        object: 'Demande de congé',
        recipient: {
          name: 'Direction RH - Société ABC',
          address: '123 Rue Hassan II',
          city: 'Casablanca'
        },
        sender: {
          name: 'Mohamed Alami',
          email: 'mohamed.alami@email.com'
        },
        status: 'pending',
        createdAt: '2024-01-20T10:00:00Z',
        assignedCity: city,
        content: 'Madame, Monsieur, Je vous écris pour...'
      },
      {
        id: '2',
        trackingCode: 'LRH2024002',
        object: 'Réclamation facture',
        recipient: {
          name: 'Service Client - Maroc Telecom',
          address: '456 Avenue Mohammed V',
          city: 'Casablanca'
        },
        sender: {
          name: 'Fatima Zahra',
          email: 'fatima.zahra@email.com'
        },
        status: 'processing',
        createdAt: '2024-01-21T14:30:00Z',
        assignedCity: city,
        content: 'Messieurs, Suite à votre facture...'
      }
    ];

    setLetters(mockLetters);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  const handleTakeCharge = (letterId: string) => {
    setLetters(prev => prev.map(letter => 
      letter.id === letterId 
        ? { ...letter, status: 'processing' as const }
        : letter
    ));
    
    // Ici, on enverrait normalement le code de suivi au client
    console.log('Code de suivi envoyé au client pour:', letterId);
  };

  const handleMarkAsDelivered = (letterId: string) => {
    if (!deliveryData.recipientCIN) {
      alert('Veuillez saisir la CIN du destinataire');
      return;
    }

    setLetters(prev => prev.map(letter => 
      letter.id === letterId 
        ? { 
            ...letter, 
            status: 'delivered' as const,
            recipientCIN: deliveryData.recipientCIN,
            deliveryNote: deliveryData.deliveryNote
          }
        : letter
    ));

    setDeliveryData({ recipientCIN: '', deliveryNote: '' });
    setSelectedLetter(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">À traiter</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'out_for_delivery':
        return <Badge className="bg-purple-100 text-purple-800">En livraison</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Livrée</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  if (!adminAuth) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête administrateur */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-poste-blue rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-poste-blue">LRH Admin</h1>
                <p className="text-sm text-gray-600">
                  {adminAuth.center} - {adminAuth.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-1" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Paramètres
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">À traiter</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {letters.filter(l => l.status === 'pending').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {letters.filter(l => l.status === 'processing').length}
                  </p>
                </div>
                <RefreshCw className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En livraison</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {letters.filter(l => l.status === 'out_for_delivery').length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Livrées</p>
                  <p className="text-2xl font-bold text-green-600">
                    {letters.filter(l => l.status === 'delivered').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Gestion des lettres recommandées</CardTitle>
            <CardDescription>
              Lettres assignées à votre zone : {adminAuth.city}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher par code, objet ou destinataire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">À traiter</SelectItem>
                  <SelectItem value="processing">En cours</SelectItem>
                  <SelectItem value="out_for_delivery">En livraison</SelectItem>
                  <SelectItem value="delivered">Livrées</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tableau des lettres */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code de suivi</TableHead>
                  <TableHead>Objet</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLetters.map((letter) => (
                  <TableRow key={letter.id}>
                    <TableCell className="font-mono text-sm">
                      {letter.trackingCode}
                    </TableCell>
                    <TableCell className="font-medium">
                      {letter.object}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{letter.recipient.name}</p>
                        <p className="text-sm text-gray-500">
                          {letter.recipient.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(letter.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(letter.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails de la lettre</DialogTitle>
                              <DialogDescription>
                                Code de suivi: {letter.trackingCode}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Expéditeur</Label>
                                  <p>{letter.sender.name}</p>
                                  <p className="text-sm text-gray-500">{letter.sender.email}</p>
                                </div>
                                <div>
                                  <Label>Destinataire</Label>
                                  <p>{letter.recipient.name}</p>
                                  <p className="text-sm text-gray-500">{letter.recipient.address}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Contenu de la lettre</Label>
                                <div className="bg-gray-50 p-4 rounded-lg mt-1">
                                  <p className="whitespace-pre-wrap">{letter.content}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>

                        {letter.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => handleTakeCharge(letter.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Prendre en charge
                          </Button>
                        )}

                        {letter.status === 'processing' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm"
                                onClick={() => setSelectedLetter(letter)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Marquer livrée
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmer la livraison</DialogTitle>
                                <DialogDescription>
                                  Lettre: {letter.trackingCode}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="cin">CIN du destinataire *</Label>
                                  <Input
                                    id="cin"
                                    value={deliveryData.recipientCIN}
                                    onChange={(e) => setDeliveryData(prev => ({
                                      ...prev,
                                      recipientCIN: e.target.value
                                    }))}
                                    placeholder="Ex: AB123456"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="note">Note de livraison (optionnel)</Label>
                                  <Textarea
                                    id="note"
                                    value={deliveryData.deliveryNote}
                                    onChange={(e) => setDeliveryData(prev => ({
                                      ...prev,
                                      deliveryNote: e.target.value
                                    }))}
                                    placeholder="Observations sur la livraison..."
                                  />
                                </div>
                                <Button 
                                  onClick={() => handleMarkAsDelivered(letter.id)}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                >
                                  Confirmer la livraison
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
