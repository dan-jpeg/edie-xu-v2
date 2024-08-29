import { useEffect, useState } from "react";
import { selectedWorks, videos } from "../data/projects-and-videos.js";
import { Link } from "react-router-dom";
import { slugify } from "../helpers/slugify.jsx";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import "./newSidebarCss.css";

const Sidebar = ({ isShowingVideo, hidden }) => {
  const [worksExpanded, setWorksExpanded] = useState(true);
  const [videosExpanded, setVideosExpanded] = useState(true);

  const toggleWorks = () => setWorksExpanded(!worksExpanded);
  const toggleVideos = () => setVideosExpanded(!videosExpanded);

  const { scrollY } = useScroll();

  const displayedWorks = worksExpanded
    ? selectedWorks
    : selectedWorks.slice(0, 3);
  const displayedVideos = videosExpanded ? videos : videos.slice(0, 3);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 1 },
  };

  const desktopVariants = {
    visible: { x: 0 },
    hidden: { x: 0 },
  };

  return (
    <div className={`md-block ${isShowingVideo ? "sticky" : "fixed"} z-[1000]`}>
      <div className="sidebar-header mr-16 z-40 fixed top-3 left-4">
        <h3
          className="edie-xu ml-2 text-4xl md:text-xs italic font-bold mb-0 mt-3 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          edie xu
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
    pl-40
    md:w-auto
    pt-1
    md:pt-0
    md:mt-0
    flex flex-row md:flex-col
     
     text-xs text-[#1a1a1a] 

    ${isShowingVideo ? " -translate-x-[250px] md:translate-x-0" : ""}
  `}
      >
        <div className="sidebar-body flex flex-rows md:flex-col align-top pl-40 md:pl-8 mt-4">
          <div className="sidebar-section selected-works ">
            <h3 className="clickable  text-[1.7rem] md:text-xs my-3 italic">
              w
            </h3>
            <ul className="list-none pl-6 transition-all duration-300 ease-in-out cursor-crosshair">
              {displayedWorks.map((project) => (
                <li
                  key={project.id}
                  className="cursor-crosshair text-[0.7em] m-0 p-0 hover:underline"
                >
                  <Link
                    className={`m-0`}
                    to={`/project/${slugify(project.title)}`}
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
              {selectedWorks.length > 3 && (
                <li>
                  <p
                    className="more-link mx-6 my-2 text-xs cursor-none hover:underline"
                    onClick={toggleWorks}
                  >
                    {worksExpanded ? "-" : "+"}
                  </p>
                </li>
              )}
            </ul>
          </div>

          <div className="sidebar-section video-and-performances">
            <h3 className="clickable  italic text-[1.7rem] my-3 md:text-xs pb-0">
              v
            </h3>
            <ul className="list-none pl-6 transition-all duration-300 ease-in-out">
              {displayedVideos.map((video) => (
                <li
                  className="p-0 cursor-crosshair text-[0.7em] hover:underline"
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
