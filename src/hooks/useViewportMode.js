import { useState, useEffect } from 'react';

export const useViewportMode = () => {
    const [viewportMode, setViewportMode] = useState('mobile');

    useEffect(() => {
        const check = () => {
            if (window.innerWidth >= 1200) {
                setViewportMode('desktop');
                return;
            }
            if (window.innerWidth >= 768) {
                setViewportMode('tablet');
                return;
            }
            setViewportMode('mobile');
        };

        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const isSplitView = viewportMode === 'desktop' || viewportMode === 'tablet';

    return { viewportMode, isSplitView };
};
