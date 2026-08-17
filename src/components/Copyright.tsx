function Footer() {
  return (
    <footer className='mt-10 pt-4 border-t border-gray-200 text-center text-xs text-gray-500'>
      <p>
        <a
          href='https://github.com/danradice/oppijan-korp'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Sovellus © Daniel Radice 2025–2026
        </a>
        {' · '}
        <a
          href='https://www.gnu.org/licenses/gpl-3.0.html'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          GPL-3.0
        </a>
      </p>
      <p className='mt-1'>
        Esimerkkilauseet:{' '}
        <a
          href='https://www.kielipankki.fi/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Kielipankki
        </a>
        {' '}(Yle Uutiset, Suomi24)
      </p>
    </footer>
  )
}

export default Footer
