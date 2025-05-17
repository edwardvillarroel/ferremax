package backend.modelsdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Integer idProducto;
    private String nombreProducto;
    private String descripcion;
    private Integer precio;
    private String marca;
    private Integer cantidadDisponible;
    private Integer categoriaId;
    private String categoriaDescripcion;
}