import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Listing.css";
import { slugify } from "../helpers/slugify";

const Listing = ({ listing, previousListing }) => {
  const currentYear = listing.date.slice(0, 4);
  const previousYear = previousListing
    ? previousListing.date.slice(0, 4)
    : null;
  const showYear = currentYear !== previousYear;

  return (
    <motion.div
      initial="visible"
      whileInView="hidden"
      viewport={{ once: false, margin: "0px 0px 500px 0px" }}
    >
      <Link
        to={`/exhibition/${slugify(listing.title)}`}
        className="listing-container"
      >
        <motion.div className="text-[11px] font-bold leading-5">
          <p className={`${showYear ? "opacity-1" : "opacity-0"}`}>
            {currentYear}
          </p>
        </motion.div>
        <div className="text-content text-right text-[11px]">
          <h2 className="pb-4">{listing.title}</h2>
          <p className="text-[11px]">{listing.category}</p>
          <p>{listing.location}</p>
        </div>
        <div className="image-content">
          <img src={listing.images[0]} alt="Art Image" />
        </div>
      </Link>
    </motion.div>
  );
};

export default Listing;
