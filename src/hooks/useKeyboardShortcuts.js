import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = ({ onToggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  const handleKeyDown = useCallback((event) => {
    // Ignore if user is typing in input, textarea, or contenteditable
    const activeElement = document.activeElement;
    const isInputElement = 
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.contentEditable === 'true';

    if (isInputElement) return;

    const { key, ctrlKey, metaKey, altKey, shiftKey } = event;
    const isCtrl = ctrlKey || metaKey;

    // Prevent default for handled shortcuts
    let handled = false;

    // Sidebar toggle
    if (ctrlKey && key === 'b') {
      event.preventDefault();
      onToggleSidebar?.();
      handled = true;
    }

    // Page navigation
    if (ctrlKey && key === 'h') {
      event.preventDefault();
      navigate('/dashboard');
      handled = true;
    }

    if (ctrlKey && altKey && key === 'ArrowLeft') {
      event.preventDefault();
      navigate(-1);
      handled = true;
    }

    // Quick access pages
    if (ctrlKey && altKey && key === 's') {
      event.preventDefault();
      navigate('/simpanan');
      handled = true;
    }

    if (ctrlKey && altKey && key === 't') {
      event.preventDefault();
      navigate('/transaksi');
      handled = true;
    }

    if (ctrlKey && altKey && key === 'p') {
      event.preventDefault();
      navigate('/program');
      handled = true;
    }

    // Logout
    if (ctrlKey && shiftKey && key === 'q') {
      event.preventDefault();
      onLogout?.();
      handled = true;
    }

    // Help
    if (key === 'F1') {
      event.preventDefault();
      // Open help modal or navigate to help page
      handled = true;
    }

    if (handled) {
      event.preventDefault();
    }
  }, [navigate, onToggleSidebar, onLogout]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Return shortcut help object
  return {
    shortcuts: [
      { keys: ['Ctrl', 'B'], description: 'Toggle sidebar' },
      { keys: ['Ctrl', 'H'], description: 'Ke dashboard' },
      { keys: ['Ctrl', 'Alt', '←'], description: 'Kembali' },
      { keys: ['Ctrl', 'Alt', 'S'], description: 'Ke simpanan' },
      { keys: ['Ctrl', 'Alt', 'T'], description: 'Ke transaksi' },
      { keys: ['Ctrl', 'Alt', 'P'], description: 'Ke program' },
      { keys: ['Ctrl', 'Shift', 'Q'], description: 'Logout' },
      { keys: ['F1'], description: 'Bantuan' },
    ],
  };
};

export default useKeyboardShortcuts;
