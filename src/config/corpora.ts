/**
 * Corpus configuration for Korp API searches
 */

export interface CorpusConfig {
  id: string;
  name: string;
  corpora: string;
}

/**
 * Available corpora for searching
 */
export const CORPORA = {
  YLE: {
    id: 'yle',
    name: 'Yle Uutiset',
    corpora: 'YLENEWS_FI_2021_S,YLENEWS_FI_2020_S,YLENEWS_FI_2019_S,YLENEWS_FI_2018_S,YLENEWS_FI_2017_S,YLENEWS_FI_2016_S,YLENEWS_FI_2015_S,YLENEWS_FI_2014_S,YLENEWS_FI_2013_S,YLENEWS_FI_2012_S,YLENEWS_FI_2011_S',
  },
  S24: {
    id: 's24',
    name: 'Suomi24.fi',
    corpora: 'S24_2017,S24_2018,S24_2019,S24_2020,S24_2021,S24_2022,S24_2023',
  },
} as const;

/**
 * Get the display name for a corpus string
 */
export function getCorpusName(corpusString: string): string {
  const corpus = Object.values(CORPORA).find(c => c.corpora === corpusString);
  return corpus?.name || '';
}

/**
 * Parse comma-separated corpus string into array
 */
export function parseCorpusString(corp: string): string[] {
  return corp.split(',').map(c => c.trim()).filter(Boolean);
}
