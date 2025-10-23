'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Angry,
  BrainCircuit,
  Frown,
  Meh,
  PlayCircle,
  Smile,
  Mic,
  Upload,
} from 'lucide-react';

import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { useToast } from '@/hooks/use-toast';
import { transcribeAudioToTamil } from '@/ai/flows/transcribe-audio-to-tamil';
import { normalizeTamilSlang } from '@/ai/flows/normalize-tamil-slang';
import { translateNormalizedTamil } from '@/ai/flows/translate-normalized-tamil';
import { detectEmotionTone } from '@/ai/flows/detect-emotion-tone';
import { summarizeTranslatedText } from '@/ai/flows/summarize-translated-text';

import AppHeader from '@/components/mozhi-genie/header';
import AnalysisPane from '@/components/mozhi-genie/analysis-pane';
import Loader from '@/components/mozhi-genie/loader';
import VoiceVisualizer from '@/components/mozhi-genie/voice-visualizer';
import { ReportTemplate } from '@/components/mozhi-genie/report-template';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TooltipProvider } from '@/components/ui/tooltip';

const processingSteps = [
  'Transcribing audio to Tamil...',
  'Normalizing Tamil slang...',
  'Translating to target language...',
  'Detecting emotional tone...',
  'Summarizing content...',
  'Finalizing results...',
];

const emotionIcons: { [key: string]: React.ReactNode } = {
  happy: <Smile className="text-green-400" />,
  sad: <Frown className="text-blue-400" />,
  angry: <Angry className="text-red-400" />,
  neutral: <Meh className="text-gray-400" />,
};

export default function Home() {
  const { toast } = useToast();
  const { isRecording, startRecording, stopRecording, audioDataUri, getAnalyserNode } = useAudioRecorder();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  
  const [originalTranscription, setOriginalTranscription] = useState('');
  const [normalizedTamil, setNormalizedTamil] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [tamilSummary, setTamilSummary] = useState('');
  const [translatedSummary, setTranslatedSummary] = useState('');
  
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRecording) {
      setAnalyserNode(getAnalyserNode());
    } else {
      setAnalyserNode(null);
    }
  }, [isRecording, getAnalyserNode]);

  const resetState = () => {
    setOriginalTranscription('');
    setNormalizedTamil('');
    setTranslatedText('');
    setEmotion('');
    setTamilSummary('');
    setTranslatedSummary('');
  };

  const runAiPipeline = useCallback(async (dataUri: string) => {
    resetState();
    setIsProcessing(true);

    try {
      setStatusText(processingSteps[0]);
      setProgress(10);
      const transcriptionResult = await transcribeAudioToTamil({ audioDataUri: dataUri });
      setOriginalTranscription(transcriptionResult.transcription);
      setProgress(25);
      
      setStatusText(processingSteps[1]);
      const normalizationResult = await normalizeTamilSlang({ tamilText: transcriptionResult.transcription });
      setNormalizedTamil(normalizationResult.normalizedTamilText);
      setProgress(45);
      
      setStatusText(processingSteps[2]);
      const translationResult = await translateNormalizedTamil({ normalizedTamilText: normalizationResult.normalizedTamilText, targetLanguage });
      setTranslatedText(translationResult.translatedText);
      setProgress(65);
      
      setStatusText(processingSteps[3]);
      const emotionResult = await detectEmotionTone({ text: translationResult.translatedText });
      setEmotion(emotionResult.emotion.toLowerCase());
      setProgress(80);

      setStatusText(processingSteps[4]);
      const summaryResult = await summarizeTranslatedText({
        tamilText: normalizationResult.normalizedTamilText,
        translatedText: translationResult.translatedText,
        language: targetLanguage,
      });
      setTamilSummary(summaryResult.tamilSummary);
      setTranslatedSummary(summaryResult.translatedSummary);
      setProgress(99);

      setStatusText(processingSteps[5]);
      setProgress(100);

    } catch (error) {
      console.error("AI pipeline error:", error);
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'Failed to process audio. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [targetLanguage, toast]);
  
  useEffect(() => {
    if (audioDataUri) {
      runAiPipeline(audioDataUri);
    }
  }, [audioDataUri, runAiPipeline]);

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      resetState();
      startRecording();
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      if (dataUri) {
        runAiPipeline(dataUri);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleDownload = () => {
    const printContents = reportRef.current?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
        const printWindow = window.open('', '_blank');
        printWindow?.document.write(`
            <html>
                <head>
                    <title>MozhiGenie Report</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap"
                      rel="stylesheet"
                    />
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        body { font-family: 'Inter', sans-serif; }
                        .font-tamil { font-family: 'PT Sans', serif; }
                        .break-inside-avoid { page-break-inside: avoid; }
                    </style>
                </head>
                <body class="p-8">${printContents}</body>
            </html>
        `);
        printWindow?.document.close();
        printWindow?.focus();
        setTimeout(() => {
            printWindow?.print();
            printWindow?.close();
        }, 500);
    }
  };

  const handleTTS = useCallback((text: string) => {
    if ('speechSynthesis' in window && text) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        // A simple mapping for demo purposes
        const langCode = { 'English': 'en-US', 'Spanish': 'es-ES', 'French': 'fr-FR', 'German': 'de-DE' }[targetLanguage];
        utterance.lang = langCode || 'en-US';
        window.speechSynthesis.speak(utterance);
    } else {
        toast({ title: 'Unsupported', description: 'Text-to-speech is not available or there is no text to speak.' });
    }
  }, [targetLanguage, toast]);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background">
        {isProcessing && <Loader progress={progress} statusText={statusText} />}
        <AppHeader
          isRecording={isRecording}
          isProcessing={isProcessing}
          onRecordClick={handleRecordClick}
          onFileUpload={handleFileUpload}
          onLanguageChange={setTargetLanguage}
          onDownload={handleDownload}
          targetLanguage={targetLanguage}
        />
        <main className="flex-grow p-4 flex flex-col gap-4 overflow-auto">
          <AnalysisPane title="Original Input">
            {isRecording && <VoiceVisualizer analyser={analyserNode} />}
            {!originalTranscription && !isRecording && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                <BrainCircuit size={48} className="mb-4" />
                <p>Click the <Mic className="inline-block h-4 w-4" /> button to start recording or <Upload className="inline-block h-4 w-4" /> to upload an audio file.</p>
                <p className="mt-2 text-sm">Your transcribed Tamil will appear here.</p>
              </div>
            )}
            {originalTranscription && <p className="font-tamil">{originalTranscription}</p>}
          </AnalysisPane>
          
          <AnalysisPane title="Normalized Tamil" fontClassName="font-tamil">
            {normalizedTamil || <p className="text-muted-foreground">Standard Tamil text will appear here after normalization.</p>}
          </AnalysisPane>
          
          <AnalysisPane 
            title={`Translation (${targetLanguage})`}
            actions={
              <>
                {emotion && emotionIcons[emotion]}
                <Button variant="ghost" size="icon" onClick={() => handleTTS(translatedText)} disabled={!translatedText} aria-label="Play translated text">
                  <PlayCircle />
                </Button>
              </>
            }
          >
            {translatedText || <p className="text-muted-foreground">Translated text will appear here.</p>}
            {(tamilSummary || translatedSummary) && (
                <Accordion type="single" collapsible className="mt-6 w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>View Summaries</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-1">Tamil Summary</h4>
                        <p className="font-tamil text-sm text-muted-foreground">{tamilSummary}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{targetLanguage} Summary</h4>
                        <p className="text-sm text-muted-foreground">{translatedSummary}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            )}
          </AnalysisPane>
        </main>

        <div className="hidden">
          <ReportTemplate ref={reportRef} data={{
            originalTranscription,
            normalizedTamil,
            translatedText,
            emotion,
            tamilSummary,
            translatedSummary,
            targetLanguage
          }} />
        </div>
      </div>
    </TooltipProvider>
  );
}
