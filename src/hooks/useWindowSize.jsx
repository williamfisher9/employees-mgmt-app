import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight})
        })
    
        window.removeEventListener("resize", () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight})
        })
    }, [])
    
    return windowSize;
}

export default useWindowSize;