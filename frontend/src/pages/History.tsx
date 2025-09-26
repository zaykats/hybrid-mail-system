
import React, { useState } from 'react';
import { FileText, Eye, Download, Calendar, MapPin, Clock, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface Letter {
  id: string;
  object: string;
  recipient: string;
  city: string;
  status: 'sent' | 'processing' | 'delivered' | 'error';
  date: string;
  trackingCode: string;
  cost: number;
}

const History = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Données d'exemple
  const letters: Letter[] = [
    {
      id: '1',
      object: 'Demande de congé',
      recipient: 'Direction RH - Société ABC',
      city: 'Casablanca',
      status: 'delivered',
      date: '2024-01-15',
      trackingCode: 'LRH2024001',
      cost: 25
    },
    {
      id: '2',
      object: 'Réclamation facture',
      recipient: 'Service Client - Maroc Telecom',
      city: 'Rabat',
      status: 'processing',
      date: '2024-01-20',
      trackingCode: 'LRH2024002',
      cost: 25
    },
    {
      id: '3',
      object: 'Résiliation contrat',
      recipient: 'M. Ahmed Bennani',
      city: 'Marrakech',
      status: 'sent',
      date: '2024-01-22',
      trackingCode: 'LRH2024003',
      cost: 25
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Livrée</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'sent':
        return <Badge className="bg-yellow-100 text-yellow-800">Envoyée</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erreur</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const filteredLetters = letters.filter((letter) => {
    const matchesSearch = letter.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         letter.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || letter.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-têtes */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-poste-blue mb-2">
              Historique des lettres
            </h1>
            <p className="text-gray-600">
              Consultez toutes vos lettres recommandées envoyées
            </p>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Rechercher par objet ou destinataire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="sent">Envoyée</SelectItem>
                      <SelectItem value="processing">En cours</SelectItem>
                      <SelectItem value="delivered">Livrée</SelectItem>
                      <SelectItem value="error">Erreur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les périodes</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                      <SelectItem value="year">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des lettres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lettres envoyées ({filteredLetters.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code de suivi</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead>Destinataire</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Coût</TableHead>
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
                      <TableCell>{letter.recipient}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {letter.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(letter.date).toLocaleDateString('fr-FR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(letter.status)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {letter.cost} DH
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
