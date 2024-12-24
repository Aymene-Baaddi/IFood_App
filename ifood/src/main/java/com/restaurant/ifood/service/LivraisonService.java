package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.LivraisonDto;
import com.restaurant.ifood.model.Commande;
import com.restaurant.ifood.model.Livraison;
import com.restaurant.ifood.model.Livreur;
import com.restaurant.ifood.repository.CommandeRepository;
import com.restaurant.ifood.repository.LivraisonRepository;
import com.restaurant.ifood.repository.LivreurRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LivraisonService implements ILivraisonService {

    @Autowired
    private LivraisonRepository livraisonRepository;

    @Autowired
    private LivreurRepository livreurRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public LivraisonDto createLivraison(LivraisonDto livraisonDto) {
        Livraison livraison = new Livraison();

        Livreur livreur = livreurRepository.findById(livraisonDto.getLivreurId())
                .orElseThrow(() -> new RuntimeException("Livreur non trouvé avec l'ID : " + livraisonDto.getLivreurId()));
        livraison.setLivreur(livreur);

        livraison.setTempsEstime(livraisonDto.getTempsEstime());

        Livraison savedLivraison = livraisonRepository.save(livraison);

        List<Commande> commandes = livraisonDto.getCommandesIds().stream()
                .map(id -> commandeRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Commande non trouvée avec l'ID : " + id)))
                .collect(Collectors.toList());

        commandes.forEach(commande -> {
            commande.setLivraison(savedLivraison);
            commandeRepository.save(commande);
        });

        return modelMapper.map(savedLivraison, LivraisonDto.class);
    }

    @Override
    public LivraisonDto getLivraisonById(Long id) {
        Livraison livraison = livraisonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livraison non trouvée avec l'ID : " + id));

        LivraisonDto livraisonDto = new LivraisonDto();
        livraisonDto.setId(livraison.getId());
        livraisonDto.setTempsEstime(livraison.getTempsEstime());
        livraisonDto.setLivreurId(livraison.getLivreur().getId());
        livraisonDto.setCommandesIds(
                livraison.getCommandes().stream()
                        .map(Commande::getId)
                        .collect(Collectors.toList())
        );

        return livraisonDto;
    }


    @Override
    public List<LivraisonDto> getAllLivraisons() {
        return livraisonRepository.findAll().stream()
                .map(livraison -> {
                    LivraisonDto livraisonDto = new LivraisonDto();
                    livraisonDto.setId(livraison.getId());
                    livraisonDto.setTempsEstime(livraison.getTempsEstime());
                    livraisonDto.setLivreurId(livraison.getLivreur().getId());
                    livraisonDto.setCommandesIds(
                            livraison.getCommandes().stream()
                                    .map(Commande::getId)
                                    .collect(Collectors.toList())
                    );
                    return livraisonDto;
                })
                .collect(Collectors.toList());
    }






    @Override
    public void deleteLivraison(Long id) {
        Livraison livraison = livraisonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livraison non trouvée"));
        livraisonRepository.delete(livraison);
}
}