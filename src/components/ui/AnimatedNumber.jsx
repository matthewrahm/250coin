import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function AnimatedNumber({
  value,
  format = (n) => n.toString(),
  duration = 1000,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prevValue = useRef(value)

  // Initial count-up animation
  useEffect(() => {
    if (!isInView || hasAnimated) return

    let startTime = null
    let animationFrame = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(value * easeOut)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration, hasAnimated])

  // Update on value change after initial animation
  useEffect(() => {
    if (!hasAnimated) return
    if (value === prevValue.current) return

    prevValue.current = value
    setDisplayValue(value)
  }, [value, hasAnimated])

  return (
    <motion.span
      ref={ref}
      className={`font-mono ${className}`}
      key={value}
      initial={hasAnimated ? { color: '#5EBA7D' } : {}}
      animate={hasAnimated ? { color: '#FFFFFF' } : {}}
      transition={{ duration: 0.5 }}
    >
      {format(displayValue)}
    </motion.span>
  )
}

export function PriceDisplay({ value, format, className = '' }) {
  const [flash, setFlash] = useState(false)
  const prevValue = useRef(value)

  useEffect(() => {
    if (value !== prevValue.current) {
      setFlash(true)
      prevValue.current = value
      const timer = setTimeout(() => setFlash(false), 500)
      return () => clearTimeout(timer)
    }
  }, [value])

  return (
    <span className={`font-mono transition-all duration-200 ${flash ? 'text-primary glow-text' : ''} ${className}`}>
      {format(value)}
    </span>
  )
}
