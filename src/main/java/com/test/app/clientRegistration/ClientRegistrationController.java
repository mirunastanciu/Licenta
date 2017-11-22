package com.test.app.clientRegistration;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;






import com.test.app.account.Account;
import com.test.app.account.AccountService;
import com.test.app.address.Address;
import com.test.app.address.AddressService;
import com.test.app.client.Client;
import com.test.app.client.ClientService;

@RestController
public class ClientRegistrationController {
	
	@Autowired
	AddressService addresService;
	
	@Autowired
	AccountService accountService;
	
	@Autowired 
	ClientService clientService;
	
	@ResponseBody
	@RequestMapping(value = "/saveClientAccount" , method = RequestMethod.POST)
	public void saveCleint(@RequestParam(value="firstname") String firstname,
						   @RequestParam(value="lastname") String lastname,
						   @RequestParam(value="email") String email,
						   @RequestParam(value="username") String username,
						   @RequestParam(value="password") String password,
						   @RequestParam(value="country") String country,
						   @RequestParam(value="county") String county,
						   @RequestParam(value="town") String town,
						   @RequestParam(value="street") String street,
						   @RequestParam(value="streetno") int streetno,
						   @RequestParam(value="buildno") int buildno,
						   @RequestParam(value="appno") int appno){
		
		Address address = new Address();
		address.setCountry(country);
		address.setConuty(county);
		address.setTown(town);
		address.setStreet(street);
		address.setStreetnumber(streetno);
		address.setBuildnumber(buildno);
		address.setApartmentnumber(appno);
		
		
		
		addresService.saveAddress(address);
		
		Account account = new Account();
		account.setUsername(username);
		account.setPassword(password);
		ArrayList<Address> addresses = addresService.getAddresses();			
		account.setIddress(addresses.size());
		account.setIdaccounttype(2);//Client account type = 2
		
		accountService.saveAccount(account);
		
		Client client = new Client();
		client.setFisrtname(firstname);
		client.setLastname(lastname);
		client.setEmail(email);
		ArrayList<Account> clientList = accountService.getAllAccounts();
		client.setIdaccount(clientList.size());
		
		clientService.saveClient(client);
	}
	

}
