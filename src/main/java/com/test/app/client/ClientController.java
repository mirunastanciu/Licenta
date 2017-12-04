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
	
	@RequestMapping(path="/getAllClients" ,method=RequestMethod.GET)
	public ArrayList<Client> getAllClients(){
		return clientService.getAllClients();
	}
	
	@RequestMapping(value="/saveClient")
	public void saveClient(Client client){
		clientService.saveClient(client);
	}

	
	@RequestMapping(path="/getClientsName", method=RequestMethod.GET)
	public ArrayList<String> getClientsLastNames(){
		ArrayList<Client> l = clientService.getAllClients();
		ArrayList<String> cname = new ArrayList<>();
		for(int i=0;i<l.size();i++){
			String a = l.get(i).getFirstname()+" "+l.get(i).getLastname();
			cname.add(a);
		}
		return cname;
	}
	
	
	
	
	

}
