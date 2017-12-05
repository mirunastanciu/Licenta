package com.test.app.client;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.account.AccountService;
import com.test.app.address.Address;
import com.test.app.address.AddressService;
import com.test.app.contractclient.ContractClient;
import com.test.app.contractclient.ContractClientService;
import com.test.app.contractclientstatus.ContractClientStatusService;
import com.test.app.contractemployeestatus.ContractEmployeeStatusService;

@RestController
public class ClientController {
	
	@Autowired
	ClientService clientService;
	
	@Autowired 
	ContractClientService contractClientService;
	
	@Autowired
	AccountService accountService;
	
	@Autowired
	AddressService addresService;
	
	@Autowired
	ContractClientStatusService contractClientStatusService;
	
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
	
	@RequestMapping(path="/getClientDetails", method=RequestMethod.POST)
	public ClientDetails getClientDetails(@RequestParam(value="idClient") int id){
		Client client = clientService.getClientById(id);
		ClientDetails clientDetails = new ClientDetails();
		
		clientDetails.setId(client.getId());
		String fullname =  client.getFirstname()+" "+client.getLastname();
		clientDetails.setName(fullname);
		clientDetails.setEmail(client.getEmail());
		clientDetails.setUsername(accountService.getUsernameByIdAccount(client.getIdaccount()));
		Address address = addresService.getAddressById(accountService.getIdAddressByIdAccount(client.getIdaccount()));
		String address1 = address.getCountry()+", "+address.getConuty()+", "+address.getTown()+", "+
						  address.getStreet()+" "+address.getStreetnumber()+", Build Number : "+address.getBuildnumber()+
						  ", App No : "+address.getApartmentnumber();
		clientDetails.setAddress(address1);
		
		ContractClient contract = contractClientService.getContractByIdClient(client.getId());
		clientDetails.setIdcontract(contract.getId());
		clientDetails.setAmount(contract.getAmount());
		clientDetails.setCurency(contract.getCurency());
		clientDetails.setStartdate(contract.getStartdate());
		clientDetails.setContractstatus(contractClientStatusService.getContractClientStatusNameById(contract.getIdstatus()));
		
		return clientDetails;
	}
	
	
	
	
	

}
