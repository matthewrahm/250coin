import { useState, useEffect, useCallback } from 'react'
import { CONFIG } from '../config'

const MOCK_DATA = {
  price: 0,
  priceChange24h: 0,
  marketCap: 0,
  volume24h: 0,
  holders: 0,
  liquidity: 0,
}

export function useTokenData() {
  const [data, setData] = useState(MOCK_DATA)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchData = useCallback(async () => {
    // If using placeholder, return mock data
    if (CONFIG.DEXSCREENER_PAIR === "PLACEHOLDER_PAIR_ADDRESS") {
      setData(MOCK_DATA)
      setLoading(false)
      setLastUpdate(new Date())
      return
    }

    try {
      const response = await fetch(CONFIG.DEXSCREENER_API)
      if (!response.ok) throw new Error('Failed to fetch')

      const json = await response.json()
      const pair = json.pairs?.[0]

      if (pair) {
        setData({
          price: parseFloat(pair.priceUsd) || 0,
          priceChange24h: parseFloat(pair.priceChange?.h24) || 0,
          marketCap: parseFloat(pair.fdv) || 0,
          volume24h: parseFloat(pair.volume?.h24) || 0,
          holders: pair.holders || 0,
          liquidity: parseFloat(pair.liquidity?.usd) || 0,
        })
        setError(null)
      }
    } catch (err) {
      console.error('Error fetching token data:', err)
      setError(err.message)
      // Keep using previous data on error
    } finally {
      setLoading(false)
      setLastUpdate(new Date())
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, CONFIG.PRICE_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchData])

  return { data, loading, error, lastUpdate, refetch: fetchData }
}

export function formatPrice(price) {
  if (price < 0.00001) return `$${price.toExponential(2)}`
  if (price < 0.01) return `$${price.toFixed(6)}`
  if (price < 1) return `$${price.toFixed(4)}`
  return `$${price.toFixed(2)}`
}

export function formatMarketCap(mcap) {
  if (mcap >= 1000000000) return `$${(mcap / 1000000000).toFixed(2)}B`
  if (mcap >= 1000000) return `$${(mcap / 1000000).toFixed(2)}M`
  if (mcap >= 1000) return `$${(mcap / 1000).toFixed(1)}K`
  return `$${mcap.toFixed(0)}`
}

export function formatVolume(vol) {
  if (vol >= 1000000) return `$${(vol / 1000000).toFixed(2)}M`
  if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`
  return `$${vol.toFixed(0)}`
}

export function formatPercent(pct) {
  const sign = pct >= 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

export function formatNumber(num) {
  return num.toLocaleString()
}
