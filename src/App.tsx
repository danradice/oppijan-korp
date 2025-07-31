import './App.css'
import { useState, type FormEvent } from 'react'
import Form from './components/Form'

function Sentence({ text }) {
  return(
    <div className='w-4/5 max-w-3xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
      <p className='text-center'>{text}</p>
    </div>
  )
}

function App() {

  const dummySents = [
    'ne testit voi joskus	mennä pieleen, mulla kävi joskus niin.',
    'Kerrommehan tuon myöst ystäville, joten ei voi	mennä pieleen, jos pystyy sanomaan vs sukupuolen edustajalle vaikkapa oli mukava jutella " tai jopa " kiva takki " tms. Pieniä asioita , millä et voi mitenkään nolata itseäsi , koska nuo asiat voisi sanoa myös kaverille.',
    'Ihmetyksen aiheenani on se, et kun olen vuosien aikana jutellu täysin terveiden ja supliikisti käyttäytyvien kavereiden kanssa aiheesta seksi, ja näyttää siltä, että ilmeisesti suurinosa näistä supliikki perus miehistä jännittää sitä ja eka kokemus voi	mennä pieleen	liian jännittämisen takia, näin parikin on kertonut.',
    'Mitkä on teidän mahdollisuudet auttaa emää ja pentuja, jos jotain alkaa	mennä pieleen?',
    'Itse olen sitä mieltä ettei homma ole sen kaiken arvoista, vaikka onnistuessaan lopputulos on todella komea, se siis voi	mennä pieleen	vaikka teippaisitkin ...',
  ]

  const [sents, setSents] = useState<string[]>(dummySents) // for Korp search results 
  
  function getS24Sents(data: object) {
    const sent_objects = data.kwic.map(a => a.tokens)
    const results = sent_objects.map(
      a => a.map(
        b => b.word).join(' '))
      
    //   a => a.reduce((acc, curr, i) => {
    //     const punctuation = /^[.,!?;:]$/

    //     if (punctuation.test(word)) {
    //       return acc + curr.word
    //     } else {
    //       return acc + ' ' + curr.word
    //     }
    //     }
    //   )
    // )
    
    console.log(results)
    return results
  }

  async function fetchData(search: string) {
    const response = await fetch(`https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi?command=query&defaultcontext=1+sentence&defaultwithin=sentence&show=sentence&start=0&end=5&corpus=S24&cqp="${search}"`)
    if (response.status === 200) {
      const data = await response.json()
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