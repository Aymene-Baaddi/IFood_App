package com.restaurant.ifood.service;


import com.restaurant.ifood.dto.PanierDto;
import com.restaurant.ifood.dto.PanierMenuItemDto;
import com.restaurant.ifood.model.Client;
import com.restaurant.ifood.model.MenuItem;
import com.restaurant.ifood.model.Panier;
import com.restaurant.ifood.model.PanierMenuItem;
import com.restaurant.ifood.repository.MenuItemRepository;
import com.restaurant.ifood.repository.PanierMenuItemRepository;
import com.restaurant.ifood.repository.PanierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PanierServiceImpl implements IPanierService {

    @Autowired
    private PanierRepository panierRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private PanierMenuItemRepository panierMenuItemRepository;

    @Override
    public PanierDto newPanier(PanierDto panierDto) {
        Panier panier=modelMapper.map(panierDto,Panier.class);
        panierRepository.save(panier);
        return panierDto;
    }

    @Override
    public void addMenuItemToPanier(Long panierId, Long menuItemId, int quantite) {

        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Panier not found"));
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));


        PanierMenuItem panierMenuItem = panierMenuItemRepository.findByPanierAndMenuItem(panier, menuItem);

        if (panierMenuItem != null) {
            // Si le MenuItem est déjà dans le panier, mettre à jour la quantité
            panierMenuItem.setQuantite(panierMenuItem.getQuantite() + quantite);
        } else {
            // Si le MenuItem n'est pas encore dans le panier, créer une nouvelle entrée
            panierMenuItem = new PanierMenuItem();
            panierMenuItem.setPanier(panier);
            panierMenuItem.setMenuItem(menuItem);
            panierMenuItem.setQuantite(quantite);
            panierMenuItemRepository.save(panierMenuItem);
        }


        panierRepository.save(panier);

    }

    @Override
    public PanierDto getPanierWithMenuItems(Long id) {

        Panier panier = panierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));
        List<PanierMenuItem> panierMenuItems = panierMenuItemRepository.findByPanierId(id);
        List<PanierMenuItemDto> panierMenuItemDTOs = new ArrayList<>();
        for (PanierMenuItem panierMenuItem : panierMenuItems) {
            PanierMenuItemDto panierMenuItemDto = modelMapper.map(panierMenuItem, PanierMenuItemDto.class);
            panierMenuItemDTOs.add(panierMenuItemDto);
        }
        PanierDto panierDto = modelMapper.map(panier, PanierDto.class);
        panierDto.setPanierMenuItemDtos(panierMenuItemDTOs);
        return panierDto;
    }
}
