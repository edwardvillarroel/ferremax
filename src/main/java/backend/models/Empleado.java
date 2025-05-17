package backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "empleado")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {
    
    @Id
    @Column(name = "id_empleado")
    private Integer idEmpleado;
    
    @Column(name = "nombre_empleado", length = 100)
    private String nombreEmpleado;
    
    @Column(name = "rol_empleado", length = 100)
    private String rolEmpleado;
}