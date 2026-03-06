import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'

const DUNE_BASE_URL = 'https://dune.com/embeds/4903533/8118614'
const REFRESH_INTERVAL = 300000 // 5 minutes

export function DuneChart() {
  const [iframeSrc, setIframeSrc] = useState(`${DUNE_BASE_URL}?t=${Date.now()}`)

  // Reload iframe periodically to get fresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setIframeSrc(`${DUNE_BASE_URL}?t=${Date.now()}`)
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">
            PUMPFUN <span className="text-primary">REVENUE</span> — LIVE
          </h2>
          <p className="text-lg text-white/70 font-mono max-w-2xl mx-auto">
            Watch it tick toward <span className="text-primary font-bold">$1,000,000,000</span> in real time
          </p>
        </motion.div>

        {/* Dune embed */}
        <GlassCard className="overflow-hidden" hover={false}>
          <div className="w-full" style={{ minHeight: '420px' }}>
            <iframe
              src={iframeSrc}
              frameBorder="0"
              width="100%"
              height="420"
              style={{ borderRadius: '16px', background: 'transparent' }}
              title="Pumpfun Revenue"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </GlassCard>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '~$1B', label: 'Pumpfun Lifetime Revenue' },
            { value: '$250K', label: 'Remaining to Milestone' },
            { value: '~8hrs', label: 'Avg. Time to Close Gap' },
            { value: '$250K', label: 'The Coin That Gets It There' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card-sm p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <p className="text-2xl md:text-3xl font-mono font-bold text-primary glow-text mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-mono text-white/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
