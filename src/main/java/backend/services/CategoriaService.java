package backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.models.Categoria;
import backend.modelsdto.CategoriaDTO;
import backend.repositories.CategoriaRepository;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<CategoriaDTO> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<CategoriaDTO> getCategoriaById(Integer id) {
        return categoriaRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public CategoriaDTO saveCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = convertToEntity(categoriaDTO);
        categoria = categoriaRepository.save(categoria);
        return convertToDTO(categoria);
    }
    
    public void deleteCategoria(Integer id) {
        categoriaRepository.deleteById(id);
    }
    public boolean existsById(Integer id) {
        return categoriaRepository.existsById(id);
    }
    

    protected Optional<Categoria> getEntityById(Integer id) {
        return categoriaRepository.findById(id);
    }
    
    protected CategoriaDTO convertToDTO(Categoria categoria) {
        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setIdCategoria(categoria.getIdCategoria());
        categoriaDTO.setDescripcion(categoria.getDescripcion());
        return categoriaDTO;
    }
    
    protected Categoria convertToEntity(CategoriaDTO categoriaDTO) {
        Categoria categoria = new Categoria();
        categoria.setIdCategoria(categoriaDTO.getIdCategoria());
        categoria.setDescripcion(categoriaDTO.getDescripcion());
        return categoria;
    }
}