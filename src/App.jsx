import { useState } from 'react'
import './globals.css'
import Sidebar from "./components/Sidebar.jsx";
import Listing from "./components/Listing.jsx";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import {exhibitions2} from "./data/projects-and-videos.js";
import { slugify } from './helpers/slugify';
import ExhibitionSpread, {ExhibitionDefaultSpread} from "./components/ExhibitionSpread.jsx";
import {ExhibitionPage, ProjectPage, VideoPage} from "./components/PageComponents.jsx";
import { ReactLenis } from 'lenis/react'
import { motion, useScroll } from "framer-motion"
import useScrollToTop from './hooks/useScrollToTop';

const App = () => {
    const { scrollYProgress } = useScroll();
    const lenisOptions = {
        duration: 0.6,
    }

    return (
        <Router>
            <ReactLenis root options={lenisOptions}>
                <AppContent scrollYProgress={scrollYProgress} />
            </ReactLenis>
        </Router>
    )
}

const AppContent = ({ scrollYProgress }) => {
    useScrollToTop();

    return (
        <div className="app-container hide-scrollbar">
            <motion.div
                className="progress-bar"
                style={{scaleX: scrollYProgress}}
            />
            <div className="sidebar-container">
                <Sidebar/>
            </div>
            <div className="main-container hide-scrollbar">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/exhibition/:slug" element={<ExhibitionPage/>}/>
                    <Route path="/project/:slug" element={<ProjectPage/>}/>
                    <Route path="/video/:slug" element={<VideoPage/>}/>
                    <Route path="/exhibition1" element={<ExhibitionSpread/>}/>
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