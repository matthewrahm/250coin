// Roadmap milestones — focused on pushing Pumpfun to $1B revenue

export const ROADMAP_MILESTONES = [
  {
    id: 0,
    marketCap: 50000,
    title: "LAUNCH",
    subtitle: "$50K Market Cap",
    features: [
      "Token live on Pumpfun",
      "Community starts forming",
      "Every trade contributes fees toward $1B revenue"
    ],
    icon: "rocket",
    isPrimary: false,
  },
  {
    id: 1,
    marketCap: 250000,
    title: "$250K CONTRIBUTED",
    subtitle: "$250K Market Cap",
    features: [
      "Pumpfun crosses $1 BILLION in lifetime revenue",
      "We were the coin that pushed it over",
      "Historic milestone achieved"
    ],
    icon: "trophy",
    isPrimary: true,
  },
  {
    id: 2,
    marketCap: 1000000,
    title: "PUMPFUN SHOUTOUT",
    subtitle: "$1M Market Cap",
    features: [
      "Campaign for official Pumpfun recognition",
      "The coin that hit the $1B milestone gets its spotlight",
      "Community rallies for the shoutout"
    ],
    icon: "chart",
    isPrimary: false,
  },
  {
    id: 3,
    marketCap: 5000000,
    title: "LEGENDARY STATUS",
    subtitle: "$5M Market Cap",
    features: [
      "Cemented as the coin that made Pumpfun history",
      "Community-driven next chapter",
      "The coin that changed everything"
    ],
    icon: "users",
    isPrimary: false,
  },
]

// Helper to get milestone status based on current market cap
export function getMilestoneStatus(milestone, currentMarketCap) {
  if (currentMarketCap >= milestone.marketCap) {
    return 'completed'
  }

  const sortedMilestones = [...ROADMAP_MILESTONES].sort((a, b) => a.marketCap - b.marketCap)
  const nextMilestone = sortedMilestones.find(m => currentMarketCap < m.marketCap)

  if (nextMilestone && nextMilestone.id === milestone.id) {
    return 'current'
  }

  return 'locked'
}

// Get overall progress percentage
export function getOverallProgress(currentMarketCap) {
  const maxMilestone = Math.max(...ROADMAP_MILESTONES.map(m => m.marketCap))
  return Math.min((currentMarketCap / maxMilestone) * 100, 100)
}
