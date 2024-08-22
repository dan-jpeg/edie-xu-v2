import { useParams } from 'react-router-dom';
import DisplayedProject from './DisplayedProject';
import DisplayedVideo from './DisplayedVideo';
import {ExhibitionDefaultSpread} from "./ExhibitionSpread.jsx";
import { selectedWorks, videos, exhibitions2 } from "../data/projects-and-videos.js"
import { slugify } from '../helpers/slugify.jsx';


const ProjectPage = () => {
    const { slug } = useParams();
    const project = selectedWorks.find(p => slugify(p.title) === slug);

    if (!project) {
        return <div>Project not found</div>;
    }

    return <DisplayedProject project={project} />;

};

const VideoPage = () => {
    const { slug } = useParams();
    const video = videos.find(v => slugify(v.safeTitle) === slug);

    if (!video) {
        return <div>Video not found</div>;
    }

    return <DisplayedVideo video={video} />;
};

 const ExhibitionPage = ({ scrollYProgress }) => {
    const { slug } = useParams();
    const exhibition = exhibitions2.find(e => slugify(e.title) === slug);

    if (!exhibition) {
        return <div>Exhibition not found</div>;
    }

    return <ExhibitionDefaultSpread exhibition={exhibition} scrollYProgress={scrollYProgress} />;
};
export { ProjectPage, VideoPage, ExhibitionPage };