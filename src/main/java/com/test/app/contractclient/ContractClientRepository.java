package com.test.app.contractclient;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ContractClientRepository extends CrudRepository<ContractClient , String>{
	
	@Query(value="SELECT * FROM contractclient WHERE IDCLIENT=?;",nativeQuery=true)
	public ContractClient getContractClientByIdClient(int a);
	
	

}
