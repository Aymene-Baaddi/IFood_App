package com.restaurant.ifood.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommandeDto {
    private Long id;
    private Date date;
    private String statut;
    private String adresse_livraison;
    private Long livraison_id;
    private Long panier_id;
    private PanierDto panier;
}
