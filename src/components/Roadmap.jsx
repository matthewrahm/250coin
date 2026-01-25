import { motion } from 'framer-motion'
import { useTokenData, formatMarketCap } from '../hooks/useTokenData'
import { ROADMAP_MILESTONES, getMilestoneStatus, getOverallProgress } from '../data/roadmapMilestones'

// Icon components
const RocketIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
)

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const VoteIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const iconMap = {
  rocket: RocketIcon,
  trophy: TrophyIcon,
  chart: ChartIcon,
  users: UsersIcon,
  vote: VoteIcon,
}

function MilestoneNode({ milestone, status, index, isLast }) {
  const Icon = iconMap[milestone.icon] || RocketIcon
  const isCompleted = status === 'completed'
  const isCurrent = status === 'current'

  return (
    <motion.div
      className="relative flex gap-6 md:gap-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        {/* Node circle */}
        <motion.div
          className={`
            relative z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2
            ${isCompleted
              ? 'bg-primary/20 border-primary text-primary'
              : isCurrent
                ? 'bg-primary/10 border-primary text-primary animate-pulse'
                : 'bg-white/5 border-white/20 text-white/40'
            }
          `}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {isCompleted ? <CheckIcon /> : <Icon />}

          {/* Glow effect for current/completed */}
          {(isCompleted || isCurrent) && (
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div className="relative w-0.5 flex-1 min-h-[80px]">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary to-primary/50"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: isCompleted ? 1 : 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        )}
      </div>

      {/* Content card */}
      <motion.div
        className={`
          flex-1 glass-card p-5 md:p-6 mb-6
          ${milestone.isPrimary ? 'border-primary/50' : ''}
          ${isCurrent ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-bg-dark' : ''}
        `}
        whileHover={{
          scale: 1.02,
          boxShadow: isCompleted || isCurrent
            ? '0 0 30px rgba(94, 186, 125, 0.3)'
            : '0 0 20px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {isCurrent && (
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-primary/20 text-primary rounded-full">
              CURRENT
            </span>
          )}
          {!isCompleted && !isCurrent && (
            <span className="px-2 py-0.5 text-xs font-mono bg-white/10 text-white/50 rounded-full flex items-center gap-1">
              <LockIcon /> LOCKED
            </span>
          )}
          {isCompleted && (
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-primary/20 text-primary rounded-full flex items-center gap-1">
              <CheckIcon /> UNLOCKED
            </span>
          )}
          {milestone.isPrimary && (
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-yellow-500/20 text-yellow-400 rounded-full">
              KEY MILESTONE
            </span>
          )}
        </div>

        {/* Title and subtitle */}
        <h3 className={`
          text-xl md:text-2xl font-mono font-bold mb-1
          ${isCompleted || isCurrent ? 'text-white' : 'text-white/50'}
        `}>
          {milestone.title}
        </h3>
        <p className={`
          text-sm font-mono mb-4
          ${isCompleted || isCurrent ? 'text-primary' : 'text-white/30'}
        `}>
          {milestone.subtitle}
        </p>

        {/* Features list */}
        <ul className="space-y-2">
          {milestone.features.map((feature, i) => (
            <li
              key={i}
              className={`
                flex items-start gap-2 text-sm
                ${isCompleted || isCurrent ? 'text-white/80' : 'text-white/40'}
              `}
            >
              <span className={`
                mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                ${isCompleted ? 'bg-primary' : isCurrent ? 'bg-primary/50' : 'bg-white/30'}
              `} />
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export function Roadmap() {
  const { data, loading } = useTokenData()
  const currentMarketCap = data?.marketCap || 0
  const progress = getOverallProgress(currentMarketCap)

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            THE <span className="text-primary">ROADMAP</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-6">
            Market cap milestones that unlock new features and rewards for the community.
          </p>

          {/* Current market cap display */}
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-card-sm rounded-full">
            <span className="text-white/60 text-sm font-mono">Current Market Cap:</span>
            {loading ? (
              <span className="text-primary font-mono font-bold animate-pulse">Loading...</span>
            ) : (
              <span className="text-primary font-mono font-bold text-lg">
                {formatMarketCap(currentMarketCap)}
              </span>
            )}
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-between text-xs font-mono text-white/50 mb-2">
            <span>$0</span>
            <span>$5M</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-mono text-white/40">
              {progress.toFixed(1)}% to final milestone
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {ROADMAP_MILESTONES.map((milestone, index) => (
            <MilestoneNode
              key={milestone.id}
              milestone={milestone}
              status={getMilestoneStatus(milestone, currentMarketCap)}
              index={index}
              isLast={index === ROADMAP_MILESTONES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
