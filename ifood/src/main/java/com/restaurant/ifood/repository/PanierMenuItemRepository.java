package com.restaurant.ifood.repository;

import com.restaurant.ifood.model.MenuItem;
import com.restaurant.ifood.model.Panier;
import com.restaurant.ifood.model.PanierMenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanierMenuItemRepository extends JpaRepository<PanierMenuItem,Long> {
    PanierMenuItem findByPanierAndMenuItem(Panier panier, MenuItem menuItem);

    List<PanierMenuItem> findByPanierId(Long id);
}
