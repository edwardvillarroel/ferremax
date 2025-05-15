import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import { useState } from 'react';
import './navbar.css';


function NavbarFerremax(){

  const [showDropdown, setShowDropdown] = useState(null);
  const handleMouseEnter = (id) => setShowDropdown(id);
  const handleMouseExit = () => setShowDropdown(null);

  return (
    <Navbar className="custom-navbar">
      <Container className="navbar-container">
        <Nav className="navbar-categorias">
          {[1, 2, 3, 4, 5].map((id) => {
            const titles = [
              "Herramientas de Construcción",
              "Equipos de industria y taller",
              "Aseo y jardín",
              "Insumos y accesorios",
              "Pintura",
            ];
            const items = [
              ["Herramientas de Carpintería", "Herramientas Eléctricas", "Herramientas Inalámbricas"],
              ["Tornos", "Compresores", "Gatos hidráulicos"],
              ["Mangueras", "Cortacésped", "Desmalezadoras"],
              ["Clavos", "Tornillos", "Adhesivos"],
              ["Pintura Interior", "Pintura Exterior"]
            ];
            return (
              <div
                key={id}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseExit}
              >
                <NavDropdown
                  title={titles[id - 1]}
                  id={`dropdown${id}`}
                  show={showDropdown === id}
                  onClick={(e) => e.preventDefault()}
                >
                  {items[id - 1].map((text, idx) => (
                    <NavDropdown.Item href="#" key={idx}>{text}</NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">{titles[id - 1]}</NavDropdown.Item>
                </NavDropdown>
              </div>
            );
          })}
          <Nav.Link href="#">Outlet</Nav.Link>
          <Nav.Link href="#">Taladros</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
         

export default NavbarFerremax;