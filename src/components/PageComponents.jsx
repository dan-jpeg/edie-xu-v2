// src/components/PageComponents.jsx
import { useParams, useNavigate } from "react-router-dom";
import DisplayedProject from "./DisplayedProject";
import DisplayedVideo from "./DisplayedVideo";
import { ExhibitionDefaultSpread } from "./ExhibitionSpread.jsx";
import { slugify } from "../helpers/slugify.jsx";
import { useAdjacentItems } from "./NavigationUtility.jsx";
import { useData } from "../context/DataContext.jsx";

const ProjectPage = ({ scrollYProgress }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useData();
  const project = data.selectedWorks.find((p) => slugify(p.title) === slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[10px] uppercase tracking-wider text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[10px] uppercase tracking-wider">
          Project not found
        </div>
      </div>
    );
  }

  return (
    <>
      <DisplayedProject scrollYProgress={scrollYProgress} project={project} />
    </>
  );
};

const VideoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useData();
  const video = data.videos.find((v) => slugify(v.safeTitle) === slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[10px] uppercase tracking-wider text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[10px] uppercase tracking-wider">
          Video not found
        </div>
      </div>
    );
  }

  return (
    <>
      <DisplayedVideo video={video} />
    </>
  );
};

const ExhibitionPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useData();
  const exhibition = data.exhibitions.find((e) => slugify(e.title) === slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[10px] uppercase tracking-wider text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[10px] uppercase tracking-wider">
          Exhibition not found
        </div>
      </div>
    );
  }

  return (
    <>
      <ExhibitionDefaultSpread exhibition={exhibition} />
    </>
  );
};

export { ProjectPage, VideoPage, ExhibitionPage };
