package com.test.app.contractclientstatus;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ContractClientStatusRepository extends CrudRepository<ContractClientStatus , String>{
	
	@Query(value="SELECT * FROM statuscontractclient WHERE IDSTATUS=?1",nativeQuery=true)
	public ContractClientStatus getContractClientStatusById(int a);

}
