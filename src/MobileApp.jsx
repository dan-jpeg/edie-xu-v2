// MobileApp.jsx - Our streamlined mobile version
import { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { exhibitions2 } from "./data/projects-and-videos.js";
import {
  ExhibitionPage,
  ProjectPage,
  VideoPage,
} from "./components/PageComponents.jsx";
import useScrollToTop from "./hooks/useScrollToTop";
import MobileHome from "./MobileHome.jsx";

const MobileApp = () => {
  const [lenisScrollProgress, setLenisScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  // Simple scroll tracking
  const onLenisScroll = useCallback(({ scroll, limit }) => {
    const progress = scroll / limit;
    setLenisScrollProgress(progress);
  }, []);

  const lenisOptions = {
    duration: 0.6,
  };

  return (
    <Router>
      <ReactLenis root options={lenisOptions} onScroll={onLenisScroll}>
        <MobileAppContent
          scrollYProgress={scrollYProgress}
          lenisScrollProgress={lenisScrollProgress}
        />
      </ReactLenis>
    </Router>
  );
};

const MobileAppContent = ({ scrollYProgress, lenisScrollProgress }) => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();

  // Progress bar animation
  const progressScale = useTransform(scrollYProgress, (value) => {
    return value <= 1 ? 0.1 + value * 0.9 : 1;
  });

  // Scroll to top functionality
  const lenis = useLenis();
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="mobile-app-container scrollbar-hide">
      {/* Simple progress bar */}
      <div className="fixed top-0 left-0  w-full h-0.5 bg-gray-100">
        <motion.div
          className="h-full bg-black"
          style={{ scaleX: progressScale, transformOrigin: "0%" }}
          onClick={scrollToTop}
        />
      </div>

      <div className=" fixed bottom-0 w-screen">
        <div className="flex w-full place-items-end cursor-pointer z-30 font-alte-haas justify-end flex-row">
          <h1
            onClick={goToHome}
            className=" cursor-pointer text-[11px] px-8 py-3 z-30  font-bold mb-1"
          >
            EDIE XU
          </h1>
        </div>
      </div>
      {/* Footer navigation */}
      <div className="w-full   fixed bottom-4 italic text-[11px] font-alte-haas flex z-10 place-items-center justify-center">
        <div className="flex space-x-4 flex-row">
          <a href="mailto:ediexxu@gmail.com">EMAIL</a>
          <a
            href="http://instagram.com/e__xu"
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </div>
      </div>

      {/* Main content area */}
      <div className="mobile-main-container">
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/exhibition/:slug" element={<ExhibitionPage />} />
          <Route
            path="/project/:slug"
            element={<ProjectPage scrollYProgress={scrollYProgress} />}
          />
          <Route path="/video/:slug" element={<VideoPage />} />
        </Routes>
      </div>
    </div>
  );
};

// Simple Mobile Home component placeholder

export default MobileApp;
