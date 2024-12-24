package com.restaurant.ifood.service;

import com.restaurant.ifood.dto.ClientDto;

import java.util.List;

public interface IClientService {

    public ClientDto login(ClientDto clientDto) ;
    public ClientDto register(ClientDto clientDto);

    public ClientDto getclient(Long id);

    public List<ClientDto> getall();

    public void delete(Long id);

    public ClientDto update(ClientDto clientDto);
}
