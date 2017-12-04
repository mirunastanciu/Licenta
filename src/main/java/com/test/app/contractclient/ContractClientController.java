package com.test.app.contractclient;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.client.ClientService;
import com.test.app.contractclientstatus.ContractClientStatusService;
import com.test.app.contractemployee.ContractEmployee;

@RestController
public class ContractClientController {
	
	
	@Autowired 
	ContractClientService contractClientService;
	
	@Autowired
	ContractClientStatusService contractClientStatusService;
	
	@Autowired
	ClientService clientService;

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
	
	@RequestMapping(path="/saveNewClientContract" , method=RequestMethod.POST)
	public void addNewClientContract(@RequestParam(value="client") String client,
									   @RequestParam(value="amount") double amount,
									   @RequestParam(value="status") String status,
									   @RequestParam(value="signaturedate") String signaturedate,
									   @RequestParam(value="startdate") String startdate,
									   @RequestParam(value="expirationdate") String expirationdate){
		
		ContractClient ce = new ContractClient();
		java.sql.Date parseDate;
		ce.setIdclient(clientService.getClientIdByName(client));
		ce.setAmount(amount);
	    parseDate = java.sql.Date.valueOf(signaturedate);
		ce.setSignature(parseDate);
		parseDate = java.sql.Date.valueOf(startdate);
		ce.setStartdate(parseDate);
		
		if(expirationdate.equals("")==false){
			    parseDate = java.sql.Date.valueOf(expirationdate);
			    ce.setExpirationdate(parseDate);
		}
		
		ce.setIdstatus(contractClientStatusService.getStatusIdByName(status));
		ce.setCurency("EUR");
		
		contractClientService.save(ce);
		
	}


}
