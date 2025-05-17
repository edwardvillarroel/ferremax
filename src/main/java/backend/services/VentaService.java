package backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.models.Carrito;
import backend.models.DetalleVenta;
import backend.models.Producto;
import backend.models.Venta;
import backend.modelsdto.DetalleVentaDTO;
import backend.modelsdto.VentaDTO;
import backend.repositories.ClienteRepository;
import backend.repositories.ProductoRepository;
import backend.repositories.VentaRepository;

@Service
public class VentaService {
    
    @Autowired
    private VentaRepository ventaRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private ProductoRepository productoRepository;

    public List<VentaDTO> obtenerTodas() {
        return ventaRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public VentaDTO obtenerPorId(Long id) {
        return ventaRepository.findById(id)
                .map(this::convertirADTO)
                .orElse(null);
    }

    @Transactional
    public VentaDTO crearVentaDesdeCarrito(String clienteId, Carrito carrito) {
        final Venta venta = new Venta();
        venta.setCliente(clienteRepository.findById(clienteId).orElseThrow());
        venta.setFechaVenta(LocalDateTime.now());
        venta.setPrecioTotal(carrito.getTotal());

        List<DetalleVenta> detalles = carrito.getItems().stream()
                .map(item -> {
                    DetalleVenta detalle = new DetalleVenta();
                    detalle.setVenta(venta);
                    detalle.setProducto(item.getProducto());
                    detalle.setCantidad(item.getCantidad());
                    detalle.setPrecioUnitario(item.getPrecioUnitario());
                    detalle.setSubtotal(item.getSubtotal());
                    return detalle;
                })
                .collect(Collectors.toList());

        venta.setDetallesVenta(detalles);
        Venta ventaGuardada = ventaRepository.save(venta);
        
        return convertirADTO(ventaGuardada);
    }

    private VentaDTO convertirADTO(Venta venta) {
        List<DetalleVentaDTO> detallesDTO = new ArrayList<>();
        if (venta.getDetallesVenta() != null) {
            detallesDTO = venta.getDetallesVenta().stream()
                .map(detalle -> new DetalleVentaDTO(
                    detalle.getIdDetalleVenta(),
                    detalle.getProducto().getIdProducto(),
                    detalle.getCantidad(),
                    detalle.getPrecioUnitario(),
                    detalle.getSubtotal()))
                .collect(Collectors.toList());
        }

        return new VentaDTO(
            venta.getIdVenta(),
            venta.getCliente().getId(),
            venta.getFechaVenta(),
            venta.getPrecioTotal(),
            detallesDTO
        );
    }

        public List<VentaDTO> obtenerVentasPorCliente(String clienteId) {
        List<Venta> ventas = ventaRepository.findByClienteId(clienteId);
        return ventas != null ? 
            ventas.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList()) :
            new ArrayList<>();
    }

    public List<VentaDTO> obtenerVentasPorFecha(LocalDateTime inicio, LocalDateTime fin) {
        List<Venta> ventas = ventaRepository.findByFechaVentaBetween(inicio, fin);
        return ventas != null ? 
            ventas.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList()) :
            new ArrayList<>();
    }

    @Transactional
    public void anularVenta(Long ventaId) {
        Venta venta = ventaRepository.findById(ventaId)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        for (DetalleVenta detalle : venta.getDetallesVenta()) {
            Producto producto = detalle.getProducto();
            producto.setCantidadDisponible(producto.getCantidadDisponible() + detalle.getCantidad());
            productoRepository.save(producto);
        }
        
        ventaRepository.delete(venta);
    }
}