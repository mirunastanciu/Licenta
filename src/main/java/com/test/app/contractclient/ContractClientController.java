package com.test.app.contractclient;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.client.ClientService;
import com.test.app.contractclientstatus.ContractClientStatusService;
import com.test.app.mail.Mail;
import com.test.app.mail.MailService;


@RestController
public class ContractClientController {


	@Autowired
	ContractClientService contractClientService;

	@Autowired
	ContractClientStatusService contractClientStatusService;

	@Autowired
	ClientService clientService;
	
	@Autowired
    private MailService emailService;

	@RequestMapping(path="/getClientContracts/Details", method=RequestMethod.GET)
	public ArrayList<ContractClientDetails> getAllClientContracts(){
		ArrayList<ContractClient> contractClientList = contractClientService.getAllClientContracts();
		ArrayList<ContractClientDetails> contractClientDetailsList = new ArrayList<>();

		 for(int i=0;i<contractClientList.size();i++){
			 ContractClientDetails ccd = new ContractClientDetails();
			 ccd.setId(contractClientList.get(i).getId());
			 ccd.setStatus(contractClientStatusService.getContractClientStatusById(contractClientList.get(i).getIdstatus()).getStatusname());
			 ccd.setAmount(contractClientList.get(i).getAmount());
			 ccd.setCurency(contractClientList.get(i).getCurency());
			 ccd.setStartdate(contractClientList.get(i).getStartdate());
			 if(contractClientList.get(i).getExpirationdate() == null){
				    ccd.setExpirationdate("Unlimited");
				}else{
					ccd.setExpirationdate(contractClientList.get(i).getExpirationdate().toString());
				}
			 

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
		
		Mail mail = new Mail();
        mail.setFrom("miruna.anna@gmail.com");
        mail.setTo(clientService.getClientById(clientService.getClientIdByName(client)).getEmail());
        mail.setSubject("Contract available");
        String content = "Your contract has been registred. Now you have acess to your contract details.";
        		
        mail.setContent(content);

        emailService.sendSimpleMessage(mail);

	}

	@RequestMapping(path="/getClientContract/DetailsForModal", method=RequestMethod.POST)
	public ContractClientDetails getAllEmployeeContract(@RequestParam(value="idContract") int id){
		ContractClient contract = contractClientService.getContractById(id);

			ContractClientDetails ccd = new ContractClientDetails();
			ccd.setId(contract.getId());
			ccd.setStatus(contractClientStatusService.getContractClientStatusById(contract.getId()).getStatusname());
			ccd.setAmount(contract.getAmount());
			ccd.setCurency(contract.getCurency());
			ccd.setStartdate(contract.getStartdate());
			 if(contract.getExpirationdate() == null){
				    ccd.setExpirationdate("Unlimited");
				}else{
					ccd.setExpirationdate(contract.getExpirationdate().toString());
				}
			
			ccd.setSigndate(contract.getSignature());


		return ccd;
	}

	@RequestMapping(path="/updateContractClient" , method=RequestMethod.POST)
	public void update(@RequestParam(value="idContract") int id,
					   @RequestParam(value="status") String status,
					   @RequestParam(value="amount") double amount,
					   @RequestParam(value="expdate") String expdate) {

		ContractClient ce = contractClientService.getContractById(id);

		ce.setIdstatus(contractClientStatusService.getStatusIdByName(status));
		ce.setAmount(amount);
		if(expdate.equals("Unlimited") ) {
			ce.setExpirationdate(null);
		}else {
			java.sql.Date parseDate = java.sql.Date.valueOf(expdate);
			ce.setExpirationdate(parseDate);
		}
		contractClientService.save(ce);


	}
	
	
	@RequestMapping(path="/getClientContractExist", method=RequestMethod.GET)
	public int getClientContractExist(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		int idcl = clientService.getIdClByUsername(username);
		ArrayList<ContractClient> cc = contractClientService.getAllClientContracts();
		int response = 0;
		
		for(int i=0;i<cc.size();i++){
			if(cc.get(i).getIdclient() == idcl){
				response = 1;
				break;
			}			
		}
		 return response;
		
	}
	
	@RequestMapping(path="/getClientContractDetailsForMyAcc", method=RequestMethod.GET)
	public ContractClientDetails getAllEmployeeContract(){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		int id = contractClientService.getIdContractByIdClient(clientService.getIdClByUsername(username));
		ContractClient contract = contractClientService.getContractById(id);

			ContractClientDetails ccd = new ContractClientDetails();
			ccd.setId(contract.getId());
			ccd.setStatus(contractClientStatusService.getContractClientStatusById(contract.getIdstatus()).getStatusname());
			ccd.setAmount(contract.getAmount());
			ccd.setCurency(contract.getCurency());
			ccd.setStartdate(contract.getStartdate());
			 if(contract.getExpirationdate() == null){
				    ccd.setExpirationdate("Unlimited");
				}else{
					ccd.setExpirationdate(contract.getExpirationdate().toString());
				}
			
			ccd.setSigndate(contract.getSignature());


		return ccd;
	}


}
