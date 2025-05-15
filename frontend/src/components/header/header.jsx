import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

import './header.css';

function HeaderFerremax() {
    return (
      <Navbar expand="lg" className="header-navbar">
        <Container fluid className="header-container">
          <div className="header-logo">
            <Navbar.Brand>
              <Image src="/imagenes/LOGO.png" alt="Logo"/>
            </Navbar.Brand>
          </div>
  
          <div className="header-search">
            <Form className="d-flex w-100">
              <Form.Control type="search" placeholder="¿Qué estás buscando?" className="me-2" aria-label="Search"/>
              <Button className="header-button" variant="outline-success">Buscar</Button>
            </Form>
          </div>
  
          <div className="header-links-right">
            <Nav.Link href="#"><AiOutlineUser className="user-icon"/>Inicia sesión</Nav.Link> o
            <Nav.Link href="#">Regístrate</Nav.Link>
          </div>
        </Container>
        <div className="header-link-carrito">
            <Nav.Link href="#"><AiOutlineShoppingCart/></Nav.Link>
        </div>   
      </Navbar>
    );
  }
  
  export default HeaderFerremax;