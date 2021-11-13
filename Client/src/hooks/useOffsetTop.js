import { useState, useEffect } from 'react';

const useOffSetTop = top => {
    const [offsetTop, setOffSetTop] = useState(false);
    const isTop = top || 100;

    useEffect(() => {
        window.onscroll = () => {
            setOffSetTop(window.pageYOffset > isTop);
        };
        return () => {
            window.onscroll = null;
        };
    }, [isTop]);

    return offsetTop;
}

export default useOffSetTop;

// Usage
// const offset = useOffSetTop(100);