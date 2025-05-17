package backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.models.Categoria;
import backend.models.Producto;
import backend.modelsdto.ProductoDTO;
import backend.repositories.ProductoRepository;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private CategoriaService categoriaService;
    
    public List<ProductoDTO> getAllProductos() {
        return productoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ProductoDTO> getProductoById(Integer id) {
        return productoRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public List<ProductoDTO> getProductosByCategoria(Integer categoriaId) {
        return productoRepository.findByCategoriaIdCategoria(categoriaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProductoDTO saveProducto(ProductoDTO productoDTO) {
        Producto producto = convertToEntity(productoDTO);
        if (producto.getCategoria() == null || !categoriaService.existsById(producto.getCategoria().getIdCategoria())) {
            throw new IllegalArgumentException("Categoría no encontrada con ID: " + productoDTO.getCategoriaId());
        }
        producto = productoRepository.save(producto);
        return convertToDTO(producto);
    }
    
    public void deleteProducto(Integer id) {
        productoRepository.deleteById(id);
    }
    
    public Optional<ProductoDTO> updateProducto(Integer id, ProductoDTO productoDTO) {
        return productoRepository.findById(id)
                .map(existingProducto -> {
                    existingProducto.setNombreProducto(productoDTO.getNombreProducto());
                    existingProducto.setDescripcion(productoDTO.getDescripcion());
                    existingProducto.setPrecio(productoDTO.getPrecio());
                    existingProducto.setMarca(productoDTO.getMarca());
                    existingProducto.setCantidadDisponible(productoDTO.getCantidadDisponible());
                    
                    if (productoDTO.getCategoriaId() != null) {
                        Optional<Categoria> categoriaOpt = categoriaService.getEntityById(productoDTO.getCategoriaId());
                        categoriaOpt.ifPresent(existingProducto::setCategoria);
                    }
                    
                    Producto updatedProducto = productoRepository.save(existingProducto);
                    return convertToDTO(updatedProducto);
                });
    }
    
    private ProductoDTO convertToDTO(Producto producto) {
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setIdProducto(producto.getIdProducto());
        productoDTO.setNombreProducto(producto.getNombreProducto());
        productoDTO.setDescripcion(producto.getDescripcion());
        productoDTO.setPrecio(producto.getPrecio());
        productoDTO.setMarca(producto.getMarca());
        productoDTO.setCantidadDisponible(producto.getCantidadDisponible());
        
        if (producto.getCategoria() != null) {
            productoDTO.setCategoriaId(producto.getCategoria().getIdCategoria());
            productoDTO.setCategoriaDescripcion(producto.getCategoria().getDescripcion());
        }
        
        return productoDTO;
    }
    
    private Producto convertToEntity(ProductoDTO productoDTO) {
        Producto producto = new Producto();
        producto.setIdProducto(productoDTO.getIdProducto());
        producto.setNombreProducto(productoDTO.getNombreProducto());
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setPrecio(productoDTO.getPrecio());
        producto.setMarca(productoDTO.getMarca());
        producto.setCantidadDisponible(productoDTO.getCantidadDisponible());
        
        if (productoDTO.getCategoriaId() != null) {
            categoriaService.getEntityById(productoDTO.getCategoriaId())
                    .ifPresent(producto::setCategoria);
        }
        
        return producto;
    }
}