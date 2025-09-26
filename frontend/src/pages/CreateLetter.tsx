import React, { useState } from 'react';
import { Mic, Sparkles, FileText, User, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import VoiceRecorder from '@/components/letter/VoiceRecorder';
import AIGenerator from '@/components/letter/AIGenerator';
 
interface PersonInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface LetterData {
  model: string;
  object: string;
  content: string;
  recipient: PersonInfo;
  sender: PersonInfo;
}

const CreateLetter = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [activeWritingMethod, setActiveWritingMethod] = useState<'manual' | 'voice' | 'ai'>('manual');
  const [letterData, setLetterData] = useState<LetterData>({
    model: '',
    object: '',
    content: '',
    recipient: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Maroc'
    },
    sender: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Maroc'
    }
  });

  const letterModels = [
    { value: 'formal', label: 'Lettre formelle' },
    { value: 'complaint', label: 'Réclamation' },
    { value: 'resignation', label: 'Démission' },
    { value: 'request', label: 'Demande' },
    { value: 'notification', label: 'Notification' },
    { value: 'legal', label: 'Lettre juridique' },
    { value: 'business', label: 'Correspondance professionnelle' },
    { value: 'personal', label: 'Lettre personnelle' }
  ];

  const handleInputChange = (field: string, value: string, section?: 'recipient' | 'sender') => {
    if (section) {
      setLetterData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setLetterData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleVoiceTranscription = (text: string) => {
    setLetterData(prev => ({ ...prev, content: text }));
  };

  const handleAIGeneration = (content: string) => {
    setLetterData(prev => ({ ...prev, content: content }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-poste-blue" />
                Choisir le type de lettre
              </CardTitle>
              <CardDescription>
                Sélectionnez le modèle qui correspond le mieux à votre besoin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="model">{t('letter.model')} *</Label>
                <Select value={letterData.model} onValueChange={(value) => handleInputChange('model', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un modèle de lettre" />
                  </SelectTrigger>
                  <SelectContent>
                    {letterModels.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="object">{t('letter.object')} *</Label>
                <Input
                  id="object"
                  value={letterData.object}
                  onChange={(e) => handleInputChange('object', e.target.value)}
                  placeholder="Ex: Demande de congé, Réclamation facture..."
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Aperçu du modèle sélectionné:</h4>
                <p className="text-sm text-gray-600">
                  {letterData.model ? 
                    letterModels.find(m => m.value === letterData.model)?.label :
                    'Sélectionnez un modèle pour voir l\'aperçu'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-poste-blue" />
                Rédiger le contenu
              </CardTitle>
              <CardDescription>
                Choisissez votre méthode de rédaction préférée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Writing Method Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={activeWritingMethod === 'manual' ? 'default' : 'outline'}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveWritingMethod('manual')}
                >
                  <FileText className="h-6 w-6 text-poste-blue" />
                  <span className="font-medium">Écrire manuellement</span>
                  <span className="text-xs text-gray-500">Saisie classique</span>
                </Button>

                <Button
                  variant={activeWritingMethod === 'voice' ? 'default' : 'outline'}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveWritingMethod('voice')}
                >
                  <Mic className="h-6 w-6 text-green-600" />
                  <span className="font-medium">{t('letter.writeWithAudio')}</span>
                  <span className="text-xs text-gray-500">Dictée vocale</span>
                </Button>

                <Button
                  variant={activeWritingMethod === 'ai' ? 'default' : 'outline'}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveWritingMethod('ai')}
                >
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <span className="font-medium">{t('letter.generateWithAI')}</span>
                  <span className="text-xs text-gray-500">IA automatique</span>
                </Button>
              </div>

              {/* Content Textarea */}
              <div>
                <Label htmlFor="content">Contenu de la lettre *</Label>
                <Textarea
                  id="content"
                  value={letterData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Rédigez votre lettre ici ou utilisez les options ci-dessus..."
                  rows={12}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {letterData.content.length} caractères
                </p>
              </div>

              {/* Voice Recorder Component */}
              <VoiceRecorder
                isActive={activeWritingMethod === 'voice'}
                onTranscription={handleVoiceTranscription}
                onToggle={() => setActiveWritingMethod(activeWritingMethod === 'voice' ? 'manual' : 'voice')}
              />

              {/* AI Generator Component */}
              <AIGenerator
                isActive={activeWritingMethod === 'ai'}
                onGenerated={handleAIGeneration}
                letterModel={letterData.model}
                letterObject={letterData.object}
              />

              {/* AI Suggestions (if AI mode is active) */}
              {activeWritingMethod === 'manual' && letterData.model && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Suggestions IA</h4>
                  <p className="text-sm text-blue-700">
                    Basé sur votre modèle "{letterModels.find(m => m.value === letterData.model)?.label}", 
                    voici quelques phrases d'accroche suggérées...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-poste-blue" />
                Informations du destinataire
              </CardTitle>
              <CardDescription>
                Renseignez les coordonnées de la personne qui recevra la lettre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipient-name">Nom complet *</Label>
                  <Input
                    id="recipient-name"
                    value={letterData.recipient.name}
                    onChange={(e) => handleInputChange('name', e.target.value, 'recipient')}
                    placeholder="Nom et prénom du destinataire"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="recipient-address">Adresse *</Label>
                  <Input
                    id="recipient-address"
                    value={letterData.recipient.address}
                    onChange={(e) => handleInputChange('address', e.target.value, 'recipient')}
                    placeholder="Rue, numéro, appartement..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="recipient-city">Ville *</Label>
                  <Input
                    id="recipient-city"
                    value={letterData.recipient.city}
                    onChange={(e) => handleInputChange('city', e.target.value, 'recipient')}
                    placeholder="Ville"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="recipient-postal">Code postal *</Label>
                  <Input
                    id="recipient-postal"
                    value={letterData.recipient.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value, 'recipient')}
                    placeholder="Code postal"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="recipient-country">Pays</Label>
                  <Input
                    id="recipient-country"
                    value={letterData.recipient.country}
                    onChange={(e) => handleInputChange('country', e.target.value, 'recipient')}
                    placeholder="Pays"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-poste-blue" />
                Récapitulatif et envoi
              </CardTitle>
              <CardDescription>
                Vérifiez toutes les informations avant l'envoi de votre lettre recommandée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-poste-blue">Détails de la lettre</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Modèle:</strong> {letterModels.find(m => m.value === letterData.model)?.label}</p>
                    <p><strong>Objet:</strong> {letterData.object}</p>
                    <p><strong>Contenu:</strong> {letterData.content.length} caractères</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-poste-blue">Destinataire</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                    <p className="font-medium">{letterData.recipient.name}</p>
                    <p>{letterData.recipient.address}</p>
                    <p>{letterData.recipient.postalCode} {letterData.recipient.city}</p>
                    <p>{letterData.recipient.country}</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-poste-blue mb-4">Tarification</h3>
                <div className="bg-poste-yellow/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Lettre recommandée standard</span>
                    <span className="font-bold">25 DH</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Frais de service</span>
                    <span>Inclus</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="text-poste-blue">25 DH</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-poste-blue hover:bg-poste-blue-light"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer la lettre
                </Button>
                <Button variant="outline" size="lg">
                  Sauvegarder comme brouillon
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header  />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= stepNumber ? 'bg-poste-blue text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <ChevronRight className={`h-5 w-5 ${
                      step > stepNumber ? 'text-poste-blue' : 'text-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-poste-blue font-medium' : 'text-gray-500'}>Type</span>
              <span className={step >= 2 ? 'text-poste-blue font-medium' : 'text-gray-500'}>Contenu</span>
              <span className={step >= 3 ? 'text-poste-blue font-medium' : 'text-gray-500'}>Destinataire</span>
              <span className={step >= 4 ? 'text-poste-blue font-medium' : 'text-gray-500'}>Envoi</span>
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              Précédent
            </Button>
            
            {step < 4 ? (
              <Button 
                onClick={handleNextStep}
                className="bg-poste-blue hover:bg-poste-blue-light"
              >
                Suivant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateLetter;




   {/* <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4 text-poste-blue">Vos informations (expéditeur)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sender-name">Votre nom complet *</Label>
                    <Input
                      id="sender-name"
                      value={letterData.sender.name}
                      onChange={(e) => handleInputChange('name', e.target.value, 'sender')}
                      placeholder="Votre nom et prénom"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sender-address">Votre adresse *</Label>
                    <Input
                      id="sender-address"
                      value={letterData.sender.address}
                      onChange={(e) => handleInputChange('address', e.target.value, 'sender')}
                      placeholder="Votre adresse complète"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="sender-city">Votre ville *</Label>
                    <Input
                      id="sender-city"
                      value={letterData.sender.city}
                      onChange={(e) => handleInputChange('city', e.target.value, 'sender')}
                      placeholder="Ville"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sender-postal">Code postal *</Label>
                    <Input
                      id="sender-postal"
                      value={letterData.sender.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value, 'sender')}
                      placeholder="Code postal"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sender-country">Pays</Label>
                    <Input
                      id="sender-country"
                      value={letterData.sender.country}
                      onChange={(e) => handleInputChange('country', e.target.value, 'sender')}
                      placeholder="Pays"
                    />
                  </div>
                </div>
              </div> */}
