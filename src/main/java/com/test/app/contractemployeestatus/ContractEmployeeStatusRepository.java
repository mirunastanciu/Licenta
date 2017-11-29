package com.test.app.contractemployeestatus;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface ContractEmployeeStatusRepository extends CrudRepository<ContractEmployeeStatus , String>{

	 
	@Query(value="SELECT * FROM statuscontractemployee WHERE IDSTATUS=?1",nativeQuery=true)
	public ContractEmployeeStatus getContractEmployeeStatusById( int a);
}
