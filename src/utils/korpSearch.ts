import type { KwicSummary, SearchOptions } from '../types';
import { searchKorpus } from '../api/korpApi';
import { extractSents } from './sentenceExtractor';

/**
 * Callback function called after each corpus fetch with incremental results
 */
export type OnProgressCallback = (results: KwicSummary[]) => void;

/**
 * Fetch sentences from multiple corpora with progressive updates
 * @param corpora - Array of corpus names to search
 * @param query - CQP query string
 * @param options - Search options (maxSents, minLength)
 * @param onProgress - Optional callback called after each corpus with accumulated results
 * @returns Array of sentence summaries from all corpora combined
 */
export async function fetchMultipleCorpora(
  corpora: string[],
  query: string,
  options: SearchOptions,
  onProgress?: OnProgressCallback
): Promise<KwicSummary[]> {
  const results: KwicSummary[] = [];
  const settings: SearchOptions = {
    minLength: options.minLength,
    maxSents: options.maxSents,
  };

  for (const corpus of corpora) {
    if (results.length >= options.maxSents) break;

    try {
      const data = await searchKorpus({ corpus, query });
      const extracted = extractSents(settings, data);

      // Enforce max sentence limit
      const remaining = options.maxSents - results.length;
      results.push(...extracted.slice(0, remaining));

      // Call progress callback with current accumulated results
      if (onProgress) {
        onProgress([...results]);
      }

    } catch (err) {
      console.error(`Error fetching from ${corpus}:`, err);
      // Continue to next corpus on error
    }
  }

  return results;
}
