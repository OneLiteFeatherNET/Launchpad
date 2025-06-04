import type { ProjectStatus } from '~/composables/useProjectStatus';

/**
 * Interface for a project
 */
export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  namespace: string;
  key: string;
  featured?: boolean;
  image?: string;
  github?: string;
  twitter?: string;
  website?: string;
  authors?: Array<{
    namespace: string;
    key: string;
  }>;
  features?: string[];
  roadmap?: RoadmapItem[];
  bstats?: {
    pluginId: string;
    showServers?: boolean;
    showPlayers?: boolean;
  };
  slug?: string;
  isAffiliate?: boolean;
}

/**
 * Interface for a roadmap item
 */
export interface RoadmapItem {
  title: string;
  description: string;
  status: ProjectStatus;
}