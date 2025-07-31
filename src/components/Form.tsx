import { useState } from 'react'
import { type FormEvent } from 'react'

type Props = {
  fetchData: (search: string) => void
}

function Form({ fetchData }: Props) {
  const [search, setSearch] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    
    fetchData(search)
  }

  return (
    <form className='w-1/2 max-w-sm mx-auto' onSubmit={handleSubmit}>
      <div className='flex mt-5'>
        <input
        name='search'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        required
        className='block flex-1 px-3 py-2 border border-gray-300 form-input rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
        />
        <button
        type='submit'
        className='w-max px-3 py-2 ml-2 text-sm font-medium text-zinc-700 border border-gray-300 rounded-md leading-4     hover:text-zinc-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-zinc-50 active:text-zinc-800'>
        Etsi lauseita
        </button>
        </div>  
      </form>
  )
}

export default Form