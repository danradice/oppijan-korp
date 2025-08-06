
import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import Sentence from './components/Sentence'
import type { KorpResponse, KorpToken, KwicSummary, ApiParams, KorpKwic } from './types'

// HELPER FUNCTIONS (in order of use)

// Build search url for the Korp API
function buildApiUrl(base: string, params: ApiParams): URL {
  const url = new URL(base)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  return url
}

// Extract search result tokens and start/end indexes
  function getS24Sents(data: KorpResponse): KwicSummary[] {
    const results: KwicSummary[] = data.kwic.map((kwicObj: KorpKwic) => {
      const tokens = kwicObj.tokens.map((token: KorpToken) => token.word)
      const start = kwicObj.match.start
      const end = kwicObj.match.end
      return { start, end, tokens }
    })
    console.log(results)
    return results
  }

function App() {
  const [sents, setSents] = useState<KwicSummary[]>([])

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