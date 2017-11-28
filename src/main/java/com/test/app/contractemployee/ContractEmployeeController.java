package com.test.app.contractemployee;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractEmployeeController {
	
	@Autowired 
	ContractEmployeeService contractEmployeeService;

	@RequestMapping(path="/getAllEmployeeContracts", method=RequestMethod.GET)
	public ArrayList<ContractEmployee> getAllEmployeeClients(){
		return contractEmployeeService.getAllEmployeeContracts();
	}

}
