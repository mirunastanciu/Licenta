package com.test.app.client;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

	@Autowired
	ClientRepository clientRepository;
	
	public ArrayList<Client> getAllClients(){
		ArrayList<Client> clientList = new ArrayList<>();
		clientRepository.findAll().forEach(clientList::add);	
		return clientList;
	}
	
	public Client getClientById(int a){
		ArrayList<Client> clientList = getAllClients();
		for(int i=0;i<clientList.size();i++){
			 if(clientList.get(i).getIdclent() == a){
				 return clientList.get(i);
			 }
		 }
		return null;
	}
	
	public void saveClient(Client c){
		 clientRepository.save(c);
	}
}
