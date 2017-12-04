package com.test.app.contractclientstatus;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractClientStatusController {
	
	@Autowired
	ContractClientStatusService contractClientStatusService; 
	//just for test
	@RequestMapping(path="/getContractClientStausById", method=RequestMethod.GET)
	public ContractClientStatus getContractClientStausById(int a){
		return contractClientStatusService.getContractClientStatusById(a);
	}
	
	@RequestMapping(path="/getClientContractstatusNames",method=RequestMethod.GET)
	public ArrayList<String> getClientContractStatusNames(){
		return contractClientStatusService.getClientContractStatusNames();
	}

}
