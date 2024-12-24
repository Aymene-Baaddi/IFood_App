package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.AdminDto;
import com.restaurant.ifood.model.Admin;
import com.restaurant.ifood.repository.AdminRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AdminDto login(AdminDto adminDto) {
        Optional<Admin> admin = adminRepository.findByEmail(adminDto.getEmail());
        if (admin.isPresent()) {
            Admin existingAdmin = admin.get();
            if (BCrypt.checkpw(adminDto.getMotdepasse(), existingAdmin.getMotdepasse())) {
                return modelMapper.map(existingAdmin, AdminDto.class);
            }
        }
        return null;
    }

    @Override
    public AdminDto register(AdminDto adminDto) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(adminDto.getEmail());
        if (existingAdmin.isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        Admin admin = modelMapper.map(adminDto, Admin.class);
        admin.setMotdepasse(BCrypt.hashpw(adminDto.getMotdepasse(), BCrypt.gensalt()));
        Admin savedAdmin = adminRepository.save(admin);

        return modelMapper.map(savedAdmin, AdminDto.class);
    }

    @Override
    public AdminDto getAdminById(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with ID: " + id));
        return modelMapper.map(admin, AdminDto.class);
    }

    @Override
    public List<AdminDto> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        List<AdminDto> adminDtos = new ArrayList<>();
        for (Admin admin : admins) {
            adminDtos.add(modelMapper.map(admin, AdminDto.class));
        }
        return adminDtos;
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public AdminDto updateAdmin(AdminDto adminDto) {
        Admin admin = modelMapper.map(adminDto, Admin.class);
        Admin updatedAdmin = adminRepository.save(admin);
        return modelMapper.map(updatedAdmin, AdminDto.class);
}
}