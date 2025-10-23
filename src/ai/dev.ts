import { config } from 'dotenv';
config();

import '@/ai/flows/transcribe-audio-to-tamil.ts';
import '@/ai/flows/normalize-tamil-slang.ts';
import '@/ai/flows/translate-normalized-tamil.ts';
import '@/ai/flows/detect-emotion-tone.ts';
import '@/ai/flows/summarize-translated-text.ts';