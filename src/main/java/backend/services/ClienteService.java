package backend.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.models.Cliente;
import backend.repositories.ClienteRepository;
import backend.modelsdto.ClienteDTO;

/**
 * Servicio para la gestión de clientes
 */
@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    /**
     * Obtiene todos los clientes
     * @return Lista de DTOs de clientes
     */
    public List<ClienteDTO> obtenerTodos() {
        return clienteRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Obtiene un cliente por su ID
     * @param id ID del cliente
     * @return DTO del cliente o null si no existe
     */
    public ClienteDTO obtenerPorId(String id) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(id);
        return clienteOpt.map(this::convertirADTO).orElse(null);
    }
    
    /**
     * Crea un nuevo cliente
     * @param clienteDTO DTO con los datos del cliente
     * @return DTO del cliente creado
     */
    public ClienteDTO crear(ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente();
        
        // Si no se proporciona un ID, generamos uno
        if (clienteDTO.getId() == null || clienteDTO.getId().isEmpty()) {
            clienteDTO.setId(UUID.randomUUID().toString());
        }
        
        cliente.setId(clienteDTO.getId());
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setCorreo(clienteDTO.getCorreo());
        
        cliente = clienteRepository.save(cliente);
        return convertirADTO(cliente);
    }
    
    /**
     * Actualiza un cliente existente
     * @param id ID del cliente a actualizar
     * @param clienteDTO DTO con los nuevos datos
     * @return DTO del cliente actualizado o null si no existe
     */
    public ClienteDTO actualizar(String id, ClienteDTO clienteDTO) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(id);
        
        if (clienteOpt.isPresent()) {
            Cliente cliente = clienteOpt.get();
            cliente.setNombre(clienteDTO.getNombre());
            cliente.setCorreo(clienteDTO.getCorreo());
            
            cliente = clienteRepository.save(cliente);
            return convertirADTO(cliente);
        }
        
        return null;
    }
    
    /**
     * Elimina un cliente por su ID
     * @param id ID del cliente a eliminar
     * @return true si se eliminó correctamente, false en caso contrario
     */
    public boolean eliminar(String id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Convierte una entidad Cliente a un DTO
     * @param cliente Entidad Cliente
     * @return DTO con los datos del cliente
     */
    private ClienteDTO convertirADTO(Cliente cliente) {
        return new ClienteDTO(
                cliente.getId(),
                cliente.getNombre(),
                cliente.getCorreo(),
                cliente.getCarritos() != null ? cliente.getCarritos().size() : 0
        );
    }
}
