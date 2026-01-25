import { motion } from 'framer-motion'

export function Button({
  children,
  variant = 'default',
  size = 'md',
  href,
  onClick,
  className = '',
  pulse = false,
  ...props
}) {
  const baseClasses = variant === 'primary' ? 'glass-button-primary' : 'glass-button'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseClasses} ${sizeClasses[size]} ${className} inline-flex items-center justify-center gap-2 font-mono font-semibold`

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  )

  const pulseRing = pulse && (
    <motion.span
      className="absolute inset-0 rounded-xl border-2 border-primary"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {pulseRing}
        {content}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {pulseRing}
      {content}
    </button>
  )
}

export function IconButton({ children, href, onClick, className = '', ...props }) {
  const classes = `glass-button p-3 ${className}`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
