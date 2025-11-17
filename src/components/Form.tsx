import { useState } from 'react'
import { type FormEvent } from 'react'
import type { FormProps } from '../types'
import SettingsModal from './SettingsModal'

function Form({ fetchData, page, setPage, isLoading, setIsLoading, sents, settings, setSettings, corpus, setCorpus, yleCorpus, s24Corpus }: FormProps) {
  
  //Search form variables
  const [search, setSearch] = useState('')
  const [prevSearch, setPrevSearch] = useState('empty') // to prevent "Lisää esimerkkejä appearing on initial load"
  const [buttonText, setButtonText] = useState('Etsi')
  const [sameCorpus, setSameCorpus] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // If search string and corpus have not changed then show next page
    if (prevSearch === search && sameCorpus) {
      setPage((prev: number) => (prev*settings.sentsPerPage)+settings.sentsPerPage < sents.length ? prev + 1 : 0)
    // Otherwise run a new search
    } else {
      setPrevSearch(search)
      setSameCorpus(true)
      setButtonText('Etsitään')
      setIsLoading(true)
      await fetchData(search, corpus)
      setButtonText('Etsi')
      setIsLoading(false)
      setPage(0)
    }
  }

  return (
    <form className='w-3/4 max-w-sm mx-auto' onSubmit={handleSubmit}>
      <div className='flex mt-5'>
        <input
        name='search'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        required
        className='block flex-1 px-3 py-2 border border-gray-300 bg-gray-100 form-input rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
        />
        <button
        type='submit'
        className='w-max px-3 py-2 ml-auto text-sm font-medium text-zinc-700 border border-gray-300 rounded-md leading-4 hover:text-zinc-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-zinc-50 active:text-zinc-800'
        disabled={isLoading}>
        {(search === prevSearch) && sameCorpus && !isLoading && sents.length > settings.sentsPerPage
          ? (page*settings.sentsPerPage)+settings.sentsPerPage < sents.length
            ? 'Lisää'
            : 'Palaa alkuun'
          : buttonText}
        </button>
      </div>
      <div className='flex mt-3 justify-center align-middle gap-3'>
        <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-100">
          <button
            type="button"
            onClick={() => {
              setCorpus(yleCorpus)
              setSameCorpus(false)
            }}
            className={`px-3 py-1.5 rounded-md transition-all text-sm ${
              corpus === yleCorpus
                ? 'bg-white shadow-sm font-semibold'
                : 'hover:bg-gray-50'
            }`}
          >
            Uutiset
          </button>
          <button
            type="button"
            onClick={() => {
              setCorpus(s24Corpus)
              setSameCorpus(false)
            }}
            className={`px-3 py-1.5 rounded-md transition-all text-sm ${
              corpus === s24Corpus
                ? 'bg-white shadow-sm font-semibold'
                : 'hover:bg-gray-50'
            }`}
          >
            Keskustelupalsta
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className='w-max px-3 py-2 ml-auto text-sm font-medium text-zinc-700 border border-gray-300 rounded-md leading-4 hover:text-zinc-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-zinc-50 active:text-zinc-800'
        >
          Asetukset
        </button>
      </div>
      <div>
        <SettingsModal
          isOpen={isSettingsOpen}
          initialSettings={settings}
          onSave={(newSettings) => {
            setSettings(newSettings)
            setSameCorpus(false)
            setPage(0)
            setIsSettingsOpen(false)
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </form>
  )
}

export default Form