package com.restaurant.ifood.service;


import com.restaurant.ifood.dto.ClientDto;
import com.restaurant.ifood.dto.PanierDto;
import com.restaurant.ifood.model.Client;
import com.restaurant.ifood.model.Panier;
import com.restaurant.ifood.repository.ClientRepository;
import com.restaurant.ifood.repository.PanierRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements IClientService{

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private IPanierService iPanierService;
    @Autowired
    ModelMapper modelMapper;


    @Override
    public ClientDto login(ClientDto clientDto) {
        Optional<Client> client = clientRepository.findByEmail(clientDto.getEmail());

        if(client.isPresent()){
            Client client1 = client.get();
            ClientDto clientDto1 = modelMapper.map(client1,ClientDto.class);
            if (BCrypt.checkpw(clientDto.getMotdepasse(), client1.getMotdepasse())){
                return clientDto1;
            }
            return null;

        }
        return null;
    }

    @Override
    public ClientDto register(ClientDto clientDto) {

        Optional<Client> existingEmail = clientRepository.findByEmail(clientDto.getEmail());
        if (existingEmail.isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        Client client = modelMapper.map(clientDto, Client.class);

        client.setMotdepasse(BCrypt.hashpw(client.getMotdepasse(), BCrypt.gensalt()));

        Panier panier = new Panier();
        panier.setClient(client);

        client.setPanier(panier);

        Client savedClient = clientRepository.save(client);

        ClientDto savedClientDto = modelMapper.map(savedClient, ClientDto.class);

        return savedClientDto;
    }

    @Override
    public ClientDto getclient(Long id) {

        Optional<Client> client = clientRepository.findById(id);
        if (!client.isPresent()) {
            throw new RuntimeException("Client not found with ID: " + id);
        }
        ClientDto clientDto = modelMapper.map(client.get(), ClientDto.class);
        return clientDto;
    }

    @Override
    public List<ClientDto> getall() {

        List<ClientDto> clientDtos = new ArrayList<>();
        List<Client> clients = clientRepository.findAll();
        for (Client c : clients) {
            ClientDto cDto = modelMapper.map(c, ClientDto.class);
            clientDtos.add(cDto);
        }
        return clientDtos;
    }

    @Override
    public void delete(Long id) {
        clientRepository.deleteById(id);

    }


    @Override
    public ClientDto update(ClientDto clientDto) {
        Client client=new Client();
        client=modelMapper.map(clientDto,Client.class);
        clientRepository.save(client);
        return clientDto;

    }
}
