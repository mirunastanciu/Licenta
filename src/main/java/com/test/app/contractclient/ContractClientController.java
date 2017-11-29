package com.test.app.contractclient;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.contractclientstatus.ContractClientStatusService;

@RestController
public class ContractClientController {
	
	
	@Autowired 
	ContractClientService contractClientService;
	
	@Autowired
	ContractClientStatusService contractClientStatusService;

	@RequestMapping(path="/getClientContracts/Details", method=RequestMethod.GET)
	public ArrayList<ContractClientDetails> getAllClientContracts(){
		ArrayList<ContractClient> contractClientList = contractClientService.getAllClientContracts();
		ArrayList<ContractClientDetails> contractClientDetailsList = new ArrayList<>();
		
		 for(int i=0;i<contractClientList.size();i++){
			 ContractClientDetails ccd = new ContractClientDetails();
			 ccd.setId(contractClientList.get(i).getId());
			 ccd.setStatus(contractClientStatusService.getContractClientStatusById(contractClientList.get(i).getId()).getStatusname());
			 ccd.setAmount(contractClientList.get(i).getAmount());
			 ccd.setCurency(contractClientList.get(i).getCurency());
			 ccd.setStartdate(contractClientList.get(i).getStartdate());
			 ccd.setExpirationdate(contractClientList.get(i).getExpirationdate());
			 
			 contractClientDetailsList.add(ccd);
			 
		 }
		 return contractClientDetailsList;
		
	}


}
