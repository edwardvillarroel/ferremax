package backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    
    @Id
    @Column(name = "id_producto")
    private Integer idProducto;
    
    @Column(name = "nombre_producto", length = 100)
    private String nombreProducto;
    
    @Column(name = "descripcion", length = 100)
    private String descripcion;
    
    @Column(name = "precio")
    private Integer precio;
    
    @Column(name = "marca", length = 100)
    private String marca;
    
    @Column(name = "cantidad_disponible")
    private Integer cantidadDisponible;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id_categoria")
    private Categoria categoria;
}