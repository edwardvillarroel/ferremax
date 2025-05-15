import React from 'react';
import NavbarFerremax from './components/navbar/navbar';
import HeaderFerremax from './components/header/header';
import ImgBanner from './components/carousel/imagenesCarousel';
import FooterFerremax from './components/footer/footer';

function App() {
  return (
    <div className="app-wrapper">
      <header>
        <HeaderFerremax/>
        <NavbarFerremax/>
        <ImgBanner/>
      </header>
      <main>
      </main>
      <footer>
        <FooterFerremax/>
      </footer>
    </div>
  );
}

export default App;