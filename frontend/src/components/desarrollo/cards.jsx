import { Button, Card } from 'react-bootstrap';
import './desarrollo.css';

export function MediaCard() {
  return (
    <div className="media-card-wrapper">
      <Card className="cardPromocion">
        <div className="discount-badge">- X %</div>
        <Card.Img variant="top" src="/imagenes/ejemplo.png" />
        <div className="card-divider"/>
        <Card.Body className="card-body-custom">
          <Card.Title className="card-title">Producto</Card.Title>
          <Card.Subtitle>Modelo 15ps 15</Card.Subtitle>
          <Card.Text>
            <span className="current-price">$89.000</span>
            <span className="old-price">$110.000</span>
          </Card.Text>

        <div className="button-wrapper">
          <Button className="button-card">Añadir al carrito</Button>
        </div>
        </Card.Body>
      </Card>
    </div>
  );
}



export function MediaCardLanzamientos() {
  return (
    <div className="media-card-wrapper">
      <Card className="cardPromocion">
        <Card.Img variant="top" src="/imagenes/ejemplo.png" />
        <div className="card-divider"/>
        <Card.Body className="card-body-custom">
          <Card.Title className="card-title">Producto</Card.Title>
          <Card.Subtitle>Modelo 15ps 15</Card.Subtitle>
          <Card.Text>
            <span className="current-price">$89.000</span>
          </Card.Text>

        <div className="button-wrapper">
          <Button className="button-card">Añadir al carrito</Button>
        </div>
        </Card.Body>
      </Card>
    </div>
  );
}

