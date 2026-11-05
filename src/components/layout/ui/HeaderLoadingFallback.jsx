import React from "react";

const HeaderLoadingFallback = () => {
  return (
    <header className="topbar" role="banner">
      <nav
        className="navbar top-navbar navbar-expand-md navbar-light"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-header">
          <div className="navbar-brand d-flex align-items-center">
            <div
              className="skeleton-loader"
              style={{ width: "30px", height: "30px", borderRadius: "4px" }}
            ></div>
          </div>
        </div>

        <div className="navbar-collapse d-flex justify-content-between">
          <div className="d-none d-md-flex align-items-center">
            <div
              className="skeleton-loader"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            ></div>
          </div>

          <ul
            className="navbar-nav my-lg-0 ml-auto d-flex align-items-center"
            role="menubar"
          >
            <li className="nav-item" role="none">
              <div
                className="skeleton-loader"
                style={{ width: "24px", height: "24px", borderRadius: "50%" }}
              ></div>
            </li>
            <li className="nav-item" role="none">
              <div
                className="skeleton-loader"
                style={{ width: "24px", height: "24px", borderRadius: "50%" }}
              ></div>
            </li>
            <li className="nav-item" role="none">
              <div
                className="skeleton-loader"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              ></div>
            </li>
          </ul>
        </div>
      </nav>


    </header>
  );
};

export default HeaderLoadingFallback;
