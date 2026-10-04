import { useState, useCallback, useMemo } from 'react';

// Custom debounce implementation
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Configuration constants (moved here to avoid circular dependency)
const SEARCH_CONFIG = {
  MIN_CHARACTERS: 2,
  DEBOUNCE_DELAY: 300,
  SEARCH_FIELDS: ['title', 'body', 'type'],
};

export const useNotificationFilter = (notifications = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      setSearchTerm(term);
    }, SEARCH_CONFIG.DEBOUNCE_DELAY),
    []
  );

  // Filter notifications based on search, filter type, and category
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Apply search filter
    if (searchTerm.length >= SEARCH_CONFIG.MIN_CHARACTERS) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(notif => 
        SEARCH_CONFIG.SEARCH_FIELDS.some(field => {
          const value = notif[field];
          return value && value.toString().toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply status filter
    if (filterType !== 'all') {
      filtered = filtered.filter(notif => {
        if (filterType === 'unread') return notif.status === 1;
        if (filterType === 'read') return notif.status === 2;
        return true;
      });
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(notif => notif.type === selectedCategory);
    }

    return filtered;
  }, [notifications, searchTerm, filterType, selectedCategory]);

  // Get unique categories from notifications
  const availableCategories = useMemo(() => {
    const categories = new Set();
    notifications.forEach(notif => {
      if (notif.type) {
        categories.add(notif.type);
      }
    });
    return Array.from(categories);
  }, [notifications]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilterType('all');
    setSelectedCategory('all');
  }, []);

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (filterType !== 'all') count++;
    if (selectedCategory !== 'all') count++;
    return count;
  }, [searchTerm, filterType, selectedCategory]);

  // Check if any filters are active
  const hasActiveFilters = activeFiltersCount > 0;

  return {
    // State
    searchTerm,
    filterType,
    selectedCategory,
    
    // Computed values
    filteredNotifications,
    availableCategories,
    activeFiltersCount,
    hasActiveFilters,
    
    // Actions
    setSearchTerm: debouncedSearch,
    setFilterType,
    setSelectedCategory,
    clearFilters,
  };
};
