import type { KorpResponse, KorpToken, KwicSummary, KorpKwic, SearchOptions } from '../types';

/**
 * Extract search result tokens and start/end indexes from Korp API response
 * @param settings - User settings including minLength filter
 * @param data - Response from Korp API
 * @returns Array of sentence summaries with tokens and match positions
 */
export function extractSents(settings: SearchOptions, data: KorpResponse): KwicSummary[] {
  const results: KwicSummary[] = data.kwic.map((kwicObj: KorpKwic) => {
    const tokens = kwicObj.tokens.map((token: KorpToken) => token.word);
    const start = kwicObj.match.start;
    const end = kwicObj.match.end;
    return { start, end, tokens };
  });

  // Set minimum sentence length according to settings
  return results.filter(summary => summary.tokens.length >= settings.minLength);
}
