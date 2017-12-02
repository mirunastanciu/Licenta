package com.test.app.contractemployee;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractEmployeeService {
	
	@Autowired
	ContractEmployeeRepository contractEmployeeRepository;
	
	public ArrayList<ContractEmployee> getAllEmployeeContracts(){
		ArrayList<ContractEmployee> employeeContractList = new ArrayList<>();
		contractEmployeeRepository.findAll()
		.forEach(employeeContractList::add);
		
		return employeeContractList;
	}
	
	public void save(ContractEmployee ce){
		contractEmployeeRepository.save(ce);
	}
	
	public void delete(ContractEmployee ce){
		contractEmployeeRepository.delete(ce);
		
	}
	
	public ContractEmployee getContractById(int a){
		return contractEmployeeRepository.getContractById(a);
	}

}
