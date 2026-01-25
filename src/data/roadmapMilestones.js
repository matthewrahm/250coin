// Roadmap milestones based on market cap
// Each milestone unlocks new features and benefits

export const ROADMAP_MILESTONES = [
  {
    id: 1,
    marketCap: 100000,
    title: "The Beginning",
    subtitle: "$100K Market Cap",
    features: [
      "First shiller slot opens",
      "Community recognition begins",
      "Foundation established"
    ],
    icon: "rocket",
    isPrimary: false,
  },
  {
    id: 2,
    marketCap: 250000,
    title: "THE PRIZE",
    subtitle: "$250K Market Cap",
    features: [
      "First holder slot opens",
      "$250K market buy executed",
      "The thesis fulfilled"
    ],
    icon: "trophy",
    isPrimary: true,
  },
  {
    id: 3,
    marketCap: 500000,
    title: "Expansion",
    subtitle: "$500K Market Cap",
    features: [
      "Second shiller + holder slots",
      "Holder dashboard beta launch",
      "Enhanced fee tracking"
    ],
    icon: "chart",
    isPrimary: false,
  },
  {
    id: 4,
    marketCap: 1000000,
    title: "Full Operation",
    subtitle: "$1M Market Cap",
    features: [
      "All 6 fee sharing slots active",
      "Full dashboard with fee tracking",
      "Complete ecosystem live"
    ],
    icon: "users",
    isPrimary: false,
  },
  {
    id: 5,
    marketCap: 5000000,
    title: "Community Governance",
    subtitle: "$5M Market Cap",
    features: [
      "Governance voting enabled",
      "Community-driven decisions",
      "DAO structure implemented"
    ],
    icon: "vote",
    isPrimary: false,
  },
]

// Helper to get milestone status based on current market cap
export function getMilestoneStatus(milestone, currentMarketCap) {
  if (currentMarketCap >= milestone.marketCap) {
    return 'completed'
  }

  // Find the next milestone
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
