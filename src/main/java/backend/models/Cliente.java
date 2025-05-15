package backend.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    
    @Id
    @Column(name = "id_cliente")
    private String id;
    
    private String nombre;
    
    private String correo;
    
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Carrito> carritos = new ArrayList<>();
}
