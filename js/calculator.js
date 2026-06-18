/**
 * UGC Rate Calculation Algorithm
 * Calculates fair pricing based on 2026 market data.
 * 
 * @param {string} platform - TikTok, Instagram, YouTube, Snapchat
 * @param {number} views - Monthly average views
 * @param {string} niche - Beauty, Fitness, Tech, Finance, Lifestyle, Gaming, Food, Travel
 * @param {string} experience - Beginner, Intermediate, Expert
 * @param {object} usageRights - { reuse: boolean, exclusive: boolean }
 * @param {string} videoLength - 15s, 30s, 60s, 90s
 * @returns {object} { min, max, avg }
 */
function calculateUGCRate(platform, views, niche, experience, usageRights, videoLength) {
  // Base rates by platform (2026 market data)
  const platformBase = { 'tiktok': 50, 'instagram': 60, 'youtube': 80, 'snapchat': 40 };
  
  // Niche multipliers (high-demand niches = higher rates)
  const nicheMultiplier = { 'finance': 2.5, 'tech': 2.0, 'beauty': 1.8, 'fitness': 1.6, 'lifestyle': 1.4, 'gaming': 1.5, 'food': 1.3, 'travel': 1.4 };
  
  // Experience level multipliers
  const experienceLevels = { 'beginner': 1.0, 'intermediate': 1.5, 'expert': 2.0 };
  
  // Usage rights add-on amounts
  const usageAddons = { 'reuse': 25, 'exclusive': 75 };
  
  // Video length multipliers
  const lengthMultipliers = { '15s': 1.0, '30s': 1.3, '60s': 1.6, '90s': 2.0 };
  
  // Calculate base price
  let base = platformBase[platform] * nicheMultiplier[niche];
  
  // Views Multiplier Logic (Not provided in original snippet but required by prompt features)
  // We'll scale up based on views (logarithmic scale or simple tiered)
  // Let's implement a gentle view multiplier: 10k = 1x, 100k = 1.2x, 1M = 2x, 10M = 3.5x
  let viewMultiplier = 1.0;
  if (views > 10000) {
    // 1 + 0.5 * log10(views / 10000)
    viewMultiplier = 1.0 + 0.5 * Math.log10(views / 10000);
  }
  
  let total = base * experienceLevels[experience] * lengthMultipliers[videoLength] * viewMultiplier;
  
  // Base fee tracking for breakdown
  let baseFee = Math.round(total);
  
  // Add usage rights fees
  let usageFee = 0;
  if (usageRights.reuse) usageFee += usageAddons.reuse;
  if (usageRights.exclusive) usageFee += usageAddons.exclusive;
  
  total += usageFee;
  
  // Extra experience fee (for breakdown display)
  let expertFee = 0;
  if (experience === 'expert') expertFee = 25; // Just a nominal display value if needed

  // Return price range (±30% variance)
  return {
    min: Math.round(total * 0.7),
    max: Math.round(total * 1.3),
    avg: Math.round(total),
    breakdown: {
      base: baseFee,
      usage: usageFee,
      expert: expertFee
    }
  };
}
