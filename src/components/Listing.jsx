import { Link } from "react-router-dom";
import { exhibitions2 } from "../data/projects-and-videos.js";
import "./Listing.css";
import { slugify } from "../helpers/slugify";
import { motion } from "framer-motion";

const Listing = ({ listing }) => {
  return (
    <motion.div
      initial="visible"
      whileInView="hidden"
      viewport={{ once: false, margin: "0px 0px 500px 0px" }}
    >
      <Link
        to={`/exhibition/${slugify(listing.title)}`}
        className="listing-container "
      >
        <motion.div className="text-[9px] leading-5">
          <p className="font-alte-haas">{`${listing.date.slice(0, 4)}`}</p>
        </motion.div>
        <div className="text-content text-right text-[11px]">
          <h2 className=" pb-4">{`${listing.title}`}</h2>

          <p className={`text-[11px]`}> {listing.category}</p>
          <p>{listing.location}</p>
        </div>
        <div className="image-content">
          <img src={listing.images[0]} alt="Art Image" />
          {/*<div className="date">{listing.date}</div>*/}
        </div>
      </Link>
    </motion.div>
  );
};

export default Listing;
