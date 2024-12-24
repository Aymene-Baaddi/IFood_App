package com.restaurant.ifood.dto;


import com.restaurant.ifood.model.PanierMenuItem;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemDto {

    private Long id;
    private String nom;
    private String description;
    private Float prix;
    private String categorie;
    private Boolean disponible;
    private List<PanierMenuItemDto> panierMenuItemDtos;
}
