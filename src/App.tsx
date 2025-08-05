
import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import type { KorpResponse, KorpToken } from './types'

type ApiParams = {
  command: string
  defaultcontext: string
  defaultwithin: string
  show: string
  start: number
  end: number
  corpus: string
  cqp: string
}

const formatTokenElements = (tokens: string[]): string[] => {
  const noSpaceBefore = new Set(['.', ',', '!', '?', ';', ':', ')', ']', '}', '"']);
  const noSpaceAfter = new Set(['(', '[', '{', '"']);

  const elements: string[] = [];

  tokens.forEach((token, i) => {
    const prev = i > 0 ? tokens[i - 1] : '';
    const needsSpaceBefore =
      i > 0 && !noSpaceBefore.has(token) && !noSpaceAfter.has(prev);

    elements.push(needsSpaceBefore ? ` ${token}` : token);
;
  });
  console.log(elements)
  return elements;
};

// Component for displaying a single search result
type SentenceProps = { tokens: string[], start: number, end: number }
const Sentence = ({ tokens, start, end }: SentenceProps) => {
  const elements = formatTokenElements(tokens)
  const before = elements.slice(0, start);
  const bold = elements.slice(start, end);
  const after = elements.slice(end);

  return (
    <div className='w-4/5 max-w-3xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
      <p className='text-center'>
        {before.join('')}
        <strong>{bold.join('')}</strong>
        {after.join('')}
      </p>
    </div>
  )
}

// Build search url for the Korp API
function buildApiUrl(base: string, params: ApiParams): URL {
  const url = new URL(base)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  return url
}

function App() {
  const [sents, setSents] = useState<KwicSummary[]>([])

  // Extract array of search result sentences
  type KwicSummary = { start: number, end: number, tokens: string[] }
  
  function getS24Sents(data: KorpResponse): KwicSummary[] {
    const results: KwicSummary[] = data.kwic.map((kwicObj: Record<string, any>) => {
      const tokens: string[] = kwicObj.tokens.map((token: KorpToken) => token.word)
      const start: number = kwicObj.match.start
      const end: number = kwicObj.match.end
      return { start, end, tokens }
    })
    console.log(results)
    return results
  }

  async function fetchData(search: string): Promise<void> {
    // Set corpus base URL
    const corpus = "https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi"

    // Convert search string to valid CQP query
    const CQPsearch = search
      .trim()
      .split(/\s+/)
      .map(word => `[word = "${word}"]`)
      .join(' ')

    // Build params object
    const searchParams: ApiParams = {
      command: 'query',
      defaultcontext: '1 sentence',
      defaultwithin: 'sentence',
      show: 'sentence',
      start: 0,
      end: 5,
      corpus: 'S24',
      cqp: CQPsearch,
    }
    const apiUrl = buildApiUrl(corpus, searchParams)

    const response = await fetch(apiUrl)

    if (response.status === 200) {
      const data: KorpResponse = await response.json()
      console.log(data) //checking what I get
      setSents(getS24Sents(data))
    } else {
      alert('Search string not found')
    }
  }

  return (
    <div className='App flex flex-col '>
      <h1 className='text-3xl mt-5 mx-auto'>MiniKorp</h1>
      <Form fetchData={fetchData} />
      <div>
        {sents && sents.length > 0
          ? sents.map((sent: KwicSummary, idx: number) => (
              <Sentence key={idx} {...sent} />
            ))
          : <p>No sentences to display</p>
        }
      </div>
    </div>
  )
}

export default App