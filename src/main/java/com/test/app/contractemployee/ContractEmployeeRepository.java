package com.test.app.contractemployee;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ContractEmployeeRepository extends CrudRepository<ContractEmployee , String>{
	
	@Query(value="Select * from contractemployee where IDCONTRACTEMPLOYEE=?;",nativeQuery=true)
	public ContractEmployee getContractById(int a);
	

}
