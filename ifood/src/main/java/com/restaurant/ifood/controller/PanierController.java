package com.restaurant.ifood.controller;

import com.restaurant.ifood.dto.PanierDto;
import com.restaurant.ifood.service.IPanierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/panier")
@CrossOrigin
public class PanierController {


    @Autowired
    private IPanierService iPanierService;


    @PostMapping("/{panierId}/Addmenuitems/{menuItemId}")
    public ResponseEntity<Void> addMenuItemToPanier(@PathVariable Long panierId, @PathVariable Long menuItemId ,@RequestParam int quantite){
        iPanierService.addMenuItemToPanier(panierId,menuItemId,quantite);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PanierDto> getPanierWithMenuItems(@PathVariable Long id) {
        PanierDto panierDto = iPanierService.getPanierWithMenuItems(id);
        return ResponseEntity.ok(panierDto);
    }
}
