package com.restaurant.ifood.model;



import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nom;
        private String description;
        private Float prix;
        private String categorie;
        private Boolean disponible;
        @OneToMany(mappedBy = "menuItem")
        @JsonIgnore
        private List<PanierMenuItem> panierMenuItems = new ArrayList<>();
}
