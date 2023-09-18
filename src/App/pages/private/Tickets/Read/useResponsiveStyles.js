// useResponsiveStyles.js
import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const calculateScreenSize = (width) => {
  return width < 600 ? "sm" : "md";
};

const useResponsiveStyles = (variants) => {
  const [windowWidth] = useWindowSize();
  const screenSize = calculateScreenSize(windowWidth);
  return (
    variants.find((v) => v.variantValues.size === screenSize)?.overrides || {}
  );
};

export default useResponsiveStyles;
