import { Routes, Route, Navigate } from 'react-router-dom';
import HeaderFerremax from './components/header/header';
import ImgBanner from './components/carousel/imagenesCarousel';
import FooterFerremax from './components/footer/footer';
import NavbarF from './components/navbar/NavbarF';
import { MediaCard, MediaCardLanzamientos } from './components/desarrollo/cards';
import InicioPage from './pages/InicioSesion/InicioPage';
import RegistroUser from './pages/Registro/Registro';
import CarritoPage from './pages/Carrito/Carrito';
import AdminPAge from './pages/Admin/Admin';
import { useEffect } from 'react';

function Inicio() {
  return (
    <>
      <ImgBanner />
      <h1 style={{ textAlign: 'center', margin: '2rem 0', color: 'black' }}>
        Productos en Promoción
      </h1>
      <div className="cards-wrapper">
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </div>
      <h1 style={{ textAlign: 'center', margin: '2rem 0', color: 'black' }}>
        Lanzamientos Recientes
      </h1>
      <div className="cards-wrapper">
        <MediaCardLanzamientos />
        <MediaCardLanzamientos />
        <MediaCardLanzamientos />
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('usuario'));
    if (!admin) {
      localStorage.setItem('usuario', JSON.stringify({
        nombre: 'Administrador',
        email: 'admin@admin.com',
        password: 'admin123'
      }));
      console.log('👤 Usuario admin creado en localStorage');
    }
  }, []);

  return (
    <div className="page-container">
      <header>
        <HeaderFerremax />
        <NavbarF />
      </header>

      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Inicio />} />
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/registro" element={<RegistroUser />} />
          <Route
          path="/admin"
          element={localStorage.getItem('token') && localStorage.getItem('rol') === 'admin' ? (<AdminPAge />):(<Navigate to="/admin"/>)}/>
          <Route path="/TuCarrito" element={<CarritoPage />} />
        </Routes>
      </main>

      <FooterFerremax />
    </div>
  );
}

export default App;
