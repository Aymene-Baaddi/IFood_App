package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.MenuItemDto;

import java.util.List;

public interface IMenuItemService {

    MenuItemDto ajouterMenuItem (MenuItemDto MenuItemDto);

    List<MenuItemDto> getMenuItems();

    MenuItemDto getByIdMenuItem (Long id);

    MenuItemDto updateMenuItem (MenuItemDto MenuItemDto);

    void deleteMenuItem (Long id);
}
