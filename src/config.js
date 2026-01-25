export const CONFIG = {
  // Token Info
  TOKEN_NAME: import.meta.env.VITE_TOKEN_NAME || "250",
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

  // URLs
  PUMP_FUN_URL: import.meta.env.VITE_PUMP_FUN_URL || "https://pump.fun/PLACEHOLDER",
  DEXSCREENER_URL: import.meta.env.VITE_DEXSCREENER_URL || "https://dexscreener.com/solana/PLACEHOLDER",
  DEXSCREENER_PAIR: import.meta.env.VITE_DEXSCREENER_PAIR || "PLACEHOLDER_PAIR_ADDRESS",

  // Socials
  TWITTER_URL: import.meta.env.VITE_TWITTER_URL || "https://twitter.com/250coin",
  TELEGRAM_URL: import.meta.env.VITE_TELEGRAM_URL || "",

  // API
  DEXSCREENER_API: import.meta.env.VITE_DEXSCREENER_API || "https://api.dexscreener.com/latest/dex/pairs/solana/PLACEHOLDER",

  // Refresh intervals (ms)
  PRICE_REFRESH_INTERVAL: parseInt(import.meta.env.VITE_PRICE_REFRESH_INTERVAL) || 10000,
}
