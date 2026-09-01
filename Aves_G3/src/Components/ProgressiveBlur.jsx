import "./ProgressiveBlur.css";

const ProgressiveBlur = ({
  position = "top",
  height = "120px",
  blurAmount = "6px",
}) => {
  const isTop = position === "top";

  const maskGradient = isTop
    ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)"
    : "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)";

  return (
    <div
      className="progressive-blur"
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitMaskImage: maskGradient,
        maskImage: maskGradient,
      }}
    />
  );
};

export default ProgressiveBlur;