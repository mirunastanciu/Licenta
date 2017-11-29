package com.test.app.contractclientstatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractClientStatusService {
	
	@Autowired
	ContractClientStatusRepository contractClientStatusRepository;
	
	
	public ContractClientStatus getContractClientStatusById(int a){
		return contractClientStatusRepository.getContractClientStatusById(a);
	}

}
