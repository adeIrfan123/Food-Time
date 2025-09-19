import { useEffect, useRef } from "react";

const FeatherIcon = ({ icon, className = "", ...props }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (window.feather && iconRef.current) {
      const svg = window.feather.icons[icon]?.toSvg({ class: className });
      if (svg) {
        iconRef.current.innerHTML = svg;
      }
    }
  }, [icon, className]);

  return <span ref={iconRef} {...props}></span>;
};

export default FeatherIcon;
