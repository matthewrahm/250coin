// Fee sharing configuration
// 3 Top Holders (50%) + 3 Shillers (50%) = 6 recipients total

export const FEE_CONFIG = {
  holderSharePercent: parseFloat(import.meta.env.VITE_HOLDER_SHARE_PERCENT) || 50,
  shillerSharePercent: parseFloat(import.meta.env.VITE_SHILLER_SHARE_PERCENT) || 50,
  perRecipientPercent: parseFloat(import.meta.env.VITE_PER_RECIPIENT_PERCENT) || 16.67,
  trackingDays: parseInt(import.meta.env.VITE_TRACKING_DAYS) || 3,
  minHoldDays: parseInt(import.meta.env.VITE_MIN_HOLD_DAYS) || 3,
}

// Top holders - dynamically populated based on on-chain data
// Must hold for 3+ consecutive days to qualify
export const TOP_HOLDERS = [
  { rank: 1, wallet: null, daysHeld: 0, balance: 0, filled: false },
  { rank: 2, wallet: null, daysHeld: 0, balance: 0, filled: false },
  { rank: 3, wallet: null, daysHeld: 0, balance: 0, filled: false },
]

// Shiller/marketer slots - manually assigned
export const SHILLERS = [
  {
    rank: 1,
    label: "FOUNDER",
    twitter: "@250Coin92141",
    twitterUrl: "https://x.com/250Coin92141",
    filled: true,
    isFounder: true,
  },
  {
    rank: 2,
    label: "SHILLER #2",
    twitter: null,
    twitterUrl: null,
    filled: false,
    isFounder: false,
  },
  {
    rank: 3,
    label: "SHILLER #3",
    twitter: null,
    twitterUrl: null,
    filled: false,
    isFounder: false,
  },
]
