package backend.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.models.Cliente;
import backend.modelsdto.ClienteDTO;
import backend.repositories.ClienteRepository;


@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    public List<ClienteDTO> obtenerTodos() {
        return clienteRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public ClienteDTO obtenerPorId(String id) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(id);
        return clienteOpt.map(this::convertirADTO).orElse(null);
    }
    

    public ClienteDTO crear(ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente();
        
        if (clienteDTO.getId() == null || clienteDTO.getId().isEmpty()) {
            clienteDTO.setId(UUID.randomUUID().toString());
        }
        
        cliente.setId(clienteDTO.getId());
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setCorreo(clienteDTO.getCorreo());
        
        cliente = clienteRepository.save(cliente);
        return convertirADTO(cliente);
    }
    

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
    
    public boolean eliminar(String id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private ClienteDTO convertirADTO(Cliente cliente) {
        return new ClienteDTO(
                cliente.getId(),
                cliente.getNombre(),
                cliente.getCorreo()
        );
    }
}
