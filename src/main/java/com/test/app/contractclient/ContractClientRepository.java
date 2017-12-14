package com.test.app.contractclient;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ContractClientRepository extends CrudRepository<ContractClient , String>{

	@Query(value="SELECT * FROM contractclient WHERE IDCLIENT=?;",nativeQuery=true)
	public ContractClient getContractClientByIdClient(int a);

	@Query(value="SELECT * FROM contractclient WHERE IDCONTRACTCLIENT=?;",nativeQuery=true)
	public ContractClient getContractById(int a);
	
	@Query(value="SELECT IDCONTRACTCLIENT FROM contractclient WHERE IDCLIENT=?;",nativeQuery=true)
	public int getIdContractByIdClient(int a);



}
