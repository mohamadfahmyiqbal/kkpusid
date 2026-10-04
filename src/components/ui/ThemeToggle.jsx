import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ACCESSIBILITY_LABELS } from '../../constants/layout';
import { 
  FaSun, 
  FaMoon, 
  FaDesktop, 
  FaCheck 
} from 'react-icons/fa';

const ThemeToggle = ({ 
  variant = 'button', 
  showLabel = false, 
  className = '',
  size = 'md' 
}) => {
  const { theme, toggleTheme, setTheme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    switch (currentTheme) {
      case 'dark':
        return <FaMoon className="w-4 h-4" />;
      case 'light':
        return <FaSun className="w-4 h-4" />;
      default:
        return <FaDesktop className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Tema Gelap';
      case 'light':
        return 'Tema Terang';
      case 'system':
        return 'Ikuti Sistem';
      default:
        return 'Tema';
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-2.5 text-base',
    lg: 'p-3 text-lg',
  };

  const dropdownSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-800 
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-colors duration-200
            ${sizeClasses[size]}
          `}
          aria-label={ACCESSIBILITY_LABELS.THEME_TOGGLE}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {getIcon()}
          {showLabel && (
            <span className="font-medium">{getThemeLabel()}</span>
          )}
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className={`
              absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 
              rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
              z-20 overflow-hidden
            `}>
              <div className="py-1">
                {[
                  { value: 'light', icon: FaSun, label: 'Tema Terang' },
                  { value: 'dark', icon: FaMoon, label: 'Tema Gelap' },
                  { value: 'system', icon: FaDesktop, label: 'Ikuti Sistem' },
                ].map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => handleThemeChange(value)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      transition-colors duration-150
                      ${dropdownSizeClasses[size]}
                    `}
                    role="option"
                    aria-selected={theme === value}
                  >
                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="flex-1 text-left">{label}</span>
                    {theme === value && (
                      <FaCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (variant === 'switch') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <FaSun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <button
          onClick={toggleTheme}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-200 focus:outline-none
            ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}
          `}
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label={ACCESSIBILITY_LABELS.THEME_TOGGLE}
        >
          <span className="sr-only">Toggle theme</span>
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white 
              transition-transform duration-200
              ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
        <FaMoon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        {showLabel && (
          <span className="text-sm font-medium">{getThemeLabel()}</span>
        )}
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center gap-2 rounded-lg
        bg-gray-100 dark:bg-gray-800 
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-200
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={ACCESSIBILITY_LABELS.THEME_TOGGLE}
      title={getThemeLabel()}
    >
      {getIcon()}
      {showLabel && (
        <span className="font-medium">{getThemeLabel()}</span>
      )}
    </button>
  );
};

export default ThemeToggle;
