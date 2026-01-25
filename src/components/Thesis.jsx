import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'

const steps = [
  {
    number: '01',
    title: 'WIN',
    description: '250 gets selected as one of the 12 Pump.fun hackathon winners',
  },
  {
    number: '02',
    title: 'BUY',
    description: 'We take the full $250,000 prize and market buy our own token',
  },
  {
    number: '03',
    title: 'PUMP',
    description: '$250K buy = massive green candle for all holders',
  },
]

export function Thesis() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
            THE <span className="text-primary">THESIS</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-mono">
            "Pump.fun is giving $250K to 12 projects.
            <br />
            We are 250. If we win, we buy $250K of our own token.
            <br />
            <span className="text-primary">Simple as that.</span>"
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {steps.map((step, index) => (
            <GlassCard key={step.number} delay={index * 0.15} className="relative z-10">
              <div className="text-center">
                {/* Step number */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 mb-4"
                  whileHover={{
                    borderColor: 'rgba(94, 186, 125, 0.8)',
                    boxShadow: '0 0 20px rgba(94, 186, 125, 0.4)',
                  }}
                >
                  <span className="text-2xl font-mono font-bold text-primary">{step.number}</span>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-mono font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-primary/50 mx-auto mb-4" />

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Arrow indicators between cards (mobile) */}
        <div className="flex flex-col items-center gap-4 mt-6 md:hidden">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2 }}
            >
              <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
