import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./SpeciesExpand.css";

const SpeciesExpand = ({ species }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="species-expand-list">
      {species.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <motion.div
            key={item.nombre}
            className="species-expand-item"
            initial={{ height: "3.5rem" }}
            animate={{ height: isActive ? "24rem" : "3.5rem" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setActiveIndex(isActive ? null : index)}
            onHoverStart={() => setActiveIndex(index)}
          >
            <img
              src={item.img}
              alt={item.alt}
              className="species-expand-img"
            />

            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="species-expand-overlay"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="species-expand-info"
                >
                  <span
                    className={`species-expand-tag species-expand-tag--${item.estado === "Migratoria" ? "migratoria" : "residente"}`}
                  >
                    {item.estado}
                  </span>
                  <h3>{item.nombre}</h3>
                  <p className="species-expand-cientifico">{item.nombreCientifico}</p>
                  <p className="species-expand-desc">{item.descripcion}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isActive && (
              <span className="species-expand-collapsed-label">{item.nombre}</span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SpeciesExpand;