package com.test.app.contractclient;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractClientController {
	
	
	@Autowired 
	ContractClientService contractClientService;

	@RequestMapping(path="/getAllClientContracts", method=RequestMethod.GET)
	public ArrayList<ContractClient> getAllClientContracts(){
		return contractClientService.getAllClientContracts();
	}


}
