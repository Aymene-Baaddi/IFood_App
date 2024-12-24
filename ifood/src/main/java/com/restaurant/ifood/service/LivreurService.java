package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.LivreurDto;
import com.restaurant.ifood.model.Livreur;
import com.restaurant.ifood.repository.LivreurRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LivreurService implements ILivreurService {

    @Autowired
    private LivreurRepository livreurRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public LivreurDto addLivreur(LivreurDto livreurDto) {
        Optional<Livreur> existingLivreur = livreurRepository.findByEmail(livreurDto.getEmail());
        if (existingLivreur.isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        Livreur livreur = modelMapper.map(livreurDto, Livreur.class);
        livreur.setMotdepasse(BCrypt.hashpw(livreurDto.getMotdepasse(), BCrypt.gensalt()));
        Livreur savedLivreur = livreurRepository.save(livreur);

        return modelMapper.map(savedLivreur, LivreurDto.class);
    }

    @Override
    public LivreurDto getLivreurById(Long id) {
        Livreur livreur = livreurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livreur not found with ID: " + id));
        return modelMapper.map(livreur, LivreurDto.class);
    }

    @Override
    public List<LivreurDto> getAllLivreurs() {
        List<Livreur> livreurs = livreurRepository.findAll();
        return livreurs.stream()
                .map(livreur -> modelMapper.map(livreur, LivreurDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public LivreurDto updateLivreur(Long id, LivreurDto livreurDto) {
        Livreur existingLivreur = livreurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livreur not found with ID: " + id));

        existingLivreur.setNom(livreurDto.getNom());
        existingLivreur.setEmail(livreurDto.getEmail());
        existingLivreur.setStatut(Livreur.Statut.valueOf(livreurDto.getStatut()));
        if (livreurDto.getMotdepasse() != null) {
            existingLivreur.setMotdepasse(BCrypt.hashpw(livreurDto.getMotdepasse(), BCrypt.gensalt()));
        }

        Livreur updatedLivreur = livreurRepository.save(existingLivreur);

        return modelMapper.map(updatedLivreur, LivreurDto.class);
    }

    @Override
    public void deleteLivreur(Long id) {
        if (!livreurRepository.existsById(id)) {
            throw new RuntimeException("Livreur not found with ID: " + id);
        }
        livreurRepository.deleteById(id);
}
}