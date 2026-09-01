import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import "./Dock.css";

const DEFAULT_SPRING = {
  stiffness: 400,
  damping: 25,
  mass: 0.4,
};

function DockIcon({
  item,
  mouseX,
  magnification,
  distance,
  iconSize,
  borderRadius,
  springOptions,
  onHover,
  iconRef,
}) {
  const wrapperRef = useRef(null);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const el = wrapperRef.current;
    if (!el) return distance * 100;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const gaussian = (d) =>
    (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;

  const widthRaw = useTransform(distanceFromMouse, (d) => iconSize * gaussian(d));
  const heightRaw = useTransform(distanceFromMouse, (d) => iconSize * gaussian(d));

  const width = useSpring(widthRaw, springOptions);
  const height = useSpring(heightRaw, springOptions);

  return (
    <motion.div
      ref={wrapperRef}
      className="dock-item-wrapper"
      style={{ width, height: iconSize }}
    >
      <motion.div
        ref={iconRef}
        style={{ width, height, bottom: 0 }}
        className="dock-item-inner"
      >
        <a
          href={item.href}
          onMouseEnter={() => onHover(iconRef)}
          onMouseLeave={() => onHover(null)}
          aria-label={item.label}
          style={{ borderRadius }}
          className="dock-item-link"
        >
          {item.icon}
        </a>
      </motion.div>
    </motion.div>
  );
}

const Dock = ({
  items,
  magnification = 1.7,
  distance = 120,
  iconSize = 40,
  gap = 6,
  borderRadius = 16,
  springOptions = DEFAULT_SPRING,
}) => {
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);
  const iconRefs = useRef(items.map(() => ({ current: null })));

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipBottomOffset, setTooltipBottomOffset] = useState(0);

  useEffect(() => {
    if (hoveredIndex === null) return;

    let raf;
    const update = () => {
      const iconEl = iconRefs.current[hoveredIndex]?.current;
      const dockEl = dockRef.current;
      if (iconEl && dockEl) {
        const iconRect = iconEl.getBoundingClientRect();
        const dockRect = dockEl.getBoundingClientRect();
        setTooltipX(iconRect.left - dockRect.left + iconRect.width / 2);
        setTooltipBottomOffset(dockRect.bottom - iconRect.top);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [hoveredIndex]);

  const handleHover = useCallback((ref) => {
    if (ref === null) {
      setHoveredIndex(null);
      return;
    }
    const idx = iconRefs.current.findIndex((r) => r === ref);
    setHoveredIndex(idx >= 0 ? idx : null);
  }, []);

  return (
    <motion.div
      ref={dockRef}
      className="dock"
      style={{ gap, borderRadius }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item, i) => (
        <DockIcon
          key={item.label}
          item={item}
          mouseX={mouseX}
          magnification={magnification}
          distance={distance}
          iconSize={iconSize}
          borderRadius={borderRadius}
          springOptions={springOptions}
          onHover={handleHover}
          iconRef={iconRefs.current[i]}
        />
      ))}

      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key="dock-tooltip"
            className="dock-tooltip"
            style={{
              left: tooltipX,
              bottom: tooltipBottomOffset + 8,
              x: "-50%",
            }}
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.13, ease: "easeOut" }}
          >
            <span className="dock-tooltip-label">{items[hoveredIndex].label}</span>
            <svg width="8" height="4" viewBox="0 0 8 4" className="dock-tooltip-arrow" aria-hidden="true">
              <path d="M0 0L4 4L8 0" fill="currentColor" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dock;