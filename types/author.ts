/**
 * Interface for an author
 */
export interface Author {
  // Basic information
  name: string;
  slug: string;
  namespace: string;
  key: string;
  
  // Profile
  profileImage?: string;
  avatar?: string; // Alternative to profileImage
  about?: string;
  bio?: string; // Alias for about, used in team members
  
  // Role information
  role?: string;
  title?: string;
  quote?: string;
  
  // Social media
  github?: string;
  twitter?: string;
  website?: string;
  
  // Team-specific fields
  joinDate?: string;
  onProbation?: boolean;
}

/**
 * Interface for author reference (used in relationships)
 */
export interface AuthorReference {
  namespace: string;
  key: string;
}