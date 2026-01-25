import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Thesis } from './components/Thesis'
import { Roadmap } from './components/Roadmap'
import { Chart } from './components/Chart'
import { USMap } from './components/USMap'
import { FeeSharing } from './components/FeeSharing'
import { Footer } from './components/Footer'
import background from './assets/background.png'
import banner from './assets/banner.png'

function App() {
  return (
    <div className="min-h-screen bg-bg-dark relative">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Ambient background artwork */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial opacity-50" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(94, 186, 125, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(94, 186, 125, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Thesis />
          <Roadmap />

          {/* Banner divider */}
          <div className="relative py-8 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
              <div className="glass-card p-2 overflow-hidden">
                <img
                  src={banner}
                  alt="250K Banner"
                  className="w-full h-auto rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(94, 186, 125, 0.3))' }}
                />
              </div>
            </div>
          </div>

          <Chart />
          <USMap />
          <FeeSharing />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
