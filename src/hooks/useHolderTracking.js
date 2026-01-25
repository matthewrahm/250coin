import { useState, useEffect } from 'react'
import { FEE_CONFIG, TOP_HOLDERS } from '../data/feeRecipients'

const STORAGE_KEY = '250_holder_snapshots'

// FIPS code to state abbreviation mapping (for future state-based holder features)
export const FIPS_TO_STATE = {
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

// Get stored snapshots from localStorage
function getStoredSnapshots() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Store snapshots to localStorage
function storeSnapshots(snapshots) {
  try {
    // Keep only last N days of snapshots
    const trimmed = snapshots.slice(-FEE_CONFIG.trackingDays)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {
    // localStorage might be full or unavailable
  }
}

// Calculate consecutive days held for each wallet
function calculateConsecutiveDays(snapshots) {
  if (snapshots.length === 0) return {}

  const walletDays = {}

  // Get all unique wallets from the most recent snapshot
  const latestSnapshot = snapshots[snapshots.length - 1]
  if (!latestSnapshot?.holders) return {}

  for (const holder of latestSnapshot.holders) {
    let consecutiveDays = 0

    // Count backwards through snapshots
    for (let i = snapshots.length - 1; i >= 0; i--) {
      const snapshot = snapshots[i]
      const found = snapshot.holders?.find(h => h.wallet === holder.wallet && h.balance > 0)

      if (found) {
        consecutiveDays++
      } else {
        break
      }
    }

    walletDays[holder.wallet] = {
      daysHeld: consecutiveDays,
      balance: holder.balance,
      qualified: consecutiveDays >= FEE_CONFIG.minHoldDays,
    }
  }

  return walletDays
}

// Get qualified top holders (held 3+ days, ranked by balance)
function getQualifiedHolders(walletDays) {
  const qualified = Object.entries(walletDays)
    .filter(([_, data]) => data.qualified)
    .sort((a, b) => b[1].balance - a[1].balance)
    .slice(0, 3)

  return TOP_HOLDERS.map((slot, index) => {
    if (qualified[index]) {
      const [wallet, data] = qualified[index]
      return {
        ...slot,
        wallet,
        daysHeld: data.daysHeld,
        balance: data.balance,
        filled: true,
      }
    }
    return slot
  })
}

// Format wallet address for display (truncated)
export function formatWallet(wallet) {
  if (!wallet) return null
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
}

// Format balance for display
export function formatBalance(balance) {
  if (!balance || balance === 0) return '0'
  if (balance >= 1_000_000) {
    return `${(balance / 1_000_000).toFixed(2)}M`
  }
  if (balance >= 1_000) {
    return `${(balance / 1_000).toFixed(1)}K`
  }
  return balance.toLocaleString()
}

export function useHolderTracking() {
  const [holders, setHolders] = useState(TOP_HOLDERS)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    async function fetchAndUpdateHolders() {
      setLoading(true)

      try {
        // Get existing snapshots
        const snapshots = getStoredSnapshots()

        // Check if we need a new snapshot (once per day)
        const today = new Date().toISOString().split('T')[0]
        const lastSnapshotDate = snapshots[snapshots.length - 1]?.date

        if (lastSnapshotDate !== today) {
          // TODO: Fetch real holder data from DexScreener or Solana RPC
          // For MVP, we'll use mock data or skip if no API is configured

          // Mock example - replace with real API call:
          // const response = await fetch('https://api.dexscreener.com/...')
          // const data = await response.json()
          // const holders = data.holders.map(h => ({ wallet: h.address, balance: h.amount }))

          // For now, just use existing data
          const mockHolders = [
            // Add mock holders here for testing, or leave empty for production
          ]

          if (mockHolders.length > 0) {
            snapshots.push({
              date: today,
              holders: mockHolders,
            })
            storeSnapshots(snapshots)
          }
        }

        // Calculate qualified holders
        const walletDays = calculateConsecutiveDays(snapshots)
        const qualifiedHolders = getQualifiedHolders(walletDays)

        setHolders(qualifiedHolders)
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Failed to fetch holder data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAndUpdateHolders()

    // Refresh every hour
    const interval = setInterval(fetchAndUpdateHolders, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { holders, loading, lastUpdated }
}
