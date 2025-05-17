package backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.models.Carrito;
import backend.services.CarritoService;

@RestController
@RequestMapping("/api/carritos")
@CrossOrigin(origins = "*")
public class CarritoController {
    
    @Autowired
    private CarritoService carritoService;
    
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<Carrito> obtenerCarritoActivo(@PathVariable String clienteId) {
        Carrito carrito = carritoService.obtenerCarritoActivo(clienteId);
        if (carrito != null) {
            return ResponseEntity.ok(carrito);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cliente/{clienteId}")
    public ResponseEntity<Carrito> crearCarrito(@PathVariable String clienteId) {
        try {
            Carrito nuevoCarrito = carritoService.crearCarrito(clienteId);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCarrito);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{carritoId}/items")
    public ResponseEntity<Carrito> agregarItem(
            @PathVariable Long carritoId,
            @RequestParam Integer productoId,
            @RequestParam Integer cantidad) {
        try {
            Carrito carrito = carritoService.agregarItem(carritoId, productoId, cantidad);
            return ResponseEntity.ok(carrito);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{carritoId}/items/{itemId}")
    public ResponseEntity<Carrito> eliminarItem(
            @PathVariable Long carritoId,
            @PathVariable Long itemId) {
        try {
            Carrito carrito = carritoService.eliminarItem(carritoId, itemId);
            return ResponseEntity.ok(carrito);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{carritoId}/items/{itemId}")
    public ResponseEntity<Carrito> actualizarCantidad(
            @PathVariable Long carritoId,
            @PathVariable Long itemId,
            @RequestParam Integer cantidad) {
        try {
            Carrito carrito = carritoService.actualizarCantidad(carritoId, itemId, cantidad);
            return ResponseEntity.ok(carrito);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/cliente/{clienteId}")
    public ResponseEntity<Void> limpiarCarrito(@PathVariable String clienteId) {
        try {
            carritoService.limpiarCarrito(clienteId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}