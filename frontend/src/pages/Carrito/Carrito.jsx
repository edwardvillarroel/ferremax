import './Carrito.css'
import { Button } from 'react-bootstrap';
import { RiDeleteBin6Line } from "react-icons/ri";

function CarritoPage(){
    return(
<div className="div-carrito">
  <h1>Carro de compra</h1>

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
      <span className="cart-item-desc">Descripción del producto</span>
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
    );
}

export default CarritoPage;