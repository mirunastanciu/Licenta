package com.test.app.contractemployeestatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractEmployeeStatusController {
	
	@Autowired
	ContractEmployeeStatusService contractEmployeeStatusService;
	//just for test
	@RequestMapping(path = "/getEmployeeContractStatusById")
	public ContractEmployeeStatus getEmployeeContractStatusByIdt(int a){
		return contractEmployeeStatusService.getContractEmployeeStatusById(a);
	}

}
