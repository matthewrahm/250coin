import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useTokenData, formatPrice, formatMarketCap } from '../hooks/useTokenData'
import { GlassCardSmall } from './ui/GlassCard'
import { Button } from './ui/Button'
import { AnimatedNumber, PriceDisplay } from './ui/AnimatedNumber'
import logo from '../assets/250logo.png'

export function Hero() {
  const { data, loading } = useTokenData()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate logo opacity (fully visible at 0, fades out by 400px)
  const logoOpacity = Math.max(0, 1 - scrollY / 400)

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 md:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ opacity: logoOpacity }}
        >
          <motion.img
            src={logo}
            alt="250"
            className="w-[280px] md:w-[400px] lg:w-[500px] mx-auto"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(94, 186, 125, 0.4))',
                'drop-shadow(0 0 60px rgba(94, 186, 125, 0.9))',
                'drop-shadow(0 0 20px rgba(94, 186, 125, 0.4))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-mono text-white/90 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-primary">$250K</span> FROM $1 BILLION. LET'S MAKE HISTORY.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCardSmall className="w-full sm:w-auto min-w-[160px]">
            <div className="text-center">
              <p className="text-xs font-mono text-primary-light mb-1">MARKET CAP</p>
              <p className="text-2xl md:text-3xl font-mono font-bold">
                {loading ? (
                  <span className="text-white/50">---</span>
                ) : (
                  <AnimatedNumber
                    value={data.marketCap}
                    format={formatMarketCap}
                    duration={1500}
                  />
                )}
              </p>
            </div>
          </GlassCardSmall>

          <GlassCardSmall className="w-full sm:w-auto min-w-[160px]">
            <div className="text-center">
              <p className="text-xs font-mono text-primary-light mb-1">PRICE</p>
              <p className="text-2xl md:text-3xl font-mono font-bold">
                {loading ? (
                  <span className="text-white/50">---</span>
                ) : (
                  <PriceDisplay value={data.price} format={formatPrice} />
                )}
              </p>
            </div>
          </GlassCardSmall>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            variant="primary"
            size="lg"
            href={CONFIG.PUMP_FUN_URL}
            pulse={true}
            className="text-lg"
          >
            BUY $250K ON PUMP.FUN
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
