package com.restaurant.ifood.service;


import com.restaurant.ifood.dto.MenuItemDto;
import com.restaurant.ifood.model.MenuItem;
import com.restaurant.ifood.repository.MenuItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class MenuItemServiceImpl implements IMenuItemService {


    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MenuItemDto ajouterMenuItem(MenuItemDto MenuItemDto) {
        MenuItem menuItem = new MenuItem();
        menuItem = modelMapper.map(MenuItemDto,MenuItem.class);
        menuItemRepository.save(menuItem);
        return MenuItemDto;
    }

    @Override
    public List<MenuItemDto> getMenuItems() {
        List<MenuItemDto> menuItemDtos = new ArrayList<>();
        List<MenuItem> menuItems = menuItemRepository.findAll();
        for (MenuItem m : menuItems ){
            MenuItemDto menuItemDto = modelMapper.map(m,MenuItemDto.class);
            menuItemDtos.add(menuItemDto);
        }
        return menuItemDtos;
    }

    @Override
    public MenuItemDto getByIdMenuItem(Long id) {
        Optional<MenuItem> menuItem = menuItemRepository.findById(id);
        MenuItemDto menuItemDto = modelMapper.map(menuItem,MenuItemDto.class);
        return menuItemDto;
    }

    @Override
    public MenuItemDto updateMenuItem(MenuItemDto MenuItemDto) {
        MenuItem menuItem = new MenuItem();
        menuItem = modelMapper.map(MenuItemDto,MenuItem.class);
        menuItemRepository.save(menuItem);
        return MenuItemDto;

    }

    @Override
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
