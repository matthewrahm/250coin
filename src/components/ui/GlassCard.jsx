import { motion } from 'framer-motion'

export function GlassCard({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      className={`glass-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(94, 186, 125, 0.2)',
      } : {}}
    >
      {children}
    </motion.div>
  )
}

export function GlassCardSmall({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`glass-card-sm p-4 ${className}`}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: '0 0 20px rgba(94, 186, 125, 0.15)',
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
