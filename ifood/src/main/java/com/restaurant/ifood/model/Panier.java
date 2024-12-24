package com.restaurant.ifood.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "panier", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Client client;


    @OneToMany(mappedBy = "panier")
    @JsonIgnore
    private List<PanierMenuItem> panierMenuItems = new ArrayList<>();

}
