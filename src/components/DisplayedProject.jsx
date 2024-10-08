import { useState } from "react";
import PropTypes from "prop-types";
import "./projectpage.css";
import "./included-work.css";
import { ImagesSingleColumn } from "./ProjectPageComponents.jsx";

const DisplayedProject = ({ project }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const imageMedia = project.media.filter((item) => item.type === "image");

  const goToPreviousMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? project.media.length - 1 : prevIndex - 1,
    );
  };

  const goToNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === project.media.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const renderMedia = () => {
    const currentMedia = project.media[currentMediaIndex];
    if (currentMedia.type === "image") {
      return (
        <img
          className="displayed-project-image"
          src={currentMedia.url}
          key={currentMedia.url}
          alt={`${project.title} ${currentMediaIndex + 1}`}
        />
      );
    } else if (currentMedia.type === "video") {
      return <video className="video-player" src={currentMedia.url} controls />;
    }
    return null;
  };

  return (
    <div className="displayed-project-container scrollbar-hide pb-20 md:pb-0">
      <div className="displayed-title-container text-center">
        <div className="work-included-container">
          <p className="work-included-title italic pb-10 text-sm ">
            {project.title}
          </p>
          <p className="work-included-material">{project.material}</p>
          <p className="work-included-dimensions">{project.dimensions}</p>
          <p className="work-included-year">{project.year}</p>
        </div>

        <p className="content-center right-8 pt-12 text-sm">
          {project.description}
        </p>
      </div>
      <div className="project-image-container">
        <ImagesSingleColumn images={imageMedia.map((item) => item.url)} />
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
};

export default DisplayedProject;
