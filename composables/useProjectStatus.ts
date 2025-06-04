import { computed } from 'vue';

// Define the possible project status values
export type ProjectStatus = 
  | 'Evaluierung' | 'Evaluation'
  | 'Prototypen' | 'Prototype'
  | 'Entwicklung' | 'Development'
  | 'Wartung' | 'Maintenance'
  | 'Archiviert' | 'Archived'
  | 'Aufgegeben' | 'Abandoned';

/**
 * Composable for handling project status-related functionality
 */
export const useProjectStatus = () => {
  // Map status strings to translation keys
  const statusTranslationMap: Record<ProjectStatus, string> = {
    'Evaluierung': 'evaluation',
    'Evaluation': 'evaluation',
    'Prototypen': 'prototype',
    'Prototype': 'prototype',
    'Entwicklung': 'development',
    'Development': 'development',
    'Wartung': 'maintenance',
    'Maintenance': 'maintenance',
    'Archiviert': 'archived',
    'Archived': 'archived',
    'Aufgegeben': 'abandoned',
    'Abandoned': 'abandoned'
  };

  // Map status strings to color classes
  const statusColorMap: Record<ProjectStatus, string> = {
    'Evaluierung': 'info',
    'Evaluation': 'info',
    'Prototypen': 'warning',
    'Prototype': 'warning',
    'Entwicklung': 'success',
    'Development': 'success',
    'Wartung': 'primary',
    'Maintenance': 'primary',
    'Archiviert': 'secondary',
    'Archived': 'secondary',
    'Aufgegeben': 'error',
    'Abandoned': 'error'
  };

  /**
   * Get the translation key for a given status
   */
  const getStatusTranslationKey = (status: string) => {
    return statusTranslationMap[status as ProjectStatus] || 'evaluation';
  };

  /**
   * Get the color class for a given status
   */
  const getStatusColor = (status: string) => {
    return statusColorMap[status as ProjectStatus] || 'primary';
  };

  /**
   * Check if a status is in a specific category
   */
  const isStatusInCategory = (status: string, category: 'active' | 'inactive') => {
    const activeStatuses: ProjectStatus[] = [
      'Evaluierung', 'Evaluation', 
      'Prototypen', 'Prototype', 
      'Entwicklung', 'Development', 
      'Wartung', 'Maintenance'
    ];
    
    const isActive = activeStatuses.includes(status as ProjectStatus);
    return category === 'active' ? isActive : !isActive;
  };

  return {
    getStatusTranslationKey,
    getStatusColor,
    isStatusInCategory
  };
};