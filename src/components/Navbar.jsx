import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config'
import logo from '../assets/250logo.png'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'CHART', href: '#chart' },
    { label: 'MAP', href: '#map' },
    { label: 'REWARDS', href: '#rewards' },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`glass-card-sm flex items-center justify-between px-6 py-3 transition-all duration-300 ${
              scrolled ? 'bg-opacity-90' : ''
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img src={logo} alt="250" className="h-8 w-auto" style={{ filter: 'drop-shadow(0 0 8px rgba(94, 186, 125, 0.5))' }} />
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 font-mono text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CONFIG.PUMP_FUN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 glass-button-primary px-4 py-2 text-sm font-mono"
              >
                BUY
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Tab Bar */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-4 mb-4">
          <div className="glass-card-sm flex items-center justify-around px-2 py-2">
            <a href="#" className="flex flex-col items-center p-2 text-primary">
              <img src={logo} alt="250" className="h-5 w-auto" style={{ filter: 'drop-shadow(0 0 4px rgba(94, 186, 125, 0.5))' }} />
              <span className="text-xs font-mono mt-1">HOME</span>
            </a>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex flex-col items-center p-2 text-white/70 hover:text-primary transition-colors"
              >
                {link.label === 'CHART' && <ChartIcon />}
                {link.label === 'MAP' && <MapIcon />}
                {link.label === 'REWARDS' && <RewardsIcon />}
                <span className="text-xs font-mono mt-1">{link.label}</span>
              </a>
            ))}
            <a
              href={CONFIG.PUMP_FUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-2 text-primary"
            >
              <BuyIcon />
              <span className="text-xs font-mono mt-1">BUY</span>
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

// Icons
function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  )
}

function RewardsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function BuyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}
