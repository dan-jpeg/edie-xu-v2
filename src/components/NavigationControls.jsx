import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollBasedAnimation = ({ scrollProgress }) => {
    const controls = useAnimation();

    useEffect(() => {
        if (scrollProgress > 0.95) { // 95% of the page
            controls.start({ opacity: 1, y: 0 });
        } else {
            controls.start({ opacity: 0, y: 0 });
        }
    }, [scrollProgress, controls]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={controls}
            transition={{ duration: 0.2 }}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 48,
                color: 'black',
                padding: '10px 20px',
                borderRadius: '5px'
            }}
        >
            previous next
        </motion.div>
    );
};

export default ScrollBasedAnimation;