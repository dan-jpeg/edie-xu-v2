// Base.jsx - Determines which app to serve
import { useState, useEffect } from "react";
import App from "./App"; // Original desktop app
import MobileApp from "./MobileApp"; // New mobile-optimized app

const Base = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if we should serve mobile version
    const checkForMobile = () => {
      // Check for actual mobile devices
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      // Also check viewport width for smaller screens
      const isSmallScreen = window.innerWidth < 768;

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Initial check
    checkForMobile();

    // Recheck on resize
    window.addEventListener("resize", checkForMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkForMobile);
  }, []);

  // Render appropriate app based on device
  return isMobile ? <MobileApp /> : <App />;
};

export default Base;
