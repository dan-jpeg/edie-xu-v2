import { useState, useCallback, useEffect } from "react";
import "./globals.css";
import Sidebar from "./components/Sidebar.jsx";
import Listing from "./components/Listing.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { exhibitions2 } from "./data/projects-and-videos.js";
import ExhibitionSpread, {
  ExhibitionDefaultSpread,
} from "./components/ExhibitionSpread.jsx";
import {
  ExhibitionPage,
  ProjectPage,
  VideoPage,
} from "./components/PageComponents.jsx";
import { ReactLenis, useLenis } from "lenis/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import useScrollToTop from "./hooks/useScrollToTop";
import ScrollBasedAnimation from "./components/NavigationControls.jsx";
import { getAdjacentItems } from "./components/NavigationUtility.jsx";

const App = () => {
  const [lenisScrollProgress, setLenisScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lenisOptions = {
    duration: 0.6,
  };

  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    const previousValue = scrollYProgress.getPrevious();
    if (latestValue > previousValue && latestValue > 0.2) {
      setHidden(true);
      console.log(latestValue);
    } else {
      console.log(latestValue);

      setHidden(false);
    }
  });

  const onLenisScroll = useCallback(({ scroll, limit }) => {
    // Calculate scroll progress as a percentage
    const progress = scroll / limit;
    setLenisScrollProgress(progress);
  }, []);

  return (
    <Router>
      <ReactLenis root options={lenisOptions} onScroll={onLenisScroll}>
        <AppContent
          lenisScrollProgress={lenisScrollProgress}
          scrollYProgress={scrollYProgress}
          hidden={hidden}
        />
      </ReactLenis>
    </Router>
  );
};

const AppContent = ({ lenisScrollProgress, scrollYProgress, hidden }) => {
  useScrollToTop();

  const location = useLocation();
  const navigate = useNavigate();
  const [isShowingVideo, setIsShowingVideo] = useState(false);

  const [isShowingProject, setIsShowingProject] = useState(false);
  const [adjacentItems, setAdjacentItems] = useState({
    prev: null,
    next: null,
  });

  useEffect(() => {
    const isVideoRoute = location.pathname.includes("/video/");
    const isLandingPage = location.pathname === "/hello";
    const isProjectOrExhibitionPage =
      location.pathname.includes("/project") ||
      location.pathname.includes("/exhibition");

    setIsShowingVideo(isVideoRoute || isLandingPage);
    setIsShowingProject(isProjectOrExhibitionPage);

    // Update adjacent items whenever the location changes
    if (isProjectOrExhibitionPage || isVideoRoute) {
      const { prev, next } = getAdjacentItems(location.pathname);
      setAdjacentItems({ prev, next });
    } else {
      setAdjacentItems({ prev: null, next: null });
    }
  }, [location]);

  const handleNavigation = (direction) => {
    const item = direction === "prev" ? adjacentItems.prev : adjacentItems.next;
    if (item) {
      navigate(`/${item.type}/${item.slug}`);
    }
  };

  const topRightTranlsate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.4, 0.5],
    [0, -5, -30, -130, -250],
  );
  const contactTranslate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.4, 0.5],
    [0, -5, -30, -150, -300],
  );

  const bottomLeftTranslate = useTransform(
    scrollYProgress,
    [0, 0.6, 0.7, 0.8, 0.9],
    [120, 50, 35, 20, 0],
  );

  const topRightOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleThreshold = 1; // Reach full scale at 15% scroll instead of 10%

  const progressScale = useTransform(scrollYProgress, (value) => {
    if (value <= scaleThreshold) {
      // Scale from 0.1 to 1 over the defined threshold
      return 0.1 + value * (0.9 / scaleThreshold);
    } else {
      return 1;
    }
  });

  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2.2 });
    }
  };

  const contactVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -5, opacity: 0 },
  };

  return (
    <div className="app-container scrollbar-hide">
      <div
        className={`top-right-header-wrapper  fixed left-[1.8rem] top-[6.5rem] md:top-auto md:bottom-[10vh] z-[3000] ${isShowingVideo ? "translate-y-[-50px]" : ""} `}
      >
        <motion.div
          variants={contactVariants}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.2, type: "tween" }}
          className="top-right-header italic font-bold text-xl md:text-xs"
        >
          <ul className={"grid-cols-2"}>
            <li className={`py-3 md:py-1`}>
              <h1>contact</h1>
            </li>
            <li className={`py-3 md:py-1`}>
              <h1>download cv</h1>
            </li>
          </ul>
        </motion.div>
      </div>

      {/*<div*/}
      {/*  className={`top-right-header-wrapper  fixed left-[1.8rem] top-[6.5rem] z-[3000] ${isShowingVideo ? "translate-y-[-50px]" : ""} `}*/}
      {/*>*/}
      {/*  <motion.div*/}
      {/*    variants={contactVariants}*/}
      {/*    animate={hidden ? "hidden" : "visible"}*/}
      {/*    className="top-right-header italic font-bold text-[1.7rem] md:text-xs"*/}
      {/*  >*/}
      {/*    contact*/}
      {/*  </motion.div>*/}
      {/*</div>*/}

      <div
        className={`navigation-controls transition ${isShowingProject || isShowingVideo ? "" : "hidden"} duration-200 fixed left-[6rem] text-xs bottom-[2.6rem] z-30 ${isShowingVideo ? "translate-y-[50px]" : ""}`}
      >
        <motion.div
          className="italic text-[0.8rem]"
          style={{ translateY: bottomLeftTranslate }}
          onClick={() => handleNavigation("prev")}
        >
          {adjacentItems.prev ? "prev" : ""}
        </motion.div>
      </div>
      <div
        className={`italic ${isShowingProject || isShowingVideo ? "" : "hidden"} fixed left-[8.3rem] text-xs bottom-[2.6rem] z-30`}
      >
        <motion.div
          className="text-[0.8rem]"
          style={{ translateY: bottomLeftTranslate }}
          onClick={() => handleNavigation("next")}
        >
          {adjacentItems.next ? "next" : ""}
        </motion.div>
      </div>
      <div
        className={`progress-bar-wrapper ${isShowingVideo ? "video-showing" : ""}`}
      >
        <motion.div
          className={`progress-bar ${isShowingVideo ? "video-showing opacity-60" : ""}`}
          style={{ scale: progressScale }}
          onClick={scrollToTop}
        />
      </div>

      <div className="sidebar-container">
        <Sidebar isShowingVideo={isShowingVideo} hidden={hidden} />
      </div>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exhibition/:slug" element={<ExhibitionPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/video/:slug" element={<VideoPage />} />
          <Route
            path="/exhibition1"
            element={<ExhibitionSpread scrollYProgress={scrollYProgress} />}
          />
          {/*<Route path="/hello" element={<LandingPage />} />*/}
        </Routes>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="project-listing-column">
      {exhibitions2.map((exhibition, index) => (
        <Listing listing={exhibition} key={index} />
      ))}
    </div>
  );
};

export default App;
