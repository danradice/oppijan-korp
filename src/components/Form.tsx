import { useState } from 'react'
import { type FormEvent } from 'react'
import type { FormProps } from '../types'

function Form({ fetchData, setPage }: FormProps) {

  const yleCorpus = 'YLENEWS_FI_2021_S,YLENEWS_FI_2020_S,YLENEWS_FI_2019_S,YLENEWS_FI_2018_S,YLENEWS_FI_2017_S,YLENEWS_FI_2016_S,YLENEWS_FI_2015_S,YLENEWS_FI_2014_S,YLENEWS_FI_2013_S,YLENEWS_FI_2012_S,YLENEWS_FI_2011_S'
  const s24Corpus = 'S24_2017,S24_2018,S24_2019,S24_2020,S24_2021,S24_2022,S24_2023'
  
  const [search, setSearch] = useState('')
  const [prevSearch, setPrevSearch] = useState('empty') // to prevent "Lisää esimerkkejä appearing on initial load"
  const [buttonText, setButtonText] = useState('Etsi lauseita')
  const [isLoading, setIsLoading] = useState(false)
  const [corpus, setCorpus] = useState(s24Corpus)
  const [sameCorpus, setSameCorpus] = useState(false)
  

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (prevSearch === search && sameCorpus) {
      setPage((prev: number) => prev + 1)
    } else {
      setPrevSearch(search)
      setSameCorpus(true)
      setButtonText('Etsitään lauseita')
      setIsLoading(true)
      await fetchData(search, corpus)
      setButtonText('Etsi lauseita')
      setIsLoading(false)
      setPage(1)
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
        className='block flex-1 px-3 py-2 border border-gray-300 form-input rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
        />
      </div>
      <div className='flex mt-3 justify-center align-middle'>
        <label className="mr-4">
          <input
            type="radio"
            name="corpus"
            value="YLE"
            checked={corpus === yleCorpus}
            onChange={() => {
              setCorpus(yleCorpus)
              setSameCorpus(false)
            }}
            className="mr-2"
          />
          YLE
        </label>
        <label className="ml-2 mr-auto">
          <input
            type="radio"
            name="corpus"
            value="S24"
            checked={corpus === s24Corpus}
            onChange={() => {
              setCorpus(s24Corpus)
              setSameCorpus(false)
            }}
            className="mr-2"
          />
          S24
        </label>
        <button
        type='submit'
        className='w-max px-3 py-2 ml-auto text-sm font-medium text-zinc-700 border border-gray-300 rounded-md leading-4 hover:text-zinc-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-zinc-50 active:text-zinc-800'
        disabled={isLoading}>
        {(search === prevSearch) && sameCorpus && !isLoading ? 'Lisää esimerkkejä' : buttonText}
        </button>
      </div>  
    </form>
  )
}

export default Form