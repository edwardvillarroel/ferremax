package backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.models.Cliente;


@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {
    
    Cliente findByCorreo(String correo);
}