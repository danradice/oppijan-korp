import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import Sentence from './components/Sentence'
import SentenceBox from './components/SentenceBox'
import InstructionBox from './components/InstructionBox'
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
  // set minimum sentence length to 10 tokens
  return results.filter(summary => summary.tokens.length >= 10)
}

function App() {

  //State variable for storing retrieved sentences
  const [sents, setSents] = useState<KwicSummary[]>([])
  const [page, setPage] = useState(0)
  // Show instructions on initial load
  const [showInstructions, setShowInstructions] = useState(true)

  //Main API function. Retrieves requested search string from Korp API and stores result in 'sents'
  async function fetchData(search: string, corp: string): Promise<void> {
    const korp = "https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi"

    // Hide instructions on first search
    setShowInstructions(false)

    // Split corp string into array if it's comma-separated
    const corpora = corp.split(',').map(c => c.trim()).filter(Boolean)
    console.log(corpora)

    // Convert search string to valid CQP query
    let CQPsearch
    // allow raw CQP searches
    if (search[0] === "[") {
      CQPsearch = search
    } else {
      CQPsearch = search
      .trim()
      .replace(/^\p{L}/u, (match) => `(${match.toLowerCase()}|${match.toUpperCase()})`)
      .split(/\s+/)
      .map(word => {
        // ...{num} shorthand for multiple words between
        const wordsBetween = word.match(/^\.\.\.(\d+)$/)
        // ={word} shorthand for lemma search
        const lemmaSearch = word.match(/^=(\p{L}+)/u)
        if (wordsBetween) {
          return `[]{0,${wordsBetween[1]}}`
        } else if (lemmaSearch) {
          return `[lemma = "${lemmaSearch[1]}"]`
        } else {
          return `[word = "${word}"]`
        }
      })
      .join(' ')
    }
    
    console.log(CQPsearch)

    setSents([]) // Clear previous results

    for (const corpusName of corpora) {
      const searchParams: ApiParams = {
        command: 'query',
        defaultcontext: '1 sentence',
        defaultwithin: 'sentence',
        show: 'sentence',
        start: 0,
        end: 100,
        cut: 20,
        sort: 'random',
        corpus: corpusName,
        cqp: CQPsearch,
      }
      const apiUrl = buildApiUrl(korp, searchParams)

      try {
        const response = await fetch(apiUrl)
        if (response.status === 200) {
          const data: KorpResponse = await response.json()
          const extracted = getS24Sents(data)
          console.log(extracted)
          setSents(prev => [...prev, ...extracted])
        } else {
          // Optionally handle errors per corpus
          alert(`Search string not found in ${corpusName}`)
        }
      } catch (err) {
        // Optionally handle fetch errors
        console.error(`Error fetching from ${corpusName}:`, err)
      }
    }
  }

  return (
    <div className='App flex flex-col '>
      <h1 className='text-3xl mt-5 mx-auto'>Oppijan Korp</h1>
      <Form fetchData={fetchData} setPage={setPage} page={page} sents={sents} />
      <div>
        {showInstructions ? (
            <InstructionBox></InstructionBox>
        ) : (
          sents && sents.length > 0
            ? sents.slice(page*5,(page*5)+5).map((sent: KwicSummary, idx: number) => (
                <Sentence key={idx} {...sent} />
              ))
            : <SentenceBox>Ei tuloksia</SentenceBox>
        )}
      </div>
    </div>
  )
}

export default App