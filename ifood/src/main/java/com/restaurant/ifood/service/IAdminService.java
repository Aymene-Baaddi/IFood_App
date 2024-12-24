package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.AdminDto;

import java.util.List;

public interface IAdminService {
    AdminDto login(AdminDto adminDto);
    AdminDto register(AdminDto adminDto);
    AdminDto getAdminById(Long id);
    List<AdminDto> getAllAdmins();
    void deleteAdmin(Long id);
    AdminDto updateAdmin(AdminDto adminDto);
}