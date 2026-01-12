import type { KorpResponse, ApiParams } from '../types';

export const KORP_BASE_URL = 'https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi';

/**
 * Build search URL for the Korp API
 */
export function buildApiUrl(base: string, params: ApiParams): URL {
  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url;
}

/**
 * Options for searching a single corpus
 */
export interface KorpSearchOptions {
  corpus: string;
  query: string;
  start?: number;
  end?: number;
  cut?: number;
}

/**
 * Search a single corpus in the Korp API
 * @throws Error if the search fails
 */
export async function searchKorpus(options: KorpSearchOptions): Promise<KorpResponse> {
  const { corpus, query, start = 0, end = 100, cut = 20 } = options;

  const params: ApiParams = {
    command: 'query',
    defaultcontext: '1 sentence',
    defaultwithin: 'sentence',
    show: 'sentence',
    start,
    end,
    cut,
    sort: 'random',
    corpus,
    cqp: query,
  };

  const apiUrl = buildApiUrl(KORP_BASE_URL, params);

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Search failed for ${corpus}: ${response.status}`);
  }

  return response.json();
}
