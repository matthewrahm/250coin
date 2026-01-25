export const CONFIG = {
  // Token Info
  TOKEN_NAME: import.meta.env.VITE_TOKEN_NAME || "250",
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

  // URLs
  PUMP_FUN_URL: import.meta.env.VITE_PUMP_FUN_URL || "https://pump.fun/PLACEHOLDER",

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
  TWITTER_URL: import.meta.env.VITE_TWITTER_URL || "https://x.com/250Coin92141",
  TELEGRAM_URL: import.meta.env.VITE_TELEGRAM_URL || "",

  // Refresh intervals (ms)
  PRICE_REFRESH_INTERVAL: parseInt(import.meta.env.VITE_PRICE_REFRESH_INTERVAL) || 10000,
}
