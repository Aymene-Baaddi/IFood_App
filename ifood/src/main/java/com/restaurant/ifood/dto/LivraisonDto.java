package com.restaurant.ifood.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LivraisonDto {
    private Long id;
    private String tempsEstime;
    private Long livreurId;
    private List<Long> commandesIds;
}