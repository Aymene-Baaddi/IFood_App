package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.LivraisonDto;

import java.util.List;

public interface ILivraisonService {
    LivraisonDto createLivraison(LivraisonDto livraisonDto);

    LivraisonDto getLivraisonById(Long id);
    List<LivraisonDto> getAllLivraisons();
    void deleteLivraison(Long id);
}