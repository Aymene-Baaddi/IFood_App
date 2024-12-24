package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.LivreurDto;

import java.util.List;

public interface ILivreurService {
    LivreurDto addLivreur(LivreurDto livreurDto);
    LivreurDto getLivreurById(Long id);
    List<LivreurDto> getAllLivreurs();
    LivreurDto updateLivreur(Long id, LivreurDto livreurDto);
    void deleteLivreur(Long id);
}