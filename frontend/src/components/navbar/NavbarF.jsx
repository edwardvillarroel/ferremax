import { Container, Nav, Navbar, NavDropdown, Image, Button, Overlay, Popover } from 'react-bootstrap';
import './Nav.css';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useState, useRef } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";

function NavbarF() {
  const [showPopover, setShowPopover] = useState(false);
  const popoverTarget = useRef(null);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-dark custom-navbar" variant="dark">
        <Container fluid className="d-flex justify-content-between align-items-center">
        
          <div className="d-lg-none">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggle" />
          </div>
          <Navbar.Brand className="nav-logo" as={Link} to="/Home">
            <Image 
              src="/imagenes/logo-ferrema.png"
              alt="Logo"
              width={200}
              className="header-logo"   
            />
          </Navbar.Brand>

          <div className="d-flex align-items-center order-lg-2">
            <div className="d-none d-lg-block">
              <Nav className="align-items-center">
                <Nav.Link as={Link} to="/inicio" className="d-inline-flex align-items-center">
                  <AiOutlineUser className="user-icon me-1" />
                  Inicia sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/registro">Regístrate</Nav.Link>
              </Nav>
            </div>

            <div className="cart-icon-container ms-3">
              <Button
                variant="link"
                ref={popoverTarget}
                onClick={() => setShowPopover(!showPopover)}
                className="p-0 border-0 bg-transparent"
              >
                <AiOutlineShoppingCart className="cart-icon" />
              </Button>

              <Overlay className="overlay-custom" target={popoverTarget.current} show={showPopover} placement="bottom">
                {(props) => (
                  <Popover {...props}>
                    <Popover.Header as="h3">Carrito de compras</Popover.Header>
                    <Popover.Body>
                      <div className="div-carrito">
                      
                        <div className="cart-header">
                          <div>Artículo</div>
                          <div>Precio</div>
                          <div>Cantidad</div>
                          <div>Subtotal</div>
                          <div></div>
                        </div>
                      
                        <div className="cart-item">
                          <div className="cart-item-info">
                            <img src="/imagenes/ejemplo.png" alt="Producto" className="cart-item-img" />
                          </div>
                      
                          <div className="cart-item-price">$10.000</div>
                      
                          <div className="cart-item-qty">
                            <Button variant="light" size="sm" className="cart-qty-btn">-</Button>
                            <span className="mx-2">2</span>
                            <Button variant="light" size="sm" className="cart-qty-btn">+</Button>
                          </div>
                      
                          <div className="cart-item-subtotal">$20.000</div>
                      
                          <div className="cart-item-delete">
                            <RiDeleteBin6Line className="basurero" />
                          </div>
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                )}
              </Overlay>
            </div>
          </div>

          <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mx-auto text-center d-flex flex-wrap justify-content-center align-items-center nav-links-container">
    <NavDropdown title="Herramientas" id="collapsible-nav-dropdown">
      <NavDropdown.Item href="#">Herramientas Manuales</NavDropdown.Item>
      <NavDropdown.Item href="#">Materiales Básicos</NavDropdown.Item>
      <NavDropdown.Item href="#">Equipos de Seguridad</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link as={Link} to="/tornillos">Tornillos</Nav.Link>
    <Nav.Link as={Link} to="/fijaciones">Fijaciones</Nav.Link>
    <Nav.Link as={Link} to="/equipos-de-medicion">Equipos de Medición</Nav.Link>

    {localStorage.getItem('rol') === 'admin' && (
      <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
    )}

    <div className="auth-links-inline d-lg-none d-flex align-items-center ms-3">
      <Nav.Link as={Link} to="/inicio" className="d-inline-flex align-items-center">
        <AiOutlineUser className="user-icon me-1" />
        Inicia sesión
      </Nav.Link>
      <Nav.Link as={Link} to="/registro">Regístrate</Nav.Link>
    </div>
  </Nav>
</Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}

export default NavbarF;
