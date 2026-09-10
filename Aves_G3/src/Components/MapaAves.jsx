import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";


import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CALI_CENTER = [3.4516, -76.532];

function MapController({ puntos, aveSeleccionada }) {
  const map = useMap();

  useEffect(() => {
    if (puntos.length === 1) {
      map.flyTo([puntos[0].lat, puntos[0].lng], 14, { duration: 1.2 });
    } else if (puntos.length > 1) {
      map.flyTo(CALI_CENTER, 12, { duration: 1 });
    }
  }, [puntos, map, aveSeleccionada]);

  return null;
}

function MapaAves({
  puntos = [],
  aveSeleccionada = "Todas",
  setAveSeleccionada,
}) {
  const [filtroProbabilidad, setFiltroProbabilidad] = useState("Todas");
  const markerRef = useRef(null);

  const nombresAves = [
    "Todas",
    ...Array.from(new Set(puntos.map((p) => (p.nombre || "").trim()))),
  ];

  const handleAveChange = (nuevaAve) => {
    if (setAveSeleccionada) setAveSeleccionada(nuevaAve);
    if (nuevaAve !== "Todas") setFiltroProbabilidad("Todas");
  };

  const handleProbabilidadChange = (nuevaProb) => {
    setFiltroProbabilidad(nuevaProb);
    if (nuevaProb !== "Todas" && setAveSeleccionada) {
      setAveSeleccionada("Todas");
    }
  };

  const puntosFiltrados = puntos.filter((p) => {
    const probPunto = (p.probabilidad || "").trim().toLowerCase();
    const probFiltro = filtroProbabilidad.trim().toLowerCase();
    const coincideProbabilidad =
      probFiltro === "todas" || probPunto === probFiltro;

    const nombrePunto = (p.nombre || "").trim().toLowerCase();
    const nombreFiltro = (aveSeleccionada || "Todas").trim().toLowerCase();
    const coincideAve =
      nombreFiltro === "todas" || nombrePunto === nombreFiltro;

    return coincideProbabilidad && coincideAve;
  });

  useEffect(() => {
    if (puntosFiltrados.length === 1 && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [puntosFiltrados]);

  return (
    <div className="map-wrapper">
      {/* BARRA SUPERIOR DE FILTROS */}
      <div className="map-filter-bar">
        <div className="filter-group">
          <span className="filter-label">Probabilidad:</span>
          <div className="filter-buttons">
            {["Todas", "Alta", "Media", "Baja"].map((opcion) => (
              <button
                key={opcion}
                type="button"
                className={`filter-btn ${
                  filtroProbabilidad.toLowerCase() === opcion.toLowerCase()
                    ? "active"
                    : ""
                } ${
                  opcion !== "Todas"
                    ? `filter-btn--${opcion.toLowerCase()}`
                    : ""
                }`}
                onClick={() => handleProbabilidadChange(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Especie:</span>
          <select
            className="filter-select"
            value={aveSeleccionada}
            onChange={(e) => handleAveChange(e.target.value)}
          >
            {nombresAves.map((ave) => (
              <option key={ave} value={ave}>
                {ave === "Todas" ? "Todas las especies" : ave}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTENEDOR DEL MAPA */}
      <div className="map-leaflet-box">
        <MapContainer
          center={CALI_CENTER}
          zoom={12}
          scrollWheelZoom={false}
          className="mapa-aves-canvas"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController
            puntos={puntosFiltrados}
            aveSeleccionada={aveSeleccionada}
          />

          {puntosFiltrados.map((p) => (
            <Marker
              key={`${p.nombre}-${p.lat}-${p.lng}`}
              position={[p.lat, p.lng]}
              ref={puntosFiltrados.length === 1 ? markerRef : null}
            >
              <Popup>
                <div className="map-popup-card">
                  {p.probabilidad && (
                    <span
                      className={`map-prob-tag map-prob-tag--${p.probabilidad.toLowerCase()}`}
                    >
                      Probabilidad {p.probabilidad}
                    </span>
                  )}
                  <h4 className="map-popup-title">{p.nombre}</h4>
                  <p className="map-popup-zone">{p.zona}</p>

                  {p.horario && (
                    <div className="map-popup-time">
                      <span>🕒 Horario recomendado:</span>
                      <p>{p.horario}</p>
                    </div>
                  )}

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-route-btn"
                  >
                    🧭 Cómo llegar
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* TARJETA INFORMATIVA */}
        <div className="map-overlay-card">
          <div className="map-overlay-header">
            <span className="map-pulse-dot"></span>
            <span className="map-overlay-subtitle">MAPA INTERACTIVO</span>
          </div>
          <h4>Explora Cali</h4>
          <p>
            Selecciona una especie para conocer sus horarios de mayor actividad y trazar tu ruta.
          </p>
        </div>

        {/* LEYENDA */}
        <div className="map-bottom-legend">
          <span className="legend-title">Probabilidad</span>
          <div className="legend-items">
            <span className="legend-pill pill-alta"><i></i> Alta</span>
            <span className="legend-pill pill-media"><i></i> Media</span>
            <span className="legend-pill pill-baja"><i></i> Baja</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapaAves;