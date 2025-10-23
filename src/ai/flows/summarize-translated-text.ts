'use server';

/**
 * @fileOverview Summarizes transcribed text in both Tamil and the selected translated language.
 *
 * - summarizeTranslatedText - A function that generates concise summaries.
 * - SummarizeTranslatedTextInput - The input type for the summarizeTranslatedText function.
 * - SummarizeTranslatedTextOutput - The return type for the summarizeTranslatedText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTranslatedTextInputSchema = z.object({
  tamilText: z.string().describe('The original transcribed text in Tamil.'),
  translatedText: z.string().describe('The translated text in the selected language.'),
  language: z.string().describe('The language the text was translated to.')
});
export type SummarizeTranslatedTextInput = z.infer<
  typeof SummarizeTranslatedTextInputSchema
>;

const SummarizeTranslatedTextOutputSchema = z.object({
  tamilSummary: z.string().describe('A concise summary of the text in Tamil.'),
  translatedSummary: z.string().describe('A concise summary of the text in the selected language.'),
  progress: z.string().optional().describe('Shows the progress of the summary generation.')
});
export type SummarizeTranslatedTextOutput = z.infer<
  typeof SummarizeTranslatedTextOutputSchema
>;

export async function summarizeTranslatedText(
  input: SummarizeTranslatedTextInput
): Promise<SummarizeTranslatedTextOutput> {
  return summarizeTranslatedTextFlow(input);
}

const summarizeTranslatedTextPrompt = ai.definePrompt({
  name: 'summarizeTranslatedTextPrompt',
  input: {schema: SummarizeTranslatedTextInputSchema},
  output: {schema: SummarizeTranslatedTextOutputSchema},
  prompt: `You are an expert summarizer. Please provide concise summaries of the following text in both Tamil and {{{language}}}.\n\nTamil Text: {{{tamilText}}}\n\nTranslated Text (in {{{language}}}): {{{translatedText}}}\n\nEnsure that the summaries accurately capture the main points and context of the original texts.\n\nOutput the Tamil Summary in the tamilSummary field and the {{{language}}} summary in the translatedSummary field. Also add one short, one-sentence summary of what you have generated to the 'progress' field in the output.`,
});

const summarizeTranslatedTextFlow = ai.defineFlow(
  {
    name: 'summarizeTranslatedTextFlow',
    inputSchema: SummarizeTranslatedTextInputSchema,
    outputSchema: SummarizeTranslatedTextOutputSchema,
  },
  async input => {
    const {output} = await summarizeTranslatedTextPrompt(input);
    return {
      ...output,
      progress: 'Generated Tamil and translated text summaries.',
    } as SummarizeTranslatedTextOutput;
  }
);
