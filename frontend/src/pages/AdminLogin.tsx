
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    city: '',
    center: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cities = [
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'rabat', label: 'Rabat' },
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'fes', label: 'Fès' },
    { value: 'tanger', label: 'Tanger' },
    { value: 'agadir', label: 'Agadir' }
  ];

  const centers = {
    casablanca: [
      { value: 'casa-centre', label: 'Casablanca Centre' },
      { value: 'casa-ain-sebaa', label: 'Casablanca Aïn Sebaâ' },
      { value: 'casa-hay-mohammadi', label: 'Casablanca Hay Mohammadi' }
    ],
    rabat: [
      { value: 'rabat-agdal', label: 'Rabat Agdal' },
      { value: 'rabat-hassan', label: 'Rabat Hassan' },
      { value: 'rabat-souissi', label: 'Rabat Souissi' }
    ],
    marrakech: [
      { value: 'marrakech-gueliz', label: 'Marrakech Guéliz' },
      { value: 'marrakech-medina', label: 'Marrakech Médina' }
    ]
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value,
      // Reset center when city changes
      ...(field === 'city' ? { center: '' } : {})
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password || !credentials.city || !credentials.center) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation d'authentification
    setTimeout(() => {
      // Vérification simple pour la démo
      if (credentials.email === 'admin@lrh.ma' && credentials.password === 'admin123') {
        // Stockage des informations de session
        localStorage.setItem('adminAuth', JSON.stringify({
          email: credentials.email,
          city: credentials.city,
          center: credentials.center,
          loginTime: new Date().toISOString()
        }));
        navigate('/admin-dashboard');
      } else {
        setError('Identifiants incorrects ou centre non autorisé');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-poste-blue rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-poste-blue">
            Espace Administrateur
          </CardTitle>
          <CardDescription>
            Accès réservé aux agents des centres postaux
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="agent@lrh.ma"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <Select value={credentials.city} onValueChange={(value) => handleInputChange('city', value)}>
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Sélectionnez votre ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="center">Centre postal</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <Select 
                  value={credentials.center} 
                  onValueChange={(value) => handleInputChange('center', value)}
                  disabled={!credentials.city}
                >
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Sélectionnez votre centre" />
                  </SelectTrigger>
                  <SelectContent>
                    {credentials.city && centers[credentials.city as keyof typeof centers]?.map((center) => (
                      <SelectItem key={center.value} value={center.value}>
                        {center.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-poste-blue hover:bg-poste-blue-light"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Accès réservé au personnel autorisé</p>
            <p className="mt-1">
              Problème de connexion ? 
              <a href="#" className="text-poste-blue hover:underline ml-1">
                Contactez le support
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
