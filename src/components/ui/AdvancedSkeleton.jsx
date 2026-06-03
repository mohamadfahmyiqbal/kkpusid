import React from 'react';
import { COLORS, SPACING, ANIMATIONS } from '../../constants/designTokens';

const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  lines = 1, 
  className = '', 
  animated = true,
  rounded = 'md',
  ...props 
}) => {
  const baseClasses = `skeleton ${animated ? 'animate-pulse' : ''} ${className}`;
  const borderRadius = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }[rounded] || 'rounded-md';

  const skeletonStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: animated ? 'shimmer 1.5s infinite' : 'none',
    width: width || '100%',
    height: height || '1rem',
  };

  if (variant === 'text') {
    return (
      <div className={baseClasses} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${borderRadius} mb-2`}
            style={{
              ...skeletonStyle,
              width: i === lines - 1 ? '70%' : '100%',
              height: '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circular') {
    return (
      <div
        className={`${baseClasses} ${borderRadius}`}
        style={{
          ...skeletonStyle,
          width: width || '40px',
          height: height || '40px',
        }}
        {...props}
      />
    );
  }

  if (variant === 'rectangular') {
    return (
      <div
        className={`${baseClasses} ${borderRadius}`}
        style={skeletonStyle}
        {...props}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} ${borderRadius}`}
      style={skeletonStyle}
      {...props}
    />
  );
};

// Skeleton components for specific use cases
export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
    <div className="flex items-center mb-4">
      <Skeleton variant="circular" width={48} height={48} className="mr-4" />
      <div className="flex-1">
        <Skeleton width="60%" height={20} className="mb-2" />
        <Skeleton width="40%" height={16} />
      </div>
    </div>
    <Skeleton lines={3} />
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {Array.from({ length: columns }, (_, i) => (
            <th key={i} className="px-6 py-3">
              <Skeleton height={20} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }, (_, colIndex) => (
              <td key={colIndex} className="px-6 py-4">
                <Skeleton height={16} width={colIndex === 0 ? '80%' : '60%'} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ListSkeleton = ({ items = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: items }, (_, i) => (
      <div key={i} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
        <Skeleton variant="circular" width={40} height={40} className="mr-4" />
        <div className="flex-1">
          <Skeleton width="70%" height={18} className="mb-2" />
          <Skeleton width="50%" height={14} />
        </div>
        <Skeleton width={80} height={32} rounded="lg" />
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between">
      <Skeleton width={200} height={32} />
      <div className="flex space-x-2">
        <Skeleton width={100} height={36} rounded="lg" />
        <Skeleton width={100} height={36} rounded="lg" />
      </div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton width={60} height={20} />
          </div>
          <Skeleton width="80%" height={24} className="mb-2" />
          <Skeleton width="60%" height={16} />
        </div>
      ))}
    </div>

    {/* Chart Skeleton */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <Skeleton width={150} height={20} className="mb-4" />
      <Skeleton height={300} />
    </div>

    {/* Recent Activity Skeleton */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <Skeleton width={180} height={20} className="mb-4" />
      <ListSkeleton items={3} />
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <Skeleton width={200} height={24} className="mb-6" />
      
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <Skeleton width={120} height={16} className="mb-2" />
            <Skeleton height={44} rounded="md" />
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Skeleton width={100} height={40} rounded="lg" />
        <Skeleton width={120} height={40} rounded="lg" />
      </div>
    </div>
  </div>
);

// Add shimmer animation to global styles
export const SkeletonStyles = () => (
  <style jsx>{`
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .skeleton {
      border-radius: 0.375rem;
      display: inline-block;
      line-height: 1;
    }
    
    .dark .skeleton {
      background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
      background-size: 200% 100%;
    }
  `}</style>
);

export default Skeleton;
