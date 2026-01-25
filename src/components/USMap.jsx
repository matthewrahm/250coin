import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { STATE_POSTS, STATE_NAMES } from '../data/statePosts'
import { StateModal } from './StateModal'

// US Atlas TopoJSON URL
const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// FIPS code to state abbreviation mapping
const FIPS_TO_STATE = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY',
}

export function USMap() {
  const [selectedState, setSelectedState] = useState(null)
  const [hoveredState, setHoveredState] = useState(null)

  const hasPostsForState = (stateCode) => {
    return STATE_POSTS[stateCode]?.length > 0
  }

  const getStateCode = (geo) => {
    // geo.id is the FIPS code (e.g., "06" for California)
    const fips = geo.id.toString().padStart(2, '0')
    return FIPS_TO_STATE[fips] || null
  }

  return (
    <section id="map" className="relative py-20 px-4">
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
            250 <span className="text-primary">ARMY</span> ACROSS AMERICA
          </h2>
          <p className="text-lg text-white/70 font-mono">
            Click a state to see community posts
          </p>
        </motion.div>

        {/* Hovered state indicator */}
        <div className="h-8 text-center mb-4">
          {hoveredState && (
            <motion.p
              className="font-mono text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {STATE_NAMES[hoveredState]}
              {hasPostsForState(hoveredState) && (
                <span className="text-white/50 ml-2">
                  ({STATE_POSTS[hoveredState].length} posts)
                </span>
              )}
            </motion.p>
          )}
        </div>

        {/* Map container */}
        <motion.div
          className="glass-card p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{
              scale: 1000,
            }}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
            }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateCode = getStateCode(geo)
                  if (!stateCode) return null

                  const hasPosts = hasPostsForState(stateCode)
                  const isHovered = hoveredState === stateCode

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => setSelectedState(stateCode)}
                      onMouseEnter={() => setHoveredState(stateCode)}
                      onMouseLeave={() => setHoveredState(null)}
                      style={{
                        default: {
                          fill: hasPosts
                            ? 'rgba(94, 186, 125, 0.4)'
                            : 'rgba(94, 186, 125, 0.15)',
                          stroke: 'rgba(94, 186, 125, 0.5)',
                          strokeWidth: 0.75,
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        },
                        hover: {
                          fill: 'rgba(94, 186, 125, 0.6)',
                          stroke: 'rgba(94, 186, 125, 0.8)',
                          strokeWidth: 1,
                          outline: 'none',
                          cursor: 'pointer',
                          filter: 'drop-shadow(0 0 10px rgba(94, 186, 125, 0.6))',
                        },
                        pressed: {
                          fill: 'rgba(94, 186, 125, 0.5)',
                          stroke: 'rgba(94, 186, 125, 0.8)',
                          strokeWidth: 1,
                          outline: 'none',
                          cursor: 'pointer',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/40 border border-primary/50" />
            <span className="text-sm font-mono text-white/70">Has posts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/15 border border-primary/50" />
            <span className="text-sm font-mono text-white/70">No posts yet</span>
          </div>
        </div>
      </div>

      {/* State Modal */}
      <StateModal
        stateCode={selectedState}
        isOpen={selectedState !== null}
        onClose={() => setSelectedState(null)}
      />
    </section>
  )
}
