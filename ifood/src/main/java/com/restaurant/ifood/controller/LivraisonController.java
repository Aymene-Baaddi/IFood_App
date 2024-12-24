package com.restaurant.ifood.controller;

import com.restaurant.ifood.dto.LivraisonDto;
import com.restaurant.ifood.service.ILivraisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livraison")
@CrossOrigin
public class LivraisonController {

    @Autowired
    private ILivraisonService livraisonService;

    @PostMapping
    public ResponseEntity<LivraisonDto> createLivraison(@RequestBody LivraisonDto livraisonDto) {
        LivraisonDto createdLivraison = livraisonService.createLivraison(livraisonDto);
        return ResponseEntity.ok(createdLivraison);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivraisonDto> getLivraisonById(@PathVariable Long id) {
        LivraisonDto livraison = livraisonService.getLivraisonById(id);
        return ResponseEntity.ok(livraison);
    }

    @GetMapping
    public ResponseEntity<Object> getAllLivraisons() {
        List<LivraisonDto> livraisons = livraisonService.getAllLivraisons();
        return ResponseEntity.ok(livraisons);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivraison(@PathVariable Long id) {
        livraisonService.deleteLivraison(id);
        return ResponseEntity.noContent().build();
}
}