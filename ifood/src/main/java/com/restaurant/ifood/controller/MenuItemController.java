package com.restaurant.ifood.controller;


import com.restaurant.ifood.dto.MenuItemDto;
import com.restaurant.ifood.service.IMenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/menuitem")
public class MenuItemController {

    @Autowired
    private IMenuItemService iMenuItemService;

    @PostMapping
    public MenuItemDto ajouterMenuItem(@RequestBody MenuItemDto menuItemDto){;
        return iMenuItemService.ajouterMenuItem(menuItemDto);
    }

    @GetMapping
    public List<MenuItemDto>getMenuItems(){
        return iMenuItemService.getMenuItems();
    }

    @GetMapping("{id}")
    public MenuItemDto getMenuItem(@PathVariable Long id){
        return iMenuItemService.getByIdMenuItem(id);
    }

    @PutMapping("{id}")
    public MenuItemDto updateMenuItem(@RequestBody MenuItemDto menuItemDto, @PathVariable Long id){

        menuItemDto.setId(id);
        return iMenuItemService.updateMenuItem(menuItemDto);
    }


    @DeleteMapping("{id}")
    public void deleteVoiture(@PathVariable Long id){iMenuItemService.deleteMenuItem(id);}

}
