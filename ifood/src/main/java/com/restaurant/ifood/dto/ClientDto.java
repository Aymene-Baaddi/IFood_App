package com.restaurant.ifood.dto;

import com.restaurant.ifood.model.Panier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {
    private Long id;
    private String nom;
    private String email;
    private String adresseLivraison;
    private String numTelephone;
    private String motdepasse;
    private Panier panier;
}
