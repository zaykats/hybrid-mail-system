
import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useClient } from '@/contexts/ClientContext'; 

interface AIGeneratorProps {
  onGenerated: (content: string) => void;
  isActive: boolean;
  letterModel: string;
  letterObject: string;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ 
  onGenerated, 
  isActive, 
  letterModel, 
  letterObject 
}) => {
  const { client, isAuthenticated } = useClient();
  const [tone, setTone] = useState('formal');
  const [length, setLength] = useState('medium');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const toneOptions = [
    { value: 'formal', label: 'Formel', description: 'Ton professionnel et respectueux' },
    { value: 'friendly', label: 'Amical', description: 'Ton chaleureux mais poli' },
    { value: 'firm', label: 'Ferme', description: 'Ton assertif pour les réclamations' },
    { value: 'diplomatic', label: 'Diplomatique', description: 'Ton nuancé pour les situations délicates' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Courte', description: '100-200 mots' },
    { value: 'medium', label: 'Moyenne', description: '200-400 mots' },
    { value: 'long', label: 'Longue', description: '400-600 mots' }
  ];


// const generateContent = async () => {
//   setIsGenerating(true);
//   setGeneratedContent('');

//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/lettres/generate`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         prompt: `${letterObject}\n${additionalInfo}`,
//         tone,
//         length, 
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Échec de la génération de la lettre');
//     }

//     const data = await response.json();
//     setGeneratedContent(data.generated_letter);
//   } catch (error) {
//     console.error("Erreur lors de la génération :", error);
//     setGeneratedContent("Erreur lors de la génération de la lettre.");
//   } finally {
//     setIsGenerating(false);
//   }
// };
const generateContent = async () => {
  if (!client) {
    console.error("Client info not available");
    return;
  }

  setIsGenerating(true);
  setGeneratedContent('');

  try {
    const response = await fetch(
       `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/v1/lettres/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${letterObject}\n${additionalInfo}`, // main prompt text
          tone,
          length,
          client: {
            name: client.name || '',
            address: client.address || '',
            city: client.city || '',
            postalCode: client.postalCode || '',
            country: client.country || '',
            email: client.email || '',
            telephone: client.telephone || '',
            identifiantclient: client.identifiantclient || '',
            id: client.id || '',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Échec de la génération de la lettre');
    }

    const data = await response.json();
    setGeneratedContent(data.generated_letter);
  } catch (error) {
    console.error("Erreur lors de la génération :", error);
    setGeneratedContent("Erreur lors de la génération de la lettre.");
  } finally {
    setIsGenerating(false);
  }
};



  const copyToEditor = () => {
    onGenerated(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const regenerate = () => {
    generateContent();
  };

  if (!isActive) return null;

  return (
    <Card className="mt-4 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Sparkles className="h-5 w-5" />
          Génération automatique par IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuration de la génération */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tone">Ton de la lettre</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="length">Longueur souhaitée</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lengthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Informations additionnelles */}
        <div>
          <Label htmlFor="additional-info">Informations complémentaires (optionnel)</Label>
          <Textarea
            id="additional-info"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Ajoutez des détails spécifiques, dates, références, contexte..."
            rows={3}
            className="mt-1"
          />
        </div>

        {/* Bouton de génération */}
        <Button
          onClick={generateContent}
          disabled={isGenerating}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Générer la lettre
            </>
          )}
        </Button>

        {/* Contenu généré */}
        {generatedContent && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-purple-100 text-purple-800">
                Contenu généré par IA
              </Badge>
              <div className="flex gap-2">
                <Button
                  onClick={regenerate}
                  variant="outline"
                  size="sm"
                  disabled={isGenerating}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Régénérer
                </Button>
                <Button
                  onClick={copyToEditor}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Utiliser
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm font-sans">
                {generatedContent}
              </pre>
            </div>
          </div>
        )}

        {/* Informations sur l'IA */}
        <div className="bg-purple-50 p-3 rounded-lg text-xs text-purple-700">
          <p className="font-medium mb-1">💡 Conseil :</p>
          <p>Plus vous donnez d'informations complémentaires, plus le contenu généré sera précis et adapté à votre situation.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIGenerator;
