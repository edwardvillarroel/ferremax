package backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {
    
    @Id
    @Column(name = "id_categoria")
    private Integer idCategoria;
    
    @Column(name = "descripcion", length = 100)
    private String descripcion;
}