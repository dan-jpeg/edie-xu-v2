import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAdjacentItems } from "../components/NavigationUtility";

const useNavigationState = () => {
  const location = useLocation();
  const [isShowingVideo, setIsShowingVideo] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isShowingProject, setIsShowingProject] = useState(false);
  const [adjacentItems, setAdjacentItems] = useState({
    prev: null,
    next: null,
  });

  useEffect(() => {
    const path = location.pathname;
    const isHomePage = path === "/";
    const isVideoRoute = path.includes("/video/");
    const isLandingPage = path === "/hello";
    const isProjectOrExhibitionPage =
      path.includes("/project") || path.includes("/exhibition");

    setIsHome(isHomePage);
    setIsShowingVideo(isVideoRoute || isLandingPage);
    setIsShowingProject(isProjectOrExhibitionPage);

    if (isProjectOrExhibitionPage || isVideoRoute) {
      const { prev, next } = getAdjacentItems(path);
      setAdjacentItems({ prev, next });
    } else {
      setAdjacentItems({ prev: null, next: null });
    }
  }, [location]);

  return { isShowingVideo, isHome, isShowingProject, adjacentItems };
};

export default useNavigationState;
