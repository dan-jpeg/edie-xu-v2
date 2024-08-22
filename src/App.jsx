import {useState, useCallback, useEffect} from 'react'
import './globals.css'
import Sidebar from "./components/Sidebar.jsx";
import Listing from "./components/Listing.jsx";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { exhibitions2 } from "./data/projects-and-videos.js";
import ExhibitionSpread, { ExhibitionDefaultSpread } from "./components/ExhibitionSpread.jsx";
import { ExhibitionPage, ProjectPage, VideoPage } from "./components/PageComponents.jsx";
import { ReactLenis, useLenis } from 'lenis/react'
import { motion, useScroll, useTransform } from "framer-motion"
import useScrollToTop from './hooks/useScrollToTop';
import ScrollBasedAnimation from "./components/NavigationControls.jsx";

const App = () => {
    const [lenisScrollProgress, setLenisScrollProgress] = useState(0);
    const { scrollYProgress } = useScroll();

    const lenisOptions = {
        duration: 0.6,
    }


    const onLenisScroll = useCallback(({ scroll, limit }) => {
        // Calculate scroll progress as a percentage
        const progress = scroll / limit;
        setLenisScrollProgress(progress);
    }, []);

    return (
        <Router>
            <ReactLenis root options={lenisOptions} onScroll={onLenisScroll}>
                <AppContent
                    scrollYProgress={scrollYProgress}
                    lenisScrollProgress={lenisScrollProgress}
                />
            </ReactLenis>
        </Router>
    )
}

const AppContent = ({ scrollYProgress, lenisScrollProgress }) => {
    useScrollToTop();


    const location = useLocation();
    const [ isShowingVideo, setIsShowingVideo ] = useState(false);

    useEffect(() => {
        const isVideoRoute = location.pathname.includes('/video/');
        if (isVideoRoute) {
            setIsShowingVideo(true)
        } else {
            setIsShowingVideo(false)
        }
    })

    const topRightOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
    const scaleThreshold = 1; // Reach full scale at 15% scroll instead of 10%

    const progressScale = useTransform(
        scrollYProgress,
        (value) => {
            if (value <= scaleThreshold) {
                // Scale from 0.1 to 1 over the defined threshold
                return 0.1 + (value * (0.9 / scaleThreshold));
            } else {
                return 1;
            }
        }


    );




    const lenis = useLenis();

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 2.2 });
        }
    };

    return (
        <div className="app-container scrollbar-hide">
            <div className={`top-right-header-wrapper transition duration-200 fixed right-[12px] text-xs top-[8px] z-30 ${isShowingVideo ? 'translate-y-[-50px]' :''}`}>
                <motion.div
                    className="top-right-header"
                    style={{opacity: topRightOpacity}}

                >
                    download cv


                </motion.div>

            </div>
            <div className={`progress-bar-wrapper ${isShowingVideo ? 'video-showing' : ''}`}>
                <motion.div

                    className={`progress-bar ${isShowingVideo ? 'video-showing opacity-60' : ''}`}
                    style={{scale: progressScale}}
                    onClick={scrollToTop}
                />
            </div>

            <div className="sidebar-container">
                <Sidebar isShowingVideo={isShowingVideo}/>
            </div>
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/exhibition/:slug" element={<ExhibitionPage/>}/>
                    <Route path="/project/:slug" element={<ProjectPage/>}/>
                    <Route path="/video/:slug" element={<VideoPage/>}/>
                    <Route path="/exhibition1" element={<ExhibitionSpread scrollYProgress={scrollYProgress}/>}/>
                </Routes>
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <div className="project-listing-column">
            {exhibitions2.map((exhibition, index) => (
                <Listing listing={exhibition} key={index}/>
            ))}
        </div>
    )
}

export default App