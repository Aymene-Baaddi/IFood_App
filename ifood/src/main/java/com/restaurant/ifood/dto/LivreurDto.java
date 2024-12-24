package com.restaurant.ifood.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LivreurDto {
    private Long id;
    private String nom;
    private String email;
    private String motdepasse;
    private List<Long> livraisonIds;
    private String statut;
}