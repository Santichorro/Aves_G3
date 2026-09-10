import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix del ícono por defecto de Leaflet en bundlers como Vite
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

function MapaAves({ puntos = [] }) {
  return (
    <MapContainer
      center={CALI_CENTER}
      zoom={12}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%", borderRadius: "24px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {puntos.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]}>
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
              <p className="map-popup-zone">📍 {p.zona}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaAves;