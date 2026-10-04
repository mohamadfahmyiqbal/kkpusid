import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESSIBILITY_LABELS } from '../../constants/layout';
import { 
  FaSearch, 
  FaTimes, 
  FaClock, 
  FaFileAlt,
  FaUser,
  FaChartBar,
  FaCog,
  FaArrowRight 
} from 'react-icons/fa';

const GlobalSearch = ({ 
  isOpen, 
  onClose, 
  placeholder = 'Cari menu, halaman, atau fitur...',
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Search data - in real app, this would come from API or state
  const searchData = [
    { 
      id: 1, 
      title: 'Dashboard', 
      path: '/dashboard', 
      icon: FaChartBar, 
      category: 'Halaman',
      description: 'Halaman utama dashboard'
    },
    { 
      id: 2, 
      title: 'Simpanan', 
      path: '/simpanan', 
      icon: FaFileAlt, 
      category: 'Halaman',
      description: 'Kelola data simpanan'
    },
    { 
      id: 3, 
      title: 'Transaksi', 
      path: '/transaksi', 
      icon: FaFileAlt, 
      category: 'Halaman',
      description: 'Kelola transaksi'
    },
    { 
      id: 4, 
      title: 'Program', 
      path: '/program', 
      icon: FaFileAlt, 
      category: 'Halaman',
      description: 'Kelola program'
    },
    { 
      id: 5, 
      title: 'Profil', 
      path: '/profile', 
      icon: FaUser, 
      category: 'Halaman',
      description: 'Pengaturan profil pengguna'
    },
    { 
      id: 6, 
      title: 'Pengaturan', 
      path: '/settings', 
      icon: FaCog, 
      category: 'Halaman',
      description: 'Pengaturan aplikasi'
    },
  ];

  // Load search history from localStorage
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      setSearchHistory(history.slice(0, 5)); // Keep only last 5 searches
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        handleClose();
        break;
    }
  }, [isOpen, selectedIndex, results]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Search function
  const performSearch = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filtered);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 300);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const handleResultClick = (result) => {
    // Add to search history
    const newHistory = [
      { query, timestamp: Date.now() },
      ...searchHistory.filter(item => item.query !== query)
    ].slice(0, 5);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    // Navigate to result
    navigate(result.path);
    handleClose();
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    onClose();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <FaSearch className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
            aria-label={ACCESSIBILITY_LABELS.SEARCH_INPUT}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={ACCESSIBILITY_LABELS.SEARCH_CLEAR}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
          <div className="text-xs text-gray-500">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              Mencari...
            </div>
          ) : query && results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Hasil Pencarian
              </div>
              {results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3
                      hover:bg-gray-50 dark:hover:bg-gray-700
                      transition-colors duration-150
                      ${index === selectedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''}
                    `}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {result.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                        {result.category}
                      </span>
                      <FaArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : query && !isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <FaSearch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <div className="font-medium mb-2">Tidak ada hasil</div>
              <div className="text-sm">
                Coba kata kunci lain atau periksa ejaan
              </div>
            </div>
          ) : (
            /* Search History */
            searchHistory.length > 0 && (
              <div className="py-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Pencarian Terakhir
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Hapus
                  </button>
                </div>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(item.query);
                      performSearch(item.query);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <FaClock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.query}
                    </span>
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">
              ↑↓
            </kbd>
            {' '}navigasi
            {' '}
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">
              Enter
            </kbd>
            {' '}pilih
            {' '}
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">
              Esc
            </kbd>
            {' '}tutup
          </div>
          <div className="text-xs text-gray-500">
            Tekan <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">K</kbd> untuk membuka
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
