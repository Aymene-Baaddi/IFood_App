package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.CommandeDto;
import com.restaurant.ifood.dto.MenuItemDto;
import com.restaurant.ifood.dto.PanierDto;
import com.restaurant.ifood.dto.PanierMenuItemDto;
import com.restaurant.ifood.model.Commande;
import com.restaurant.ifood.model.Panier;
import com.restaurant.ifood.repository.CommandeRepository;
import com.restaurant.ifood.repository.PanierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandeService implements ICommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private PanierRepository panierRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CommandeDto addCommande(CommandeDto commandeDto) {
        Panier panier = panierRepository.findById(commandeDto.getPanier_id())
                .orElseThrow(() -> new RuntimeException("Panier non trouvé avec l'ID : " + commandeDto.getPanier_id()));

        Commande commande = modelMapper.map(commandeDto, Commande.class);

        commande.setPanier(panier);

        commande = commandeRepository.save(commande);

        CommandeDto savedCommandeDto = modelMapper.map(commande, CommandeDto.class);
        PanierDto panierDto = modelMapper.map(panier, PanierDto.class);
        panierDto.setPanierMenuItemDtos(panier.getPanierMenuItems()
                .stream()
                .map(panierMenuItem -> new PanierMenuItemDto(
                        modelMapper.map(panierMenuItem.getMenuItem(), MenuItemDto.class),
                        panierMenuItem.getQuantite()))
                .toList());
        savedCommandeDto.setPanier(panierDto);

        return savedCommandeDto;
    }


    @Override
    public CommandeDto getCommandeById(Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec l'ID : " + id));
        CommandeDto commandeDto = modelMapper.map(commande, CommandeDto.class);

        if (commande.getPanier() != null) {
            PanierDto panierDto = new PanierDto();
            panierDto.setId(commande.getPanier().getId());

            List<PanierMenuItemDto> panierMenuItemDtos = commande.getPanier().getPanierMenuItems()
                    .stream()
                    .map(panierMenuItem -> new PanierMenuItemDto(
                            modelMapper.map(panierMenuItem.getMenuItem(), MenuItemDto.class), // Mapper MenuItem vers MenuItemDto
                            panierMenuItem.getQuantite()
                    ))
                    .collect(Collectors.toList());

            panierDto.setPanierMenuItemDtos(panierMenuItemDtos);
            commandeDto.setPanier(panierDto);
        }

        return commandeDto;
    }



    @Override
    public List<CommandeDto> getAllCommandes() {
        return commandeRepository.findAll()
                .stream()
                .map(commande -> {
                    CommandeDto commandeDto = modelMapper.map(commande, CommandeDto.class);

                    if (commande.getPanier() != null) {
                        PanierDto panierDto = new PanierDto();
                        panierDto.setId(commande.getPanier().getId());

                        List<PanierMenuItemDto> panierMenuItemDtos = commande.getPanier().getPanierMenuItems()
                                .stream()
                                .map(panierMenuItem -> new PanierMenuItemDto(
                                        modelMapper.map(panierMenuItem.getMenuItem(), MenuItemDto.class), // Mapper MenuItem vers MenuItemDto
                                        panierMenuItem.getQuantite()
                                ))
                                .collect(Collectors.toList());

                        panierDto.setPanierMenuItemDtos(panierMenuItemDtos);
                        commandeDto.setPanier(panierDto);
                    }

                    return commandeDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public CommandeDto updateCommande(Long id, CommandeDto commandeDto) {
        Commande existingCommande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec l'ID : " + id));

        if (commandeDto.getDate() != null) {
            existingCommande.setDate(commandeDto.getDate());
        }
        if (commandeDto.getStatut() != null) {
            existingCommande.setStatut(Commande.Statut.valueOf(commandeDto.getStatut()));
        }
        if (commandeDto.getAdresse_livraison() != null) {
            existingCommande.setAdresse_livraison(commandeDto.getAdresse_livraison());
        }
        if (commandeDto.getPanier_id() != null) {
            Panier panier = panierRepository.findById(commandeDto.getPanier_id())
                    .orElseThrow(() -> new RuntimeException("Panier non trouvé avec l'ID : " + commandeDto.getPanier_id()));
            existingCommande.setPanier(panier);
        }

        Commande updatedCommande = commandeRepository.save(existingCommande);

        CommandeDto updatedCommandeDto = modelMapper.map(updatedCommande, CommandeDto.class);

        if (updatedCommande.getPanier() != null) {
            PanierDto panierDto = modelMapper.map(updatedCommande.getPanier(), PanierDto.class);
            panierDto.setPanierMenuItemDtos(updatedCommande.getPanier().getPanierMenuItems()
                    .stream()
                    .map(panierMenuItem -> new PanierMenuItemDto(
                            modelMapper.map(panierMenuItem.getMenuItem(), MenuItemDto.class),
                            panierMenuItem.getQuantite()))
                    .collect(Collectors.toList()));
            updatedCommandeDto.setPanier(panierDto);
        }

        return updatedCommandeDto;
    }


    @Override
    public void deleteCommande(Long id) {
        if (!commandeRepository.existsById(id)) {
            throw new RuntimeException("Commande non trouvée avec l'ID : " + id);
        }
        commandeRepository.deleteById(id);
    }
}
