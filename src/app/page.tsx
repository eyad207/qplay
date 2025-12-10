import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 text-white'>
      <div className='container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen'>
        {/* Logo */}
        <h1 className='text-7xl font-bold mb-4 tracking-tight'>
          <span className='text-yellow-400'>Q</span>play
        </h1>
        <p className='text-xl opacity-70 mb-16 text-center max-w-md'>
          Et morsomt quiz-spill for grupper. Svar på spørsmål med mobilen og se
          resultater på storskjerm!
        </p>

        {/* Cards */}
        <div className='grid md:grid-cols-2 gap-8 w-full max-w-3xl'>
          {/* Host Card */}
          <Link
            href='/host'
            className='group bg-white/10 hover:bg-white/20 rounded-2xl p-8 transition-all transform hover:scale-105 cursor-pointer'
          >
            <div className='text-5xl mb-4'>🖥️</div>
            <h2 className='text-2xl font-bold mb-2'>Start Quiz (Host)</h2>
            <p className='opacity-70'>
              Åpne på storskjerm eller PC. Vis spørsmål og kontroller quizen.
            </p>
            <div className='mt-4 text-purple-300 group-hover:text-white transition-colors'>
              Åpne host-side →
            </div>
          </Link>

          {/* Player Card */}
          <Link
            href='/play'
            className='group bg-white/10 hover:bg-white/20 rounded-2xl p-8 transition-all transform hover:scale-105 cursor-pointer'
          >
            <div className='text-5xl mb-4'>📱</div>
            <h2 className='text-2xl font-bold mb-2'>Bli med (Spiller)</h2>
            <p className='opacity-70'>
              Åpne på mobilen. Skriv inn koden og svar med fargeknapper.
            </p>
            <div className='mt-4 text-purple-300 group-hover:text-white transition-colors'>
              Bli med i quiz →
            </div>
          </Link>
        </div>

        {/* How it works */}
        <div className='mt-16 text-center'>
          <h3 className='text-xl font-bold mb-6 opacity-70'>
            Slik fungerer det:
          </h3>
          <div className='flex flex-wrap justify-center gap-8 text-sm opacity-60'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>1️⃣</span>
              <span>Host starter quiz</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>2️⃣</span>
              <span>Spillere scanner kode</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>3️⃣</span>
              <span>Svar med fargeknapper</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>4️⃣</span>
              <span>Se resultater live!</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='mt-16 text-sm opacity-50'>
          Bygget av Eyad Lazkani
        </footer>
      </div>
    </div>
  )
}
