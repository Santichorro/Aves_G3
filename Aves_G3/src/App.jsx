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
          <div className="container">
            <div className="card">
              <div className="card-inner" style={{ '--clr': '#79102d' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src="https://picsum.photos/seed/barranquero/400/300" alt="Barranquero" />
                  </div>
                  
                </div>
              </div>
              <ul>
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Barranquero</h3>
                <p className="nombre-cientifico">Momotus subrufescens</p>
                <p>Ave símbolo de la ciudad de Cali. Habita zonas de bosque y jardines urbanos con vegetación densa.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-inner" style={{ '--clr': '#fd0c21' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src="https://picsum.photos/seed/garza/400/300" alt="Garza Real" />
                  </div>
                  
                </div>
              </div>
              <ul>
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Garza Real</h3>
                <p className="nombre-cientifico">Ardea alba</p>
                <p>Frecuente en humedales y orillas del río Cauca. Fácil de observar por su tamaño y plumaje blanco.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-inner" style={{ '--clr': '#bb0e27' }}>
                <div className="box">
                  <div className="imgBox">
                    <img src="https://picsum.photos/seed/azulejo/400/300" alt="Azulejo Común" />
                  </div>
                  
                </div>
              </div>
              <ul>
                <li className="residente">Residente</li>
              </ul>
              <div className="content">
                <h3>Azulejo Común</h3>
                <p className="nombre-cientifico">Thraupis episcopus</p>
                <p>Una de las aves más comunes en parques y separadores arborizados de la ciudad.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="site-footer">
        <div className="footer-content">
          <p></p>
          <p></p>
          <p></p>
          <p className="footer-title">Aves de Cali</p>
          <p>Arquitectura de Sistemas Multimedia</p>
          <p></p>
        </div>
      </footer>
    </>
  )
}

export default App