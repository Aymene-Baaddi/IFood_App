package com.restaurant.ifood.repository;
import com.restaurant.ifood.model.Livreur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LivreurRepository extends JpaRepository<Livreur,Long> {
    Optional<Livreur> findByEmail(String email);
}

