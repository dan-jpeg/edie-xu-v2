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
        className="listing-container text-xs"
      >
        <motion.div className="date-container">
          <p>{`${listing.date}`}</p>
        </motion.div>
        <div className="text-content">
          <h2 className="italic">{`${listing.title}`}</h2>

          <p className={`text-sm`}> {listing.category}</p>
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
