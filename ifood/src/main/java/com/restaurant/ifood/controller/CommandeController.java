package com.restaurant.ifood.controller;

import com.restaurant.ifood.dto.CommandeDto;
import com.restaurant.ifood.service.ICommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin
public class CommandeController {

    @Autowired
    private ICommandeService commandeService;

    @PostMapping
    public ResponseEntity<CommandeDto> addCommande(@RequestBody CommandeDto commandeDto) {
        CommandeDto savedCommande = commandeService.addCommande(commandeDto);
        return ResponseEntity.status(201).body(savedCommande);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeDto> getCommandeById(@PathVariable Long id) {
        CommandeDto commandeDto = commandeService.getCommandeById(id);
        return ResponseEntity.ok(commandeDto);
    }

    @GetMapping
    public ResponseEntity<List<CommandeDto>> getAllCommandes() {
        List<CommandeDto> commandes = commandeService.getAllCommandes();
        return ResponseEntity.ok(commandes);
    }
    @GetMapping("/panier/{id}")
    public ResponseEntity<List<CommandeDto>> getCommandesByPanier(@PathVariable Long id) {
        List<CommandeDto> commandes = commandeService.getAllCommandesByPanier(id);
        return ResponseEntity.ok(commandes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommandeDto> updateCommande(@PathVariable Long id, @RequestBody CommandeDto commandeDto) {
        CommandeDto updatedCommande = commandeService.updateCommande(id, commandeDto);
        return ResponseEntity.ok(updatedCommande);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        commandeService.deleteCommande(id);
        return ResponseEntity.noContent().build();
    }
}
