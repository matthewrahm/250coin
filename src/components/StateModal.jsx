import { motion, AnimatePresence } from 'framer-motion'
import { STATE_NAMES, STATE_POSTS } from '../data/statePosts'

export function StateModal({ stateCode, isOpen, onClose }) {
  const stateName = STATE_NAMES[stateCode] || stateCode
  const posts = STATE_POSTS[stateCode] || []

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="glass-card p-6 max-h-[70vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-mono font-bold text-primary">{stateName}</h3>
                  <p className="text-sm text-white/50 font-mono">
                    {posts.length} post{posts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="glass-button p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Posts */}
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post, index) => (
                    <motion.a
                      key={index}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block glass-card-sm p-4 hover:border-primary/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        {post.type === 'twitter' ? (
                          <TwitterIcon className="w-5 h-5 text-primary" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-primary" />
                        )}
                        <span className="font-mono text-sm text-white/80">
                          {post.username || 'View Post'}
                        </span>
                        <svg className="w-4 h-4 text-white/50 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/50 font-mono mb-2">
                    No posts from {stateName} yet.
                  </p>
                  <p className="text-primary font-mono text-lg">
                    Be the first!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ImageIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
