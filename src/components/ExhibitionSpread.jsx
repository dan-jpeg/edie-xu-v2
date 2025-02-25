import { exhibitions2 } from "../data/projects-and-videos.js";
import Listing from "./Listing.jsx";
import "./exhibtionSpread.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

("framer-motion");
import {
  ImagesSingleColumn,
  ImageRow,
  ImageRowEqual,
  IncludedWork,
  PrevNextControls,
} from "./ProjectPageComponents.jsx";

const ExhibitionSpread = ({ scrollYProgress }) => {
  return (
    <div className="exhibition-spread-container items-center content-center flex-col justify-start ">
      <p className="text-2xl pb-2 italic m-0 md:fixed md:top-20 md:right-20">
        {exhibitions2[1].title}{" "}
      </p>
      <div className="exhibition-header-di justify-items-start pt-40">
        <p className="text-s pb-2 not-italic"> {exhibitions2[1].location}</p>
        <p className="text-s pb-3 not-italic m-0"> {exhibitions2[1].date}</p>

        <p className="text-sm not-italic "> {exhibitions2[1].header}</p>
      </div>

      <p className="pt-12  text-xs">
        {" "}
        {exhibitions2[1].textContent.slice(0, 714)}{" "}
      </p>
      <p className="pt-12  text-xs">
        {" "}
        {exhibitions2[1].textContent.slice(714, 1200)}{" "}
      </p>

      <div className="work-included-row">
        <IncludedWork work={exhibitions2[1].workIncluded[0]} />
        <IncludedWork work={exhibitions2[1].workIncluded[1]} />
      </div>
      <ImageRowEqual
        images={[exhibitions2[1].images[6], exhibitions2[1].images[5]]}
      />
      <ImagesSingleColumn images={exhibitions2[1].images.slice(1, 5)} />
      <ImagesSingleColumn images={exhibitions2[1].images.slice(8, 9)} />

      <ImageRow
        images={[exhibitions2[1].images[10], exhibitions2[1].images[9]]}
      />
      {/*<PrevNextControls/>*/}
    </div>
  );
};

export default ExhibitionSpread;

const CHARACTER_LIMIT = 1000;

const CollapsibleText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldCollapse = text.length > CHARACTER_LIMIT;

  const displayText =
    !shouldCollapse || isExpanded
      ? text
      : text.slice(0, CHARACTER_LIMIT) + "...";

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.p
          className="text-[11px]  px-12 leading-5 mt-4 pb-12 pt-8 indent-[2vw] text-justify "
          initial={{ height: "auto" }}
          animate={{ height: "auto" }}
          exit={{ height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {displayText}
        </motion.p>
      </AnimatePresence>

      {shouldCollapse && (
        <div className="flex place-items-center justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray font-bold font-alte-haas  hover:op text-xl mb-6 mt-2  cursor-pointer"
          >
            {isExpanded ? "-" : "+"}
          </button>
        </div>
      )}
    </div>
  );
};

export const ExhibitionDefaultSpread = ({ exhibition }) => {
  const { title, location, date, header, textContent, workIncluded, images } =
    exhibition;

  return (
    <div className="exhibition-spread-container flex flex-col items-center text-right gap-4 pb-16 md:pb-0">
      <div></div>

      <div className="   place-content-center ml-4 pt-[calc(100vh-210px)]">
        <div className="work-included-container mb-14">
          <p className="uppercase text-[14px]">{title}</p>
          <p className="">{location}</p>
          <p className=" px-6">{date}</p>
        </div>
      </div>
      <ImagesSingleColumn images={[images[0]]} />
      {textContent && <CollapsibleText text={textContent} />}
      <ImagesSingleColumn images={images.slice(1, 9)} />
      <div className="grid-cols-3 grid pt-12 w-full">
        {workIncluded && workIncluded.length >= 2 && (
          <>
            <div className="col-span-1  ">
              <IncludedWork work={workIncluded[0]} />
            </div>
            <div className="col-span-1 opacity-0 -mr-4">
              <IncludedWork work={workIncluded[0]} />
            </div>
            <div className="col-span-1 ">
              <IncludedWork work={workIncluded[1]} />
            </div>
            <div className="col-span-1 opacity-0">
              <IncludedWork work={workIncluded[0]} />
            </div>
          </>
        )}

        <div className="col-span-3 text-center justify-self-center ">
          <p className="not-italic max-w-[200px] font-[9px] leading-4 pb-[200px] pt-6 ">
            {header}
          </p>
        </div>
      </div>
    </div>
  );
};
