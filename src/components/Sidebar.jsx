import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../helpers/slugify.jsx";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useData } from "../context/DataContext.jsx";

import "./newSidebarCss.css";

const Sidebar = ({ isShowingVideo, hidden, isHome }) => {
  const { data, loading } = useData();
  const [isDesktop, setIsDesktop] = useState(false);
  const [worksExpanded, setWorksExpanded] = useState(true);
  const [videosExpanded, setVideosExpanded] = useState(false);

  const toggleWorks = () => setWorksExpanded(!worksExpanded);
  const toggleVideos = () => setVideosExpanded(!videosExpanded);

  const { scrollY } = useScroll();

  useEffect(() => {
    const checkIsDesktop = () => window.innerWidth >= 768;
    setIsDesktop(checkIsDesktop());
    setVideosExpanded(checkIsDesktop());
    const handleResize = () => {
      const newIsDesktop = checkIsDesktop();
      setIsDesktop(newIsDesktop);

      setVideosExpanded(newIsDesktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use data from context instead of static imports
  const selectedWorks = data.selectedWorks;
  const videos = data.videos;

  const displayedWorks = worksExpanded
    ? selectedWorks
    : selectedWorks.slice(0, 3);
  const displayedVideos = videosExpanded ? videos : videos.slice(0, 3);

  const mobileVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 1 },
  };

  const desktopVariants = {
    visible: { x: 0 },
    hidden: { x: 0 },
  };

  const selectedHeaderVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: 10, opacity: 0 },
  };

  // Show loading state or empty arrays while loading
  if (loading) {
    return (
      <div
        className={`md-block ${isShowingVideo ? "sticky" : "fixed"} z-[1000]`}
      >
        <div className="sidebar-header mr-16 md: flex-row z-40 fixed top-3 left-4 ">
          <h3
            className="edie-xu ml-2 text-[11px] italic text-black font-bold mb-0 mt-[24px] cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            EDIE XU
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className={`md-block ${isShowingVideo ? "sticky" : "fixed"} z-[1000]`}>
      <div className="sidebar-header mr-16 md: flex-row z-40 fixed top-3 left-4 ">
        <h3
          className="edie-xu ml-2 text-[11px] italic text-black font-bold mb-0 mt-[24px] cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          EDIE XU
        </h3>
      </div>

      <motion.nav
        variants={
          isDesktop && !isShowingVideo ? desktopVariants : mobileVariants
        }
        transition={{ duration: 0.4, ease: "linear" }}
        animate={hidden ? "hidden" : "visible"}
        className={`
    fixed top-0 left-0 
    bg-white md:bg-transparent w-full 
    pl-28
    hidden
    pb-12
    md:h-auto
    md:w-auto
    pt-1
    md:pt-0
    md:mt-0
    md:flex flex-row md:flex-col
  
     text-xs text-[#1a1a1a] 

    ${isShowingVideo ? " -translate-x-[250px] md:translate-x-0" : ""}
  `}
      >
        <div className=" bg-transparent  flex flex-row md:flex-col align-top pl-36 md:pl-8 mt-4">
          <div className=" selected-works uppercase  pb-24 pt-2 ">
            <h3 className="clickable   md:text-xs my-3 italic">WORKS</h3>
            <ul className=" pl-6 transition-all duration-300 ease-in-out cursor-crosshair">
              {displayedWorks.map((project) => (
                <li
                  key={project.id}
                  className="cursor-crosshair m-0 p-0 hover:underline"
                >
                  <Link
                    className={`m-0`}
                    to={`/project/${slugify(project.title)}`}
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
              {/*{selectedWorks.length > 3 && (*/}
              {/*  <li>*/}
              {/*    <p*/}
              {/*      className="more-link mx-6 my-2  cursor-none hover:underline"*/}
              {/*      onClick={toggleWorks}*/}
              {/*    >*/}
              {/*      {worksExpanded ? "-" : "+"}*/}
              {/*    </p>*/}
              {/*  </li>*/}
              {/*)}*/}
            </ul>
          </div>

          <div className="uppercase pt-2">
            <h3 className="clickable   my-3  italic text-[1.7rem]  md:text-xs pb-0">
              PERFORMANCE
            </h3>
            <ul className="list-none pl-6 transition-all duration-300 ease-in-out">
              {displayedVideos.map((video) => (
                <li
                  className="p-0 cursor-crosshair  hover:underline"
                  key={video.id}
                >
                  <Link
                    className="p-0 m-0"
                    to={`/video/${slugify(video.safeTitle)}`}
                  >
                    {video.title}
                  </Link>
                </li>
              ))}
              {videos.length > 3 && (
                <li>
                  <p
                    className="more-link mx-6 my-2 text-xs cursor-none hover:underline"
                    onClick={toggleVideos}
                  >
                    {videosExpanded ? "-" : "+"}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Sidebar;
