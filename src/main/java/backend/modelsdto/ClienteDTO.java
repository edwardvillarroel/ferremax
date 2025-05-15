package backend.modelsdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO {
    
    private String id;
    private String nombre;
    private String correo;
    private int cantidadCarritos;
}