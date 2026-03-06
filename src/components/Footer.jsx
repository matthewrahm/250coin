import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { CopyButton } from './ui/CopyButton'
import { IconButton } from './ui/Button'

export function Footer() {
  return (
    <footer className="relative py-12 px-4 pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-card p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <IconButton href={CONFIG.TWITTER_URL} aria-label="Twitter/X">
              <TwitterIcon className="w-5 h-5" />
            </IconButton>
<IconButton href={CONFIG.DEXSCREENER_URL} aria-label="DexScreener">
              <ChartIcon className="w-5 h-5" />
            </IconButton>
          </div>

          {/* Contract Address — links to Pump.fun */}
          <div className="mb-6">
            <p className="text-xs font-mono text-primary-light mb-2">CONTRACT ADDRESS</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={CONFIG.PUMP_FUN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-white/80 bg-bg-mid px-4 py-2 rounded-lg break-all hover:text-primary transition-colors"
              >
                {CONFIG.CONTRACT_ADDRESS}
              </a>
              <CopyButton text={CONFIG.CONTRACT_ADDRESS} />
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-primary/30 mx-auto mb-6" />

          {/* Attribution */}
          <p className="text-sm font-mono text-white/40">
            Built to push Pumpfun past{' '}
            <span className="text-primary/70">$1 Billion</span>
          </p>

          {/* Logo */}
          <motion.p
            className="mt-4 text-4xl font-mono font-bold text-primary/30"
            animate={{
              textShadow: [
                '0 0 10px rgba(94, 186, 125, 0.2)',
                '0 0 20px rgba(94, 186, 125, 0.4)',
                '0 0 10px rgba(94, 186, 125, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            $250K
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function PumpIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}

function ChartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  )
}
