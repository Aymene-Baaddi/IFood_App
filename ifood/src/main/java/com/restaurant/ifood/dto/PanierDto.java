package com.restaurant.ifood.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.restaurant.ifood.model.Client;
import com.restaurant.ifood.model.PanierMenuItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PanierDto {

    private Long id;
    private List<PanierMenuItemDto> panierMenuItemDtos;
    @JsonIgnore
    private Client client;
}