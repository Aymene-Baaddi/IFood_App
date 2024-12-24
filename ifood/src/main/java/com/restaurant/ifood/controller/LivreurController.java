package com.restaurant.ifood.controller;

import com.restaurant.ifood.dto.LivreurDto;
import com.restaurant.ifood.service.ILivreurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livreur")
@CrossOrigin
public class LivreurController {

    @Autowired
    private ILivreurService livreurService;

    @PostMapping("/register")
    public ResponseEntity<LivreurDto> addLivreur(@RequestBody LivreurDto livreurDto) {
        LivreurDto newLivreur = livreurService.addLivreur(livreurDto);
        return ResponseEntity.ok(newLivreur);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivreurDto> getLivreurById(@PathVariable Long id) {
        LivreurDto livreurDto = livreurService.getLivreurById(id);
        return ResponseEntity.ok(livreurDto);
    }

    @GetMapping
    public ResponseEntity<List<LivreurDto>> getAllLivreurs() {
        List<LivreurDto> livreurs = livreurService.getAllLivreurs();
        return ResponseEntity.ok(livreurs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivreurDto> updateLivreur(@PathVariable Long id, @RequestBody LivreurDto livreurDto) {
        LivreurDto updatedLivreur = livreurService.updateLivreur(id, livreurDto);
        return ResponseEntity.ok(updatedLivreur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivreur(@PathVariable Long id) {
        livreurService.deleteLivreur(id);
        return ResponseEntity.noContent().build();
}
}