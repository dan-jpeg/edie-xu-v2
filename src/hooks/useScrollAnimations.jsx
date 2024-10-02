// hooks/useScrollAnimations.js
import { useTransform, useScroll } from "framer-motion";

const useScrollAnimations = () => {
  const { scrollYProgress } = useScroll();

  const topRightTranslate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.4, 0.5],
    [0, -5, -30, -130, -250],
  );

  const contactTranslate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.4, 0.5],
    [0, -5, -30, -150, -300],
  );

  const bottomLeftTranslate = useTransform(
    scrollYProgress,
    [0, 0.6, 0.7, 0.8, 0.9],
    [120, 50, 35, 20, 0],
  );

  const topRightOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scaleThreshold = 1;
  const progressScale = useTransform(scrollYProgress, (value) => {
    return value <= scaleThreshold ? 0.1 + value * (0.9 / scaleThreshold) : 1;
  });

  return {
    scrollYProgress,
    topRightTranslate,
    contactTranslate,
    bottomLeftTranslate,
    topRightOpacity,
    progressScale,
  };
};

export default useScrollAnimations;
