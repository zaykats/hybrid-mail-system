
// import React, { useState, useRef, useEffect } from 'react';
// import { Mic, MicOff, Square, Play, Pause, RotateCcw } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';

// interface VoiceRecorderProps {
//   onTranscription: (text: string) => void;
//   isActive: boolean;
//   onToggle: () => void;
// }

// const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription, isActive, onToggle }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [isTranscribing, setIsTranscribing] = useState(false);
  
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;
      
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
      
//       const chunks: BlobPart[] = [];
      
//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };
      
//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'audio/wav' });
//         setAudioBlob(blob);
        
//         // Simulation de transcription
//         simulateTranscription(blob);
//       };
      
//       mediaRecorder.start();
//       setIsRecording(true);
//       setRecordingTime(0);
      
//       // Timer pour le temps d'enregistrement
//       timerRef.current = setInterval(() => {
//         setRecordingTime(prev => prev + 1);
//       }, 1000);
      
//     } catch (error) {
//       console.error('Erreur lors de l\'accès au microphone:', error);
//       alert('Impossible d\'accéder au microphone. Vérifiez les permissions.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
      
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
      
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     }
//   };

//   const simulateTranscription = async (blob: Blob) => {
//     setIsTranscribing(true);
    
//     // Simulation d'une transcription (remplacer par un vrai service)
//     setTimeout(() => {
//       const sampleTranscription = "Madame, Monsieur, Je vous écris pour vous faire part de ma demande de congé annuel. Je souhaiterais prendre mes vacances du 15 au 30 juillet 2024. J'ai organisé mon travail en conséquence et je reste à votre disposition pour tout complément d'information. Cordialement.";
//       onTranscription(sampleTranscription);
//       setIsTranscribing(false);
//     }, 2000);
//   };

//   const playRecording = () => {
//     if (audioBlob && !isPlaying) {
//       const audio = new Audio(URL.createObjectURL(audioBlob));
//       audioRef.current = audio;
      
//       audio.onended = () => setIsPlaying(false);
//       audio.play();
//       setIsPlaying(true);
//     }
//   };

//   const pausePlayback = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const resetRecording = () => {
//     setAudioBlob(null);
//     setRecordingTime(0);
//     setIsPlaying(false);
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (!isActive) return null;
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  isActive: boolean;
  onToggle: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription, isActive, onToggle }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus', // ✅ Better format: smaller & clearer
      });
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' }); // ✅ Match format
        setAudioBlob(blob);
        transcribeAudio(blob); // 🔁 Send to backend
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de l'accès au microphone:", error);
      alert('Impossible d’accéder au microphone. Vérifiez les permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  // 🔁 Transcription via FastAPI backend
  const transcribeAudio = async (blob: Blob) => {
    setIsTranscribing(true);

    try {
      const formData = new FormData();
      formData.append('file', blob, 'recording.opus'); // ✅ Use .opus extension

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/v1/transcribe/`,
        {
          method: 'POST',
          body: formData,
          // No need to set Content-Type — fetch does it automatically with boundary
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Transcription failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      // ✅ Fix: Use 'transcription' (what your backend returns), not 'transcribed_text'
      if (data.transcription) {
        onTranscription(data.transcription.trim());
      } else {
        throw new Error('No transcription in response');
      }
    } catch (error) {
      console.error('Erreur pendant la transcription :', error);
      onTranscription('Erreur : Échec de la transcription.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) return null;

  return (
    <Card className="mt-4 border-green-200">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="text-lg font-medium text-green-700">
            Enregistrement vocal
          </div>
          
          {/* Indicateur de temps */}
          <div className="text-2xl font-mono text-green-600">
            {formatTime(recordingTime)}
          </div>
          
          {/* Contrôles d'enregistrement */}
          <div className="flex justify-center gap-3">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16"
              >
                <Mic className="h-6 w-6" />
              </Button>
            )}
            
            {isRecording && (
              <Button
                onClick={stopRecording}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16"
              >
                <Square className="h-6 w-6" />
              </Button>
            )}
            
            {audioBlob && !isRecording && (
              <>
                <Button
                  onClick={isPlaying ? pausePlayback : playRecording}
                  variant="outline"
                  className="rounded-full w-12 h-12"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button
                  onClick={resetRecording}
                  variant="outline"
                  className="rounded-full w-12 h-12"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
          
          {/* Statut de transcription */}
          {isTranscribing && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Transcription en cours...</p>
              <Progress value={66} className="w-full max-w-xs mx-auto" />
            </div>
          )}
          
          {/* Instructions */}
          <p className="text-sm text-gray-500">
            {!audioBlob && !isRecording && "Cliquez sur le microphone pour commencer l'enregistrement"}
            {isRecording && "Parlez clairement, cliquez sur stop quand vous avez terminé"}
            {audioBlob && !isTranscribing && "Enregistrement terminé, transcription disponible"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
