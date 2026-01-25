import { motion } from 'framer-motion'
import { FEE_CONFIG, SHILLERS } from '../data/feeRecipients'
import { useHolderTracking, formatWallet, formatBalance } from '../hooks/useHolderTracking'
import { GlassCard } from './ui/GlassCard'
import { Button } from './ui/Button'

function MedalIcon({ rank }) {
  if (rank === 1) return <span className="text-2xl">🥇</span>
  if (rank === 2) return <span className="text-2xl">🥈</span>
  if (rank === 3) return <span className="text-2xl">🥉</span>
  return null
}

function HolderRow({ holder, index }) {
  return (
    <motion.div
      className="flex items-center justify-between py-4 px-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-4">
        <span className="w-8 text-center">
          <MedalIcon rank={holder.rank} />
        </span>
        <div>
          {holder.filled ? (
            <>
              <p className="font-mono font-semibold text-white">
                {formatWallet(holder.wallet)}
              </p>
              <div className="flex items-center gap-2 text-sm font-mono text-white/50">
                <span>{formatBalance(holder.balance)} tokens</span>
                <span className="text-primary">({holder.daysHeld}d held)</span>
              </div>
            </>
          ) : (
            <>
              <p className="font-mono font-semibold text-white/50">HOLDER #{holder.rank}</p>
              <span className="text-sm font-mono text-white/30">[ PENDING ]</span>
            </>
          )}
        </div>
      </div>
      <div className="text-right">
        <span className="font-mono text-primary">{FEE_CONFIG.perRecipientPercent}%</span>
      </div>
    </motion.div>
  )
}

function ShillerRow({ shiller, index }) {
  return (
    <motion.div
      className={`flex items-center justify-between py-4 px-2 ${
        shiller.isFounder ? 'bg-primary/5' : ''
      }`}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-4">
        <span className="w-8 text-center">
          <MedalIcon rank={shiller.rank} />
        </span>
        <div>
          <p className={`font-mono font-semibold ${shiller.isFounder ? 'text-primary' : 'text-white'}`}>
            {shiller.label}
          </p>
          {shiller.filled ? (
            <a
              href={shiller.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-primary-light hover:text-primary transition-colors"
            >
              {shiller.twitter}
            </a>
          ) : (
            <span className="text-sm font-mono text-white/30">[ OPEN ]</span>
          )}
        </div>
      </div>
      <div className="text-right">
        <span className="font-mono text-primary">{FEE_CONFIG.perRecipientPercent}%</span>
      </div>
    </motion.div>
  )
}

export function FeeSharing() {
  const { holders, loading } = useHolderTracking()

  return (
    <section id="rewards" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            FEE <span className="text-primary">SHARING</span>
          </h2>
          <p className="text-lg text-white/70 font-mono">
            100% of creator fees split between top holders and shillers
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Holders Column */}
          <GlassCard hover={false}>
            <div className="p-4 border-b border-primary/10">
              <h3 className="text-xl font-mono font-bold text-center">
                <span className="text-primary">{FEE_CONFIG.holderSharePercent}%</span> TOP HOLDERS
              </h3>
              <p className="text-xs text-white/50 font-mono text-center mt-1">
                Must hold 3+ consecutive days to qualify
              </p>
            </div>
            <div className="divide-y divide-primary/10">
              {loading ? (
                <div className="py-8 text-center">
                  <span className="font-mono text-white/50">Loading holders...</span>
                </div>
              ) : (
                holders.map((holder, index) => (
                  <HolderRow key={holder.rank} holder={holder} index={index} />
                ))
              )}
            </div>
          </GlassCard>

          {/* Shillers Column */}
          <GlassCard hover={false}>
            <div className="p-4 border-b border-primary/10">
              <h3 className="text-xl font-mono font-bold text-center">
                <span className="text-primary">{FEE_CONFIG.shillerSharePercent}%</span> SHILLERS
              </h3>
              <p className="text-xs text-white/50 font-mono text-center mt-1">
                Top promoters and marketers
              </p>
            </div>
            <div className="divide-y divide-primary/10">
              {SHILLERS.map((shiller, index) => (
                <ShillerRow key={shiller.rank} shiller={shiller} index={index} />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            href="https://x.com/250Coin92141"
          >
            APPLY TO BE A SHILLER
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          <p className="mt-4 text-sm text-white/50 font-mono">
            DM @250Coin92141 to claim an open shiller slot
          </p>
        </motion.div>
      </div>
    </section>
  )
}
