// RoutesComponent.js
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import {
  ExhibitionPage,
  ProjectPage,
  VideoPage,
} from "./components/PageComponents";
import ExhibitionSpread from "./components/ExhibitionSpread";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/exhibition/:slug" element={<ExhibitionPage />} />
    <Route path="/project/:slug" element={<ProjectPage />} />
    <Route path="/video/:slug" element={<VideoPage />} />
    <Route path="/exhibition1" element={<ExhibitionSpread />} />
    {/* <Route path="/hello" element={<LandingPage />} /> */}
  </Routes>
);

export default RoutesComponent;
