// Instructions for using app. Displays on initial load
const InstructionBox = () => (
  <div className='w-4/5 max-w-3xl mt-5 mx-auto px-5 py-4 border rounded-md shadow-sm leading-relaxed'>
    <p className='text-center'><b>Tervetuloa Oppijan Korpiin!</b></p>
    <p>&nbsp;</p>
    <p>
      Oppijan Korpin avulla voit poimia lauseita nopeasti ja monipuolisesti <a
          href="https://korp.csc.fi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Korp-palvelun
      </a> korpuksista.
    </p>
    <p>Valitsemalla <b>"Uutiset"</b> saat lauseita YLE Uutisista.</p>
    <p>Valitsemalla <b>"Puhekieli"</b> saat lauseita Suomi24 keskustelupalstasta.</p>
    <p>(<b>HUOM</b>: keskustelupalstat eivät ole tarkasti moderoituja, joten hakutulosten joukossa voi tulla kaikenlaista.)</p>
    <p>&nbsp;</p>
    <p>Tietyn sanan tai fraasin hakemisen lisäksi voit:</p>
    <ul className="list-disc pl-6">
      <li>
        käyttää <b>säännöllisiä lausekkeita</b> eli Regex. Kokeile hakea <b><i>.+puoli</i></b>. Se löytää yhdyssanoja, jotka loppuvat sanalla "puoli".
      </li>
      <li>etsiä <b>perusmuodon</b> mukaan lisäämällä <b>yhdysmerkki</b> (-) sanan alkuun. Haulla <b><i>-tehdä hyvää</i></b> saat siis mukaan kaikki tehdä-verbin eri muodot (tekee, teki, tehty jne.).</li>
      <li>etsiä <b>sijan</b> mukaan lisäämällä <b>puolilainausmerkki</b> (') plus sijamuodon lyhenne. Haulla <b><i>raskastaa 'Acc</i></b> löydät siis tapauksia, joissa rakastaa-verbia ei seuraa partatiivi! </li>
      <li>etsiä <b>sanamuodon</b> mukaan lisäämällä <b>huutomerkki</b> (!) plus sanamuodon lyhenne. Haulla <b><i>!Adv vihainen</i></b> selailet siis adverbeja, joita esiintyy vihainen-adjektiivin kanssa.</li>
    </ul>
    <p>&nbsp;</p>
    <p>Lisäohjeet näihin kaikkiin saa klikkaamalla nurkassa olevaa <b>?-merkkiä</b></p>
  </div>
)
export default InstructionBox