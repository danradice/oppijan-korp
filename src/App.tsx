import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import Sentence from './components/Sentence'
import ContentBox from './components/ContentBox'
import InstructionBox from './components/InstructionBox'
import Footer from './components/Footer'
import type { KwicSummary, Settings } from './types'
import StatsBox from './components/StatsBox'
import InstructionsModal from './components/InstructionsModal'
import { buildCQPQuery } from './utils/cqpQueryBuilder'
import { CORPORA, getCorpusName, parseCorpusString } from './config/corpora'
import { useRateLimiter } from './hooks/useRateLimiter'
import { fetchMultipleCorpora } from './utils/korpSearch'

function App() {
  // State variables
  const [sents, setSents] = useState<KwicSummary[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [corpus, setCorpus] = useState<string>(CORPORA.YLE.corpora)
  const [searchedCorpus, setSearchedCorpus] = useState("")
  const [showInstructions, setShowInstructions] = useState(true)
  const [settings, setSettings] = useState<Settings>({
    minLength: 10,
    maxSents: 20,
    sentsPerPage: 5,
  })
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)

  // Rate limiting hook
  const checkRateLimit = useRateLimiter(2000) // 2 seconds between searches

  // Main search handler - coordinates UI state and business logic
  async function fetchData(search: string, corp: string): Promise<void> {
    // Check rate limit
    if (!checkRateLimit()) {
      alert('Odota hetki ennen seuraavaa hakua')
      return
    }

    // Update UI state
    setShowInstructions(false)
    setSents([])
    setPage(0)
    setSearchedCorpus(getCorpusName(corp))

    // Prepare search
    const corpora = parseCorpusString(corp)
    const cqpQuery = buildCQPQuery(search)
    console.log('Searching corpora:', corpora)
    console.log('CQP query:', cqpQuery)

    // Execute search with progressive updates
    try {
      setIsLoading(true)
      await fetchMultipleCorpora(
        corpora,
        cqpQuery,
        {
          maxSents: settings.maxSents,
          minLength: settings.minLength,
        },
        // Progress callback - updates UI as each corpus returns results
        (incrementalResults) => {
          setSents(incrementalResults)
        }
      )
    } catch (err) {
      console.error('Search failed:', err)
      alert('Haku epäonnistui')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='App flex flex-col pb-10'>
      <div className="relative flex items-center justify-center mt-5 mb-2">
        <button
          type="button"
          className="absolute right-4 top-4 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-xl rounded-full w-9 h-9 flex items-center justify-center shadow"
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
        yleCorpus={CORPORA.YLE.corpora}
        s24Corpus={CORPORA.S24.corpora}
        setShowInstructions={setShowInstructions}
      />
      <div>
        {showInstructions ? <InstructionBox/> : null}
        {sents.length === 0 && isLoading && !showInstructions ? <ContentBox align="center">Haetaan lauseita</ContentBox> : null}
        {sents.length > 0 && !showInstructions
          ? <StatsBox
          sents={sents}
          page={page}
          sentsPerPage={settings.sentsPerPage}
          corpus={searchedCorpus}
          maxSents={settings.maxSents}
          />
          : null}
        {sents.length > 0 && !showInstructions
          ? sents.slice(page*settings.sentsPerPage,(page*settings.sentsPerPage)+settings.sentsPerPage).map((sent: KwicSummary, idx: number) => (
            <Sentence key={idx} {...sent} />
          ))
          : null
        }
        {sents.length === 0 && !isLoading && !showInstructions ? <ContentBox align="center">Ei tuloksia</ContentBox> : null}
      </div>
      <Footer />
    </div>
  )
}

export default App