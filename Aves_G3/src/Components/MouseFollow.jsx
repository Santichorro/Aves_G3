import { motion, useSpring } from "framer-motion";
import { useState } from "react";
import './MouseFollow.css';

const SPRING = {
  mass: 0.1,
  damping: 10,
  stiffness: 131,
};

const CursorFollow = ({ children }) => {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);
  const scale = useSpring(1, SPRING);

  const handlePointerMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const handlePointerDown = () => {
    scale.set(0.55);
  };

  const handlePointerUp = () => {
    scale.set(1);
  };

  return (
    <div
      className="cursor-follow-wrapper"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children}

      <motion.div
        style={{ x, y, opacity, scale }}
        className="cursor-follow-dot"
      />
    </div>
  );
};

export default CursorFollow;