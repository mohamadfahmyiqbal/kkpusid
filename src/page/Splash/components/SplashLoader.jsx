// /page/Splash/components/SplashLoader.jsx
import React, { useEffect, useState } from "react";

const SplashLoader = ({ duration = 1600 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <div className="w-56 mt-6" role="status" aria-live="polite">
      <div className="h-2 w-full bg-neutral-200 rounded">
        <div
          className="h-2 bg-emerald-500 rounded transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-neutral-500 text-center">
        Memuat… {Math.round(progress)}%
      </p>
    </div>
  );
};

export default SplashLoader;
