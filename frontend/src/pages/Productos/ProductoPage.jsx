import React, { useState } from 'react';
import './Producto.css';

const productosData = [
    {
        id: 1,
        nombre: 'Martillo Carpintero Mango De Fibra 20 Oz Profesional Mkwa',
        descripcion: 'Martillo de acero forjado. Material de la cabeza: acero forjado. Material de la manija: fibra de vidrio. Estilo de uña: carpintero.',
        precio: 5190,
        imagen: '/imagenes/martilloacero.png',
        peso: '567 g',
        stock: 4,
        caracteristicas: [
            'Material de la cabeza: acero forjado.',
            'Material de la manija: fibra de vidrio.',
            'Estilo de uña: carpintero.'
        ]
    },
    {
        id: 2,
        nombre: 'Set 6 Juego Destornilladores De Golpe Kit Cruz Paleta',
        descripcion: 'Kit de destornilladores surtidos con punta magnética. Incluye 6 unidades por pack, formato de venta: pack.',
        precio: 4345,
        imagen: '/imagenes/destornillador.png',
        peso: '600 g',
        stock: 25,
        caracteristicas: [
            'Unidades por pack: 6.',
            'Formato de venta: Pack.',
            'Tamaño de la punta: Kit de Destornilladores Surtido.',
            'Con punta magnética.'
        ]
    },
    {
        id: 3,
        nombre: 'Kit de Taladro Atornillador DeWalt de 1/2" (13mm) Inalámbrico 20V MAX*',
        descripcion: 'Taladro inalámbrico con función reversa, incluye bolso de transporte y batería de Li-ion.',
        precio: 139990,
        imagen: '/imagenes/taladro.png',
        stock: 50,
        caracteristicas: [
            'Con función reversa.',
            'Viene con bolso de transporte.',
            'Cuenta con función destornillador.',
            'Velocidad máxima de rotación: 1750rpm.',
            'Con batería incluida de Li-ion.',
            'Posee control de torque.'
        ]
    },
    {
        id: 4,
        nombre: 'Tornillo Madera Crs Zincado 6 X 2 Pulgadas',
        descripcion: 'El Tornillo Volcanita CRS Zincado es una opción que destaca en el mundo de la ferretería por su zincado brillante. Este proceso moderno de recubrimiento con una capa de otro metal a la pieza de acero lo protege de la oxidación, corrosión y desgaste general.',
        precio: 4865,
        imagen: '/imagenes/tornillo.png',
        stock: 200,
        caracteristicas: [
            'Unidades por pack: 500.',
            'Formato de venta: Pack.',
            'Tamaño: 6.',
            'Diámetro: 6 mm.',
            'Largo: 5.04 cm.',
            'Especifico para drywall.',
            'Punta con forma punta fina.'
        ]
    },
    {
        id: 5,
        nombre: 'Clavos 32mm 3.000 Unidades Einhell',
        descripcion: 'Clavos de acero de 32mm, ideales para madera. Pack de 3.000 unidades.',
        precio: 9990,
        imagen: '/imagenes/clavos.png',
        stock: 20,
        caracteristicas: [
            'Largo: 3.2 cm.',
            'Unidades por envase: 3000.',
            'Superficies recomendadas: madera.',
            'Fabricados en acero.'
        ]
    },
    {
        id: 6,
        nombre: 'Casco Con Protección Visual Y Auditiva Para Motosierra ',
        descripcion: 'Casco de seguridad con protección visual y auditiva, ideal para trabajos con motosierra. Incluye visor y orejeras. Fabricado en ABS, color amarillo.',
        precio: 23117,
        imagen: '/imagenes/casco.png',
        stock: 15,
        caracteristicas: [
            'Marca: Maurer',
            'Modelo: Motosierrista',
            'Color: Amarillo',
            'Con arnés: Sí',
            'Con visor: Sí',
            'Material: ABS',
            'Normas de seguridad: NCh, ISP',
            'Peso: 275 g'
        ]
    },
    {
        id: 7,
        nombre: 'Stanley huincha medir 8m',
        descripcion: 'Huincha metálica Stanley PowerLock de 8 metros, ideal para mediciones precisas en todo tipo de trabajos.',
        precio: 18990,
        imagen: '/imagenes/huincha.png',
        stock: 30,
        caracteristicas: [
            'Marca: Stanley',
            'Modelo: Metal',
            'Formato de venta: Unidad',
            'Largo de la cinta: 8 m',
            'Ancho de la cinta: 0 mm'
        ]
    },
    {
        id: 8,
        nombre: 'Pernos De Anclaje Expansión Zincado 1/2 X 3 3/4',
        descripcion: 'Pernos de anclaje expansión zincado.',
        precio: 10990,
        imagen: '/imagenes/perno.png',
        stock: 15,
        caracteristicas: [
            'Marca: Dimafi',
            'Tipo de tornillo: Perno expansión',
            'Formato de venta: Pack',
            'Unidades por pack: 20',
            'Uso específico: Ideal para la fijación de piezas en concreto duro y hormigón',
            'Superficies recomendadas: Concreto y hormigón (superficies de concreto de alta densidad).',
            'Forma de la punta del tornillo: Cónica'
        ]
    },
    {
        id: 9,
        nombre: 'Nivel De Torpedo Dewalt Dwht43003',
        descripcion: 'Nivel De Torpedo DeWalt DWHT43003, compacto, robusto y magnético para fijación fácil. Precisión en nivelación y visibilidad mejorada con burbujas grandes.',
        precio: 23131,
        imagen: '/imagenes/nivel.png',
        stock: 18,
        caracteristicas: [
            'Marca: DeWalt',
            'Modelo: DWHT43003',
            'Cantidad de viales: 3',
            'Es magnético: Sí',
            'Material: Aluminio'
        ]
    },
];

function Productos() {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    return (
        <div className="app-wrapper">
            <main>
                {!productoSeleccionado ? (
                    <div className="productos-grid">
                        {productosData.map((producto) => (
                            <div
                                key={producto.id}
                                className="producto-card"
                                onClick={() => setProductoSeleccionado(producto)}
                            >
                                <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
                                <div className="producto-info">
                                    <h3 className="producto-nombre">{producto.nombre}</h3>
                                    <p className="producto-precio">${producto.precio.toLocaleString('es-CL')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="detalle-producto-ml">
                        <div className="detalle-imagenes">
                            <img
                                src={productoSeleccionado.imagen}
                                alt={productoSeleccionado.nombre}
                                width={300}
                                style={{ borderRadius: 8, border: '1px solid #eee', background: '#fff' }}
                            />

                            {/* Métodos de pago */}
                            <div className="metodos-pago">
                                <h4 className="metodos-titulo">Medios de pago</h4>
                                <div className="metodo-bloque">
                                    <b>Webpay</b>
                                    <div>
                                        <img src="/imagenes/webpay.png" alt="Webpay" className="logo-webpay" />
                                    </div>
                                </div>
                                <div className="metodo-bloque">
                                    <b>Tarjetas de crédito</b>
                                    <div className="metodo-descripcion">¡Paga en hasta 6 cuotas!</div>
                                    <div className="tarjetas-credito">
                                        <img src="/imagenes/visa.png" alt="Visa" className="logo-tarjeta" />
                                        <img src="/imagenes/mastercard.png" alt="Mastercard" className="logo-tarjeta" />
                                    </div>
                                </div>
                                <div className="metodo-bloque">
                                    <b>Tarjetas de débito</b>
                                    <div className="tarjetas-debito">
                                        <img src="/imagenes/redcompra.png" alt="Redcompra" className="logo-tarjeta" />
                                        <img src="/imagenes/visa.png" alt="Visa Débito" className="logo-tarjeta" />
                                        <img src="/imagenes/mastercard.png" alt="Mastercard Débito" className="logo-tarjeta" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="detalle-info">
                            <button className="volver-btn" onClick={() => setProductoSeleccionado(null)}>Volver</button>
                            <h2 style={{ margin: '10px 0' }}>{productoSeleccionado.nombre}</h2>
                            <p style={{ fontSize: 28, color: '#00a650', margin: '10px 0' }}>${productoSeleccionado.precio.toLocaleString('es-CL')}</p>
                            {productoSeleccionado.peso && (
                                <p><b>Peso del martillo:</b> {productoSeleccionado.peso}</p>
                            )}

                            <div style={{ margin: '16px 0' }}>
                                <div style={{ fontWeight: 500, marginBottom: 4 }}>Stock disponible</div>
                                <label>
                                    Cantidad:&nbsp;
                                    <select
                                        value={cantidad}
                                        onChange={e => setCantidad(Number(e.target.value))}
                                        style={{ fontWeight: 600, fontSize: 16, padding: '2px 8px', borderRadius: 4 }}
                                    >
                                        {Array.from({ length: productoSeleccionado.stock }, (_, i) => i + 1).map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                    <span style={{ color: '#888', marginLeft: 8 }}>
                                        ({productoSeleccionado.stock} disponibles)
                                    </span>
                                </label>
                            </div>
                            <ul>
                                {productoSeleccionado.caracteristicas && productoSeleccionado.caracteristicas.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                            <p style={{ marginTop: 16 }}>{productoSeleccionado.descripcion}</p>
                            <button className="comprar-btn">Comprar ahora</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
export default Productos;