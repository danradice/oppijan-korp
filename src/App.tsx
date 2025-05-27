import './App.css'
import { useState } from 'react'

function Sentence({ text }: { text: string }) {
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

  const [sents, setSents] = useState<string[]>(dummySents)

  return (
    <div className='App flex flex-col '>
      <h1 className='text-3xl mt-5 mx-auto'>MiniKorp</h1>
      <form className='w-1/2 max-w-sm mx-auto'>
      <div className='flex mt-5'>
        <input
        name='username'
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