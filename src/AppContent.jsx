// AppContent.js
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useScrollToTop from "./hooks/useScrollToTop";
import useNavigationState from "./hooks/useNavigationState";
import useScrollAnimations from "./hooks/useScrollAnimations";
import NavigationControls from "./components/NavigationControls";
import Sidebar from "./components/Sidebar";
import RoutesComponent from "./RoutesComponent";
import ContactMenu from "./components/ContactMenu";

const AppContent = ({ lenisScrollProgress, hidden }) => {
  useScrollToTop();
  const navigate = useNavigate();

  const { isShowingVideo, isHome, isShowingProject, adjacentItems } =
    useNavigationState();

  const {
    topRightTranslate,
    contactTranslate,
    bottomLeftTranslate,
    topRightOpacity,
    progressScale,
  } = useScrollAnimations();

  const [contactMenuExpanded, setContactMenuExpanded] = useState(false);

  const handleNavigation = (direction) => {
    const item = adjacentItems[direction];
    if (item) {
      navigate(`/${item.type}/${item.slug}`);
    }
  };

  return (
    <div className="app-container scrollbar-hide">
      {/* Contact Menu */}
      <ContactMenu
        hidden={hidden}
        isShowingVideo={isShowingVideo}
        contactMenuExpanded={contactMenuExpanded}
        setContactMenuExpanded={setContactMenuExpanded}
      />

      {/* Navigation Controls */}
      <NavigationControls
        isVisible={isShowingProject || isShowingVideo}
        adjacentItems={adjacentItems}
        handleNavigation={handleNavigation}
        bottomLeftTranslate={bottomLeftTranslate}
      />

      {/* Progress Bar */}
      <div
        className={`progress-bar-wrapper ${isShowingVideo ? "video-showing" : ""}`}
      >
        <motion.div
          className={`progress-bar ${isShowingVideo ? "video-showing opacity-60" : ""}`}
          style={{ scale: progressScale }}
          onClick={() => lenis.scrollTo(0, { duration: 2.2 })}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        isShowingVideo={isShowingVideo}
        hidden={hidden}
        isHome={isHome}
      />

      {/* Main Content */}
      <div className="main-container">
        <RoutesComponent />
      </div>
    </div>
  );
};

export default AppContent;
