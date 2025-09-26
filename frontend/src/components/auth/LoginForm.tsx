
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClient } from "@/contexts/ClientContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'; // Adjust URL/port as needed

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setClient } = useClient(); 
  console.log("Logged in client:", setClient);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setError('');

//   if (!formData.email || !formData.password) {
//     setError('Veuillez remplir tous les champs');
//     setIsLoading(false);
//     return;
//   }

//   try {
//             const res = await fetch(`${API_BASE_URL}/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData)
//         });


//     if (!res.ok) {
//       const data = await res.json();
//       throw new Error(data.detail || 'Erreur de connexion');
//     }

//     const data = await res.json();
//     toast({
//       title: "Connexion réussie",
//       description: "Vous êtes maintenant connecté à LRH.",
//     });

//     console.log("Client ID:", data.client_id);
//     navigate("/dashboard");
//   } catch (err) {
//     setError(err instanceof Error ? err.message : 'Erreur inconnue');
//   } finally {
//     setIsLoading(false);
//   }
// };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Erreur de connexion');
      }

      const data = await res.json();

      const clientData = {
        name: data.client.intitule,
        address: data.client.adresse,
        city: data.client.ville,
        postalCode: data.client.postalCode,
        country: data.client.country,
        email: data.client.email,
        telephone: data.client.telephone,
        identifiantclient: data.client.identifiantclient,
        id:data.client.id
      };

      setClient(clientData);
      localStorage.setItem("clientId", data.client_id); // optional

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à LRH.",
      });

      console.log("Client ID:", data.client_id);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-lg gradient-bg mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Connexion à <span className="text-poste-blue">LRH</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Formulaire */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-poste-blue hover:text-poste-blue-light"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                className="w-full bg-poste-blue hover:bg-poste-blue-light"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>

              {/* Lien d'inscription */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-poste-blue hover:text-poste-blue-light"
                  >
                    Créer un compte
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Démo */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Ou{' '}
            <Link
              to="/demo"
              className="font-medium text-poste-blue hover:text-poste-blue-light"
            >
              découvrez notre démo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;




  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     // Simulation de l'authentification
  //     console.log('Tentative de connexion:', formData);
      
  //     // Validation simple
  //     if (!formData.email || !formData.password) {
  //       throw new Error('Veuillez remplir tous les champs');
  //     }

  //     // Simulation d'une requête API
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     // Simulation de succès
  //     toast({
  //       title: "Connexion réussie",
  //       description: "Vous êtes maintenant connecté à LRH.",
  //     });

  //     // Redirection vers le tableau de bord
  //     navigate('/dashboard');
      
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Erreur de connexion');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };