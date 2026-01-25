import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useTokenData, formatPrice, formatMarketCap, formatVolume, formatPercent, formatNumber } from '../hooks/useTokenData'
import { GlassCard, GlassCardSmall } from './ui/GlassCard'
import { PriceDisplay } from './ui/AnimatedNumber'

export function Chart() {
  const { data, loading } = useTokenData()

  const stats = [
    { label: 'PRICE', value: data.price, format: formatPrice },
    { label: 'MCAP', value: data.marketCap, format: formatMarketCap },
    { label: '24H VOL', value: data.volume24h, format: formatVolume },
    { label: 'HOLDERS', value: data.holders, format: formatNumber },
    { label: '24H %', value: data.priceChange24h, format: formatPercent, isPercent: true },
  ]

  return (
    <section id="chart" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            LIVE <span className="text-primary">CHART</span>
          </h2>
        </motion.div>

        {/* Chart embed */}
        <GlassCard className="mb-8 overflow-hidden" hover={false}>
          <div className="aspect-[16/9] md:aspect-[21/9] w-full">
            {CONFIG.DEXSCREENER_PAIR === "PLACEHOLDER_PAIR_ADDRESS" ? (
              // Placeholder when no pair address
              <div className="w-full h-full flex items-center justify-center bg-bg-mid rounded-lg">
                <div className="text-center">
                  <p className="text-white/50 font-mono text-lg mb-2">Chart Loading...</p>
                  <p className="text-white/30 font-mono text-sm">Add DEXSCREENER_PAIR to config.js</p>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://dexscreener.com/solana/${CONFIG.DEXSCREENER_PAIR}?embed=1&theme=dark&trades=0&info=0`}
                className="w-full h-full rounded-lg"
                style={{ border: 'none' }}
                title="DexScreener Chart"
              />
            )}
          </div>
        </GlassCard>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCardSmall className="text-center">
                <p className="text-xs font-mono text-primary-light mb-1">{stat.label}</p>
                <p className={`text-lg md:text-xl font-mono font-bold ${
                  stat.isPercent
                    ? stat.value >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                    : ''
                }`}>
                  {loading ? (
                    <span className="text-white/50">---</span>
                  ) : (
                    <PriceDisplay value={stat.value} format={stat.format} />
                  )}
                </p>
              </GlassCardSmall>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
