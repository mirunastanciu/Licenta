package com.test.app.contractemployeestatus;


import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface ContractEmployeeStatusRepository extends CrudRepository<ContractEmployeeStatus , String>{

	 
	@Query(value="SELECT * FROM statuscontractemployee WHERE IDSTATUS=?1",nativeQuery=true)
	public ContractEmployeeStatus getContractEmployeeStatusById( int a);
	
	@Query(value="SELECT STATUSNAME FROM statuscontractemployee",nativeQuery=true)
	public ArrayList<String> getContractEmployeeStatusNames();
	
	@Query(value="SELECT IDSTATUS FROM statuscontractemployee WHERE STATUSNAME =?;",nativeQuery=true)
	public int getContractEmployeeStatusIdByName(String a);
	
	@Query(value="Select STATUSNAME from statuscontractemployee where IDSTATUS=?;",nativeQuery=true)
	public String getContractEmployeeStatusNameById(int a);
}
