import React, { useState, useEffect } from 'react';

interface ReportData {
  originalTranscription: string;
  normalizedTamil: string;
  translatedText: string;
  emotion: string;
  tamilSummary: string;
  translatedSummary:string;
  targetLanguage: string;
}

export const ReportTemplate = React.forwardRef<HTMLDivElement, { data: ReportData }>(({ data }, ref) => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleString());
    }, []);

    return (
        <div ref={ref}>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Translate ai Analysis Report</h1>
                <p className="text-sm text-gray-500">{currentDate}</p>
            </div>

            <div className="space-y-6 text-base">
                <div className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                    <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-2">Original Transcription (Tamil)</h2>
                    <p className="font-tamil whitespace-pre-wrap">{data.originalTranscription || 'No data provided.'}</p>
                </div>
                
                <div className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                    <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-2">Normalized Standard Tamil</h2>
                    <p className="font-tamil whitespace-pre-wrap">{data.normalizedTamil || 'No data provided.'}</p>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                    <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-2">Translation ({data.targetLanguage})</h2>
                    <p className="whitespace-pre-wrap">{data.translatedText || 'No data provided.'}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                        <h2 className="text-xl font-semibold mb-2">Emotion Tone</h2>
                        <p className="capitalize text-lg">{data.emotion || 'Not detected'}</p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                        <h2 className="text-xl font-semibold mb-2">Summary (Tamil)</h2>
                        <p className="font-tamil whitespace-pre-wrap">{data.tamilSummary || 'No data provided.'}</p>
                    </div>
                </div>
                 <div className="p-4 border border-gray-300 rounded-lg break-inside-avoid">
                    <h2 className="text-xl font-semibold mb-2">Summary ({data.targetLanguage})</h2>
                    <p className="whitespace-pre-wrap">{data.translatedSummary || 'No data provided.'}</p>
                </div>
            </div>
        </div>
    );
});

ReportTemplate.displayName = 'ReportTemplate';
