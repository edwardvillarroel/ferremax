import './Carrito.css'
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';

function CarritoPage() {
    const [carrito, setCarrito] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState(null);

    const obtenerClienteId = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://bd-ferremas-clientes.crwi4crvnqsy.us-east-1.rds.amazonaws.com:8081/api/clientes/perfil', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setClienteId(response.data.idCliente);
          obtenerCarrito(response.data.idCliente);
      } catch (error) {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo obtener la información del cliente'
          });
      }
  };
    useEffect(() => {
        obtenerCarrito();
    }, []);

    const obtenerCarrito = async () => {
        try {
            const response = await axios.get(`http://bd-ferremas-clientes.crwi4crvnqsy.us-east-1.rds.amazonaws.com:3307/api/carritos/cliente/`);
            setCarrito(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                crearNuevoCarrito();
            }
        } finally {
            setLoading(false);
        }
    };

    const crearNuevoCarrito = async () => {
        try {
            const response = await axios.post(`/api/carritos/cliente/${clienteId}`);
            setCarrito(response.data);
        } catch (error) {
            console.error('Error al crear carrito:', error);
        }
    };

    const actualizarCantidad = async (itemId, cantidad) => {
        try {
            const response = await axios.put(`/api/carritos/${carrito.idCarrito}/items/${itemId}`, null, {
                params: { cantidad }
            });
            setCarrito(response.data);
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
        }
    };

    const eliminarItem = async (itemId) => {
        try {
            const response = await axios.delete(`/api/carritos/${carrito.idCarrito}/items/${itemId}`);
            setCarrito(response.data);
        } catch (error) {
            console.error('Error al eliminar item:', error);
        }
    };

    if (loading) {
      return <div className="loading">Cargando...</div>;
  }

    return (
        <div className="div-carrito">
            <h1>Carro de compra</h1>

            <div className="cart-header">
                <div>Artículo</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Subtotal</div>
                <div></div>
            </div>

            {carrito && carrito.items.map((item) => (
                <div key={item.idItemCarrito} className="cart-item">
                    <div className="cart-item-info">
                        <img 
                            src={item.producto.imagenUrl || "/imagenes/ejemplo.png"} 
                            alt={item.producto.nombreProducto} 
                            className="cart-item-img" 
                        />
                        <span className="cart-item-desc">{item.producto.nombreProducto}</span>
                    </div>

                    <div className="cart-item-price">
                        ${item.precioUnitario.toLocaleString()}
                    </div>

                    <div className="cart-item-qty">
                        <Button 
                            variant="light" 
                            size="sm" 
                            className="cart-qty-btn"
                            onClick={() => actualizarCantidad(item.idItemCarrito, item.cantidad - 1)}
                            disabled={item.cantidad <= 1}
                        >
                            -
                        </Button>
                        <span className="mx-2">{item.cantidad}</span>
                        <Button 
                            variant="light" 
                            size="sm" 
                            className="cart-qty-btn"
                            onClick={() => actualizarCantidad(item.idItemCarrito, item.cantidad + 1)}
                        >
                            +
                        </Button>
                    </div>

                    <div className="cart-item-subtotal">
                        ${item.subtotal.toLocaleString()}
                    </div>

                    <div className="cart-item-delete">
                        <RiDeleteBin6Line 
                            className="basurero" 
                            onClick={() => eliminarItem(item.idItemCarrito)}
                        />
                    </div>
                </div>
            ))}

            {carrito && carrito.items.length > 0 && (
                <div className="cart-footer">
                    <div className="cart-total">
                        Total: ${carrito.total.toLocaleString()}
                    </div>
                </div>
            )}

            {(!carrito || carrito.items.length === 0) && (
                <div className="cart-empty">
                    <p>Tu carrito está vacío</p>
                </div>
            )}
        </div>
    );
}

export default CarritoPage;