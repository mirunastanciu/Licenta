package com.test.app.contractclientstatus;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ContractClientStatusRepository extends CrudRepository<ContractClientStatus , String>{
	
	@Query(value="SELECT * FROM statuscontractclient WHERE IDSTATUS=?1",nativeQuery=true)
	public ContractClientStatus getContractClientStatusById(int a);
	
	@Query(value="SELECT STATUSNAME FROM statuscontractclient",nativeQuery=true)
	public ArrayList<String> getContractClientStatusNames();
	
	@Query(value="SELECT IDSTATUS FROM statuscontractclient WHERE STATUSNAME=?",nativeQuery=true)
	public int getStatusIdByName(String a);
	
	@Query(value="Select STATUSNAME from statuscontractclient where IDSTATUS=?;",nativeQuery=true)
	public String getContractClientStatusNameById(int a);

}
