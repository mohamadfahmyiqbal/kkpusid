// /page/Splash/components/SplashLogo.jsx
import React from "react";

const SplashLogo = ({ size = 96, showTagline = true, src }) => {
  const styles = {
    wrapper: "flex flex-col items-center justify-center select-none",
    image: `w-[${size}px] h-[${size}px] object-contain`,
    title: "mt-4 text-2xl font-bold tracking-wide text-neutral-900",
    tagline: "mt-1 text-sm text-neutral-500",
  };

  return (
    <div className={styles.wrapper} aria-label="Splash Logo">
      {src ? (
        <img src={src} alt="Paguyuban Usaha Sukses" className={styles.image} />
      ) : (
        <div
          className="rounded-full bg-neutral-100 w-24 h-24 flex items-center justify-center border border-neutral-200"
          role="img"
          aria-label="PUS Logo"
        >
          <span className="text-xl font-bold">PUS</span>
        </div>
      )}
      <h1 className={styles.title}>Paguyuban Usaha Sukses</h1>
      {showTagline && (
        <p className={styles.tagline}>P aguyuban Usaha Sukses! PUS</p>
      )}
    </div>
  );
};

export default SplashLogo;
