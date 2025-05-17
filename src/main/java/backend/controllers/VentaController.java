package backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.modelsdto.VentaDTO;
import backend.services.VentaService;

import java.util.List;

import backend.models.Carrito;
import backend.services.CarritoService;



@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {
    
    @Autowired
    private VentaService ventaService;

    @Autowired
    private CarritoService carritoService;

    @GetMapping
    public ResponseEntity<List<VentaDTO>> obtenerTodasLasVentas() {
        return ResponseEntity.ok(ventaService.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VentaDTO> obtenerVentaPorId(@PathVariable Long id) {
        VentaDTO venta = ventaService.obtenerPorId(id);
        if (venta != null) {
            return ResponseEntity.ok(venta);
        }
        return ResponseEntity.notFound().build();
    }

        @PostMapping("/finalizar-compra/{clienteId}")
    public ResponseEntity<VentaDTO> finalizarCompra(@PathVariable String clienteId) {
        try {
            Carrito carrito = carritoService.obtenerCarritoActivo(clienteId);
            if (carrito == null || carrito.getItems().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            VentaDTO venta = ventaService.crearVentaDesdeCarrito(clienteId, carrito);
            carritoService.limpiarCarrito(clienteId);
            return ResponseEntity.ok(venta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}