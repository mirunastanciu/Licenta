package com.test.app.contractclient;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractClientService {

	@Autowired
	ContractClientRepository contractClientRepository;

	public ArrayList<ContractClient> getAllClientContracts(){
		ArrayList<ContractClient> clientContractList = new ArrayList<>();
		contractClientRepository.findAll()
		.forEach(clientContractList::add);

		return clientContractList;
	}

	public void save(ContractClient ce){
		contractClientRepository.save(ce);
	}

	public void delete(ContractClient ce){
		contractClientRepository.delete(ce);

	}

	public ContractClient getContractByIdClient(int a){
		return contractClientRepository.getContractClientByIdClient(a);
	}

	public ContractClient getContractById(int a) {
		return contractClientRepository.getContractById(a);
	}

}
