package com.restaurant.ifood.controller;



import com.restaurant.ifood.dto.ClientDto;
import com.restaurant.ifood.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin
public class ClientController {

    @Autowired
    private IClientService clientService;


    @PostMapping("/register")
    public ClientDto register(@RequestBody ClientDto clientDto) {
        ClientDto clientDto1 = clientService.register(clientDto);
        return clientDto1;
    }


    @PostMapping("/login")
    public ClientDto login(@RequestBody ClientDto clientDto) {
        ClientDto clientDto1 = clientService.login(clientDto);
        boolean auth = false;
        if (clientDto1 != null) {
            auth = true;
        }
        return auth ? clientDto1 : null;
    }


    @GetMapping("{id}")
    public ClientDto getClient(@PathVariable Long id) {
        return clientService.getclient(id);
    }


    @GetMapping
    public List<ClientDto> getAllClients() {
        return clientService.getall();
    }


    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        clientService.delete(id);
    }

    @PutMapping("{id}")
    public ClientDto update(@RequestBody ClientDto clientDto, @PathVariable Long id) {
        clientDto.setId(id);
        return clientService.update(clientDto);
    }
}
