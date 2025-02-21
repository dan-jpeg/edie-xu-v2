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
    <motion.div initial="visible">
      <Link
        to={`/exhibition/${slugify(listing.title)}`}
        className="listing-container"
      >
        <motion.div className="text-[12px] font-bold leading-5">
          <p
            className={`hidden md:block ${showYear ? "opacity-1" : "opacity-0"}`}
          >
            {currentYear}
          </p>
        </motion.div>
        <div className=" text-center  uppercase text-[11px]">
          <h2 className=" m-0 p-0 uppercase">{listing.title}</h2>
          <div className=" w-[66px] justify-self-center pt-[5px] h-[66px] ">
            <img
              src={listing.images[0]}
              alt="Art Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Listing;
