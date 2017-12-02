package com.test.app.contractemployeestatus;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractEmployeeStatusService {
	
	@Autowired 
	ContractEmployeeStatusRepository contrcatEmployeeStatusRepository;
	
	public ArrayList<ContractEmployeeStatus> getAllEmployeeContractStatuses(){
		ArrayList<ContractEmployeeStatus> CESList = new ArrayList<>();
		contrcatEmployeeStatusRepository.findAll().forEach(CESList::add);
		return CESList;
	}
	
	
	public ContractEmployeeStatus getContractEmployeeStatusById(int a){
		return contrcatEmployeeStatusRepository.getContractEmployeeStatusById(a);
		
		
	}
	
	public ArrayList<String> getContractEmployeeStatusNamesS(){
		ArrayList<String> List = new ArrayList<>();
		contrcatEmployeeStatusRepository.getContractEmployeeStatusNames().forEach(List::add);
		return List;
		
	}
	
   public int getEmployeeContractStatusIdByName(String a){
	   return contrcatEmployeeStatusRepository.getContractEmployeeStatusIdByName(a);
	   
   }
   
   public String getContractEmployeeStatusNameById(int a){
	   return contrcatEmployeeStatusRepository.getContractEmployeeStatusNameById(a);
   }

}
