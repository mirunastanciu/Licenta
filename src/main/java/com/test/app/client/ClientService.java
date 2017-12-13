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
		return clientRepository.getClientById(a);
	}
	
	public void saveClient(Client c){
		 clientRepository.save(c);
	}
	
	public int getClientIdByName(String a){
		ArrayList<Client> clist = getAllClients();
		for(int i =0;i<clist.size();i++){
			String name = clist.get(i).getFirstname()+" "+clist.get(i).getLastname();
			if(name.equals(a)){
				return clist.get(i).getId();
			}
		}
		return 0;
	}
	
	public Client getClientByIdBill(int a){
		return clientRepository.getClientByIdBill(a);
	}
}
