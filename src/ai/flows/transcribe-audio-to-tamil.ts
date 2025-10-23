'use server';

/**
 * @fileOverview Transcribes audio (either from a recording or an uploaded file) into Tamil text.
 *
 * - transcribeAudioToTamil - A function that transcribes audio to Tamil text.
 * - TranscribeAudioToTamilInput - The input type for the transcribeAudioToTamil function.
 * - TranscribeAudioToTamilOutput - The return type for the transcribeAudioToTamil function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscribeAudioToTamilInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The audio data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TranscribeAudioToTamilInput = z.infer<typeof TranscribeAudioToTamilInputSchema>;

const TranscribeAudioToTamilOutputSchema = z.object({
  transcription: z.string().describe('The transcription of the audio in Tamil.'),
});
export type TranscribeAudioToTamilOutput = z.infer<typeof TranscribeAudioToTamilOutputSchema>;

export async function transcribeAudioToTamil(input: TranscribeAudioToTamilInput): Promise<TranscribeAudioToTamilOutput> {
  return transcribeAudioToTamilFlow(input);
}

const transcribeAudioToTamilPrompt = ai.definePrompt({
  name: 'transcribeAudioToTamilPrompt',
  input: {schema: TranscribeAudioToTamilInputSchema},
  output: {schema: TranscribeAudioToTamilOutputSchema},
  prompt: `Transcribe the following audio into Tamil text:\n\n{{media url=audioDataUri}}`,
  model: 'googleai/gemini-2.5-pro',
});

const transcribeAudioToTamilFlow = ai.defineFlow(
  {
    name: 'transcribeAudioToTamilFlow',
    inputSchema: TranscribeAudioToTamilInputSchema,
    outputSchema: TranscribeAudioToTamilOutputSchema,
  },
  async input => {
    const {output} = await transcribeAudioToTamilPrompt(input);
    return output!;
  }
);
