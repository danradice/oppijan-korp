import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import Sentence from './components/Sentence'
import SentenceBox from './components/SentenceBox'
import InstructionBox from './components/InstructionBox'
import type { KorpResponse, KorpToken, KwicSummary, ApiParams, KorpKwic, Settings } from './types'
import StatsBox from './components/StatsBox'
import SettingsModal from './components/SettingsModal'
import InstructionsModal from './components/InstructionsModal'

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
function extractSents(settings: Settings, data: KorpResponse): KwicSummary[] {
  const results: KwicSummary[] = data.kwic.map((kwicObj: KorpKwic) => {
    const tokens = kwicObj.tokens
      .map((token: KorpToken) => token.word)
    const start = kwicObj.match.start
    const end = kwicObj.match.end
    return { start, end, tokens }
  })
  // set minimum sentence length to 10 tokens
  return results.filter(summary => summary.tokens.length >= settings.minLength)
}

function App() {

  const yleCorpus = 'YLENEWS_FI_2021_S,YLENEWS_FI_2020_S,YLENEWS_FI_2019_S,YLENEWS_FI_2018_S,YLENEWS_FI_2017_S,YLENEWS_FI_2016_S,YLENEWS_FI_2015_S,YLENEWS_FI_2014_S,YLENEWS_FI_2013_S,YLENEWS_FI_2012_S,YLENEWS_FI_2011_S'
  const s24Corpus = 'S24_2017,S24_2018,S24_2019,S24_2020,S24_2021,S24_2022,S24_2023'

  //State variable for storing retrieved sentences
  const [sents, setSents] = useState<KwicSummary[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [corpus, setCorpus] = useState(yleCorpus)
  const [searchedCorpus, setSearchedCorpus] = useState("")
  // Show instructions on initial load
  const [showInstructions, setShowInstructions] = useState(true)
  const [settings, setSettings] = useState<Settings>({
    minLength: 10,
    maxSents: 20,
    sentsPerPage: 5,
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)

  //Main API function. Retrieves requested search string from Korp API and stores result in 'sents'
  async function fetchData(search: string, corp: string): Promise<void> {
    const korp = "https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi"

    // Hide instructions on first search
    setShowInstructions(false)

    // Set value of searchedCorpus
    switch (corpus) {
      case yleCorpus:
        setSearchedCorpus("Yle Uutiset")
        break
      case s24Corpus:
        setSearchedCorpus("Suomi24.fi")
        break
    }

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
        const lemmaSearch = word.match(/^-(\p{L}+)/u)
        // -{pos} shorthand for part of speech search
        const posSearch = word.match(/^!(\p{L}+)/u)
        // #{case} shorthand for case search
        const caseSearch = word.match(/^'(\p{L}+)/u)

        if (wordsBetween) {
          return `[]{0,${wordsBetween[1]}}`
        } else if (lemmaSearch) {
          return `[lemma = "${lemmaSearch[1]}"]`
        } else if (posSearch) {
          return `[pos = "${posSearch[1]}"]`
        } else if (caseSearch) {
          return `[msd = ".*${caseSearch[1]}.*"]`
        } else {
          return `[word = "${word}"]`
        }
      })
      .join(' ')
    }
    
    console.log(CQPsearch)

    setSents([]) // Clear previous results

    let sentCount = 0
    for (const corpusName of corpora) {
      if (sentCount < settings.maxSents) { // Stops fetching sentences once maxSents values is reached
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
            const extracted = extractSents(settings, data)
            console.log(extracted)
            if (sentCount + extracted.length > settings.maxSents ) {
              extracted.splice(0, extracted.length - (settings.maxSents - sentCount))
            }
            sentCount += extracted.length
            console.log(sentCount)
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
  }

  return (
    <div className='App flex flex-col '>
      <div className="relative flex items-center justify-center mt-5 mb-2">
        <h1 className='text-3xl mx-auto'>Oppijan Korp</h1>
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-xl rounded-full w-9 h-9 flex items-center justify-center shadow"
          aria-label="Ohjeet"
          onClick={() => setIsInstructionsOpen(true)}
        >
          ?
        </button>
      </div>
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        initialSettings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          setIsSettingsOpen(false);
        }}
        onClose={() => setIsSettingsOpen(false)}
      />
      <Form
        fetchData={fetchData}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        sents={sents}
        settings={settings}
        setSettings={setSettings}
        corpus={corpus}
        setCorpus={setCorpus}
        yleCorpus={yleCorpus}
        s24Corpus={s24Corpus}
      />
      <div>
        {showInstructions ? <InstructionBox/> : null}
        {sents.length === 0 && isLoading && showInstructions ? <SentenceBox>Haetaan lauseita</SentenceBox> : null}
        {sents.length > 0 && !showInstructions
          ? <StatsBox
          sents={sents}
          page={page}
          sentsPerPage={settings.sentsPerPage}
          corpus={searchedCorpus}
          />
          : null}
        {sents.length > 0 && !showInstructions
          ? sents.slice(page*settings.sentsPerPage,(page*settings.sentsPerPage)+settings.sentsPerPage).map((sent: KwicSummary, idx: number) => (
            <Sentence key={idx} {...sent} />
          ))
          : null
        }
        {sents.length === 0 && !isLoading && !showInstructions ? <SentenceBox>Ei tuloksia</SentenceBox> : null}
      </div>
    </div>
  )
}

export default App