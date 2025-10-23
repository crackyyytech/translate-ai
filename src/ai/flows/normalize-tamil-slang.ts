'use server';

/**
 * @fileOverview A flow for normalizing Tamil slang into standard Tamil.
 *
 * - normalizeTamilSlang - A function that normalizes Tamil slang.
 * - NormalizeTamilSlangInput - The input type for the normalizeTamilSlang function.
 * - NormalizeTamilSlangOutput - The return type for the normalizeTamilSlang function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NormalizeTamilSlangInputSchema = z.object({
  tamilText: z.string().describe('The Tamil text containing slang to be normalized.'),
});
export type NormalizeTamilSlangInput = z.infer<typeof NormalizeTamilSlangInputSchema>;

const NormalizeTamilSlangOutputSchema = z.object({
  normalizedTamilText: z.string().describe('The normalized Tamil text in standard form.'),
});
export type NormalizeTamilSlangOutput = z.infer<typeof NormalizeTamilSlangOutputSchema>;

export async function normalizeTamilSlang(input: NormalizeTamilSlangInput): Promise<NormalizeTamilSlangOutput> {
  return normalizeTamilSlangFlow(input);
}

const prompt = ai.definePrompt({
  name: 'normalizeTamilSlangPrompt',
  input: {schema: NormalizeTamilSlangInputSchema},
  output: {schema: NormalizeTamilSlangOutputSchema},
  prompt: `You are an expert in Tamil language and dialects. Your task is to convert colloquial or slang Tamil into its standard, formal equivalent. The goal is to make the text easily understandable in formal contexts.

Original Tamil Text: {{{tamilText}}}

Normalized Tamil Text:`, // The LLM should provide the normalized text here
});

const normalizeTamilSlangFlow = ai.defineFlow(
  {
    name: 'normalizeTamilSlangFlow',
    inputSchema: NormalizeTamilSlangInputSchema,
    outputSchema: NormalizeTamilSlangOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
