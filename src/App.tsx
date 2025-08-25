import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import Sentence from './components/Sentence'
import SentenceBox from './components/SentenceBox'
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
    const tokens = kwicObj.tokens
      .map((token: KorpToken) => token.word)
    const start = kwicObj.match.start
    const end = kwicObj.match.end
    return { start, end, tokens }
  })
  // set minimum sentence length to 15 tokens
  return results.filter(summary => summary.tokens.length >= 10)
}

function App() {

  //State variable for storing retrieved sentences
  const [sents, setSents] = useState<KwicSummary[]>([])
  const [page, setPage] = useState(1)

  //Main API function. Retrieves requested search string from Korp API and stores result in 'sents'
  async function fetchData(search: string, corp: string): Promise<void> {
    // Set corpus base URL
    const korp = "https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi"

    // Set search corpus
    //const corpus = "YLENEWS_FI_2021_S,YLENEWS_FI_2020_S,YLENEWS_FI_2019_S,YLENEWS_FI_2018_S,YLENEWS_FI_2017_S,YLENEWS_FI_2016_S,YLENEWS_FI_2015_S,YLENEWS_FI_2014_S,YLENEWS_FI_2013_S,YLENEWS_FI_2012_S,YLENEWS_FI_2011_S"

    // Convert search string to valid CQP query
    const CQPsearch = search
      .trim()
      .replace(/^(\w)/, (match) => `(${match.toLowerCase()}|${match.toUpperCase()})`) //makes first word case neutral
      .split(/\s+/)
      .map(word => `[word = "${word}"]`) //required form for CQP query
      .join(' ')

    console.log(CQPsearch)

    // Build params object
    const searchParams: ApiParams = {
      command: 'query',
      defaultcontext: '1 sentence',
      defaultwithin: 'sentence',
      show: 'sentence',
      start: 0,
      end: 100,
      cut: 20,
      sort: 'random',
      corpus: corp,
      cqp: CQPsearch,
    }
    // Build URL
    const apiUrl = buildApiUrl(korp, searchParams)

    const response = await fetch(apiUrl)

    // Extract sentences, sort randomly and assign to setSents state variable
    if (response.status === 200) {
      const data: KorpResponse = await response.json()
      console.log(data)
      const extracted = getS24Sents(data)
      setSents(extracted)
    } else {
      alert('Search string not found')
    }
  }

  return (
    <div className='App flex flex-col '>
      <h1 className='text-3xl mt-5 mx-auto'>MiniKorp</h1>
      <Form fetchData={fetchData} setPage={setPage} />
      <div>
        {sents && sents.length > 0
          ? sents.slice(page*5,(page*5)+5).map((sent: KwicSummary, idx: number) => (
              <Sentence key={idx} {...sent} />
            ))
          : <SentenceBox>Ei tuloksia</SentenceBox>
        }
      </div>
    </div>
  )
}

export default App