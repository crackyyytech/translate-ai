'use server';

/**
 * @fileOverview An AI agent that detects the emotion tone of a given text.
 *
 * - detectEmotionTone - A function that handles the emotion tone detection process.
 * - DetectEmotionToneInput - The input type for the detectEmotionTone function.
 * - DetectEmotionToneOutput - The return type for the detectEmotionTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectEmotionToneInputSchema = z.object({
  text: z.string().describe('The text to analyze for emotional tone.'),
});
export type DetectEmotionToneInput = z.infer<typeof DetectEmotionToneInputSchema>;

const DetectEmotionToneOutputSchema = z.object({
  emotion: z.string().describe('The detected emotion tone (e.g., happy, sad, angry, neutral).'),
});
export type DetectEmotionToneOutput = z.infer<typeof DetectEmotionToneOutputSchema>;

export async function detectEmotionTone(input: DetectEmotionToneInput): Promise<DetectEmotionToneOutput> {
  return detectEmotionToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectEmotionTonePrompt',
  input: {schema: DetectEmotionToneInputSchema},
  output: {schema: DetectEmotionToneOutputSchema},
  prompt: `Analyze the following text and identify the emotional tone.  Possible tones are: happy, sad, angry, neutral.  Return ONLY the identified tone.

Text: {{{text}}}`,
});

const detectEmotionToneFlow = ai.defineFlow(
  {
    name: 'detectEmotionToneFlow',
    inputSchema: DetectEmotionToneInputSchema,
    outputSchema: DetectEmotionToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
