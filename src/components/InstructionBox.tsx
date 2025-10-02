// Instructions for using app. Displays on initial load 
const InstructionBox = () => (
  <div className='w-4/5 max-w-3xl mt-5 mx-auto px-5 py-4 border rounded-md shadow-sm leading-relaxed'>
    <p className='text-center'><b>Tervetuloa Oppijan Korpiin!</b></p>
    <p>&nbsp;</p>
    <p>
      Oppijan Korpin avulla voit poimia esimerkkilauseita nopeasti ja monipuolisesti <a
          href="https://korp.csc.fi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Korp-palvelun
      </a> avoimista korpuksista
    </p>
    <p>Valitsemalla <b>"Uutiset"</b> saat lauseita YLE Uutisista</p>
    <p>Valitsemalla <b>"Puhekieli"</b> saat lauseita Suomi24 keskustelupalstasta</p>
    <p>(<b>HUOM</b>: keskustelupalstat eivät ole tarkasti moderoituja, joten hakutulosten joukossa voi tulee kaikenlaista)</p>
    <p>&nbsp;</p>
    <p>Tietyn sanan tai fraasin hakemisen lisäksi voit:</p>
    <ul className="list-disc pl-6">
      <li>
        käyttää säännöllisiä lausekkeita (
        <a
          href="https://quickref.me/regex"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          pikaopas
        </a>
        )
      </li>
      <li>etsiä perusmuodon mukaan lisäämällä =-merkki. =tehdä löytää siis kaikki tehdä-verbin eri muodot (tekee, teki, tehty jne.)</li>
      <li>tehdä vielä monipuolisempia hakuja käyttämällä CQP-hakulauseita (
        <a
          href="https://www.kielipankki.fi/tuki/korp-edistynyt/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          pikaopas
        </a>)
      </li>
    </ul>
  </div>
)
export default InstructionBox