package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.CommandeDto;

import java.util.List;

public interface ICommandeService {
    CommandeDto addCommande(CommandeDto commandeDto);
    CommandeDto getCommandeById(Long id);
    List<CommandeDto> getAllCommandes();
    CommandeDto updateCommande(Long id, CommandeDto commandeDto);

    void deleteCommande(Long id);
}
