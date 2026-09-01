import "./App.css";

import barranqueroImg from "./assets/IMG/BarranqueroChinese.jpg";
import garzaRealImg from "./assets/IMG/GarzaRealChinese.jpg";
import azulejoImg from "./assets/IMG/AzulejoComunChinese.jpg";
import gallitoRocaImg from "./assets/IMG/GallitoDeRocaChinese.jpg";
import toritoImg from "./assets/IMG/ToritoCabecirrojoChinese.jpg";

import CursorFollow from "./Components/MouseFollow";
import SpeciesExpand from "./Components/SpeciesExpand";
import ProgressiveBlur from "./Components/ProgressiveBlur";
import Dock from "./Components/Dock";

import { Home, Bird, Map, Info } from "lucide-react";

const especies = [
  {
    img: barranqueroImg,
    alt: "Barranquero",
    nombre: "Barranquero",
    nombreCientifico: "Momotus subrufescens",
    estado: "Residente",
    descripcion:
      "Ave símbolo de la ciudad de Cali, reconocida por su llamativa cola en forma de péndulo. Habita zonas de bosque y jardines urbanos con vegetación densa.",
  },
  {
    img: garzaRealImg,
    alt: "Garza Real",
    nombre: "Garza Real",
    nombreCientifico: "Ardea alba",
    estado: "Residente",
    descripcion:
      "Ave de gran tamaño y plumaje blanco, frecuente en humedales y orillas del río Cauca. Suele observarse inmóvil junto al agua mientras acecha a su presa.",
  },
  {
    img: azulejoImg,
    alt: "Azulejo Común",
    nombre: "Azulejo Común",
    nombreCientifico: "Thraupis episcopus",
    estado: "Residente",
    descripcion:
      "Una de las aves más comunes en parques y separadores arborizados de la ciudad. Se caracteriza por su plumaje azul turquesa y su comportamiento sociable.",
  },
  {
    img: gallitoRocaImg,
    alt: "Gallito de Roca Andino",
    nombre: "Gallito de Roca Andino",
    nombreCientifico: "Rupicola peruvianus",
    estado: "Residente",
    descripcion:
      "Ave emblemática de los Andes, reconocida por su llamativo plumaje naranja y su cresta en forma de disco. Habita bosques de niebla cercanos a la ciudad.",
  },
  {
    img: toritoImg,
    alt: "Torito Cabecirrojo",
    nombre: "Torito Cabecirrojo",
    nombreCientifico: "Eubucco bourcierii",
    estado: "Residente",
    descripcion:
      "Ave de tamaño pequeño con marcado dimorfismo sexual: el macho luce cabeza roja intensa. Habita bosques húmedos de montaña en los alrededores de Cali.",
  },
];

function App() {
  const dockItems = [
    { label: "Inicio", href: "#inicio", icon: <Home size={22} strokeWidth={1.8} /> },
    { label: "Especies", href: "#especies", icon: <Bird size={22} strokeWidth={1.8} /> },
    { label: "Mapa", href: "#mapa", icon: <Map size={22} strokeWidth={1.8} /> },
    { label: "Acerca", href: "#acerca", icon: <Info size={22} strokeWidth={1.8} /> },
  ];

  return (
    <>
      {/* Blur superior e inferior */}
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
            Guía interactiva de avistamiento para descubrir
            las especies que habitan Santiago de Cali.
          </p>

          <a href="#especies" className="hero-button">
            Explorar aves
          </a>
        </div>
      </header>

      {/* Navegación principal */}
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

          {/* 01 — Inicio */}
          <section id="inicio" className="intro-section">
            <div className="section-heading">
              <span className="section-number">01</span>
              <div>
                <span className="section-label">DESCUBRE CALI</span>
                <h2>Un hábitat vivo.</h2>
                <p>
                  Santiago de Cali y su entorno reúnen
                  diferentes ecosistemas donde habitan
                  numerosas especies de aves residentes
                  y migratorias.
                </p>
              </div>
            </div>

            <div className="habitats">
              <div className="habitat-item">
                <span>01</span>
                <h3>Bosques de niebla</h3>
              </div>
              <div className="habitat-item">
                <span>02</span>
                <h3>Humedales</h3>
              </div>
              <div className="habitat-item">
                <span>03</span>
                <h3>Ríos</h3>
              </div>
              <div className="habitat-item">
                <span>04</span>
                <h3>Parques urbanos</h3>
              </div>
            </div>
          </section>

          {/* 02 — Especies */}
          <section id="especies" className="species-section">
            <div className="section-heading">
              <span className="section-number">02</span>
              <div>
                <span className="section-label">EXPLORACIÓN</span>
                <h2>Conoce sus habitantes.</h2>
                <p>
                  Explora algunas de las especies de aves
                  presentes en Cali y conoce sus principales
                  características.
                </p>
              </div>
            </div>

            <div className="species-counter">
              <span>{especies.length}</span>
              <p>especies disponibles</p>
            </div>

            <SpeciesExpand species={especies} />
          </section>

          {/* 03 — Mapa */}
          <section id="mapa" className="map-section">
            <div className="section-heading">
              <span className="section-number">03</span>
              <div>
                <span className="section-label">CARTOGRAFÍA</span>
                <h2>Encuéntralas en Cali.</h2>
                <p>
                  Descubre las zonas donde existe mayor
                  probabilidad de avistamiento de cada especie.
                </p>
              </div>
            </div>

            {/* Contenedor temporal del mapa */}
            <div className="map-container">
              <div className="map-overlay">
                <span className="map-status">MAPA INTERACTIVO</span>
                <h3>Explora Cali</h3>
                <p>
                  Selecciona una especie para conocer
                  las zonas donde puedes encontrarla.
                </p>
              </div>

              <div className="map-legend">
                <span>Probabilidad</span>
                <div><i></i>Alta</div>
                <div><i></i>Media</div>
                <div><i></i>Baja</div>
              </div>
            </div>
          </section>

          {/* 04 — Acerca */}
          <section id="acerca" className="about-section">
            <div className="section-heading">
              <span className="section-number">04</span>
              <div>
                <span className="section-label">EL PROYECTO</span>
                <h2>Nuestra casa compartida.</h2>
                <p>
                  Esta aplicación web busca acercar a la
                  ciudadanía a las aves que habitan Cali
                  mediante una experiencia multimedia
                  basada en fotografía, audio, video y
                  cartografía.
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
          <span>MIT · CC BY</span>
        </div>
      </footer>
    </>
  );
}

export default App;