
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, User, Phone, MapPin, Building, CreditCard, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'; // Adjust URL/port as needed

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    intitule: '',
    email: '',
    phone: '',
    ice: '', // Maps to identifiantclient
    address: '',
    city: '',
    clientType: '', // Maps to typeClient
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const cities = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tangier', 'Agadir', 
    'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'El Jadida'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.intitule ) {
      return 'intitule est requis';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Adresse e-mail valide requise';
    }
    if (!formData.phone || !/^(\+212|0)[5-7]\d{8}$/.test(formData.phone)) {
      return 'Numéro de téléphone marocain valide requis';
    }
    if (!formData.ice || formData.ice.length < 6) {
      return 'ICE valide requise';
    }
    if (!formData.address || !formData.city) {
      return 'Adresse complète requise';
    }
    if (!formData.clientType) {
      return 'Type de client requis';
    }
    if (!formData.password || formData.password.length < 8) {
      return 'Mot de passe d\'au moins 8 caractères requis';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Les mots de passe ne correspondent pas';
    }
    if (!formData.acceptTerms) {
      return 'Vous devez accepter les conditions d\'utilisation';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }




       const clientDataToSend = {
        // Combine firstName and lastName for the 'intitule' field
        // Adjust the format (e.g., "Nom Prénom" or "Prénom Nom") as preferred by your backend/business logic
        intitule: `${formData.intitule}`,
        adresse: `${formData.address}, ${formData.city}`, // Combine address and city
        ville: formData.city, // Send city separately as per the model
        telephone: formData.phone,
        email: formData.email,
        typeClient: formData.clientType, // Map clientType to typeClient
        identifiantclient: formData.ice, 
        password: formData.password,
        };
        
      const response = await fetch(`${API_BASE_URL}/api/v1/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if required (e.g., for token-based auth)
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(clientDataToSend),
      });
      // 3. Handle response
      if (response.ok) {
        // Success case (e.g., 200, 201)
        // const data = await response.json(); // If you need the returned client data
        toast({
          title: "Inscription réussie !",
          description: "Un mot de passe temporaire vous a été envoyé par SMS.", // Adjust message if needed
        });
        navigate('/login'); // Redirect to login
      } else {
        // Error case (non-2xx status)
        let errorMessage = `Erreur ${response.status}: Erreur lors de l'inscription`;
        try {
            const errorData = await response.json(); // Attempt to parse JSON error
            console.error("Backend error response:", errorData); // Log for debugging
            // Check for specific duplicate error from backend
            if (response.status === 400 && errorData.detail === "Client déjà existant avec ce CIN, téléphone ou email") {
                errorMessage = "Un client existe déjà avec ce CIN, téléphone ou email.";
            } else if (response.status === 400) {
                // Other 400 errors (potentially validation errors if backend validates)
                errorMessage = errorData.detail || "Données invalides fournies.";
            } else {
                // Other server errors
                errorMessage = `Erreur ${response.status}: ${errorData.detail || 'Erreur lors de l\'inscription'}`;
            }
        } catch (parseError) {
            // If parsing JSON fails, use status text or generic message
             console.error("Error parsing backend error response:", parseError);
             errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de l\'inscription'}`;
        }
        setError(errorMessage);
      }
    } catch (err) {
      // Handle network errors or unexpected issues
      console.error("Frontend fetch error:", err); // Log for debugging
      setError(err instanceof Error ? err.message : 'Erreur réseau ou serveur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };












  //     // Simulation de l'inscription
  //     console.log('Données d\'inscription:', formData);
      
  //     // Simulation d'une requête API
  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     toast({
  //       title: "Inscription réussie !",
  //       description: "Un mot de passe temporaire vous a été envoyé par SMS.",
  //     });

  //     // Redirection vers la page de connexion
  //     navigate('/login');
      
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-lg gradient-bg mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Rejoindre <span className="text-poste-blue">LRH</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Créez votre compte pour commencer à envoyer vos lettres
          </p>
        </div>

        {/* Formulaire */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Créer un compte</CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour créer votre compte LRH
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

              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="intitule">intitule *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="intitule"
                      name="intitule"
                      className="pl-10"
                      placeholder="intitule"
                      value={formData.intitule}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="pl-10"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      className="pl-10"
                      placeholder="+212 6XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ICE */}
              <div className="space-y-2">
                <Label htmlFor="ice">ICE *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="ice"
                    name="ice"
                    className="pl-10"
                    placeholder="Numéro ICE"
                    value={formData.ice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Adresse */}
              <div className="space-y-2">
                <Label htmlFor="address">Adresse *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    className="pl-10"
                    placeholder="Votre adresse complète"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Select onValueChange={(value) => handleSelectChange('city', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type de client */}
              <div className="space-y-2">
                <Label htmlFor="clientType">Type de client *</Label>
                <Select onValueChange={(value) => handleSelectChange('clientType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="particulier">Particulier</SelectItem>
                    <SelectItem value="entreprise">Entreprise</SelectItem>
                    <SelectItem value="ministere">Ministère</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mots de passe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                  }
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  J'accepte les{' '}
                  <Link to="/terms" className="text-poste-blue hover:underline">
                    conditions d'utilisation
                  </Link>
                  {' '}et la{' '}
                  <Link to="/privacy" className="text-poste-blue hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              {/* Bouton d'inscription */}
              <Button
                type="submit"
                className="w-full bg-poste-blue hover:bg-poste-blue-light"
                disabled={isLoading}
              >
                {isLoading ? 'Création du compte...' : 'Créer mon compte'}
              </Button>

              {/* Lien de connexion */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Déjà un compte ?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-poste-blue hover:text-poste-blue-light"
                  >
                    Se connecter
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
