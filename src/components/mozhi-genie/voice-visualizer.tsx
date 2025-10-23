'use client';

import { useEffect, useRef } from 'react';

const VoiceVisualizer = ({ analyser }: { analyser: AnalyserNode | null }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        if (!analyser || !canvasRef.current) {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');
                if (context) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
            }
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Retrieve HSL values from CSS custom properties
        const style = getComputedStyle(document.documentElement);
        const primaryColor = style.getPropertyValue('--primary').trim();
        const accentColor = style.getPropertyValue('--accent').trim();

        const draw = () => {
            animationFrameId.current = requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            context.clearRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;
            
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, `hsl(${accentColor})`);
            gradient.addColorStop(1, `hsl(${primaryColor})`);
            context.fillStyle = gradient;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        draw();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [analyser]);

    return <canvas ref={canvasRef} width="300" height="50" className="w-full h-12 rounded-lg" />;
};

export default VoiceVisualizer;
