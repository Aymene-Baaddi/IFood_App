package com.restaurant.ifood.dto;

import com.restaurant.ifood.model.MenuItem;
import com.restaurant.ifood.model.Panier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class PanierMenuItemDto {

    private MenuItemDto menuItem;
    private int quantite;
}
