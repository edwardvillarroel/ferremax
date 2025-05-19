package backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.models.Carrito;
import backend.models.Cliente;
import backend.models.ItemCarrito;
import backend.models.Producto;
import backend.repositories.CarritoRepository;
import backend.repositories.ClienteRepository;
import backend.repositories.ProductoRepository;

@Service
public class CarritoService {
    
    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Carrito obtenerCarritoActivo(String clienteId) {
        return carritoRepository.findByClienteIdAndActivo(clienteId, true)
            .orElse(null);
    }

        @Transactional
    public Carrito agregarItem(Long carritoId, Integer productoId, Integer cantidad) {
        Carrito carrito = carritoRepository.findById(carritoId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
            
        Producto producto = productoRepository.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            
        ItemCarrito item = new ItemCarrito();
        item.setCarrito(carrito);
        item.setProducto(producto);
        item.setCantidad(cantidad);
        Double precioUnitario = Double.valueOf(producto.getPrecio());
        item.setPrecioUnitario(precioUnitario);
        Double subtotal = precioUnitario * cantidad.doubleValue(); 
        item.setSubtotal(subtotal);
        
        carrito.getItems().add(item);
        carrito.setTotal(carrito.getTotal() + subtotal);
        
        return carritoRepository.save(carrito);
    }
    
    @Transactional
    public Carrito crearCarrito(String clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
            
        Carrito carrito = new Carrito();
        carrito.setCliente(cliente);
        carrito.setActivo(true);
        carrito.setTotal(0.0);
        return carritoRepository.save(carrito);
    }

        @Transactional
    public Carrito actualizarCantidad(Long carritoId, Long itemId, Integer cantidad) {
        Carrito carrito = carritoRepository.findById(carritoId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
            
        ItemCarrito item = carrito.getItems().stream()
            .filter(i -> i.getIdItemCarrito().equals(itemId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Item no encontrado"));
            
        carrito.setTotal(carrito.getTotal() - item.getSubtotal());
        item.setCantidad(cantidad);
        Double nuevoSubtotal = item.getPrecioUnitario() * cantidad.doubleValue();
        item.setSubtotal(nuevoSubtotal);
        carrito.setTotal(carrito.getTotal() + nuevoSubtotal);
        
        return carritoRepository.save(carrito);
    }
    
    @Transactional
    public Carrito eliminarItem(Long carritoId, Long itemId) {
        Carrito carrito = carritoRepository.findById(carritoId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
            
        ItemCarrito item = carrito.getItems().stream()
            .filter(i -> i.getIdItemCarrito().equals(itemId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Item no encontrado"));
            
        carrito.setTotal(carrito.getTotal() - item.getSubtotal());
        carrito.getItems().remove(item);
        
        return carritoRepository.save(carrito);
    }

    @Transactional
    public void limpiarCarrito(String clienteId) {
        Carrito carrito = obtenerCarritoActivo(clienteId);
        if (carrito != null) {
            carrito.setActivo(false);
            carritoRepository.save(carrito);
        }
    }
}