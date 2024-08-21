import { useState, useCallback } from 'react'
import './globals.css'
import Sidebar from "./components/Sidebar.jsx";
import Listing from "./components/Listing.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { exhibitions2 } from "./data/projects-and-videos.js";
import ExhibitionSpread, { ExhibitionDefaultSpread } from "./components/ExhibitionSpread.jsx";
import { ExhibitionPage, ProjectPage, VideoPage } from "./components/PageComponents.jsx";
import { ReactLenis } from 'lenis/react'
import { motion, useScroll } from "framer-motion"
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

    return (
        <div className="app-container scrollbar-hide">
            <motion.div
                className="progress-bar"
                style={{scale: scrollYProgress}}
            />
            <div className="sidebar-container">
                <Sidebar/>
            </div>
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/exhibition/:slug" element={<ExhibitionPage/>}/>
                    <Route path="/project/:slug" element={<ProjectPage/>}/>
                    <Route path="/video/:slug" element={<VideoPage/>}/>
                    <Route path="/exhibition1" element={<ExhibitionSpread/>}/>
                </Routes>
            </div>
            <ScrollBasedAnimation scrollProgress={lenisScrollProgress} />
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