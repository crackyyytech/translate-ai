'use client';

import {
    Mic,
    MicOff,
    Upload,
    Download,
    Settings,
    Languages,
    BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { supportedLanguages } from "@/lib/languages";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AppHeaderProps {
    isRecording: boolean;
    isProcessing: boolean;
    onRecordClick: () => void;
    onFileUpload: (file: File) => void;
    onLanguageChange: (lang: string) => void;
    onDownload: () => void;
    targetLanguage: string;
}

const AppHeader = ({
    isRecording,
    isProcessing,
    onRecordClick,
    onFileUpload,
    onLanguageChange,
    onDownload,
    targetLanguage,
}: AppHeaderProps) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">MozhiGenie</h1>
            </div>
            <div className="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onRecordClick}
                            disabled={isProcessing}
                            aria-label={isRecording ? "Stop recording" : "Start recording"}
                        >
                            {isRecording ? <MicOff className="text-destructive" /> : <Mic />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isRecording ? "Stop Recording" : "Start Recording"}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild disabled={isProcessing}>
                            <label htmlFor="audio-upload" className="cursor-pointer inline-flex items-center justify-center">
                                <Upload />
                                <input id="audio-upload" type="file" accept="audio/*" className="sr-only" onChange={handleFileChange} disabled={isProcessing} />
                            </label>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Upload Audio File</p>
                    </TooltipContent>
                </Tooltip>

                <div className="flex items-center gap-2">
                     <Languages className="h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={onLanguageChange} defaultValue={targetLanguage} disabled={isProcessing}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Translate to..." />
                        </SelectTrigger>
                        <SelectContent>
                            {supportedLanguages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="outline" size="icon" onClick={onDownload} disabled={isProcessing}>
                            <Download />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Download Report (PDF)</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    );
};

export default AppHeader;
