import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { productoService } from '../../api';
import Swal from 'sweetalert2';

function ProductoPage() {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombreProducto: '',
        descripcion: '',
        precio: '',
        marca: '',
        cantidadDisponible: '',
        categoriaId: ''
    });

    useEffect(() => {
        loadProductos();
    }, []);

    const loadProductos = async () => {
        try {
            const response = await productoService.getAllProducts();
            setProductos(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los productos'
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await productoService.updateProduct(selectedProduct.idProducto, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto actualizado correctamente'
                });
            } else {
                await productoService.createProduct(formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto creado correctamente'
                });
            }
            setShowModal(false);
            loadProductos();
            resetForm();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar el producto'
            });
        }
    };

    const handleEdit = (producto) => {
        setSelectedProduct(producto);
        setFormData({
            nombreProducto: producto.nombreProducto,
            descripcion: producto.descripcion,
            precio: producto.precio,
            marca: producto.marca,
            cantidadDisponible: producto.cantidadDisponible,
            categoriaId: producto.categoriaId
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await productoService.deleteProduct(id);
                    loadProductos();
                    Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar el producto'
            });
        }
    };

    const resetForm = () => {
        setFormData({
            nombreProducto: '',
            descripcion: '',
            precio: '',
            marca: '',
            cantidadDisponible: '',
            categoriaId: ''
        });
        setSelectedProduct(null);
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Productos</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Nuevo Producto
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Marca</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.idProducto}>
                            <td>{producto.idProducto}</td>
                            <td>{producto.nombreProducto}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.cantidadDisponible}</td>
                            <td>{producto.categoriaDescripcion}</td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(producto)}>
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(producto.idProducto)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                resetForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombreProducto"
                                value={formData.nombreProducto}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="marca"
                                value={formData.marca}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="cantidadDisponible"
                                value={formData.cantidadDisponible}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoría ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="categoriaId"
                                value={formData.categoriaId}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => {
                                setShowModal(false);
                                resetForm();
                            }}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedProduct ? 'Actualizar' : 'Crear'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ProductoPage;