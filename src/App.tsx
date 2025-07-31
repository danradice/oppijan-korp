import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import type { KorpResponse, KorpKwic, KorpToken } from './types'

function Sentence({ text }: { text: string }) {
  return(
    <div className='w-4/5 max-w-3xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
      <p className='text-center'>{text}</p>
    </div>
  )
}

function App() {
  const [sents, setSents] = useState<string[]>([])

  function getS24Sents(data: KorpResponse): string[] {
    const sent_objects = data.kwic.map((a: KorpKwic) => a.tokens)
    const results = sent_objects.map(
      (a: KorpToken[]) => a.map((b: KorpToken) => b.word).join(' ')
    )
    
    console.log(results)
    return results
  }

  async function fetchData(search: string) {
    const response = await fetch(`https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi?command=query&defaultcontext=1+sentence&defaultwithin=sentence&show=sentence&start=0&end=5&corpus=S24&cqp="${search}"`)
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
        ? sents.map((sent, idx) => 
          <Sentence key={idx} text={sent} />
        )
        : <Sentence key={0} text="No sentences to display" />
      }
      </div>
    </div>
  )
}

export default App