import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useSpring } from "framer-motion";
import "./projectpage.css";
import "./included-work.css";
import { ImagesSingleColumn } from "./ProjectPageComponents.jsx";
import FromEarthAndUp from "./FromEarthAndUp.jsx";

const FullScreenModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="relative w-full h-full overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

const DisplayedProject = ({ project, scrollYProgress }) => {
  const [showDescriptionText, setShowDescriptionText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = project.media
    .filter((item) => item.type === "image")
    .map((item) => item.url);

  // Use a spring for smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    // Show description when scrolling past 30% of the page
    const unsubscribe = smoothProgress.onChange((value) => {
      setShowDescriptionText(value > 0.3);
    });

    return () => unsubscribe(); // Cleanup
  }, [smoothProgress]);

  if (project.id === "10") {
    return (
      <>
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <FromEarthAndUp />
        </div>
      </>
    );
  }
  // Regular project display (unchanged)
  return (
    <div className="displayed-project-container scrollbar-hide pb-20 md:pb-0">
      <div className="displayed-title-container text-center">
        <div className="work-included-container mb-12">
          <p className="work-included-title italic  text-sm">{project.title}</p>
          <p className="work-included-material">{project.material}</p>
          <p className="work-included-dimensions">{project.dimensions}</p>
          <p className="work-included-year  mt-1 ">{project.year}</p>
        </div>

        {/*<motion.div*/}
        {/*  className="fixed md:fixed bottom-[24wvh] left-[10vw] flex flex-col justify-center place-items-center"*/}
        {/*  initial={{ opacity: 0, y: 20 }}*/}
        {/*  animate={{*/}
        {/*    opacity: showDescriptionText ? 1 : 0,*/}
        {/*    y: showDescriptionText ? 0 : 20,*/}
        {/*  }}*/}
        {/*  transition={{ duration: 0.5 }}*/}
        {/*>*/}
        {/*  <p className="content-center hidden md:block text-black text-center w-[20vw] pt-12 text-[1vw] lg:text-[11px]">*/}
        {/*    {project.description}*/}
        {/*  </p>*/}
        {/*</motion.div>*/}
      </div>

      <div className="project-image-container">
        <div className="grid grid-cols-3   text-[10px] place-items-center ">
          <div className="col-span-3 ">
            <ImagesSingleColumn images={[images[0]]} />
          </div>
          {project.description && (
            <div className="col-span-3  indent-4 italic mt-4 mb-6">
              <p> {project.description}</p>
            </div>
          )}
          <div className="col-span-3 ">
            <ImagesSingleColumn images={images.slice(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};

DisplayedProject.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    year: PropTypes.string,
    dimensions: PropTypes.string,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(["image", "video"]).isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  scrollYProgress: PropTypes.object.isRequired,
};

export default DisplayedProject;
