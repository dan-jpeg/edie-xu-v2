// MobileHome.jsx - Three column grid layout
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  exhibitions2,
  selectedWorks,
  videos,
} from "./data/projects-and-videos.js";
import { slugify } from "./helpers/slugify";

const MobileHome = () => {
  // Combine all content types
  const allContent = [
    ...exhibitions2.map((item) => ({ ...item, type: "exhibition" })),
    ...selectedWorks.map((item) => ({ ...item, type: "project" })),
    ...videos.map((item) => ({ ...item, type: "video" })),
  ];

  // Sort by date (assuming items have a date property)
  const sortedContent = allContent.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="pt-8 font-alte-haas pb-32">
      {/* Page header */}
      <div className="px-6 fixed bottom-4 w-screen  ">
        <div className="flex w-full place-items-end justify-end flex-row">
          <h1 className="text-[11px] font-bold mb-1">EDIE XU</h1>
        </div>
      </div>

      {/* 3-column grid layout */}
      <div className="grid grid-cols-3 gap-6 px-4">
        {/* Works column */}
        <div className="content-column">
          <h2 className="italic text-[11px] font-bold mb-12">WORKS</h2>
          <div className="flex flex-col space-y-3">
            {sortedContent
              .filter((item) => item.type === "project")
              .map((item, index) => (
                <MobileGridItem key={`project-${index}`} item={item} />
              ))}
          </div>
        </div>

        {/* Exhibitions column */}
        <div className="content-column">
          <h2 className="italic text-[11px] font-bold mb-12">EXHIBITIONS</h2>
          <div className="flex flex-col space-y-3">
            {sortedContent
              .filter((item) => item.type === "exhibition")
              .map((item, index) => (
                <MobileGridItem key={`exhibition-${index}`} item={item} />
              ))}
          </div>
        </div>

        {/* Videos column */}
        <div className="content-column">
          <h2 className="italic text-[11px] mb-12">VIDEOS</h2>
          <div className="flex flex-col space-y-3">
            {sortedContent
              .filter((item) => item.type === "video")
              .map((item, index) => (
                <MobileGridItem key={`video-${index}`} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile grid item component
const MobileGridItem = ({ item }) => {
  return (
    <Link to={`/${item.type}/${slugify(item.title)}`} className="block">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col"
      >
        <h3 className="text-[11px] uppercase mb-1">{item.title}</h3>
      </motion.div>
    </Link>
  );
};

export default MobileHome;
