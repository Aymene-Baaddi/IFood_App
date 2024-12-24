package com.restaurant.ifood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    private String adresse_livraison;

    @OneToOne
    @JoinColumn(name = "panier_id")
    private Panier panier;

    @ManyToOne
    @JoinColumn(name = "livraison_id")
    private Livraison livraison;



    @PrePersist
    public void setDate() {
        this.date = new Date();
    }
    public enum Statut {
        TRAITEMENT,
        PREPARATION,
        RECUPERATION,
        EN_ROUTE
    }
}
