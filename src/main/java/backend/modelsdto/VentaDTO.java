package backend.modelsdto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaDTO {
    private Long idVenta;
    private String idCliente;
    private LocalDateTime fechaVenta;
    private Double precioTotal;
    private List<DetalleVentaDTO> detalles;
}
