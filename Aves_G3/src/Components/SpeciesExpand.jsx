import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./SpeciesExpand.css";

const SpeciesExpand = ({ species = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSpecie, setSelectedSpecie] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [modalIsPlaying, setModalIsPlaying] = useState(false);

  const audioRefs = useRef([]);
  const modalAudioRef = useRef(null);

  // Manejo del audio en la lista de acordeón
  const handleAudio = (event, index) => {
    event.stopPropagation();
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }

    audioRefs.current.forEach((otherAudio, otherIndex) => {
      if (otherAudio && otherIndex !== index) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });

    audio.currentTime = 0;
    audio.play().then(() => setPlayingIndex(index)).catch(console.error);
  };

  // Manejo del audio dentro del modal
  const handleModalAudio = (e) => {
    e.stopPropagation();
    if (!modalAudioRef.current) return;

    if (modalIsPlaying) {
      modalAudioRef.current.pause();
      setModalIsPlaying(false);
    } else {
      modalAudioRef.current
        .play()
        .then(() => setModalIsPlaying(true))
        .catch(console.error);
    }
  };

  const closeModal = () => {
    if (modalAudioRef.current) {
      modalAudioRef.current.pause();
      modalAudioRef.current.currentTime = 0;
    }
    setModalIsPlaying(false);
    setSelectedSpecie(null);
  };

  return (
    <div
      className="species-expand-list"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {/* LISTA EN ACORDEÓN (HOVER) */}
      {species.map((item, index) => {
        const isActive = activeIndex === index;
        const isPlaying = playingIndex === index;

        return (
          <motion.div
            key={item.nombre}
            className="species-expand-item"
            initial={{ height: "3.5rem" }}
            animate={{ height: isActive ? "15rem" : "3.5rem" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setSelectedSpecie(item)}
          >
            <img src={item.img} alt={item.alt} className="species-expand-img" />

            {item.audio && (
              <audio
                ref={(element) => (audioRefs.current[index] = element)}
                src={item.audio}
                preload="metadata"
                onEnded={() => setPlayingIndex(null)}
              />
            )}

            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="species-expand-overlay"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="species-expand-info"
                >
                  <span
                    className={`species-expand-tag species-expand-tag--${
                      item.estado === "Migratoria" ? "migratoria" : "residente"
                    }`}
                  >
                    {item.estado}
                  </span>

                  <h3>{item.nombre}</h3>
                  <p className="species-expand-cientifico">
                    {item.nombreCientifico}
                  </p>
                  <p className="species-expand-desc">{item.descripcion}</p>

                  <div className="species-expand-actions">
                    {item.audio && (
                      <button
                        type="button"
                        className={`species-audio-button ${
                          isPlaying ? "is-playing" : ""
                        }`}
                        onClick={(e) => handleAudio(e, index)}
                      >
                        <span className="species-audio-icon">
                          {isPlaying ? "Ⅱ" : "▶"}
                        </span>
                        <span>{isPlaying ? "Pausar" : "Escuchar canto"}</span>
                      </button>
                    )}
                    <span className="species-click-hint">
                      Clic para ver detalles ↗
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isActive && (
              <span className="species-expand-collapsed-label">
                {item.nombre}
              </span>
            )}
          </motion.div>
        );
      })}

      {/* MODAL RENDERIZADO FUERA DEL DOM PRINCIPAL */}
      {createPortal(
        <AnimatePresence>
          {selectedSpecie && (
            <motion.div
              className="species-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="species-modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="species-modal-close"
                  onClick={closeModal}
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <div className="species-modal-media">
                  {selectedSpecie.video ? (
                    selectedSpecie.video.includes("youtube") ||
                    selectedSpecie.video.includes("embed") ? (
                      <iframe
                        className="species-modal-video"
                        src={selectedSpecie.video}
                        title={`Video de ${selectedSpecie.nombre}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        className="species-modal-video"
                        controls
                        src={selectedSpecie.video}
                        poster={selectedSpecie.img}
                      />
                    )
                  ) : (
                    <div className="species-modal-img-wrapper">
                      <img
                        src={selectedSpecie.img}
                        alt={selectedSpecie.alt}
                        className="species-modal-img"
                      />
                    </div>
                  )}
                </div>

                <div className="species-modal-info">
                  <span
                    className={`species-expand-tag species-expand-tag--${
                      selectedSpecie.estado === "Migratoria"
                        ? "migratoria"
                        : "residente"
                    }`}
                  >
                    {selectedSpecie.estado}
                  </span>

                  <h2>{selectedSpecie.nombre}</h2>
                  <p className="species-expand-cientifico">
                    {selectedSpecie.nombreCientifico}
                  </p>

                  {selectedSpecie.ubicacion && (
                    <div className="species-modal-location">
                      📍 <strong>Ubicación:</strong> {selectedSpecie.ubicacion}
                    </div>
                  )}

                  <p className="species-expand-desc">
                    {selectedSpecie.descripcion}
                  </p>

                  {selectedSpecie.audio && (
                    <>
                      <audio
                        ref={modalAudioRef}
                        src={selectedSpecie.audio}
                        onEnded={() => setModalIsPlaying(false)}
                      />
                      <button
                        type="button"
                        className={`species-audio-button ${
                          modalIsPlaying ? "is-playing" : ""
                        }`}
                        onClick={handleModalAudio}
                      >
                        <span className="species-audio-icon">
                          {modalIsPlaying ? "Ⅱ" : "▶"}
                        </span>
                        <span>
                          {modalIsPlaying ? "Pausar canto" : "Escuchar canto"}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default SpeciesExpand;