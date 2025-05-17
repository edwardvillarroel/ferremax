package backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    
    @Id
    @Column(name = "id_admin", length = 20)
    private String idAdmin;
    
    @Column(name = "rut", length = 10)
    private String rut;
    
    @Column(name = "nombre", length = 50)
    private String nombre;
    
    @Column(name = "contrasena", length = 10)
    private String contrasena;
}