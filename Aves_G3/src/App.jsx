import { useState } from "react";
import "./App.css";

// IMÁGENES
import barranqueroImg from "./assets/IMG/BarranqueroChinese.jpg";
import garzaRealImg from "./assets/IMG/GarzaRealChinese.jpg";
import azulejoImg from "./assets/IMG/AzulejoComunChinese.jpg";
import gallitoRocaImg from "./assets/IMG/GallitoDeRocaChinese.jpg";
import toritoImg from "./assets/IMG/ToritoCabecirrojoChinese.jpg";

// AUDIOS
import barranqueroAudio from "./assets/Audio/barranquero.mp3";
import garzaRealAudio from "./assets/Audio/garzaReal.mp3";
import azulejoAudio from "./assets/Audio/azulejoComun.mp3";
import gallitoRocaAudio from "./assets/Audio/GallitoRoca.mp3";
import toritoAudio from "./assets/Audio/toritoCabecirrojo.mp3";

// COMPONENTES
import CursorFollow from "./Components/MouseFollow";
import SpeciesExpand from "./Components/SpeciesExpand";
import ProgressiveBlur from "./Components/ProgressiveBlur";
import Dock from "./Components/Dock";
import MapaAves from "./Components/MapaAves";
import { Home, Bird, Map, Info } from "lucide-react";

const especies = [
  {
    img: barranqueroImg,
    alt: "Barranquero",
    nombre: "Barranquero",
    nombreCientifico: "Momotus subrufescens",
    estado: "Residente",
    probabilidad: "Alta",
    horario: "6:00 AM – 8:30 AM y 4:30 PM – 6:00 PM",
    audio: barranqueroAudio,
    descripcion:
      "Ave símbolo de la ciudad de Cali, reconocida por su llamativa cola en forma de péndulo. Habita zonas de bosque y jardines urbanos con vegetación densa.",
    ubicacion: "Zoológico de Cali, San Antonio y Ecoparque Bataclán",
    video: "https://www.youtube.com/embed/TwfFgGpLIvs",
  },
  {
    img: garzaRealImg,
    alt: "Garza Real",
    nombre: "Garza Real",
    nombreCientifico: "Ardea alba",
    estado: "Residente",
    probabilidad: "Media",
    horario: "7:00 AM – 11:00 AM y 3:00 PM – 5:30 PM",
    audio: garzaRealAudio,
    descripcion:
      "Ave de gran tamaño y plumaje blanco, frecuente en humedales y orillas del río Cauca. Suele observarse inmóvil junto al agua mientras acecha a su presa.",
    ubicacion: "Humedal El Cortijo, Corredor del Río Cauca y Ecocentro Pance",
    video: "https://www.youtube.com/embed/P8yttfEYVVo",
  },
  {
    img: azulejoImg,
    alt: "Azulejo Común",
    nombre: "Azulejo Común",
    nombreCientifico: "Thraupis episcopus",
    estado: "Residente",
    probabilidad: "Alta",
    horario: "Todo el día (Mayor actividad: 6:30 AM – 10:00 AM)",
    audio: azulejoAudio,
    descripcion:
      "Una de las aves más comunes en parques y separadores arborizados de la ciudad. Se caracteriza por su plumaje azul turquesa y su comportamiento sociable.",
    ubicacion: "Parque del Perro, Boulevard del Río y zonas urbanas de Cali",
    video: "https://www.youtube.com/embed/N458Vi0wNyM",
  },
  {
    img: gallitoRocaImg,
    alt: "Gallito de Roca Andino",
    nombre: "Gallito de Roca Andino",
    nombreCientifico: "Rupicola peruvianus",
    estado: "Residente",
    probabilidad: "Baja",
    horario: "5:30 AM – 7:30 AM (Leks de exhibición matutina)",
    audio: gallitoRocaAudio,
    descripcion:
      "Ave emblemática de los Andes, reconocida por su llamativo plumaje naranja y su cresta en forma de disco. Habita bosques de niebla cercanos a la ciudad.",
    ubicacion: "PNN Farallones de Cali (Sector San Antonio y Km 18)",
    video: "https://www.youtube.com/embed/qQ3vKFkQRA0",
  },
  {
    img: toritoImg,
    alt: "Torito Cabecirrojo",
    nombre: "Torito Cabecirrojo",
    nombreCientifico: "Eubucco bourcierii",
    estado: "Residente",
    probabilidad: "Media",
    horario: "6:30 AM – 9:30 AM y 3:30 PM – 5:00 PM",
    audio: toritoAudio,
    descripcion:
      "Ave de tamaño pequeño con marcado dimorfismo sexual: el macho luce cabeza roja intensa. Habita bosques húmedos de montaña en los alrededores de Cali.",
    ubicacion: "Bosques de niebla del Km 18 y Cuenca Alta del Río Pance",
    video: "https://www.youtube.com/embed/Jg7gnuusQRM",
  },
];

const puntosMapa = [
  {
    lat: 3.4481,
    lng: -76.5576,
    nombre: "Barranquero",
    zona: "Zoológico de Cali & San Antonio",
    probabilidad: "Alta",
    horario: "6:00 AM – 8:30 AM | 4:30 PM – 6:00 PM",
  },
  {
    lat: 3.3833,
    lng: -76.5333,
    nombre: "Garza Real",
    zona: "Humedal El Cortijo & Río Cauca",
    probabilidad: "Media",
    horario: "7:00 AM – 11:00 AM | 3:00 PM – 5:30 PM",
  },
  {
    lat: 3.4533,
    lng: -76.5325,
    nombre: "Azulejo Común",
    zona: "Boulevard del Río & Parque del Perro",
    probabilidad: "Alta",
    horario: "Todo el día (Pico: 6:30 AM – 10:00 AM)",
  },
  {
    lat: 3.4698,
    lng: -76.618,
    nombre: "Gallito de Roca Andino",
    zona: "PNN Farallones (Sector San Antonio / Km 18)",
    probabilidad: "Baja",
    horario: "5:30 AM – 7:30 AM (Leks matutinos)",
  },
  {
    lat: 3.325,
    lng: -76.63,
    nombre: "Torito Cabecirrojo",
    zona: "Bosques del Km 18 & Cuenca Alta de Pance",
    probabilidad: "Media",
    horario: "6:30 AM – 9:30 AM | 3:30 PM – 5:00 PM",
  },
];

const habitats = [
  {
    numero: "01",
    nombre: "Bosques de niebla",
    imagen:
      "https://images.pexels.com/photos/535188/pexels-photo-535188.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    numero: "02",
    nombre: "Humedales",
    imagen:
      "https://images.pexels.com/photos/27629633/pexels-photo-27629633.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    numero: "03",
    nombre: "Ríos",
    imagen:
      "https://images.pexels.com/photos/12266046/pexels-photo-12266046.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    numero: "04",
    nombre: "Parques urbanos",
    imagen:
      "https://images.pexels.com/photos/9408180/pexels-photo-9408180.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

function App() {
  const [aveSeleccionadaMapa, setAveSeleccionadaMapa] = useState("Todas");

  const dockItems = [
    {
      label: "Inicio",
      href: "#inicio",
      icon: <Home size={22} strokeWidth={1.8} />,
    },
    {
      label: "Especies",
      href: "#especies",
      icon: <Bird size={22} strokeWidth={1.8} />,
    },
    {
      label: "Mapa",
      href: "#mapa",
      icon: <Map size={22} strokeWidth={1.8} />,
    },
    {
      label: "Acerca",
      href: "#acerca",
      icon: <Info size={22} strokeWidth={1.8} />,
    },
  ];

  const handleVerEnMapa = (nombreAve) => {
    setAveSeleccionadaMapa(nombreAve);
    const mapaElem = document.getElementById("mapa");
    if (mapaElem) {
      mapaElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ProgressiveBlur position="top" />
      <ProgressiveBlur position="bottom" />

      {/* Header / Hero */}
      <header id="site-header">
        <div className="header-top">
          <span className="header-label">NUESTRA CASA COMPARTIDA</span>
          <h1>
            Cali, capital
            <br />
            mundial de las aves.
          </h1>
          <p className="header-description">
            Guía interactiva de avistamiento para descubrir las especies que
            habitan Santiago de Cali.
          </p>
          <a href="#especies" className="hero-button">
            Explorar aves
          </a>
        </div>
      </header>

      {/* Navegación Dock */}
      <Dock
        items={dockItems}
        magnification={1.35}
        distance={120}
        iconSize={38}
        gap={8}
        borderRadius={16}
      />

      <CursorFollow>
        <main id="site-body">
          {/* 01 - Inicio */}
          <section id="inicio" className="intro-section">
            <div className="section-heading">
              <span className="section-number">01</span>
              <div>
                <span className="section-label">DESCUBRE CALI</span>
                <h2>Un hábitat vivo.</h2>
                <p>
                  Santiago de Cali y su entorno reúnen diferentes ecosistemas
                  donde habitan numerosas especies de aves residentes y
                  migratorias.
                </p>
              </div>
            </div>
                        <div className="habitats">
              {habitats.map((habitat) => (
                <div className="habitat-item" key={habitat.numero}>
                  <img
                    src={habitat.imagen}
                    alt={habitat.nombre}
                    className="habitat-img"
                    loading="lazy"
                  />
                  <div className="habitat-overlay" />
                  <div className="habitat-content">
                    <span>{habitat.numero}</span>
                    <h3>{habitat.nombre}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 02 - Especies */}
          <section id="especies" className="species-section">
            <div className="section-heading">
              <span className="section-number">02</span>
              <div>
                <span className="section-label">EXPLORACIÓN</span>
                <h2>Conoce sus habitantes.</h2>
                <p>
                  Explora algunas de las especies de aves presentes en Cali y
                  conoce sus principales características.
                </p>
              </div>
            </div>
            <div className="species-counter">
              <span>{especies.length}</span>
              <p>especies disponibles</p>
            </div>
            <SpeciesExpand species={especies} onVerEnMapa={handleVerEnMapa} />
          </section>

          {/* 03 - Mapa */}
          <section id="mapa" className="map-section">
            <div className="section-heading">
              <span className="section-number">03</span>
              <div>
                <span className="section-label">CARTOGRAFÍA</span>
                <h2>Encuéntralas en Cali.</h2>
                <p>
                  Descubre las zonas donde existe mayor probabilidad de
                  avistamiento de cada especie.
                </p>
              </div>
            </div>

            <MapaAves
              puntos={puntosMapa}
              aveSeleccionada={aveSeleccionadaMapa}
              setAveSeleccionada={setAveSeleccionadaMapa}
            />
          </section>

          {/* 04 - Acerca */}
          <section id="acerca" className="about-section">
            <div className="section-heading">
              <span className="section-number">04</span>
              <div>
                <span className="section-label">EL PROYECTO</span>
                <h2>Nuestra casa compartida.</h2>
                <p>
                  Esta aplicación web busca acercar a la ciudadanía a las aves
                  que habitan Cali mediante una experiencia multimedia basada en
                  fotografía, audio, video y cartografía.
                </p>
              </div>
            </div>
            <div className="about-details">
              <div>
                <span>PROYECTO</span>
                <p>Arquitectura de Sistemas Multimedia</p>
              </div>
              <div>
                <span>UNIVERSIDAD</span>
                <p>Universidad Autónoma de Occidente</p>
              </div>
              <div>
                <span>RECURSOS</span>
                <p>Recursos abiertos y gratuitos</p>
              </div>
            </div>
          </section>
        </main>
      </CursorFollow>

      {/* Footer */}
      <footer id="site-footer">
        <div className="footer-content">
          <div>
            <p className="footer-title">Aves de Cali</p>
            <p>Nuestra casa compartida.</p>
          </div>
          <div>
            <p>Arquitectura de Sistemas Multimedia</p>
            <p>Universidad Autónoma de Occidente</p>
          </div>
          <div>
            <a href="#">GitHub</a>
            <p>Código y recursos abiertos</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aves de Cali</span>
          <span>MIT CC BY</span>
        </div>
      </footer>
    </>
  );
}

export default App;