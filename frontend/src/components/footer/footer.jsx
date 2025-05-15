import { Container, Row, Col, Stack, Image, Nav } from "react-bootstrap";
import './footer.css'
import { AiOutlineWhatsApp } from "react-icons/ai";

function FooterFerremax(){
  return(
    <footer>
      <Container fluid>
        <Row className="bg-white text-black py-4 aling-items-start">
          <Col className="mx-5 footer-column logo-col">
            <Stack gap={3} className="align-items-start">
              <Image src="/imagenes/LOGO.png" alt="Logo" rounded width={200} height={50} className="footer-logo"/>
              <h6 className="footer-heading">Casa Matriz</h6>
              <p className="footer-text">Av. Monte Pilato 5210, Limache, Región de Valparaiso</p>
              <p className="footer-text"><AiOutlineWhatsApp className="whats-icon"/> +56960608989</p>
              <h6 className="footer-heading">Medios de Pago</h6>
              <div className="payment-logo">
                <Image src="/imagenes/webpay.png" alt="WebPay" rounded width={80} height={40} className="payment-logo"/>
              </div>
              
            </Stack>
           </Col>
           <Col className="footer-column">
              <h5 className="footer-heading">Nosotros</h5>
              <Nav className="footer-nav">
                <Nav.Link href="#">Quiénes somos</Nav.Link>
                <Nav.Link href="#">Tiendas</Nav.Link>
              </Nav>
            </Col>

           <Col className="footer-column">
             <h5 className="footer-heading">Ayuda</h5>
             <Nav className="footer-nav">
               <Nav.Link href="#">¿Cómo comprar?</Nav.Link>
               <Nav.Link href="#">Condiciones de despacho</Nav.Link>
               <Nav.Link href="#">Seguimiento de compra</Nav.Link>
             </Nav>
            </Col>

           <Col className="footer-column">
             <h5 className="footer-heading">Categorías</h5>
             <Nav className="footer-nav">
               <Nav.Link href="#">Herramientas de Construcción</Nav.Link>
               <Nav.Link href="#">Equipos de industria y taller</Nav.Link>
               <Nav.Link href="#">Aseo y jardín</Nav.Link>
               <Nav.Link href="#">Insumos y accesorios</Nav.Link>
               <Nav.Link href="#">Pintura</Nav.Link>
             </Nav>
            </Col>

            <Col className="footer-column">
              <h5 className="footer-heading">Legal</h5>
              <Nav className="footer-nav">
                <Nav.Link href="#">Términos y condiciones</Nav.Link>
                <Nav.Link href="#">Política de garantía y devoluciones</Nav.Link>
                <Nav.Link href="#">Política de cookies</Nav.Link>
                <Nav.Link href="#">Política de privacidad</Nav.Link>
              </Nav>
             </Col>
        </Row>
        <Row>
          <Col className="bg-white text-center py-3">
            <hr className="footer-divider" />
            <p className="footer-copy">©{new Date().getFullYear()} Ferremax Todos los derechos reservados </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterFerremax;
