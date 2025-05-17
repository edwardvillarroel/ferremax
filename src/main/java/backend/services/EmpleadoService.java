package backend.services;

import backend.modelsdto.EmpleadoDTO;
import backend.models.Empleado;
import backend.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmpleadoService {
    
    @Autowired
    private EmpleadoRepository empleadoRepository;
    
    public List<EmpleadoDTO> getAllEmpleados() {
        return empleadoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<EmpleadoDTO> getEmpleadoById(Integer id) {
        return empleadoRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public EmpleadoDTO saveEmpleado(EmpleadoDTO empleadoDTO) {
        Empleado empleado = convertToEntity(empleadoDTO);
        empleado = empleadoRepository.save(empleado);
        return convertToDTO(empleado);
    }
    
    public void deleteEmpleado(Integer id) {
        empleadoRepository.deleteById(id);
    }
    
    private EmpleadoDTO convertToDTO(Empleado empleado) {
        EmpleadoDTO empleadoDTO = new EmpleadoDTO();
        empleadoDTO.setIdEmpleado(empleado.getIdEmpleado());
        empleadoDTO.setNombreEmpleado(empleado.getNombreEmpleado());
        empleadoDTO.setRolEmpleado(empleado.getRolEmpleado());
        return empleadoDTO;
    }
    
    private Empleado convertToEntity(EmpleadoDTO empleadoDTO) {
        Empleado empleado = new Empleado();
        empleado.setIdEmpleado(empleadoDTO.getIdEmpleado());
        empleado.setNombreEmpleado(empleadoDTO.getNombreEmpleado());
        empleado.setRolEmpleado(empleadoDTO.getRolEmpleado());
        return empleado;
    }
}