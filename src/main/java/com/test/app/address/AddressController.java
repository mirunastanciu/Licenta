package com.test.app.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.account.AccountService;

@RestController
public class AddressController {
	
	@Autowired 
	AddressService addressService;
	
	@Autowired 
	AccountService accountService;
   
	@RequestMapping(path="/getAddressByUser", method=RequestMethod.GET)
	public String getAddressByUsername(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Address ad = addressService.getAddressById(accountService.getAccByUsrename(username).getIddress());
		String address = ad.getCountry() + ", " + ad.getConuty() + ", " + ad.getTown() + ", " + ad.getStreet() + " " + 
						ad.getStreetnumber() + ", Build Number: " + ad.getBuildnumber() + ",  App No:" + ad.getApartmentnumber();
		return address;
	}
	
	@RequestMapping(path="/changeAddressMyAcc", method=RequestMethod.POST)
	public void changeAddressMyAcc(@RequestParam(value="country2") String country,
							       @RequestParam(value="county2") String county,
							       @RequestParam(value="town2") String town,
							       @RequestParam(value="street2") String street,
							       @RequestParam(value="streetno2") int streetno,
							       @RequestParam(value="buildno2") int buildno,
							       @RequestParam(value="appno2") int appno){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Address address = addressService.getAddressById(accountService.getAccByUsrename(username).getIddress());
		address.setCountry(country);
		address.setConuty(county);
		address.setTown(town);
		address.setStreet(street);
		address.setStreetnumber(streetno);
		address.setBuildnumber(buildno);
		address.setApartmentnumber(appno);
		
		addressService.saveAddress(address);
		
	}

}
