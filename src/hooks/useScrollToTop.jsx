import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react'

const useScrollToTop = () => {
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.1, immediate: false });
        }
    }, [pathname, lenis]);
};

export default useScrollToTop;