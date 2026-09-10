import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import "./SpeciesExpand.css";

const SpeciesExpand = ({ species }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  const audioRefs = useRef([]);

  const handleAudio = (event, index) => {
    event.stopPropagation();

    const audio = audioRefs.current[index];

    if (!audio) {
      console.error(
        "No se encontró el audio para:",
        species[index].nombre
      );
      return;
    }

    // Si ya está reproduciendo este audio → pausa
    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }

    // Detener cualquier otro audio
    audioRefs.current.forEach((otherAudio, otherIndex) => {
      if (otherAudio && otherIndex !== index) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });

    // Comenzar desde el inicio
    audio.currentTime = 0;

    audio
      .play()
      .then(() => {
        setPlayingIndex(index);
      })
      .catch((error) => {
        console.error(
          "No se pudo reproducir el audio:",
          error
        );
      });
  };

  const handleAudioEnded = (index) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
    }
  };

  return (
    <div className="species-expand-list">
      {species.map((item, index) => {
        const isActive = activeIndex === index;
        const isPlaying = playingIndex === index;

        return (
          <motion.div
            key={item.nombre}
            className="species-expand-item"
            initial={{
              height: "3.5rem",
            }}
            animate={{
              height: isActive
                ? "24rem"
                : "3.5rem",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            onClick={() =>
              setActiveIndex(
                isActive ? null : index
              )
            }
            onHoverStart={() =>
              setActiveIndex(index)
            }
          >

            {/* =========================
                IMAGEN
            ========================== */}
            <img
              src={item.img}
              alt={item.alt}
              className="species-expand-img"
            />

            {/* =========================
                AUDIO
            ========================== */}
            {item.audio && (
              <audio
                ref={(element) => {
                  audioRefs.current[index] =
                    element;
                }}
                src={item.audio}
                preload="metadata"
                onEnded={() =>
                  handleAudioEnded(index)
                }
              />
            )}

            {/* =========================
                OVERLAY
            ========================== */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="overlay"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="species-expand-overlay"
                />
              )}
            </AnimatePresence>

            {/* =========================
                INFORMACIÓN
            ========================== */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="info"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: 0.05,
                  }}
                  className="species-expand-info"
                >

                  <span
                    className={`species-expand-tag species-expand-tag--${
                      item.estado ===
                      "Migratoria"
                        ? "migratoria"
                        : "residente"
                    }`}
                  >
                    {item.estado}
                  </span>

                  <h3>
                    {item.nombre}
                  </h3>

                  <p className="species-expand-cientifico">
                    {item.nombreCientifico}
                  </p>

                  <p className="species-expand-desc">
                    {item.descripcion}
                  </p>

                  {/* =========================
                      BOTÓN DE AUDIO
                  ========================== */}
                  {item.audio && (
                    <button
                      type="button"
                      className={`species-audio-button ${
                        isPlaying
                          ? "is-playing"
                          : ""
                      }`}
                      onClick={(event) =>
                        handleAudio(
                          event,
                          index
                        )
                      }
                      aria-label={
                        isPlaying
                          ? `Pausar canto de ${item.nombre}`
                          : `Escuchar canto de ${item.nombre}`
                      }
                    >
                      <span className="species-audio-icon">
                        {isPlaying
                          ? "Ⅱ"
                          : "▶"}
                      </span>

                      <span>
                        {isPlaying
                          ? "Pausar canto"
                          : "Escuchar canto"}
                      </span>
                    </button>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

            {/* =========================
                NOMBRE CARTA CERRADA
            ========================== */}
            {!isActive && (
              <span className="species-expand-collapsed-label">
                {item.nombre}
              </span>
            )}

          </motion.div>
        );
      })}
    </div>
  );
};

export default SpeciesExpand;