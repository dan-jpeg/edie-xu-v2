
import {useEffect, useState} from "react";
import { selectedWorks, videos } from "../data/projects-and-videos.js";
import { Link, useLocation } from "react-router-dom";
import { slugify} from "../helpers/slugify.jsx";
import './sidebar.css'


const Sidebar = ({isShowingVideo}) => {
    const [worksExpanded, setWorksExpanded] = useState(false);
    const [videosExpanded, setVideosExpanded] = useState(false);


    const toggleWorks = () => setWorksExpanded(!worksExpanded);
    const toggleVideos = () => setVideosExpanded(!videosExpanded);

    const displayedWorks = worksExpanded ? selectedWorks : selectedWorks.slice(0, 3);
    const displayedVideos = videosExpanded ? videos : videos.slice(0, 3);

    return (
        <aside className={`sidebar transform transition duration-300 ${isShowingVideo? ' bg-none translate-x-[-250px]' : ''} `}>


            <div className="sidebar-header italic font-bold">
                <h3 onClick={() => window.location.href = '/'}>edie xu</h3>
            </div>

            <div className="sidebar-body">
                <div className="sidebar-section selected-works">
                    <h3 className="clickable font-bold">selected works</h3>
                    <ul>
                        {displayedWorks.map((project) => (
                            <li key={project.id}>
                                <Link to={`/project/${slugify(project.title)}`}>{project.title}</Link>
                            </li>
                        ))}
                        {selectedWorks.length > 3 && (
                            <li>
                                <p className="more-link" onClick={toggleWorks}>
                                    {worksExpanded ? '-' : '+'}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="sidebar-section video-and-performances">
                    <h3 className="clickable font-bold">video & performances</h3>
                    <ul>
                        {displayedVideos.map((video) => (
                            <li key={video.id}>
                                <Link to={`/video/${slugify(video.safeTitle)}`}>{video.title}</Link>
                            </li>
                        ))}
                        {videos.length > 3 && (
                            <li>
                                <p className="more-link" onClick={toggleVideos}>
                                    {videosExpanded ? '-' : '+'}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>


            </div>

        </aside>
    );
};

export default Sidebar;