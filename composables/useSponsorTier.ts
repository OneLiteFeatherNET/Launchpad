import { z } from 'zod';

// Define the sponsor tier enum
export const SponsorTierEnum = z.enum(['Platinum', 'Gold', 'Silver', 'Bronze']);
export type SponsorTier = z.infer<typeof SponsorTierEnum>;

// Function to get tier color
export const useSponsorTier = () => {
  // Tier color mapping with Material Design 3 colors in descending order
  const tierColorMap = {
    'Platinum': 'primary',
    'Gold': 'warning',
    'Silver': 'secondary',
    'Bronze': 'tertiary'
  };

  // Get tier color
  const getTierColor = (tier: string) => {
    return tierColorMap[tier as SponsorTier] || 'primary';
  };

  return {
    tierColorMap,
    getTierColor
  };
};

// Export the enum values for direct use
export const SponsorTiers = {
  PLATINUM: 'Platinum' as SponsorTier,
  GOLD: 'Gold' as SponsorTier,
  SILVER: 'Silver' as SponsorTier,
  BRONZE: 'Bronze' as SponsorTier
};
