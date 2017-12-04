package com.test.app.contractclientstatus;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractClientStatusService {
	
	@Autowired
	ContractClientStatusRepository contractClientStatusRepository;
	
	
	public ContractClientStatus getContractClientStatusById(int a){
		return contractClientStatusRepository.getContractClientStatusById(a);
	}
	
	public ArrayList<String> getClientContractStatusNames(){
		return contractClientStatusRepository.getContractClientStatusNames();
	}
	
	public int getStatusIdByName(String a){
		return contractClientStatusRepository.getStatusIdByName(a);
	}

}
