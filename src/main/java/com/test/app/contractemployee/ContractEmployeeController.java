package com.test.app.contractemployee;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.contractemployeestatus.ContractEmployeeStatusService;

@RestController
public class ContractEmployeeController {

	@Autowired
	ContractEmployeeService contractEmployeeService;

	@Autowired
	ContractEmployeeStatusService contractEmployeeStatusService;




	@RequestMapping(path="/getEmployeeContracts/Details", method=RequestMethod.GET)
	public ArrayList<ContractEmployeeDetails> getAllEmployeeClients(){
		ArrayList<ContractEmployee> contractEmployeeList = contractEmployeeService.getAllEmployeeContracts();
		ArrayList<ContractEmployeeDetails> contrcatEmployeeDetailsList = new ArrayList<>();

		for(int i=0;i<contractEmployeeList.size();i++){
			ContractEmployeeDetails ced = new ContractEmployeeDetails();
			ced.setId(contractEmployeeList.get(i).getId());
			ced.setStatus(contractEmployeeStatusService.getContractEmployeeStatusById(contractEmployeeList.get(i).getId()).getStatusname());
			ced.setSalary(contractEmployeeList.get(i).getSalary());
			ced.setCurency(contractEmployeeList.get(i).getCurency());
			ced.setStartdate(contractEmployeeList.get(i).getStartdate());
			
			if(contractEmployeeList.get(i).getExpirationdate() == null){
				ced.setExpirationdate("Unlimited");
			}else{
				ced.setExpirationdate(contractEmployeeList.get(i).getExpirationdate().toString());
			}
			
			contrcatEmployeeDetailsList.add(ced);
		}
		return contrcatEmployeeDetailsList;
	}

	@RequestMapping(path="/saveNewEmployeeContract" , method=RequestMethod.POST)
	public void addNewEmployeeContract(@RequestParam(value="salary") double salary,
									   @RequestParam(value="status") String status,
									   @RequestParam(value="signaturedate") String signaturedate,
									   @RequestParam(value="startdate") String startdate,
									   @RequestParam(value="expirationdate") String expirationdate){

		ContractEmployee ce = new ContractEmployee();
		ce.setSalary(salary);
		java.sql.Date parseDate = java.sql.Date.valueOf(signaturedate);
		ce.setSignature(parseDate);
		parseDate = java.sql.Date.valueOf(startdate);
		ce.setStartdate(parseDate);
		if(expirationdate.equals("")==false){
		    parseDate = java.sql.Date.valueOf(expirationdate);
		    ce.setExpirationdate(parseDate);
	     }
		ce.setIdstatus(contractEmployeeStatusService.getEmployeeContractStatusIdByName(status));
		ce.setCurency("EUR");

		contractEmployeeService.save(ce);

	}

	@RequestMapping(path="/getEmployeeContract/DetailsForModal", method=RequestMethod.POST)
	public ContractEmployeeDetails getAllEmployeeContract(@RequestParam(value="idContract") int id){
		ContractEmployee contract = contractEmployeeService.getContractById(id);

			ContractEmployeeDetails ced = new ContractEmployeeDetails();
			ced.setId(contract.getId());
			ced.setStatus(contractEmployeeStatusService.getContractEmployeeStatusById(contract.getId()).getStatusname());
			ced.setSalary(contract.getSalary());
			ced.setCurency(contract.getCurency());
			ced.setStartdate(contract.getStartdate());
			if(contract.getExpirationdate() == null){
				ced.setExpirationdate("Unlimited");
			}else{
				ced.setExpirationdate(contract.getExpirationdate().toString());
			}
			
			ced.setSigndate(contract.getSignature());


		return ced;
	}

	@RequestMapping(path="/updateContractEmployee" , method=RequestMethod.POST)
	public void update(@RequestParam(value="idContract") int id,
					   @RequestParam(value="status") String status,
					   @RequestParam(value="salary") double salary,
					   @RequestParam(value="expdate") String expdate) {

		ContractEmployee ce = contractEmployeeService.getContractById(id);

		ce.setIdstatus(contractEmployeeStatusService.getEmployeeContractStatusIdByName(status));
		ce.setSalary(salary);
		if(expdate.equals("Unlimited") == false) {
			java.sql.Date parseDate = java.sql.Date.valueOf(expdate);
			ce.setExpirationdate(parseDate);
		}
		contractEmployeeService.save(ce);


	}


}
