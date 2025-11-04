import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siloIcon from "../assets/silo-icon.svg";
import siloIcon1 from "../assets/silo-icon-1.svg";
import siloIcon2 from "../assets/silo-icon-2.svg";
import siloIcon3 from "../assets/silo-icon-3.svg";
import siloIcon4 from "../assets/silo-icon-4.svg";
import siloIcon5 from "../assets/silo-icon-5.svg";

const SiloHoverButton = ({ label = "+", speed = 150, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstAppearance, setIsFirstAppearance] = useState(true);

  // Array of your SVG imports
  const siloShapes = [
    siloIcon,
    siloIcon1,
    siloIcon2,
    siloIcon3,
    siloIcon4,
    siloIcon5,
  ];

  useEffect(() => {
    if (!isHovered) {
      setIsFirstAppearance(true);
      return;
    }

    // Set random starting index on hover
    setCurrentIndex(Math.floor(Math.random() * siloShapes.length));

    // Cycle through shapes while hovered
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        setIsFirstAppearance(false);
        return (prev + 1) % siloShapes.length;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isHovered, siloShapes.length, speed]);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="px-[5px] py-[1px] rounded-full border-black text-[10px] lowercase tracking-wider bg-black bg-opacity-10 hover:bg-black hover:text-white transition-colors"
      >
        {label}
      </button>

      <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-[20px] h-[40px] pointer-events-none">
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.img
              key={currentIndex}
              src={siloShapes[currentIndex]}
              alt={`silo-${currentIndex}`}
              className="w-full h-full object-contain"
              initial={
                isFirstAppearance ? { opacity: 0.3, y: 10 } : { opacity: 1 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1 }}
              transition={
                isFirstAppearance ? { duration: 0.4 } : { duration: 0.3 }
              }
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SiloHoverButton;
