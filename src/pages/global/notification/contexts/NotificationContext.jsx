import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  notifications: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  unreadCount: 0,
  filters: {
    status: null, // null, 1 (unread), 2 (read)
    type: null,
    dateFrom: null,
    dateTo: null
  }
};

// Action types
const NOTIFICATION_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_ERROR: 'SET_ERROR',
  SET_PAGINATION: 'SET_PAGINATION',
  MARK_AS_READ: 'MARK_AS_READ',
  MARK_ALL_AS_READ: 'MARK_ALL_AS_READ',
  SET_FILTERS: 'SET_FILTERS',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case NOTIFICATION_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
        unreadCount: action.payload.notifications.filter(n => n.status === 1).length
      };

    case NOTIFICATION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case NOTIFICATION_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages
      };

    case NOTIFICATION_ACTIONS.MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notif => 
          notif.id === action.payload 
            ? { ...notif, status: 2 }
            : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };

    case NOTIFICATION_ACTIONS.MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notif => ({ ...notif, status: 2 })),
        unreadCount: 0
      };

    case NOTIFICATION_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1 // Reset to first page when filters change
      };

    case NOTIFICATION_ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// Context
const NotificationContext = createContext();

// Provider
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Actions
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: NOTIFICATION_ACTIONS.SET_LOADING, payload: loading });
    },

    setNotifications: (notifications) => {
      dispatch({ 
        type: NOTIFICATION_ACTIONS.SET_NOTIFICATIONS, 
        payload: { notifications } 
      });
    },

    setError: (error) => {
      dispatch({ type: NOTIFICATION_ACTIONS.SET_ERROR, payload: error });
    },

    setPagination: (currentPage, totalPages) => {
      dispatch({ 
        type: NOTIFICATION_ACTIONS.SET_PAGINATION, 
        payload: { currentPage, totalPages } 
      });
    },

    markAsRead: (id) => {
      dispatch({ type: NOTIFICATION_ACTIONS.MARK_AS_READ, payload: id });
    },

    markAllAsRead: () => {
      dispatch({ type: NOTIFICATION_ACTIONS.MARK_ALL_AS_READ });
    },

    setFilters: (filters) => {
      dispatch({ type: NOTIFICATION_ACTIONS.SET_FILTERS, payload: filters });
    },

    resetState: () => {
      dispatch({ type: NOTIFICATION_ACTIONS.RESET_STATE });
    }
  };

  const value = {
    ...state,
    ...actions,
    NOTIFICATION_ACTIONS
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
