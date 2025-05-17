package backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.models.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    
}