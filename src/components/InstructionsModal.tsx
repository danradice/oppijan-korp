const InstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal box: centered, 80vh height, scrollable content */}
      <div className="bg-white rounded-2xl shadow-xl w-4/5 max-w-3xl p-6 relative leading-relaxed h-[80vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Sulje ohjeet"
        >
          ✕
        </button>
        {/* Header: stays visible while content scrolls */}
        <div className="px-2 pb-2 border-b border-gray-100">
          <p className='text-center text-lg font-semibold'>Lisäoheet Oppijan Korpin käyttöön</p>
        </div>

        {/* Scrollable body: fills remaining space */}
        <div className="px-2 pt-3 overflow-y-auto flex-1">
          <p>&nbsp;</p>
          <p>Oppijan Korpin lausehauissa voi käyttää säännöllisiä lausekkeita sekä etsiä lemman, sijan tai sanamuodon mukaan. Alla löydät lisäohjeita näiden toimintojen käyttöön.</p>
          <p>&nbsp;</p>
          <p><strong>Säännölliset lausekkeet eli Regular expressions / regex</strong></p>
          <p>Regex on tietynlainen &quot;kaavakieli&quot;, jolla voit etsiä sanoja tai fraaseja, jotka täyttävät tietyt ehdot. Jos haluaisit syventyä regexin käyttöön, hyvä johdanto teemaan löytyy sivulta regexone.com. Alla on pari esimerkkiä regex-lausekkeista, joista on erityisesti hyötyä Oppijan Korpissa:</p>
          <p>&nbsp;</p>
          <ul className="list-disc pl-6">
            <li>
              <p>Yhdistelmällä <b>.+</b> voit esim etsiä yhdyssanoja, jotka alkavat tai loppuvat tietyllä sanalla. <b>.+puoli</b> löytää yhdyssanoja, jotka loppuvat sanalla &quot;puoli&quot;, ja <b>mega.+</b> löytää yhdyssanoja, jotka alkavat sanalla &quot;mega&quot;</p>
            </li>
            <li>
              <p>Haku <b>leikepöy(tään|dälle)</b> löytää lauseita, joissa esiintyy liekepöytä-sanan illatiivi tai allatiivi. |-merkki tarkoittaa &quot;tai&quot; ja kaksi eri vaihtoehtoa laitetaan sulkuihin. Lopputulos tarkoittaa siis &quot;leikepöy + joko tään tai dälle&quot;</p>
            </li>
          </ul>
          <p>&nbsp;</p>
          <p><strong>Lemma-hakuoperaattori (-)</strong></p>
          <p>Lisäämällä yhdysmerkki hakusanan alkuun voit hakea lauseita, joissa esiintyy mikä tahansa sanan eri sija- tai taivutusmuodoista. -kieli löytää siis kielen, kieltä, kieleen jne. -mennä löytää puolestaan menen, menin, mentiin jne.</p>
          <p>&nbsp;</p>
          <p><strong>Sija-hakuoperaattori (&#39;)</strong></p>
          <p>Lisäämällä puolilainausmerkki + lyhenne voit etsiä sijan mukaan. Kullekin sijalle on oma kolmen kirjaimen lyhenne, joka löytyy alla olevasta taulukosta</p>
          <p>&nbsp;</p>
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Sijamuoto</th>
                <th className="border border-gray-300 px-4 py-2">Lyhenne</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Nominatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Nom</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Genetiivi</td>
                <td className="border border-gray-300 px-4 py-2">Gen</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Akkusatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Acc</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Partitiivi</td>
                <td className="border border-gray-300 px-4 py-2">Par</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Inessiivi</td>
                <td className="border border-gray-300 px-4 py-2">Ine</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Elatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Ela</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Illatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Ill</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Adessiivi</td>
                <td className="border border-gray-300 px-4 py-2">Ade</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ablatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Abl</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Allatiivi</td>
                <td className="border border-gray-300 px-4 py-2">All</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Essiivi</td>
                <td className="border border-gray-300 px-4 py-2">Ess</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Translatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Tra</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Instruktiivi</td>
                <td className="border border-gray-300 px-4 py-2">Ins</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Abessiivi</td>
                <td className="border border-gray-300 px-4 py-2">Abe</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Komitatiivi</td>
                <td className="border border-gray-300 px-4 py-2">Kom</td>
              </tr>
            </tbody>
          </table>
          <p>&nbsp;</p>
          <p><strong>Sanamuoto-hakuoperaattori (!)</strong></p>
          <p>Lisäämällä huudahdusmerkki + lyhenne voit etsiä sanamuodon mukaan. Alla olevassa taulukossa on eri sanamuotojen lyhenteet.</p>
          <p>&nbsp;</p>
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Sanaluokka</th>
                <th className="border border-gray-300 px-4 py-2">Lyhenne</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Substantiivi</td>
                <td className="border border-gray-300 px-4 py-2">N</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Adjektiivi</td>
                <td className="border border-gray-300 px-4 py-2">A</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Verbi</td>
                <td className="border border-gray-300 px-4 py-2">V</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Adpositio</td>
                <td className="border border-gray-300 px-4 py-2">Adp</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Adverbi</td>
                <td className="border border-gray-300 px-4 py-2">Adv</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Interjektio</td>
                <td className="border border-gray-300 px-4 py-2">Interj</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Konjunktio</td>
                <td className="border border-gray-300 px-4 py-2">C</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Numeraali</td>
                <td className="border border-gray-300 px-4 py-2">Num</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Pronomini</td>
                <td className="border border-gray-300 px-4 py-2">Pron</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
