import './App.css'

import barranqueroImg from './assets/IMG/BarranqueroChinese.jpg'
import garzaRealImg from './assets/IMG/GarzaRealChinese.jpg'
import azulejoImg from './assets/IMG/AzulejoComunChinese.jpg'
import gallitoRocaImg from './assets/IMG/GallitoDeRocaChinese.jpg'
import toritoImg from './assets/IMG/ToritoCabecirrojoChinese.jpg'
import CursorFollow from './Components/MouseFollow'
import SpeciesExpand from './Components/SpeciesExpand'

const especies = [
  {
    img: barranqueroImg,
    alt: "Barranquero",
    nombre: "Barranquero",
    nombreCientifico: "Momotus subrufescens",
    estado: "Residente",
    descripcion: "Ave símbolo de la ciudad de Cali, reconocida por su llamativa cola en forma de péndulo. Habita zonas de bosque y jardines urbanos con vegetación densa.",
  },
  {
    img: garzaRealImg,
    alt: "Garza Real",
    nombre: "Garza Real",
    nombreCientifico: "Ardea alba",
    estado: "Residente",
    descripcion: "Ave de gran tamaño y plumaje blanco, frecuente en humedales y orillas del río Cauca. Suele observarse inmóvil junto al agua mientras acecha a su presa.",
  },
  {
    img: azulejoImg,
    alt: "Azulejo Común",
    nombre: "Azulejo Común",
    nombreCientifico: "Thraupis episcopus",
    estado: "Residente",
    descripcion: "Una de las aves más comunes en parques y separadores arborizados de la ciudad. Se caracteriza por su plumaje azul turquesa y su comportamiento sociable.",
  },
  {
    img: gallitoRocaImg,
    alt: "Gallito de Roca Andino",
    nombre: "Gallito de Roca Andino",
    nombreCientifico: "Rupicola peruvianus",
    estado: "Residente",
    descripcion: "Ave emblemática de los Andes, reconocida por su llamativo plumaje naranja y su cresta en forma de disco. Habita bosques de niebla cercanos a la ciudad.",
  },
  {
    img: toritoImg,
    alt: "Torito Cabecirrojo",
    nombre: "Torito Cabecirrojo",
    nombreCientifico: "Eubucco bourcierii",
    estado: "Residente",
    descripcion: "Ave de tamaño pequeño con marcado dimorfismo sexual: el macho luce cabeza roja intensa. Habita bosques húmedos de montaña en los alrededores de Cali.",
  },
]

function App() {
  return (
    <>
      <header id="site-header">
        <div className="header-top">
          <h1>Aves de Cali</h1>
          <p>Guía interactiva de avistamiento en Santiago de Cali</p>
        </div>
        <nav id="site-nav">
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#especies">Especies</a></li>
            <li><a href="#mapa">Mapa</a></li>
            <li><a href="#acerca">Acerca de</a></li>
          </ul>
        </nav>
      </header>

      <CursorFollow>
        <main id="site-body">
          <section id="especies">
            <h2>Especies de aves</h2>
            <p>Conoce algunas de las especies que puedes avistar en la ciudad.</p>

            <SpeciesExpand species={especies} />
          </section>
        </main>
      </CursorFollow>

      <footer id="site-footer">
        <div className="footer-content">
          <p className="footer-title">Aves de Cali</p>
          <p>Arquitectura de Sistemas Multimedia</p>
        </div>
      </footer>
    </>
  )
}

export default App