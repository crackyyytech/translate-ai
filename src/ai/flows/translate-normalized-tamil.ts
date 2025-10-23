'use server';

/**
 * @fileOverview Translates normalized Tamil text into a specified language.
 *
 * - translateNormalizedTamil - A function that translates the normalized Tamil text.
 * - TranslateNormalizedTamilInput - The input type for the translateNormalizedTamil function.
 * - TranslateNormalizedTamilOutput - The return type for the translateNormalizedTamil function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateNormalizedTamilInputSchema = z.object({
  normalizedTamilText: z
    .string()
    .describe('The normalized Tamil text to translate.'),
  targetLanguage: z
    .string()
    .describe('The language to translate the Tamil text into (e.g., English, Spanish, French).'),
});
export type TranslateNormalizedTamilInput = z.infer<
  typeof TranslateNormalizedTamilInputSchema
>;

const TranslateNormalizedTamilOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
});
export type TranslateNormalizedTamilOutput = z.infer<
  typeof TranslateNormalizedTamilOutputSchema
>;

export async function translateNormalizedTamil(
  input: TranslateNormalizedTamilInput
): Promise<TranslateNormalizedTamilOutput> {
  return translateNormalizedTamilFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateNormalizedTamilPrompt',
  input: {schema: TranslateNormalizedTamilInputSchema},
  output: {schema: TranslateNormalizedTamilOutputSchema},
  prompt: `Translate the following Tamil text into {{{targetLanguage}}}.\n\nNormalized Tamil Text: {{{normalizedTamilText}}}`,
});

const translateNormalizedTamilFlow = ai.defineFlow(
  {
    name: 'translateNormalizedTamilFlow',
    inputSchema: TranslateNormalizedTamilInputSchema,
    outputSchema: TranslateNormalizedTamilOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
