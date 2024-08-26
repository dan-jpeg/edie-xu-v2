import { useParams, useNavigate } from "react-router-dom";
import DisplayedProject from "./DisplayedProject";
import DisplayedVideo from "./DisplayedVideo";
import { ExhibitionDefaultSpread } from "./ExhibitionSpread.jsx";
import {
  selectedWorks,
  videos,
  exhibitions2,
} from "../data/projects-and-videos.js";
import { slugify } from "../helpers/slugify.jsx";
import { getAdjacentItems } from "./NavigationUtility.jsx";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = selectedWorks.find((p) => slugify(p.title) === slug);
  const { prev, next } = getAdjacentItems(slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <DisplayedProject project={project} />
    </>
  );
};

const VideoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const video = videos.find((v) => slugify(v.safeTitle) === slug);
  const { prev, next } = getAdjacentItems(slug);

  if (!video) {
    return <div>Video not found</div>;
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
  const exhibition = exhibitions2.find((e) => slugify(e.title) === slug);
  const { prev, next } = getAdjacentItems(slug);

  if (!exhibition) {
    return <div>Exhibition not found</div>;
  }

  return (
    <>
      <ExhibitionDefaultSpread exhibition={exhibition} />
    </>
  );
};

export { ProjectPage, VideoPage, ExhibitionPage };
