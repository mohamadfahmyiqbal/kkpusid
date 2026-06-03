import { useMemo } from 'react';

// Feature flags configuration (moved here to avoid circular dependency)
const FEATURES = {
  SEARCH: true,
  FILTER: true,
  CATEGORIES: true,
  BULK_ACTIONS: true,
  REAL_TIME: true,
  PUSH_NOTIFICATIONS: false, // Enable when ready
  NOTIFICATION_PREFERENCES: false, // Enable when ready
};

export const useNotificationFeatures = () => {
  const features = useMemo(() => {
    return {
      // Core features
      search: FEATURES.SEARCH,
      filter: FEATURES.FILTER,
      categories: FEATURES.CATEGORIES,
      bulkActions: FEATURES.BULK_ACTIONS,
      
      // Advanced features
      realTime: FEATURES.REAL_TIME,
      pushNotifications: FEATURES.PUSH_NOTIFICATIONS,
      preferences: FEATURES.NOTIFICATION_PREFERENCES,
      
      // Helper methods
      isEnabled: (feature) => FEATURES[feature.toUpperCase()] || false,
      getEnabledFeatures: () => Object.entries(FEATURES)
        .filter(([_, enabled]) => enabled)
        .map(([name]) => name.toLowerCase()),
    };
  }, []);

  return features;
};
