package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.PanierDto;
import com.restaurant.ifood.model.Client;

public interface IPanierService {

    public PanierDto newPanier(PanierDto panierDto);
    public void addMenuItemToPanier( Long panierId,Long menuItemId,int quantite);

    public PanierDto getPanierWithMenuItems(Long id);
}
