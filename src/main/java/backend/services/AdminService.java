package backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.models.Admin;
import backend.modelsdto.AdminDTO;
import backend.repositories.AdminRepository;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    public List<AdminDTO> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<AdminDTO> getAdminById(String id) {
        return adminRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public AdminDTO saveAdmin(AdminDTO adminDTO) {
        Admin admin = convertToEntity(adminDTO);
        admin = adminRepository.save(admin);
        return convertToDTO(admin);
    }
    
    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }
    
    private AdminDTO convertToDTO(Admin admin) {
        AdminDTO adminDTO = new AdminDTO();
        adminDTO.setIdAdmin(admin.getIdAdmin());
        adminDTO.setRut(admin.getRut());
        adminDTO.setNombre(admin.getNombre());
        adminDTO.setContrasena(admin.getContrasena());
        return adminDTO;
    }
    
    private Admin convertToEntity(AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setIdAdmin(adminDTO.getIdAdmin());
        admin.setRut(adminDTO.getRut());
        admin.setNombre(adminDTO.getNombre());
        admin.setContrasena(adminDTO.getContrasena());
        return admin;
    }
}