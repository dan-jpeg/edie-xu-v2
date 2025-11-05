// MobileApp.jsx - Mobile version with DataProvider
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
import {
  ExhibitionPage,
  ProjectPage,
  VideoPage,
} from "./components/PageComponents.jsx";
import useScrollToTop from "./hooks/useScrollToTop";
import MobileHome from "./MobileHome.jsx";
import { DataProvider } from "./context/DataContext.jsx";

import whitePaperBg from "/src/assets/white-paper-bg-cropped.png";
import bangerBg from "/src/assets/banger_01.jpg";

const MobileApp = () => {
  return (
    <Router>
      <DataProvider>
        <MobileAppWrapper />
      </DataProvider>
    </Router>
  );
};

const MobileAppWrapper = () => {
  const [lenisScrollProgress, setLenisScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  const onLenisScroll = useCallback(({ scroll, limit }) => {
    const progress = scroll / limit;
    setLenisScrollProgress(progress);
  }, []);

  const lenisOptions = {
    duration: 0.6,
  };

  return (
    <ReactLenis root options={lenisOptions} onScroll={onLenisScroll}>
      <MobileAppContent
        scrollYProgress={scrollYProgress}
        lenisScrollProgress={lenisScrollProgress}
      />
    </ReactLenis>
  );
};

const MobileAppContent = ({ scrollYProgress, lenisScrollProgress }) => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();

  const progressScale = useTransform(scrollYProgress, (value) => {
    return value <= 1 ? 0.1 + value * 0.9 : 1;
  });

  const lenis = useLenis();
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const isHomePage = location.pathname === "/";
  const backgroundImage = !isHomePage ? bangerBg : bangerBg;
  const cover = isHomePage ? true : false;

  const bgOpacity = 0.7;

  return (
    <div
      className={`scrollbar-hide ${isHomePage ? "mobile-app-container" : ""}`}
    >
      {/* Footer navigation */}
      <div className="w-full bg-white fixed bottom-[1.3rem] py-1 px-8 text-[11px] font-alte-haas flex z-20">
        <div className="grid grid-cols-4 w-full gap-4 place-items-center text-right">
          <div className="col-span-1 w-full">
            <a href="mailto:ediexxu@gmail.com">EMAIL</a>
          </div>
          <div className="col-span-1 w-full text-right">
            <a
              href="http://instagram.com/e__xu"
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM
            </a>
          </div>
          <div className="col-span-1 text-center w-full">
            <a
              href="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/assets/Edie+X+Resume-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
          </div>
          <div
            onClick={goToHome}
            className="col-span-1 text-right font-bold w-full cursor-pointer"
          >
            <span>EDIE XU</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="mobile-main-container px-8">
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

export default MobileApp;
