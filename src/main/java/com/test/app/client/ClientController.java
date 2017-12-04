package com.test.app.client;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {
	
	@Autowired
	ClientService clientService;
	
	@RequestMapping(value="/saveClient")
	public void saveClient(Client client){
		clientService.saveClient(client);
	}
	
/*	@RequestMapping(path="/getClientsFirstName", method=RequestMethod.GET)
	public ArrayList<String> getClientsFirstNames(){
		return clientService.getClientsFirstName();
	}
	
	@RequestMapping(path="/getClientsLastName", method=RequestMethod.GET)
	public ArrayList<String> getClientsLastNames(){
		return clientService.getClientsLastName();
	}*/
	
	@RequestMapping(path="/getClientsName", method=RequestMethod.GET)
	public ArrayList<String> getClientsLastNames(){
		ArrayList<Client> l = clientService.getAllClients();
		ArrayList<String> cname = new ArrayList<>();
		for(int i=0;i<l.size();i++){
			String a = l.get(i).getFisrtname()+" "+l.get(i).getLastname();
			cname.add(a);
		}
		return cname;
	}
	
	
	

}
