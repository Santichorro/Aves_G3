import './App.css'

import barranqueroImg from './assets/IMG/Barranquero.jpg'
import garzaRealImg from './assets/IMG/GarzaReal.jpg'
import azulejoImg from './assets/IMG/AzulejoComun.jpg'
import gallitoRocaImg from './assets/IMG/GallitoDeRoca.jpg'
import toritoImg from './assets/IMG/ToritoCabecirrojo.jpg'

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

      <main id="site-body">
        <section id="especies">
          <h2>Especies de aves</h2>
          <p>Conoce algunas de las especies que puedes avistar en la ciudad.</p>

          <div className="container">
            <div className="card">
              <div className="card-inner" style={{ '--clr': '#79102d' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src={barranqueroImg} alt="Barranquero" />
                  </div>
                </div>
              </div>
              <ul className="tags">
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Barranquero</h3>
                <p className="nombre-cientifico">Momotus subrufescens</p>
                <p>Ave símbolo de la ciudad de Cali, reconocida por su llamativa cola en forma de péndulo. Habita zonas de bosque y jardines urbanos con vegetación densa.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-inner" style={{ '--clr': '#fd0c21' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src={garzaRealImg} alt="Garza Real" />
                  </div>
                </div>
              </div>
              <ul className="tags">
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Garza Real</h3>
                <p className="nombre-cientifico">Ardea alba</p>
                <p>Ave de gran tamaño y plumaje blanco, frecuente en humedales y orillas del río Cauca. Suele observarse inmóvil junto al agua mientras acecha a su presa.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-inner" style={{ '--clr': '#bb0e27' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src={azulejoImg} alt="Azulejo Común" />
                  </div>
                </div>
              </div>
              <ul className="tags">
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Azulejo Común</h3>
                <p className="nombre-cientifico">Thraupis episcopus</p>
                <p>Una de las aves más comunes en parques y separadores arborizados de la ciudad. Se caracteriza por su plumaje azul turquesa y su comportamiento sociable.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-inner" style={{ '--clr': '#d94a1d' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src={gallitoRocaImg} alt="Gallito de Roca Andino" />
                  </div>
                </div>
              </div>
              <ul className="tags">
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Gallito de Roca Andino</h3>
                <p className="nombre-cientifico">Rupicola peruvianus</p>
                <p>Ave emblemática de los Andes, reconocida por su llamativo plumaje naranja y su cresta en forma de disco. Habita bosques de niebla cercanos a la ciudad.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-inner" style={{ '--clr': '#a3122c' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src={toritoImg} alt="Torito Cabecirrojo" />
                  </div>
                </div>
              </div>
              <ul className="tags">
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Torito Cabecirrojo</h3>
                <p className="nombre-cientifico">Eubucco bourcierii</p>
                <p>Ave de tamaño pequeño con marcado dimorfismo sexual: el macho luce cabeza roja intensa. Habita bosques húmedos de montaña en los alrededores de Cali.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

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