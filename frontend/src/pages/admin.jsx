import React, { useState } from 'react';
import NavbarFerremax from '../components/navbar/navbar';
import HeaderFerremax from '../components/header/header';
import ImgBanner from '../components/carousel/imagenesCarousel';
import FooterFerremax from '../components/footer/footer';
import MediaCard from '../components/desarrollo/cards';
import Sidebar from '../components/sidebar/sidebar';
import './admin.css';

function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      <div className="admin-content" style={{ marginLeft: isSidebarOpen ? '200px' : '0' }}>
        <header>
          <HeaderFerremax />
          <NavbarFerremax 
            isAdmin={true} 
            isSidebarOpen={isSidebarOpen} 
            toggleSidebar={handleToggleSidebar} 
          />
          <ImgBanner />
        </header>
        <main>
          <div className="div-card">
            <p>hola</p>
            <MediaCard />
          </div>
        </main>
        <footer>
          <FooterFerremax />
        </footer>
      </div>
    </div>
  );
}

export default AdminPage;
