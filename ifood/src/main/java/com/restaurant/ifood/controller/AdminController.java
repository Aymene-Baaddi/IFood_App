package com.restaurant.ifood.controller;

import com.restaurant.ifood.dto.AdminDto;
import com.restaurant.ifood.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private IAdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminDto> login(@RequestBody AdminDto adminDto) {
        AdminDto loggedInAdmin = adminService.login(adminDto);
        System.out.println("admin est "+ adminDto.getEmail());
        if (loggedInAdmin != null) {
            return ResponseEntity.ok(loggedInAdmin);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/register")
    public ResponseEntity<AdminDto> register(@RequestBody AdminDto adminDto) {
        AdminDto registeredAdmin = adminService.register(adminDto);
        return ResponseEntity.ok(registeredAdmin);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminDto> getAdminById(@PathVariable Long id) {
        AdminDto admin = adminService.getAdminById(id);
        return ResponseEntity.ok(admin);
    }

    @GetMapping
    public ResponseEntity<List<AdminDto>> getAllAdmins() {
        List<AdminDto> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @PutMapping
    public ResponseEntity<AdminDto> updateAdmin(@RequestBody AdminDto adminDto) {
        AdminDto updatedAdmin = adminService.updateAdmin(adminDto);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
}
}