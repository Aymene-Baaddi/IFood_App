package com.restaurant.ifood.repository;

import com.restaurant.ifood.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {

    List<Commande> findByPanierId(Long id);
}
