// components/NavigationControls.jsx
import { motion } from "framer-motion";

const NavigationControls = ({
  isVisible,
  adjacentItems,
  handleNavigation,
  bottomLeftTranslate,
}) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="navigation-controls fixed right-1/2 bottom-20 left-1/2 md:left-[6rem] md:bottom-[2.6rem] z-30">
        <motion.div
          className="italic text-[1.6rem] md:text-[0.8rem]"
          style={{ translateY: bottomLeftTranslate }}
          onClick={() => handleNavigation("prev")}
        >
          {adjacentItems.prev ? "prev" : ""}
        </motion.div>
      </div>
      <div className="fixed md:left-[8.3rem] bottom-20 right-6 md:bottom-[2.6rem] z-30">
        <motion.div
          className="italic text-[1.6rem] md:text-[0.8rem]"
          style={{ translateY: bottomLeftTranslate }}
          onClick={() => handleNavigation("next")}
        >
          {adjacentItems.next ? "next" : ""}
        </motion.div>
      </div>
    </>
  );
};

export default NavigationControls;
