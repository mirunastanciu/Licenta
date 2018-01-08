package com.test.app.address;

import org.springframework.beans.factory.annotation.Autowired;
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
   
	@RequestMapping(path="/getAddressByUser", method=RequestMethod.POST)
	public String getAddressByUsername(@RequestParam(value="logeduser") String logeduser){
		Address ad = addressService.getAddressById(accountService.getAccByUsrename(logeduser).getIddress());
		String address = ad.getCountry() + ", " + ad.getConuty() + ", " + ad.getTown() + ", " + ad.getStreet() + " " + 
						ad.getStreetnumber() + ", Build Number: " + ad.getBuildnumber() + ",  App No:" + ad.getApartmentnumber();
		return address;
	}

}
