export const CONFIG = {
  // Token Info
  TOKEN_NAME: import.meta.env.VITE_TOKEN_NAME || "250K",
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

  // URLs
  get PUMP_FUN_URL() {
    return import.meta.env.VITE_PUMP_FUN_URL || `https://pump.fun/coin/${this.CONTRACT_ADDRESS}`
  },

  // Derived from CONTRACT_ADDRESS
  get DEXSCREENER_URL() {
    return `https://dexscreener.com/solana/${this.CONTRACT_ADDRESS}`
  },
  get DEXSCREENER_PAIR() {
    return this.CONTRACT_ADDRESS
  },
  get DEXSCREENER_API() {
    return `https://api.dexscreener.com/latest/dex/tokens/${this.CONTRACT_ADDRESS}`
  },

  // Socials
  TWITTER_URL: import.meta.env.VITE_TWITTER_URL || "https://x.com/The250Coin",
  TELEGRAM_URL: import.meta.env.VITE_TELEGRAM_URL || "",

  // Refresh intervals (ms)
  PRICE_REFRESH_INTERVAL: parseInt(import.meta.env.VITE_PRICE_REFRESH_INTERVAL) || 10000,
}
