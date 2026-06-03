import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  BREAKPOINTS,
  ANIMATION_DURATION,
  TOUCH_GESTURES,
  CSS_CLASSES,
} from "../constants/layout";

export const useLayoutState = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= BREAKPOINTS.DESKTOP
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const isSwiping = useRef(false);
  const lastPathname = useRef(location.pathname);

  // Hook Viewport dengan debounce
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsDesktop(window.innerWidth >= BREAKPOINTS.DESKTOP);
      }, ANIMATION_DURATION.RESIZE_DEBOUNCE);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Touch gesture support untuk mobile sidebar dengan throttling yang benar
  useEffect(() => {
    if (isDesktop) return;

    let throttleTimeout = null;
    const THROTTLE_DELAY = 16; // ~60fps

    const handleTouchStart = (e) => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
        touchStartX.current = e.touches[0].clientX;
        isSwiping.current = true;
      }, THROTTLE_DELAY);
    };

    const handleTouchEnd = (e) => {
      if (!isSwiping.current) return;
      isSwiping.current = false;

      const swipeDistance = e.changedTouches[0].clientX - touchStartX.current;

      // Swipe right to open sidebar
      if (swipeDistance > TOUCH_GESTURES.SWIPE_THRESHOLD && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
      // Swipe left to close sidebar
      else if (
        swipeDistance < -TOUCH_GESTURES.SWIPE_THRESHOLD &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [isDesktop, isSidebarOpen]);

  // Kelola class body untuk sidebar dengan cleanup yang benar
  useEffect(() => {
    const bodyClass = CSS_CLASSES.SIDEBAR_BODY_CLASS;
    let timeoutId;

    if (isDesktop || isSidebarOpen) { // Condition simplified for effectiveSidebarOpen
      setIsTransitioning(true);
      document.body.classList.add(bodyClass);
      timeoutId = setTimeout(
        () => setIsTransitioning(false),
        ANIMATION_DURATION.SIDEBAR_TRANSITION,
      );
    } else {
      setIsTransitioning(true);
      document.body.classList.remove(bodyClass);
      timeoutId = setTimeout(
        () => setIsTransitioning(false),
        ANIMATION_DURATION.SIDEBAR_TRANSITION,
      );
    }

    return () => {
      clearTimeout(timeoutId);
      document.body.classList.remove(bodyClass);
    };
  }, [isDesktop, isSidebarOpen]);

  // Tutup sidebar saat navigasi (Mobile)
  useEffect(() => {
    if (location.pathname !== lastPathname.current) {
      setIsTransitioning(true);
      setIsSidebarOpen(false);
      lastPathname.current = location.pathname;
      const timeoutId = setTimeout(
        () => setIsTransitioning(false),
        ANIMATION_DURATION.PAGE_TRANSITION,
      );
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    isDesktop,
    setIsDesktop,
    isTransitioning,
    setIsTransitioning,
    handleToggleSidebar,
    handleCloseSidebar,
  };
};
