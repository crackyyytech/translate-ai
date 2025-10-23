'use client';

import { useState, useRef, useCallback } from 'react';

export const useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    setAudioDataUri(reader.result as string);
                };
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setAudioDataUri(null); // Clear previous recording
        } catch (err) {
            console.error("Error starting recording:", err);
            // Handle permissions error gracefully in the UI. The main component will use toast.
            throw new Error("Microphone access was denied. Please allow microphone access in your browser settings.");
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            streamRef.current?.getTracks().forEach(track => track.stop()); // Stop the mic access
            setIsRecording(false);
        }
    }, [isRecording]);
    
    // For voice visualizer
    const getAnalyserNode = useCallback(() => {
        if (!streamRef.current || !audioContextRef.current) return null;
        const audioContext = audioContextRef.current;
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(streamRef.current);
        source.connect(analyser);
        return analyser;
    }, []);

    return { isRecording, startRecording, stopRecording, audioDataUri, getAnalyserNode };
};
