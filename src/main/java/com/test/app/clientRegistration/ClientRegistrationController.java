package com.test.app.clientRegistration;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;






import org.springframework.web.servlet.ModelAndView;

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
	ModelAndView model;
	

	
	@RequestMapping(value = "/saveClientAccount" , method = RequestMethod.POST)
	public String saveCleint(@RequestParam(value="firstname") String firstname,
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
		ArrayList<Account> accountList1 = accountService.getAllAccounts();
		int response = 1;
		for(int i=0;i<accountList1.size();i++){
			if((accountList1.get(i).getUsername()).equals(username)){
				response = 0;
			}
		}
		
		if(response == 1){
			
			
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
			ArrayList<Address> addressesList = addresService.getAddresses();	
			account.setIddress(addressesList.get(addressesList.size()-1).getIdaddress());
			account.setIdaccounttype(2);//Client account type = 2
		
			accountService.saveAccount(account);
		
			Client client = new Client();
			client.setFirstname(firstname);
			client.setLastname(lastname);
			client.setEmail(email);
			ArrayList<Account> accountList = accountService.getAllAccounts();
			client.setIdaccount(accountList.get(accountList.size()-1).getIdaccount());
		
			clientService.saveClient(client);
			return "success";
		}else{
			
			return "faild";
		}
	}
	

}
